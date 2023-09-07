export class HSLA {
  h: number;

  s: number;

  l: number;

  a: number;

  constructor(h = 0, s = 0, l = 0, a = 0) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.a = a;
  }

  toString(): string {
    return `hsla(${this.h}, ${this.s * 100}%, ${this.l * 100}%, ${this.a})`;
  }
}
