// GitHub OAuth 2.0. Kein Geheimnis im Code. Alles aus der Umgebung.
//   GITHUB_CLIENT_ID     (Pflicht)
//   GITHUB_CLIENT_SECRET (Pflicht, GitHub verlangt den Secret beim Tausch)
//   GITHUB_REDIRECT_URI  (Standard: http://localhost:8126/callback)
// Token und State bleiben lokal in tools/github/runtime/ und nie in git.
import { randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));
export const runtime = join(here, "runtime");
export const tokenFile = join(runtime, "token.json");
export const stateFile = join(runtime, "oauth-state.json");

export const AUTH_URL = "https://github.com/login/oauth/authorize";
export const TOKEN_URL = "https://github.com/login/oauth/access_token";
export const API_URL = "https://api.github.com/user";
export const SCOPE = "read:user";

export const clientId = () => process.env.GITHUB_CLIENT_ID || "";
export const clientSecret = () => process.env.GITHUB_CLIENT_SECRET || "";
export const redirectUri = () =>
  process.env.GITHUB_REDIRECT_URI || "http://localhost:8126/callback";
export const configured = () => !!(clientId() && clientSecret());

function ensure() { mkdirSync(runtime, { recursive: true }); }

export function saveState(state) {
  ensure();
  writeFileSync(stateFile, JSON.stringify({ state, at: Date.now() }), { mode: 0o600 });
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
  writeFileSync(tokenFile, JSON.stringify({ ...token, at: Date.now() }), { mode: 0o600 });
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
  const state = randomBytes(24).toString("base64url");
  saveState(state);
  const p = new URLSearchParams({
    client_id: clientId(),
    redirect_uri: redirectUri(),
    scope: SCOPE,
    state
  });
  return AUTH_URL + "?" + p.toString();
}

export async function exchange(code, state) {
  const saved = loadState();
  if (!saved || saved.state !== state) throw new Error("State passt nicht.");
  clearState();
  const r = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId(),
      client_secret: clientSecret(),
      code,
      redirect_uri: redirectUri()
    })
  });
  const text = await r.text();
  let data = {};
  try { data = JSON.parse(text); } catch (e) { /* leere Antwort */ }
  if (!r.ok || data.error) {
    throw new Error("GitHub lehnte ab: " + (data.error_description || data.error || r.status));
  }
  if (!data.access_token) throw new Error("Kein Zugriffstoken erhalten.");
  saveToken(data);
  return data;
}

export async function userInfo() {
  const token = loadToken();
  if (!token || !token.access_token) return null;
  const r = await fetch(API_URL, {
    headers: {
      Authorization: "Bearer " + token.access_token,
      Accept: "application/vnd.github+json",
      "User-Agent": "easy-read-login"
    }
  });
  if (!r.ok) return null;
  return r.json();
}
