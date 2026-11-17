// Nebentask: E-Mail senden ueber die Gmail-API.
// Kein Passwort im Code. Der Zugriff kommt aus GMAIL_ACCESS_TOKEN.
// Ohne Token oder ohne --send passiert nichts (Dry Run).
// Nutzung: node tools/email/send.mjs nachricht.json [--send]
// Die JSON-Datei enthaelt: to, subject, body (oder bodyFile).
import { readFileSync, existsSync } from "fs";

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith("--"));
const flags = new Set(args.filter(a => a.startsWith("--")));

function fail(msg) {
  console.error("FEHLER: " + msg);
  process.exit(1);
}
if (!file) fail("Keine Nachrichten-Datei. Nutzung: send.mjs datei.json [--send]");
if (!existsSync(file)) fail("Datei nicht gefunden: " + file);

let msg;
try { msg = JSON.parse(readFileSync(file, "utf8")); }
catch (e) { fail("Kein gueltiges JSON: " + e.message); }

const to = String(msg.to || "").trim();
const subject = String(msg.subject || "").trim();
let body = String(msg.body || "");
if (msg.bodyFile) {
  if (!existsSync(msg.bodyFile)) fail("bodyFile nicht gefunden: " + msg.bodyFile);
  body = readFileSync(msg.bodyFile, "utf8");
}
const placeholder = /\[|\]/.test(to);
if (!to || (!to.includes("@") && !placeholder)) fail("Keine gueltige Empfaenger-Adresse.");
if (!subject) fail("Kein Betreff.");
if (!body.trim()) fail("Kein Text.");

// Der Login-Nebentask legt das Token lokal ab. Die Umgebung hat Vorrang.
let token = process.env.GMAIL_ACCESS_TOKEN || "";
if (!token) {
  try {
    const local = JSON.parse(
      readFileSync(new URL("../google/runtime/token.json", import.meta.url), "utf8")
    );
    token = local.access_token || "";
  } catch (e) { /* kein Login vorhanden */ }
}
const from = process.env.GMAIL_FROM || "me";
const wantsSend = flags.has("--send");
if (wantsSend && placeholder) fail("Platzhalter-Adresse. Bitte echte Adresse eintragen.");

function mime() {
  const enc = v => Buffer.from(v, "utf8").toString("base64");
  const subj = "=?UTF-8?B?" + enc(subject) + "?=";
  const b64 = enc(body).match(/.{1,76}/g).join("\r\n");
  return `From: ${from}\r\nTo: ${to}\r\nSubject: ${subj}\r\n` +
    `MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n` +
    `Content-Transfer-Encoding: base64\r\n\r\n${b64}`;
}

const payload = { raw: Buffer.from(mime(), "utf8").toString("base64url") };

if (!token || !wantsSend) {
  console.log("DRY RUN — es wurde NICHTS gesendet.");
  console.log("An: " + to);
  console.log("Betreff: " + subject);
  console.log("Zeichen im Text: " + body.length);
  console.log("Token vorhanden: " + (token ? "ja" : "nein"));
  console.log("--send gesetzt: " + (wantsSend ? "ja" : "nein"));
  console.log("Zum Senden: GMAIL_ACCESS_TOKEN setzen und --send anhaengen.");
  process.exit(0);
}

try {
  const r = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );
  const text = await r.text();
  if (!r.ok) {
    console.error("Gmail antwortete " + r.status + ": " + text.slice(0, 400));
    process.exit(1);
  }
  const data = JSON.parse(text);
  console.log("Gesendet. Nachricht-ID: " + (data.id || "unbekannt"));
} catch (e) {
  console.error("Senden fehlgeschlagen: " + e.message);
  process.exit(1);
}
