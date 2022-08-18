import { Actor } from "./Actor";

export class Mouse extends Actor {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.collide = true;
    this.w = 2;
    this.h = 2;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.w, this.h, 10);
    ctx.restore();
  }

  update() {
    if (this.dragged) {
      if (!this.click) {
        if (this.dragged.onRelease) {
          this.dragged.onRelease();
        }
        this.dragged = undefined;
        return;
      }
      this.dragged.x = this.x - this.dragged.w / 2;
      this.dragged.y = this.y - this.dragged.h / 2;
    }
  }
}
