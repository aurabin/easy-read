/* RETRO → NEUZEIT — systemweites Übergangsfeld.
 * Das optische Design der ganzen App wandert vom Retro-Stil in die Neuzeit.
 * Phantasie: Pixel werden zu Fluss, harte Kanten werden zu Atmung.
 * Echte Farben aus C64/Amiga, echte Muster aus der Natur.
 * Reines Canvas, keine Abhängigkeiten, kein WAV, keine ROMs.
 *
 * Phasen (die Reise):
 *   0. RETRO    — karierte Pixel, harte Gitter, C64-Blau
 *   1. WENDE    — Pixel beginnen zu fließen, Gitter wird weich
 *   2. FLUSS    — Vektorfeld aus der Wikipedia, Pfeile werden Tropfen
 *   3. NEUZEIT  — weiche Wellen, Glow, Atmung, Naturmuster
 */
(function(global){
"use strict";

var P = {
  blau:"#352879", hellblau:"#6c5eb5", creme:"#f5f0e6", nacht:"#070b14",
  sky:"#6fd3ff", violett:"#7a20d0", rot:"#e8382f", gelb:"#f2d000",
  gruen:"#3fa04a", teal:"#0f766e", weiss:"#eaf2ff"
};

/* Die vier Phasen mit je einer kleinen Formel — Sizecoding-Geist. */
var PHASEN = [
  { name:"RETRO",   farbe:P.blau,    f:"pixel" },
  { name:"WENDE",   farbe:P.hellblau,f:"wende" },
  { name:"FLUSS",   farbe:P.sky,     f:"fluss" },
  { name:"NEUZEIT", farbe:P.teal,    f:"neuzeit" }
];

/* Interpolation: von hart zu weich. t läuft 0..1. */
function misch(a,b,t){ return a+(b-a)*t; }
function hexZuRgb(h){
  return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
}
function rgbZuStr(r,g,b,a){
  return "rgba("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+","+a+")";
}
function farbeMix(h1,h2,t,a){
  var A=hexZuRgb(h1),B=hexZuRgb(h2);
  return rgbZuStr(misch(A[0],B[0],t),misch(A[1],B[1],t),misch(A[2],B[2],t),a);
}

function create(canvas, optionen){
  optionen=optionen||{};
  var ctx=canvas.getContext("2d"),W,H,raf=null;
  var zeit=0, phase=optionen.phase||0, auto=optionen.auto!==false;
  var dauer=optionen.dauer||16; // Sekunden pro voller Reise
  var punkte=[];

  function groesse(){
    var r=canvas.getBoundingClientRect();
    W=canvas.width=Math.max(240,Math.floor(r.width));
    H=canvas.height=Math.max(240,Math.floor(r.height));
    punkte=[];
    for(var i=0;i<70;i++){
      punkte.push({
        x:Math.random()*W, y:Math.random()*H,
        seed:Math.random()*100, k:Math.random()
      });
    }
  }

  function frame(){
    zeit+=.016;
    var zyklus=(zeit%dauer)/dauer;      // 0..1
    var p=auto?zyklus*3:phase;          // 0..3
    var i0=Math.floor(p), i1=Math.min(3,i0+1), t=p-i0;
    var von=PHASEN[i0], zu=PHASEN[i1];
    var weich=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2; // ease-in-out

    ctx.fillStyle=P.nacht;ctx.fillRect(0,0,W,H);

    for(var n=0;n<punkte.length;n++){
      var q=punkte[n], wob=Math.sin(zeit+q.seed)*6;
      var farbe=farbeMix(von.farbe,zu.farbe,weich,.35+.5*q.k);

      if(weich<.45){
        /* RETRO: harte karierte Pixel auf Gitter */
        var gx=Math.round(q.x/24)*24, gy=Math.round(q.y/24)*24;
        var size=misch(8,3,weich/.45);
        ctx.fillStyle=farbe;
        ctx.fillRect(gx,gy,size,size);
        if(q.k>.5){ ctx.fillStyle=farbeMix(P.creme,P.weiss,weich,.4);
          ctx.fillRect(gx+size,gy+size,size,size); }
      } else {
        /* NEUZEIT: Fluss + Glow + Atmung */
        var a=Math.atan2(q.y-H/2,q.x-W/2)+zeit*.1+q.seed;
        var rr=misch(0,Math.min(W,H)*.38,q.k)+wob;
        var px=W/2+Math.cos(a)*rr;
        var py=H/2+Math.sin(a)*rr*.7;
        var glow=misch(1,14,weich);
        ctx.shadowColor=farbe;ctx.shadowBlur=glow;
        ctx.fillStyle=farbe;
        ctx.beginPath();ctx.arc(px,py,misch(1.5,4,weich)*q.k+.8,0,7);ctx.fill();
        ctx.shadowBlur=0;
      }
    }

    /* Retro-Gitter wird zur Neuzeit-Welle */
    ctx.strokeStyle=farbeMix(P.blau,P.teal,weich,.18);
    ctx.lineWidth=1;
    for(var y=0;y<H;y+=28){
      ctx.beginPath();
      for(var x=0;x<=W;x+=12){
        var yy=y+Math.sin(x*.02+zeit+y*.01)*misch(0,10,weich);
        x?ctx.lineTo(x,yy):ctx.moveTo(x,yy);
      }
      ctx.stroke();
    }

    /* Phasenname als Caption */
    ctx.fillStyle=farbeMix(von.farbe,zu.farbe,weich,.85);
    ctx.font="600 11px ui-monospace,monospace";
    ctx.fillText(PHASEN[weich<.5?i0:i1].name+" → "+Math.round(zyklus*100)+"%",10,18);

    raf=requestAnimationFrame(frame);
  }

  groesse();window.addEventListener("resize",groesse);frame();
  return {
    stop:function(){if(raf)cancelAnimationFrame(raf);window.removeEventListener("resize",groesse);},
    phase:function(n){auto=false;phase=Math.max(0,Math.min(3,n));},
    automatisch:function(an){auto=!!an;},
    phasen:PHASEN
  };
}

/* Auto-Start auf allen <canvas data-retro-neuzeit> */
function autoStart(){
  document.querySelectorAll("canvas[data-retro-neuzeit]").forEach(function(c){
    create(c,{auto:c.getAttribute("data-retro-neuzeit")!=="manuell"});
  });
}
if(typeof document!=="undefined"){
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",autoStart);
  else autoStart();
}

global.RetroNeuzeit={P:P,PHASEN:PHASEN,create:create};
})(typeof window!=="undefined"?window:globalThis);
