import { Actor } from "./Actor";
import { DIM } from "../Constants";

const SCAFFOLDING = new Path2D(
  "M587 139h-16.9a8 8 0 0 0-8 8h33a8 8 0 0 0-8-8zm-42 25v93h67v-93zm-138 205l74-74-23-23-74 74a8 8 0 0 1-12 0l-75-75-23 23 75 75a8 8 0 0 1 0 12l-75 75 23 23 75-75a8 8 0 0 1 12 0l74 74 23-23-74-74c-3-3-3-8 0-12zm54-117l1 1h.086v.082l29.8 29.8 4.3 4.3 30.5-30.4v-71.7zm-238.0-66.3v71.7l30.5 30.5 35.1-35.2v-.086h.086l.59-.594zm-42.2-46.4h-16.9c-4.6.016-8.4 3.7-8.4 8.4h33.8a8.4 8.4 0 0 0-8.4-8.4zm-42.2 25.3v93.0h67.6v-93.0zm16.9 109.9v202.9h33.8v-202.9zm0 329.8c.012 4.6 3.7 8.4 8.4 8.4h16.9a8.4 8.4 0 0 0 8.4-8.4zm-16.9-109.9v93.0h67.6v-93.0zm150.3 4.9h-.086v-.086l-35.1-35.1-30.5 30.4v71.7l66.3-66.3zm208.1-35.3l-4.3 4.3-29.7 29.8l-1 1 66 66v-71zm64 140a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8zm-16-109v93h67v-93zm16-219v202h33v-202z"
);
export class Scaffolding extends Actor {
  constructor(x, y) {
    super(x,y);
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
