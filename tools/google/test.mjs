// Tests ohne echte Zugangsdaten. Es wird nichts gesendet und nichts geoeffnet.
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { authUrl, configured, redirectUri, SCOPES, clearState } from "./oauth.mjs";

let ok = true;
const check = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) ok = false;
};

const src = readFileSync(fileURLToPath(new URL("./oauth.mjs", import.meta.url)), "utf8");
check("kein Client-ID-Wert im Code", !/GOOGLE_CLIENT_ID\s*=\s*["'][^"']+/.test(src));
check("kein Token im Code", !/ya29\./.test(src));
check("PKCE aktiv", /S256/.test(src) && /code_challenge/.test(src));
check("State aktiv", /state/.test(src));
check("Scope enthaelt gmail.send", SCOPES.includes("gmail.send"));
check("Redirect ist localhost", /^http:\/\/localhost:/.test(redirectUri()));

process.env.GOOGLE_CLIENT_ID = "test-client.apps.googleusercontent.com";
check("konfiguriert wenn ID da", configured() === true);
const url = authUrl();
check("Auth-URL gebaut", url.startsWith("https://accounts.google.com/"));
check("Auth-URL hat client_id", url.includes("test-client.apps.googleusercontent.com"));
check("Auth-URL hat PKCE", url.includes("code_challenge_method=S256"));
check("Auth-URL hat state", /state=/.test(url));
check("Auth-URL hat gmail.send", decodeURIComponent(url).includes("gmail.send"));
clearState(); // keine Spuren im lokalen Ordner hinterlassen

console.log(ok ? "GOOGLE-LOGIN OK" : "GOOGLE-LOGIN FAIL");
process.exit(ok ? 0 : 1);
