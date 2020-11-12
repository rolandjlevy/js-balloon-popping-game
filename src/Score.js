import { Utils } from './Utils.js';

export class Score extends Utils {
  constructor() {
    super();
  }
  init() {
    this.pointsList = this.getPoints({maxPoint:5, amountPerPoint:2});
    this.randomize(this.pointsList);
    this.points = 0;
    this.missed = 0;
    this.getLeaderBoard({url:'src/data.json', maxIndex:20}) 
    const totalScoreAchievable = this.arraySum(this.pointsList);
    this.$('.points.display').textContent = 0;
    this.$('.points-missed.display').textContent = 0;
    this.$('.released.display').textContent = this.pointsList.length;
  }
  getArrayKeys(max) {
    return [...Array(max).keys()].map(n => n + 1);
  }
  randomize(a) {
    return a.sort(() => Math.random() - 0.5);
  }
  getPoints({maxPoint, amountPerPoint}) {
    return this.getArrayKeys(maxPoint).reduce((acc, item) => {
      acc.push(Array(amountPerPoint).fill(item));
      return acc;
    }, []).flat(1);
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
}