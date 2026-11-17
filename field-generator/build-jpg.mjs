// Encode the full Virtual Field Generator (with Boing Ball) into a JPEG.
// The file stays a valid image: the source is appended after the JPEG EOI
// marker, between two ASCII markers. A tiny loader can extract and run it.
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const here = dirname(fileURLToPath(import.meta.url));
const shot = process.argv[2] || "C:/Users/icaro/AppData/Local/Temp/opencode-browser-K2shv9/0/screenshot.jpeg";
const src = join(here, "field-generator.html");
const out = join(here, "field-demo.jpg");
const START = "%%FIELDGEN_START%%";
const END = "%%FIELDGEN_END%%";
const jpg = readFileSync(shot);
const html = readFileSync(src);
let eoi = -1;
for (let i = jpg.length - 2; i >= 0; i--) {
  if (jpg[i] === 0xff && jpg[i + 1] === 0xd9) { eoi = i + 2; break; }
}
if (eoi < 0) throw new Error("No JPEG EOI marker found");
const image = jpg.subarray(0, eoi);
const payload = Buffer.concat([
  image,
  Buffer.from("\n" + START + "\n"),
  html,
  Buffer.from("\n" + END + "\n")
]);
writeFileSync(out, payload);
console.log("field-demo.jpg:", payload.length, "bytes (image", image.length, "+ source", html.length, ")");
