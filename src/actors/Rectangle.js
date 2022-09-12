import { Actor } from "./Actor";

export class Rectangle extends Actor {
  constructor(x, y, w, h, color, fill) {
    super(x,y);
    this.w = w;
    this.h = h;
    this.color = color;
    this.fill = fill;
  }

  draw(ctx) {
    ctx.save();
    let rect = ctx.roundRect(this.x, this.y, this.w, this.h, 10);
    if (this.fill) {
      ctx.fillStyle = this.color;
      rect.fill();
    } else {
      ctx.strokeStyle = this.color;
      rect.stroke();
    }
    ctx.restore();
  }
}
