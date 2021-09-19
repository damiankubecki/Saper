const content = `
<div class="options-window__content__container">
    <h3 class="options-window__content__title">Ilość kliknięć na start</h3>
    <input type="number" name="" id="clicks-onstart"/>
</div>
<div class="options-window__content__container">
    <h3 class="options-window__content__title">Rozmiar komórek</h3>
    <select name="" id="items-size">
        <option value="small">Mały</option>
        <option value="medium" selected>Średni</option>
        <option value="big">Duży</option>
    </select>
</div>
<p class="options-window__note">*zmiany zostaną uwzględnione od następnej gry</p>
<button class="options-window__confirm">Potwierdź</button>
`;


// function renderFunction() {

// }


function buttonConfirmFunction() {
    const inputClicksOnStart = document.querySelector('#clicks-onstart');
    const newNumberOfClickOnStart = inputClicksOnStart.value * 1;

    this.setNumberOfCellsToClickOnStart(newNumberOfClickOnStart);
    console.log(this.numberOfCellsToClickOnStart)
}

class gameSettings {
    constructor() {
        this.title = 'Opcje'
    }
}

export default {
    title: 'Opcje',
    content: content,
    renderFunction: false,
    buttonConfirmFunction: buttonConfirmFunction
}