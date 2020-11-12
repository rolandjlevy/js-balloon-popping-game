import { Utils } from './Utils.js';

export class Game extends Utils {
  constructor() {
    super();
  }
  addEventHooks(score, balloon) {
    score.init();
    this.removed = [];
    this.added = [];
    this.releaseTimerId = null;
    this.cleanupTimerId = null;
    this.$('.btn.play').addEventListener('click', (e) => {
      this.$('.btn.play').classList.add('disabled');
      this.$('.container').classList.add('active');
      this.releaseLoop(score, balloon);
      this.cleanupLoop(score);
    });
    this.$('.btn.reset').addEventListener('click', (e) => {
      console.log('added: ', this.added.sort());
      console.log('removed: ', this.removed.sort());
      this.$('.btn.play').classList.remove('disabled');
      this.$('.container').classList.remove('active');
      this.clearTimerIds();
      this.$('.container').innerHTML = '';
      score.init();
      this.removed = [];
      this.added = [];
    });
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
  cleanupLoop(score) {
    this.$$('.container > div').forEach(item => {
      let popState = getComputedStyle(item.firstElementChild).getPropertyValue('--pop-state');
      popState = Number(popState.trim());
      let lifeState = getComputedStyle(item).getPropertyValue('--life-state');
      lifeState = Number(lifeState.trim());
      // console.log({lifeState, points:item.dataset.points});
      // const containerTop = this.$('.container').getBoundingClientRect().top - window.scrollY;
      // const balloonTop = item.getBoundingClientRect().top - window.scrollY;
      // const getBoundingClientRect = document.body.getBoundingClientRect().top;
      // if (item.getBoundingClientRect().top <= 200 || !popState) {

      if (!lifeState && popState) {
        score.missed += Number(item.dataset.points);
        this.$('.points-missed').textContent = score.missed;
      }
      if (!lifeState || !popState) {
        this.removed.push(item.id);
        this.$('.container').removeChild(item);
      }
    });
    this.cleanupTimerId = setTimeout(() => this.cleanupLoop(score), 1);
  }
  clearTimerIds() {
    let id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
}