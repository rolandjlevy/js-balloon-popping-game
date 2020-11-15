import { Utils } from './Utils.js';

export class Balloon extends Utils {
  constructor(score, sound, game) {
    super();
    this.score = score;
    this.sound = sound;
    this.game = game;
    this.event = this.getEvents();
  }
  async cloneOne() {
    await this.delay(1000);
    if (this.score.pointsList.length <= 0) return;
    this.clone = this.$('.balloon').cloneNode(true);
    this.clone.id = Math.round(Math.random() * 100000);
    this.clone.firstElementChild.style.animationPlayState = 'paused';
    this.handleClickEvent();
    this.setPoints();
    this.setPosition();
    this.handleAnimateEvents();
    this.$('.container').appendChild(this.clone);
  }
  handleAnimateEvents() {
    this.clone.addEventListener(this.event.animate, (e) => {
      const balloonExists = e.target.id || false;
      if (balloonExists) {
        this.score.missed += Number(e.target.dataset.points);
        this.$('.points-missed').textContent = this.score.missed;
        this.$('.container').removeChild(e.target);
      }
    });
    this.clone.firstElementChild.addEventListener(this.event.animate, (e) => {
        this.$('.container').removeChild(e.target.parentNode);
    });
  }
  handleClickEvent() {
    this.popped = false;
    this.clone.firstElementChild.addEventListener(this.event.click, (e) => {
      if (!this.popped) {
        const clone = e.target;
        clone.style.animationPlayState = 'running';
        clone.parentNode.style.animationPlayState = 'paused';
        this.score.points += Number(clone.parentNode.dataset.points);
        this.$('.points.display').textContent = this.score.points;
        this.sound.init('pop.mp3');
        this.popped = true;
      }
    });
  }
  setPoints() {
    const points = this.score.pointsList.pop();
    this.clone.firstElementChild.textContent = points;
    this.clone.setAttribute('data-points', points);
    this.clone.style.setProperty('--points', points);
    this.$('.released.display').textContent = this.score.pointsList.length;
    this.checkForBonus(points);
  }
  checkForBonus(points) {
    if (points == this.score.bonusPoint) {
      this.clone.classList.add('bonus');
      this.clone.style.setProperty('--bonus', 20);
    } else {
      this.clone.classList.remove('bonus');
      this.clone.style.setProperty('--bonus', 0);
    }
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
  getEvents() {
    const docElem = document.documentElement;
    return {
      click: 'ontouchstart' in docElem ? 'touchstart' : 'click',
      animate: 'onanimationend' in docElem ? 'animationend' : 'webkitAnimationEnd'
    }
  }
}