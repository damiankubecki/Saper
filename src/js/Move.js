import Result from './Result.js';
import Board from './Board.js';

export default class Move extends Board {
  constructor() {
    super();

    this.result = new Result();
  }

  clickEmptyCellOnStart(quantity) {
    for (let i = 0; i < quantity; i++) {
      const emptyCells = this.getEmptyCells();
      const isEmptyCell = !!emptyCells.length;
      if (isEmptyCell) {
        const randomEmptyCell = emptyCells.random();
        this.clickCell(randomEmptyCell);
      } else return;
    }
  }

  clickCell(cell) {
    this.markCellAsClicked(cell);
    this.#checkCellAction(cell);
  }

  
  #checkCellAction(cell) {
    const isCellABomb = this.isCellABomb(cell);
    const isBombNearCell = this.isBombNearCell(cell);

    if (isCellABomb) {
      this.result.loose.bind(this, cell)();
    } else if (isBombNearCell) {
      this.emojiAnimation('positive');
      this.#checkWin();
    } else {
      this.emojiAnimation('positive');
      this.#revealCellsAroundEmptyCell(cell);
    }
  }

  #checkWin() {
    const isWin = this.result.check.bind(this)();
    if (isWin) {
      this.result.win.bind(this)();
    }
  }

  #revealCellsAroundEmptyCell(cell) {
    let emptyCells = [];

    const cellsToBeClickedAgain = this.#clickCellsAround(cell);

    emptyCells.push(...cellsToBeClickedAgain);

    do {
      emptyCells.forEach(cell => {
        this.markCellAsChecked(cell);

        const cellsToBeClickedAgain = this.#clickCellsAround(cell);

        emptyCells.push(...cellsToBeClickedAgain);
        emptyCells = emptyCells.filter((cell, index) => emptyCells.indexOf(cell) === index && !this.isCellChecked(cell));
      });
    } while (emptyCells.length);

    this.#checkWin();
  }

  #clickCellsAround(cell) {
    const cellsAround = this.getCellsAround(cell);

    const noFlaggedCellsAround = cellsAround.filter(cell => !this.isCellFlagged(cell));
    noFlaggedCellsAround.forEach(cell => this.markCellAsClicked(cell));

    return noFlaggedCellsAround.filter((cell) => !this.isBombNearCell(cell));
  }
}