// Generated deployment folder: copy the current sources into docs/.
// Run after EVERY change in field-generator/, site/ or outreach/apps/.
// Never edit files in docs/ directly.
import { copyFileSync, mkdirSync, readdirSync, unlinkSync } from "fs";
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
  ["site/store.html", "store.html"],
  ["outreach/media/standalone.html", "standalone.html"],
  ["outreach/media/AROS-One-RAM.img", "media/AROS-One-RAM.img"],
  ["outreach/media/AROS-One-RAM.qcow2", "media/AROS-One-RAM.qcow2"],
];

// Apps: copy all, remove stale copies that no longer have a source.
const liveApps = readdirSync(join(root,"outreach/apps")).filter(f=>f.endsWith(".html"));
const appDir = join(dst,"apps");
mkdirSync(appDir, { recursive: true });
for (const f of readdirSync(appDir)) {
  if (f.endsWith(".html") && !liveApps.includes(f)) {
    unlinkSync(join(appDir,f));
    console.log("removed stale apps/"+f);
  }
}
for (const f of liveApps) files.push([`outreach/apps/${f}`, `apps/${f}`]);
// Der GPL-2.0-MusicLine-Player liegt neben der Amiga-App (eigene Lizenz).
files.push(["outreach/apps/paula-ml.js", "apps/paula-ml.js"]);
files.push(["outreach/apps/spiel-felder.js", "apps/spiel-felder.js"]);

for (const [from, to] of files) {
  mkdirSync(dirname(join(dst, to)), { recursive: true });
  copyFileSync(join(root, from), join(dst, to));
  console.log("synced", to);
}
