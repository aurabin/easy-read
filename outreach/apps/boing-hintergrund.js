/* BOING BALL HINTERGRUND — weiterentwickelt.
 * Die originale Demo (echte Physik) als transparentes Feld VOR dem Inhalt.
 * Neu: Donner-Sound beim Aufprall, gelegentliche Blitze mit Flash,
 *     Partikel-Schwanz hinter dem Ball, Partikel-Burst, Klick-Interaktion,
 *     BOING!-Caption beim Aufprall (deaf-Modus).
 * Stumm standardmäßig — Ton nur nach Klick auf den Ball oder per S-Taste.
 * Ohne Rahmen. Ohne Start-Button. Schließen-Button oben rechts.
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
  var sound=true, audio=null, boingPending=false;
  var trail=[];   // Partikel-Schwanz
  var burst=[];    // Partikel-Burst bei Aufprall
  var capTimer=null;
  // Blitz zuerst, Donner folgt nach kurzer Verzoegerung (Licht schneller als Schall)
  var blitzTimer=0, blitzNext=10+Math.random()*10, blitzDauer=0, blitzX=0;
  var donnerAktiv=0, donnerVerzoegerung=0, donnerGeplant=false;
  var laeuft=false, imBild=true, tabAktiv=true;

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

  // Donner-Sound: tiefer, längerer Rausch-Ton mit langsamerem Abklang
  // + hörbarer Knall (Crack) und Bass-Boom. Lauter als vorher.
  function donnern(c){
    if(!c)return;
    try{
      if(c.state!=="running"){ c.resume(); return; }
      var t2=c.currentTime;
      // 1) Knall (Crack) — kurzer, heller Impuls
      var buf1=c.createBuffer(1,Math.floor(c.sampleRate*.08),c.sampleRate);
      var d1=buf1.getChannelData(0);
      for(var i=0;i<d1.length;i++)d1[i]=(Math.random()*2-1)*(1-i/d1.length);
      var ns1=c.createBufferSource();ns1.buffer=buf1;
      var nf1=c.createBiquadFilter();nf1.type="highpass";nf1.frequency.value=1200;
      var ng1=c.createGain();ng1.gain.setValueAtTime(.4,t2);
      ng1.gain.exponentialRampToValueAtTime(.001,t2+.12);
      ns1.connect(nf1);nf1.connect(ng1);ng1.connect(c.destination);
      ns1.start(t2);ns1.stop(t2+.1);
      // 2) Rauschen (Donner-Grollen) — lauter und länger
      var buf=c.createBuffer(1,Math.floor(c.sampleRate*1.6),c.sampleRate);
      var d=buf.getChannelData(0);
      for(var i=0;i<d.length;i++)d[i]=(Math.random()*2-1);
      var ns=c.createBufferSource();ns.buffer=buf;
      var nf=c.createBiquadFilter();nf.type="lowpass";nf.frequency.value=600;
      var ng=c.createGain();ng.gain.setValueAtTime(.35,t2+.05);
      ng.gain.exponentialRampToValueAtTime(.001,t2+1.5);
      ns.connect(nf);nf.connect(ng);ng.connect(c.destination);
      ns.start(t2);ns.stop(t2+1.6);
      // 3) Bass-Boom — tiefer, langer Ton
      var o2=c.createOscillator(),g2=c.createGain();
      o2.type="sine";o2.frequency.setValueAtTime(65,t2);
      o2.frequency.exponentialRampToValueAtTime(28,t2+1.4);
      g2.gain.setValueAtTime(.3,t2);g2.gain.exponentialRampToValueAtTime(.001,t2+1.5);
      o2.connect(g2);g2.connect(c.destination);o2.start(t2);o2.stop(t2+1.6);
    }catch(e){ console.log("Donner-Fehler:",e.message); }
  }

  function boingSound(){
    if(!sound||boingPending)return;
    try{
      var AC=window.AudioContext||window.webkitAudioContext;
      if(!AC)return;
      if(!audio)audio=new AC();
      var c=audio;
      var play=function(){ donnern(c); };
      if(c.state==="suspended"){
        boingPending=true;
        c.resume().then(function(){boingPending=false;play();}).catch(function(){boingPending=false;});
      }else play();
    }catch(e){}
  }

  function showCap(){
    cap=1;
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
    trail.push({x:ball.bx,y:ball.by,life:1});
    if(trail.length>18)trail.shift();
    ball.vy+=0.42; ball.by+=ball.vy;
    var hit=0;
    if(ball.by+R>=FLOOR){
      ball.by=FLOOR-R; ball.vy=-Math.max(6.8,Math.abs(ball.vy)*0.9);
      ball.squash=1; hit=1;
    }
    if(hit){ showCap(); boingSound(); }

    for(var i=burst.length-1;i>=0;i--){
      var bp=burst[i];
      bp.x+=bp.vx; bp.y+=bp.vy; bp.vy+=0.35; bp.life-=0.035;
      if(bp.life<=0)burst.splice(i,1);
    }
    for(var j=0;j<trail.length;j++) trail[j].life-=0.06;

    // Blitz-Timer: alle 10-20 Sekunden ein Blitz
    blitzTimer+=0.016;
    if(blitzTimer>=blitzNext){
      blitzTimer=0;blitzNext=10+Math.random()*10;
      blitzDauer=0.15;
      blitzX=80+Math.random()*(LW-160);
      // Blitz ausloesen -> Donner folgt nach natuerlicher Verzoegerung
      donnerGeplant=true;
      donnerVerzoegerung=0.4+Math.random()*1.2;
    }
    if(blitzDauer>0)blitzDauer-=0.016;
    if(blitzDauer<0)blitzDauer=0;

    // Donner nach Verzoegerung (Licht ist schneller als Schall)
    if(donnerGeplant){
      donnerVerzoegerung-=0.016;
      if(donnerVerzoegerung<=0){
        donnerGeplant=false;
        donnerAktiv=0.9;
        if(sound)donnern(audio);
      }
    }
    if(donnerAktiv>0)donnerAktiv-=0.018;
    if(donnerAktiv<0)donnerAktiv=0;

    ctx.save();ctx.scale(scaleX,scaleY);
    // Hintergrund
    ctx.fillStyle="#9a9a9a";ctx.fillRect(0,0,LW,LH);
    ctx.strokeStyle="#7a20d0";ctx.lineWidth=1;ctx.globalAlpha=0.9;
    for(var y=12;y<104;y+=13){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(LW,y);ctx.stroke();}
    for(var x=0;x<=LW;x+=26){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,104);ctx.stroke();}
    for(var k=1;k<=9;k++){var yy=104+Math.pow(k/9,1.8)*96;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(LW,yy);ctx.stroke();}
    for(var x2=-LW;x2<=LW*2;x2+=40){ctx.beginPath();ctx.moveTo(160,104);ctx.lineTo(x2,LH);ctx.stroke();}
    ctx.globalAlpha=1;

    // Trail
    for(var ti=0;ti<trail.length;ti++){
      var tr=trail[ti];
      if(tr.life<=0)continue;
      ctx.globalAlpha=tr.life*0.35;
      ctx.fillStyle="#e8382f";
      ctx.beginPath();ctx.arc(tr.x,tr.y,R*0.35*tr.life,0,7);ctx.fill();
    }
    ctx.globalAlpha=1;

    // Burst
    for(var bi=0;bi<burst.length;bi++){
      var bp=burst[bi];
      ctx.globalAlpha=bp.life;
      ctx.fillStyle=bp.color;
      ctx.beginPath();ctx.arc(bp.x,bp.y,bp.size*bp.life,0,7);ctx.fill();
    }
    ctx.globalAlpha=1;

    // Donner-Flash + Donner-Linie — deutlicher
    if(donnerAktiv>0){
      ctx.fillStyle="rgba(255,255,255,"+(donnerAktiv*.6)+")";
      ctx.fillRect(0,0,LW,LH);
      ctx.strokeStyle="rgba(180,180,255,"+(Math.min(1,donnerAktiv*1.2))+")";ctx.lineWidth=3;
      ctx.beginPath();
      var lx=40+Math.random()*(LW-80), ly=0;
      ctx.moveTo(lx,ly);
      while(ly<LH*.85){lx+=(Math.random()-.5)*30;ly+=15+Math.random()*20;ctx.lineTo(lx,ly);}
      ctx.stroke();
    }

    // Blitz-Flash + Blitz-Linie — deutlicher
    if(blitzDauer>0){
      ctx.fillStyle="rgba(255,255,255,"+(blitzDauer*4)+")";
      ctx.fillRect(0,0,LW,LH);
      if(blitzDauer>0.05){
        ctx.strokeStyle="rgba(255,255,255,"+(Math.min(1,blitzDauer*6))+")";ctx.lineWidth=3;
        ctx.beginPath();
        var bx=blitzX, by=0;
        ctx.moveTo(bx,by);
        while(by<LH*.8){bx+=(Math.random()-.5)*24;by+=12+Math.random()*18;ctx.lineTo(bx,by);}
        ctx.stroke();
      }
    }

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
    if(laeuft)raf=requestAnimationFrame(frame);
  }

  // Nur rechnen, wenn der Ball sichtbar ist und der Tab im Vordergrund liegt
  function pruefen(){
    var an=imBild&&tabAktiv;
    if(an&&!laeuft){laeuft=true;raf=requestAnimationFrame(frame);}
    else if(!an&&laeuft){laeuft=false;if(raf)cancelAnimationFrame(raf);raf=null;}
  }

  // Klick auf den Ball: extra Bounce + Sound + Partikel
  canvas.addEventListener("click",function(e){
    var rect=canvas.getBoundingClientRect();
    var cx=(e.clientX-rect.left)/scaleX, cy=(e.clientY-rect.top)/scaleY;
    var dx=cx-ball.bx, dy=cy-ball.by;
    if(Math.hypot(dx,dy)<=R+6){
      ball.vy=-Math.max(9,Math.abs(ball.vy)*1.3);
      ball.squash=1; showCap();
      for(var i=0;i<18;i++){
        var a=Math.random()*6.28, sp=2+Math.random()*3;
        burst.push({x:ball.bx,y:ball.by,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-2,
          life:1, color:Math.random()>.5?"#6fd3ff":"#f5f0e6", size:2.5+Math.random()*2});
      }
      if(!audio)audio=new (window.AudioContext||window.webkitAudioContext)();
      if(audio.state==="suspended")audio.resume();
      if(sound)boingSound();
    }
  });

  // Ton-Toggle per Tastatur (S)
  function entsperren(){
    try{
      if(!audio)audio=new (window.AudioContext||window.webkitAudioContext)();
      if(audio.state==="suspended")audio.resume();
    }catch(e){}
  }
  window.addEventListener("pointerdown",entsperren);
  window.addEventListener("keydown",function(e){
    entsperren();
    if(e.key==="s"||e.key==="S"){sound=!sound;}
  });

  groesse();window.addEventListener("resize",groesse);
  tabAktiv=!document.hidden;
  document.addEventListener("visibilitychange",function(){tabAktiv=!document.hidden;pruefen();});
  if("IntersectionObserver" in window){
    new IntersectionObserver(function(es){imBild=es[0].isIntersecting;pruefen();}).observe(canvas);
  }
  laeuft=true;frame();
  if(!(tabAktiv&&imBild))pruefen();
  return {stop:function(){laeuft=false;if(raf)cancelAnimationFrame(raf);window.removeEventListener("resize",groesse);}};
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
