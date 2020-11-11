import { Balloon } from './src/Balloon.js';
import { Score } from './src/Score.js';
import { Sound } from './src/Sound.js';

const score = new Score();
const sound = new Sound();

// import { Game } from './src/Game.js';
// const game = new Game();
// game.releaseLoop();
// game.cleanUpLoop();

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min + 1) + min);

const delay = (t) => new Promise(resolve => setTimeout(resolve, t));

async function cloneOne() {
  await delay(1000);
  if (score.pointsList.length <= 0) return;
  const clone = $('.balloon').cloneNode(true);
  clone.addEventListener('click', (e) => {
    clone.firstElementChild.style.animationPlayState = 'running';
    clone.style.animationPlayState = 'paused';
    score.points += Number(clone.id);
    $('.points.display').textContent = score.points;
    sound.init('pop.mp3');
  });
  const p = score.pointsList.pop();
  $('.remaining.display').textContent = score.pointsList.length;
  clone.firstElementChild.textContent = p;
  clone.id = p;
  clone.style.setProperty('--points', p);
  const endPosX = `${getRandomNumber(0, 320)}px`
  clone.style.setProperty('--end-pos-x', endPosX);
  const startPosX = `${getRandomNumber(0, 320)}px`;
  clone.style.setProperty('--start-pos-x', startPosX);
  const rotation = `${getRandomNumber(-60, 60)}deg`;
  clone.style.setProperty('--rotation', rotation);
  clone.style.animationPlayState = 'running';
  $('.container').appendChild(clone);
}

let timerId = null;

function releaseLoop() {
  if (score.pointsList.length === 0) {
    clearTimeout(timerId);
    return;
  }
  cloneOne();
  timerId = setTimeout(releaseLoop, getRandomNumber(1, 15) * 100);
}
releaseLoop();

let active = false;

function cleanUpLoop() {
  $$('.container > div').forEach(item => {
    let state = getComputedStyle(item.firstElementChild).getPropertyValue('--state');
    state = Number(state.trim());
    if (item.getBoundingClientRect().top <= 0 || !state) {
      $('.container').removeChild(item);
    }
  });
  setTimeout(cleanUpLoop, 1);
}
cleanUpLoop();