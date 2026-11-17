// Build two clean artifacts in AmigaOS 4.1 Workbench style:
//   All-In-One.PNG   - valid PNG with payloads in tEXt chunks
//   ALL-IN-ONE.html  - clean page with image, demo, module and Paula emulator
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
  const parts=[png.subarray(0,8)]; let p=8;
  while(p+12<=png.length){
    const len=png.readUInt32BE(p), type=png.toString("ascii",p+4,p+8);
    if(type==="IEND") for(const [k,v] of entries) parts.push(text("ER_PAYLOAD:"+k,v));
    parts.push(png.subarray(p,p+12+len)); p+=12+len;
  }
  return Buffer.concat(parts);
}
const cleanPng = pack(PNG,[
  ["Ml.OctaGroover", MOD.toString("base64")],
  ["boing-ball.html", Buffer.from(DEMO).toString("base64")],
  ["paula-ml.js", Buffer.from(PAULA).toString("base64")],
]);
writeFileSync("outreach/media/All-In-One.PNG", cleanPng);

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>All-In-One — Virtueller Feldgenerator</title>
<style>
:root{
 --desk:#8c8c8c;--win:#d9d9d9;--win2:#c4c4c4;--title:#5b82b8;
 --text:#1f1f1f;--muted:#4c4c4c;--blue:#244f8a;--light:#fff;--dark:#5a5a5a;
 --r:#e8382f;--o:#f08c00;--y:#f2d000;--g:#3fa04a;--b:#2f60b0;--p:#7a3fa0;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--desk);color:var(--text);font:14px/1.55 Arial,Helvetica,sans-serif}
a{color:var(--blue)}
a:focus-visible,button:focus-visible{outline:2px dotted var(--blue);outline-offset:2px}
.wrap{max-width:980px;margin:0 auto;padding:18px 16px 70px}
.stripes{display:flex;height:10px;width:168px;margin-bottom:14px;border:1px solid #fff;
 box-shadow:1px 1px 0 var(--dark)}
.stripes i{flex:1}
.stripes i:nth-child(1){background:var(--r)}.stripes i:nth-child(2){background:var(--o)}
.stripes i:nth-child(3){background:var(--y)}.stripes i:nth-child(4){background:var(--g)}
.stripes i:nth-child(5){background:var(--b)}.stripes i:nth-child(6){background:var(--p)}
.window{background:var(--win);border-top:2px solid var(--light);border-left:2px solid var(--light);
 border-right:2px solid var(--dark);border-bottom:2px solid var(--dark);
 box-shadow:3px 3px 0 rgba(0,0,0,.28);margin-bottom:18px}
.titlebar{display:flex;align-items:center;gap:8px;height:26px;padding:0 6px;
 background:linear-gradient(180deg,#7ea0cd,var(--title));color:#fff;font-weight:bold}
.titlebar .gadget{width:14px;height:14px;background:var(--win2);
 border-top:1px solid var(--light);border-left:1px solid var(--light);
 border-right:1px solid var(--dark);border-bottom:1px solid var(--dark)}
.titlebar .name{flex:1}
.inner{padding:18px}
h1{font-size:clamp(24px,4vw,36px);margin:0 0 8px;line-height:1.15}
h2{font-size:18px;margin:0 0 12px;padding-bottom:6px;border-bottom:1px solid #a9a9a9}
p{margin:6px 0;max-width:58ch}
.lead{color:var(--muted)}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}
.card{background:var(--win2);border-top:2px solid var(--light);border-left:2px solid var(--light);
 border-right:2px solid var(--dark);border-bottom:2px solid var(--dark);padding:14px}
.card h3{margin:6px 0;font-size:16px}
.card p{margin:0;color:var(--muted);font-size:13px}
.tag{font:11px monospace;color:var(--blue);text-transform:uppercase;letter-spacing:.08em}
.sec-num{font:11px monospace;color:var(--blue)}
.controls{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-top:12px}
button{cursor:pointer;font:inherit;color:var(--text);background:var(--win);padding:5px 12px;
 border-top:2px solid var(--light);border-left:2px solid var(--light);
 border-right:2px solid var(--dark);border-bottom:2px solid var(--dark)}
.btn{text-decoration:none;color:var(--text);background:var(--win);padding:5px 12px;font-size:13px;
 border-top:2px solid var(--light);border-left:2px solid var(--light);
 border-right:2px solid var(--dark);border-bottom:2px solid var(--dark)}
.shot{display:block;width:100%;border:2px solid var(--dark)}
iframe{width:100%;height:360px;border:2px solid var(--dark);background:#050810;margin-top:14px}
footer{text-align:center;color:var(--muted);font-size:12px;padding:10px}
.dock{position:fixed;left:0;right:0;bottom:0;height:52px;display:flex;justify-content:center;
 align-items:center;gap:10px;background:linear-gradient(180deg,#bdbdbd,#8f8f8f);
 border-top:2px solid var(--light)}
.dock a{width:34px;height:34px;display:grid;place-content:center;text-decoration:none;
 font-size:18px;background:var(--win);border-top:2px solid var(--light);
 border-left:2px solid var(--light);border-right:2px solid var(--dark);border-bottom:2px solid var(--dark)}
@media(max-width:640px){iframe{height:280px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style></head><body><div class="wrap">
<div class="stripes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
<section class="window"><div class="titlebar"><span class="gadget"></span><span class="name">Virtueller Feldgenerator</span><span class="gadget"></span></div>
<div class="inner">
<h1>All-In-One</h1>
<p class="lead">Bild, Demo, echtes MusicLine-Modul und ein Paula-Emulator in einer Datei. Der Ton entsteht im Browser aus den Samples des Moduls und stoppt beim Weiterscrollen.</p>
<div class="cards">
<div class="card"><span class="tag">Hören</span><h3>OctaGroover</h3>
<p>Das Original-Modul von 1995. Der Emulator liest die echten Samples.</p>
<div class="controls"><button id="play" type="button">Ton abspielen</button>
<a class="btn" id="mod" download="Ml.OctaGroover">Modul speichern</a></div></div>
<div class="card"><span class="tag">Sehen</span><h3>Boing Ball</h3>
<p>Die Demo läuft direkt aus der Datei — im Fenster weiter unten.</p></div>
</div>
<iframe id="frame" title="Boing Ball Demo"></iframe>
</div></section>
<section class="window"><div class="titlebar"><span class="gadget"></span><span class="name">Das Bild</span><span class="gadget"></span></div>
<div class="inner"><img class="shot" alt="Virtueller Feldgenerator mit Boing Ball" src="data:image/png;base64,${PNG.toString("base64")}"></div></section>
<section class="window"><div class="titlebar"><span class="gadget"></span><span class="name">Ein Witz</span><span class="gadget"></span></div>
<div class="inner"><p>„Mir reichts! Ich geh schaukeln! Meine Freunde gehen rutschen!"</p>
<p><small>Der Witz ist auf Deutsch. Im Projekt steht er in sechs Sprachen.</small></p></div></section>
<footer>Eine Datei. Offen. Noch nicht mit echten Nutzern getestet.</footer>
</div>
<nav class="dock" aria-label="Dock"><a href="index.html" title="Start">▣</a><a href="field-generator.html" title="Feld">◈</a><a href="boing-ball.html" title="Ball">●</a></nav>
<script>
${PAULA.replace(/<\/script>/gi,"<\\/script>")}
</script>
<script type="text/plain" id="demo">${DEMO.replace(/<\/script>/gi,"<\\/script>")}</script>
<script>
document.getElementById("frame").srcdoc=document.getElementById("demo").textContent;
const modB64="${MOD.toString("base64")}";
document.getElementById("mod").href="data:application/octet-stream;base64,"+modB64;
let playing=null, stopTimer=null;
function stop(){
  if(stopTimer){clearTimeout(stopTimer);stopTimer=null;}
  if(playing){try{playing.stop()}catch(e){}playing=null;}
}
function play(){
  try{
    stop();
    const bin=atob(modB64),bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    const pcm=MLPaula.render(bytes,22050,19);
    const AC=window.AudioContext||window.webkitAudioContext;
    if(!AC)return false;
    const ctx=new AC();
    if(ctx.state==='suspended')ctx.resume();
    const buf=ctx.createBuffer(1,pcm.length,22050),f32=buf.getChannelData(0);
    for(let i=0;i<pcm.length;i++)f32[i]=pcm[i]/32768;
    const src=ctx.createBufferSource();src.buffer=buf;src.connect(ctx.destination);
    src.start();playing=src;
    stopTimer=setTimeout(stop,19000);
    return true;
  }catch(e){return false;}
}
document.getElementById("play").addEventListener("click",play);
addEventListener("scroll",stop,{passive:true});
if(!play()) document.getElementById("play").textContent="Ton starten";
const frame=document.getElementById("frame");
frame.onload=()=>{try{const g=frame.contentDocument&&frame.contentDocument.getElementById("go");if(g)g.click();}catch(e){}};
</script></body></html>`;
writeFileSync("outreach/media/ALL-IN-ONE.html", html);
console.log("PNG:",(cleanPng.length/1024).toFixed(0),"KB | HTML:",(Buffer.byteLength(html)/1024).toFixed(0),"KB");
