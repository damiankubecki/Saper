export default class Window {

  #optionsWindow = document.querySelector(".options-window");


  newWindow(windowProperties) {
    const {
      title,
      content,
      isConfirmButton,
      buttonConfirmFunction
    } = windowProperties;

    this.#openWindow();
    this.#renderContent(title, content);
    if (isConfirmButton) this.#listeningForConfirmBtn(buttonConfirmFunction);
    this.#listeningForCloseBtn();
  }


  #renderContent(title, content) {
    const windowTitle = document.querySelector('.options-window__title');
    windowTitle.innerHTML = title;

    const windowContent = document.querySelector('.options-window__content');
    windowContent.innerHTML = content;
  }


  #listeningForConfirmBtn(btnFunction) {
    const confirmBtn = document.querySelector('.options-window__confirm');
    confirmBtn.addEventListener('click', () => btnFunction());
  }


  #listeningForCloseBtn() {
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