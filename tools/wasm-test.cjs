const fs = require("fs");
const buf = fs.readFileSync("field-generator/field.wasm");
WebAssembly.instantiate(buf, {}).then(({ instance }) => {
  const ex = instance.exports;
  console.log("exports:", Object.keys(ex).join(", "));
  const f = new Float32Array(ex.mem.buffer);
  const X=0,Y=256,PX=512,PY=768,VX=1024,VY=1280;
  f[X]=100; f[Y]=100; f[VX]=2; f[VY]=1;
  ex.advance(1, 1, 960, 600);
  console.log("after 1 step:", {x:f[X], y:f[Y], px:f[PX], py:f[PY]});
  // wrap test
  f[X]=959; f[VX]=50; ex.advance(1,1,960,600);
  console.log("wrap x:", f[X]);
}).catch(e => { console.error("FAIL:", e.message); process.exit(1); });
