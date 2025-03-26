/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import RIFFWAVE from "./riffwave";

const SQUARE = 0;
const SAWTOOTH = 1;
const SINE = 2;
const NOISE = 3;

const masterVolume = 1;

const OVERSAMPLING = 8;

class Params {
  oldParams: boolean;
  wave_type: number;
  p_env_attack: number;
  p_env_sustain: number;
  p_env_punch: number;
  p_env_decay: number;
  p_base_freq: number;
  p_freq_limit: number;
  p_freq_ramp: number;
  p_freq_dramp: number;
  p_vib_strength: number;
  p_vib_speed: number;
  p_arp_mod: number;
  p_arp_speed: number;
  p_duty: number;
  p_duty_ramp: number;
  p_repeat_speed: number;
  p_pha_offset: number;
  p_pha_ramp: number;
  p_lpf_freq: number;
  p_lpf_ramp: number;
  p_lpf_resonance: number;
  p_hpf_freq: number;
  p_hpf_ramp: number;
  sound_vol: number;
  sample_rate: number;
  sample_size: number;
  p_vib_delay: number;

  constructor() {
    this.p_vib_delay = 0;
    this.oldParams = true;

    this.wave_type = SQUARE;

    this.p_env_attack = 0;
    this.p_env_sustain = 0.3;
    this.p_env_punch = 0;
    this.p_env_decay = 0.4;

    this.p_base_freq = 0.3;
    this.p_freq_limit = 0;
    this.p_freq_ramp = 0;
    this.p_freq_dramp = 0;

    this.p_vib_strength = 0;
    this.p_vib_speed = 0;

    this.p_arp_mod = 0;
    this.p_arp_speed = 0;

    this.p_duty = 0;
    this.p_duty_ramp = 0;

    this.p_repeat_speed = 0;

    this.p_pha_offset = 0;
    this.p_pha_ramp = 0;

    this.p_lpf_freq = 1;
    this.p_lpf_ramp = 0;
    this.p_lpf_resonance = 0;

    this.p_hpf_freq = 0;
    this.p_hpf_ramp = 0;

    this.sound_vol = 0.5;
    this.sample_rate = 44100;
    this.sample_size = 8;
  }
  toB58() {
    const convert = [];
    for (const pi in params_order) {
      const p = params_order[pi];
      if (p == "wave_type") {
        convert.push(this[p]);
      } else if (p.indexOf("p_") == 0) {
        let val = this[p as keyof Params];
        val = floatToNumber(val as number);
        convert.push(0xff & val);
        convert.push(0xff & (val >> 8));
        convert.push(0xff & (val >> 16));
        convert.push(0xff & (val >> 24));
      }
    }
    return (function (B, A) {
      const d: number[] = [];
      let s: string = "";
      let j: number;
      let c: number;
      let n: number;

      for (const i in B) {
        (j = 0), (c = B[i]);
        s += c || s.length ^ Number(i) ? "" : 1;
        while (j in d || c) {
          n = d[j];
          n = n ? n * 256 + c : c;
          c = (n / 58) | 0;
          d[j] = n % 58;
          j++;
        }
      }
      j = d.length;
      while (j--) s += A[d[j]];
      return s;
    })(convert, b58alphabet);
  }
  fromB58(b58encoded: string) {
    this.fromJSON(Sfxr.b58decode(b58encoded));
    return this;
  }
  fromJSON(struct: any) {
    for (const p in struct) {
      if (struct.hasOwnProperty(p)) {
        // @ts-ignore
        this[p] = struct[p];
      }
    }
    return this;
  }

