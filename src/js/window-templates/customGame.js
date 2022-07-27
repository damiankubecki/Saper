class WindowProps {
  MAX_ROWS = 25;
  MAX_COLS = 30;
  MAX_BOMBS = 175;

  constructor() {
    this.title = 'Własna gra';
    this.content = `
        <div class="window__content__container">
            <h4 class="window__content__subtitle">Liczba wierszy <span>(max 25)</span></h4>
            <input type="number" id="customGame-rows"/>
            <h4 class="window__content__subtitle">Liczba kolumn <span>(max 30)</span></h4>
            <input type="number" id="customGame-cols"/>
            <h4 class="window__content__subtitle">Liczba bomb <span>(max 175)</span></h4>
            <input type="number" id="customGame-bombs"/>
        </div>
        <p class="window__note">kliknij, aby rozpocząć nową grę</p>
        <button class="window__confirm">Rozpocznij</button>
        `;
    this.windowFunctions = game => {
      this.#game = game;
      this.#confirmBtn = document.querySelector('.window__confirm');

      this.#fillFields();
      this.#addConfirmListener();
    };
  }

  #game;
  #confirmBtn;

  #fillFields() {
    this.#fillRowsInput();
    this.#fillColsInput();
    this.#fillBombsInput();
  }

  #addConfirmListener() {
    this.#confirmBtn.addEventListener('click', () => this.#confirmListener());
  }

  #confirmListener() {
    const config = this.#getInputsValues();
    const configError = this.#checkInputValues(config);
    if (configError) return this.#setWindowNoteText(configError);
    this.#game.setCustomDifficulty(config);
    this.#game.initializeGame();
    this.#closeWindow();
  }

  #fillRowsInput() {
    const rowsNumber = this.#game.getRowsNumber();
    const rowsInput = document.querySelector('#customGame-rows');
    rowsInput.value = rowsNumber;
  }

  #fillColsInput() {
    const colsNumber = this.#game.getColsNumber();
    const colsInput = document.querySelector('#customGame-cols');
    colsInput.value = colsNumber;
  }

  #fillBombsInput() {
    const bombsNumber = this.#game.getBombsNumber();
    const bombsInput = document.querySelector('#customGame-bombs');
    bombsInput.value = bombsNumber;
  }

  #getInputsValues() {
    const rowsInput = document.querySelector('#customGame-rows');
    const colsInput = document.querySelector('#customGame-cols');
    const bombsInput = document.querySelector('#customGame-bombs');

    return {
      rows: rowsInput.value * 1,
      cols: colsInput.value * 1,
      bombs: bombsInput.value * 1,
    };
  }

  #checkInputValues({ rows, cols, bombs } = {}) {
    if (rows > this.MAX_ROWS) return 'ustaw mniejszą ilość wierszy';
    if (cols > this.MAX_COLS) return 'ustaw mniejszą ilość kolumn';
    if (bombs > this.MAX_BOMBS) return 'ustaw mniejszą ilość bomb';
    if ((rows && cols) < 2) return 'ustaw większą ilość komórek';
    if (bombs > (rows * cols) / 2) return 'ustaw mniejszą ilość bomb';
  }

  #closeWindow() {
    const optionsWindow = document.querySelector('.window');
    optionsWindow.classList.remove('active');
  }

  #setWindowNoteText(text) {
    const note = document.querySelector('.window__note');
    note.textContent = text;
  }
}

const window = new WindowProps();

export default {
  title: window.title,
  content: window.content,
  renderFunction: window.windowFunctions,
};
