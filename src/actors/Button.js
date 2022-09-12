import { Actor } from "./Actor";
import { Mouse } from "./Mouse.js";

import { isCollidingWith } from "../Utils.js";

export class Button extends Actor {
  constructor(
    x,
    y,
    w,
    h,
    text,
    buttonColor,
    textColor,
    font,
    yOffset,
    mouse,
    onClick,
    centered,
    buffer
  ) {
    super(x,y);
    this.text = text;
    this.buttonColor = buttonColor;
    this.originalButtonColor = buttonColor;
    this.textColor = textColor;
    this.originalTextColor = textColor;
    this.w = w;
    this.h = h;
    this.collide = true;
    this.onClick = onClick;
    this.mouse = mouse;
    this.font = font;
    this.yOffset = yOffset;
    this.centered = centered;
    this.buffer = buffer === undefined ? 20 : buffer;
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.buttonColor;
    ctx.strokeStyle = this.textColor;

    ctx.font = this.font;

    let xOffset = 0;
    if(this.centered) {
      xOffset = ctx.measureText(this.text).width / 2;
      this.xAdj = -xOffset;
    }

    ctx.roundRect(this.x - xOffset, this.y, this.w + 5, this.h, 10).fill();
    ctx.roundRect(this.x - xOffset, this.y, this.w + 5, this.h, 10).stroke();

    ctx.fillStyle = this.textColor;

    ctx.fillText(this.text, this.x + this.buffer - xOffset, this.y + this.yOffset);
    ctx.restore();
  }

  update(collisions) {
    let mouseClicked = false;
    if (isCollidingWith(Mouse, collisions)) {
      this.buttonColor = this.originalTextColor;
      this.textColor = this.originalButtonColor;
      mouseClicked = true;
      if (this.mouse.click) {
        this.mouse.click = false;
        this.onClick();
        return true;
      }
    }
    if (!mouseClicked) {
      this.buttonColor = this.originalButtonColor;
      this.textColor = this.originalTextColor;
    }
  }
}
