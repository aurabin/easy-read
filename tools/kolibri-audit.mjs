// Audit: which project files are usable on KolibriOS?
import { readdirSync, writeFileSync } from "fs";
import { join, relative, extname } from "path";
const root = "C:/Users/icaro/OneDrive/Dokumente/Standardprojekt";
const files = [];
(function walk(d) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (e.name === ".git") continue;
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else files.push(relative(root, p).replace(/\\/g, "/"));
  }
})(root);

function classify(p) {
  const ext = extname(p).toLowerCase();
  const name = p.split("/").pop();
  if (p.includes("/kolibrios/")) {
    if (name === "BOING" || name === "FIELD" || name === "boing-kolibri" || name === "field-kolibri") return ["JA", "natives Programm (FASM, MENUET01)"];
    if (ext === ".asm") return ["JA", "FASM-Quelle für KolibriOS"];
    if (ext === ".png") return ["JA", "Bild"];
    if (ext === ".txt" || ext === ".md") return ["JA", "Text"];
  }
  if ([".md", ".txt", ".wat"].includes(ext)) return ["JA", "einfacher Text"];
  if ([".png", ".jpg", ".jpeg", ".bmp"].includes(ext)) return ["JA", "Bild"];
  if (ext === ".svg") return ["TEILWEISE", "Vektor — PNG ist besser"];
  if (ext === ".asm") return ["NEIN", "6502/68000 — andere CPU"];
  if ([".html", ".htm"].includes(ext)) return ["NEIN", "braucht Browser mit JavaScript"];
  if (ext === ".wasm") return ["NEIN", "keine WebAssembly-Laufzeit"];
  if ([".mjs", ".js"].includes(ext)) return ["NEIN", "braucht Node.js"];
  if ([".json", ".jsonc"].includes(ext)) return ["NEIN", "Konfiguration"];
  return ["UNKLAR", ext || "ohne Endung"];
}

const rows = files.map(p => ({ p, c: classify(p) }));
const counts = { JA: 0, TEILWEISE: 0, NEIN: 0, UNKLAR: 0 };
for (const r of rows) counts[r.c[0]]++;

let out = "# KolibriOS-Audit: alle Dateien\n\n";
out += "Automatisch geprüft. Eine Datei ist 'JA', wenn KolibriOS sie anzeigen\n";
out += "oder ausführen kann. Stand: alle Dateien im Projekt.\n\n";
out += "| Ergebnis | Anzahl |\n| --- | --- |\n";
for (const k of Object.keys(counts)) out += `| ${k} | ${counts[k]} |\n`;
out += "\n## Dateien, die funktionieren\n\n";
for (const r of rows.filter(r => r.c[0] === "JA")) out += `- \`${r.p}\` — ${r.c[1]}\n`;
out += "\n## Dateien, die nur teilweise funktionieren\n\n";
for (const r of rows.filter(r => r.c[0] === "TEILWEISE")) out += `- \`${r.p}\` — ${r.c[1]}\n`;
out += "\n## Dateien, die nicht funktionieren (Auszug)\n\n";
for (const r of rows.filter(r => r.c[0] === "NEIN").slice(0, 25)) out += `- \`${r.p}\` — ${r.c[1]}\n`;
out += `\n...und ${rows.filter(r => r.c[0] === "NEIN").length - 25} weitere.\n`;
out += "\n## Ehrlich\n\nDie Einstufung ist eine Faustregel. Ein echter Test auf KolibriOS\n";
out += "steht noch aus. Nicht mit echten Nutzern getestet.\n";

writeFileSync(join(root, "learn/retro/kolibrios/audit.md"), out);
console.log("audit written:", files.length, "files |", JSON.stringify(counts));
