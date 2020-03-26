export default class Mandala {
  constructor() {
    this.canvas = document.getElementById('mandala');
    this.canvasB = document.getElementById('template');
    this.ctx = this.canvas.getContext('2d');
    this.ctxB = this.canvasB.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 120;
    this.canvasB.width = this.canvas.width;
    this.canvasB.height = this.canvas.height;
    this.centerX = (this.canvas.width / 1.4) | 0;
    this.centerY = (this.canvas.height / 3.5) | 0;
    this.views = 15;
    this.radius = 105;
    this.nodes = 30;
    this.nodeR = 2;
    this.distance = 5;
    this.heartR = 20;
    this.ctx.font = `${this.heartR}px Inconsolata`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctxB.globalAlpha = 0.3;
    this.ctxB.strokeStyle = '#FFF';
    this.ctx.strokeStyle = '#FFF';
    this.resetViz();
  }

  drawBase() {
    const TWO_PI = Math.PI * 2;
    const ctx = this.ctxB;

    for (let i = 0; i <= this.views - 1; i++) {
      const r = (i * Math.PI) / 7.5;
      ctx.save();
      ctx.translate(this.centerX, this.centerY);
      /**
       * Canvas acts funky when drawing on pixels with floating points as coordinates.
       * Adding a little to the rotation fixes some opacity weirdness.
       **/
      ctx.rotate(r + 0.02);

      for (let j = 1; j <= this.nodes; j++) {
        ctx.beginPath();
        ctx.arc(0, -this.distance * j - this.heartR, this.nodeR, 0, TWO_PI);

        if (j < this.nodes) {
          ctx.moveTo(0, -this.nodeR - this.distance * j - this.heartR);
          ctx.lineTo(0, -this.distance * j - this.distance - this.heartR + this.nodeR);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  update(score, i) {
    this.score = score;
    this.counter[i]++;
    if (this.counter[i] >= this.radius) {
      this.resetViz();
    } else {
      this.size = this.counter[i];
      this.scale = this.size * 1.5;
      this.push = this.score * 3;
      this.r = (i * Math.PI) / 7.5;
      this.draw();
    }
  }

  draw() {
    const ctx = this.ctx;
    this.updateScore();
    ctx.save();
    ctx.translate(this.centerX, this.centerY);
    ctx.rotate(this.r + 0.02);
    ctx.beginPath();
    ctx.arc(0, -this.distance * this.size - this.heartR, this.nodeR, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }

  updateScore() {
    const ctx = this.ctx;
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.nodeR * 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.fillText(this.score, this.centerX, this.centerY);
  }

  resetViz() {
    this.counter = [];
    for (let i = 0; i < 15; i++) {
      this.counter.push(0);
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
