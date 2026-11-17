// Faithful depictions of the ORIGINAL computer designs (historical hardware).
// Isometric, lit, textured. Case shapes, keyboards, ports and colours follow the
// real machines. Trademarked LOGOS are replaced with descriptive text badges;
// see ../PERMISSIONS.md (design rights / trade dress).
import { readFileSync, writeFileSync, mkdirSync } from "fs";

const RX = 0.866, RY = 0.5;
const pts = a => a.map(p => p.map(n => +n.toFixed(1)).join(",")).join(" ");
const poly = (a, fill, extra = "") => `<polygon points="${pts(a)}" fill="${fill}" ${extra}/>`;
function isoBox(x, y, w, d, h, c) {
  const O = [x, y], A = [x + w * RX, y + w * RY], B = [A[0] - d * RX, A[1] + d * RY], C = [x - d * RX, y + d * RY];
  const Ad = [A[0], A[1] + h], Bd = [B[0], B[1] + h], Cd = [C[0], C[1] + h];
  return poly([C, B, Bd, Cd], c.left) + poly([A, B, Bd, Ad], c.right) + poly([O, A, B, C], c.top, `stroke="${c.edge || "rgba(255,255,255,.08)"}" stroke-width="1"`);
}
// A grid of keys on an isometric top face (real keyboard layout feel).
function keys(x, y, rows, cols, kw, kd, gap, c) {
  let s = "";
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
    const px = x + q * (kw + gap) * RX - r * (kd + gap) * RX;
    const py = y + q * (kw + gap) * RY + r * (kd + gap) * RY;
    s += isoBox(px, py, kw, kd, 3, c);
  }
  return s;
}
const shadow = (x, y, rx, ry, o = .35) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#000" opacity="${o}" filter="url(#ID-bl)"/>`;
function crt(id, x, y, w, h, screen, content) {
  const bx = x - 8, by = y - 8, bw = w + 16, bh = h + 16;
  return `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="url(#${id}-bezel)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${screen}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#${id}-scan)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#${id}-scr)" filter="url(#${id}-gl)"/>
  ${content}
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="rgba(255,255,255,.15)"/>`;
}
function figure(x, y, s, skin, shirt) {
  return `<g><ellipse cx="${x}" cy="${y + 46 * s}" rx="${16 * s}" ry="${5 * s}" fill="#000" opacity=".3"/>
  <path d="M${x - 9 * s} ${y + 12 * s} q${9 * s} ${-6 * s} ${18 * s} 0 l${2 * s} ${30 * s} q${-11 * s} ${6 * s} ${-22 * s} 0 z" fill="${shirt}"/>
  <circle cx="${x}" cy="${y}" r="${8 * s}" fill="${skin}"/>
  <path d="M${x + 8 * s} ${y + 16 * s} q${10 * s} ${4 * s} ${12 * s} ${12 * s}" stroke="${shirt}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/></g>`;
}
function base(id, label, sky, inner) {
  return `<svg viewBox="0 0 400 240" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">${sky}</linearGradient>
    <radialGradient id="${id}-vig" cx=".5" cy=".42" r=".8"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient>
    <radialGradient id="${id}-scr" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}-bezel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4150"/><stop offset="1" stop-color="#161a22"/></linearGradient>
    <pattern id="${id}-scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="#000" opacity=".16"/></pattern>
    <filter id="${id}-gl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="${id}-bl"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="${id}-gr"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"/></filter>
  </defs>
  <rect width="400" height="240" fill="url(#${id}-sky)"/>
  ${inner}
  <rect width="400" height="240" filter="url(#${id}-gr)"/>
  <rect width="400" height="240" fill="url(#${id}-vig)"/>
  </svg>`;
}
const S = (o, c) => `<stop offset="${o}" stop-color="${c}"/>`;
const KEY = { top: "#6a5c4c", left: "#4a3f35", right: "#3a3128" };

