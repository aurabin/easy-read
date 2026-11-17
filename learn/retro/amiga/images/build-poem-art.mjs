// A self-generated poetic Amiga artwork. Original SVG, no external assets.
import { writeFileSync } from "fs";
const out = "learn/retro/amiga/images/amiga-poem.svg";
const R = (n) => +n.toFixed(1);
let stars = "";
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
for (let i = 0; i < 120; i++) {
  const x = R(rnd() * 800), y = R(rnd() * 800), r = R(0.5 + rnd() * 1.7), o = R(0.3 + rnd() * 0.6);
  stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="#eaf2ff" opacity="${o}"/>`;
}
// Mitchy paw constellation
const paw = `<g fill="#6fd3ff" opacity=".9" filter="url(#gl)">
  <ellipse cx="640" cy="170" rx="26" ry="21"/>
  <circle cx="600" cy="140" r="9"/><circle cx="622" cy="124" r="9"/><circle cx="650" cy="122" r="9"/><circle cx="676" cy="140" r="9"/>
</g>`;
// Flowing field ribbons
let ribbons = "";
const cols = ["#6fd3ff", "#e8382f", "#d9a441", "#7c5cff"];
for (let i = 0; i < 10; i++) {
  const y = 470 + i * 26, a = R(0.2 + i * 0.05);
  ribbons += `<path d="M-20 ${y} C 180 ${y - 90}, 360 ${y + 90}, 540 ${y - 40} S 760 ${y + 70}, 820 ${y - 30}" fill="none" stroke="${cols[i % cols.length]}" stroke-width="${R(1.5 + i * 0.3)}" opacity="${a}"/>`;
}
// A checkered sphere, projected like the real Boing Ball.
function checkerBall(cx, cy, r) {
  const lat = 10, lon = 14, ay = 0.35, ax = 0.2;
  const rot = (x, y, z) => {
    const cy2 = Math.cos(ay), sy = Math.sin(ay), cx2 = Math.cos(ax), sx = Math.sin(ax);
    const x1 = x * cy2 + z * sy, z1 = -x * sy + z * cy2;
    return { x: x1, y: y * cx2 - z1 * sx, z: y * sx + z1 * cx2 };
  };
  let s = `<g filter="url(#soft)">`;
  for (let i = 0; i < lat; i++) {
    const l1 = -Math.PI / 2 + (i * Math.PI) / lat, l2 = -Math.PI / 2 + ((i + 1) * Math.PI) / lat;
    for (let j = 0; j < lon; j++) {
      const g1 = (j * 2 * Math.PI) / lon, g2 = ((j + 1) * 2 * Math.PI) / lon;
      const corners = [[l1, g1], [l1, g2], [l2, g2], [l2, g1]];
      let d = 0;
      const pts = corners.map(([la, lo]) => {
        const cp = Math.cos(la);
        const p = rot(cp * Math.cos(lo), Math.sin(la), cp * Math.sin(lo));
        d += p.z;
        return `${R(cx + p.x * r)},${R(cy - p.y * r)}`;
      });
      d /= 4;
      if (d <= 0.02) continue;
      s += `<polygon points="${pts.join(" ")}" fill="${(i + j) % 2 === 0 ? "#e8382f" : "#f5f0e6"}"/>`;
    }
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>`;
  s += `<ellipse cx="${cx - r * 0.36}" cy="${cy - r * 0.42}" rx="${R(r * 0.22)}" ry="${R(r * 0.11)}" transform="rotate(-30 ${cx - r * 0.36} ${cy - r * 0.42})" fill="#fff" opacity=".4"/>`;
  return s + "</g>";
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="A poetic dreamscape: a checkered Boing Ball moon above a floating Amiga, a paw-print constellation, flowing colored ribbons and hidden words.">
<defs>
  <radialGradient id="sky" cx=".5" cy=".28" r=".95"><stop offset="0" stop-color="#22315c"/><stop offset=".55" stop-color="#121b38"/><stop offset="1" stop-color="#05070f"/></radialGradient>
  <radialGradient id="moon" cx=".35" cy=".3" r=".95"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#e8382f"/><stop offset="1" stop-color="#6d1611"/></radialGradient>
  <linearGradient id="beige" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6dcc8"/><stop offset="1" stop-color="#a8906a"/></linearGradient>
  <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6fd3ff"/><stop offset=".5" stop-color="#7c5cff"/><stop offset="1" stop-color="#e8382f"/></linearGradient>
  <filter id="gl" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0"/></filter>
  <radialGradient id="vig" cx=".5" cy=".45" r=".8"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>
<rect width="800" height="800" fill="url(#sky)"/>
${stars}
${paw}
<circle cx="400" cy="215" r="118" fill="#6fd3ff" opacity=".08" filter="url(#gl)"/>
${checkerBall(400, 215, 92)}
<!-- hidden words -->
<text x="400" y="92" fill="#9fb3d1" font-family="monospace" font-size="18" text-anchor="middle" opacity=".8">The Amiga, Born a Champion</text>
<text x="400" y="370" fill="#6fd3ff" font-family="monospace" font-size="13" text-anchor="middle" opacity=".65">und die im Dunkeln sieht man nicht</text>
${ribbons}
<!-- floating Amiga -->
<g filter="url(#soft)"><ellipse cx="400" cy="640" rx="210" ry="26" fill="#000" opacity=".45"/></g>
<g transform="translate(250 470)">
  <path d="M20 90 L70 40 H330 L380 90 V170 Q200 196 20 170 Z" fill="url(#beige)"/>
  <path d="M20 90 L70 40 H330 L380 90 Z" fill="#efe9db"/>
  <rect x="120" y="55" width="150" height="40" rx="5" fill="#20242c"/>
  <rect x="128" y="62" width="134" height="26" rx="3" fill="url(#screen)"/>
  <g fill="#8a744a">${Array.from({ length: 4 }, (_, r) => Array.from({ length: 14 }, (_, c) => `<rect x="${44 + c * 23}" y="${104 + r * 16}" width="17" height="11" rx="2"/>`).join("")).join("")}</g>
  <text x="200" y="183" fill="#5a4a36" font-family="system-ui" font-size="13" text-anchor="middle">AMIGA</text>
</g>
<rect width="800" height="800" filter="url(#grain)"/>
<rect width="800" height="800" fill="url(#vig)"/>
</svg>`;
writeFileSync(out, svg);
console.log("poem art written:", out, svg.length, "bytes");
