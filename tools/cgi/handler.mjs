// Common Gateway Interface — ein kleines CGI-Programm.
// Läuft als eigenes Programm pro Anfrage. Liest env + stdin, schreibt HTTP-Kopf + Body.
// Zwei Wege: / = Gästebuch (HTML), /suno = Brücke zu Suno (JSON).
// Nur schriftlich. Kein Video, kein Anruf. Keine Werbung, keine Datenverkäufe.
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { dirname } from "path";

const method = process.env.REQUEST_METHOD || "GET";
const query = process.env.QUERY_STRING || "";
const len = Number(process.env.CONTENT_LENGTH || 0);
const dataFile = process.env.CGI_DATA || "tools/cgi/messages.jsonl";
const pathInfo = (process.env.PATH_INFO || "/").replace(/\/+$/, "") || "/";
const getParams = parse(query);

function esc(s) {
  return String(s || "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function parse(input) {
  const out = {};
  for (const pair of String(input || "").split("&")) {
    if (!pair) continue;
    const i = pair.indexOf("=");
    const k = i < 0 ? pair : pair.slice(0, i);
    const v = i < 0 ? "" : pair.slice(i + 1);
    try {
      out[decodeURIComponent(k.replace(/\+/g, " "))] =
        decodeURIComponent(v.replace(/\+/g, " "));
    } catch (e) { /* kaputte Zeichen ignorieren */ }
  }
  return out;
}

async function readBody() {
  let raw = "";
  if (len > 0) {
    for await (const chunk of process.stdin) raw += chunk;
  }
  return raw;
}

function send(type, body) {
  process.stdout.write(
    `Content-Type: ${type}\r\nCache-Control: no-store\r\n\r\n${body}`
  );
}

function page(title, body) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><style>
body{margin:0;background:#8c8c8c;color:#1f1f1f;font:14px/1.5 Arial,sans-serif}
main{max-width:640px;margin:0 auto;padding:18px}
.box{background:#d9d9d9;border:2px solid #fff;border-right-color:#5a5a5a;
 border-bottom-color:#5a5a5a;padding:16px}
label{display:block;margin-top:8px}
input,textarea{width:100%;font:inherit;padding:6px;box-sizing:border-box}
button{font:inherit;padding:6px 14px;margin-top:10px;cursor:pointer}
.msg{background:#c4c4c4;border:2px solid #5a5a5a;padding:8px;margin-top:8px}
small{color:#4c4c4c}
</style></head><body><main>${body}</main></body></html>`;
}

function form(note = "") {
  return page("Schreib uns", `
<div class="box">
<h1>Schreib uns</h1>
<p>Schreib eine kurze Nachricht. Nur Text. Kein Video, kein Anruf.</p>
${note ? `<p><strong>${esc(note)}</strong></p>` : ""}
<form method="post" action="">
<label>Name (freiwillig)<input name="name" maxlength="40"></label>
<label>Nachricht<textarea name="message" rows="4" maxlength="500" required></textarea></label>
<button type="submit">Senden</button>
</form>
<p><small>Deine Nachricht wird lokal auf diesem Rechner gespeichert.
Keine Namen von anderen. Keine Fotos. Nicht mit echten Nutzern getestet.</small></p>
</div>` + recent());
}

function recent() {
  let lines = [];
  try {
    if (existsSync(dataFile)) {
      lines = readFileSync(dataFile, "utf8").trim().split("\n").filter(Boolean);
    }
  } catch (e) { /* keine Datei */ }
  if (!lines.length) return "";
  const last = lines.slice(-5).reverse().map(line => {
    let m = {};
    try { m = JSON.parse(line); } catch (e) { return ""; }
    return `<div class="msg"><strong>${esc(m.name || "Gast")}</strong> —
      ${new Date(m.time).toLocaleString("de-DE")}<br>${esc(m.message)}</div>`;
  }).join("");
  return `<div class="box"><h2>Letzte Nachrichten</h2>${last}</div>`;
}

async function post() {
  const d = parse(await readBody());
  const message = (d.message || "").trim();
  if (!message) return form("Bitte schreib eine Nachricht.");
  const record = {
    time: new Date().toISOString(),
    name: (d.name || "").trim().slice(0, 40),
    message: message.slice(0, 500)
  };
  try {
    mkdirSync(dirname(dataFile), { recursive: true });
    appendFileSync(dataFile, JSON.stringify(record) + "\n", "utf8");
  } catch (e) {
    return form("Speichern ging nicht. Bitte später versuchen.");
  }
  return form("Danke. Deine Nachricht ist gespeichert.");
}

// Suno-Brücke. Der Schlüssel steht NIE im Quelltext, nur in der Umgebung.
async function suno() {
  const raw = method === "POST" ? await readBody() : "";
  const d = method === "POST" ? parse(raw) : getParams;
  const prompt = String(d.prompt || "").trim().slice(0, 1000);
  const key = process.env.SUNO_API_KEY || "";
  const base = process.env.SUNO_API_BASE || "";
  const connected = !!(key && base);

  if (!connected) {
    send("application/json; charset=utf-8", JSON.stringify({
      connected: false,
      status: "nicht verbunden",
      reason: "Suno gibt Programmen keinen offenen Weg. " +
              "Du brauchst einen eigenen Zugang. Wir speichern ihn nicht.",
      prompt: prompt,
      hint: "Kopiere den Satz nach suno.com. Oder lade ein Lied im Studio."
    }));
    return;
  }

  try {
    const url = base.replace(/\/+$/, "") + "/generate";
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ prompt: prompt, model: d.model || "v6" })
    });
    const data = await r.json().catch(() => ({}));
    send("application/json; charset=utf-8", JSON.stringify({
      connected: true, ok: r.ok, status: r.status, data: data
    }));
  } catch (e) {
    send("application/json; charset=utf-8", JSON.stringify({
      connected: true, ok: false, error: String(e && e.message || e)
    }));
  }
}

if (pathInfo === "/suno") {
  await suno();
} else {
  const body = method === "POST" ? await post() : form(getParams.hinweis || "");
  send("text/html; charset=utf-8", body);
}
