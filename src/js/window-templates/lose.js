class WindowProps {
  constructor() {
    this.title = 'Przegrana';
    this.content = `
        <div class="window__content__container">
            <h4 class="window__content__subtitle">Gra zakończona porażką</h4>
            <p class="window__content__paragraph--bigger">Czas: <span id="stats_time"></span></p>
            <p class="window__content__paragraph--bigger">Ilość kliknięć: <span id="stats_clicks"></span></p>
            <p class="window__content__paragraph--bigger">Ilość wykrytych bomb: <span id="stats_detected-bombs"></span></p>
            <p class="window__content__paragraph--bigger">Zagęszczenie bomb: <span id="stats_compaction"></span></p>
        </div>
        <button class="window__confirm">Nowa gra</button>
        `;
    this.windowFunctions = game => {
      this.#game = game;
      this.#confirmBtn = document.querySelector('.window__confirm');

      this.#fillStats();
      this.#addConfirmListener();
    };
  }

  #game;
  #confirmBtn;

  #addConfirmListener() {
    this.#confirmBtn.addEventListener('click', () => this.#confirmListener());
  }

  #confirmListener() {
    this.#game.restartGame();
    this.#closeWindow();
  }

  #fillStats() {
    this.#fillGameTimeInfo();
    this.#fillClicksInfo();
    this.#fillDetectedBombsInfo();
    this.#fillBombsCompactionInfo();
  }

  #fillGameTimeInfo() {
    const timeSpan = document.querySelector('#stats_time');

    const gameTime = this.#game.getGameTime();
    timeSpan.textContent = `${gameTime}s`;
  }

  #fillBombsCompactionInfo() {
    const compactionSpan = document.querySelector('#stats_compaction');

    const bombs = this.#game.getBombsNumber();
    const rows = this.#game.getRowsNumber();
    const cols = this.#game.getColsNumber();

    const bombsCompaction = (bombs / (rows * cols)) * 100;
    compactionSpan.textContent = `${bombsCompaction.toFixed(2)}%`;
  }

  #fillClicksInfo() {
    const clicksSpan = document.querySelector('#stats_clicks');

    const clicks = this.#game.getClicks();

    clicksSpan.textContent = clicks;
  }

  #fillDetectedBombsInfo() {
    const detectedBombsSpan = document.querySelector('#stats_detected-bombs');

    const flaggedCellsWithBomb = this.#game.getFlaggedCellsWithBomb();
    const bombsNumber = this.#game.getBombsNumber();

    detectedBombsSpan.textContent = `${flaggedCellsWithBomb.length}/${bombsNumber}`;
  }

  #closeWindow() {
    const optionsWindow = document.querySelector('.window');
    optionsWindow.classList.remove('active');
  }
}

const window = new WindowProps();

export default {
  title: window.title,
  content: window.content,
  renderFunction: window.windowFunctions,
};
