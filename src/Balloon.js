import { Utils } from './Utils.js';

export class Balloon extends Utils {
  constructor(score, sound, game) {
    super();
    this.score = score;
    this.sound = sound;
    this.game = game;
    this.popEvent = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
  }
  async cloneOne() {
    await this.delay(1000);
    if (this.score.pointsList.length <= 0) return;
    const clone = this.$('.balloon').cloneNode(true);
    clone.addEventListener(this.popEvent, (e) => {
      clone.firstElementChild.style.animationPlayState = 'running';
      clone.style.animationPlayState = 'paused';
      this.score.points += Number(clone.dataset.points);
      this.$('.points.display').textContent = this.score.points;
      this.sound.init('pop.mp3');
    });
    const points = this.score.pointsList.pop();
    clone.id = Math.round(Math.random() * 100000);
    this.game.added.push(clone.id);
    this.$('.released.display').textContent = this.score.pointsList.length;
    clone.firstElementChild.textContent = points;
    clone.setAttribute('data-points', points);
    clone.style.setProperty('--points', points);
    clone.style.display = 'initial';
    const endPosX = `${this.getRandomNumber(0, 320)}px`
    clone.style.setProperty('--end-pos-x', endPosX);
    const startPosX = `${this.getRandomNumber(0, 320)}px`;
    clone.style.setProperty('--start-pos-x', startPosX);
    const rotation = `${this.getRandomNumber(-60, 60)}deg`;
    clone.style.setProperty('--rotation', rotation);
    clone.style.animationPlayState = 'running';
    this.$('.container').appendChild(clone);
  }
}