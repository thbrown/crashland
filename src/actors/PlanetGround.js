import { Actor } from "./Actor";
import { WIDTH, HEIGHT } from "../Constants";

export class PlanetGround extends Actor {
  constructor(level) {
    super();
    this.x = Number.MIN_SAFE_INTEGER/2;
    this.y = WIDTH/2-1; // -1 ensures overlap with atmosphere
    this.w = Number.MAX_SAFE_INTEGER;
    this.h = Number.MAX_SAFE_INTEGER;
    this.level = level;
    this.collide = true;
  };

  draw(ctx) {
    ctx.fillStyle = this.level.pc;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  

  update() {}
}
