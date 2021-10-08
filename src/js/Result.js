import Panel from './Panel.js';

export default class Result {
  constructor() {
    const win = this.#win;

    this.checkWin = function () {
      const rowsNumber = this.getRowsNumber();
      const colsNumber = this.getColsNumber();
      const bombsNumber = this.getBombsNumber();
  
      const allCellsNumber = colsNumber * rowsNumber;
      const clickedCellsNumber = this.getClickedCells().length;

      return clickedCellsNumber + bombsNumber === allCellsNumber ? win.bind(this)() : false;
    }
  }


  #win() {
    this.disableAllCells();
    this.flagAllBombs();
    this.emojiAnimation('positive', true);
    this.stopTimer();
    this.setBombsCounter(0);

    console.log('wygrales');
  }


  loose(cellClicked) {
    this.revealBoardAfterLoose();
    this.disableAllCells();
    this.emojiAnimation('negative', true);
    this.stopTimer();
    this.setRedBackground(cellClicked);

    console.log('game over');
  }
}