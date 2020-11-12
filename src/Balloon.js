import { Utils } from './Utils.js';

export class Balloon extends Utils {
  constructor(score, sound) {
    super();
    this.score = score;
    this.sound = sound;
    this.popEvent = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
  }
  async cloneOne() {
    await this.delay(1000);
    if (this.score.pointsList.length <= 0) return;
    const clone = this.$('.balloon').cloneNode(true);
    this.popped = false;
    clone.addEventListener(this.popEvent, (e) => {
      clone.firstElementChild.style.animationPlayState = 'running';
      clone.style.animationPlayState = 'paused';
      // if (!this.popped) {
        this.score.points += Number(clone.id);
        this.$('.points.display').textContent = this.score.points;
        this.sound.init('pop.mp3');
        this.popped = true;
      // }
    });
    const p = this.score.pointsList.pop();
    this.$('.released.display').textContent = this.score.pointsList.length;
    clone.firstElementChild.textContent = p;
    clone.id = p;
    clone.style.setProperty('--points', p);
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