// Local Markdown link check. Run from the project root: node tools/link-check.cjs
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const files = [];
(function walk(d){ for(const e of fs.readdirSync(d,{withFileTypes:true})){
  if(e.name===".git")continue;
  const p=path.join(d,e.name);
  if(e.isDirectory())walk(p); else if(/\.md$/i.test(e.name))files.push(p);
}})(root);
let broken=0, total=0;
for(const f of files){
  const txt=fs.readFileSync(f,"utf8");
  for(const m of txt.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){
    const href=m[1].split("#")[0].trim();
    if(!href || /^(https?:|mailto:|data:)/.test(href))continue;
    total++;
    const target=path.resolve(path.dirname(f),decodeURIComponent(href));
    if(!fs.existsSync(target)){broken++;console.log("BROKEN:",path.relative(root,f),"->",href);}
  }
}
console.log("markdown files:",files.length,"| local links:",total,"| broken:",broken);
