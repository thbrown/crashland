import { Actor } from "./Actor";
import { WIDTH } from "../Constants";


const SPACE_LINE = -3000;

export class PlanetAtmosphere extends Actor {
  constructor(line) {
    super();
    // Number.MAX_SAFE_INTEGER is too big apparently, nothing appears to be drawn when using it
    const BIG_NUMBER = 999999;

    this.x = -BIG_NUMBER;
    this.y = -WIDTH/2;
    this.w = Number.MAX_SAFE_INTEGER;
    this.h = BIG_NUMBER;
    this.line = line;
  };

  draw(ctx) {
    ctx.fillStyle = "black";

    ctx.scale(1, -1);

    // Draw the full sky
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // Draw the atmosphere gradient
    var grd = ctx.createLinearGradient(this.x, this.y, this.x, this.y-this.line);
    grd.addColorStop(0, "rgb(135,206,235)");
    grd.addColorStop(1, "rgb(0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(this.x, this.y, this.w, -this.line);
  }

  update() {}
}
