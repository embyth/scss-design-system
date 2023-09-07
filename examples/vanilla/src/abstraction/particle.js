import { HSLA } from './hsla';

export class Particle {
  constructor(x = 0, y = 0, color = new HSLA()) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.pastX = this.x;
    this.pastY = this.y;
  }
}
