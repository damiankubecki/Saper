import Config from "./Config.js";

export default class Game extends Config {
  constructor({
    defaultDifficulty,
    defaultItemsSize,
    defaultNumberOfClicksOnStart
  }) {
    super();

    this.setDifficulty(defaultDifficulty);
    this.setItemsSize(defaultItemsSize);
    this.setNumberOfClicksOnStart(defaultNumberOfClicksOnStart);
    this.initializeGame();
  }


  initializeGame() {
    const clicksOnStart = this.getNumberOfClicksOnStart();
    const bombsNumber = this.getBombsNumber();

    this.newBoard();
    this.clickEmptyCellOnStart(clicksOnStart);
    this.resetAndStartTimer();
    this.setBombsCounter(bombsNumber);
    this.resetEmoji();
  }
}