/* 1 — 1940s: ENIAC-style black panels, patch cables, switches & lamps */
const room = base("r", "A 1940s ENIAC-style machine: tall black panels with rows of switches and lamps, patch cables, and two engineers.",
  S(0, "#0c1526") + S(.6, "#1d2436") + S(1, "#2b2a33"),
  `<path d="M200 0 L150 96 L250 96 Z" fill="#ffd98a" opacity=".10"/><circle cx="200" cy="14" r="7" fill="#ffd98a" filter="url(#r-gl)"/>
  ${isoBox(70, 150, 60, 34, 96, { top: "#2a2f38", left: "#1b2028", right: "#12161d" })}
  ${isoBox(160, 165, 60, 34, 96, { top: "#2a2f38", left: "#1b2028", right: "#12161d" })}
  ${isoBox(250, 150, 60, 34, 96, { top: "#2a2f38", left: "#1b2028", right: "#12161d" })}
  <g fill="#0d1117"><rect x="52" y="70" width="34" height="60" rx="2"/><rect x="142" y="85" width="34" height="60" rx="2"/><rect x="232" y="70" width="34" height="60" rx="2"/></g>
  <g filter="url(#r-gl)">
    <circle cx="60" cy="80" r="3" fill="#ffb347" class="glow"/><circle cx="72" cy="80" r="3" fill="#ff6b4a" class="glow"/><circle cx="60" cy="94" r="3" fill="#ffb347" class="glow"/><circle cx="72" cy="94" r="3" fill="#ff6b4a" class="glow"/>
    <circle cx="150" cy="95" r="3" fill="#ffb347" class="glow"/><circle cx="162" cy="95" r="3" fill="#ff6b4a" class="glow"/><circle cx="150" cy="109" r="3" fill="#ffb347" class="glow"/><circle cx="162" cy="109" r="3" fill="#ff6b4a" class="glow"/>
    <circle cx="240" cy="80" r="3" fill="#ffb347" class="glow"/><circle cx="252" cy="80" r="3" fill="#ff6b4a" class="glow"/><circle cx="240" cy="94" r="3" fill="#ffb347" class="glow"/><circle cx="252" cy="94" r="3" fill="#ff6b4a" class="glow"/>
  </g>
  <g stroke="#0a0f1a" stroke-width="3" fill="none" opacity=".9"><path d="M86 120 q24 30 56 16 M176 135 q24 30 56 16 M60 130 q40 40 120 20"/></g>
  ${figure(330, 150, 1, "#e8b48a", "#0f766e")}${figure(362, 162, .9, "#c98d63", "#3a465c")}
  <rect x="0" y="200" width="400" height="40" fill="#12151d"/>`);

/* 2 — 1947: Bell Labs point-contact transistor (germanium block + wedge + whiskers) */
const transistor = base("t", "The 1947 point-contact transistor: a germanium block with a triangular wedge and two gold contact wires, beside a vacuum tube for scale.",
  S(0, "#1a2740") + S(1, "#0c1220"),
  `${shadow(110, 200, 60, 12)} ${shadow(280, 200, 44, 10)}
  ${isoBox(70, 176, 80, 40, 16, { top: "#3a465c", left: "#2a3446", right: "#1c2432" })}
  <rect x="82" y="60" width="56" height="116" rx="28" fill="url(#t-glass)" stroke="#bfe3ff" stroke-opacity=".5"/>
  <circle cx="110" cy="116" r="17" fill="#ff8c42" filter="url(#t-gl)" class="glow"/>
  <path d="M103 104 v24 M117 104 v24" stroke="#ffd9a8" stroke-width="2" opacity=".8"/>
  <path d="M150 116 h84" stroke="#6fd3ff" stroke-width="3" stroke-dasharray="5 6" class="signal"/>
  ${isoBox(246, 176, 70, 36, 14, { top: "#3a465c", left: "#2a3446", right: "#1c2432" })}
  ${isoBox(262, 156, 34, 20, 10, { top: "#9aa4b2", left: "#7a8492", right: "#5f6875" })}
  <polygon points="270,150 288,150 279,162" fill="#d9a441"/>
  <path d="M274 150 q-4 -12 -10 -14 M284 150 q4 -12 10 -14" stroke="#d9a441" stroke-width="2" fill="none"/>
  <text x="110" y="224" font-size="14" fill="#9fb3d1" text-anchor="middle">vacuum tube</text>
  <text x="281" y="224" font-size="14" fill="#9fb3d1" text-anchor="middle">1947 transistor</text>
  <defs><linearGradient id="t-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9fd4ff" stop-opacity=".3"/><stop offset=".5" stop-color="#e8f6ff" stop-opacity=".55"/><stop offset="1" stop-color="#9fd4ff" stop-opacity=".2"/></linearGradient></defs>`);

