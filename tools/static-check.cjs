const fs = require("fs");
const h = fs.readFileSync("products/computer-history/index.html", "utf8");
const m = h.match(/<script>([\s\S]*?)<\/script>/);
const js = m[1];
const ids = new Set([...h.matchAll(/id="([^"]+)"/g)].map(x => x[1]));
const refs = new Set([...js.matchAll(/\$\("#([^"]+)"\)/g)].map(x => x[1]));
const missing = [...refs].filter(x => !ids.has(x));
const wins = new Set([...h.matchAll(/data-win="([^"]+)"/g)].map(x => x[1]));
const winKeys = new Set([...js.matchAll(/winData\.(\w+)\s*=/g)].map(x => x[1]));
const builtin = ["shell", "readme", "boing", "about"];
const missingWins = [...wins].filter(x => !winKeys.has(x) && !builtin.includes(x));
console.log("element ids referenced:", refs.size, "| missing:", missing.length, missing.join(","));
console.log("data-win icons:", [...wins].join(","));
console.log("winData keys:", [...winKeys].join(","), "| missing:", missingWins.join(","));
console.log("AMIGA_MODELS present:", h.includes("const AMIGA_MODELS = ["));
console.log("HD caps A500=50 / others=2048 / A4000 max=40960:",
  js.includes("a500:50"), js.includes("a4000:2048"), js.includes("a4000:40960"));
console.log("open rights:", js.includes('scope:"everyone"'));
