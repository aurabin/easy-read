/* Kosmos-Felder — eine Reise durch die Größenordnungen.
 * Zehn Stufen, vom Mikrokosmos bis zum Makrokosmos.
 * Jede Stufe ist ein eigener Feldgenerator mit eigener Bewegung.
 * Der Nutzer kann eigene Objekte hinzufügen. Reines Canvas, kein WAV.
 */
(function(global){
"use strict";

var STUFEN = [
  { id:"quark", name:"Das erste Flüstern", groesse:"10⁻¹⁸ m", farbe:"#f2d000",
    text:"Ganz am Anfang gibt es ein Zittern. kleinster Staub, der je getanzt hat. Drei von ihm halten zusammen und werden ein Proton.",
    lerne:["Drei kleine Wesen werden eins.","Nichts ist wirklich still."],
    mod:"zittern", form:"punkt", n:40, s:5,
    energie:"~ 1 GeV", wasWenn:"Halt das Zittern fest" },
  { id:"atom", name:"Der kleine Tanz", groesse:"10⁻¹⁰ m", farbe:"#6fd3ff",
    text:"Ein Herz aus Licht, und darum ein weiches Singen. Die Elektronen sind keine Bällchen auf Bahnen. Sie sind ein Lied, das um das Kernchen wohnt.",
    lerne:["Das Herz ist winzig und schwer.","Das Lied ist eine Wolke, kein Kreis."],
    mod:"orbital", form:"punkt", n:60, s:3,
    energie:"~ 13,6 eV", wasWenn:"Zieh das Herz stärker" },
  { id:"molekuel", name:"Zwei Stimmen, ein Lied", groesse:"10⁻⁹ m", farbe:"#7a20d0",
    text:"Atome finden sich und singen zusammen. Wasser ist so ein Duett: ein Sauerstoff, zwei Wasserstoff, im Winkel von 104,5 Grad.",
    lerne:["Zusammen klingt es anders.","Wasser heißt H₂O."],
    mod:"verbinden", form:"kreis", n:18, s:5,
    energie:"~ 460 kJ/mol", wasWenn:"Ändere den Winkel des Lieds" },
  { id:"zelle", name:"Die erste Wiege", groesse:"10⁻⁵ m", farbe:"#3fa04a",
    text:"Eine zarte Hülle, ein kleiner Kern. Darin beginnt etwas, das sich teilt und weiterlebt. In dir sind Milliarden solche Wiegen.",
    lerne:["Die Hülle hält das Leben.","Aus einer werden zwei."],
    mod:"zelle", form:"zelle", n:14, s:9,
    energie:"~ 10⁻¹³ J", wasWenn:"Lass die Wiege sich teilen" },
  { id:"leben", name:"Das erste Schwimmer", groesse:"10⁻³ m", farbe:"#0f766e",
    text:"Im Wasser dreht sich ein kleines Wesen. Es sucht, es findet, es wird mehr. Das Leben hat angefangen zu wandern.",
    lerne:["Auch Kleinstes ist unterwegs.","Wasser war die erste Heimat."],
    mod:"schwarm", form:"stab", n:30, s:4,
    energie:"~ 10⁻¹⁵ J", wasWenn:"Nimm das Futter weg" },
  { id:"ozean", name:"Wald und Meer", groesse:"10⁰ – 10³ m", farbe:"#5ac8fa",
    text:"Viele kleine Lieder werden ein Chor. Fische schießen durchs Blau, Bäume strecken sich zum Licht. Alles atmet miteinander.",
    lerne:["Blätter schenken uns Luft.","Alles braucht einander."],
    mod:"natur", form:"blatt", n:34, s:6,
    energie:"~ 100 W/m²", wasWenn:"Nimm die Sonne weg" },
  { id:"erde", name:"Unsere runde Heimat", groesse:"10⁷ m", farbe:"#6fd3ff",
    text:"Ein blauer Ball, eingehüllt in Wolken. Er dreht sich einmal am Tag und neigt sich leise um 23,4 Grad. Darum gibt es Sommer und Winter.",
    lerne:["Sie rundet sich unter unseren Füßen.","Die Neigung macht die Jahreszeit."],
    mod:"erde", form:"kreis", n:26, s:4,
    energie:"~ 1,7·10¹⁷ W", wasWenn:"Bieg die Achse gerade" },
  { id:"sonnensystem", name:"Der Reigen der Planeten", groesse:"10¹³ m", farbe:"#f2d000",
    text:"Eine Sonne singt, und acht Planeten antworten. Sie tanzen keine Kreise, sondern weiche Ellipsen. Wer weit ist, singt langsam.",
    lerne:["Der Tanz ist eine Ellipse.","Weit weg heißt langsam."],
    mod:"kepler", form:"kreis", n:8, s:5,
    energie:"~ 3,8·10²⁶ W", wasWenn:"Mach die Sonne schwerer" },
  { id:"galaxie", name:"Die Milchstraße", groesse:"10²¹ m", farbe:"#e0703c",
    text:"Ein Wirbel aus Licht, riesig und still. Milliarden Sonnen drehen sich darin. Unsere eigene ist nur ein Funke in diesem Strom.",
    lerne:["Ein Funke unter Milliarden.","Wir wohnen in einem Wirbel."],
    mod:"spirale", form:"stern", n:60, s:3,
    energie:"~ 10³⁷ W", wasWenn:"Lös den Wirbel auf" },
  { id:"universum", name:"Das große Atmen", groesse:"10²⁷ m", farbe:"#b03030",
    text:"Alles weitet sich. Je weiter ein Stern von uns fort ist, desto schneller zieht er davon. Das Universum atmet aus — schon sehr, sehr lange.",
    lerne:["Alles wird weiter.","Fort heißt schneller fort."],
    mod:"hubble", form:"punkt", n:50, s:3,
    energie:"~ 10⁵³ J", wasWenn:"Halt das Atmen an" }
];

var palette = ["#6fd3ff","#7a20d0","#e8382f","#f2d000","#3fa04a","#f5f0e6","#e0703c"];

function makeParticle(stufe,i,w,h,extra){
  var p = {
    x:Math.random()*w, y:Math.random()*h,
    vx:(Math.random()-.5)*1.4, vy:(Math.random()-.5)*1.4,
    a:Math.random()*6.28, phase:Math.random()*6.28, seed:Math.random()*1000,
    size:stufe.s*(.6+Math.random()*.8),
    color: extra ? (extra.farbe||palette[i%palette.length]) : palette[i%palette.length],
    form: extra ? (extra.form||stufe.form) : stufe.form,
    eigene: !!extra, name: extra?extra.name:""
  };
  return p;
}

function zeichneForm(ctx,p){
  ctx.save();ctx.translate(p.x,p.y);ctx.fillStyle=p.color;ctx.globalAlpha=p.eigene?1:.85;
  var s=p.size;
  if(p.form==="kreis"||p.form==="punkt"){ctx.beginPath();ctx.arc(0,0,s,0,7);ctx.fill();}
  else if(p.form==="stab"){ctx.rotate(p.a);ctx.fillRect(-s,-s*.35,s*2,s*.7);}
  else if(p.form==="blatt"){ctx.rotate(p.a);ctx.beginPath();ctx.ellipse(0,0,s,s*.45,0,0,7);ctx.fill();}
  else if(p.form==="zelle"){
    ctx.beginPath();ctx.arc(0,0,s,0,7);ctx.fill();
    ctx.strokeStyle="#eaf2ff";ctx.lineWidth=1;ctx.stroke();
    ctx.fillStyle="#0e1626";ctx.beginPath();ctx.arc(0,0,s*.35,0,7);ctx.fill();
  } else if(p.form==="stern"){
    ctx.beginPath();for(var i=0;i<10;i++){var r=i%2?s*.4:s;var an=i*Math.PI/5;
      var x=Math.cos(an)*r,y=Math.sin(an)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
    ctx.closePath();ctx.fill();
  } else if(p.form==="dreieck"){
    ctx.beginPath();ctx.moveTo(0,-s);ctx.lineTo(s,s);ctx.lineTo(-s,s);ctx.closePath();ctx.fill();
  } else if(p.form==="viereck"){ctx.fillRect(-s,-s,s*2,s*2);}
  if(p.eigene && p.name){
    ctx.globalAlpha=1;ctx.fillStyle="#eaf2ff";ctx.font="9px monospace";
    ctx.textAlign="center";ctx.fillText(p.name.slice(0,10),0,-s-4);
  }
  ctx.restore();
}

function createKosmos(canvas, stufeIndex, eigene, wasWenn){
  var stufe=STUFEN[stufeIndex]||STUFEN[0];
  var ctx=canvas.getContext("2d"), W=canvas.width,H=canvas.height, ps=[], raf=null, tick=0;
  eigene=eigene||[];
  var ww=!!wasWenn;
  function reset(){
    ps=[];
    for(var i=0;i<stufe.n;i++)ps.push(makeParticle(stufe,i,W,H,null));
    eigene.forEach(function(ex){ps.push(makeParticle(stufe,ps.length,W,H,ex));});
  }
  function resize(){
    var r=canvas.getBoundingClientRect();
    W=canvas.width=Math.max(240,Math.floor(r.width));
    H=canvas.height=Math.max(160,Math.floor(r.height));
    reset();
  }
  function linie(a,b,color,alpha){
    ctx.strokeStyle=color;ctx.globalAlpha=alpha;ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.globalAlpha=1;
  }
  function step(){
    tick++;ctx.fillStyle="#070b14";ctx.fillRect(0,0,W,H);
    var cx=W/2,cy=H/2,m=stufe.mod,s=1;
    for(var i=0;i<ps.length;i++){
      var p=ps[i];
      if(m==="zittern"){
        // Brown'sche Bewegung: Schrittweite skaliert mit sqrt(dt).
        var z = ww ? 0.15 : 1.6; // Was-wenn: das Zittern wird festgehalten
        p.x+=(Math.random()-.5)*z;p.y+=(Math.random()-.5)*z;
        if(p.x<10||p.x>W-10)p.vx*=-1;
        if(p.y<10||p.y>H-10)p.vy*=-1;
      }
      else if(m==="orbital"){
        // Quanten-Orbital: Wolke aus Aufenthaltswahrscheinlichkeit.
        // Keine Bahn — die Punkte sind Messorte, dichter nahe dem Kern.
        var d=12+Math.pow(Math.random(),2)*Math.min(W,H)*(ww?.16:.32);
        var an=Math.random()*6.28;
        p.x=cx+Math.cos(an)*d;p.y=cy+Math.sin(an)*d*.75;
      }
      else if(m==="verbinden"){
        // Wassermolekül: O in der Mitte, zwei H im Winkel von 104,5°.
        var gruppe=Math.floor(i/3), pos=i%3;
        var ox=cx+Math.cos(gruppe*1.7)*Math.min(W,H)*.18;
        var oy=cy+Math.sin(gruppe*1.7)*Math.min(W,H)*.14;
        if(pos===0){p.x=ox;p.y=oy;}
        else{
          var winkel=(pos===1?1:2)*(ww?180:104.5)*Math.PI/180;
          p.x=ox+Math.cos(winkel)*26;
          p.y=oy+Math.sin(winkel)*26;
          linie({x:ox,y:oy},p,"#7a20d0",.6);
        }
      }
      else if(m==="zelle"){
        p.x+=Math.sin(tick*.02+p.phase)*.6;p.y+=Math.cos(tick*.02+p.phase)*.6;
      }
      else if(m==="schwarm"){
        var ax=Math.cos(tick*.01+p.phase)*1.2,ay=Math.sin(tick*.01+p.phase)*1.2;
        p.vx+=ax*.04;p.vy+=ay*.04;p.vx*=.97;p.vy*=.97;p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      }
      else if(m==="natur"){
        p.y+=.8;if(p.y>H+10){p.y=-10;p.x=Math.random()*W;}
        p.x+=Math.sin(tick*.03+p.phase)*.4;
      }
      else if(m==="erde"){
        // Erde rotiert in 24 h; Achse ist um 23,4° geneigt.
        var rr=Math.min(W,H)*.3;
        var rotation=tick*0.01;                    // Tag/Nacht
        var neigung=(ww?0:23.4)*Math.PI/180;       // Was-wenn: Achse gerade
        var laenge=p.phase+rotation*(p.seed%2?1:-1);
        p.x=cx+Math.cos(laenge)*rr;
        p.y=cy+Math.sin(laenge)*rr*Math.sin(neigung);
      }
      else if(m==="kepler"){
        // Kepler: Ellipse (a, e) und Umlaufzeit T ~ a^1.5.
        var a=60+(i%5)*22;              // grosse Halbachse
        var e=0.08+(i%4)*0.06;          // Exzentrizitaet
        var b=a*Math.sqrt(1-e*e);       // kleine Halbachse
        var T=a*1.5;                    // relative Umlaufzeit (T² ~ a³)
        var w=tick*(ww?0.024:0.012)/Math.sqrt(T)+p.phase;
        p.x=cx+Math.cos(w)*a;
        p.y=cy+Math.sin(w)*b*.55;
      }
      else if(m==="spirale"){
        // Spiralgalaxie: 4 Arme, differentielle Rotation (innen schneller).
        var arm=i%4;
        var rad=14+(i/ps.length)*Math.min(W,H)*.34;
        var omega=(ww?0.002:0.02)/(1+rad/120); // Was-wenn: Wirbel löst sich auf
        var winkel=arm*Math.PI/2+tick*omega+rad*0.012;
        p.x=cx+Math.cos(winkel)*rad;
        p.y=cy+Math.sin(winkel)*rad*.6;
      }
      else if(m==="hubble"){
        // Hubble-Gesetz: v = H0 * d. Schneller = weiter weg.
        var dx=p.x-cx,dy=p.y-cy,d=Math.hypot(dx,dy)||1;
        var H0=ww?0:0.0006; // Was-wenn: das Atmen steht still
        p.x+=dx/d*d*H0; p.y+=dy/d*d*H0;
        if(d>Math.max(W,H)*.7){
          var an=Math.random()*6.28,near=10+Math.random()*20;
          p.x=cx+Math.cos(an)*near;p.y=cy+Math.sin(an)*near;
        }
        // Linie zum Zentrum zeigt die Entfernung
        linie({x:cx,y:cy},p,"#b03030",0.12);
      }
      zeichneForm(ctx,p);
    }
    // Zentrum bei Sonne/Atom/Erde markieren
    if(m==="sonne"){ctx.fillStyle="#f2d000";ctx.beginPath();ctx.arc(cx,cy,16,0,7);ctx.fill();}
    if(m==="atom"){ctx.fillStyle="#6fd3ff";ctx.beginPath();ctx.arc(cx,cy,8,0,7);ctx.fill();}
    if(m==="erde"){ctx.fillStyle="#3a7d44";ctx.beginPath();ctx.arc(cx,cy,26,0,7);ctx.fill();
      ctx.fillStyle="#5ac8fa";ctx.beginPath();ctx.arc(cx-6,cy-4,8,0,7);ctx.fill();}
    raf=requestAnimationFrame(step);
  }
  resize();window.addEventListener("resize",resize);step();
  return {
    stop:function(){if(raf)cancelAnimationFrame(raf);window.removeEventListener("resize",resize);},
    setze:function(neu){eigene=neu||[];reset();},
    wasWenn:function(an){ww=!!an;reset();},
    stufe:stufe
  };
}

global.KosmosFelder={STUFEN:STUFEN,create:createKosmos};
})(window);
