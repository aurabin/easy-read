// Standalone polyglot: a valid PNG that also runs as an HTML page.
// Contains: field image, runnable Boing Ball demo, OctaGroover module,
// and a self-generated interpretation of the module as Web Audio.
// No WAV. No external files.
import { readFileSync, writeFileSync } from "fs";

const PNG  = readFileSync("outreach/media/virtual-field-generator.png");
const DEMO = readFileSync("field-generator/boing-ball.html","utf8");
const MOD  = readFileSync(process.argv[2]);
const PCM  = readFileSync(process.argv[3]);
const SR = 22050;

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<title>Feldgenerator — standalone</title>
</head><body>
<h1>Virtueller Feldgenerator</h1>
<p>Eine Datei: Bild, Demo, Modul und Ton. Der Ton ist meine Interpretation des MusicLine-Moduls.</p>
<button id="play">Ton abspielen</button>
<a id="mod" download="Ml.OctaGroover">Modul speichern</a>
<iframe id="frame" title="Boing Ball" style="width:100%;height:340px;border:1px solid #24344f"></iframe>
<script type="text/plain" id="demo">${DEMO.replace(/<\/script>/gi,"<\\/script>")}</script>
<script>
const pcmB64="${PCM.toString("base64")}";
const modB64="${MOD.toString("base64")}";
document.getElementById("frame").srcdoc=document.getElementById("demo").textContent;
const link=document.getElementById("mod");
link.href="data:application/octet-stream;base64,"+modB64;
document.getElementById("play").addEventListener("click",async()=>{
  const bin=atob(pcmB64),buf=new ArrayBuffer(bin.length),v=new Uint8Array(buf);
  for(let i=0;i<bin.length;i++)v[i]=bin.charCodeAt(i);
  const ctx=new AudioContext(),audioBuf=ctx.createBuffer(1,bin.length/2,${SR}),d=audioBuf.getChannelData(0);
  const view=new DataView(buf);
  for(let i=0;i<d.length;i++)d[i]=view.getInt16(i*2,true)/32768;
  const src=ctx.createBufferSource();src.buffer=audioBuf;src.connect(ctx.destination);src.start();
});
</script></body></html>`;

// PNG bytes first (valid image), HTML after IEND (browsers run it as a page).
const out = Buffer.concat([PNG, Buffer.from("\n"+html,"utf8")]);
writeFileSync("outreach/media/standalone.html", out);
console.log("standalone.html:", (out.length/1024/1024).toFixed(2), "MB");
