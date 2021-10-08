class WindowProps {
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
        <button class="window__confirm">Rozpocznij</button>
        `;
        this.windowFunctions = game => {
            this.#game = game;
            
            this.#fillFields();
        }
    }

    #game;


    #fillFields() {
        this.#fillRowsInput();
        this.#fillColsInput();
        this.#fillBombsInput();
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
}

const window = new WindowProps();


export default {
    title: window.title,
    content: window.content,
    renderFunction: window.windowFunctions
}

