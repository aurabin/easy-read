// Generated deployment folder: copy the current sources into docs/.
// Run after EVERY change in field-generator/ or site/.
// Never edit files in docs/ directly.
import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dst = join(root, "docs");
mkdirSync(dst, { recursive: true });

// [source relative to project root, name inside docs/]
const files = [
  ["field-generator/field-generator.html", "field-generator.html"],
  ["field-generator/boing-ball.html", "boing-ball.html"],
  ["field-generator/field.wasm", "field.wasm"],
  ["field-generator/og-image.png", "og-image.png"],
  ["field-generator/share.html", "share.html"],
  ["field-generator/field-demo.jpg", "field-demo.jpg"],
  ["field-generator/field-demo-standalone.html", "field-demo-standalone.html"],
  ["field-generator/jpg-loader.html", "jpg-loader.html"],
  ["site/index.html", "index.html"],
  ["outreach/media/AROS-One-RAM.img", "media/AROS-One-RAM.img"],
  ["outreach/media/AROS-One-RAM.qcow2", "media/AROS-One-RAM.qcow2"],
];
// Alle Apps aus outreach/apps/ automatisch mitnehmen.
for (const f of readdirSync(join(root,"outreach/apps"))) {
  if (f.endsWith(".html")) files.push([`outreach/apps/${f}`, `apps/${f}`]);
}
for (const [from, to] of files) {
  mkdirSync(dirname(join(dst, to)), { recursive: true });
  copyFileSync(join(root, from), join(dst, to));
  console.log("synced", to);
}
