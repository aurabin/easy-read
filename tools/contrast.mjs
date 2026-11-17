// Contrast ratios for the Night Grid palette against the night background.
const bg = "#070b14";
const lum = hex => {
  const c = hex.replace("#","").match(/../g).map(h=>parseInt(h,16)/255)
    .map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);
  return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];
};
const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+0.05)/(y+0.05)};
const colors={ink:"#eaf2ff",muted:"#9fb3d1",sky:"#6fd3ff",teal:"#0f766e",
  tealDark:"#0b5f58",violet:"#7a20d0",red:"#e8382f",cream:"#f5f0e6",line:"#24344f"};
for(const [n,c] of Object.entries(colors))
  console.log(n.padEnd(9), c, "on bg:", ratio(c,bg).toFixed(2));
console.log("white on teal:   ", ratio("#ffffff",colors.teal).toFixed(2));
console.log("white on tealDark:", ratio("#ffffff",colors.tealDark).toFixed(2));
console.log("ink on panel:    ", ratio(colors.ink,"#0e1626").toFixed(2));
console.log("muted on panel:  ", ratio(colors.muted,"#0e1626").toFixed(2));
