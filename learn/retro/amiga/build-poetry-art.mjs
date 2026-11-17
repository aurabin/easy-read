// Original illustrations for the "poetry of Hi-Toro / Amiga" study.
import { mkdirSync, writeFileSync } from "fs";
const dir = "learn/retro/amiga/images";
mkdirSync(dir, { recursive: true });
const S = (o, c, a = "") => `<stop offset="${o}" stop-color="${c}" ${a}/>`;
function base(id, label, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="${id}-bg" x1="0" y1="0" x2="0" y2="1">${S(0,"#1c2c4d")+S(1,"#0a1120")}</linearGradient>
    <radialGradient id="${id}-vig" cx=".5" cy=".45" r=".8">${S(.55,"#000","stop-opacity='0'")+S(1,"#000","stop-opacity='.5'")}</radialGradient>
    <filter id="${id}-gl" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="${id}-gr"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"/></filter>
  </defs>
  <rect width="400" height="260" fill="url(#${id}-bg)"/>
  ${inner}
  <rect width="400" height="260" filter="url(#${id}-gr)"/>
  <rect width="400" height="260" fill="url(#${id}-vig)"/>
  </svg>`;
}
const art = {};
art["case-signatures"] = base("case", "The inside of an Amiga 1000 lid with the team's signatures and Mitchy the dog's paw print.", `
  <rect x="40" y="30" width="320" height="200" rx="14" fill="#c9c2b2"/>
  <rect x="52" y="42" width="296" height="176" rx="10" fill="#b3a688"/>
  <g stroke="#5a4a36" stroke-width="2" fill="none" opacity=".85">
    <path d="M70 80 q18 -14 34 2 t34 -2 t30 4"/>
    <path d="M72 104 q24 -10 40 4 t36 -4"/>
    <path d="M70 132 q16 -12 30 2 t30 -2 t38 4"/>
    <path d="M76 158 q22 -10 38 4 t34 -4"/>
    <path d="M180 76 q20 -10 34 4 t32 -4"/>
    <path d="M186 104 q18 -12 32 4 t36 -6"/>
    <path d="M182 132 q22 -10 36 4 t30 -4"/>
  </g>
  <text x="210" y="172" font-size="22" fill="#4a3f35" font-family="cursive">Jay</text>
  <g fill="#4a3f35" filter="url(#case-gl)">
    <ellipse cx="300" cy="182" rx="17" ry="14"/>
    <circle cx="282" cy="166" r="5"/><circle cx="293" cy="160" r="5"/><circle cx="305" cy="160" r="5"/><circle cx="316" cy="166" r="5"/>
  </g>
  <text x="300" y="214" font-size="12" fill="#4a3f35" font-family="system-ui" text-anchor="middle">Mitchy</text>`);
art["secret-screen"] = base("secret", "A hidden message on a Workbench screen: The Amiga, Born a Champion.", `
  <rect x="36" y="36" width="328" height="188" rx="8" fill="#2a6db5" filter="url(#secret-gl)"/>
  <rect x="36" y="36" width="328" height="22" rx="8" fill="#e6dcc8"/>
  <g fill="#111"><circle cx="50" cy="47" r="4"/><circle cx="64" cy="47" r="4"/><circle cx="78" cy="47" r="4"/></g>
  <text x="200" y="120" font-size="20" fill="#f5f0e6" font-family="monospace" text-anchor="middle">The Amiga,</text>
  <text x="200" y="148" font-size="20" fill="#f5f0e6" font-family="monospace" text-anchor="middle">Born a Champion</text>
  <text x="200" y="188" font-size="12" fill="#9fb3d1" font-family="monospace" text-anchor="middle">geheim · Workbench 1.2</text>`);
for (const [name, svg] of Object.entries(art)) writeFileSync(`${dir}/${name}.svg`, svg);
console.log("poetry art:", Object.keys(art).join(", "));
