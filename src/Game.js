import { Utils } from './Utils.js';

export class Game extends Utils {
  constructor() {
    super();
  }
  cleanupLoop(score) {
    // this.$$('.container > div').forEach(div => {
    //   const item = this.$(`div[id="${div.id}"]`) || null;
    //   if (item) {
    //     let poppedState = getComputedStyle(item.firstElementChild).getPropertyValue('--popped-state');
    //     poppedState = Number(poppedState.trim());
    //     let endState = getComputedStyle(item).getPropertyValue('--end-state');
    //     endState = Number(endState.trim());
    //     let balloonAnimationState = getComputedStyle(item.firstElementChild).getPropertyValue('--parent-animation-state');
    //     item.style.setProperty('animation-play-state', balloonAnimationState.trim());
    //     if (endState) {
    //       score.missed += Number(item.dataset.points);
    //       this.$('.points-missed').textContent = score.missed;
    //       this.removed.push(item.id);
    //       this.$('.container').removeChild(item);
    //     }
    //     if (poppedState) {
    //     // if (item.firstElementChild.dataset.popped) {
    //       console.log('popped: ', item.firstElementChild.dataset.popped)
    //       this.removed.push(item.id);
    //       item.style.setProperty('animation-play-state', 'paused');
    //       // this.$('.container').removeChild(item);
    //     }
    //   }
    // });
    // this.cleanupTimerId = setTimeout(() => this.cleanupLoop(score), 1);
  }
  releaseLoop(score, balloon) {
    // if (score.pointsList.length === 0) {
      // this.clearTimerIds();
      // clearTimeout(this.releaseTimerId);
      // this.$('.btn.play').classList.remove('disabled');
      // return;
    //} else {
      balloon.cloneOne();
      const duration = this.getRandomNumber(1, 15) * 100;
      this.releaseTimerId = setTimeout(() => this.releaseLoop(score, balloon), duration);
    // }
  }
  addEventHooks(score, balloon) {
    score.init();
    this.releaseTimerId = null;
    this.$('.btn.play').addEventListener('click', (e) => {
      this.$('.btn.play').classList.add('disabled');
      this.$('.container').classList.add('active');
      this.releaseLoop(score, balloon);
      // this.cleanupLoop(score);
    });
    this.$('.btn.reset').addEventListener('click', (e) => {
      this.$('.btn.play').classList.remove('disabled');
      this.$('.container').classList.remove('active');
      this.clearTimerIds();
      this.$('.container').innerHTML = '';
      score.init();
    });
  }
  clearTimerIds() {
    let id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
}