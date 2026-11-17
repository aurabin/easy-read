// Simple local preview server. Run from the project root: node tools/ch-server.mjs
import http from "http";
import { readFile } from "fs/promises";
import { extname, join, resolve } from "path";
const root = resolve(process.cwd());
const types = {".html":"text/html",".js":"text/javascript",".mjs":"text/javascript",
  ".css":"text/css",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",
  ".json":"application/json",".md":"text/plain",".wasm":"application/wasm"};
http.createServer(async (req,res)=>{
  try{
    let p = decodeURIComponent(new URL(req.url,"http://x").pathname);
    if(p==="/") p="/site/index.html";
    const fp = resolve(root, "."+p);
    if(!fp.startsWith(root)) {res.writeHead(403);return res.end("forbidden");}
    const data = await readFile(fp);
    res.writeHead(200,{"Content-Type":types[extname(fp)]||"application/octet-stream"});
    res.end(data);
  }catch(e){res.writeHead(404);res.end("not found");}
}).listen(8123,()=>console.log("serving on 8123"));
