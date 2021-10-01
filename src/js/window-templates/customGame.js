class WindowProps {
    constructor() {
        this.title = 'Własna gra';
        this.content = `
        <div class="window__content__container">
          <h4 class="window__content__subtitle">Liczba wierszy</h4>
          <input type="number" id="customGame-rows"/>
          <h4 class="window__content__subtitle">Liczba kolumn</h4>
          <input type="number" id="customGame-cols"/>
          <h4 class="window__content__subtitle">Liczba bomb</h4>
          <input type="number" id="customGame-bombs" />
        </div>
        <button class="window__confirm">Rozpocznij</button>
        `;
        this.windowFunctions = game => {
            this.#game = game;
        }
    }

    #game;
}

const window = new WindowProps();


export default {
    title: window.title,
    content: window.content,
    renderFunction: window.windowFunctions
}