import Cells from "./Cells.js";

export default class Board extends Cells {
  gameBoard = document.querySelector(".board");

  newBoard() {
    this.#setBoardWidth();
    this.#renderCellsOnBoard();
    this.#matchBodyToBoardSize();
    this.#addDatasetToCells();
    this.#renderListeningToCells();
  }

  revealBoardAfterLoose() {
    const cellsWithBomb = this.getCellsWithBomb();
    cellsWithBomb.forEach((cell) =>
      this.isCellFlagged(cell) ? undefined : this.markCellAsClicked(cell)
    );

    const flaggedCells = this.getFlaggedCells();
    flaggedCells.forEach((cell) =>
      this.isCellABomb(cell) ? undefined : cell.classList.add("no-bomb")
    );
  }

  restartGame() {
    this.initializeGame();
    this.animateRestartButton();
  }

  resetGamePosition() {
    this.gameContainer.style.left = "50%";
    this.gameContainer.style.top = 0;
  }

  #setBoardWidth() {
    this.gameBoard.textContent = "";
    this.gameBoard.style.width = `${this.itemsSize.cell * this.colsNumber}px`;
  }

  #renderCellsOnBoard() {
    for (let i = 0; i < this.rowsNumber * this.colsNumber; i++) {
      const newCell = this.#createNewCell();
      this.gameBoard.appendChild(newCell);
    }
  }

  #renderListeningToCells() {
    const allCells = this.getAllCells();

    allCells.forEach((cell) =>
      cell.addEventListener("click", () => {
        this.isCellFlagged(cell) ? undefined : this.clickCell(cell);
      })
    );

    allCells.forEach((cell) =>
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.toggleFlagMarkOnCell(cell);
        const numberOfBombsToDisplay = this.getBombsLeft();
        this.setBombsCounter(numberOfBombsToDisplay);
      })
    );
  }

  #addDatasetToCells() {
    const cells = this.getAllCells();
    const cols = this.colsNumber;

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
    const windowHeight = window.innerHeight;

    if (gameHeight + gameMargin > windowHeight) {
      document.body.style.minHeight = gameHeight + gameMargin + "px";
    } else document.body.style.minHeight = "100vh";
  }

  #createNewCell() {
    const cell = document.createElement("div");
    cell.classList.add("board__cell");
    cell.style.height = `${this.itemsSize.cell}px`;
    cell.style.width = `${this.itemsSize.cell}px`;
    cell.style.fontSize = `${this.itemsSize.font}px`;

    return cell;
  }

  #addBombToRandomCells() {
    const bombs = this.bombsNumber;

    for (let i = 0; i < bombs; i++) {
      const emptyCells = this.getEmptyCells();

      const randomCell = emptyCells.random();
      randomCell.dataset.bomb = 1;
      randomCell.dataset.near = 0;
    }
  }

  #setNumberOfBombsNearCells() {
    const noBombCells = this.getNoBombCells();

    noBombCells.forEach((cell) => {
      const cellsAround = this.getCellsAround(cell);
      const numberOfBombsAroundCell = this.getNumberOfBombsInCells(
        ...cellsAround
      );

      cell.dataset.near = numberOfBombsAroundCell;
    });
  }
}
