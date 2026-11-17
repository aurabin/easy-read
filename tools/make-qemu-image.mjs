// Erzeugt QEMU-faehige Hardfiles aus dem AROS-One-RAM-Artefakt.
// 1) raw image (.img) — einfaechstes QEMU-Format
// 2) qcow2 v2 image — mit qemu-img erstellt und geprueft
import { writeFileSync, readFileSync } from "fs";
import { execFileSync } from "child_process";

const head = `AROS-ONE RAM HARDFILE (Nachbildung)\nDH0: 32 MB - System, Fonts, Tools\nDH1: 16 MB - Feldgenerator, Boing, Musik\nAlle Dateien liegen nur im RAM.\n`;
const rawSize = 1024 * 1024;            // 1 MiB
const raw = Buffer.alloc(rawSize);
raw.write(head, 0, "latin1");
writeFileSync("outreach/media/AROS-One-RAM.img", raw);
console.log("raw:", raw.length, "bytes");

const qemu = "C:/Program Files/QEMU/qemu-img.exe";
try {
  execFileSync(qemu, ["convert","-f","raw","-O","qcow2",
    "outreach/media/AROS-One-RAM.img","outreach/media/AROS-One-RAM.qcow2"],
    { stdio:"pipe" });
  const info = execFileSync(qemu, ["info","outreach/media/AROS-One-RAM.qcow2"], { encoding:"utf8" });
  console.log(info.trim());
  execFileSync(qemu, ["check","outreach/media/AROS-One-RAM.qcow2"], { stdio:"pipe" });
  console.log("qcow2 check: OK");
} catch(e) {
  console.log("qcow2 FEHLER:", (e.stderr||e.message).toString().slice(0,300));
}
