// Build two clean artifacts:
//   All-In-One.PNG   - a valid PNG with payloads in tEXt chunks (no trailing text)
//   ALL-IN-ONE.html  - a clean HTML page with the image as a data URI, the Boing
//                      Ball demo, the real module and a Paula emulator.
import { readFileSync, writeFileSync } from "fs";

const PNG   = readFileSync("outreach/media/virtual-field-generator.png");
const DEMO  = readFileSync("field-generator/boing-ball.html","utf8");
const MOD   = readFileSync(process.argv[2]);
const PAULA = readFileSync("tools/paula-ml.js","utf8");

// ---- tEXt chunk helpers (CRC32) ----
const table=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;
  for(let k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);t[n]=c>>>0;}return t;})();
function crc(buf){let c=0xFFFFFFFF;for(const b of buf)c=(c>>>8)^table[(c^b)&255];return (c^0xFFFFFFFF)>>>0;}
function chunk(type,data){
  const t=Buffer.from(type,"ascii"),len=Buffer.alloc(4);len.writeUInt32BE(data.length);
  const cr=Buffer.alloc(4);cr.writeUInt32BE(crc(Buffer.concat([t,data]))>>>0);
  return Buffer.concat([len,t,data,cr]);
}
function text(key,value){return chunk("tEXt",Buffer.concat([Buffer.from(key,"latin1"),Buffer.from([0]),Buffer.from(value,"latin1")]));}
function pack(png,entries){
  const parts=[png.subarray(0,8)];
  let p=8;
  while(p+12<=png.length){
    const len=png.readUInt32BE(p), type=png.toString("ascii",p+4,p+8);
    if(type==="IEND") for(const [k,v] of entries) parts.push(text("ER_PAYLOAD:"+k,v));
    parts.push(png.subarray(p,p+12+len));
    p+=12+len;
  }
  return Buffer.concat(parts);
}

// ---- 1. pure PNG with embedded files ----
const cleanPng = pack(PNG,[
  ["Ml.OctaGroover", MOD.toString("base64")],
  ["boing-ball.html", Buffer.from(DEMO).toString("base64")],
  ["paula-ml.js", Buffer.from(PAULA).toString("base64")],
]);
writeFileSync("outreach/media/All-In-One.PNG", cleanPng);

// ---- 2. clean HTML (no raw binary in the document) ----
const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>All-In-One — Feldgenerator</title>
<style>
body{background:#070b14;color:#eaf2ff;font:16px/1.6 system-ui,sans-serif;margin:0}
main{max-width:860px;margin:0 auto;padding:28px 20px 56px}
h1{font-size:clamp(22px,4vw,34px);margin:0 0 8px}
p{color:#9fb3d1;max-width:58ch}
img{max-width:100%;border:1px solid #24344f;border-radius:12px}
button{cursor:pointer;font:inherit;color:#fff;background:#0f766e;border:1px solid #0f766e;border-radius:8px;padding:9px 15px}
a{color:#6fd3ff}
iframe{width:100%;height:340px;border:1px solid #24344f;border-radius:10px;background:#050810;margin-top:18px}
</style></head><body><main>
<h1>Virtueller Feldgenerator</h1>
<p>Bild, Demo, echtes MusicLine-Modul und ein Paula-Emulator. Der Ton entsteht im Browser aus den Samples des Moduls und stoppt beim Weiterscrollen.</p>
<img alt="Virtueller Feldgenerator mit Boing Ball" src="data:image/png;base64,${PNG.toString("base64")}">
<p><button id="play" type="button">Ton abspielen</button>
<a id="mod" download="Ml.OctaGroover">Modul speichern</a></p>
<iframe id="frame" title="Boing Ball Demo"></iframe>
</main>
<script>
${PAULA.replace(/<\/script>/gi,"<\\/script>")}
</script>
<script type="text/plain" id="demo">${DEMO.replace(/<\/script>/gi,"<\\/script>")}</script>
<script>
document.getElementById("frame").srcdoc=document.getElementById("demo").textContent;
const modB64="${MOD.toString("base64")}";
document.getElementById("mod").href="data:application/octet-stream;base64,"+modB64;
let playing=null;
document.getElementById("play").addEventListener("click",()=>{
  if(playing){try{playing.stop()}catch(e){}playing=null;}
  const bin=atob(modB64),bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  const pcm=MLPaula.render(bytes,22050,19);
  const ctx=new AudioContext(),buf=ctx.createBuffer(1,pcm.length,22050),f32=buf.getChannelData(0);
  for(let i=0;i<pcm.length;i++)f32[i]=pcm[i]/32768;
  const src=ctx.createBufferSource();src.buffer=buf;src.connect(ctx.destination);
  src.start();playing=src;
});
addEventListener("scroll",()=>{if(playing){try{playing.stop()}catch(e){}playing=null;}},{passive:true});
</script></body></html>`;
writeFileSync("outreach/media/ALL-IN-ONE.html", html);
writeFileSync("outreach/media/standalone.html", html);

console.log("PNG:",(cleanPng.length/1024).toFixed(0),"KB | HTML:",(Buffer.byteLength(html)/1024).toFixed(0),"KB");
