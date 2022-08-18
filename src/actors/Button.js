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
    onClick
  ) {
    super();
    this.x = x;
    this.y = y;
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
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.buttonColor;
    ctx.strokeStyle = this.textColor;

    ctx.roundRect(this.x, this.y, this.w, this.h, 10).fill();
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();

    ctx.fillStyle = this.textColor;
    ctx.font = this.font;
    ctx.fillText(this.text, this.x + 20, this.y + this.yOffset);
    ctx.restore();
  }

  update(collisions) {
    let mouseClicked = false;
    if (isCollidingWith(Mouse, collisions)) {
      this.buttonColor = this.originalTextColor;
      this.textColor = this.originalButtonColor;
      mouseClicked = true;
      if (this.mouse.click) {
        // TODO: this happens if you click off the button and drag onto it
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
