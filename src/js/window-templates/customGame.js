class WindowProps {
    constructor() {
        this.title = 'Własna gra';
        this.content = `
        <div class="options-window__content__container">
            <p>Liczba wierszy <input type="number" name="" id="" /></p>
            <p>Liczba kolumn <input type="number" name="" id="" /></p>
            <p>Liczba bomb <input type="number" name="" id="" /></p>
        </div>
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