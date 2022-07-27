import Game from './Game.js';
import Proto from './Prototypes.js';

const proto = new Proto();
const game = new Game({
  defaultDifficulty: 'easy',
  defaultItemsSize: 'normal',
  defaultNumberOfClicksOnStart: 1,
});
