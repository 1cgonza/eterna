export const frameRate = 4;

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getColorLuma(hex) {
  let rgb = parseInt(hex, 16);
  const red = (rgb >> 16) & 0xff;
  const green = (rgb >> 8) & 0xff;
  const blue = (rgb >> 0) & 0xff;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export class SpriteOptions {
  constructor(width, height, columns, rows, fZeroX, offX) {
    this.frameW = width / columns;
    this.frameH = height / rows;
    this.endX = frameRate * columns;
    this.endY = frameRate * rows;
    this.x = 0;
    this.y = 0;
    this.fZeroX = this.frameW * fZeroX;
    this.offX = offX;
  }
}

/*====================================
=            MUSIC LOADER            =
====================================*/
export class BufferLoader {
  constructor(ctx, urlList, callback, i) {
    this.ctx = ctx;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
    this.i = i;
  }

  loadBuffer(url, index) {
    // Load buffer asynchronously
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      // Asynchronously decode the audio file data in request.response
      this.ctx.decodeAudioData(
        request.response,
        buffer => {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          this.bufferList[index] = buffer;

          if (++this.loadCount == this.urlList.length) {
            this.onload(this.bufferList, this.i);
          }
        },
        error => {
          console.error('decodeAudioData error', error);
        }
      );
    };
    request.onerror = () => {
      alert('BufferLoader: XHR error');
    };
    request.send();
  }

  load() {
    this.urlList.forEach((url, i) => this.loadBuffer(url, i));
  }
}

/*-----  End of MUSIC LOADER  ------*/
