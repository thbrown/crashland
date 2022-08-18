import { Actor } from "./Actor";
import { WIDTH, HEIGHT } from "../Constants.js";
import { getColor } from "../Utils.js";

export class Background extends Actor {
  constructor() {
    super();
    this.fadeStart = 99999999999;
    this.color = "black";
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
  }

  update(collisions, globalCounter) {
    if (this.fadeStart <= globalCounter) {
      let progress = (globalCounter - this.fadeStart) / 150;
      if (progress >= 1) {
        this.color = "rgb(135,206,235)";
      } else {
        this.color = getColor(progress, [
          "rgb(0,0,0)", // Black
          "rgb(135,206,235)", // Sky Blue
        ]);
        this.x += this.speed;
      }
    }
  }
}
