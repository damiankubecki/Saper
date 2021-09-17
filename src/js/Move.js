import Result from "./Result.js";
import Board from "./Board.js";

export default class Move extends Board {
  constructor() {
    super();
    this.getResult = new Result();
  }

  clickEmptyCellOnStart(quantity = 1) {
    for (let i = 0; i < quantity; i++) {
      const emptyCells = this.getEmptyCells();
      const randomEmptyCell = emptyCells.random();

      this.clickCell(randomEmptyCell);
    }
  }

  clickCell(cell) {
    this.markCellAsClicked(cell);

    const isCellABomb = this.isCellABomb(cell);
    const isBombNearCell = this.isBombNearCell(cell);

    if (isCellABomb) {
      this.getResult.loose.bind(this, cell)();
    } else if (isBombNearCell) {
      this.emojiAnimation("positive");
      this.getResult.checkWin.bind(this)();
    } else {
      this.emojiAnimation("positive");
      this.#revealCellsAroundEmptyCell(cell);
    }
  }

  #revealCellsAroundEmptyCell(cell) {
    let emptyCells = [];

    const cellsToBeClickedAgain = this.#clickCellsAround(cell);

    emptyCells.push(...cellsToBeClickedAgain);

    do {
      emptyCells.forEach((cell) => {
        this.markCellAsChecked(cell);

        const cellsToBeClickedAgain = this.#clickCellsAround(cell);

        emptyCells.push(...cellsToBeClickedAgain);
        emptyCells = emptyCells.filter(
          (cell, index) =>
            emptyCells.indexOf(cell) === index && !this.isCellChecked(cell)
        );
      });
    } while (emptyCells.length);

    this.getResult.checkWin.bind(this)();
  }

  #clickCellsAround(cell) {
    const cellsAround = this.getCellsAround(cell);

    const noFlaggedCellsAround = cellsAround.filter(
      (cell) => !this.isCellFlagged(cell)
    );
    noFlaggedCellsAround.forEach((cell) => this.markCellAsClicked(cell));

    return noFlaggedCellsAround.filter((cell) => !this.isBombNearCell(cell));
  }
}
