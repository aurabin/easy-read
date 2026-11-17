// One self-contained file: the JPEG (with the generator hidden inside it) is
// embedded as a data URI, and a tiny auto-runner starts the extracted code.
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const here = dirname(fileURLToPath(import.meta.url));
const jpg = readFileSync(join(here, "field-demo.jpg"));
const DATA = "data:image/jpeg;base64," + jpg.toString("base64");
const out = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Field Demo — one file</title>
<style>
body{background:#070b14;color:#eaf2ff;font:15px/1.5 system-ui,sans-serif;margin:0;padding:18px}
h1{font-size:20px;margin:0 0 6px}p{color:#9fb3d1;max-width:70ch;font-size:14px}
img{max-width:min(460px,100%);display:none;border-radius:10px}
iframe{width:100%;height:min(82vh,920px);border:1px solid #24344f;border-radius:12px;background:#070b14}
.msg{font:12px monospace;color:#6fd3ff;min-height:18px}
button{font:inherit;cursor:pointer;border:1px solid #24344f;background:#17253d;color:#eaf2ff;border-radius:8px;padding:7px 12px;margin:4px 4px 4px 0}
</style></head><body>
<h1>Virtual Field Generator — standalone image</h1>
<p>This one file contains the JPEG, and the JPEG contains the full generator. It starts automatically. Nothing is downloaded; everything is offline.</p>
<p class="msg" id="msg">Loading…</p>
<button id="again" type="button">Restart</button>
<button id="src" type="button">Save source</button>
<iframe id="frame" title="Virtual field generator"></iframe>
<script>
(function(){
  var DATA = ${JSON.stringify(DATA)};
  var START = "%%FIELDGEN_START%%", END = "%%FIELDGEN_END%%";
  var source = null;
  function extract(){
    var bin = atob(DATA.split(",")[1]);
    var bytes = new Uint8Array(bin.length);
    for (var i=0;i<bin.length;i++) bytes[i] = bin.charCodeAt(i);
    var text = new TextDecoder("utf-8").decode(bytes);
    var a = text.indexOf(START), b = text.indexOf(END);
    if (a < 0 || b < 0) throw new Error("No source in image");
    return text.slice(a + START.length, b).replace(/^\\n+|\\n+$/g, "");
  }
  function inject(s){ return s.replace(/\\}\\)\\(\\);(\\s*<\\/script>)/, "start();\\n})();$1"); }
  function run(){
    try{
      if (!source) source = extract();
      document.getElementById("msg").textContent = "Started from the embedded JPEG (" + source.length + " chars).";
      var url = URL.createObjectURL(new Blob([inject(source)], {type:"text/html"}));
      document.getElementById("frame").src = url;
    }catch(e){ document.getElementById("msg").textContent = "Error: " + e.message; }
  }
  document.getElementById("again").addEventListener("click", run);
  document.getElementById("src").addEventListener("click", function(){
    try{
      if (!source) source = extract();
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([source], {type:"text/html"}));
      a.download = "field-generator.html"; a.click();
    }catch(e){ document.getElementById("msg").textContent = "Error: " + e.message; }
  });
  run();
})();
</script>
</body></html>`;
writeFileSync(join(here, "field-demo-standalone.html"), out);
console.log("standalone written:", out.length, "bytes");
