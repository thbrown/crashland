import { Actor } from "./Actor";

const ROTATE =
  new Path2D(`M202.403,95.22c0,46.312-33.237,85.002-77.109,93.484v25.663l-69.76-40l69.76-40v23.494
c27.176-7.87,47.109-32.964,47.109-62.642c0-35.962-29.258-65.22-65.22-65.22s-65.22,29.258-65.22,65.22
c0,9.686,2.068,19.001,6.148,27.688l-27.154,12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964,42.716,54.68,0,107.184,0
S202.403,42.716,202.403,95.22z`);

export class Rotate extends Actor {
  constructor(xOff, yOff, comp) {
    super();
    this.xOff = xOff;
    this.yOff = yOff;
    this.comp = comp;
    this.collide = true;
    this.w = 48;
    this.h = 48;
  }

  draw(ctx) {
    ctx.save();
    ctx.lineWidth = 1;
    //ctx.roundRect(this.x, this.y, this.w, this.h, 5).stroke();

    ctx.translate(this.x + 13, this.y + 13);
    ctx.lineWidth = 3;
    ctx.fillStyle = "white";

    ctx.scale(0.1, 0.1);
    ctx.fill(ROTATE);
    ctx.restore();
  }

  update() {
    this.x = this.comp.x + this.xOff;
    this.y = this.comp.y + this.yOff;
  }
}
