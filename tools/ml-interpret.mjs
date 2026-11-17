// Eigenständiger MusicLine-Editor-Interpreter.
// Liest ein .ml-Modul (MLEDMODL) und erzeugt daraus direkt PCM-Ton.
// Keine DLL, kein Player, kein WAV-Container.
//Usage: node tools/ml-interpret.mjs <module.ml> <out.raw> [seconds]
import { readFileSync, writeFileSync } from "fs";

const SRC = process.argv[2];
const OUT = process.argv[3] || "ml.raw";
const SECS = Number(process.argv[4] || 19);
const SR = 22050;

// ---- Chunks lesen ----
const b = readFileSync(SRC);
if (b.toString("ascii",0,8) !== "MLEDMODL") throw new Error("Kein MusicLine-Modul");
let p = 8;
const chunks = [];
function u16(o){ return b.readUInt16BE(o); }
function u32(o){ return b.readUInt32BE(o); }
// VERS überspringen
{
  const len = u32(p); p += 4;
  if (len !== 0x56455253) p += len;            // alter Modus: MODL-Länge
  const mark = b.toString("ascii",p,p+4); p += 4;
  const l = u32(p); p += 4 + l;
  if (mark !== "VERS") throw new Error("VERS fehlt");
}
while (p + 8 <= b.length){
  const mark = b.toString("ascii",p,p+4); p += 4;
  const len = u32(p); p += 4;
  if (p + len > b.length) break;
  chunks.push({ mark, start:p, end:p+len });
  p += len;
  if (mark === "SMPL" && (p % 2)) p++;         // Word-Alignment
}

// ---- TUNE ----
let tune = null;
for (const c of chunks.filter(c=>c.mark==="TUNE")){
  let o = c.start;
  const title = b.toString("latin1",o,o+32).replace(/\0.*$/, ""); o += 32;
  const tempo = u16(o); o += 2;
  const speed = b[o++], groove = b[o++];
  const volume = u16(o); o += 2;
  const playMode = b[o++], channels = b[o++];
  if (channels === 0) continue;
  const sizes = []; for (let i=0;i<channels;i++){ sizes.push(u32(o)); o += 4; }
  const seqs = [];
  for (let i=0;i<channels;i++){
    const s = []; const n = Math.floor(sizes[i]/2);
    for (let j=0;j<n;j++){ s.push(u16(o)); o += 2; }
    seqs.push(s);
  }
  tune = { title, tempo, speed, groove, volume, playMode, channels, seqs };
  break;
}
if (!tune) throw new Error("Keine TUNE mit Kanälen gefunden");

// ---- PARTs ----
const parts = new Map();
for (const c of chunks.filter(c=>c.mark==="PART")){
  let o = c.start;
  const num = u16(o); o += 2;
  const lines = [];
  for (;;){
    if (o >= c.end) break;
    const flag = b[o++];
    if (flag === 0xff) break;
    let note = 0, inst = 0;
    if (flag & 1){ note = b[o++]; inst = b[o++]; }
    const fx = [];
    for (let i=0;i<5;i++) if (flag & (1<<(i+1))) fx.push([b[o++], b[o++]]);
    lines.push({ note, inst, fx });
  }
  parts.set(num, lines);
}

console.log("Titel:", tune.title, "| BPM:", tune.tempo, "| Speed:", tune.speed,
  "| Kanäle:", tune.channels, "| Parts:", parts.size,
  "| Sequenzlänge:", tune.seqs.map(s=>s.length).join("/"));

// ---- Tonhöhe: Amiga-PAL-Perioden, 0x0e07 = 3591 bei Note 0 ----
function freq(note){
  if (note < 1 || note > 60) return 0;
  const period = 3591 / Math.pow(2, (note-1)/12);
  return 7093789.2 / (2 * period);
}

// ---- Sequencing: pro Kanal Tune-Position → Part → Noten ----
const voices = tune.seqs.map(seq => ({ seq, pos:0, line:0, note:0, phase:0, env:0 }));
const ticksPerSec = Math.max(1, (tune.tempo * 2) / 5);
const tickRate = SR / ticksPerSec;
let tick = 0, nextTick = 0;
const out = Buffer.alloc(SR * SECS * 2);

for (let i=0;i<SR*SECS;i++){
  if (i >= nextTick){
    for (const v of voices){
      const seqData = v.seq[v.pos % v.seq.length] || 0;
      // MusicLine encodes part number and transpose into the sequence word
      const partNum = (((seqData << 2) & 0x300) | ((seqData & 0xff00) >> 8)) & 0xffff;
      const transpose = (seqData & 0x1f) - 16;
      const lines = parts.get(partNum) || [];
      const line = lines[v.line % Math.max(1,lines.length)];
      const note = line ? line.note + transpose : 0;
      if (note >= 1 && note <= 60){
        if (note !== v.note){ v.phase = 0; v.env = 1; }
        v.note = note;
        v.inst = line.inst;
      } else if (line && line.note === 0){
        v.env *= 0.85;
      }
      v.line++;
      if (lines.length && v.line >= lines.length){ v.line = 0; v.pos++; }
    }
    tick++; nextTick = i + tickRate;
  }
  let mix = 0;
  for (const v of voices){
    const f = freq(v.note);
    if (!f || v.env < 0.01) continue;
    v.phase += f / SR;
    if (v.phase >= 1) v.phase -= 1;
    const wave = (v.phase < 0.5 ? 1 : -1) * 0.6 + Math.sin(v.phase*2*Math.PI)*0.4;
    v.env *= 0.99985;
    mix += wave * v.env * 0.16;
  }
  mix = Math.max(-1, Math.min(1, mix));
  out.writeInt16LE(Math.round(mix*32767), i*2);
}

writeFileSync(OUT, out);
console.log("geschrieben:", OUT, "| Samples:", SR*SECS, "| Bytes:", out.length,
  "| Ticks:", tick, "| Tick-Rate:", tickRate.toFixed(1));
