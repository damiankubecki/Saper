export default class Window {

  #optionsWindow = document.querySelector(".options-window");


  newWindow(windowProperties) {
    const {
      title,
      content,
      renderFunction,
      buttonConfirmFunction
    } = windowProperties;

    this.#openWindow();
    this.#renderContent(title, content);
    if (renderFunction) renderFunction();
    if (buttonConfirmFunction) this.#addConfirmBtnListener(buttonConfirmFunction);
    this.#addCloseBtnListener();
  }


  #renderContent(title, content) {
    const windowTitle = document.querySelector('.options-window__title');
    windowTitle.innerHTML = title;

    const windowContent = document.querySelector('.options-window__content');
    windowContent.innerHTML = content;
  }


  #addConfirmBtnListener(btnFunction) {
    const confirmBtn = document.querySelector('.options-window__confirm');
    confirmBtn.addEventListener('click', () => btnFunction.bind(this)());
  }


  #addCloseBtnListener() {
    const closeWindowBtn = document.querySelector(".options-window__close");
    closeWindowBtn.addEventListener("click", () => this.#closeWindow());
  }


  #openWindow() {
    this.#optionsWindow.classList.add("active");
  }


  #closeWindow() {
    this.#optionsWindow.classList.remove("active");
  }
}