
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min + 1) + min);

const delay = (t) => new Promise(resolve => setTimeout(resolve, t));

// $$('.ball').forEach(item => {
//   item.addEventListener('click', (e) => {
//     console.log('pop!')
//   });
// });

async function cloneBall() {
  await delay(1000);
  const clone = $('.ball').cloneNode(true);
  clone.addEventListener('click', (e) => {
    clone.firstElementChild.style.animationPlayState = 'running';
    clone.style.animationPlayState = 'paused';
  });
  clone.style.animationPlayState = 'running';
  const posX = `${getRandomNumber(0, 350)}px`;
  clone.style.left = posX;
  $('.container').appendChild(clone);
}

function loop() {
  cloneBall();
  const rand = getRandomNumber(5, 20);
  setTimeout(loop, rand * 100);
}
loop();