import Cells from './Cells.js';

export default class Board extends Cells {

  newBoard() {
    this.#setBoardWidth();
    this.#renderCellsOnBoard();
    this.#matchBodyToBoardSize();
    this.#addDatasetToCells();
    this.#renderListeningToCells();
  }

  revealBoardAfterLose() {
    this.#revealBombs();
    this.#revealFlaggedCellsNoBomb();
  }

  resetGamePosition() {
    this.gameContainer.style.left = '50%';
    this.gameContainer.style.top = 0;
  }


  #revealBombs() {
    const cellsWithBomb = this.getCellsWithBomb();
    cellsWithBomb.forEach(cell => {
      if (!this.isCellFlagged(cell)) {
        this.markCellAsClicked(cell);
      }
    })
  }

  #revealFlaggedCellsNoBomb() {
    const flaggedCells = this.getFlaggedCells();
    flaggedCells.forEach(cell => {
      if (!this.isCellABomb(cell)) {
        this.markCellAsFakeBomb(cell);
      }
    })
  }

  #setBoardWidth() {
    const colsNumber = this.getColsNumber();
    const currentCellSize = this.getCurrentItemsSize().cell;

    this.gameBoard.textContent = '';
    this.gameBoard.style.width = `${currentCellSize * colsNumber}px`;
  }

  #renderCellsOnBoard() {
    const rowsNumber = this.getRowsNumber();
    const colsNumber = this.getColsNumber();

    for (let i = 0; i < rowsNumber * colsNumber; i++) {
      const newCell = this.#createNewCell();
      this.gameBoard.appendChild(newCell);
    }
  }

  #renderListeningToCells() {
    const allCells = this.getAllCells();

    allCells.forEach(cell => cell.addEventListener('click', () => {
      this.isCellFlagged(cell) ? undefined : this.clickCell(cell);
    }));

    allCells.forEach(cell => cell.addEventListener('contextmenu', e => {
      e.preventDefault();
      this.toggleFlagMarkOnCell(cell);
      const numberOfBombsToDisplay = this.getBombsLeft();
      this.setBombsCounter(numberOfBombsToDisplay);
    }));
  }

  #addDatasetToCells() {
    const cells = this.getAllCells();
    const cols = this.getColsNumber();

    let currentX = 1;
    let currentY = 1;

    for (let i = 0; i < cells.length; i++) {
      cells[i].dataset.x = currentX++;
      cells[i].dataset.y = currentY;
      cells[i].dataset.bomb = 0;
      cells[i].dataset.near = 0;
      if (currentX > cols) {
        currentX = 1;
        currentY++;
      }
    }

    this.#addBombToRandomCells();
    this.#setNumberOfBombsNearCells();
  }

  #matchBodyToBoardSize() {
    const gameHeight = this.gameContainer.offsetHeight;
    const gameMargin = 100;
    const gameWidth = this.gameContainer.offsetWidth;
    const windowHeight = window.innerHeight;

    document.body.style.minWidth = gameWidth + 150 + 'px';

    if (gameHeight + gameMargin > windowHeight) {
      document.body.style.minHeight = gameHeight + gameMargin + 'px';
    } else document.body.style.minHeight = '100vh';
  }

  #createNewCell() {
    const currentCellSize = this.getCurrentItemsSize().cell;
    const currentFontSize = this.getCurrentItemsSize().font;

    const cell = document.createElement('div');
    cell.classList.add('board__cell');
    cell.style.height = `${currentCellSize}px`;
    cell.style.width = `${currentCellSize}px`;
    cell.style.fontSize = `${currentFontSize}px`;

    return cell;
  }

  #addBombToRandomCells() {
    const bombsNumber = this.getBombsNumber();

    for (let i = 0; i < bombsNumber; i++) {
      const emptyCells = this.getEmptyCells();
      const randomCell = emptyCells.random();

      this.setCellBombDataset(randomCell, 1);
      this.setCellNearDataset(randomCell, 0);
    }
  }

  #setNumberOfBombsNearCells() {
    const noBombCells = this.getNoBombCells();

    noBombCells.forEach(cell => {
      const cellsAround = this.getCellsAround(cell);
      const numberOfBombsAroundCell = this.getNumberOfBombsInCells(...cellsAround);

      this.setCellNearDataset(cell, numberOfBombsAroundCell);
    })
  }
}