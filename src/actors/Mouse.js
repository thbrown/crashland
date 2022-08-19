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

  update(col, count, all) {
    if (this.dragged) {
      if (!this.click) {
        if (this.dragged.onRelease) {
          this.dragged.onRelease();
        }
        this.dragged = undefined;
        return;
      }
      // Move dragged to the top of the draw list (TODO: only do this once)
      all.sort(
        function (x, y) {
          return x == this.dragged ? 1 : y == this.dragged ? -1 : 0;
        }.bind(this)
      );
      this.dragged.x = this.x - this.dragged.w / 2;
      this.dragged.y = this.y - this.dragged.h / 2;
    }
  }
}
