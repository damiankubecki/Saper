import Panel from "./Panel.js";

export default class Cells extends Panel {
  disableAllCells() {
    const allCells = this.getAllCells();
    allCells.forEach(cell => this.disableCell(cell));
  }


  flagAllBombs() {
    const noFlaggedBombs = this.getNoFlaggedBombs();

    noFlaggedBombs.forEach(cell => this.toggleFlagMarkOnCell(cell));
  }


  getBombsLeft() {
    const flaggedCells = this.getFlaggedCells();

    const bombsLeft = this.bombsNumber - flaggedCells.length;
    return bombsLeft;
  }


  getAllCells = () => [...document.querySelectorAll(".board__cell")];


  getFlaggedCells = () => [...document.querySelectorAll(".flagged")];


  getNoFlaggedBombs() {
    const allCells = this.getAllCells();

    return allCells.filter(cell => cell.dataset.bomb === "1" && !cell.classList.contains("flagged"));
  }


  getEmptyCells() {
    const allCells = this.getAllCells();

    return allCells.filter(cell => cell.dataset.near === "0" && cell.dataset.bomb === "0" && !cell.classList.contains('clicked'));
  }


  getCellsWithBomb() {
    const allCells = this.getAllCells();

    return allCells.filter(cell => cell.dataset.bomb === "1");
  }


  getNoBombCells() {
    const allCells = this.getAllCells();

    return allCells.filter(cell => cell.dataset.bomb === "0");
  }


  getClickedCells = () => [...document.querySelectorAll(".board__cell.clicked")];


  getNumberOfBombsInCells = (...cells) =>
    cells.filter((cell) => cell.dataset.bomb === "1").length;


  getCellsAround(cell) {
    const cellX = cell.dataset.x * 1;
    const cellY = cell.dataset.y * 1;

    const cellsAround = [
      this.#findCell(cellX - 1, cellY - 1),
      this.#findCell(cellX, cellY - 1),
      this.#findCell(cellX + 1, cellY - 1),
      this.#findCell(cellX - 1, cellY),
      this.#findCell(cellX + 1, cellY),
      this.#findCell(cellX - 1, cellY + 1),
      this.#findCell(cellX, cellY + 1),
      this.#findCell(cellX + 1, cellY + 1),
    ];

    return cellsAround.filter(cell => cell !== undefined);
  }


  markCellAsClicked(cell) {
    cell.classList.add("clicked");
    this.#setQuantityOfBombsNearCell(cell);
  }


  markCellAsChecked = cell => cell.classList.add("checked");


  disableCell = cell => cell.classList.add("freeze");


  isCellFlagged = cell => cell.classList.contains("flagged");


  isCellChecked = cell => cell.classList.contains("checked");


  isCellABomb = cell => cell.dataset.bomb * 1;


  isBombNearCell = cell => cell.dataset.near * 1;


  toggleFlagMarkOnCell = cell => cell.classList.toggle("flagged");


  setRedBackground = cell => (cell.style.backgroundColor = "#B22222");


  #setQuantityOfBombsNearCell(cell) {
    const bombsNearCell = cell.dataset.near * 1;
    cell.textContent = bombsNearCell ? bombsNearCell : "";
  }


  #findCell(x, y) {
    const cells = this.getAllCells();

    return cells.find((cell) => cell.dataset.x == x && cell.dataset.y == y);
  }
}