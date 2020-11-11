import { Balloon } from './src/Balloon.js';
import { Game } from './src/Game.js';
import { Score } from './src/Score.js';
import { Sound } from './src/Sound.js';

const score = new Score();
const sound = new Sound();
const game = new Game();
const balloon = new Balloon(score, sound);

game.addEventHook(score, balloon);