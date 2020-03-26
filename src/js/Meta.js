import { getColorLuma } from './utils';

export default class Meta {
  constructor() {
    this.container = document.getElementById('text-container');
    this.scoreC = document.getElementById('score');
    this.msgC = document.getElementById('msg');
    this.timeC = document.getElementById('time');
    this.userC = document.getElementById('user');
    this.locationC = document.getElementById('location');
    // this.weatherC  = document.getElementById('weather');
    this.container.style.width = `${window.innerWidth / 3}px`;
    this.container.style.height = `${window.innerHeight / 2 - 60}px`;
  }

  update(color) {
    const luma = getColorLuma(color);

    if (luma < 80) {
      this.container.style.color = 'white';
    } else {
      this.container.style.color = 'black';
    }
    this.container.style.backgroundColor = `#${color}`;
  }

  clearBoxes() {
    this.scoreC.innerHTML = '';
    this.msgC.innerHTML = '';
    this.timeC.innerHTML = '';
    this.userC.innerHTML = '';
    this.locationC.innerHTML = '';
    // this.weatherC.innerHTML  = '';
  }

  append_text(tweet) {
    const date = new Date(Number(tweet.timestamp));
    this.scoreC.appendChild(document.createTextNode(tweet.sentiment.score));
    this.msgC.appendChild(document.createTextNode(tweet.text));
    this.timeC.appendChild(document.createTextNode(date));
    this.userC.appendChild(document.createTextNode(tweet.user));
    this.locationC.appendChild(document.createTextNode(tweet.location));
    // if (weather !== 'error') {
    //   const forecast = weatherCodes.conditions[tweet.weather.condition_id];
    //   this.weatherC.appendChild( document.createTextNode(forecast) );
    // }
  }
}
