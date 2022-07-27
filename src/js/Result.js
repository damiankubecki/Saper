import Window from './Window.js';
import winningGameWindow from './window-templates/win.js';
import losingGameWindow from './window-templates/lose.js';

export default class Result {
  check() {
    const rowsNumber = this.getRowsNumber();
    const colsNumber = this.getColsNumber();
    const bombsNumber = this.getBombsNumber();

    const allCellsNumber = colsNumber * rowsNumber;
    const clickedCellsNumber = this.getClickedCells().length;

    return !!(clickedCellsNumber + bombsNumber === allCellsNumber);
  }

  win() {
    this.disableAllCells();
    this.flagAllBombs();
    this.emojiAnimation('positive', true);
    this.stopTimer();
    this.setBombsCounter(0);

    new Window(this, winningGameWindow);
  }

  lose(cellClicked) {
    this.revealBoardAfterLose();
    this.disableAllCells();
    this.emojiAnimation('negative', true);
    this.stopTimer();
    this.setRedBackground(cellClicked);

    new Window(this, losingGameWindow);
  }
}
