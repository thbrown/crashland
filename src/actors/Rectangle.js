import { Actor } from "./Actor";

export class Rectangle extends Actor {
  constructor(x, y, w, h, color) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();
    ctx.restore();
  }
}
