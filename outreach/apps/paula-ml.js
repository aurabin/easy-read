/* Paula + MusicLine Editor player in plain JavaScript.
 * Based on the open-source siday player (GPL-2.0), which follows the original
 * Musicline Editor DeliTracker replay routine (UADE mlineplayer102.asm).
 * Renders a .ml module to PCM using a small Paula emulator.
 * Usage: MLPaula.render(Uint8Array, sampleRate, seconds) -> Int16Array
 */
const MLPaula = (() => {
  const u16 = (b,o) => (b[o]<<8)|b[o+1];
  const u32 = (b,o) => ((b[o]<<24)|(b[o+1]<<16)|(b[o+2]<<8)|b[o+3])>>>0;
  const id  = (b,o) => String.fromCharCode(b[o],b[o+1],b[o+2],b[o+3]);

  function unpack(data, from, count, command, size){
    const out = new Uint8Array(size); let to=0, at=from;
    const end=Math.min(from+count,data.length);
    const nib = v => (v&8)?(v|0xf0):v;
    const put = v => { if(to<size)out[to]=v; to++; };
    while(at<end){
      const b=data[at++];
      if(b!==command){ put(b); continue; }
      if(at+3>end) break;
      let value=data[at];
      const left=(data[at+1]<<8)|data[at+2]; at+=3;
      put(value);
      for(let k=0;k<left && at<end;k++){
        const pair=data[at++];
        value=(value+nib(pair>>4))&255; put(value);
        if(++k<left && at<end){ value=(value+nib(pair&15))&255; put(value); }
      }
    }
    return out;
  }

  function parse(data){
    if(String.fromCharCode(...data.slice(0,8))!=='MLEDMODL') throw new Error('kein MusicLine-Modul');
    let at=8;
    if(id(data,at)!=='VERS') at=12+u32(data,8);
    if(id(data,at)!=='VERS') throw new Error('VERS fehlt');
    at += 8+u32(data,at+4);
    const parts=new Map(), samples=[], instr=new Map(); let tune=null;
    while(at+8<=data.length){
      const mark=id(data,at), len=u32(data,at+4), body=at+8;
      if(mark==='TUNE'){
        const title=String.fromCharCode(...data.slice(body,body+32)).replace(/\0.*/,'').trim();
        const tempo=u16(data,body+32), speed=data[body+34], groove=data[body+35];
        const playMode=data[body+38], count=data[body+39];
        let place=body+40+4*count; const lists=[], lengths=[];
        for(let c=0;c<count;c++){
          const size=u32(data,body+40+4*c);
          if(size>0 && c<8){ lists[c]=data.slice(place,place+Math.min(size,512)); lengths[c]=Math.min(size,512)/2; }
          else { lists[c]=null; lengths[c]=0; }
          place+=size;
        }
        if(!tune) tune={title,tempo,speed,groove,playMode,lists,lengths};
        at=place; continue;
      }
      if(mark==='PART'){
        const num=u16(data,body), rows=new Uint8Array(12*128); let from=body+2,to=0;
        const end=Math.min(body+len,data.length);
        while(from<end && (data[from]&0x80)===0 && to<rows.length){
          let mask=data[from++];
          for(let k=0;k<6;k++){
            if(mask&1){ rows[to]=data[from]; rows[to+1]=data[from+1]; from+=2; }
            mask>>=1; to+=2;
          }
        }
        parts.set(num,rows);
      }
      if(mark==='SMPL'){
        const original=u32(data,body), command=data[body+4];
        const soundAt=body+6+50, packed=Math.max(0,len-50);
        let sound = packed===original ? data.slice(soundAt,soundAt+original)
                   : unpack(data,soundAt,packed,command,original);
        if(original===256){
          sound=Uint8Array.from(sound);
          for(let k=0;k<256;k++) if(sound[k]===0x80) sound[k]=0x81;
          const ext=new Uint8Array(496); ext.set(sound.subarray(0,256));
          let from2=0; for(let t=256;t<496;t++){ ext[t]=sound[from2]; from2+=2; }
          sound=ext;
        }
        samples.push(sound);
        at = body+len+6;
        continue;
      }
      if(mark==='INST'){
        const bytes=new Uint8Array(206);
        for(let k=0;k<206;k++) bytes[k]=data[body+k]||0;
        instr.set(instr.size+1, bytes);
      }
      at=body+len;
    }
    return {tune,parts,samples,instr};
  }

  // Paula period -> output frequency (PAL clock 3.546895 MHz, 2 clocks per sample)
  function freq(period,note){
    if(period>0) return 3546895/(period*2);
    return 440*Math.pow(2,(note-49)/12);
  }

  function render(data, sampleRate=22050, seconds=19){
    const m=parse(data), out=new Int16Array(Math.floor(sampleRate*seconds));
    const t=m.tune;
    if(!t) return out;
    const ticksPerSec=Math.max(1,(t.tempo*2)/5);
    const tickLen=sampleRate/ticksPerSec;
    const voices=[];
    for(let c=0;c<4;c++) voices.push({list:t.lists[c]||null,pos:0,row:0,spd:t.speed,spdCnt:1,
      note:0,period:0,vol:0,samp:null,phase:0,active:0});
    let nextTick=0, tick=0;
    const pitches=[3591];
    for(let i=1;i<61;i++) pitches[i]=3591/Math.pow(2,(i-1)/12);

    let lp=0;
    const a1=Math.exp(-2*Math.PI*2600/sampleRate);
    for(let i=0;i<out.length;i++){
      if(i>=nextTick){
        for(const v of voices){
          if(!v.list) continue;
          v.spdCnt--; if(v.spdCnt>0) continue;
          v.spdCnt=v.spd;
          const w=(v.list[2*v.pos]<<8)|(v.list[2*v.pos+1]);
          const partNum=(w>>8)|((w<<2)&0x300), trans=(w&31)-16;
          let check=0;
          while(check++<256){
            const rows=m.parts.get(partNum); if(!rows) break;
            const r=v.row&127;
            let note=rows[12*r]||0, inst=rows[12*r+1]||0;
            v.row=(v.row+1)&127;
            if(v.row===0) v.pos=(v.pos+1)&255;
            if(note===61) break;
            if(note&0x80){ v.row=(note&0x7f); continue; }
            if(note>0 && note<61){
              const n=note+trans;
              if(n>0 && n<61){
                v.note=n;
                v.period=pitches[n];
                const ib=m.instr.get(inst);
                v.vol=ib? ((ib[58]<<8|ib[59])/64) || 0.6 : 0.6;
                const sn=ib? ib[32] : 1;
                v.samp=m.samples[sn-1]||m.samples[0]||null;
                v.phase=0; v.active=1; v.env=0; v.life=tickLen*v.spd*2;
              }
            } else if(note===0){ v.life=0; }
            break;
          }
        }
        tick++; nextTick=i+tickLen;
      }
      let mix=0;
      for(const v of voices){
        if(!v.active||!v.samp||v.life<=0) continue;
        v.life--;
        v.env = Math.min(1, v.env + 0.02);
        const rate=freq(v.period,v.note);
        v.phase += rate/sampleRate;
        if(v.phase>=1) v.phase-=1;
        const idx=Math.floor(v.phase*v.samp.length)%v.samp.length;
        let s=v.samp[idx]; if(s>=128)s-=256;
        mix += (s/128)*v.vol*v.env*0.22;
      }
      lp += a1*(mix-lp);
      const filtered=lp*0.9;
      out[i]=Math.round(Math.max(-1,Math.min(1,filtered))*32767);
    }
    return out;
  }

  return {render,parse};
})();
if(typeof module!=='undefined') module.exports=MLPaula;
