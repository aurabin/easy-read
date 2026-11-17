// Tests fuer die eigene Paula-Engine. Kein Audio-Output, reine Mathematik.
import { PAL_CLOCK, periodToHz, noteToPeriod, PaulaVoice, PaulaMixer } from "./paula-engine.mjs";

let ok = true;
const check = (name, cond) => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (!cond) ok = false;
};

check("PAL-Takt korrekt", PAL_CLOCK === 3546895);
check("Periode 3591 -> ~494 Hz", Math.abs(periodToHz(3591) - 494) < 2);
check("Periode 0 -> 0 Hz", periodToHz(0) === 0);
check("kleinere Periode = hoehere Frequenz", periodToHz(500) > periodToHz(1000));
check("Note 1 = 3591", noteToPeriod(1) === 3591);
check("Note 60 < Note 1", noteToPeriod(60) < noteToPeriod(1));
check("Note 0 -> 0", noteToPeriod(0) === 0);
check("Note 61 -> 0", noteToPeriod(61) === 0);

// Stimme: 8-Bit-Sample, volle Lautstaerke
const smp = new Uint8Array(256);
for (let i = 0; i < 256; i++) smp[i] = i; // Rampe 0..255
const v = new PaulaVoice(smp);
v.trigger(1000, 64, 0, 0);
const [l, r] = v.next(44100);
check("Stimme aktiv nach trigger", v.active === true);
check("Stimme liefert links", Number.isFinite(l) && Math.abs(l) > 0);
check("Pan 0 -> links gleich rechts", Math.abs(l - r) < 0.0001);

// Panning
const vl = new PaulaVoice(smp); vl.trigger(1000, 64, -1, 0);
const [ll, lr] = vl.next(44100);
check("Pan links: links > rechts", ll > lr);
const vr = new PaulaVoice(smp); vr.trigger(1000, 64, 1, 0);
const [rl, rr] = vr.next(44100);
check("Pan rechts: rechts > links", rr > rl);

// Lautstaerke
const vq = new PaulaVoice(smp); vq.trigger(1000, 16, 0, 0);
const [q] = vq.next(44100);
check("leiser = kleiner", Math.abs(q) < Math.abs(l));

//样例-Ende ohne Loop -> inaktiv
const vShort = new PaulaVoice(new Uint8Array([128, 200]));
vShort.trigger(1, 64, 0, 0); // extrem hohe Frequenz
for (let i = 0; i < 100; i++) vShort.next(44100);
check("ohne Loop endet Stimme", vShort.active === false);

// Loop haelt Stimme aktiv
const vLoop = new PaulaVoice(smp);
vLoop.loopStart = 0; vLoop.loopLen = 255;
vLoop.trigger(8, 64, 0, 0);
for (let i = 0; i < 200; i++) vLoop.next(44100);
check("mit Loop bleibt Stimme aktiv", vLoop.active === true);
check("Loop bleibt im Bereich", vLoop.phase < 256);

// Mixer: 4 Kanaele, Stereo, Tiefpass
const mix = new PaulaMixer(44100);
check("Mixer hat 4 Stimmen", mix.voices.length === 4);
mix.voices[0].trigger(1000, 64, -1, 0);
mix.voices[1].trigger(800, 64, 1, 0);
const [ml, mr] = mix.mix();
check("Mixer liefert endliche Werte", Number.isFinite(ml) && Number.isFinite(mr));
check("Mixer Tiefpass daempft", Math.abs(ml) < 1 && Math.abs(mr) < 1);

console.log(ok ? "PAULA-ENGINE OK" : "PAULA-ENGINE FAIL");
process.exit(ok ? 0 : 1);
