/* BOING BALL HINTERGRUND — die originale Demo als Hintergrundfeld.
 * Exakte Werte aus field-generator/boing-ball.html:
 *   W=320, H=200, FLOOR=168, R=22, g=0.42,
 *   bounce = -Math.max(6.8, |vy|*0.9), squash bei Aufprall,
 *   Schatten schrumpft mit der Höhe, karierte Kugel (8x10 Quads),
 *   violettes Perspektiv-Gitter. Kein Sinus, echte Physik.
 * Stumm: kein Dauer-Boing im Hintergrund. Die "BOING!"-Caption
 * erscheint beim Aufprall (wie im originalen deaf-Modus).
 * Kein WAV, keine ROMs, keine Abhängigkeiten.
 */
(function(global){
"use strict";

function create(canvas){
  var ctx=canvas.getContext("2d");
  // Logische Demo-Größe, auf Canvas skaliert
  var LW=320, LH=200, FLOOR=168, R=22;
  var ball={ay:0.35, ax:0.2, squash:0, bx:160, by:FLOOR-R, vx:1.7, vy:-7.5};
  var t=0, cap=0, raf=null;
  var scaleX=1, scaleY=1;

  function groesse(){
    var r=canvas.getBoundingClientRect();
    canvas.width=Math.max(240,Math.floor(r.width));
    canvas.height=Math.max(160,Math.floor(r.height));
    scaleX=canvas.width/LW; scaleY=canvas.height/LH;
  }

  function kugel(x,y,rx,ry,cycle){
    var lat=8, lon=10, quads=[];
    var rot=function(px,py,pz){
      var cy=Math.cos(ball.ay),sy=Math.sin(ball.ay);
      var cx=Math.cos(ball.ax),sx=Math.sin(ball.ax);
      var x1=px*cy+pz*sy, z1=-px*sy+pz*cy;
      return { x:x1, y:py*cx-z1*sx, z:py*sx+z1*cx };
    };
    for(var i=0;i<lat;i++){
      var l1=-Math.PI/2+i*Math.PI/lat, l2=-Math.PI/2+(i+1)*Math.PI/lat;
      for(var j=0;j<lon;j++){
        var g1=j*2*Math.PI/lon, g2=(j+1)*2*Math.PI/lon;
        var c4=[[l1,g1],[l1,g2],[l2,g2],[l2,g1]], d=0;
        var pts=c4.map(function(la){
          var cp=Math.cos(la[0]);
          var p=rot(cp*Math.cos(la[1]),Math.sin(la[0]),cp*Math.sin(la[1]));
          d+=p.z; return {x:p.x*rx,y:-p.y*ry};
        });
        d/=4; if(d<=0.02) continue;
        quads.push({d:d,i:i,j:j,pts:pts});
      }
    }
    quads.sort(function(a,b){return a.d-b.d});
    ctx.save(); ctx.translate(x,y);
    for(var q=0;q<quads.length;q++){
      var qq=quads[q];
      ctx.beginPath();ctx.moveTo(qq.pts[0].x,qq.pts[0].y);
      for(var k=1;k<4;k++)ctx.lineTo(qq.pts[k].x,qq.pts[k].y);
      ctx.closePath();
      ctx.fillStyle=((qq.i+qq.j+cycle)%2===0)?"#e8382f":"#f5f0e6";
      ctx.fill();
    }
    ctx.restore();
  }

  function frame(){
    t+=0.016; ball.ay+=0.03; ball.ax=0.25; ball.squash*=0.86;
    ball.bx+=ball.vx;
    if(ball.bx<26){ball.bx=26;ball.vx=Math.abs(ball.vx);}
    if(ball.bx>LW-26){ball.bx=LW-26;ball.vx=-Math.abs(ball.vx);}
    // Original-Physik (JavaScript-Fallback, exakt wie Demo)
    ball.vy+=0.42; ball.by+=ball.vy;
    var hit=0;
    if(ball.by+R>=FLOOR){
      ball.by=FLOOR-R;
      ball.vy=-Math.max(6.8,Math.abs(ball.vy)*0.9);
      ball.squash=1; hit=1;
    }
    if(hit)cap=1;

    ctx.save();ctx.scale(scaleX,scaleY);
    // Hintergrund wie Original
    ctx.fillStyle="#9a9a9a";ctx.fillRect(0,0,LW,LH);
    ctx.strokeStyle="#7a20d0";ctx.lineWidth=1;ctx.globalAlpha=0.9;
    for(var y=12;y<104;y+=13){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(LW,y);ctx.stroke();}
    for(var x=0;x<=LW;x+=26){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,104);ctx.stroke();}
    for(var k=1;k<=9;k++){var yy=104+Math.pow(k/9,1.8)*96;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(LW,yy);ctx.stroke();}
    for(var x2=-LW;x2<=LW*2;x2+=40){ctx.beginPath();ctx.moveTo(160,104);ctx.lineTo(x2,LH);ctx.stroke();}
    ctx.globalAlpha=1;

    // Schatten schrumpft mit der Höhe
    var sq=ball.squash*0.20;
    var hoehe=Math.max(0,(FLOOR-R-ball.by)/(FLOOR-R-40));
    ctx.fillStyle="rgba(0,0,0,"+(0.42-hoehe*0.22).toFixed(2)+")";
    ctx.beginPath();ctx.ellipse(ball.bx+10,FLOOR+5,R*(0.9-hoehe*0.35),R*0.32,0,0,7);ctx.fill();
    kugel(ball.bx,ball.by,R*(1+sq),R*(1-sq),Math.floor(t*7)%2);

    // BOING! Caption beim Aufprall (stumm, wie deaf-Modus)
    if(cap>0){
      ctx.fillStyle="#6fd3ff";ctx.font="bold 16px ui-monospace,monospace";
      ctx.fillText("BOING!",ball.bx-24,ball.by-30);
      cap-=0.05; if(cap<0)cap=0;
    }
    ctx.restore();
    raf=requestAnimationFrame(frame);
  }

  groesse();window.addEventListener("resize",groesse);frame();
  return {stop:function(){if(raf)cancelAnimationFrame(raf);window.removeEventListener("resize",groesse);}};
}

function autoStart(){
  document.querySelectorAll("canvas[data-boing-hintergrund]").forEach(create);
}
if(typeof document!=="undefined"){
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",autoStart);
  else autoStart();
}
global.BoingHintergrund={create:create};
})(typeof window!=="undefined"?window:globalThis);
