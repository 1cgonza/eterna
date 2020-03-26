import { getRandom, frameRate } from './utils';

export default class Dream {
  constructor(img, ctx, score, i, w, h, fZeroX, state) {
    this.img = img;
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.x = score * w + fZeroX;
    this.y = 12;
    this.nextFrame = frameRate;
    this.end = 13 * frameRate;
    this.counter = 0;
    this.posX = getRandom(w, this.ctx.canvas.width - w * 2);
    this.posY = getRandom(0, this.ctx.canvas.height - h);
    this.speed = getRandom(1, 5);
    if (i === 0) {
      this.movX = 0;
      this.movY = -5;
    } else if (i === 1) {
      this.movX = 3;
      this.movY = -5;
    } else if (i === 2) {
      this.movX = 5;
      this.movY = -5;
    } else if (i === 3) {
      this.movX = 5;
      this.movY = -3;
    } else if (i === 4) {
      this.movX = 5;
      this.movY = 1;
    } else if (i === 5) {
      this.movX = 5;
      this.movY = 3;
    } else if (i === 6) {
      this.movX = 5;
      this.movY = 5;
    } else if (i === 7) {
      this.movX = 3;
      this.movY = 5;
    } else if (i === 8) {
      this.movX = -3;
      this.movY = 5;
    } else if (i === 9) {
      this.movX = -5;
      this.movY = 5;
    } else if (i === 10) {
      this.movX = -5;
      this.movY = 3;
    } else if (i === 11) {
      this.movX = -5;
      this.movY = 1;
    } else if (i === 12) {
      this.movX = -5;
      this.movY = -3;
    } else if (i === 13) {
      this.movX = -5;
      this.movY = -5;
    } else if (i === 14) {
      this.movX = -3;
      this.movY = -5;
    }
    this.animate();
  }

  animate = () => {
    if (this.counter <= this.end) {
      if (this.counter === this.nextFrame) {
        this.draw();
        this.nextFrame += frameRate;
        this.y--;
        this.posX += this.movX * this.speed;
        this.posY += this.movY * this.speed;
      }
      this.counter++;
      requestAnimationFrame(this.animate);
    }
  };

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(this.posX, this.posY, this.w, this.h);
    ctx.restore();
    ctx.drawImage(this.img, this.x, this.y * this.h, this.w, this.h, this.posX, this.posY, this.w, this.h);
  }
}