  pickupCoin() {
    this.wave_type = SAWTOOTH;
    this.p_base_freq = 0.4 + frnd(0.5);
    this.p_env_attack = 0;
    this.p_env_sustain = frnd(0.1);
    this.p_env_decay = 0.1 + frnd(0.4);
    this.p_env_punch = 0.3 + frnd(0.3);
    if (rnd(1)) {
      this.p_arp_speed = 0.5 + frnd(0.2);
      this.p_arp_mod = 0.2 + frnd(0.4);
    }
    return this;
  }
  laserShoot() {
    this.wave_type = rnd(2);
    if (this.wave_type === SINE && rnd(1)) this.wave_type = rnd(1);
    if (rnd(2) === 0) {
      this.p_base_freq = 0.3 + frnd(0.6);
      this.p_freq_limit = frnd(0.1);
      this.p_freq_ramp = -0.35 - frnd(0.3);
    } else {
      this.p_base_freq = 0.5 + frnd(0.5);
      this.p_freq_limit = this.p_base_freq - 0.2 - frnd(0.6);
      if (this.p_freq_limit < 0.2) this.p_freq_limit = 0.2;
      this.p_freq_ramp = -0.15 - frnd(0.2);
    }
    if (this.wave_type === SAWTOOTH) this.p_duty = 1;
    if (rnd(1)) {
      this.p_duty = frnd(0.5);
      this.p_duty_ramp = frnd(0.2);
    } else {
      this.p_duty = 0.4 + frnd(0.5);
      this.p_duty_ramp = -frnd(0.7);
    }
    this.p_env_attack = 0;
    this.p_env_sustain = 0.1 + frnd(0.2);
    this.p_env_decay = frnd(0.4);
    if (rnd(1)) this.p_env_punch = frnd(0.3);
    if (rnd(2) === 0) {
      this.p_pha_offset = frnd(0.2);
      this.p_pha_ramp = -frnd(0.2);
    }

    this.p_hpf_freq = frnd(0.3);

    return this;
  }
  explosion() {
    this.wave_type = NOISE;
    if (rnd(1)) {
      this.p_base_freq = sqr(0.1 + frnd(0.4));
      this.p_freq_ramp = -0.1 + frnd(0.4);
    } else {
      this.p_base_freq = sqr(0.2 + frnd(0.7));
      this.p_freq_ramp = -0.2 - frnd(0.2);
    }
    if (rnd(4) === 0) this.p_freq_ramp = 0;
    if (rnd(2) === 0) this.p_repeat_speed = 0.3 + frnd(0.5);
    this.p_env_attack = 0;
    this.p_env_sustain = 0.1 + frnd(0.3);
    this.p_env_decay = frnd(0.5);
    if (rnd(1)) {
      this.p_pha_offset = -0.3 + frnd(0.9);
      this.p_pha_ramp = -frnd(0.3);
    }
    this.p_env_punch = 0.2 + frnd(0.6);
    if (rnd(1)) {
      this.p_vib_strength = frnd(0.7);
      this.p_vib_speed = frnd(0.6);
    }
    if (rnd(2) === 0) {
      this.p_arp_speed = 0.6 + frnd(0.3);
      this.p_arp_mod = 0.8 - frnd(1.6);
    }

    return this;
  }
  powerUp() {
    if (rnd(1)) {
      this.wave_type = SAWTOOTH;
      this.p_duty = 1;
    } else {
      this.p_duty = frnd(0.6);
    }
    this.p_base_freq = 0.2 + frnd(0.3);
    if (rnd(1)) {
      this.p_freq_ramp = 0.1 + frnd(0.4);
      this.p_repeat_speed = 0.4 + frnd(0.4);
    } else {
      this.p_freq_ramp = 0.05 + frnd(0.2);
      if (rnd(1)) {
        this.p_vib_strength = frnd(0.7);
        this.p_vib_speed = frnd(0.6);
      }
    }
    this.p_env_attack = 0;
    this.p_env_sustain = frnd(0.4);
    this.p_env_decay = 0.1 + frnd(0.4);

    return this;
  }
  hitHurt() {
    this.wave_type = rnd(2);
    if (this.wave_type === SINE) this.wave_type = NOISE;
    if (this.wave_type === SQUARE) this.p_duty = frnd(0.6);
    if (this.wave_type === SAWTOOTH) this.p_duty = 1;
    this.p_base_freq = 0.2 + frnd(0.6);
    this.p_freq_ramp = -0.3 - frnd(0.4);
    this.p_env_attack = 0;
    this.p_env_sustain = frnd(0.1);
    this.p_env_decay = 0.1 + frnd(0.2);
    if (rnd(1)) this.p_hpf_freq = frnd(0.3);
    return this;
  }
  jump() {
    this.wave_type = SQUARE;
    this.p_duty = frnd(0.6);
    this.p_base_freq = 0.3 + frnd(0.3);
    this.p_freq_ramp = 0.1 + frnd(0.2);
    this.p_env_attack = 0;
    this.p_env_sustain = 0.1 + frnd(0.3);
    this.p_env_decay = 0.1 + frnd(0.2);
    if (rnd(1)) this.p_hpf_freq = frnd(0.3);
    if (rnd(1)) this.p_lpf_freq = 1 - frnd(0.6);
    return this;
  }
  blipSelect() {
    this.wave_type = rnd(1);
    if (this.wave_type === SQUARE) this.p_duty = frnd(0.6);
    else this.p_duty = 1;
    this.p_base_freq = 0.2 + frnd(0.4);
    this.p_env_attack = 0;
    this.p_env_sustain = 0.1 + frnd(0.1);
    this.p_env_decay = frnd(0.2);
    this.p_hpf_freq = 0.1;
    return this;
  }
  synth() {
    this.wave_type = rnd(1);
    this.p_base_freq = [
      0.2723171360931539, 0.19255692561524382, 0.13615778746815113,
    ][rnd(2)];
    this.p_env_attack = rnd(4) > 3 ? frnd(0.5) : 0;
    this.p_env_sustain = frnd(1);
    this.p_env_punch = frnd(1);
    this.p_env_decay = frnd(0.9) + 0.1;
    this.p_arp_mod = [0, 0, 0, 0, -0.3162, 0.7454, 0.7454][rnd(6)];
    this.p_arp_speed = frnd(0.5) + 0.4;
    this.p_duty = frnd(1);
    this.p_duty_ramp = rnd(2) == 2 ? frnd(1) : 0;
    this.p_lpf_freq = [1, 0.9 * frnd(1) * frnd(1) + 0.1][rnd(1)];
    this.p_lpf_ramp = rndr(-1, 1);
    this.p_lpf_resonance = frnd(1);
    this.p_hpf_freq = rnd(3) == 3 ? frnd(1) : 0;
    this.p_hpf_ramp = rnd(3) == 3 ? frnd(1) : 0;
    return this;
  }
  tone() {
    this.wave_type = SINE;
    this.p_base_freq = 0.35173364;
    this.p_env_attack = 0;
    this.p_env_sustain = 0.6641;
    this.p_env_decay = 0;
    this.p_env_punch = 0;
    return this;
  }
  click() {
    const base = ["explosion", "hitHurt"][rnd(1)];
    (this[base as keyof Params] as () => void)();
    if (rnd(1)) {
      this.p_freq_ramp = -0.5 + frnd(1.0);
    }
    if (rnd(1)) {
      this.p_env_sustain = (frnd(0.4) + 0.2) * this.p_env_sustain;
      this.p_env_decay = (frnd(0.4) + 0.2) * this.p_env_decay;
    }
    if (rnd(3) == 0) {
      this.p_env_attack = frnd(0.3);
    }
    this.p_base_freq = 1 - frnd(0.25);
    this.p_hpf_freq = 1 - frnd(0.1);
    return this;
  }
  random() {
    this.wave_type = rnd(3);
    if (rnd(1)) this.p_base_freq = cube(frnd(2) - 1) + 0.5;
    else this.p_base_freq = sqr(frnd(1));
    this.p_freq_limit = 0;
    this.p_freq_ramp = Math.pow(frnd(2) - 1, 5);
    if (this.p_base_freq > 0.7 && this.p_freq_ramp > 0.2)
      this.p_freq_ramp = -this.p_freq_ramp;
    if (this.p_base_freq < 0.2 && this.p_freq_ramp < -0.05)
      this.p_freq_ramp = -this.p_freq_ramp;
    this.p_freq_dramp = Math.pow(frnd(2) - 1, 3);
    this.p_duty = frnd(2) - 1;
    this.p_duty_ramp = Math.pow(frnd(2) - 1, 3);
    this.p_vib_strength = Math.pow(frnd(2) - 1, 3);
    this.p_vib_speed = rndr(-1, 1);
    this.p_env_attack = cube(rndr(-1, 1));
    this.p_env_sustain = sqr(rndr(-1, 1));
    this.p_env_decay = rndr(-1, 1);
    this.p_env_punch = Math.pow(frnd(0.8), 2);
    if (this.p_env_attack + this.p_env_sustain + this.p_env_decay < 0.2) {
      this.p_env_sustain += 0.2 + frnd(0.3);
      this.p_env_decay += 0.2 + frnd(0.3);
    }
    this.p_lpf_resonance = rndr(-1, 1);
    this.p_lpf_freq = 1 - Math.pow(frnd(1), 3);
    this.p_lpf_ramp = Math.pow(frnd(2) - 1, 3);
    if (this.p_lpf_freq < 0.1 && this.p_lpf_ramp < -0.05)
      this.p_lpf_ramp = -this.p_lpf_ramp;
    this.p_hpf_freq = Math.pow(frnd(1), 5);
    this.p_hpf_ramp = Math.pow(frnd(2) - 1, 5);
    this.p_pha_offset = Math.pow(frnd(2) - 1, 3);
    this.p_pha_ramp = Math.pow(frnd(2) - 1, 3);
    this.p_repeat_speed = frnd(2) - 1;
    this.p_arp_speed = frnd(2) - 1;
    this.p_arp_mod = frnd(2) - 1;
    return this;
  }
  mutate() {
    if (rnd(1)) this.p_base_freq += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_freq_ramp += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_freq_dramp += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_duty += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_duty_ramp += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_vib_strength += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_vib_speed += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_vib_delay += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_env_attack += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_env_sustain += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_env_decay += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_env_punch += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_lpf_resonance += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_lpf_freq += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_lpf_ramp += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_hpf_freq += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_hpf_ramp += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_pha_offset += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_pha_ramp += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_repeat_speed += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_arp_speed += frnd(0.1) - 0.05;
    if (rnd(1)) this.p_arp_mod += frnd(0.1) - 0.05;
    return this;
  }
}

