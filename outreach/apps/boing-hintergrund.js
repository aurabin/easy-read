/* BOING BALL HINTERGRUND — weiterentwickelt.
 * Die originale Demo (echte Physik) als transparentes Feld VOR dem Inhalt.
 * Neu: Klick auf den Ball → extra Bounce + Partikel-Burst + Ton (Web Audio).
 *     Schwanz aus Partikeln hinter dem Ball, der langsam verblasst.
 *     BOING!-Caption beim Aufprall (wie im deaf-Modus).
 *     Stumm standardmäßig — Ton nur nach Klick auf den Ball.
 *     Ohne Rahmen. Ohne Start-Button. Schließen-Button oben rechts.
 * Exakte Werte: FLOOR=168, R=22, g=0.42, bounce=-Math.max(6.8,|vy|*0.9),
 *   squash beim Aufprall, Schatten schrumpft mit der Höhe.
 * Kein WAV, keine ROMs, keine Abhängigkeiten.
 */
(function(global){
"use strict";

function create(canvas){
  var ctx=canvas.getContext("2d");
  var LW=320, LH=200, FLOOR=168, R=22;
  var ball={ay:0.35, ax:0.2, squash:0, bx:160, by:FLOOR-R, vx:1.7, vy:-7.5};
  var t=0, cap=0, raf=null, scaleX=1, scaleY=1;
  var sound=false, audio=null, boingPending=false;
  var trail=[];   // Partikel-Schwanz
  var burst=[];    // Partikel-Burst bei Aufprall
  var capTimer=null;

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
      var x1=px*cy+pz*sy,z1=-px*sy+pz*cy;return{x:x1,y:py*cx-z1*sx,z:py*sx+z1*cx};};
    for(var i=0;i<lat;i++){
      var l1=-Math.PI/2+i*Math.PI/lat,l2=-Math.PI/2+(i+1)*Math.PI/lat;
      for(var j=0;j<lon;j++){
        var g1=j*2*Math.PI/lon,g2=(j+1)*2*Math.PI/lon;
        var c4=[[l1,g1],[l1,g2],[l2,g2],[l2,g1]],d=0;
        var pts=c4.map(function(la){
          var cp=Math.cos(la[0]);
          var p=rot(cp*Math.cos(la[1]),Math.sin(la[0]),cp*Math.sin(la[1]));
          d+=p.z;return{x:p.x*rx,y:-p.y*ry};});
        d/=4;if(d<=0.02)continue;quads.push({d:d,i:i,j:j,pts:pts});}}
    quads.sort(function(a,b){return a.d-b.d});
    ctx.save();ctx.translate(x,y);
    for(var q=0;q<quads.length;q++){
      var qq=quads[q];
      ctx.beginPath();ctx.moveTo(qq.pts[0].x,qq.pts[0].y);
      for(var k=1;k<4;k++)ctx.lineTo(qq.pts[k].x,qq.pts[k].y);
      ctx.closePath();
      ctx.fillStyle=((qq.i+qq.j+cycle)%2===0)?"#e8382f":"#f5f0e6";ctx.fill();}
    ctx.restore();
  }

  function boingSound(){
    if(!sound||boingPending)return;
    try{
      var AC=window.AudioContext||window.webkitAudioContext;
      if(!AC)return;
      if(!audio)audio=new AC();
      var c=audio;
      var play=function(){
        var t=c.currentTime,o=c.createOscillator(),gn=c.createGain();
        o.type="sine";o.frequency.setValueAtTime(220,t);
        o.frequency.exponentialRampToValueAtTime(70,t+.28);
        gn.gain.setValueAtTime(.35,t);gn.gain.exponentialRampToValueAtTime(.001,t+.32);
        o.connect(gn);gn.connect(c.destination);o.start(t);o.stop(t+.34);
      };
      if(c.state==="suspended"){
        boingPending=true;
        c.resume().then(function(){boingPending=false;play();}).catch(function(){boingPending=false;});
      }else play();
    }catch(e){}
  }

  function showCap(){
    cap=1;
    // Burst-Partikel beim Aufprall
    var cx=ball.bx, cy=ball.by;
    for(var i=0;i<14;i++){
      var a=Math.random()*6.28, sp=1.5+Math.random()*3;
      burst.push({x:cx,y:cy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-2,
        life:1, color:Math.random()>.5?"#e8382f":"#f5f0e6", size:2+Math.random()*2});
    }
  }

  function frame(){
    t+=0.016; ball.ay+=0.03; ball.ax=0.25; ball.squash*=0.86;
    ball.bx+=ball.vx;
    if(ball.bx<26){ball.bx=26;ball.vx=Math.abs(ball.vx);}
    if(ball.bx>LW-26){ball.bx=LW-26;ball.vx=-Math.abs(ball.vx);}
    // Schwanz: Ball-Position merken
    trail.push({x:ball.bx,y:ball.by,life:1});
    if(trail.length>18)trail.shift();
    // Physik wie Original
    ball.vy+=0.42; ball.by+=ball.vy;
    var hit=0;
    if(ball.by+R>=FLOOR){
      ball.by=FLOOR-R; ball.vy=-Math.max(6.8,Math.abs(ball.vy)*0.9);
      ball.squash=1; hit=1;
    }
    if(hit){ showCap(); boingSound(); }

    // Burst-Partikel aktualisieren
    for(var i=burst.length-1;i>=0;i--){
      var bp=burst[i];
      bp.x+=bp.vx; bp.y+=bp.vy; bp.vy+=0.35; bp.life-=0.035;
      if(bp.life<=0)burst.splice(i,1);
    }
    // Trail verblasen
    for(var j=0;j<trail.length;j++) trail[j].life-=0.06;

    ctx.save();ctx.scale(scaleX,scaleY);
    // Hintergrund
    ctx.fillStyle="#9a9a9a";ctx.fillRect(0,0,LW,LH);
    ctx.strokeStyle="#7a20d0";ctx.lineWidth=1;ctx.globalAlpha=0.9;
    for(var y=12;y<104;y+=13){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(LW,y);ctx.stroke();}
    for(var x=0;x<=LW;x+=26){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,104);ctx.stroke();}
    for(var k=1;k<=9;k++){var yy=104+Math.pow(k/9,1.8)*96;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(LW,yy);ctx.stroke();}
    for(var x2=-LW;x2<=LW*2;x2+=40){ctx.beginPath();ctx.moveTo(160,104);ctx.lineTo(x2,LH);ctx.stroke();}
    ctx.globalAlpha=1;

    // Schwanz zeichnen (halbtransparent)
    for(var ti=0;ti<trail.length;ti++){
      var tr=trail[ti];
      if(tr.life<=0)continue;
      ctx.globalAlpha=tr.life*0.35;
      ctx.fillStyle="#e8382f";
      ctx.beginPath();ctx.arc(tr.x,tr.y,R*0.35*tr.life,0,7);ctx.fill();
    }
    ctx.globalAlpha=1;

    // Burst zeichnen
    for(var bi=0;bi<burst.length;bi++){
      var bp=burst[bi];
      ctx.globalAlpha=bp.life;
      ctx.fillStyle=bp.color;
      ctx.beginPath();ctx.arc(bp.x,bp.y,bp.size*bp.life,0,7);ctx.fill();
    }
    ctx.globalAlpha=1;

    // Schatten
    var sq=ball.squash*0.20;
    var hoehe=Math.max(0,(FLOOR-R-ball.by)/(FLOOR-R-40));
    ctx.fillStyle="rgba(0,0,0,"+(0.42-hoehe*0.22).toFixed(2)+")";
    ctx.beginPath();ctx.ellipse(ball.bx+10,FLOOR+5,R*(0.9-hoehe*0.35),R*0.32,0,0,7);ctx.fill();
    kugel(ball.bx,ball.by,R*(1+sq),R*(1-sq),Math.floor(t*7)%2);

    // BOING! Caption beim Aufprall
    if(cap>0){
      ctx.fillStyle="#6fd3ff";ctx.font="bold 16px ui-monospace,monospace";
      ctx.fillText("BOING!",ball.bx-24,ball.by-30);
      cap-=0.05;if(cap<0)cap=0;
    }
    ctx.restore();
    raf=requestAnimationFrame(frame);
  }

  // Klick auf den Ball: extra Bounce + Sound + Partikel
  canvas.addEventListener("click",function(e){
    var rect=canvas.getBoundingClientRect();
    var cx=(e.clientX-rect.left)/scaleX, cy=(e.clientY-rect.top)/scaleY;
    var dx=cx-ball.bx, dy=cy-ball.by;
    if(Math.hypot(dx,dy)<=R+6){
      ball.vy=-Math.max(9,Math.abs(ball.vy)*1.3);
      ball.squash=1; showCap();
      // Klick-Burst
      for(var i=0;i<18;i++){
        var a=Math.random()*6.28, sp=2+Math.random()*3;
        burst.push({x:ball.bx,y:ball.by,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-2,
          life:1, color:Math.random()>.5?"#6fd3ff":"#f5f0e6", size:2.5+Math.random()*2});
      }
      if(!sound){ sound=true; boingSound(); }
      else boingSound();
    }
  });

  // Ton-Toggle per Tastatur (S)
  window.addEventListener("keydown",function(e){
    if(e.key==="s"||e.key==="S"){sound=!sound;}
  });

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
