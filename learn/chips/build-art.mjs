// Original illustrations for the "first microprocessor" course.
// Same visual language as the Computer History art: dark field, glow, grain.
import { mkdirSync, writeFileSync } from "fs";
const dir = "learn/chips/images";
mkdirSync(dir, { recursive: true });

const S = (o, c, a = "") => `<stop offset="${o}" stop-color="${c}" ${a}/>`;
function base(id, label, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">${S(0,"#16233d")+S(1,"#070b14")}</linearGradient>
    <radialGradient id="${id}-vig" cx=".5" cy=".45" r=".8">${S(.55,"#000","stop-opacity='0'")+S(1,"#000","stop-opacity='.5'")}</radialGradient>
    <radialGradient id="${id}-gold" cx=".35" cy=".3" r=".95">${S(0,"#fff3c4")+S(.55,"#d9a441")+S(1,"#8a6622")}</radialGradient>
    <filter id="${id}-gl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="${id}-gr"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"/></filter>
  </defs>
  <rect width="400" height="260" fill="url(#${id}-sky)"/>
  ${inner}
  <rect width="400" height="260" filter="url(#${id}-gr)"/>
  <rect width="400" height="260" fill="url(#${id}-vig)"/>
  </svg>`;
}
function pins(x, y, n, gap, len, color) {
  let s = "";
  for (let i = 0; i < n; i++) {
    s += `<rect x="${x + i * gap}" y="${y}" width="6" height="${len}" fill="${color}"/>`;
    s += `<rect x="${x + i * gap}" y="${260 - y - len}" width="6" height="${len}" fill="${color}"/>`;
  }
  return s;
}
function fig(x, y, c, label) {
  return `<g><ellipse cx="${x}" cy="${y+52}" rx="18" ry="5" fill="#000" opacity=".3"/>
  <path d="M${x-10} ${y+14} q10 -7 20 0 l3 34 q-13 7 -26 0 z" fill="${c}"/>
  <circle cx="${x}" cy="${y}" r="9" fill="#e8b48a"/>
  <text x="${x}" y="${y+62}" font-size="12" fill="#eaf2ff" font-family="system-ui" text-anchor="middle">${label}</text></g>`;
}

const art = {};
art.chip = base("chip", "The first microprocessor: a 16-pin chip with a gold lid and the initials F.F.", `
  ${pins(112, 214, 8, 22, 22, "#c9cdd4")}
  <rect x="104" y="74" width="192" height="112" rx="8" fill="#e8e2d4"/>
  <rect x="112" y="82" width="176" height="96" rx="6" fill="url(#chip-gold)" filter="url(#chip-gl)"/>
  <rect x="120" y="90" width="160" height="80" rx="4" fill="none" stroke="#8a6622" stroke-width="2"/>
  <text x="200" y="126" font-size="30" fill="#8a6622" font-family="monospace" text-anchor="middle">4004</text>
  <text x="200" y="152" font-size="16" fill="#8a6622" font-family="monospace" text-anchor="middle">F.F · INTEL</text>
  <text x="200" y="52" font-size="14" fill="#6fd3ff" font-family="system-ui" text-anchor="middle">1971 · 2,300 transistors</text>`);

art.calculator = base("calc", "A Busicom 141-PF printing calculator with keyboard and paper roll.", `
  <ellipse cx="200" cy="220" rx="150" ry="14" fill="#000" opacity=".35"/>
  <path d="M96 104 l26 -34 h156 l26 34 v96 q-104 18 -208 0 z" fill="#b3a688"/>
  <path d="M96 104 l26 -34 h156 l26 34 z" fill="#cfc4ac"/>
  <rect x="150" y="84" width="100" height="26" rx="3" fill="#3a3f47"/>
  <rect x="156" y="90" width="88" height="14" fill="#f5f0e6"/>
  <rect x="158" y="70" width="84" height="12" rx="2" fill="#e8e2d4"/>
  <g fill="#4a4f58">${Array.from({length:4},(_,r)=>Array.from({length:8},(_,c)=>`<rect x="${118+c*22}" y="${132+r*18}" width="16" height="12" rx="2"/>`).join("")).join("")}</g>
  <text x="200" y="214" font-size="12" fill="#57493a" font-family="system-ui" text-anchor="middle">BUSICOM 141-PF</text>`);

art.team = base("team", "Four people around one chip: Hoff, Faggin, Mazor and Shima.", `
  <circle cx="200" cy="126" r="56" fill="#6fd3ff" opacity=".08" filter="url(#team-gl)"/>
  ${fig(74, 96, "#0f766e", "HOFF")}
  ${fig(146, 70, "#3b82f6", "FAGGIN")}
  ${fig(254, 70, "#e8382f", "MAZOR")}
  ${fig(326, 96, "#2f9e44", "SHIMA")}
  <rect x="170" y="108" width="60" height="44" rx="5" fill="url(#team-gold)"/>
  <text x="200" y="136" font-size="18" fill="#8a6622" font-family="monospace" text-anchor="middle">4004</text>`);

art.diagram = base("diagram", "The MCS-4 chip set: the 4004 CPU with ROM, RAM and I/O chips around it.", `
  <g stroke="#6fd3ff" stroke-width="2" opacity=".7" fill="none">
    <path d="M200 104 v-26 h-70 v-8 M200 104 v-26 h70 v-8 M200 156 v26 h-70 v8 M200 156 v26 h70 v8"/>
  </g>
  <rect x="60" y="40" width="140" height="38" rx="6" fill="#1d3a6b" stroke="#6fd3ff"/>
  <text x="130" y="64" font-size="14" fill="#eaf2ff" font-family="monospace" text-anchor="middle">4001 · ROM</text>
  <rect x="200" y="40" width="140" height="38" rx="6" fill="#1d3a6b" stroke="#6fd3ff"/>
  <text x="270" y="64" font-size="14" fill="#eaf2ff" font-family="monospace" text-anchor="middle">4002 · RAM</text>
  <rect x="150" y="104" width="100" height="52" rx="6" fill="url(#diagram-gold)" filter="url(#diagram-gl)"/>
  <text x="200" y="128" font-size="17" fill="#8a6622" font-family="monospace" text-anchor="middle">4004</text>
  <text x="200" y="146" font-size="12" fill="#8a6622" font-family="monospace" text-anchor="middle">CPU</text>
  <rect x="60" y="182" width="140" height="38" rx="6" fill="#1d3a6b" stroke="#6fd3ff"/>
  <text x="130" y="206" font-size="14" fill="#eaf2ff" font-family="monospace" text-anchor="middle">4003 · I/O</text>
  <rect x="200" y="182" width="140" height="38" rx="6" fill="#1d3a6b" stroke="#6fd3ff"/>
  <text x="270" y="206" font-size="14" fill="#eaf2ff" font-family="monospace" text-anchor="middle">Tastatur</text>`);

art.timeline = base("timeline", "A timeline from 1969 to 1971: contract, architecture, first silicon, launch.", `
  <path d="M40 150 h320" stroke="#6fd3ff" stroke-width="3"/>
  <g fill="#6fd3ff">${[40,140,240,340].map(x=>`<circle cx="${x}" cy="150" r="7" filter="url(#timeline-gl)"/>`).join("")}</g>
  <g fill="#eaf2ff" font-family="system-ui" font-size="15" text-anchor="middle">
    <text x="40" y="130">1969</text><text x="140" y="130">1970</text><text x="240" y="130">1971</text><text x="340" y="130">Nov 1971</text>
  </g>
  <g fill="#9fb3d1" font-family="system-ui" font-size="12" text-anchor="middle">
    <text x="40" y="180">Auftrag</text><text x="140" y="180">Entwurf</text><text x="240" y="180">Silizium</text><text x="340" y="180">Start</text>
  </g>`);

art.die = base("die", "The chip die: a small square of silicon with circuits and the initials F.F.", `
  <rect x="120" y="46" width="160" height="168" rx="6" fill="#c9cdd4"/>
  <rect x="130" y="56" width="140" height="148" fill="#2a3446"/>
  <g stroke="#6fd3ff" stroke-width="1" opacity=".6">${Array.from({length:9},(_,i)=>`<path d="M136 ${64+i*16} h128"/>`).join("")}${Array.from({length:7},(_,i)=>`<path d="M${144+i*18} 60 v140"/>`).join("")}</g>
  <rect x="150" y="88" width="100" height="84" rx="4" fill="url(#die-gold)"/>
  <text x="200" y="124" font-size="24" fill="#8a6622" font-family="monospace" text-anchor="middle">F.F</text>
  <text x="200" y="148" font-size="12" fill="#8a6622" font-family="monospace" text-anchor="middle">1971</text>
  <text x="200" y="238" font-size="13" fill="#6fd3ff" font-family="system-ui" text-anchor="middle">12 mm² · 10 µm · 740 kHz</text>`);

for (const [name, svg] of Object.entries(art)) writeFileSync(`${dir}/${name}.svg`, svg);
console.log("chip art:", Object.keys(art).join(", "));
