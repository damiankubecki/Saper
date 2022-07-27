export default class Proto {
  constructor() {
    Array.prototype.random = function () {
      const random = this[Math.floor(Math.random() * this.length)];
      return random;
    };
  }
}
