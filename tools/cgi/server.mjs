// Mini-Webserver: echte CGI pro Anfrage + statische Dateien aus docs/.
// Start: node tools/cgi/server.mjs   (Port 8124)
//   /            → CGI-Gästebuch
//   /cgi         → CGI-Gästebuch
//   /suno        → CGI-Suno-Brücke (JSON)
//   /apps/....   → statische Datei aus docs/
// Nur für lokale Nutzung. Kein Produktivserver.
import { createServer } from "http";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { readFileSync, existsSync } from "fs";
import { join, extname, normalize } from "path";

const handler = fileURLToPath(new URL("./handler.mjs", import.meta.url));
const port = Number(process.env.PORT || 8124);
const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".wasm": "application/wasm", ".ico": "image/x-icon"
};

function staticFile(urlPath, res) {
  let rel = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, "");
  if (!rel || rel.endsWith("/")) rel += "index.html";
  if (rel.split(/[/\\]/).some(p => p === "..")) {
    res.writeHead(403); res.end("Nein."); return;
  }
  const candidates = [join(root, "docs", rel), join(root, rel)];
  let found = null;
  for (const p of candidates) {
    try { if (existsSync(p)) { found = p; break; } } catch (e) { /* egal */ }
  }
  if (!found) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Nicht gefunden.");
    return;
  }
  try {
    const body = readFileSync(found);
    res.writeHead(200, { "Content-Type": types[extname(found).toLowerCase()] || "application/octet-stream" });
    res.end(body);
  } catch (e) {
    res.writeHead(500); res.end("Lesen ging nicht.");
  }
}

createServer((req, res) => {
  const url = req.url || "/";
  const path = url.split("?")[0].replace(/\/+$/, "") || "/";
  if (path !== "/suno" && path !== "/cgi" && path !== "/") {
    staticFile(url.split("?")[0], res);
    return;
  }
  const chunks = [];
  req.on("data", c => chunks.push(c));
  req.on("end", () => {
    const body = Buffer.concat(chunks);
    const child = spawn(process.execPath, [handler], {
      cwd: root,
      env: {
        ...process.env,
        REQUEST_METHOD: req.method || "GET",
        QUERY_STRING: url.split("?")[1] || "",
        PATH_INFO: path,
        CONTENT_LENGTH: String(body.length),
        CONTENT_TYPE: (req.headers["content-type"] || "").split(";")[0]
      },
      stdio: ["pipe", "pipe", "pipe"]
    });
    let out = "", err = "";
    child.stdout.on("data", c => out += c);
    child.stderr.on("data", c => err += c);
    child.on("close", () => {
      if (err) console.error("[CGI]", err.trim());
      const cut = out.indexOf("\r\n\r\n");
      if (cut < 0) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("CGI hat keinen Kopf geschrieben.");
        return;
      }
      const head = {};
      for (const line of out.slice(0, cut).split("\r\n")) {
        const i = line.indexOf(":");
        if (i > 0) head[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      }
      res.writeHead(200, head);
      res.end(out.slice(cut + 4));
    });
    child.stdin.end(body);
  });
}).listen(port, () => console.log(`CGI-Server auf http://localhost:${port}`));
