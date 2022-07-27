import Move from './Move.js';

export default class Config extends Move {
  constructor() {
    super();
  }

  gameContainer = document.querySelector('.gameContainer');
  gameBoard = document.querySelector('.board');

  #difficultyLevels = {
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
      name: 'small',
    },
    normal: {
      cell: 38,
      font: 32,
      name: 'normal',
    },
    big: {
      cell: 44,
      font: 36,
      name: 'big',
    },
  };

  #rowsNumber;
  #colsNumber;
  #bombsNumber;
  #currentItemsSize;
  #numberOfClicksOnStart;

  getRowsNumber = () => this.#rowsNumber;
  getColsNumber = () => this.#colsNumber;
  getBombsNumber = () => this.#bombsNumber;
  getCurrentItemsSize = () => this.#currentItemsSize;
  getNumberOfClicksOnStart = () => this.#numberOfClicksOnStart;

  #setRowsNumber(number) {
    this.#rowsNumber = number;
  }
  #setColsNumber(number) {
    this.#colsNumber = number;
  }
  #setBombsNumber(number) {
    this.#bombsNumber = number;
  }
  setNumberOfClicksOnStart(number) {
    this.#numberOfClicksOnStart = number;
  }
  setStandardDifficulty(difficulty) {
    const { easy, medium, expert } = this.#difficultyLevels;

    let config;
    switch (difficulty) {
      case 'easy':
        config = easy;
        break;
      case 'medium':
        config = medium;
        break;
      case 'expert':
        config = expert;
        break;
      default:
        throw new Error(`Invalid difficulty: "${difficulty}"`);
    }

    const { rows, cols, bombs } = config;
    this.#setRowsNumber(rows);
    this.#setColsNumber(cols);
    this.#setBombsNumber(bombs);
  }
  setCustomDifficulty({ rows, cols, bombs } = difficulty) {
    if (!(rows && cols && bombs)) throw new Error('Invalid game properties');

    this.#setRowsNumber(rows);
    this.#setColsNumber(cols);
    this.#setBombsNumber(bombs);
  }
  setItemsSize(size) {
    const { small, normal, big } = this.#itemsSize;

    switch (size) {
      case 'small':
        this.#currentItemsSize = small;
        break;
      case 'normal':
        this.#currentItemsSize = normal;
        break;
      case 'big':
        this.#currentItemsSize = big;
        break;
      default:
        throw new Error(`Invalid items size: "${size}"`);
    }
  }
}
