import { Utils } from './Utils.js';

export class Game extends Utils {
  constructor() {
    super();
    this.timerId = null;
  }
  addEventHook(score, balloon) {
    this.$('.btn').addEventListener('click', (e) => {
      score.init();
      this.releaseLoop(score, balloon);
      this.cleanUpLoop(score);
      this.$('.btn').classList.add('disabled')
    });
  }
  releaseLoop(score, balloon) {
    if (score.pointsList.length === 0) {
      clearTimeout(this.timerId);
      this.$('.btn').classList.remove('disabled');
      return;
    }
    balloon.cloneOne();
    const duration = this.getRandomNumber(1, 15) * 100;
    this.timerId = setTimeout(() => this.releaseLoop(score, balloon), duration);
  }
  cleanUpLoop(score) {
    this.$$('.container > div').forEach(item => {
      let state = getComputedStyle(item.firstElementChild).getPropertyValue('--state');
      state = Number(state.trim());
      if (item.getBoundingClientRect().top <= 130 || !state) {
        if (state) {
          score.missed += Number(item.id);
          this.$('.points-missed').textContent = score.missed;
        }
        this.$('.container').removeChild(item);
      }
    });
    setTimeout(() => this.cleanUpLoop(score), 1);
  }
}