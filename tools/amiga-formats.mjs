// Amiga- und Tracker-Formate erkennen. Reine Erkennung — kein Abspielen, kein WAV.
// Gibt zurueck: { id, name, playable, reason, origin }
// "origin" sagt, woher das Format kommt. Das ist die Aufklaerung.
export function detectAmigaFormat(bytes) {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes || []);
  const str = (o, n) => String.fromCharCode(...b.slice(o, o + n));

  if (b.length < 4) {
    return { id: "unknown", name: "Unbekannt", playable: false,
      origin: "-", reason: "Datei zu kurz." };
  }

  // 8SVX — IFF Sample (Amiga)
  if (str(0, 4) === "FORM" && str(8, 4) === "8SVX") {
    return { id: "8svx", name: "8SVX (IFF Sample)", playable: true,
      origin: "Amiga, IFF-Standard", reason: "Einfaches Sample. Direkt abspielbar." };
  }
  if (str(0, 4) === "8SVX") {
    return { id: "8svx", name: "8SVX (IFF Sample)", playable: true,
      origin: "Amiga, IFF-Standard", reason: "Einfaches Sample. Direkt abspielbar." };
  }

  // 8SVX/16SV IFF mit FORM, aber anderer Chunk-Reihenfolge
  if (str(0, 4) === "FORM" && str(8, 4) === "16SV") {
    return { id: "16sv", name: "16SV (IFF Sample)", playable: false,
      origin: "Amiga, IFF-Standard", reason: "16-Bit-Sample. Nicht unterstuetzt." };
  }

  // MusicLine Editor (Amiga) — echtes Projektformat
  if (str(0, 8) === "MLEDMODL") {
    return { id: "ml", name: "MusicLine Editor (.ml)", playable: false,
      origin: "Amiga, MusicLine Editor 1995",
      reason: "Eigener Player noetig. In ALL-IN-ONE.html nutzbar." };
  }

  // ProTracker / NoiseTracker / SoundTracker MOD (Amiga)
  if (b.length >= 1080) {
    const tag = str(1080, 4);
    const modTags = ["M.K.", "M!K!", "M&K!", "4CHN", "6CHN", "8CHN", "FLT4",
      "FLT8", "CD81", "OKTA", "16CN", "32CN", "2CHN"];
    if (modTags.includes(tag)) {
      const channels = /8|OKTA/.test(tag) ? 8
        : /16/.test(tag) ? 16 : /32/.test(tag) ? 32
        : /6/.test(tag) ? 6 : /2/.test(tag) ? 2 : 4;
      return { id: "mod", name: "MOD (" + channels + " Kanaele)",
        playable: channels <= 4,
        origin: "Amiga, Soundtracker/ProTracker",
        reason: channels <= 4 ? "Abspielbar mit eigenem Player."
          : "Mehr als 4 Kanaele. Nicht unterstuetzt." };
    }
  }

  // OctaMED / MED (Amiga)
  if (["MED2", "MED3", "MED4", "MMD0", "MMD1", ".MED."].includes(str(0, 4))
      || str(0, 6) === ".MED.") {
    return { id: "med", name: "MED / OctaMED", playable: false,
      origin: "Amiga, MED/OctaMED", reason: "Erkannt. Kein Player integriert." };
  }

  // AHX / HVL — Amiga-Herkunft, PC-Tacker
  if (["THX.", "AHX ", "HVL "].includes(str(0, 4))) {
    return { id: "ahx", name: "AHX / HVL", playable: false,
      origin: "Amiga-Optimierer, PC-Tacker", reason: "Erkannt. Kein Player integriert." };
  }

  // DMF — XFish/Deer Frog, am Amiga gespielt
  if (str(0, 3) === "DMF" && b[3] < 3) {
    return { id: "dmf", name: "DMF (XFish)", playable: false,
      origin: "PC, auf Amiga abspielbar", reason: "Erkannt. Kein Player integriert." };
  }

  // XM — FastTracker 2
  if (str(0, 17) === "Extended Module: ") {
    return { id: "xm", name: "XM (FastTracker 2)", playable: false,
      origin: "PC, auf Amiga abspielbar", reason: "Erkannt. Kein Player integriert." };
  }

  // S3M — ScreamTracker 3
  if (str(0, 4) === "SCRM" && b[0x2c] === 0x1a) {
    return { id: "s3m", name: "S3M (ScreamTracker 3)", playable: false,
      origin: "PC, auf Amiga abspielbar", reason: "Erkannt. Kein Player integriert." };
  }

  // IT — Impulse Tracker
  if (str(0, 4) === "IMPM") {
    return { id: "it", name: "IT (Impulse Tracker)", playable: false,
      origin: "PC, auf Amiga abspielbar", reason: "Erkannt. Kein Player integriert." };
  }

  // MTM — MultiTracker
  if (str(0, 3) === "MTM") {
    return { id: "mtm", name: "MTM (MultiTracker)", playable: false,
      origin: "PC, auf Amiga abspielbar", reason: "Erkannt. Kein Player integriert." };
  }

  // UMX — Ultravox container (haeufig MOD/XM darin)
  if (["UMX0", "UMX1", "UMX2", "UMX3"].includes(str(0, 4))) {
    return { id: "umx", name: "UMX (Ultravox)", playable: false,
      origin: "PC-Container, enthaelt MOD/XM", reason: "Erkannt. Kein Player integriert." };
  }

  // AMF — Advanced Module Format (Amiga/DSI)
  if (str(0, 3) === "AMF" || str(0, 8) === "AMF-PACK") {
    return { id: "amf", name: "AMF", playable: false,
      origin: "Amiga/PC", reason: "Erkannt. Kein Player integriert." };
  }

  return { id: "unknown", name: "Unbekanntes Format", playable: false,
    origin: "-", reason: "Kein bekanntes Amiga- oder Tracker-Format." };
}

// Vollstaendige Liste fuer die Aufklaerung in der App.
export const SUPPORTED = [
  { id: "mod", name: "MOD (ProTracker, 4 Kanaele)", playable: true, origin: "Amiga" },
  { id: "8svx", name: "8SVX (IFF Sample)", playable: true, origin: "Amiga" },
  { id: "ml", name: "MusicLine .ml", playable: false, origin: "Amiga" },
  { id: "med", name: "MED / OctaMED", playable: false, origin: "Amiga" },
  { id: "16sv", name: "16SV (IFF Sample)", playable: false, origin: "Amiga" },
  { id: "ahx", name: "AHX / HVL", playable: false, origin: "Amiga/PC" },
  { id: "amf", name: "AMF", playable: false, origin: "Amiga/PC" },
  { id: "dmf", name: "DMF (XFish)", playable: false, origin: "PC/Amiga" },
  { id: "xm", name: "XM (FastTracker 2)", playable: false, origin: "PC/Amiga" },
  { id: "s3m", name: "S3M (ScreamTracker 3)", playable: false, origin: "PC/Amiga" },
  { id: "it", name: "IT (Impulse Tracker)", playable: false, origin: "PC/Amiga" },
  { id: "mtm", name: "MTM (MultiTracker)", playable: false, origin: "PC/Amiga" },
  { id: "umx", name: "UMX (Ultravox)", playable: false, origin: "PC-Container" },
];
