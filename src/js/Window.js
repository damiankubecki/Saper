export default class Window {
  constructor(game, windowProperties) {
    const optionsWindow = document.querySelector(".options-window");
    const {
      title,
      content,
      renderFunction
    } = windowProperties;

    const renderWindow = () => {
      openWindow();
      renderContent(title, content);
      renderFunction(game);
      addCloseBtnListener();
    }

    const renderContent = (title, content) => {
      const windowTitle = document.querySelector('.options-window__title');
      windowTitle.innerHTML = title;

      const windowContent = document.querySelector('.options-window__content');
      windowContent.innerHTML = content;
    }

    const addCloseBtnListener = () => {
      const closeWindowBtn = document.querySelector(".options-window__close");
      closeWindowBtn.addEventListener("click", () => closeWindow());
    }

    const openWindow = () => {
      optionsWindow.classList.add("active");
    }

    const closeWindow = () => {
      optionsWindow.classList.remove("active");
    }

    renderWindow();
  }
}