import { Utils } from './Utils.js';

export class Game extends Utils {
  constructor() {
    super();
    this.$('#year').textContent = new Date().getFullYear();
  }
  addEventHooks(score, balloon, sound) {
    score.init();
    this.releaseTimerId = null;
    this.$('.btn.play').addEventListener('click', (e) => {
      this.$('.btn.play').classList.add('disabled');
      this.$('.container').classList.add('active');
      this.releaseLoop(score, balloon);
    });
    this.$('.btn.reset').addEventListener('click', (e) => {
      this.$('.btn.play').classList.remove('disabled');
      this.$('.container').classList.remove('active');
      this.clearTimerIds();
      this.$('.container').innerHTML = '';
      score.init();
    });
    this.$('.btn.sound').addEventListener('click', (e) => {
      this.$('.btn.sound').classList.toggle('off');
      sound.state = !sound.state;
    });
  }
  releaseLoop(score, balloon) {
    balloon.cloneOne();
    const duration = this.getRandomNumber(1, 15) * 100;
    this.releaseTimerId = setTimeout(() => this.releaseLoop(score, balloon), duration);
  }
  clearTimerIds() {
    let id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
}