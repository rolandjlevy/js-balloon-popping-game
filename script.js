import { Sound } from './src/Sound.js';

const sound = new Sound();

let score = 0;

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min + 1) + min);

const delay = (t) => new Promise(resolve => setTimeout(resolve, t));

async function cloneBall() {
  await delay(1000);
  const clone = $('.balloon').cloneNode(true);
  clone.addEventListener('click', (e) => {
    clone.firstElementChild.style.animationPlayState = 'running';
    clone.style.animationPlayState = 'paused';
    $('.score').textContent = ++score;
    sound.init('pop.mp3');
  });
  clone.firstElementChild.textContent = getRandomNumber(1, 4);
  clone.style.animationPlayState = 'running';
  // const animationDelay = `${getRandomNumber(5, 20) / 10}s !important`;
  // clone.style.animationDelay = animationDelay;
  const endPosX = `${getRandomNumber(0, 320)}px`
  clone.style.setProperty('--end-pos-x', endPosX);
  const startPosX = `${getRandomNumber(0, 320)}px`;
  clone.style.setProperty('--start-pos-x', startPosX);
  const rotation = `${getRandomNumber(-60, 60)}deg`;
  clone.style.setProperty('--rotation', rotation);
  $('.container').appendChild(clone);
}

function releaseLoop() {
  cloneBall();
  const rand = getRandomNumber(1, 15);
  setTimeout(releaseLoop, rand * 100);
}
releaseLoop();

let active = false;

function cleanUpLoop() {
  $$('.container > div').forEach(item => {
    let state = getComputedStyle(item.firstElementChild).getPropertyValue('--state');
    state = Number(state.trim());
    if (item.getBoundingClientRect().top <= -70 || !state) {
      $('.container').removeChild(item);
    }
  });
  setTimeout(cleanUpLoop, 1);
}
cleanUpLoop();