import { createNoise3D } from 'simplex-noise';
import { Particle } from './particle';
import { Screen } from './screen';
import { Config } from './config';
import type { NoiseFunction3D } from 'simplex-noise';

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
    particle.pastX = particle.x;
    particle.pastY = particle.y;
    particle.x = this.screen.width * Math.random();
    particle.y = this.screen.height * Math.random();
    particle.color.h =
      this.hueBase + (Math.atan2(this.screen.centerY - particle.y, this.screen.centerX - particle.x) * 180) / Math.PI;
    particle.color.s = 1;
    particle.color.l = 0.5;
    particle.color.a = 0;
  }

  private createParticles(): void {
    for (let index = 0; index < Config.particleNum; index += 1) {
      this.initParticle((this.particles[index] = new Particle()));
    }
  }

  private getNoise(x: number, y: number, z: number): number {
    const octaves = 4;
    const fallout = 0.5;
    let amp = 1;
    let f = 1;
    let sum = 0;

    for (let index = 0; index < octaves; index += 1) {
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

  public draw(context: CanvasRenderingContext2D | null): void {
    for (let index = 0; index < this.particles.length; index += 1) {
      const p = this.particles[index];

      p.pastX = p.x;
      p.pastY = p.y;

      const angle =
        Math.PI * 6 * this.getNoise((p.x / Config.base) * 1.75, (p.y / Config.base) * 1.75, this.zIndexOffset);
      p.x += Math.cos(angle) * Config.step;
      p.y += Math.sin(angle) * Config.step;

      if (p.color.a < 1) {
        p.color.a += 0.003;
      }

      if (context) {
        context.beginPath();
        context.strokeStyle = p.color.toString();
        context.moveTo(p.pastX, p.pastY);
        context.lineTo(p.x, p.y);
        context.stroke();
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
