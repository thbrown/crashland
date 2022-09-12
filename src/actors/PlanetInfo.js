import { Actor } from "./Actor";
import { f } from "../Utils";

export class PlanetInfo extends Actor {
  constructor(x, y, level) {
    super(x,y);
    this.level = level;
  };

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = f(23);
    ctx.fillText(`Planet: ${this.level.pn}`, this.x, this.y);
  }

  update(collisions, globalCounter) {}
}
