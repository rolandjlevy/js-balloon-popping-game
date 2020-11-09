import { Sound } from './src/Sound.js';

const sound = new Sound();

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min + 1) + min);

const delay = (t) => new Promise(resolve => setTimeout(resolve, t));

async function cloneBall() {
  await delay(1000);
  const clone = $('.ball').cloneNode(true);
  clone.addEventListener('click', (e) => {
    clone.firstElementChild.style.animationPlayState = 'running';
    clone.style.animationPlayState = 'paused';
    sound.init('pop.mp3');
  });
  clone.style.animationPlayState = 'running';
  const posX = `${getRandomNumber(0, 350)}px`;
  clone.style.left = posX;
  $('.container').appendChild(clone);
}

function releaseLoop() {
  cloneBall();
  const rand = getRandomNumber(1, 10);
  setTimeout(releaseLoop, rand * 100);
}
releaseLoop();

function cleanUpLoop() {
  $$('.container > div').forEach(item => {
    if (item.getBoundingClientRect().top < -100) {
      $('.container').removeChild(item);
    }
  });
  setTimeout(gameLoop, 1);
}
cleanUpLoop();