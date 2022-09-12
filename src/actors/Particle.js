import { Actor } from "./Actor";
import { getColor, randomIntFromInterval } from "../Utils.js";

export class Particle extends Actor {
  constructor(x, y, angle, length, size, color, spread, velocity) {
    super(x,y);
    this.speed = velocity ? velocity : 15;
    this.angle = angle;
    this.length = length;
    this.size = size;
    this.initialColor = color;
    this.color = color[0];
    this.counter = 0;
    this.spread = spread;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw circle
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x -=
      this.speed * Math.sin((-this.angle / 360) * 2 * Math.PI) +
      randomIntFromInterval(-this.spread, this.spread);
    this.y -=
      this.speed * Math.cos((-this.angle / 360) * 2 * Math.PI) +
      randomIntFromInterval(-this.spread, this.spread);
    this.size = Math.max(this.size + randomIntFromInterval(0, 3), 0);

    this.color = getColor(this.counter / this.length, this.initialColor);

    this.counter++;
    if (this.counter > this.length) {
      return true;
    }
  }
}