function sqr(x: number) {
  return x * x;
}
function cube(x: number) {
  return x * x * x;
}

function frnd(range: number) {
  return Math.random() * range;
}

function rndr(from: number, to: number) {
  return Math.random() * (to - from) + from;
}

function rnd(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

function assembleFloat(sign: number, exponent: number, mantissa: number) {
  return (sign << 31) | (exponent << 23) | mantissa;
}

function floatToNumber(flt: number) {
  if (isNaN(flt)) return assembleFloat(0, 0xff, 0x1337);

  const sign = flt < 0 ? 1 : 0;
  flt = Math.abs(flt);
  if (flt == 0.0) return assembleFloat(sign, 0, 0);

  const exponent = Math.floor(Math.log(flt) / Math.LN2);
  if (exponent > 127 || exponent < -126) return assembleFloat(sign, 0xff, 0);

  const mantissa = flt / Math.pow(2, exponent);
  return assembleFloat(
    sign,
    exponent + 127,
    (mantissa * Math.pow(2, 23)) & 0x7fffff
  );
}

function numberToFloat(bytes: number) {
  const sign = bytes & 0x80000000 ? -1 : 1;
  let exponent = ((bytes >> 23) & 0xff) - 127;
  let significand = bytes & ~(-1 << 23);

  if (exponent == 128)
    return sign * (significand ? Number.NaN : Number.POSITIVE_INFINITY);

  if (exponent == -127) {
    if (significand == 0) return sign * 0.0;
    exponent = -126;
    significand /= 1 << 22;
  } else significand = (significand | (1 << 23)) / (1 << 23);

  return sign * significand * Math.pow(2, exponent);
}

const b58alphabet =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const params_order = [
  "wave_type",
  "p_env_attack",
  "p_env_sustain",
  "p_env_punch",
  "p_env_decay",
  "p_base_freq",
  "p_freq_limit",
  "p_freq_ramp",
  "p_freq_dramp",
  "p_vib_strength",
  "p_vib_speed",
  "p_arp_mod",
  "p_arp_speed",
  "p_duty",
  "p_duty_ramp",
  "p_repeat_speed",
  "p_pha_offset",
  "p_pha_ramp",
  "p_lpf_freq",
  "p_lpf_ramp",
  "p_lpf_resonance",
  "p_hpf_freq",
  "p_hpf_ramp",
];

class Sfxr {
  static toBuffer(synthdef: string) {
    return new SoundEffect(synthdef).getRawBuffer()["buffer"];
  }

  static toWebAudio(synthdef: string, audiocontext: AudioContext) {
    const sfx = new SoundEffect(synthdef);
    const buffer = sfx.getRawBuffer()["normalized"];
    if (audiocontext) {
      const buff = audiocontext.createBuffer(1, buffer.length, sfx.sampleRate);
      const nowBuffering = buff.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) {
        nowBuffering[i] = buffer[i];
      }
      const proc = audiocontext.createBufferSource();
      proc.buffer = buff;
      return proc;
    }
  }

  static toWave(synthdef: string) {
    return new SoundEffect(synthdef).generate();
  }

  static toAudio(synthdef: string) {
    return Sfxr.toWave(synthdef).getAudio();
  }

  static play(synthdef: string) {
    return Sfxr.toAudio(synthdef).play();
  }

  static b58decode(b58encoded: string) {
    const decoded = (function (S, A) {
      const d: number[] = [];
      const b: number[] = [];
      let j: number;
      let c: number;
      let n: number;

      for (let i = 0; i < S.length; i++) {
        (j = 0), (c = A.indexOf(S[i]));
        if (c < 0) return undefined;
        c || b.length ^ i ? i : b.push(0);
        while (j in d || c) {
          n = d[j];
          n = n ? n * 58 + c : c;
          c = n >> 8;
          d[j] = n % 256;
          j++;
        }
      }
      j = d.length;
      while (j--) b.push(d[j]);
      return new Uint8Array(b);
    })(b58encoded, b58alphabet);

    const result: Record<string, number | undefined> = {};
    for (const pi in params_order) {
      const p = params_order[pi];
      const offset = (Number(pi) - 1) * 4 + 1;
      if (p == "wave_type") {
        result[p] = decoded ? decoded[0] : undefined;
      } else {
        const val =
          (decoded?.[offset] ?? 0) |
          ((decoded?.[offset + 1] ?? 0) << 8) |
          ((decoded?.[offset + 2] ?? 0) << 16) |
          ((decoded?.[offset + 3] ?? 0) << 24);
        result[p] = numberToFloat(val);
      }
    }
    return result;
  }

  static b58encode(synthdef: string) {
    const p = new Params();
    p.fromJSON(synthdef);
    return p.toB58();
  }

  static generate(algorithm: string, options: Record<string, number>) {
    const p = new Params();
    const opts = options || {};
    p.sound_vol = opts["sound_vol"] || 0.25;
    p.sample_rate = opts["sample_rate"] || 44100;
    p.sample_size = opts["sample_size"] || 8;

    // @ts-ignore
    return p[algorithm]();
  }
}

