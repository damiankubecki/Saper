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
<button class="options-window__confirm">Potwierdź</button>
`;

function buttonConfirmFunction() {
    console.log('aaaa dzialam');
}

export default {
    title: 'Opcje',
    content: content,
    isConfirmButton: true,
    buttonConfirmFunction: buttonConfirmFunction
}