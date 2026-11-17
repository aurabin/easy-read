// Builds a tiny WebAssembly module that advects particle arrays.
// No imports: JS computes vx/vy (trig), WASM does the hot movement loop.
// Memory layout (f32 arrays): X=0, Y=1024, PX=2048, PY=3072, VX=4096, VY=5120
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const here = dirname(fileURLToPath(import.meta.url));

const u32 = n => { const o=[]; do{let b=n&0x7f;n>>>=7;if(n)b|=0x80;o.push(b);}while(n);return o; };
const i32 = n => { const o=[]; let more=true; while(more){let b=n&0x7f;n>>=7;if((n===0&&!(b&0x40))||(n===-1&&(b&0x40)))more=false;else b|=0x80;o.push(b);}return o; };
const f32 = n => { const b=Buffer.alloc(4); b.writeFloatLE(n); return [...b]; };
const str = s => { const b=Buffer.from(s,"utf8"); return [...u32(b.length),...b]; };
const sec = (id,p) => [id,...u32(p.length),...p];
const vec = xs => [...u32(xs.length), ...xs.flat()];

const BASE = { X:0, Y:1024, PX:2048, PY:3072, VX:4096, VY:5120 };
const addr = base => [0x41,...i32(base), 0x20,4, 0x41,...i32(4), 0x6c, 0x6a]; // base + i*4
const FLOAD = [0x2a,0x02,0x00], FSTORE=[0x38,0x02,0x00];

// --- function body -----------------------------------------
const body = [
  2,              // 2 local groups
  1, 0x7f,        // 1 x i32  -> local 4 (i)
  2, 0x7d,        // 2 x f32  -> locals 5 (nx), 6 (ny)

  0x02,0x40,      // block (void)
  0x03,0x40,      // loop (void)
  0x20,4, 0x20,0, 0x4e, 0x0d,0x01,   // if i>=count break to block

  // px[i] = x[i]
  ...addr(BASE.PX), ...addr(BASE.X), ...FLOAD, ...FSTORE,
  // py[i] = y[i]
  ...addr(BASE.PY), ...addr(BASE.Y), ...FLOAD, ...FSTORE,

  // nx = x[i] + vx[i]*dt*1.7
  ...addr(BASE.X), ...FLOAD,
  ...addr(BASE.VX), ...FLOAD,
  0x20,1, 0x94,             // * dt
  0x43,...f32(1.7), 0x94,   // * 1.7
  0x92, 0x21,5,             // + x, set nx

  // ny = y[i] + vy[i]*dt*1.7
  ...addr(BASE.Y), ...FLOAD,
  ...addr(BASE.VY), ...FLOAD,
  0x20,1, 0x94,
  0x43,...f32(1.7), 0x94,
  0x92, 0x21,6,

  // wrap nx: if nx < -20 -> W+20
  0x20,5, 0x43,...f32(-20), 0x5d, 0x04,0x40,
  0x20,2, 0x43,...f32(20), 0x92, 0x21,5, 0x0b,
  // wrap nx: if nx > W+20 -> -20
  0x20,5, 0x20,2, 0x43,...f32(20), 0x92, 0x5e, 0x04,0x40,
  0x43,...f32(-20), 0x21,5, 0x0b,

  // wrap ny: if ny < -20 -> H+20
  0x20,6, 0x43,...f32(-20), 0x5d, 0x04,0x40,
  0x20,3, 0x43,...f32(20), 0x92, 0x21,6, 0x0b,
  // wrap ny: if ny > H+20 -> -20
  0x20,6, 0x20,3, 0x43,...f32(20), 0x92, 0x5e, 0x04,0x40,
  0x43,...f32(-20), 0x21,6, 0x0b,

  // x[i]=nx ; y[i]=ny
  ...addr(BASE.X), 0x20,5, ...FSTORE,
  ...addr(BASE.Y), 0x20,6, ...FSTORE,

  // i++
  0x20,4, 0x41,...i32(1), 0x6a, 0x21,4,
  0x0c,0x00,        // br loop
  0x0b,             // end loop
  0x0b,             // end block
  0x0b,             // end function
];

// --- sections -----------------------------------------------
const magic = [0x00,0x61,0x73,0x6d, 0x01,0x00,0x00,0x00];
const typeSec = sec(1, vec([[0x60, 4, 0x7f,0x7d,0x7d,0x7d, 0]])); // (i32,f32,f32,f32)->()
const funcSec = sec(3, vec([[0]]));
const memSec  = sec(5, vec([[0x00, 2]]));                          // 2 pages
const expSec  = sec(7, vec([[...str("advance"), 0x00, 0], [...str("mem"), 0x02, 0]])); // func 0 + memory 0
const codeSec = sec(10, vec([[...u32(body.length), ...body]]));
const wasm = Buffer.from([...magic, ...typeSec, ...funcSec, ...memSec, ...expSec, ...codeSec]);
writeFileSync(join(here,"field.wasm"), wasm);
console.log("field.wasm written:", wasm.length, "bytes");

writeFileSync(join(here,"field.wat"), `;; Partikel-Advection (Text-Entsprechung zu field.wasm)
;; (module
;;   (memory 2)
;;   (func (export "advance") (param $count i32) (param $dt f32) (param $W f32) (param $H f32)
;;     (local $i i32) (local $nx f32) (local $ny f32)
;;     ... loop over count ...
;;     px[i]=x[i]  py[i]=y[i]
;;     nx=x[i]+vx[i]*dt*1.7   ny=y[i]+vy[i]*dt*1.7
;;     wrap at -20 and W/H+20
;;     x[i]=nx     y[i]=ny
;;   )
;; )
;; Adressen: X=0 Y=1024 PX=2048 PY=3072 VX=4096 VY=5120
`);
