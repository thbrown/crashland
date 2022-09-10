import { Actor } from "./Actor";

export class PlanetInfo extends Actor {
  constructor(x, y, level) {
    super();
    this.x = x;
    this.y = y;
    this.level = level;
  };

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "23px Helvetica";
    ctx.fillText(`Planet: ${this.level.pn}`, this.x, this.y);
  }

  update(collisions, globalCounter) {}
}