/* 3 — 1960s: a DIP integrated circuit (black body, metal pins, pin-1 dot) */
const chip = base("c", "A 1960s dual-in-line integrated circuit: black body, two rows of metal pins, and a pin-1 dot, on a board.",
  S(0, "#0f1a33") + S(1, "#060a14"),
  `<g stroke="#1d2c4a" stroke-width="1"><path d="M0 60 h400 M0 120 h400 M0 180 h400 M80 0 v240 M200 0 v240 M320 0 v240"/></g>
  ${shadow(200, 190, 110, 20)}
  ${isoBox(140, 130, 120, 60, 10, { top: "#2a3446", left: "#1c2432", right: "#141b26" })}
  <g fill="#c9cdd4">
    <rect x="128" y="136" width="12" height="5"/><rect x="128" y="150" width="12" height="5"/><rect x="128" y="164" width="12" height="5"/><rect x="128" y="178" width="12" height="5"/>
    <rect x="262" y="136" width="12" height="5"/><rect x="262" y="150" width="12" height="5"/><rect x="262" y="164" width="12" height="5"/><rect x="262" y="178" width="12" height="5"/>
  </g>
  ${isoBox(152, 118, 96, 44, 14, { top: "#20242c", left: "#161a22", right: "#0e1218" })}
  <circle cx="166" cy="126" r="4" fill="#3a4150"/>
  <g stroke="#3a4150" stroke-width="1.4" opacity=".8"><path d="M176 128 h60 M176 138 h60"/></g>
  <circle cx="180" cy="124" r="4" fill="#ff6b4a" filter="url(#c-gl)" class="signal"/>`);

/* 4 — 1971: Intel 4004-style ceramic DIP with gold lid, 16 pins */
const micro = base("m", "The 1971 microprocessor: a white ceramic 16-pin chip with a gold lid, on a board with copper traces.",
  S(0, "#0c2b26") + S(1, "#04100e"),
  `${shadow(200, 195, 120, 20)}
  ${isoBox(120, 120, 160, 90, 12, { top: "#0f4a42", left: "#0a352f", right: "#072823" })}
  <g stroke="#e0a458" stroke-width="2" fill="none" opacity=".75"><path d="M180 130 h-40 v-20 M240 130 h40 v-20 M180 150 h-40 v20 M240 150 h40 v20"/></g>
  <g fill="#d9a441">
    <rect x="168" y="120" width="8" height="5"/><rect x="168" y="132" width="8" height="5"/><rect x="168" y="144" width="8" height="5"/><rect x="168" y="156" width="8" height="5"/>
    <rect x="244" y="120" width="8" height="5"/><rect x="244" y="132" width="8" height="5"/><rect x="244" y="144" width="8" height="5"/><rect x="244" y="156" width="8" height="5"/>
  </g>
  ${isoBox(182, 116, 56, 40, 12, { top: "#e8e2d4", left: "#c9c2b2", right: "#a89f8d" })}
  ${isoBox(194, 122, 32, 24, 3, { top: "#d9a441", left: "#b3852f", right: "#8a6622" })}
  <rect x="198" y="120" width="24" height="14" fill="#ffd98a" opacity=".5" filter="url(#m-gl)" class="glow"/>`);

