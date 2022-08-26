import { Actor } from "./Actor";
import { WIDTH } from "../Constants";

export class PlanetGround extends Actor {
  constructor() {
    super();
    this.x = Number.MIN_SAFE_INTEGER/2;
    this.y = WIDTH/2;
    this.w = Number.MAX_SAFE_INTEGER;
    this.h = Number.MAX_SAFE_INTEGER;
  };

  draw(ctx) {
    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {}
}
