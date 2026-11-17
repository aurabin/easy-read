// Login with Google — lokaler Server. Nur 127.0.0.1. Kein Produktivserver.
// Start: node tools/google/server.mjs   (Port 8125)
import { createServer } from "http";
import {
  authUrl, exchange, userInfo, clearToken, loadToken,
  configured, clientId, redirectUri, SCOPES
} from "./oauth.mjs";

const port = Number(process.env.PORT || 8125);

function esc(s) {
  return String(s || "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function html(body) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Login with Google — Easy Read</title><style>
body{margin:0;background:#3a4a6a;color:#1a1a1a;font:14px/1.5 Arial,sans-serif}
main{max-width:620px;margin:0 auto;padding:20px}
.box{background:#d8d8d8;border:2px solid #fff;border-right-color:#707070;
 border-bottom-color:#707070;padding:18px;margin-bottom:14px}
h1{font-size:22px;margin:0 0 8px}button{font:inherit;padding:7px 14px;cursor:pointer;
 background:#2a4a8a;color:#fff;border:0}a{color:#204090}
code{background:#c4c4c4;padding:2px 5px}small{color:#404040}
</style></head><body><main>${body}</main></body></html>`;
}

function setupPage() {
  return html(`<div class="box"><h1>Login with Google</h1>
<p><strong>Noch nicht eingerichtet.</strong></p>
<p>Setze <code>GOOGLE_CLIENT_ID</code> in der Umgebung.
Optional <code>GOOGLE_CLIENT_SECRET</code> und <code>GOOGLE_REDIRECT_URI</code>.</p>
<p>Der Client wird in der Google Cloud Console erstellt.
Die Weiterleitung muss dort eingetragen sein:</p>
<p><code>${esc(redirectUri())}</code></p>
<p>Bereiche: <code>${esc(SCOPES)}</code></p>
<p><small>Kein Client? Kein Login. Kein Token im Code.</small></p></div>`);
}

async function page() {
  const token = loadToken();
  const info = token ? await userInfo() : null;
  const status = info
    ? `<p><strong>Angemeldet als ${esc(info.email || info.name)}</strong></p>
       <p>Name: ${esc(info.name || "—")}</p>`
    : `<p><strong>Nicht angemeldet.</strong></p>
       <p><a href="/login"><button type="button">Mit Google anmelden</button></a></p>`;
  const send = token
    ? `<p>Jetzt kann der Mailer-Nebentask senden:</p>
       <p><code>node tools/email/send.mjs outreach/email-peri-fractic.json --send</code></p>`
    : "";
  return html(`<div class="box"><h1>Login with Google</h1>${status}
<p><a href="/logout">Abmelden</a></p></div>
<div class="box"><h2>E-Mail senden</h2>${send}
<p><small>Der Zugriff bleibt lokal. Kein Passwort im Code.
Nicht mit echten Nutzern getestet.</small></p></div>`);
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost:" + port);
  const path = url.pathname;
  try {
    if (path === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(configured() ? await page() : setupPage());
      return;
    }
    if (path === "/login") {
      if (!configured()) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(setupPage());
        return;
      }
      res.writeHead(302, { Location: authUrl() });
      res.end();
      return;
    }
    if (path === "/oauth2callback") {
      const code = url.searchParams.get("code") || "";
      const state = url.searchParams.get("state") || "";
      if (!code || !state) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html("<p>Kein Code oder kein State. Bitte neu versuchen.</p>"));
        return;
      }
      try {
        await exchange(code, state);
        res.writeHead(302, { Location: "/" });
        res.end();
      } catch (e) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html("<p>Anmeldung fehlgeschlagen: " + esc(e.message) + "</p>"));
      }
      return;
    }
    if (path === "/logout") {
      clearToken();
      res.writeHead(302, { Location: "/" });
      res.end();
      return;
    }
    res.writeHead(404); res.end("Nicht gefunden.");
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Fehler: " + e.message);
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Google-Login auf http://localhost:${port}`));
