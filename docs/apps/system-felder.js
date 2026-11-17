/* SYSTEM-FELDER — ein Feldgenerator für das ganze Projekt.
 * Geist des Sizecodings: kleine Funktionen, große Bilder.
 * Referenz: Mathieu Acher, "Encounter" (256 Bytes, Outline 2024),
 *   https://blog.mathieuacher.com/SizeCodingArtBuild/
 * Geist von Commodore (64/256 B) und Amiga (400/656 B BOING/FIELD).
 * Reines Canvas, keine Abhängigkeiten, kein WAV, keine ROMs.
 */
(function(global){
"use strict";

/* Die Palette: echte C64/Amiga-Farben + Naturmuster-Farben */
var P = {
  blau:"#352879", hellblau:"#6c5eb5", creme:"#f5f0e6", nacht:"#070b14",
  sky:"#6fd3ff", violett:"#7a20d0", rot:"#e8382f", gelb:"#f2d000",
  gruen:"#3fa04a", orange:"#e0703c", teal:"#0f766e", weiss:"#eaf2ff"
};

/* Sizecoding-Geist: eine Formel, viele Welten.
 * f(x,y,t,s) -> [dx,dy] — winzige Funktionen, große Bewegung. */
var FORMELN = {
  wirbel: function(x,y,t){ return [Math.cos(y*.01+t)-Math.sin(x*.01-t), Math.sin(x*.01+t)+Math.cos(y*.01-t)]; },
  welle:  function(x,y,t){ return [1, Math.sin(x*.02+t)*1.5]; },
  atmen:  function(x,y,t){ var d=Math.hypot(x,y)||1; return [x/d*Math.sin(t*.5), y/d*Math.sin(t*.5)]; },
  farn:   function(x,y,t){ var w=Math.atan2(y,x)+t*.01; return [Math.cos(w)*.6, Math.sin(w)*.6-(y<0?.3:0)]; },
  blitz:  function(x,y,t){ return [Math.sin(y*.03+t)*.8, (y>0?1:-1)*.5]; },
  kreis:  function(x,y,t){ return [-y*.01, x*.01]; },
  regen:  function(x,y,t){ return [Math.sin(t+x*.01)*.2, 1.2]; }
};

/* Die sieben System-Felder — jedes nutzt eine Formel + echte Musterfarben */
var FELDER = [
  { id:"nacht",   name:"Nachtgitter",  formel:"wirbel", farben:[P.sky,P.violett,P.rot], n:48 },
  { id:"c64",     name:"C64 Blau",     formel:"welle",  farben:[P.blau,P.hellblau,P.creme], n:40 },
  { id:"amiga",   name:"Amiga Creme",  formel:"kreis",  farben:[P.creme,P.sky,P.rot], n:36 },
  { id:"farn",    name:"Farn",         formel:"farn",   farben:[P.gruen,P.teal,P.creme], n:44 },
  { id:"sonne",   name:"Sonnenblume",  formel:"kreis",  farben:[P.gelb,P.orange,P.blau], n:55, phyllo:true },
  { id:"gewitter",name:"Gewitter",     formel:"blitz",  farben:[P.rot,P.gelb,P.weiss], n:38 },
  { id:"regen",   name:"Regen",        formel:"regen",  farben:[P.sky,P.hellblau,P.weiss], n:42 }
];

function make(canvas, feldIndex){
  var f=FELDER[feldIndex%FELDER.length], fn=FORMELN[f.formel];
  var ctx=canvas.getContext("2d"), W, H, ps=[], raf=null, t=0;
  function groesse(){
    var r=canvas.getBoundingClientRect();
    W=canvas.width=Math.max(240,Math.floor(r.width));
    H=canvas.height=Math.max(160,Math.floor(r.height));
    ps=[];
    for(var i=0;i<f.n;i++){
      var a=Math.random()*6.28, rr=Math.random()*Math.min(W,H)*.4;
      ps.push({ x:W/2+Math.cos(a)*rr, y:H/2+Math.sin(a)*rr,
        c:f.farben[i%f.farben.length], s:1.5+(i%4), i:i });
    }
  }
  function frame(){
    t+=.016;
    ctx.fillStyle=P.nacht;ctx.fillRect(0,0,W,H);
    var cx=W/2, cy=H/2;
    for(var i=0;i<ps.length;i++){
      var p=ps[i];
      if(f.phyllo){
        // goldener Winkel 137.5°
        var ang=p.i*2.39996+t*.02, rr=Math.sqrt((p.i+1)/f.n)*Math.min(W,H)*.4;
        p.x=cx+Math.cos(ang)*rr;p.y=cy+Math.sin(ang)*rr;
      } else {
        var d=fn(p.x-cx,p.y-cy,t);
        p.x+=d[0];p.y+=d[1];
        if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      }
      ctx.globalAlpha=.4+.6*Math.abs(Math.sin(t+i));
      ctx.fillStyle=p.c;
      ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,7);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Mittleres Wunder
    ctx.fillStyle=f.farben[0];
    ctx.beginPath();ctx.arc(cx,cy,4+Math.sin(t*2)*2,0,7);ctx.fill();
    raf=requestAnimationFrame(frame);
  }
  groesse();window.addEventListener("resize",groesse);frame();
  return { stop:function(){if(raf)cancelAnimationFrame(raf);window.removeEventListener("resize",groesse);},
    feld:f };
}

/* Ein Feld auf jeder Seite: sucht <canvas data-systemfeld> und startet es. */
function autoStart(){
  document.querySelectorAll("canvas[data-systemfeld]").forEach(function(c){
    var i=parseInt(c.getAttribute("data-systemfeld"),10)||0;
    make(c,i);
  });
}
if(typeof document!=="undefined"){
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",autoStart);
  else autoStart();
}

global.SystemFelder={P:P,FORMELN:FORMELN,FELDER:FELDER,make:make};
})(typeof window!=="undefined"?window:globalThis);