export default Sfxr;

class SoundEffect {
  sampleRate = 44100;
  parameters: any;
  waveShape: number = 0;
  fltw: number = 0;
  enableLowPassFilter: boolean = false;
  fltw_d: number = 0;
  fltdmp: number = 0;
  flthp: number = 0;
  flthp_d: number = 0;
  vibratoSpeed: number = 0;
  vibratoAmplitude: number = 0;
  envelopeLength: number[] = [];
  envelopePunch: any = 0;
  flangerOffset: number = 0;
  flangerOffsetSlide: number = 0;
  repeatTime: number = 0;
  gain: number = 0;
  bitsPerChannel: any = 0;
  elapsedSinceRepeat: number = 0;
  period: number = 0;
  periodMax: number = 0;
  enableFrequencyCutoff: boolean = false;
  periodMult: number = 0;
  periodMultSlide: number = 0;
  dutyCycle: number = 0;
  dutyCycleSlide: number = 0;
  arpeggioMultiplier: number = 0;
  arpeggioTime: number = 0;

  constructor(ps: string | Params) {
    let newPs = ps;

    if (typeof newPs === "string") {
      const PARAMS = new Params();
      if (newPs.indexOf("#") === 0) {
        newPs = newPs.slice(1);
      }
      newPs = PARAMS.fromB58(newPs);
    }

    this.init(newPs);
  }

