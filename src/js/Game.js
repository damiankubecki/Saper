import Move from "./Move.js";

export default class Game extends Move {

  #difficulty = {
    easy: {
      rows: 8,
      cols: 8,
      bombs: 10,
    },
    medium: {
      rows: 16,
      cols: 16,
      bombs: 40,
    },
    expert: {
      rows: 16,
      cols: 30,
      bombs: 99,
    },
  };


  #itemsSize = {
    small: {
      cell: 30,
      font: 25,
    },
    normal: {
      cell: 38,
      font: 32,
    },
    big: {
      cell: 44,
      font: 36,
    },
  };


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


  rowsNumber;
  colsNumber;
  bombsNumber;
  currentDifficulty;
  currentItemsSize;
  numberOfCellsToClickOnStart;


  initializeGame() {
    this.newBoard();
    this.clickEmptyCellOnStart(this.numberOfCellsToClickOnStart);
    this.resetAndStartTimer();
    this.setBombsCounter(this.bombsNumber);
    this.resetEmoji();
  }


  setDifficulty(diffculty) {
    const {
      easy,
      medium,
      expert
    } = this.#difficulty;

    let configuration;

    switch (diffculty) {
      case "easy":
        configuration = easy;
        break;
      case "medium":
        configuration = medium;
        break;
      case "expert":
        configuration = expert;
        break;
    }

    this.rowsNumber = configuration.rows;
    this.colsNumber = configuration.cols;
    this.bombsNumber = configuration.bombs;
    this.currentDifficulty = diffculty;
  }


  setItemsSize(size) {
    const {
      small,
      normal,
      big
    } = this.#itemsSize;

    switch (size) {
      case "small":
        this.itemsSize = small;
        break;
      case "normal":
        this.itemsSize = normal;
        break;
      case "big":
        this.itemsSize = big;
        break;
    }

    this.currentItemsSize = size;
  }

  getItemsSize = () => this.currentItemsSize;


  setNumberOfCellsToClickOnStart(number) {
    this.numberOfCellsToClickOnStart = number;
  }

  getNumberOfCellsToClickOnStart = () => this.numberOfCellsToClickOnStart;
}