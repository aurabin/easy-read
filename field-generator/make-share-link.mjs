// Erzeugt einen Facebook-Teilen-Link aus einer öffentlichen URL.
// Nutzung: node make-share-link.mjs https://beispiel.de/share.html
import { argv } from "process";
const url = argv[2];
if (!url || !/^https?:\/\//.test(url)) {
  console.log("Bitte eine vollständige https:// URL angeben.");
  console.log("Beispiel: node make-share-link.mjs https://user.github.io/repo/share.html");
  process.exit(1);
}
const share = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
console.log(share);
