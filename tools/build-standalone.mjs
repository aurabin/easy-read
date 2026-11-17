// Standalone polyglot: a valid PNG that runs as an HTML page.
// Contains the field image, the Boing Ball demo, the real OctaGroover module,
// and a JavaScript Paula emulator that renders the module to Web Audio.
// No WAV. No external files. No pre-rendered audio.
import { readFileSync, writeFileSync } from "fs";

const PNG   = readFileSync("outreach/media/virtual-field-generator.png");
const DEMO  = readFileSync("field-generator/boing-ball.html","utf8");
const MOD   = readFileSync(process.argv[2]);
const PAULA = readFileSync("tools/paula-ml.js","utf8");

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<title>Feldgenerator — standalone</title>
</head><body>
<h1>Virtueller Feldgenerator</h1>
<p>Eine Datei: Bild, Demo, Modul und ein Paula-Emulator. Der Ton wird im Browser aus dem echten MusicLine-Modul erzeugt.</p>
<button id="play">Ton abspielen</button>
<a id="mod" download="Ml.OctaGroover">Modul speichern</a>
<iframe id="frame" title="Boing Ball" style="width:100%;height:340px;border:1px solid #24344f"></iframe>
<script type="text/plain" id="demo">${DEMO.replace(/<\/script>/gi,"<\\/script>")}</script>
<script>
${PAULA.replace(/<\/script>/gi,"<\\/script>")}
</script>
<script>
const modB64="${MOD.toString("base64")}";
document.getElementById("frame").srcdoc=document.getElementById("demo").textContent;
const link=document.getElementById("mod");
link.href="data:application/octet-stream;base64,"+modB64;
document.getElementById("play").addEventListener("click",()=>{
  const bin=atob(modB64), bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
  const pcm=MLPaula.render(bytes,22050,19);
  const ctx=new AudioContext();
  const buf=ctx.createBuffer(1,pcm.length,22050);
  const f32=buf.getChannelData(0);
  for(let i=0;i<pcm.length;i++) f32[i]=pcm[i]/32768;
  const src=ctx.createBufferSource();src.buffer=buf;src.connect(ctx.destination);src.start();
});
</script></body></html>`;

const out = Buffer.concat([PNG, Buffer.from("\n"+html,"utf8")]);
writeFileSync("outreach/media/standalone.html", out);
writeFileSync("outreach/media/all-in-one.png", out);
console.log("standalone:", (out.length/1024/1024).toFixed(2), "MB | Paula:", PAULA.length, "bytes");
