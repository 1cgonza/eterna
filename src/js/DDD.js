import Eterna from './Eterna';
import Mandala from './Mandala';
import Pulse from './Pulse';
import Meta from './Meta';
import Music from './Music';

export default class DDD {
  constructor(socket) {
    this.socket = socket;
    this.landing = document.getElementById('landing');
    this.stage = document.getElementById('stage');
    this.about = document.getElementById('about');
    this.aboutOpen = false;
    this.about.addEventListener('click', this.checkAbout);
    this.terms = document.getElementById('terms');
    this.eterna = new Eterna();
    this.mandala = new Mandala();
    this.pulse = new Pulse();
    this.meta = new Meta();
    this.music = new Music();
    this.checkLoader();
    this.socket.once('tracking', this.showTerms);
  }

  checkAbout = () => {
    if (this.aboutOpen) {
      this.about.innerHTML = '?';
      this.aboutOpen = false;
      this.landing.style.opacity = 0;
    } else {
      this.about.innerHTML = 'x';
      this.landing.style.opacity = 0.9;
      this.aboutOpen = true;
    }
  };

  checkLoader = () => {
    if (this.music.loaded && this.eterna.loaded) {
      this.start_time = Date.now();
      this.socket.on('new tweet', this.newTweet);
    } else {
      requestAnimationFrame(this.checkLoader);
    }
  };

  newTweet = tweet => {
    this.tweet = JSON.parse(tweet);
    /*==========  SUNDIAL  ==========*/
    this.sundial();
    /*==========  PULSE LINE  ==========*/
    const timelineX = ((this.tweet.timestamp - this.start_time) / 1000) | 0;
    this.pulse.update(timelineX, this.tweet.sentiment.score);
    /*==========  META BOX  ==========*/
    this.meta.clearBoxes();
    this.meta.append_text(this.tweet);
  };

  showTerms = res => {
    const terms = res.split(',');

    terms.forEach(name => {
      const link = document.createElement('a');
      const term = document.createTextNode(name);
      link.appendChild(term);
      link.href = `https://twitter.com/search?q=${name}`;
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
      this.terms.appendChild(link);
    });
  };

  sundial() {
    const date = new Date(Number(this.tweet.timestamp));
    const i = (date.getSeconds() / 4) | 0;
    let cleanScore;

    if (this.tweet.sentiment.score > 8) {
      cleanScore = 8;
    } else if (this.tweet.sentiment.score < -7) {
      cleanScore = -7;
    } else {
      cleanScore = this.tweet.sentiment.score;
    }

    this.mandala.update(cleanScore, i);
    this.eterna.update(cleanScore, i);
    /*==========  MUSIC  ==========*/
    if (!this.aboutOpen) {
      this.music.newMsg(cleanScore);
    }
  }
}
