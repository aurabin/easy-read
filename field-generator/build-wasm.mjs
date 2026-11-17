// Builds field.wasm from field.wat (WebAssembly assembler source).
// Requires wat2wasm (wabt). Environment variable WAT2WASM can point to it.
// The compiled field.wasm is committed, so rebuilding is optional.
import { existsSync } from "fs";
import { execFileSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const here = dirname(fileURLToPath(import.meta.url));
const wat = join(here, "field.wat");
const wasm = join(here, "field.wasm");
const candidates = [
  process.env.WAT2WASM,
  join(process.env.TEMP || "", "opencode/ffmpeg/node_modules/.bin/wat2wasm.cmd"),
  "wat2wasm",
].filter(Boolean);
const exe = candidates.find(p => p === "wat2wasm" || existsSync(p));
if (!exe) throw new Error("wat2wasm fehlt. Setze WAT2WASM auf den Pfad zu wabt.");
execFileSync(exe, [wat, "-o", wasm], { stdio: "inherit" });
console.log("field.wasm aus field.wat gebaut");
