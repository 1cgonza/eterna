export default class Pulse {
  constructor() {
    this.canvas = document.getElementById('pulse');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = 60;
  }

  update(x, score) {
    const color = score > 0 ? '#116fbf' : '#b11111';
    this.ctx.beginPath();
    this.ctx.moveTo(x - 1.5, 30);
    this.ctx.lineTo(x + 0.5, 30 - score * 2);
    this.ctx.lineTo(x + 1.5, 30);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}