/* 5 — 1977: Commodore PET-style all-in-one (built-in CRT + keyboard) */
const home = base("h", "A 1977 all-in-one home computer in the PET style: a beige case with a built-in CRT and keyboard, on a desk at dusk.",
  S(0, "#3a2f4d") + S(.6, "#2b2338") + S(1, "#241d30"),
  `<rect x="252" y="28" width="112" height="84" rx="6" fill="url(#h-sun)"/><g stroke="#241d30" stroke-width="5"><path d="M308 28 v84 M252 70 h112"/></g>
  <circle cx="308" cy="66" r="13" fill="#fff3c4" filter="url(#h-gl)"/>
  ${shadow(180, 205, 140, 16)}
  ${isoBox(60, 160, 260, 60, 14, { top: "#8a6a4a", left: "#6a4f36", right: "#543e2a" })}
  ${isoBox(110, 120, 120, 60, 40, { top: "#c9c2b2", left: "#a89f8d", right: "#8a8272" })}
  ${crt("h", 128, 78, 84, 52, "#3a4a3a", `<g stroke="#9fd49f" stroke-width="2" opacity=".8"><path d="M134 90 h72 M134 100 h72 M134 110 h44"/></g>`)}
  ${keys(120, 150, 3, 10, 8, 6, 2, { top: "#4a4f58", left: "#33373f", right: "#262a31" })}
  ${figure(330, 130, 1, "#e8b48a", "#0f766e")}
  <rect x="52" y="128" width="16" height="30" fill="#7a4a3a"/>
  <path d="M60 128 q-14 -18 -4 -30 q12 8 4 30 q14 -16 8 -28 q10 12 -8 28" fill="#2f9e44"/>
  <defs><linearGradient id="h-sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset=".6" stop-color="#ff9a5c"/><stop offset="1" stop-color="#e86a5c"/></linearGradient></defs>`);

/* 6 — 1982: Commodore 64 "breadbin" — beige wedge, brown keys, right fn column, rear slot */
const c64 = base("64", "The original Commodore 64 breadbin: beige wedge case, dark-brown keyboard with a right function-key column, rear cartridge slot, and a CRT with the blue BASIC screen.",
  S(0, "#2a2438") + S(1, "#171221"),
  `${shadow(200, 205, 150, 16)}
  ${crt("64", 236, 52, 112, 82, "#40318d", `<rect x="246" y="62" width="14" height="12" fill="#a5a1ff" class="glow"/><g fill="#a5a1ff" opacity=".8"><rect x="246" y="82" width="70" height="5"/><rect x="246" y="92" width="46" height="5"/></g>`)}
  ${isoBox(90, 140, 150, 70, 20, { top: "#c9b48a", left: "#a8906a", right: "#8a744a" })}
  ${isoBox(96, 128, 140, 14, 8, { top: "#b3a077", left: "#97845f", right: "#7a6a4a" })}
  <rect x="150" y="126" width="40" height="5" fill="#3a3128"/>
  ${keys(100, 148, 4, 12, 8, 6, 2, KEY)}
  ${keys(214, 150, 4, 1, 8, 6, 2, { top: "#7a6a52", left: "#57493a", right: "#463b2f" })}
  ${isoBox(120, 176, 60, 7, 3, KEY)}
  <g><rect x="96" y="164" width="22" height="4" fill="#e8382f"/><rect x="96" y="168" width="22" height="4" fill="#ffb347"/><rect x="96" y="172" width="22" height="4" fill="#2f9e44"/><rect x="96" y="176" width="22" height="4" fill="#3b82f6"/></g>
  <text x="132" y="172" font-size="9" fill="#57493a" font-family="system-ui">C64</text>
  ${isoBox(60, 180, 40, 24, 12, { top: "#3a4150", left: "#2a303c", right: "#1c212b" })}
  <circle cx="72" cy="186" r="5" fill="#111"/><circle cx="88" cy="190" r="5" fill="#111"/>
  <path d="M236 150 q-30 26 -60 26" stroke="#0a0f1a" stroke-width="4" fill="none"/>
  <rect x="0" y="200" width="400" height="40" fill="#120e1a"/>`);

