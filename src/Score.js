import { Utils } from './Utils.js';

export class Score extends Utils {
  constructor(maxPoint, amountPerPoint) {
    super();
    this.maxPoint = maxPoint;
    this.amountPerPoint = amountPerPoint;
    this.maxBalloonsPossible = 100;
    this.getLeaderBoard({url:'src/data.json', maxIndex:20})
    this.bonusPoint = 20;
    const getMax = this.getMaxPoints(amountPerPoint, maxPoint, this.bonusPoint);
  }
  init() {
    this.pointsList = this.getPoints();
    this.pointsList[this.pointsList.length-1] = this.bonusPoint;
    this.randomize(this.pointsList);
    this.points = 0;
    this.missed = 0;
    this.$('.points.display').textContent = 0;
    this.$('.points-missed.display').textContent = 0;
    this.$('.released.display').textContent = this.pointsList.length;
    const sum = this.arraySum(this.pointsList);
    this.$('.container').setAttribute('data-dump', sum);
  }
  getArrayKeys(max) {
    return [...Array(max).keys()].map(n => n + 1);
  }
  randomize(a) {
    return a.sort(() => Math.random() - 0.5);
  }
  getPoints() {
    return this.getArrayKeys(this.maxPoint).reduce((acc, item) => {
      acc.push(Array(this.amountPerPoint).fill(item));
      return acc;
    }, [])
    .flat(1)
    .slice(0, this.maxBalloonsPossible);
  }
  arraySum(arr) {
    return arr.reduce((acc, item) => {
      acc += item;
      return acc;
    }, 0);
  }
  getLeaderBoard({url, maxIndex}) {
    this.$('.leader-board-points').innerHTML = '<li>Loading...</li>';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      const list = data
      .sort((a, b) => b.points - a.points)
      .map(item => `<li>${item.name}: ${item.points}</li>`)
      .filter((_, index) => index <= maxIndex)
      .join('');
      this.$('.leader-board-points').innerHTML = list;
    });
  }
  getMaxPoints(length, max, bonus) {
    const withoutBonus = length * max * (max+1)/2;
    return withoutBonus - max + bonus;
  }
}