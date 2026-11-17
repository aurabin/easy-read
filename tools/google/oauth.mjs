// Google OAuth 2.0 mit PKCE. Keine Geheimnisse im Code.
// Alles kommt aus der Umgebung:
//   GOOGLE_CLIENT_ID      (Pflicht)
//   GOOGLE_CLIENT_SECRET  (optional, nur bei vertraulichem Client)
//   GOOGLE_REDIRECT_URI   (Standard: http://localhost:8125/oauth2callback)
// Der Token bleibt lokal in tools/google/runtime/ und wird nie eingecheckt.
import { createHash, randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
export const runtime = join(here, "runtime");
export const tokenFile = join(runtime, "token.json");
export const stateFile = join(runtime, "oauth-state.json");

export const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const TOKEN_URL = "https://oauth2.googleapis.com/token";
export const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";
export const SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/gmail.send"
].join(" ");

export const clientId = () => process.env.GOOGLE_CLIENT_ID || "";
export const clientSecret = () => process.env.GOOGLE_CLIENT_SECRET || "";
export const redirectUri = () =>
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:8125/oauth2callback";
export const configured = () => !!clientId();

const b64u = b => Buffer.from(b).toString("base64url");
export const sha256 = s => createHash("sha256").update(s).digest();

function ensure() { mkdirSync(runtime, { recursive: true }); }

export function saveState(state, verifier) {
  ensure();
  writeFileSync(stateFile, JSON.stringify({ state, verifier, at: Date.now() }),
    { mode: 0o600 });
}
export function loadState() {
  try { return JSON.parse(readFileSync(stateFile, "utf8")); }
  catch (e) { return null; }
}
export function clearState() {
  try { unlinkSync(stateFile); } catch (e) { /* egal */ }
}

export function saveToken(token) {
  ensure();
  writeFileSync(tokenFile, JSON.stringify({ ...token, at: Date.now() }),
    { mode: 0o600 });
}
export function loadToken() {
  try { return JSON.parse(readFileSync(tokenFile, "utf8")); }
  catch (e) { return null; }
}
export function clearToken() {
  try { unlinkSync(tokenFile); } catch (e) { /* egal */ }
}

export function authUrl() {
  if (!configured()) return "";
  const verifier = b64u(randomBytes(32));
  const state = b64u(randomBytes(16));
  saveState(state, verifier);
  const p = new URLSearchParams({
    client_id: clientId(),
    redirect_uri: redirectUri(),
    response_type: "code",
    scope: SCOPES,
    state,
    code_challenge: b64u(sha256(verifier)),
    code_challenge_method: "S256",
    access_type: "online",
    prompt: "select_account"
  });
  return AUTH_URL + "?" + p.toString();
}

export async function exchange(code, state) {
  const saved = loadState();
  if (!saved || saved.state !== state) throw new Error("State passt nicht.");
  clearState();
  const body = new URLSearchParams({
    code,
    client_id: clientId(),
    redirect_uri: redirectUri(),
    grant_type: "authorization_code",
    code_verifier: saved.verifier
  });
  if (clientSecret()) body.set("client_secret", clientSecret());
  const r = await fetch(TOKEN_URL, { method: "POST", body });
  const text = await r.text();
  if (!r.ok) throw new Error("Token-Austausch fehlgeschlagen: " + r.status);
  const token = JSON.parse(text);
  if (!token.access_token) throw new Error("Kein Zugriffstoken erhalten.");
  saveToken(token);
  return token;
}

export async function userInfo() {
  const token = loadToken();
  if (!token || !token.access_token) return null;
  const r = await fetch(USERINFO_URL, {
    headers: { Authorization: "Bearer " + token.access_token }
  });
  if (!r.ok) return null;
  return r.json();
}
