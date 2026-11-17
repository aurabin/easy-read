// Generated deployment folder: copy the current sources into docs/.
// Run after EVERY change in field-generator/: node field-generator/build-docs.mjs
import { copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const src = join(root, "field-generator");
const dst = join(root, "docs");
mkdirSync(dst, { recursive: true });
const files = [
  "field-generator.html",
  "boing-ball.html",
  "field.wasm",
  "og-image.png",
  "share.html",
  "field-demo.jpg",
  "field-demo-standalone.html",
  "jpg-loader.html",
];
for (const f of files) {
  copyFileSync(join(src, f), join(dst, f));
  console.log("synced", f);
}
