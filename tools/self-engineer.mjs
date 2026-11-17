// Self-Engineering: the project checks and repairs itself.
// Run from the project root: node tools/self-engineer.mjs
// Returns a small report. Exit code 0 = all good, 1 = problems found.
import { execFileSync } from "child_process";
import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

const node = process.execPath;
const gitExe = process.env.GIT ||
  [`${process.env.TEMP}/opencode/tools/git/bin/git.exe`, "git"].find(p=>p==="git"||existsSync(p));
const git = (args) => execFileSync(gitExe, args, { encoding:"utf8" }).trim();
const run = (args) => {
  try { return execFileSync(node, args, { encoding:"utf8", stdio:["ignore","pipe","pipe"] }); }
  catch(e){ return (e.stdout||"") + (e.stderr||"") + "\n" + e.message; }
};
const out = [];
let fails = 0;
const check = (name, ok, detail="") => {
  out.push(`${ok?"PASS":"FAIL"}  ${name}${detail?" — "+detail:""}`);
  if(!ok) fails++;
};

// 1. Prüfer-Tests
const tests = run([".opencode/skills/easy-read/scripts/test-readability.mjs"]);
check("Checker-Tests", /All \d+ tests passed/.test(tests), tests.trim().split("\n").pop());

// 2. Links
const links = run(["tools/link-check.cjs"]);
const broken = /broken: (\d+)/.exec(links)?.[1] ?? "?";
check("Lokale Links", broken === "0", `broken: ${broken}`);

// 3. WASM-Kernel
const wasm = run(["tools/wasm-test.cjs"]);
check("WASM-Kernel", /exports:.*advance/.test(wasm) && !/FAIL|Error/.test(wasm), wasm.trim().split("\n")[0]);

// 4. Deployment-Sync (selbst reparierend)
run(["field-generator/build-docs.mjs"]);
const docs = git(["status","--short","docs"]);
check("docs/ synchron", docs === "", docs ? "Änderungen nach Build" : "keine Änderungen");

// 5. Geheimhaltung
const idx = git(["ls-files","virtual_field_generator/*"]);
const local = existsSync("virtual_field_generator/field_generator.py");
check("privater Ordner", idx === "" && local, `im Index: ${idx?idx.split("\n").length:0}, lokal: ${local}`);

// 6. Lesbarkeit aller Lektionen (überall 100/100 anstreben)
// Index-Dateien mit Dateipfaden und Tabellen werden nicht nach 100/100 bewertet.
const allMd = readdirSync("learn").filter(f=>f.endsWith(".md"));
const lessons = allMd.filter(f=>!/^readme\.md$/i.test(f));
let low = [];
// Die meisten Dateien erkennen ihre Sprache selbst.
// Mehrsprachige oder chinesische Dateien brauchen eine feste Zuordnung.
const fixedLang = {
  "joke.md": "de",
  "china-computer-history.md": "zh",
  "chinesisch-lernen.md": "zh",
};
for(const f of lessons){
  const args = [".opencode/skills/easy-read/scripts/readability.mjs"];
  if(fixedLang[f]) args.push("--lang", fixedLang[f]);
  args.push(join("learn",f));
  const r = run(args);
  const score = Number(/(\d+)\/100/.exec(r)?.[1] ?? 0);
  if(score < 100) low.push(`${f}:${score}`);
}
check("Easy Read 100/100", low.length===0, low.length?low.join(", "):`${lessons.length} Dateien`);

// 7. Artefakte vorhanden
const must = ["outreach/media/ALL-IN-ONE.html","outreach/media/All-In-One.PNG",
  "outreach/media/standalone.html","outreach/apps/cgi-music.html",
  "tools/cgi/handler.mjs","tools/cgi/server.mjs",
  "site/index.html","tools/paula-ml.js","AGENTS.md"];
const missing = must.filter(p=>!existsSync(p));
check("Kern-Artefakte", missing.length===0, missing.join(", ")||`${must.length} Dateien`);

// 8. Doppelte HTML-Artefakte erkennen
const singles = ["ALL-IN-ONE.html","All-In-One.PNG","standalone.html"];
const media = readdirSync("outreach/media").filter(f=>/^(all|standalone)/i.test(f));
check("keine Media-Duplikate",
  media.length===singles.length && media.every(f=>singles.includes(f)),
  media.join(", ")||"keine");

// 9. CGI-Programm
const cgi = run(["tools/cgi/test.mjs"]);
check("CGI-Programm", /CGI OK/.test(cgi) && !/FAIL/.test(cgi),
  cgi.trim().split("\n").pop());

// 10. Google-Login-Nebentask
const login = run(["tools/google/test.mjs"]);
check("Google-Login", /GOOGLE-LOGIN OK/.test(login) && !/FAIL/.test(login),
  login.trim().split("\n").pop());

// 11. GitHub-Login
const gh = run(["tools/github/test.mjs"]);
check("GitHub-Login", /GITHUB-LOGIN OK/.test(gh) && !/FAIL/.test(gh),
  gh.trim().split("\n").pop());

console.log(out.join("\n"));
console.log(fails===0 ? "\nSELF-ENGINEERING OK" : `\nSELF-ENGINEERING: ${fails} Problem(e)`);
process.exit(fails===0?0:1);
