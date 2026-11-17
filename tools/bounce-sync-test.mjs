// Test: does the boing trigger exactly at the ball's low point?
const S = { t:0, by:0, prevBy:null, prevDir:0 };
const ball = { squash:0 };
const hits = [];
function boing(){ hits.push({ t:+S.t.toFixed(3), y:+S.by.toFixed(2) }); ball.squash=1; }
function frame(){
  S.t+=.016;
  const t=S.t*.85;
  S.by=100+Math.sin(t*2)*30;
  ball.squash*=.86;
  if(S.prevBy!==null){
    const dir=S.by-S.prevBy;
    if(S.prevDir>0 && dir<=0) boing();
    S.prevDir=dir;
  }
  S.prevBy=S.by;
}
for(let i=0;i<600;i++) frame(); // ~9.6 s
console.log("hits:", hits.length);
console.log(hits.slice(0,8));
const ys=hits.map(h=>h.y);
console.log("all near low point (y≈130):", ys.every(y=>y>128));
