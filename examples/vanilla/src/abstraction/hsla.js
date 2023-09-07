export class HSLA {
  constructor(h = 0, s = 0, l = 0, a = 0) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.a = a;
  }

  toString() {
    return `hsla(${this.h}, ${this.s * 100}%, ${this.l * 100}%, ${this.a})`;
  }
}
