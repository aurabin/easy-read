// Kontrastverhältnisse für die aktuelle Standard-Palette (Workbench 1.3).
// Hintergrund: Desktop #2a2e7a, Fenster #ffffff, Akzent #ff5010.
const lum = hex => {
  const c = hex.replace("#","").match(/../g).map(h=>parseInt(h,16)/255)
    .map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);
  return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2];
};
const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+0.05)/(y+0.05)};
const desk="#33378a", win="#ffffff", akzent="#ff5010";
const colors={text:"#000000",muted:"#555555",mutedDesk:"#e8e8f0",
  blue:"#2a2a8c",red:"#c0392b",orange:"#ff5010",line:"#000000"};
console.log("== Desktop #33378a (Text: --muted-desk) ==");
console.log("mutedDesk", colors.mutedDesk, "on desk:", ratio(colors.mutedDesk,desk).toFixed(2));
console.log("== Fenster #ffffff (Text: --text) ==");
console.log("text   ", colors.text, "on win:", ratio(colors.text,win).toFixed(2));
console.log("muted  ", colors.muted, "on win:", ratio(colors.muted,win).toFixed(2));
console.log("blue   ", colors.blue, "on win:", ratio(colors.blue,win).toFixed(2));
console.log("red    ", colors.red, "on win:", ratio(colors.red,win).toFixed(2));
console.log("orange ", colors.orange, "on win:", ratio(colors.orange,win).toFixed(2));
console.log("== Akzent #ff5010 ==");
console.log("text on accent:", ratio(colors.text,akzent).toFixed(2));
console.log("white on accent:", ratio("#ffffff",akzent).toFixed(2));
console.log("== Alle >= 4.5 ? ==", ratio(colors.mutedDesk,desk)>=4.5 && ratio(colors.text,win)>=4.5 && ratio(colors.muted,win)>=4.5);