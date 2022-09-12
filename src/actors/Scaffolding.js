import { Actor } from "./Actor";
import { DIM } from "../Constants";

const SCAFFOLDING = new Path2D(
  "M587.4 139.2h-16.9a8.4 8.4 0 0 0-8.4 8.4h33.8a8.4 8.4 0 0 0-8.4-8.4zm-42.2 25.3v93.0h67.6v-93.0zm-138.2 205.4l74.5-74.5-23.8-23.8-74.5 74.5a8.5 8.5 0 0 1-12.0 0l-75.5-75.5-23.8 23.8 75.5 75.5a8.5 8.5 0 0 1 0 12.0l-75.5 75.5 23.8 23.8 75.5-75.5a8.5 8.5 0 0 1 12.0 0l74.5 74.5 23.8-23.8-74.5-74.5c-3.2-3.3-3.2-8.6 0-12.0zm54.9-117.9l1.6 1.6h.086v.082l29.8 29.8 4.3 4.3 30.5-30.4v-71.7zm-238.0-66.3v71.7l30.5 30.5 35.1-35.2v-.086h.086l.59-.594zm-42.2-46.4h-16.9c-4.6.016-8.4 3.7-8.4 8.4h33.8a8.4 8.4 0 0 0-8.4-8.4zm-42.2 25.3v93.0h67.6v-93.0zm16.9 109.9v202.9h33.8v-202.9zm0 329.8c.012 4.6 3.7 8.4 8.4 8.4h16.9a8.4 8.4 0 0 0 8.4-8.4zm-16.9-109.9v93.0h67.6v-93.0zm150.3 4.9h-.086v-.086l-35.1-35.1-30.5 30.4v71.7l66.3-66.3zm208.1-35.3l-4.3 4.3-29.7 29.8v.086h-.086l-1.6 1.6 66.3 66.3v-71.7zm64.3 140.3a8.4 8.4 0 0 0 8.4 8.4h16.9a8.4 8.4 0 0 0 8.4-8.4zm-16.9-109.9v93.0h67.6v-93.0zm16.9-219.8v202.9h33.8v-202.9z"
);
export class Scaffolding extends Actor {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.h = DIM;
    this.w = DIM;
  }

  draw(ctx) {
    // Draw space station graphic
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.translate(-16, -11);
    ctx.scale(0.11, 0.098);
    ctx.fillStyle = "white";
    ctx.fill(SCAFFOLDING);
    ctx.restore();
  }
}