  init(ps: Params) {
    this.parameters = ps;
    this.initForRepeat();

    this.waveShape = parseInt(ps.wave_type.toString());

    this.fltw = Math.pow(ps.p_lpf_freq, 3) * 0.1;
    this.enableLowPassFilter = ps.p_lpf_freq !== 1;
    this.fltw_d = 1 + ps.p_lpf_ramp * 0.0001;
    this.fltdmp =
      (5 / (1 + Math.pow(ps.p_lpf_resonance, 2) * 20)) * (0.01 + this.fltw);
    if (this.fltdmp > 0.8) this.fltdmp = 0.8;
    this.flthp = Math.pow(ps.p_hpf_freq, 2) * 0.1;
    this.flthp_d = 1 + ps.p_hpf_ramp * 0.0003;

    this.vibratoSpeed = Math.pow(ps.p_vib_speed, 2) * 0.01;
    this.vibratoAmplitude = ps.p_vib_strength * 0.5;

    this.envelopeLength = [
      Math.floor(ps.p_env_attack * ps.p_env_attack * 100000),
      Math.floor(ps.p_env_sustain * ps.p_env_sustain * 100000),
      Math.floor(ps.p_env_decay * ps.p_env_decay * 100000),
    ];
    this.envelopePunch = ps.p_env_punch;

    this.flangerOffset = Math.pow(ps.p_pha_offset, 2) * 1020;
    if (ps.p_pha_offset < 0) this.flangerOffset = -this.flangerOffset;
    this.flangerOffsetSlide = Math.pow(ps.p_pha_ramp, 2) * 1;
    if (ps.p_pha_ramp < 0) this.flangerOffsetSlide = -this.flangerOffsetSlide;

    this.repeatTime = Math.floor(
      Math.pow(1 - ps.p_repeat_speed, 2) * 20000 + 32
    );
    if (ps.p_repeat_speed === 0) this.repeatTime = 0;

    this.gain = Math.exp(ps.sound_vol) - 1;

    this.sampleRate = ps.sample_rate;
    this.bitsPerChannel = ps.sample_size;
  }

