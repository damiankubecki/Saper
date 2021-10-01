class WindowProps {
    constructor() {
        this.title = 'Opcje';
        this.content = `
        <div class="options-window__content__container">
            <h3 class="options-window__content__title">Ilość kliknięć na start</h3>
            <input type="number" id="clicks-onstart"/>
        </div>
        <div class="options-window__content__container">
            <h3 class="options-window__content__title">Rozmiar komórek</h3>
            <select id="items-size">
                <option value="small">Mały</option>
                <option value="normal" selected>Średni</option>
                <option value="big">Duży</option>
            </select>
        </div>
        <p class="options-window__note">*zmiany zostaną uwzględnione od następnej gry</p>
        <button class="options-window__confirm">Potwierdź</button>
        `;
        this.windowFunctions = game => {
            this.#game = game;
            this.#confirmBtn = document.querySelector('.options-window__confirm');
            this.#fillFields();
            this.#addConfirmListener();
        }
    }

    #game;
    #confirmBtn;


    #fillFields() {
        this.#setClicksOnStartInput();
        this.#setSelectedOption();
    }

    #addConfirmListener() {
        this.#confirmBtn.addEventListener('click', () => this.#confirmListener());
    }


    #setClicksOnStartInput() {
        const inputClicksOnStart = document.querySelector('#clicks-onstart');
        const numberOfClicksOnStart = this.#game.getNumberOfClicksOnStart();
        inputClicksOnStart.value = numberOfClicksOnStart;
    }

    #setSelectedOption() {
        const optionToSetSelect = this.#findOptionToSelect();

        optionToSetSelect.selected = 'selected';
    }

    #findOptionToSelect() {
        const currentItemsSize = this.#game.getCurrentItemsSize();
        const allOptions = [...document.querySelectorAll('#items-size > option')];
        const optionToSetSelected = allOptions.find(option => option.value === currentItemsSize);

        return optionToSetSelected;
    }


    #confirmListener() {
        const selectedClicksOnStart = this.#getEnteredClicksOnStart();
        const selectedItemsSize = this.#getEnteredItemsSize();

        this.#game.setNumberOfClicksOnStart(selectedClicksOnStart);
        this.#game.setItemsSize(selectedItemsSize);
        this.#changeBtnAction();
    }

    #getEnteredClicksOnStart() {
        const clicksOnStartInput = document.querySelector('#clicks-onstart');

        return clicksOnStartInput.value;
    }

    #getEnteredItemsSize() {
        const itemsSizeInput = document.querySelector('#items-size');

        return itemsSizeInput.value;
    }

    #changeBtnAction() {
        this.#confirmBtn.textContent = 'Nowa gra';

        this.#confirmBtn.addEventListener('click', () => {
            this.#closeWindow();
            this.#game.initializeGame();
        });
    }

    #closeWindow() {
        const optionsWindow = document.querySelector(".options-window");

        optionsWindow.classList.remove("active");
    }
}

const window = new WindowProps();


export default {
    title: window.title,
    content: window.content,
    renderFunction: window.windowFunctions
}