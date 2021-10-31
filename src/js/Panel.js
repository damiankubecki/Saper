import Menu from './Menu.js';

export default class Panel extends Menu {
   constructor() {
      super();

      const difficultyButtons = [...document.querySelectorAll('.panel__button-difficulty')];
      const restartButton = document.querySelector('.header__buttons-restart');
      const toggleMenuButton = document.querySelector('.header__buttons-showMenu');

      const renderShortcuts = () => {
         document.body.addEventListener('keyup', e => {
            if (e.code === 'KeyR') {
               this.restartGame();
            } else if (e.code === 'KeyM') {
               this.toggleSideBars();
            }
         })
      }

      const renderPanelListeners = () => {
         difficultyButtons.forEach(btn => btn.addEventListener('click', () => {
            this.setStandardDifficulty(btn.id);
            this.restartGame();
            this.resetGamePosition();
         }))

         restartButton.addEventListener('click', () => this.restartGame());

         toggleMenuButton.addEventListener('click', () => this.toggleSideBars());

         renderShortcuts();
      }

      renderPanelListeners();
   }

   toggleSideBars() {
      const sideBars = document.querySelector('.menu');
      sideBars.classList.toggle('active');

      this.animateSideBarsButton();
   }

   setBombsCounter(bombs) {
      const bombsCounter = document.querySelector('#bombs');
      bombsCounter.textContent = bombs;
   }

   getTimerTime() {
      const timer = document.querySelector('#timer');
      return timer.textContent;
   }

   resetAndStartTimer() {
      let timer = document.querySelector('#timer');
      timer = this.#resetTimer(timer);

      let sec = 0;
      let interval = setInterval(() => {
         timer.textContent = ++sec;
      }, 1000);

      return interval;
   }

   emojiAnimation(emotion, both = false) {
      const refreshedEmoji = this.resetEmoji();

      void refreshedEmoji.offsetWidth;
      refreshedEmoji.classList.add(emotion);

      const fillMode = both ? 'both' : 'none';
      refreshedEmoji.style.animationFillMode = fillMode;
   }

   resetEmoji() {
      const emoji = document.querySelector('.header__buttons-emoji');

      emoji.classList.remove('positive');
      emoji.classList.remove('negative');

      return emoji;
   }

   stopTimer() {
      const old_timer = document.querySelector('#timer');
      const new_timer = old_timer.cloneNode(true);
      old_timer.parentNode.replaceChild(new_timer, old_timer);
   }

   #resetTimer(timer) {
      const old_timer = timer;
      old_timer.textContent = 0;
      const new_timer = old_timer.cloneNode(true);
      old_timer.parentNode.replaceChild(new_timer, old_timer);

      return new_timer;
   }

   animateRestartButton() {
      const restartButton = document.querySelector('.header__buttons-restart');
      restartButton.classList.remove('animate');
      void restartButton.offsetWidth;
      restartButton.classList.add('animate');
   }

   animateSideBarsButton() {
      const SideBarsButton = document.querySelector('.header__buttons-showMenu');
      SideBarsButton.classList.remove('animate');
      void SideBarsButton.offsetWidth;
      SideBarsButton.classList.add('animate');
   }
}