  initForRepeat() {
    const ps = this.parameters;
    this.elapsedSinceRepeat = 0;

    this.period = 100 / (ps.p_base_freq * ps.p_base_freq + 0.001);
    this.periodMax = 100 / (ps.p_freq_limit * ps.p_freq_limit + 0.001);
    this.enableFrequencyCutoff = ps.p_freq_limit > 0;
    this.periodMult = 1 - Math.pow(ps.p_freq_ramp, 3) * 0.01;
    this.periodMultSlide = -Math.pow(ps.p_freq_dramp, 3) * 0.000001;

    this.dutyCycle = 0.5 - ps.p_duty * 0.5;
    this.dutyCycleSlide = -ps.p_duty_ramp * 0.00005;

    if (ps.p_arp_mod >= 0)
      this.arpeggioMultiplier = 1 - Math.pow(ps.p_arp_mod, 2) * 0.9;
    else this.arpeggioMultiplier = 1 + Math.pow(ps.p_arp_mod, 2) * 10;
    this.arpeggioTime = Math.floor(
      Math.pow(1 - ps.p_arp_speed, 2) * 20000 + 32
    );
    if (ps.p_arp_speed === 1) this.arpeggioTime = 0;
  }

  getRawBuffer() {
    let fltp = 0;
    let fltdp = 0;
    let fltphp = 0;

    const noise_buffer = Array(32)
      .fill(0)
      .map(() => Math.random() * 2 - 1);

    let envelopeStage = 0;
    let envelopeElapsed = 0;

    let vibratoPhase = 0;

    let phase = 0;
    let ipp = 0;
    const flanger_buffer = Array(1024).fill(0);

    let num_clipped = 0;

    const buffer = [];
    const normalized = [];

    let sample_sum = 0;
    let num_summed = 0;
    const summands = Math.floor(44100 / this.sampleRate);

    for (let t = 0; ; ++t) {
      if (this.repeatTime !== 0 && ++this.elapsedSinceRepeat >= this.repeatTime)
        this.initForRepeat();

      if (this.arpeggioTime !== 0 && t >= this.arpeggioTime) {
        this.arpeggioTime = 0;
        this.period *= this.arpeggioMultiplier;
      }

      this.periodMult += this.periodMultSlide;
      this.period *= this.periodMult;
      if (this.period > this.periodMax) {
        this.period = this.periodMax;
        if (this.enableFrequencyCutoff) break;
      }

      let rfperiod = this.period;
      if (this.vibratoAmplitude > 0) {
        vibratoPhase += this.vibratoSpeed;
        rfperiod =
          this.period * (1 + Math.sin(vibratoPhase) * this.vibratoAmplitude);
      }
      let iperiod = Math.floor(rfperiod);
      if (iperiod < OVERSAMPLING) iperiod = OVERSAMPLING;

      this.dutyCycle += this.dutyCycleSlide;
      if (this.dutyCycle < 0) this.dutyCycle = 0;
      if (this.dutyCycle > 0.5) this.dutyCycle = 0.5;

      if (++envelopeElapsed > this.envelopeLength[envelopeStage]) {
        envelopeElapsed = 0;
        if (++envelopeStage > 2) break;
      }
      let env_vol;
      const envf = envelopeElapsed / this.envelopeLength[envelopeStage];
      if (envelopeStage === 0) {
        env_vol = envf;
      } else if (envelopeStage === 1) {
        env_vol = 1 + (1 - envf) * 2 * this.envelopePunch;
      } else {
        env_vol = 1 - envf;
      }

      this.flangerOffset += this.flangerOffsetSlide;
      let iphase = Math.abs(Math.floor(this.flangerOffset));
      if (iphase > 1023) iphase = 1023;

      if (this.flthp_d !== 0) {
        this.flthp *= this.flthp_d;
        if (this.flthp < 0.00001) this.flthp = 0.00001;
        if (this.flthp > 0.1) this.flthp = 0.1;
      }

      let sample = 0;
      for (let si = 0; si < OVERSAMPLING; ++si) {
        let sub_sample = 0;
        phase++;
        if (phase >= iperiod) {
          phase %= iperiod;
          if (this.waveShape === NOISE)
            for (let i = 0; i < 32; ++i)
              noise_buffer[i] = Math.random() * 2 - 1;
        }

        const fp = phase / iperiod;
        if (this.waveShape === SQUARE) {
          sub_sample = fp < this.dutyCycle ? 0.5 : -0.5;
        } else if (this.waveShape === SAWTOOTH) {
          sub_sample =
            fp < this.dutyCycle
              ? -1 + (2 * fp) / this.dutyCycle
              : 1 - (2 * (fp - this.dutyCycle)) / (1 - this.dutyCycle);
        } else if (this.waveShape === SINE) {
          sub_sample = Math.sin(fp * 2 * Math.PI);
        } else if (this.waveShape === NOISE) {
          sub_sample = noise_buffer[Math.floor((phase * 32) / iperiod)];
        } else {
          throw new Error("ERROR: Bad wave type: " + this.waveShape);
        }

        const pp = fltp;
        this.fltw *= this.fltw_d;
        if (this.fltw < 0) this.fltw = 0;
        if (this.fltw > 0.1) this.fltw = 0.1;
        if (this.enableLowPassFilter) {
          fltdp += (sub_sample - fltp) * this.fltw;
          fltdp -= fltdp * this.fltdmp;
        } else {
          fltp = sub_sample;
          fltdp = 0;
        }
        fltp += fltdp;

        fltphp += fltp - pp;
        fltphp -= fltphp * this.flthp;
        sub_sample = fltphp;

        flanger_buffer[ipp & 1023] = sub_sample;
        sub_sample += flanger_buffer[(ipp - iphase + 1024) & 1023];
        ipp = (ipp + 1) & 1023;

        sample += sub_sample * env_vol;
      }

      sample_sum += sample;
      if (++num_summed >= summands) {
        num_summed = 0;
        sample = sample_sum / summands;
        sample_sum = 0;
      } else {
        continue;
      }

      sample = (sample / OVERSAMPLING) * masterVolume;
      sample *= this.gain;

      normalized.push(sample);

      if (this.bitsPerChannel === 8) {
        sample = Math.floor((sample + 1) * 128);
        if (sample > 255) {
          sample = 255;
          ++num_clipped;
        } else if (sample < 0) {
          sample = 0;
          ++num_clipped;
        }
        buffer.push(sample);
      } else {
        sample = Math.floor(sample * (1 << 15));
        if (sample >= 1 << 15) {
          sample = (1 << 15) - 1;
          ++num_clipped;
        } else if (sample < -(1 << 15)) {
          sample = -(1 << 15);
          ++num_clipped;
        }
        buffer.push(sample & 0xff);
        buffer.push((sample >> 8) & 0xff);
      }
    }

    return {
      buffer,
      normalized,
      clipped: num_clipped,
    };
  }

