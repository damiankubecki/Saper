import Config from "./Config.js";

export default class Game extends Config {

  gameContainer = document.querySelector(".gameContainer");
  gameBoard = document.querySelector(".board");

  constructor({
    defaultDifficulty,
    defaultItemsSize,
    defaultNumberOfCellsToClickOnStart
  }) {
    super();

    this.setDifficulty(defaultDifficulty);
    this.setItemsSize(defaultItemsSize);
    this.setNumberOfCellsToClickOnStart(defaultNumberOfCellsToClickOnStart)
    this.initializeGame();
  }


  initializeGame() {
    this.newBoard();
    this.clickEmptyCellOnStart(this.numberOfCellsToClickOnStart);
    this.resetAndStartTimer();
    this.setBombsCounter(this.bombsNumber);
    this.resetEmoji();
  }
}