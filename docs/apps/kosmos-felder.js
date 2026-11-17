/* Kosmos-Felder — eine Reise durch die Größenordnungen.
 * Zehn Stufen, vom Mikrokosmos bis zum Makrokosmos.
 * Jede Stufe ist ein eigener Feldgenerator mit eigener Bewegung.
 * Der Nutzer kann eigene Objekte hinzufügen. Reines Canvas, kein WAV.
 */
(function(global){
"use strict";

var STUFEN = [
  { id:"quark", name:"QUARKS", groesse:"10⁻¹⁸ m", farbe:"#f2d000",
    text:"Alles ist aus kleinsten Teilchen gemacht. Quarks sind noch kleiner als Atome. Sie zittern und verbinden sich.",
    lerne:["Quarks sind die kleinsten Bausteine.","Drei Quarks machen ein Proton."],
    mod:"zittern", form:"punkt", n:40, s:5 },
  { id:"atom", name:"ATOM", groesse:"10⁻¹⁰ m", farbe:"#6fd3ff",
    text:"Ein Atom hat einen Kern. Um den Kern kreisen Elektronen. Atome sind überall — auch in dir.",
    lerne:["Der Kern ist in der Mitte.","Elektronen kreisen darum."],
    mod:"atom", form:"kreis", n:10, s:6 },
  { id:"molekuel", name:"MOLEKÜL", groesse:"10⁻⁹ m", farbe:"#7a20d0",
    text:"Atome verbinden sich zu Molekülen. Wasser ist ein Molekül. Es ist aus Sauerstoff und Wasserstoff gemacht.",
    lerne:["Atome halten zusammen.","Wasser heißt H₂O."],
    mod:"verbinden", form:"kreis", n:18, s:5 },
  { id:"zelle", name:"ZELLE", groesse:"10⁻⁵ m", farbe:"#3fa04a",
    text:"Zellen sind die Bausteine des Lebens. Eine Zelle hat eine Hülle und einen Kern. Dein Körper hat Milliarden Zellen.",
    lerne:["Zellen sind lebendig.","Zellen teilen sich."],
    mod:"zelle", form:"zelle", n:14, s:9 },
  { id:"leben", name:"LEBEN BEGINNT", groesse:"10⁻³ m", farbe:"#0f766e",
    text:"Aus Zellen werden Lebewesen. Bakterien sind sehr klein. Sie schwimmen im Wasser und vermehren sich.",
    lerne:["Bakterien sind Lebewesen.","Leben braucht Wasser."],
    mod:"schwarm", form:"stab", n:30, s:4 },
  { id:"ozean", name:"OZEAN & WALD", groesse:"10⁰ – 10³ m", farbe:"#5ac8fa",
    text:"Viele Lebewesen zusammen machen einen Wald oder ein Meer. Fische schwimmen. Bäume wachsen. Alles hängt zusammen.",
    lerne:["Pflanzen machen Sauerstoff.","Tiere und Pflanzen brauchen einander."],
    mod:"natur", form:"blatt", n:34, s:6 },
  { id:"erde", name:"ERDE", groesse:"10⁷ m", farbe:"#6fd3ff",
    text:"Die Erde ist unser Planet. Sie hat Meer, Land und Luft. Wolken ziehen um den ganzen Planeten.",
    lerne:["Die Erde ist rund.","Wasser bedeckt fast alles."],
    mod:"erde", form:"kreis", n:26, s:4 },
  { id:"sonnensystem", name:"SONNENSYSTEM", groesse:"10¹³ m", farbe:"#f2d000",
    text:"Die Sonne ist ein Stern. Planeten kreisen um sie. Die Erde braucht ein Jahr für eine Runde.",
    lerne:["Die Sonne ist ein Stern.","Acht Planeten kreisen um sie."],
    mod:"sonne", form:"kreis", n:9, s:5 },
  { id:"galaxie", name:"MILCHSTRASSE", groesse:"10²¹ m", farbe:"#e0703c",
    text:"Die Milchstraße ist eine Galaxie. Sie hat sehr viele Sterne. Unsere Sonne ist einer davon.",
    lerne:["Eine Galaxie hat Milliarden Sterne.","Wir leben in der Milchstraße."],
    mod:"spirale", form:"stern", n:60, s:3 },
  { id:"universum", name:"UNIVERSUM", groesse:"10²⁷ m", farbe:"#b03030",
    text:"Das Universum ist alles. Es hat Galaxien, Sterne und Planeten. Es ist größer, als wir uns vorstellen können.",
    lerne:["Das Universum ist alles.","Es wird immer größer."],
    mod:"expansion", form:"punkt", n:50, s:3 }
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

function createKosmos(canvas, stufeIndex, eigene){
  var stufe=STUFEN[stufeIndex]||STUFEN[0];
  var ctx=canvas.getContext("2d"), W=canvas.width,H=canvas.height, ps=[], raf=null, tick=0;
  eigene=eigene||[];
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
      if(m==="zittern"){p.x+=(Math.random()-.5)*3;p.y+=(Math.random()-.5)*3;}
      else if(m==="atom"){
        var r=50+(i%3)*22, a=tick*.02*(i%2?1:-1)+p.phase;
        p.x=cx+Math.cos(a)*r;p.y=cy+Math.sin(a)*r*.6;
      }
      else if(m==="verbinden"){
        p.x+=p.vx*.6;p.y+=p.vy*.6;
        if(p.x<10||p.x>W-10)p.vx*=-1;if(p.y<10||p.y>H-10)p.vy*=-1;
        if(i>0&&i%3!==0)linie(ps[i-1],p,"#7a20d0",.4);
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
        var rr=Math.min(W,H)*.3,aa=tick*.006+p.phase*(i%4);
        p.x=cx+Math.cos(aa)*rr;p.y=cy+Math.sin(aa)*rr*.55;
      }
      else if(m==="sonne"){
        var orbit=40+(i%4)*26,a2=tick*(.01/(1+(i%4)*.5))+p.phase;
        p.x=cx+Math.cos(a2)*orbit;p.y=cy+Math.sin(a2)*orbit*.5;
      }
      else if(m==="spirale"){
        var arm=i%4, t2=(i/ps.length)*6+p.seed*.01;
        var rad=10+t2*Math.min(W,H)*.32, an=arm*Math.PI/2+t2*1.4;
        p.x=cx+Math.cos(an)*rad;p.y=cy+Math.sin(an)*rad*.6;
      }
      else if(m==="expansion"){
        p.x+=p.vx;p.y+=p.vy;p.vx*=1.0005;p.vy*=1.0005;
        if(p.x<-20||p.x>W+20||p.y<-20||p.y>H+20){
          p.x=cx+(Math.random()-.5)*30;p.y=cy+(Math.random()-.5)*30;
          p.vx=(Math.random()-.5)*1;p.vy=(Math.random()-.5)*1;
        }
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
    stufe:stufe
  };
}

global.KosmosFelder={STUFEN:STUFEN,create:createKosmos};
})(window);