  generate() {
    const rendered = this.getRawBuffer();
    const wave = new RIFFWAVE();
    wave.header.sampleRate = this.sampleRate;
    wave.header.bitsPerSample = this.bitsPerChannel;
    wave.Make(rendered.buffer);
    wave.clipping = rendered.clipped;
    wave.buffer = rendered.normalized;

    // @ts-ignore
    wave.getAudio = _sfxr_getAudioFn(wave);
    return wave;
  }
}

let _actx: AudioContext | null = null;

const _sfxr_getAudioFn =
  (wave: {
    dataURI: string;
    buffer: Float32Array;
    header: { sampleRate: number };
  }) =>
  () => {
    let actx = null;

    if (!_actx) {
      if ("AudioContext" in window) {
        _actx = new AudioContext();
      }
    }

    actx = _actx;

    if (actx) {
      const buff = actx.createBuffer(
        1,
        wave.buffer ? wave.buffer.length : 0,
        wave.header?.sampleRate || 44100
      );
      const nowBuffering = buff.getChannelData(0);
      for (let i = 0; i < wave.buffer.length; i++) {
        nowBuffering[i] = wave.buffer[i];
      }
      let volume = 1.0;

      const obj = {
        channels: [] as AudioBufferSourceNode[],

        setVolume: function (v: number) {
          volume = v;
          return obj;
        },
        play: function () {
          const proc = actx.createBufferSource();
          proc.buffer = buff;
          const gainNode = actx.createGain();
          gainNode.gain.value = volume;
          gainNode.connect(actx.destination);
          proc.connect(gainNode);

          if (proc["start"]) {
            proc.start();
          }

          this.channels.push(proc);
          return proc;
        },
      };

      return obj;
    } else {
      const audio = new Audio();
      audio.src = wave.dataURI;
      return audio;
    }
  };
