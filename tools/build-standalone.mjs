// Build two clean artifacts:
//   All-In-One.PNG   - a valid PNG with payloads in tEXt chunks (no trailing text)
//   ALL-IN-ONE.html  - a designed, garbage-free page with the image as a data URI,
//                      the Boing Ball demo, the real module and a Paula emulator.
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

// ---- 2. clean, designed HTML ----
const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>All-In-One — Virtueller Feldgenerator</title>
<style>
:root{--bg:#070b14;--panel:#0e1626;--ink:#eaf2ff;--muted:#9fb3d1;
--line:#24344f;--teal:#0f766e;--sky:#6fd3ff;--violet:#7a20d0;
--red:#e8382f;--cream:#f5f0e6}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,sans-serif}
a{color:var(--sky)}
a:focus-visible,button:focus-visible{outline:2px solid var(--sky);outline-offset:3px}
.wrap{max-width:980px;margin:0 auto;padding:0 20px 56px}
.hero{position:relative;overflow:hidden;padding:44px 0 28px;border-bottom:1px solid var(--line)}
.grid{position:absolute;inset:0 0 auto 0;height:260px;pointer-events:none;
 background-image:linear-gradient(rgba(122,32,208,.22) 1px,transparent 1px),
  linear-gradient(90deg,rgba(122,32,208,.22) 1px,transparent 1px);
 background-size:32px 32px;-webkit-mask-image:linear-gradient(180deg,#000,transparent);
 mask-image:linear-gradient(180deg,#000,transparent)}
.hero-in{position:relative;display:flex;gap:26px;align-items:center;flex-wrap:wrap}
.ball{width:88px;height:88px;border-radius:50%;flex:0 0 auto;background-color:var(--cream);
 background-image:linear-gradient(45deg,var(--red) 25%,transparent 25%,transparent 75%,var(--red) 75%),
  linear-gradient(45deg,var(--red) 25%,transparent 25%,transparent 75%,var(--red) 75%);
 background-size:22px 22px;background-position:0 0,11px 11px;
 box-shadow:0 0 0 2px rgba(255,255,255,.28),0 0 36px rgba(232,56,47,.42)}
.eyebrow{margin:0 0 8px;color:var(--sky);font:12px ui-monospace,Consolas,monospace;
 letter-spacing:.14em;text-transform:uppercase}
h1{font-size:clamp(28px,5vw,44px);line-height:1.12;margin:0;letter-spacing:-.02em}
.lead{margin:12px 0 0;max-width:52ch;color:var(--muted)}
section{margin-top:44px}
.sec-head{display:flex;align-items:baseline;gap:14px;margin-bottom:18px;padding-bottom:10px;
 border-bottom:1px solid var(--line)}
.sec-num{color:var(--teal);font:12px ui-monospace,Consolas,monospace}
h2{margin:0;font-size:clamp(20px,3vw,26px)}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
.card{position:relative;overflow:hidden;background:var(--panel);border:1px solid var(--line);
 border-radius:14px;padding:20px}
.card:before{content:"";position:absolute;left:0;right:0;top:0;height:3px;
 background:repeating-linear-gradient(90deg,var(--red) 0 12px,var(--cream) 12px 24px)}
.card h3{margin:6px 0 8px;font-size:19px}
.card p{margin:0;color:var(--muted)}
.tag{color:var(--sky);font:11px ui-monospace,Consolas,monospace;text-transform:uppercase;letter-spacing:.1em}
.shot{display:block;width:100%;border:1px solid var(--line);border-radius:14px}
.controls{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-top:18px}
button{cursor:pointer;font:inherit;color:#fff;background:var(--teal);
 border:1px solid var(--teal);border-radius:8px;padding:10px 16px}
.btn{text-decoration:none;color:var(--ink);background:transparent;
 border:1px solid var(--line);border-radius:8px;padding:9px 15px}
iframe{width:100%;height:360px;border:1px solid var(--line);border-radius:12px;
 background:#050810;margin-top:18px}
.joke{position:relative;overflow:hidden;margin-top:44px;padding:22px;background:var(--panel);
 border:1px solid var(--line);border-left:4px solid var(--violet);border-radius:14px}
.joke p{margin:6px 0;color:var(--ink)}
.joke small{color:var(--muted)}
footer{border-top:1px solid var(--line);margin-top:48px;padding-top:18px;color:var(--muted);font-size:14px}
@media(max-width:640px){.ball{width:68px;height:68px}iframe{height:280px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style></head><body><div class="wrap">
<header class="hero"><div class="grid" aria-hidden="true"></div><div class="hero-in">
<div class="ball" role="img" aria-label="Karierte Kugel"></div><div>
<p class="eyebrow">Ein Artefakt</p><h1>Virtueller Feldgenerator</h1>
<p class="lead">Bild, Demo, echtes MusicLine-Modul und ein Paula-Emulator in einer Datei. Der Ton entsteht im Browser aus den Samples des Moduls und stoppt beim Weiterscrollen.</p>
</div></div></header>
<main>
<section aria-labelledby="player"><div class="sec-head"><span class="sec-num">01</span><h2 id="player">Spieler</h2></div>
<div class="cards">
<article class="card"><span class="tag">Hören</span><h3>OctaGroover</h3>
<p>Das Original-Modul von 1995. Der Emulator liest die echten Samples.</p>
<div class="controls"><button id="play" type="button">Ton abspielen</button>
<a class="btn" id="mod" download="Ml.OctaGroover">Modul speichern</a></div></article>
<article class="card"><span class="tag">Sehen</span><h3>Boing Ball</h3>
<p>Die Demo läuft direkt aus der Datei — im Rahmen weiter unten.</p></article>
</div>
<iframe id="frame" title="Boing Ball Demo"></iframe>
</section>
<section aria-labelledby="bild"><div class="sec-head"><span class="sec-num">02</span><h2 id="bild">Das Bild</h2></div>
<img class="shot" alt="Virtueller Feldgenerator mit Boing Ball" src="data:image/png;base64,${PNG.toString("base64")}">
</section>
<section class="joke" aria-labelledby="witz"><span class="sec-num">03</span><h2 id="witz">Ein Witz</h2>
<p>„Mir reichts! Ich geh schaukeln! Meine Freunde gehen rutschen!"</p>
<small>Der Witz ist auf Deutsch. Im Projekt steht er in sechs Sprachen.</small></section>
</main>
<footer>Eine Datei. Offen. Noch nicht mit echten Nutzern getestet.</footer>
</div>
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
    // Automatisches Ende nach einem vollen Stück.
    stopTimer=setTimeout(stop,19000);
    return true;
  }catch(e){return false;}
}
document.getElementById("play").addEventListener("click",play);
addEventListener("scroll",stop,{passive:true});
// Automatischer Start. Browser mit Autoplay-Sperre behalten den Button.
if(!play()) document.getElementById("play").textContent="Ton starten";
// Die Demo im Rahmen ebenfalls automatisch starten.
addEventListener("load",()=>{
  try{
    const f=document.getElementById("frame");
    const g=f.contentDocument&&f.contentDocument.getElementById("go");
    if(g)g.click();
  }catch(e){}
});
</script></body></html>`;
writeFileSync("outreach/media/ALL-IN-ONE.html", html);

console.log("PNG:",(cleanPng.length/1024).toFixed(0),"KB | HTML:",(Buffer.byteLength(html)/1024).toFixed(0),"KB");
