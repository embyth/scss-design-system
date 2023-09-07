export class Screen {
  constructor() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  get width() {
    this.innerWidth = window.innerWidth;
    return this.innerWidth;
  }

  get height() {
    this.innerHeight = window.innerHeight;
    return this.innerHeight;
  }

  get centerX() {
    return this.width / 2;
  }

  get centerY() {
    return this.height / 2;
  }
}
