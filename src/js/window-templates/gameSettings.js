class WindowProps {
    constructor() {
        this.title = 'Opcje';
        this.content = `
        <div class="window__content__container">
            <h4 class="window__content__subtitle">Ilość kliknięć na start</h4>
            <input type="number" id="clicks-onstart"/>
        </div>
        <div class="window__content__container">
            <h4 class="window__content__subtitle">Rozmiar komórek</h4>
            <select id="items-size">
                <option value="small">Mały</option>
                <option value="normal" selected>Średni</option>
                <option value="big">Duży</option>
            </select>
        </div>
        <p class="window__note">*zmiany zostaną uwzględnione od następnej gry</p>
        <button class="window__confirm">Potwierdź</button>
        `;
        this.windowFunctions = game => {
            this.#game = game;
            this.#confirmBtn = document.querySelector('.window__confirm');
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
        const optionsWindow = document.querySelector(".window");

        optionsWindow.classList.remove("active");
    }
}

const window = new WindowProps();


export default {
    title: window.title,
    content: window.content,
    renderFunction: window.windowFunctions
}