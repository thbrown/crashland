import { Actor } from "./Actor";

export class Text extends Actor {
  constructor(x, y, value, font, centered, color) {
    super();
    this.x = x;
    this.y = y;
    this.value = value;
    this.font = font;
    this.centered = centered;
    this.color = color;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color ? this.color : "white";
    ctx.font = this.font;
    let xOffset = 0;
    if(this.centered) {
      xOffset = ctx.measureText(this.value).width / 2;
    }
    ctx.fillText(this.value, this.x - xOffset, this.y);
    ctx.restore();
  }

  //update() {}
}