/* 7 — 1985: Amiga 1000 — beige box + separate keyboard + mouse, Workbench CRT */
const amiga = base("a", "The original Amiga 1000: a beige desktop box with floppy drive, a separate beige keyboard and mouse, and a CRT showing the Workbench desktop.",
  S(0, "#1c2c4d") + S(1, "#0d1526"),
  `${shadow(190, 205, 150, 16)}
  ${crt("a", 66, 44, 132, 92, "#2a6db5", `<rect x="76" y="54" width="60" height="42" fill="#f5f0e6"/><rect x="76" y="54" width="60" height="10" fill="#e8382f"/><rect x="144" y="76" width="46" height="34" fill="#f5f0e6"/><rect x="144" y="76" width="46" height="9" fill="#0f766e"/>`)}
  <circle cx="180" cy="60" r="9" fill="url(#a-ball)" class="floaty"/>
  ${isoBox(230, 120, 120, 60, 26, { top: "#e6dcc8", left: "#c4b799", right: "#a8906a" })}
  <rect x="252" y="132" width="44" height="6" fill="#111"/>
  <rect x="252" y="142" width="20" height="4" fill="#8a744a"/>
  <text x="300" y="140" font-size="9" fill="#8a744a" font-family="system-ui">AMIGA</text>
  ${isoBox(120, 170, 110, 40, 10, { top: "#e6dcc8", left: "#c4b799", right: "#a8906a" })}
  ${keys(128, 176, 4, 11, 7, 5, 2, { top: "#cfc4ac", left: "#ab9f85", right: "#8a8069" })}
  ${keys(212, 178, 4, 2, 7, 5, 2, { top: "#cfc4ac", left: "#ab9f85", right: "#8a8069" })}
  <ellipse cx="360" cy="166" rx="15" ry="10" fill="#e6dcc8"/><rect x="352" y="160" width="7" height="5" fill="#a8906a"/><path d="M360 156 q-4 -12 -14 -14" stroke="#c4b799" stroke-width="3" fill="none"/>
  <rect x="0" y="200" width="400" height="40" fill="#0a1120"/>
  <defs><radialGradient id="a-ball" cx=".35" cy=".3" r=".95"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#e8382f"/><stop offset="1" stop-color="#8a1d16"/></radialGradient></defs>`);

const SVG = { room, transistor, chip, micro, home, c64, amiga };

