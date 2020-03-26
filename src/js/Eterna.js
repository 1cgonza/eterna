import Dream from './Dream';
import { SpriteOptions } from './utils';

export default class Eterna {
  constructor() {
    /*==========  GENERAL SETTINGS  ==========*/
    const main = document.getElementById('main');
    const mask = document.getElementById('mask');
    const size = window.innerHeight - 120;
    this.canvas = document.getElementById('eterna');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.canvas.height = size;
    this.loaded = false;
    this.img1Check = false;
    const s = `${size}px`;
    main.style.width = s;
    main.style.height = s;
    mask.style.width = s;
    mask.style.height = s;
    /*==========  LOAD SPRITES  ==========*/
    this.loaded = false;
    this.sprite = new Image();
    this.sprite.onload = this.spriteLoad;
    this.sprite.src = './images/eter0.jpg';
    /*==========  RENDER SETIINGS  ==========*/
    this.ctx.globalCompositeOperation = 'darken';
    this.ctx.fillStyle = 'rgba(255,255,255, 0.1)';
  }

  spriteLoad = () => {
    this.spriteParams = new SpriteOptions(
      6030, // sprite width
      4800, // sprite height
      16, // columns
      12, // rows
      7, // frame 0 on X
      34 // Offset X
    );
    this.loaded = true;
  };

  update(score, i, state) {
    const { frameW, frameH, fZeroX } = this.spriteParams;
    if (this.loaded) {
      new Dream(this.sprite, this.ctx, score, i, frameW, frameH, fZeroX, state);
    }
  }
}
