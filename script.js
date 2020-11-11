import { Sound } from './src/Sound.js';

const sound = new Sound();

const maxBalloons = 100;
let remaining = maxBalloons;
let score = 0;

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min + 1) + min);

const delay = (t) => new Promise(resolve => setTimeout(resolve, t));

async function cloneBall() {
  await delay(1000);
  if (remaining <= 0) return;
  remaining--;
  const clone = $('.balloon').cloneNode(true);
  clone.addEventListener('click', (e) => {
    clone.firstElementChild.style.animationPlayState = 'running';
    clone.style.animationPlayState = 'paused';
    score += Number(clone.id);
    $('.score.display').textContent = score;
    sound.init('pop.mp3');
  });
  $('.remaining.display').textContent = remaining;
  const points = getRandomNumber(1, 4);
  clone.firstElementChild.textContent = points;
  clone.id = points;
  clone.style.setProperty('--points', points);
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
  if (remaining === 0) {
    clearTimeout(timerId);
    return;
  }
  cloneBall();
  const rand = getRandomNumber(1, 15);
  timerId = setTimeout(releaseLoop, rand * 100);
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

function getLeaderBoard() {
  const maxIndex = 20;
  $('.scores').innerHTML = '<li>Loading...</li>';
  fetch('src/data.json')
  .then(res => res.json())
  .then(data => {
    const list = data
    .sort((a, b) => b.score - a.score)
    .map(item => `<li>${item.name}: ${item.score}</li>`)
    .filter((_, index) => index <= maxIndex)
    .join('');
    $('.scores').innerHTML = list;
  });
}

getLeaderBoard();