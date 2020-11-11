import { Utils } from './Utils.js';

export class Game extends Utils {
  constructor() {
    super()
    this.timerId = null;
    this.active = false;
  }
  releaseLoop(score, balloon) {
    if (score.pointsList.length === 0) {
      clearTimeout(this.timerId);
      return;
    }
    balloon.cloneOne();
    const duration = this.getRandomNumber(1, 15) * 100;
    this.timerId = setTimeout(this.releaseLoop(score, balloon), duration);
  }
  cleanUpLoop() {
    this.$$('.container > div').forEach(item => {
      let state = getComputedStyle(item.firstElementChild).getPropertyValue('--state');
      state = Number(state.trim());
      if (item.getBoundingClientRect().top <= 0 || !state) {
        this.$('.container').removeChild(item);
      }
    });
    setTimeout(this.cleanUpLoop, 1);
  }
}

// let count = 10;
// let timerId = null;

// function loop(a, b) {
//   if (count == 0) {
//     clearTimeout(timerId);
//     return;
//   }
//   count--;
//   console.log(count, a, b);
//   timerId = setTimeout(loop(a, b), 100);
// }

// loop('x', 'y');