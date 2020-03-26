import { BufferLoader, getRandom } from './utils';
import { audios } from './assets';

export default class Music {
  constructor() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.loaded = false;
    this.ctx = new AudioContext();
    this.groups = 5;
    this.counter = 0;
    this.buffers = [];
    this.setBuffers();
  }

  setBuffers() {
    let i = 0;

    while (i < this.groups) {
      new BufferLoader(this.ctx, audios[i], this.finishedLoading, i).load();
      i++;
    }
  }

  newMsg(score) {
    if (this.loaded) {
      let i;
      if (score >= -7 && score < -4) i = 0;
      else if (score >= -4 && score < 0) i = 1;
      else if (score >= 0 && score < 3) i = 2;
      else if (score >= 3 && score < 6) i = 3;
      else if (score >= 6 && score < 9) i = 4;

      const randomI = getRandom(0, audios[i].length);
      const source = this.createSource(this.buffers[i][randomI]);
      source.start(0);
    }
  }

  createSource(buffer) {
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(this.ctx.destination);
    return src;
  }

  finishedLoading = (buffers, i) => {
    this.counter++;
    this.buffers[i] = buffers;
    if (this.counter === audios.length) {
      this.loaded = true;
    }
  };
}
