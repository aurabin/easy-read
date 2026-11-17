// Test für das CGI-Programm. Ruft es direkt auf wie ein Webserver.
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { unlinkSync, existsSync } from "fs";

const handler = fileURLToPath(new URL("./handler.mjs", import.meta.url));
const dataFile = fileURLToPath(new URL("./test-messages.jsonl", import.meta.url));

function call(method, input = "", query = "", pathInfo = "/") {
  return spawnSync(process.execPath, [handler], {
    encoding: "utf8",
    input,
    env: {
      ...process.env,
      REQUEST_METHOD: method,
      QUERY_STRING: query,
      PATH_INFO: pathInfo,
      CONTENT_LENGTH: String(Buffer.byteLength(input)),
      CGI_DATA: dataFile,
      SUNO_API_KEY: "",
      SUNO_API_BASE: ""
    }
  });
}

let ok = true;
const check = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) ok = false;
};

if (existsSync(dataFile)) unlinkSync(dataFile);

const get = call("GET");
check("GET liefert Formular", /Content-Type: text\/html/.test(get.stdout) &&
  /<form/.test(get.stdout) && /\r\n\r\n/.test(get.stdout));
check("kein Fachwort im Formular", !/Gästebuch/.test(get.stdout));

const post = call("POST", "name=Anna&message=Hallo+Welt");
check("POST speichert Nachricht", /Danke/.test(post.stdout) &&
  /Hallo Welt/.test(post.stdout));

const empty = call("POST", "name=Anna&message=");
check("leere Nachricht wird abgelehnt", /Bitte schreib/.test(empty.stdout));

const evil = call("POST", "name=%3Cscript%3E&message=%3Cb%3Etest%3C%2Fb%3E");
check("HTML wird maskiert", !/<script>/.test(evil.stdout) &&
  /&lt;b&gt;test&lt;\/b&gt;/.test(evil.stdout));

const suno = call("POST", "prompt=Retro+Chunk", "", "/suno");
let sunoData = {};
try { sunoData = JSON.parse(suno.stdout.slice(suno.stdout.indexOf("\r\n\r\n") + 4)); }
catch (e) { /* leer */ }
check("Suno-Brücke ehrlich inaktiv", sunoData.connected === false &&
  /Retro Chunk/.test(sunoData.prompt || "") && !/SUNO_API_KEY=/.test(suno.stdout));
check("kein Schlüssel im Quelltext", !/Bearer [A-Za-z0-9]/.test(suno.stdout));

if (existsSync(dataFile)) unlinkSync(dataFile);
console.log(ok ? "CGI OK" : "CGI FAIL");
process.exit(ok ? 0 : 1);
