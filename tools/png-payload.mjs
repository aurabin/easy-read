// Embed files in PNG tEXt chunks and extract them again.
// Usage:
//   node tools/png-payload.mjs pack <in.png> <out.png> <file> [file...]
//   node tools/png-payload.mjs list <png>
//   node tools/png-payload.mjs unpack <png> <dir>
// PNG cannot execute code by itself. This stores real files losslessly in
// metadata so a loader can start them. No WAV, no recompression of the image.
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { basename, join } from "path";

const SIG = Buffer.from([137,80,78,71,13,10,26,10]);
const crcTable = (()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;
  for(let k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);t[n]=c>>>0;}return t;})();
function crc32(buf){let c=0xFFFFFFFF;for(const b of buf)c=(c>>>8)^crcTable[(c^b)&255];return (c^0xFFFFFFFF)>>>0;}
function chunks(buf){
  const out=[];let p=8;
  while(p<buf.length){const len=buf.readUInt32BE(p),type=buf.toString("ascii",p+4,p+8);
    const data=buf.subarray(p+8,p+8+len);const crc=buf.readUInt32BE(p+8+len);
    out.push({type,data,crc,ok:crc32(Buffer.concat([Buffer.from(type,"ascii"),data]))===crc});
    p+=12+len;}
  return out;
}
function chunk(type,data){
  const t=Buffer.from(type,"ascii"),len=Buffer.alloc(4);len.writeUInt32BE(data.length);
  const c=Buffer.alloc(4);c.writeUInt32BE(crc32(Buffer.concat([t,data]))>>>0);
  return Buffer.concat([len,t,data,c]);
}
function textChunk(key,value){
  return chunk("tEXt",Buffer.concat([Buffer.from(key,"latin1"),Buffer.from([0]),Buffer.from(value,"latin1")]));
}
const KEY="ER_PAYLOAD:";

const [mode,a,b,...rest]=process.argv.slice(2);
if(mode==="pack"){
  const png=readFileSync(a);
  if(!png.subarray(0,8).equals(SIG))throw new Error("kein PNG");
  if(!chunks(png).every(c=>c.ok))throw new Error("PNG hat fehlerhafte CRC-Werte");
  const parts=[png.subarray(0,8)];
  for(const c of chunks(png)){
    if(c.type==="IEND"){
      for(const f of rest){
        const data=readFileSync(f);
        parts.push(textChunk(KEY+basename(f),data.toString("base64")));
      }
    }
    parts.push(chunk(c.type,c.data));
  }
  writeFileSync(b,Buffer.concat(parts));
  console.log("gepackt:",rest.map(f=>basename(f)).join(", "),"->",b);
}else if(mode==="list"){
  const cs=chunks(readFileSync(a));
  for(const c of cs.filter(c=>c.type==="tEXt"&&c.data.toString("latin1").startsWith(KEY))){
    const s=c.data.toString("latin1"),i=s.indexOf("\0");
    console.log(s.slice(KEY.length,i),":",Buffer.from(s.slice(i+1),"base64").length,"bytes");
  }
}else if(mode==="unpack"){
  mkdirSync(b,{recursive:true});
  for(const c of chunks(readFileSync(a)).filter(c=>c.type==="tEXt")){
    const s=c.data.toString("latin1");if(!s.startsWith(KEY))continue;
    const i=s.indexOf("\0"),name=s.slice(KEY.length,i);
    if(!/^[\w.\-]+$/.test(name))continue;
    writeFileSync(join(b,name),Buffer.from(s.slice(i+1),"base64"));
    console.log("geschrieben:",join(b,name));
  }
}else{
  console.log("Usage: png-payload.mjs pack|list|unpack ...");
}
