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
      renderTitle(title)
      renderContent(content);
      renderFunction(game);
      addCloseBtnListener();
    }

    const renderTitle = title => {
      const titleField = document.querySelector('.options-window__title');
      titleField.innerHTML = title;
    }

    const renderContent = content => {
      const contentField = document.querySelector('.options-window__content');
      contentField.innerHTML = content;
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