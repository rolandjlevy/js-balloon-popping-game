export class Utils {
  constructor() {
  }
  $(selector) {
    return document.querySelector(selector);
  }
  $$(selector) {
    return document.querySelectorAll(selector);
  }
  getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min + 1) + min);
  }
  delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
  }
}