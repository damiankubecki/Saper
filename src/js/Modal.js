export default class Modal {
  #modal = document.querySelector(".modal");
  #settingsContent = document.querySelector(".modal__settings");

  constructor() {
    this.#renderModal();
  }

  #renderModal() {
    const closeModalBtn = document.querySelector(".modal__close");
    closeModalBtn.addEventListener("click", () => this.closeModal());
  }

  openSettingsModal() {
    // this.#modal.classList.add('active');
    this.#settingsContent.classList.add("active");
  }

  closeModal() {
    this.#settingsContent.classList.remove("active");
  }
}
