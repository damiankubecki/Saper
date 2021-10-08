export default class Window {
  constructor(game, windowProperties) {
    const window = document.querySelector('.window');
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
      const titleField = document.querySelector('.window__title');
      titleField.innerHTML = title;
    }

    const renderContent = content => {
      const contentField = document.querySelector('.window__content');
      contentField.innerHTML = content;
    }

    const addCloseBtnListener = () => {
      const closeWindowBtn = document.querySelector('.window__close');
      closeWindowBtn.addEventListener('click', () => closeWindow());
    }

    const openWindow = () => {
      window.classList.add('active');
    }

    const closeWindow = () => {
      window.classList.remove('active');
    }

    renderWindow();
  }
}