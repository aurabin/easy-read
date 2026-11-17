// Tests fuer die Amiga-Formaterkennung. Kein Audio, keine Dateien noetig.
import { detectAmigaFormat, SUPPORTED } from "./amiga-formats.mjs";

let ok = true;
const check = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) ok = false;
};
const bytes = s => new Uint8Array(Buffer.from(s, "binary"));

const mod = new Uint8Array(1084);
Buffer.from("M.K.").copy(Buffer.from(mod.buffer), 1080);
check("MOD erkannt", detectAmigaFormat(mod).id === "mod");
check("MOD abspielbar", detectAmigaFormat(mod).playable === true);

const mod8 = new Uint8Array(1084);
Buffer.from("8CHN").copy(Buffer.from(mod8.buffer), 1080);
check("8CHN erkannt", detectAmigaFormat(mod8).id === "mod");
check("8CHN nicht abspielbar", detectAmigaFormat(mod8).playable === false);

const svx = bytes("FORM00008SVX");
check("8SVX erkannt", detectAmigaFormat(svx).id === "8svx");
check("8SVX abspielbar", detectAmigaFormat(svx).playable === true);

check("ML erkannt", detectAmigaFormat(bytes("MLEDMODL...")).id === "ml");
check("MED erkannt", detectAmigaFormat(bytes("MED2.......")).id === "med");
check("XM erkannt", detectAmigaFormat(bytes("Extended Module: x")).id === "xm");

const s3m = new Uint8Array(64);
Buffer.from("SCRM").copy(Buffer.from(s3m.buffer), 0);
s3m[0x2c] = 0x1a;
check("S3M erkannt", detectAmigaFormat(s3m).id === "s3m");
check("IT erkannt", detectAmigaFormat(bytes("IMPM....")).id === "it");
check("AHX erkannt", detectAmigaFormat(bytes("THX.....")).id === "ahx");
check("MTM erkannt", detectAmigaFormat(bytes("MTM.....")).id === "mtm");
check("UMX erkannt", detectAmigaFormat(bytes("UMX0....")).id === "umx");
check("AMF erkannt", detectAmigaFormat(bytes("AMF.....")).id === "amf");
check("DMF erkannt", detectAmigaFormat((()=>{const x=new Uint8Array(8);
  Buffer.from("DMF").copy(Buffer.from(x.buffer),0);return x;})()).id === "dmf");
check("16SV erkannt", detectAmigaFormat(bytes("FORM000016SV")).id === "16sv");
check("Herkunft bei MOD", /Amiga/.test(detectAmigaFormat(mod).origin));
check("Herkunft bei XM", /PC/.test(detectAmigaFormat(bytes("Extended Module: x")).origin));
check("Unbekannt", detectAmigaFormat(bytes("abcdefgh")).id === "unknown");
check("Zu kurz", detectAmigaFormat(bytes("ab")).id === "unknown");
check("Liste vollstaendig", SUPPORTED.length >= 8);

console.log(ok ? "AMIGA-FORMATE OK" : "AMIGA-FORMATE FAIL");
process.exit(ok ? 0 : 1);
