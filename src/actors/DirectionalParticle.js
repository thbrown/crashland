import { Actor } from "./Actor";
import { Particle } from "./Particle";

export class DirectionalParticle extends Actor {
  constructor(x, y, angle, count, frequency, length, size, color, spread, velocity) {
    super();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.size = size;
    this.color = color;
    this.particles = [];
    this.count = count;
    this.frequency = frequency;
    this.speed = 0;
    this.spread = spread;
    this.velocity = velocity;
  }

  draw(ctx) {
    for (let part of this.particles) {
      part.draw(ctx);
    }
  }

  update() {
    let toRemove = [];

    // Speed here is how fast the set of particles move, not how fast each one moves
    this.x += this.speed;
    this.y += this.speed;

    for (let part of this.particles) {
      if (part.update()) {
        toRemove.push(part);
      }
    }
    // Remove dead parts
    this.particles = this.particles.filter(function (el) {
      return toRemove.indexOf(el) < 0;
    });

    // Add new ones
    let random = Math.random();
    if (random < this.frequency) {
      for (let i = 0; i < this.count; i++) {
        this.particles.push(
          new Particle(
            this.x,
            this.y,
            this.angle,
            this.length,
            this.size,
            this.color,
            this.spread,
            this.velocity
          )
        );
      }
    }
  }
}
