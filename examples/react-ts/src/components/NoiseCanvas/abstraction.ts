import { NoiseFunction3D, createNoise3D } from "simplex-noise";

export const Config = {
  backgroundColor: '#fafafa',
  backgroundColorDark: '#18181b',
  particleNum: 1000,
  step: 5,
  base: 1000,
  zInc: 0.001
} as const;

class HSLA {
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

class Particle {
  x: number;
  y: number;
  color: HSLA;
  pastX: number;
  pastY: number;

  constructor(x = 0, y = 0, color = new HSLA()) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.pastX = this.x;
    this.pastY = this.y;
  }
}

class Screen {
  get width() {
    return window.innerWidth;
  }

  get height() {
    return window.innerHeight;
  }

  get centerX() {
    return this.width / 2;
  }

  get centerY() {
    return this.height / 2;
  }
}

export class AbstractionAnimation {
  private particles: Particle[];
  private noise3D: NoiseFunction3D;
  private hueBase = 0;
  private zIndexOffset = 0;
  private screen: Screen;

  constructor() {
    this.particles = [];
    this.screen = new Screen();
    this.noise3D = createNoise3D();
    this.createParticles();
  }

  private initParticle(particle: Particle) {
    particle.x = particle.pastX = this.screen.width * Math.random();
    particle.y = particle.pastY = this.screen.height * Math.random();
    particle.color.h = this.hueBase + Math.atan2(this.screen.centerY - particle.y, this.screen.centerX - particle.x) * 180 / Math.PI;
    particle.color.s = 1;
    particle.color.l = 0.5;
    particle.color.a = 0;
  }

  private createParticles(): void {
    for (let i = 0; i < Config.particleNum; i++) {
      this.initParticle(this.particles[i] = new Particle());
    }
  };

  private getNoise(x: number, y: number, z: number): number {
    const octaves = 4;
    const fallout = 0.5;
    let amp = 1;
    let f = 1;
    let sum = 0;

    for (let i = 0; i < octaves; ++i) {
      amp *= fallout;
      sum += amp * (this.noise3D(x * f, y * f, z * f) + 1) * 0.5;
      f *= 2;
    }

    return sum;
  }

  private incrementHueBase(): void {
    this.hueBase = (this.hueBase + 0.1) % 360;
  }

  private incrementZIndexOffset(): void {
    this.zIndexOffset += Config.zInc;
  }

  public draw(ctx: CanvasRenderingContext2D | null): void {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.pastX = p.x;
      p.pastY = p.y;

      const angle = Math.PI * 6 * this.getNoise(p.x / Config.base * 1.75, p.y / Config.base * 1.75, this.zIndexOffset);
      p.x += Math.cos(angle) * Config.step;
      p.y += Math.sin(angle) * Config.step;

      if (p.color.a < 1) {
        p.color.a += 0.003;
      }

      if (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = p.color.toString();
        ctx.moveTo(p.pastX, p.pastY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      if (p.x < 0 || p.x > this.screen.width || p.y < 0 || p.y > this.screen.height) {
        // If a particle goes off screen, reset it to a random position
        this.initParticle(p);
      }
    }

    this.incrementHueBase();
    this.incrementZIndexOffset();
  }
}
