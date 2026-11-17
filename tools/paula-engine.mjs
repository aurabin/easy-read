// Paula-Kompatibilitaet — eigene, moderne Emulation des Amiga-Paula-Chips.
// Kein kopierter Code. Nur die dokumentierte Hardware-Logik nachgebaut.
// Reines JavaScript, keine Abhaengigkeiten. Kein WAV.
// Used by tools for PCM; the browser app has its own matching implementation.

// PAL clock 3.546895 MHz. PAULA period -> Hz.
// Der Amiga spielt ein Sample mit "period" Paula-Ticks pro Sample ab.
export const PAL_CLOCK = 3546895;

// Periode zu Frequenz (2 clocks pro Sample, wie in der Original-Emulation).
export function periodToHz(period) {
  if (!period || period < 1) return 0;
  return PAL_CLOCK / (period * 2);
}

// Note (1..60) zu Periode. MusicLine nutzt 3591 als Startperiode.
const PITCHES = [3591];
for (let i = 1; i < 61; i++) PITCHES[i] = 3591 / Math.pow(2, (i - 1) / 12);
export function noteToPeriod(note) {
  if (note < 1 || note > 60) return 0;
  return PITCHES[note];
}

// Ein 8-Bit-Paula-Sample: signed -> Float, mit optionalem Loop.
// offset/loopStart/loopLen in Sample-Zaehlern (nicht Bytes).
export class PaulaVoice {
  constructor(sample) {
    this.sample = sample || new Uint8Array(0);
    this.phase = 0;        // Position im Sample (Float, fuer Interpolation)
    this.period = 0;       // Paula-Periode
    this.vol = 0;          // 0..64
    this.pan = 0;          // -1 links .. +1 rechts
    this.loopStart = 0;
    this.loopLen = 0;      // 0 = kein Loop, einmal abspielen
    this.active = false;
  }
  trigger(period, vol, pan = 0, offset = 0) {
    this.period = period;
    this.vol = vol;
    this.pan = pan;
    this.phase = offset;
    this.active = period > 0 && vol > 0;
  }
  // Ein Sample-Frame bei sampleRate. Gibt [links, rechts] zurueck.
  next(sampleRate) {
    if (!this.active || this.period <= 0 || !this.sample.length) return [0, 0];
    const hz = periodToHz(this.period);
    this.phase += hz / sampleRate;
    let pos = Math.floor(this.phase);

    // Loop oder Ende
    if (this.loopLen > 0) {
      const end = this.loopStart + this.loopLen;
      if (pos >= end) {
        pos = this.loopStart + ((pos - this.loopStart) % this.loopLen);
        this.phase = pos + (this.phase - Math.floor(this.phase));
      }
    } else if (pos >= this.sample.length) {
      this.active = false;
      return [0, 0];
    }

    // Lineare Interpolation zwischen zwei Samples
    const a = this.sample[Math.max(0, Math.min(this.sample.length - 1, pos))];
    const b = this.sample[Math.max(0, Math.min(this.sample.length - 1, pos + 1))];
    const frac = this.phase - Math.floor(this.phase);
    const raw = a + (b - a) * frac;
    const s = (raw >= 128 ? raw - 256 : raw) / 128; // signed 8-bit -> -1..1
    const v = s * (this.vol / 64) * 0.22;

    // Paula pannt fest: links (chan 0,3), rechts (chan 1,2).
    // Wir nutzen einen weichen Pan-Wert.
    const l = v * (this.pan <= 0 ? 1 : 1 - this.pan);
    const r = v * (this.pan >= 0 ? 1 : 1 + this.pan);
    return [l, r];
  }
}

// Einfacher 4-Kanal-Mixer mit einem Tiefpass (wie die Anthony-Paula-Filterung).
export class PaulaMixer {
  constructor(sampleRate) {
    this.sampleRate = sampleRate;
    this.voices = [new PaulaVoice(), new PaulaVoice(), new PaulaVoice(), new PaulaVoice()];
    // 2600 Hz Tiefpass (PAL), wie in der Original-Emulation.
    this.a1 = Math.exp((-2 * Math.PI * 2600) / sampleRate);
    this.lpL = 0;
    this.lpR = 0;
  }
  // Ein Frame mischen. Gibt [links, rechts] im Bereich -1..1 zurueck.
  mix() {
    let ml = 0, mr = 0;
    for (const v of this.voices) {
      const [l, r] = v.next(this.sampleRate);
      ml += l; mr += r;
    }
    this.lpL += this.a1 * (ml - this.lpL);
    this.lpR += this.a1 * (mr - this.lpR);
    return [this.lpL * 0.9, this.lpR * 0.9];
  }
}