/* ---- The Amiga family: every main model, faithful form + real specs ---- */
const BEIGE = { top: "#e6dcc8", left: "#c4b799", right: "#a8906a" };
const LIGHT = { top: "#efe9db", left: "#d3ccbc", right: "#b3ac9c" };
const DARK = { top: "#3a3f47", left: "#2a2e35", right: "#1c2026" };
const WB = `<rect x="76" y="54" width="60" height="42" fill="#f5f0e6"/><rect x="76" y="54" width="60" height="10" fill="#e8382f"/><rect x="144" y="76" width="46" height="34" fill="#f5f0e6"/><rect x="144" y="76" width="46" height="9" fill="#0f766e"/>`;
function kb(x, y, cols, c) { return keys(x, y, 4, cols, 7, 5, 2, c); }
function mouse(x, y, c) { return `<ellipse cx="${x}" cy="${y}" rx="15" ry="10" fill="${c.top}"/><rect x="${x - 8}" y="${y - 6}" width="7" height="5" fill="${c.right}"/><path d="M${x} ${y - 10} q-4 -12 -14 -14" stroke="${c.left}" stroke-width="3" fill="none"/>`; }
function amigaModel(m) {
  const id = m.id, c = m.cols, K = { top: "#cfc4ac", left: "#ab9f85", right: "#8a8069" };
  let body = "";
  if (m.form === "box") {
    body = `${isoBox(230, 120, 120, 60, 26, c)}<rect x="252" y="132" width="44" height="6" fill="#111"/><text x="300" y="140" font-size="9" fill="${c.right}" font-family="system-ui">AMIGA</text>
    ${isoBox(120, 170, 110, 40, 10, c)}${kb(128, 176, 11, K)}${mouse(360, 166, c)}`;
  } else if (m.form === "wedge" || m.form === "smallwedge") {
    const w = m.form === "wedge" ? 150 : 120, cols = m.form === "wedge" ? 12 : 10;
    body = `${isoBox(90, 140, w, 64, 18, c)}${kb(100, 148, cols, K)}<rect x="${90 + w * RX - 20}" y="${140 + w * RY - 6}" width="26" height="5" fill="#111"/>
    <text x="100" y="176" font-size="9" fill="${c.right}" font-family="system-ui">AMIGA</text>${mouse(330, 176, c)}`;
  } else if (m.form === "desktop") {
    body = `${isoBox(240, 110, 110, 60, 40, c)}<rect x="258" y="124" width="40" height="6" fill="#111"/><rect x="258" y="136" width="40" height="6" fill="#111"/>
    ${isoBox(120, 170, 110, 40, 10, c)}${kb(128, 176, 11, K)}${mouse(360, 166, c)}`;
  } else if (m.form === "tower") {
    body = `${isoBox(270, 70, 60, 50, 110, c)}<rect x="284" y="86" width="34" height="6" fill="#111"/><rect x="284" y="98" width="34" height="6" fill="#111"/>
    ${isoBox(120, 170, 110, 40, 10, c)}${kb(128, 176, 11, K)}${mouse(240, 180, c)}`;
  } else { // console
    body = `${isoBox(140, 140, 140, 70, 20, c)}<rect x="170" y="150" width="70" height="5" fill="#0a0d12"/><circle cx="250" cy="152" r="4" fill="#0a0d12"/>
    ${m.id === "cd32" ? `<g><rect x="300" y="160" width="52" height="26" rx="10" fill="${c.left}"/><circle cx="312" cy="172" r="5" fill="${c.right}"/><circle cx="340" cy="170" r="3" fill="#e8382f"/><circle cx="346" cy="176" r="3" fill="#3b82f6"/></g>` : `<rect x="310" y="150" width="20" height="44" rx="6" fill="${c.left}"/><g fill="${c.right}"><rect x="314" y="156" width="12" height="4"/><rect x="314" y="164" width="12" height="4"/><rect x="314" y="172" width="12" height="4"/></g>`}`;
  }
  const screen = m.form === "console" ? "#101418" : "#2a6db5";
  const content = m.form === "console" ? `<circle cx="130" cy="90" r="16" fill="url(#${id}-ball)" class="floaty"/>` : WB;
  return base(id, m.name + " (" + m.year + "), " + m.note,
    S(0, "#1c2c4d") + S(1, "#0d1526"),
    `${shadow(190, 205, 150, 16)}${crt(id, 66, 44, 132, 92, screen, content)}${body}
    <rect x="0" y="200" width="400" height="40" fill="#0a1120"/>
    <defs><radialGradient id="${id}-ball" cx=".35" cy=".3" r=".95"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#e8382f"/><stop offset="1" stop-color="#8a1d16"/></radialGradient></defs>`);
}
const AMIGA_MODELS = [
  { id: "a1000", name: "Amiga 1000", year: 1985, cpu: "68000 @ 7.16 MHz", ram: "256 KB", ks: "Kickstart 1.0/1.1", form: "box", cols: BEIGE, note: "The first Amiga. Kickstart loaded from a floppy, not a ROM chip." },
  { id: "a500", name: "Amiga 500", year: 1987, cpu: "68000 @ 7.09 MHz", ram: "512 KB", ks: "Kickstart 1.2/1.3", form: "wedge", cols: BEIGE, note: "The best-selling Amiga. An all-in-one wedge." },
  { id: "a500p", name: "Amiga 500+", year: 1991, cpu: "68000 @ 7.09 MHz", ram: "1 MB", ks: "Kickstart 2.04", form: "wedge", cols: BEIGE, note: "A short-lived A500 with more RAM and a newer Kickstart." },
  { id: "a2000", name: "Amiga 2000", year: 1987, cpu: "68000 @ 7.09 MHz", ram: "1 MB", ks: "Kickstart 1.2/1.3", form: "desktop", cols: BEIGE, note: "A desktop box with many expansion slots." },
  { id: "a3000", name: "Amiga 3000", year: 1990, cpu: "68030 @ 25 MHz", ram: "2 MB", ks: "Kickstart 2.0", form: "desktop", cols: BEIGE, note: "A professional desktop with SCSI and a flicker fixer." },
  { id: "a600", name: "Amiga 600", year: 1992, cpu: "68000 @ 7.09 MHz", ram: "1 MB", ks: "Kickstart 2.05", form: "smallwedge", cols: LIGHT, note: "A small wedge with a PCMCIA slot and no numeric pad." },
  { id: "a1200", name: "Amiga 1200", year: 1992, cpu: "68EC020 @ 14 MHz", ram: "2 MB", ks: "Kickstart 3.0", form: "wedge", cols: LIGHT, note: "AGA graphics. The last classic wedge." },
  { id: "a4000", name: "Amiga 4000", year: 1992, cpu: "68030/040 @ 25 MHz", ram: "2 MB", ks: "Kickstart 3.0/3.1", form: "desktop", cols: BEIGE, note: "A desktop with AGA graphics and IDE." },
  { id: "a4000t", name: "Amiga 4000T", year: 1994, cpu: "68040 @ 25 MHz", ram: "2 MB", ks: "Kickstart 3.1", form: "tower", cols: BEIGE, note: "The tower version. The last Amiga Commodore shipped." },
  { id: "cdtv", name: "Amiga CDTV", year: 1991, cpu: "68000 @ 7.16 MHz", ram: "1 MB", ks: "Kickstart 1.3", form: "console", cols: DARK, note: "A multimedia box based on the A500, with a CD drive and remote." },
  { id: "cd32", name: "Amiga CD32", year: 1993, cpu: "68EC020 @ 14 MHz", ram: "2 MB", ks: "Kickstart 3.1", form: "console", cols: DARK, note: "A console based on the A1200, with a CD drive and gamepad." }
].map(m => ({ ...m, svg: amigaModel(m) }));
const file = "products/computer-history/index.html";
let html = readFileSync(file, "utf8");
const block = "const SVG = {\n" + Object.entries(SVG).map(([k, v]) => `${k}:\`${v}\``).join(",\n") + "\n};\nconst AMIGA_MODELS = " + JSON.stringify(AMIGA_MODELS) + ";";
html = html.replace(/const SVG = \{[\s\S]*?\n\};/, block);
writeFileSync(file, html);
mkdirSync("products/computer-history/brand/art", { recursive: true });
for (const [k, v] of Object.entries(SVG)) writeFileSync(`products/computer-history/brand/art/${k}.svg`, v);
for (const m of AMIGA_MODELS) writeFileSync(`products/computer-history/brand/art/amiga-${m.id}.svg`, m.svg);
console.log("faithful hardware art regenerated:", Object.keys(SVG).join(", "), "| amiga models:", AMIGA_MODELS.length);
