/* Spiel-Felder — 28 unterschiedliche, spielerische Feldgeneratoren.
 * Jedes Feld hat eigenes Farbschema, Bewegungsmuster und Partikelform.
 * Reines Canvas, keine Abhängigkeiten, kein WAV.
 */
(function(global){
"use strict";

var PRESETS = {
  "Boing Ball":        {bg:"#070b14", colors:["#e8382f","#f5f0e6"], mode:"bounce", shape:"check", count:26, speed:2.4, size:9},
  "Musik wird Bild":   {bg:"#0a1226", colors:["#6fd3ff","#7a20d0","#f5f0e6"], mode:"wave", shape:"note", count:30, speed:1.6, size:7},
  "Musikplayer":       {bg:"#0b1020", colors:["#7a20d0","#6fd3ff"], mode:"pulse", shape:"square", count:28, speed:1.4, size:6},
  "Sound anhören":     {bg:"#07131a", colors:["#0f766e","#6fd3ff"], mode:"wave", shape:"circle", count:32, speed:1.8, size:5},
  "Feldgenerator":     {bg:"#070b14", colors:["#7a20d0","#6fd3ff","#e8382f"], mode:"flow", shape:"circle", count:40, speed:1.2, size:4},
  "Frei gestalten":    {bg:"#101018", colors:["#e8382f","#f2d000","#6fd3ff","#7a20d0","#3fa04a"], mode:"scatter", shape:"diamond", count:34, speed:1.6, size:6},
  "Alle Prompts":      {bg:"#08110a", colors:["#3fa04a","#6fd3ff"], mode:"rain", shape:"text", glyph:">", count:30, speed:2.0, size:11},
  "Standalone":        {bg:"#0d0d16", colors:["#f5f0e6","#9fb3d1"], mode:"orbit", shape:"square", count:18, speed:1.0, size:6},
  "Computer Chronik":  {bg:"#0a0f1c", colors:["#9fb3d1","#6fd3ff","#e8382f"], mode:"flow", shape:"circle", count:36, speed:1.1, size:4},
  "Microsoft":         {bg:"#081026", colors:["#6fd3ff","#eaf2ff"], mode:"grid", shape:"square", count:24, speed:0.8, size:8},
  "BOINC":             {bg:"#061418", colors:["#0f766e","#6fd3ff","#e8382f"], mode:"converge", shape:"circle", count:32, speed:1.3, size:4},
  "Code lernen":       {bg:"#081018", colors:["#6fd3ff","#3fa04a"], mode:"rain", shape:"text", glyph:"<>", count:26, speed:1.8, size:11},
  "Crash Course":      {bg:"#100c18", colors:["#f2d000","#7a20d0","#6fd3ff","#e8382f"], mode:"scatter", shape:"star", count:30, speed:2.0, size:7},
  "Commodore Kurs":    {bg:"#171408", colors:["#e8e2d0","#c9b83c","#4a4a3c"], mode:"grid", shape:"square", count:26, speed:0.9, size:7},
  "Ohne Wissen":       {bg:"#0a1020", colors:["#6fd3ff","#f5f0e6"], mode:"pulse", shape:"circle", count:20, speed:0.9, size:6},
  "Kontext":           {bg:"#100a18", colors:["#7a20d0","#f5f0e6","#6fd3ff"], mode:"orbit", shape:"text", glyph:"?", count:22, speed:1.2, size:11},
  "Ein Programm im Web":{bg:"#08131a", colors:["#6fd3ff","#0f766e"], mode:"globe", shape:"circle", count:34, speed:1.0, size:4},
  "Kunst und Design":  {bg:"#140c14", colors:["#e8382f","#f2d000","#6fd3ff","#7a20d0","#3fa04a"], mode:"scatter", shape:"diamond", count:32, speed:1.5, size:8},
  "Musik":             {bg:"#120a18", colors:["#7a20d0","#e8382f","#6fd3ff"], mode:"wave", shape:"note", count:28, speed:1.5, size:8},
  "Gesundheit":        {bg:"#1a0a0a", colors:["#e8382f","#3fa04a"], mode:"pulse", shape:"heart", count:22, speed:1.1, size:8},
  "中文":              {bg:"#1a0d0a", colors:["#e8382f","#f2d000"], mode:"rain", shape:"text", glyph:"电", count:26, speed:1.6, size:12},
  "Der eine Weg":      {bg:"#0c0a1c", colors:["#7a20d0","#9fb3d1"], mode:"orbit", shape:"square", count:24, speed:1.1, size:7},
  "Der andere Weg":    {bg:"#081226", colors:["#6fd3ff","#3b5bdb","#eaf2ff"], mode:"flow", shape:"circle", count:36, speed:1.2, size:5},
  "AROS One im RAM":   {bg:"#06140f", colors:["#0f766e","#6fd3ff","#eaf2ff"], mode:"grid", shape:"square", count:26, speed:0.9, size:7},
  "Melden":            {bg:"#1a0a0a", colors:["#e8382f","#f2d000"], mode:"pulse", shape:"text", glyph:"!", count:20, speed:1.3, size:14},
  "Verbessern":        {bg:"#0a1a0c", colors:["#3fa04a","#6fd3ff"], mode:"converge", shape:"check", count:22, speed:1.2, size:9},
  "Übersetzen":        {bg:"#120a1a", colors:["#7a20d0","#6fd3ff","#f5f0e6"], mode:"orbit", shape:"text", glyph:"A", count:24, speed:1.1, size:12},
  "Bauen":             {bg:"#16100a", colors:["#e0703c","#9fb3d1","#f2d000"], mode:"gear", shape:"square", count:24, speed:1.0, size:7},
  "Zahlen Rakete":     {bg:"#0a0f20", colors:["#6fd3ff","#f2d000","#e8382f"], mode:"rain", shape:"text", glyph:"1", count:26, speed:2.2, size:11},
  "Schwerkraft Ball":  {bg:"#070b14", colors:["#e8382f","#f5f0e6"], mode:"bounce", shape:"circle", count:24, speed:2.0, size:8},
  "Planeten Kreis":    {bg:"#080c1c", colors:["#6fd3ff","#f2d000","#e0703c","#7a20d0"], mode:"orbit", shape:"circle", count:20, speed:1.0, size:6},
  "Licht Blitz":       {bg:"#101018", colors:["#f2d000","#f5f0e6","#6fd3ff"], mode:"pulse", shape:"star", count:26, speed:1.8, size:7},
  "Atom Bauen":        {bg:"#0c0a18", colors:["#7a20d0","#6fd3ff","#e8382f"], mode:"orbit", shape:"circle", count:24, speed:1.4, size:5},
  "Sterne Zählen":     {bg:"#060814", colors:["#f5f0e6","#6fd3ff","#f2d000"], mode:"scatter", shape:"star", count:40, speed:0.7, size:4},
  "Muster Spirale":    {bg:"#120a18", colors:["#7a20d0","#6fd3ff","#e8382f"], mode:"gear", shape:"diamond", count:30, speed:1.0, size:6},
  "Größen Ordnung":    {bg:"#061018", colors:["#6fd3ff","#0f766e","#f2d000","#e8382f"], mode:"converge", shape:"circle", count:28, speed:1.1, size:5}
};

function drawShape(ctx, p){
  ctx.save();
  ctx.translate(p.x,p.y);
  ctx.fillStyle = p.color;
  ctx.globalAlpha = p.alpha;
  if(p.shape==="circle"){
    ctx.beginPath();ctx.arc(0,0,p.size,0,7);ctx.fill();
  } else if(p.shape==="square"){
    ctx.fillRect(-p.size,-p.size,p.size*2,p.size*2);
  } else if(p.shape==="diamond"){
    ctx.rotate(p.a);ctx.fillRect(-p.size,-p.size,p.size*2,p.size*2);
  } else if(p.shape==="star"){
    ctx.rotate(p.a);ctx.beginPath();
    for(var i=0;i<10;i++){var r=i%2?p.size*.45:p.size;var an=i*Math.PI/5;
      var x=Math.cos(an)*r,y=Math.sin(an)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
    ctx.closePath();ctx.fill();
  } else if(p.shape==="heart"){
    ctx.beginPath();ctx.moveTo(0,p.size*.8);
    ctx.bezierCurveTo(-p.size*1.6,-p.size*.4,-p.size*.6,-p.size*1.4,0,-p.size*.5);
    ctx.bezierCurveTo(p.size*.6,-p.size*1.4,p.size*1.6,-p.size*.4,0,p.size*.8);
    ctx.fill();
  } else if(p.shape==="note"){
    ctx.beginPath();ctx.ellipse(-p.size*.4,p.size*.5,p.size*.6,p.size*.4,-.4,0,7);ctx.fill();
    ctx.fillRect(p.size*.1,-p.size*1.2,p.size*.22,p.size*1.7);
  } else if(p.shape==="check"){
    ctx.strokeStyle=p.color;ctx.lineWidth=3;ctx.beginPath();
    ctx.moveTo(-p.size,0);ctx.lineTo(-p.size*.25,p.size*.7);ctx.lineTo(p.size,-p.size*.7);ctx.stroke();
  } else if(p.shape==="checker"){
    var q=p.size/2;ctx.fillStyle=p.color;ctx.fillRect(-q,-q,q,q);
    ctx.fillStyle="#f5f0e6";ctx.fillRect(0,0,q,q);
  } else if(p.shape==="text"){
    ctx.font="bold "+Math.round(p.size*1.6)+"px monospace";
    ctx.textAlign="center";ctx.textBaseline="middle";
    ctx.fillText(p.glyph||"*",0,0);
  }
  ctx.restore();
}

function makeParticle(preset,i,w,h){
  var c=preset.colors[i%preset.colors.length];
  var p={x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*preset.speed,
    vy:(Math.random()-.5)*preset.speed,a:Math.random()*6.28,
    color:c,size:preset.size*(.6+Math.random()*.8),shape:preset.shape,
    glyph:preset.glyph,alpha:.6+Math.random()*.4,phase:Math.random()*6.28,
    seed:Math.random()*1000};
  return p;
}

function createField(canvas, title){
  var preset=PRESETS[title]||PRESETS["Feldgenerator"];
  var ctx=canvas.getContext("2d");
  var W=canvas.width,H=canvas.height;
  var ps=[],raf=null,tick=0;
  function reset(){ps=[];for(var i=0;i<preset.count;i++)ps.push(makeParticle(preset,i,W,H));}
  function resize(){
    var r=canvas.getBoundingClientRect();
    W=canvas.width=Math.max(200,Math.floor(r.width));
    H=canvas.height=Math.max(120,Math.floor(r.height));
    reset();
  }
  function step(){
    tick++;ctx.fillStyle=preset.bg;ctx.fillRect(0,0,W,H);
    var cx=W/2,cy=H/2;
    for(var i=0;i<ps.length;i++){
      var p=ps[i],m=preset.mode,s=preset.speed;
      if(m==="bounce"){
        p.x+=p.vx;p.y+=p.vy;p.vy+=.12;
        if(p.y+p.size>H){p.y=H-p.size;p.vy=-Math.abs(p.vy)*.92;}
        if(p.x<p.size||p.x>W-p.size)p.vx*=-1;
      } else if(m==="wave"){
        p.x+=s*.5;p.y+=Math.sin(tick*.05+p.phase)*.8;
        if(p.x>W+10)p.x=-10;
      } else if(m==="pulse"){
        var d=Math.hypot(p.x-cx,p.y-cy)||1;
        p.x+=(p.x-cx)/d*s*.4;p.y+=(p.y-cy)/d*s*.4;
        if(d>W/2+20||d<8){p.x=cx+(Math.random()-.5)*20;p.y=cy+(Math.random()-.5)*20;}
      } else if(m==="flow"){
        var ang=Math.sin(p.x*.01+tick*.01)+Math.cos(p.y*.012-tick*.008);
        p.x+=Math.cos(ang)*s*.5;p.y+=Math.sin(ang)*s*.5;
        if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      } else if(m==="scatter"){
        p.x+=p.vx;p.y+=p.vy;p.a+=.02;
        if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      } else if(m==="rain"){
        p.y+=s;if(p.y>H+10){p.y=-10;p.x=Math.random()*W;}
      } else if(m==="orbit"){
        var r=40+(i%5)*18;var an=tick*.01*(i%2?1:-1)+p.phase;
        p.x=cx+Math.cos(an)*r*1.6;p.y=cy+Math.sin(an)*r;
      } else if(m==="grid"){
        var cols=Math.ceil(Math.sqrt(preset.count*W/H));
        var rows=Math.ceil(preset.count/cols);
        var gx=(i%cols)*W/cols+W/cols/2, gy=Math.floor(i/cols)*H/rows+H/rows/2;
        p.x+=(gx-p.x)*.08;p.y+=(gy-p.y)*.08;
      } else if(m==="converge"){
        var dx=cx-p.x,dy=cy-p.y,dd=Math.hypot(dx,dy)||1;
        p.x+=dx/dd*s*.7;p.y+=dy/dd*s*.7;
        if(dd<12){p.x=Math.random()*W;p.y=Math.random()*H;}
      } else if(m==="globe"){
        var a2=tick*.008+p.phase, rr=Math.min(W,H)*.32;
        p.x=cx+Math.cos(a2)*rr*Math.cos(p.seed);
        p.y=cy+Math.sin(a2)*rr*.55*Math.sin(p.seed);
      } else if(m==="gear"){
        var ga=tick*.01+(i%8)*.785, gr=50+(i%3)*22;
        p.x=cx+Math.cos(ga)*gr;p.y=cy+Math.sin(ga)*gr;p.a=ga;
      }
      drawShape(ctx,p);
    }
    raf=requestAnimationFrame(step);
  }
  resize();
  window.addEventListener("resize",resize);
  step();
  return {stop:function(){if(raf)cancelAnimationFrame(raf);window.removeEventListener("resize",resize);}};
}

global.SpielFelder={PRESETS:PRESETS,create:createField};
})(window);
