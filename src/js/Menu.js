import Modal from "./Modal.js";

export default class Menu extends Modal {
  constructor() {
    super();
    this.#renderMenu();
  }

  #renderMenu() {
    const moveBoardBtn = document.querySelector("#move-board");
    this.#moveBoard(moveBoardBtn);

    const fullscreenBtn = document.querySelector("#fullscreen");
    this.#fullScreen(fullscreenBtn);

    const settingsBtn = document.querySelector("#settings");
    this.#openSettings(settingsBtn);

    const themesBtns = [...document.querySelectorAll(".menu__themes > button")];
    this.#changeTheme([...themesBtns]);
  }

  toggleSideBars() {
    const sideBars = document.querySelector(".menu");
    sideBars.classList.toggle("active");

    this.animateSideBarsButton();
  }

  #changeTheme(actionBtns) {
    actionBtns.forEach((btn) =>
      btn.addEventListener("click", () => {
        document.body.removeAttribute("class");
        document.body.classList.add(btn.id);
      })
    );
  }

  #openSettings(actionBtn) {
    actionBtn.addEventListener("click", () => {
      this.openSettingsModal();
    });
  }

  #moveBoard(actionBtn) {
    let mousedown = false;
    let x = 0;
    let y = 0;

    actionBtn.addEventListener("mousedown", (e) => {
      mousedown = true;
      x = this.gameContainer.offsetLeft - e.clientX;
      y = this.gameContainer.offsetTop - e.clientY;
    });

    actionBtn.addEventListener("mouseup", () => (mousedown = false));

    window.addEventListener("mousemove", (e) => {
      if (mousedown) {
        const rightWall =
          e.clientX <
          document.body.offsetWidth - this.gameContainer.offsetWidth - 75;
        const downWall =
          e.clientY <
          document.body.offsetHeight - this.gameContainer.offsetHeight + 30;

        if (downWall && rightWall) {
          const boardMargin = 40;

          this.gameContainer.style.left = e.clientX + x + "px";
          this.gameContainer.style.top = e.clientY + y - boardMargin + "px";
        }
      }
    });

    window.addEventListener("click", () => (mousedown = false));
  }

  #fullScreen(actionBtn) {
    actionBtn.addEventListener("click", () => this.#toggleFullScreen());
  }

  #toggleFullScreen() {
    const isBrowserInFullscreen =
      window.innerWidth == screen.width && window.innerHeight == screen.height;

    isBrowserInFullscreen ? this.#closeFullscreen() : this.#openFullscreen();
  }

  #openFullscreen() {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  #closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
}
