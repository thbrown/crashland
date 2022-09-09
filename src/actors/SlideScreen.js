import { Actor } from "./Actor";
import { WIDTH, HEIGHT } from "../Constants";

const MARGIN = 200;
const DURATION = 120;

export class SlideScreen extends Actor {
  constructor(startCounter) {
    super();
    this.startCounter = startCounter;
    this.progress = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,.93)";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.roundRect(
      (0 + MARGIN / 2) - (1-this.progress)*(2*WIDTH),
      0 + MARGIN / 2,
      WIDTH - MARGIN,
      HEIGHT - MARGIN, 10
    ).fill();
    ctx.roundRect(
      (0 + MARGIN / 2)  - (1-this.progress)*(2*WIDTH),
      0 + MARGIN / 2,
      WIDTH - MARGIN,
      HEIGHT - MARGIN,
      10
    ).stroke();
    ctx.restore();
  }

  update(colls, counter) {
    this.progress = Math.min((counter - this.startCounter) / DURATION, 1);
  }
}
