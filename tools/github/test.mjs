// Tests ohne Zugangsdaten. Nichts wird gesendet, nichts geoeffnet.
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { authUrl, configured, redirectUri, SCOPE, clearState } from "./oauth.mjs";

let ok = true;
const check = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) ok = false;
};

const src = readFileSync(fileURLToPath(new URL("./oauth.mjs", import.meta.url)), "utf8");
check("kein Client-ID-Wert im Code", !/GITHUB_CLIENT_ID\s*=\s*["'][^"']+/.test(src));
check("kein Secret-Wert im Code", !/GITHUB_CLIENT_SECRET\s*=\s*["'][^"']+/.test(src));
check("kein Token im Code", !/gho_[A-Za-z0-9]/.test(src));
check("State aktiv", /state/.test(src));
check("Scope minimal", SCOPE === "read:user");
check("Redirect lokal", /^http:\/\/localhost:/.test(redirectUri()));

process.env.GITHUB_CLIENT_ID = "testclient";
process.env.GITHUB_CLIENT_SECRET = "testsecret";
check("konfiguriert wenn beide da", configured() === true);
const url = authUrl();
check("Auth-URL gebaut", url.startsWith("https://github.com/login/oauth/authorize"));
check("Auth-URL hat client_id", url.includes("client_id=testclient"));
check("Auth-URL hat state", /state=/.test(url));
check("Auth-URL hat scope", decodeURIComponent(url).includes("read:user"));
clearState(); // keine Spuren im lokalen Ordner hinterlassen

console.log(ok ? "GITHUB-LOGIN OK" : "GITHUB-LOGIN FAIL");
process.exit(ok ? 0 : 1);
