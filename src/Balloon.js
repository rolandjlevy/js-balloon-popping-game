import { Utils } from './Utils.js';

export class Balloon extends Utils {
  constructor(score, sound, game) {
    super();
    this.score = score;
    this.sound = sound;
    this.game = game;
    this.popEvent = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
    this.cleanupTimerId = null;
  }
  async cloneOne() {
    await this.delay(1000);
    if (this.score.pointsList.length <= 0) return;
    this.clone = this.$('.balloon').cloneNode(true);
    this.clone.id = Math.round(Math.random() * 100000);
    this.clone.firstElementChild.style.animationPlayState = 'paused';
    this.addPopEvent();
    this.setPoints();
    this.setPosition();
    this.$('.container').appendChild(this.clone);
    this.addCleanupEvents();
    this.popped = false;
  }
  addCleanupEvents() {
    this.clone.addEventListener('animationend', (e) => {
      if (!this.popped) {
        this.score.missed += Number(e.target.dataset.points);
        this.$('.points-missed').textContent = this.score.missed;
        this.$('.container').removeChild(e.target);
      }
    });
    this.clone.firstElementChild.addEventListener('animationend', (e) => {
      this.popped = true;
      this.$('.container').removeChild(e.target.parentNode);
    });
  }
  setPoints() {
    const points = this.score.pointsList.pop();
    this.clone.firstElementChild.textContent = points;
    this.clone.setAttribute('data-points', points);
    this.clone.style.setProperty('--points', points);
    this.$('.released.display').textContent = this.score.pointsList.length;
  }
  setPosition() {
    const endPosX = `${this.getRandomNumber(0, 320)}px`
    this.clone.style.setProperty('--end-pos-x', endPosX);
    const startPosX = `${this.getRandomNumber(0, 320)}px`;
    this.clone.style.setProperty('--start-pos-x', startPosX);
    const rotation = `${this.getRandomNumber(-60, 60)}deg`;
    this.clone.style.setProperty('--rotation', rotation);
    this.clone.style.display = 'initial';
    this.clone.style.animationPlayState = 'running';
  }
  addPopEvent() {
    this.clone.firstElementChild.addEventListener(this.popEvent, (e) => {
      const clone = e.target;
      clone.style.animationPlayState = 'running';
      clone.parentNode.style.animationPlayState = 'paused';
      this.score.points += Number(clone.parentNode.dataset.points);
      this.$('.points.display').textContent = this.score.points;
      this.sound.init('pop.mp3');
    });
  }
}