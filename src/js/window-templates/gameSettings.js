class WindowProps {
    constructor() {
        this.title = 'Opcje';
        this.content = `
        <div class="options-window__content__container">
            <h3 class="options-window__content__title">Ilość kliknięć na start</h3>
            <input type="number" name="" id="clicks-onstart"/>
        </div>
        <div class="options-window__content__container">
            <h3 class="options-window__content__title">Rozmiar komórek</h3>
            <select name="" id="items-size">
                <option value="small">Mały</option>
                <option value="normal" selected>Średni</option>
                <option value="big">Duży</option>
            </select>
        </div>
        <p class="options-window__note">*zmiany zostaną uwzględnione od następnej gry</p>
        <button class="options-window__confirm">Potwierdź</button>
        `;
        this.windowFunctions = game => {
            this.#game = game
            this.#setInputFields();
        }
    }

    #game;


    #setInputFields() {
        this.#setClicksOnStartInput();
        this.#setSelectedOption();
    }

    #setClicksOnStartInput() {
        const game = this.#game;

        const inputClicksOnStart = document.querySelector('#clicks-onstart');
        const currentNumberOfCellsToClickOnStart = game.getNumberOfCellsToClickOnStart();
        inputClicksOnStart.value = currentNumberOfCellsToClickOnStart;
    }

    #setSelectedOption() {
        const game = this.#game;

        const currentItemsSize = game.getItemsSize();
        const allOptions = [...document.querySelectorAll('#items-size > option')];
        const optionToSetSelected = allOptions.find(option => option.value === currentItemsSize);
        optionToSetSelected.selected = 'selected';
    }
}

const window = new WindowProps();


export default {
    title: window.title,
    content: window.content,
    renderFunction: window.windowFunctions
}