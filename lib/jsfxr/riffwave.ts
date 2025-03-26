class FastBase64 {
  static chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  static encLookup: string[] = [];

  static Init() {
    for (let i = 0; i < 4096; i++) {
      this.encLookup[i] = this.chars[i >> 6] + this.chars[i & 0x3f];
    }
  }

  static Encode(src: number[]) {
    let len = src.length;
    let dst = "";
    let i = 0;

    while (len > 2) {
      const n = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
      dst += this.encLookup[n >> 12] + this.encLookup[n & 0xfff];
      len -= 3;
      i += 3;
    }

    if (len > 0) {
      const n1 = (src[i] & 0xfc) >> 2;
      let n2 = (src[i] & 0x03) << 4;

      if (len > 1) n2 |= (src[++i] & 0xf0) >> 4;

      dst += this.chars[n1];
      dst += this.chars[n2];

      if (len == 2) {
        let n3 = (src[i++] & 0x0f) << 2;
        n3 |= (src[i] & 0xc0) >> 6;
        dst += this.chars[n3];
      }

      if (len == 1) dst += "=";
      dst += "=";
    }
    return dst;
  }
}

FastBase64.Init();

class RIFFWAVE {
  getAudio() {
    return new Audio(this.dataURI);
  }

  data: number[];
  wav: number[];
  dataURI: string;
  header: {
    chunkId: number[];
    chunkSize: number;
    format: number[];
    subChunk1Id: number[];
    subChunk1Size: number;
    audioFormat: number;
    numChannels: number;
    sampleRate: number;
    byteRate: number;
    blockAlign: number;
    bitsPerSample: number;
    subChunk2Id: number[];
    subChunk2Size: number;
  };
  clipping: number;
  buffer: number[];

  constructor(data?: number[]) {
    this.data = [];
    this.wav = [];
    this.dataURI = "";
    this.clipping = 0;
    this.buffer = [];

    this.header = {
      chunkId: [0x52, 0x49, 0x46, 0x46],
      chunkSize: 0,
      format: [0x57, 0x41, 0x56, 0x45],
      subChunk1Id: [0x66, 0x6d, 0x74, 0x20],
      subChunk1Size: 16,
      audioFormat: 1,
      numChannels: 1,
      sampleRate: 8000,
      byteRate: 0,
      blockAlign: 0,
      bitsPerSample: 8,
      subChunk2Id: [0x64, 0x61, 0x74, 0x61],
      subChunk2Size: 0,
    };

    if (data instanceof Array) {
      this.Make(data);
    }
  }

  static u32ToArray(i: number) {
    return [i & 0xff, (i >> 8) & 0xff, (i >> 16) & 0xff, (i >> 24) & 0xff];
  }

  static u16ToArray(i: number) {
    return [i & 0xff, (i >> 8) & 0xff];
  }

  Make(data: number[]) {
    if (data instanceof Array) this.data = data;
    this.header.byteRate =
      (this.header.sampleRate *
        this.header.numChannels *
        this.header.bitsPerSample) >>
      3;
    this.header.blockAlign =
      (this.header.numChannels * this.header.bitsPerSample) >> 3;
    this.header.subChunk2Size = this.data.length;
    this.header.chunkSize = 36 + this.header.subChunk2Size;

    this.wav = this.header.chunkId.concat(
      RIFFWAVE.u32ToArray(this.header.chunkSize),
      this.header.format,
      this.header.subChunk1Id,
      RIFFWAVE.u32ToArray(this.header.subChunk1Size),
      RIFFWAVE.u16ToArray(this.header.audioFormat),
      RIFFWAVE.u16ToArray(this.header.numChannels),
      RIFFWAVE.u32ToArray(this.header.sampleRate),
      RIFFWAVE.u32ToArray(this.header.byteRate),
      RIFFWAVE.u16ToArray(this.header.blockAlign),
      RIFFWAVE.u16ToArray(this.header.bitsPerSample),
      this.header.subChunk2Id,
      RIFFWAVE.u32ToArray(this.header.subChunk2Size),
      this.data
    );
    this.dataURI = "data:audio/wav;base64," + FastBase64.Encode(this.wav);
  }
}

export default RIFFWAVE;
