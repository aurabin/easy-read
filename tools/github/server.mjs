// Freier Zugang mit GitHub-Login. Lokal, nur 127.0.0.1. Kein Produktivserver.
// Start: node tools/github/server.mjs   (Port 8126)
import { createServer } from "http";
import {
  authUrl, exchange, userInfo, clearToken, loadToken,
  configured, redirectUri, SCOPE
} from "./oauth.mjs";

const port = Number(process.env.PORT || 8126);
const esc = s => String(s || "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function html(body) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>GitHub Login — freier Zugang</title><style>
body{margin:0;background:#3a4a6a;color:#1a1a1a;font:14px/1.5 Arial,sans-serif}
main{max-width:620px;margin:0 auto;padding:20px}
.box{background:#d8d8d8;border:2px solid #fff;border-right-color:#707070;
 border-bottom-color:#707070;padding:18px;margin-bottom:14px}
h1{font-size:22px;margin:0 0 8px}button{font:inherit;padding:7px 14px;cursor:pointer;
 background:#24292f;color:#fff;border:0}a{color:#204090}
code{background:#c4c4c4;padding:2px 5px}small{color:#404040}
.free{background:#2f6b1f;color:#f4f8dc;padding:12px}
</style></head><body><main>${body}</main></body></html>`;
}

function setupPage() {
  return html(`<div class="box"><h1>GitHub Login</h1>
<p><strong>Noch nicht eingerichtet.</strong></p>
<p>Setze <code>GITHUB_CLIENT_ID</code> und <code>GITHUB_CLIENT_SECRET</code>.</p>
<p>In der GitHub OAuth-App muss diese Adresse eingetragen sein:</p>
<p><code>${esc(redirectUri())}</code></p>
<p>Bereich: <code>${esc(SCOPE)}</code></p>
<p><small>Kein Client? Kein Login. Der Zugang bleibt trotzdem frei.</small></p></div>`);
}

async function page() {
  const token = loadToken();
  const info = token ? await userInfo() : null;
  const status = info
    ? `<p><strong>Angemeldet als ${esc(info.login)}</strong></p>`
    : `<p><strong>Nicht angemeldet.</strong></p>
       <p><a href="/login"><button type="button">Mit GitHub anmelden</button></a></p>`;
  return html(`<div class="box"><h1>GitHub Login</h1>${status}
<p><a href="/logout">Abmelden</a></p></div>
<div class="box free"><strong>Freier Zugang für alle.</strong>
<p>Kein Abo. Keine Bezahlung. Keine Werbung. Keine Datenverkäufe.</p></div>
<div class="box"><h2>Was der Login macht</h2>
<p>Er zeigt nur, dass du ein GitHub-Konto hast.
Er schickt keine E-Mails und sperrt nichts.
Alle Lektionen bleiben frei zugänglich.</p>
<p><small>Token bleibt lokal. Nicht mit echten Nutzern getestet.</small></p></div>`);
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
    if (path === "/callback") {
      const code = url.searchParams.get("code") || "";
      const state = url.searchParams.get("state") || "";
      if (!code || !state) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html("<p>Kein Code oder State. Bitte neu versuchen.</p>"));
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
  console.log(`GitHub-Login auf http://localhost:${port}`));
