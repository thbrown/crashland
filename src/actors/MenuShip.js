import { Actor } from "./Actor";

import { randomIntFromInterval, toRad } from "../Utils.js";
import { WIDTH, HEIGHT } from "../Constants.js";

const SPACE_SHIP =
  new Path2D(`M73,188l-37,5c-2,0-5-0-7-3L14,167c-0-1-1-2-1-4
  c-0-0-0-0-0-0v-48c0-4,3-7,7-7s7,3,7,7v19L58,81l15,25
    V188z M196,107c-4,0-7,3-7,7v19l-29-53l-15,25v80l37,5
    c2,0,5-0,7-3l13-22c0-1,1-2,1-4c0-0,0-0,0-0
    v-48C204,111,201,107,196,107z M129,188l-12,9v12c0,4-3,7-7,7
    c-4,0-7-3-7-7v-12l-12-9v-83c0-1-0-2-1-3l-20-35l35-62
    C103,1,106,0,109,0c2,0,5,1,6,3l35,62l-20,35
    c-0,1-1,2-1,3V188z M129,68c3-2,3-7,1-10
    c-0-1-8-10-21-10c-12,0-20,9-21,10c-2,3-2,7,0,10
    c1,1,3,1,5,1c2,0,4-0,5-2c1-1,5-5,10-5
    c5,0,9,4,9,4C121,70,126,71,129,68z`);

export class MenuShip extends Actor {
  constructor(x, y, angle) {
    super();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.xShake = 0;
    this.yShake = 0;
    this.speed = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.rotate(toRad(this.angle));
    ctx.translate(this.x + this.xShake, this.y + this.yShake);
    ctx.lineWidth = 3;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.fill(SPACE_SHIP);
    ctx.restore();
  }

  update() {
    this.xShake = randomIntFromInterval(-2, 2);
    this.yShake = randomIntFromInterval(-2, 2);
    this.y += this.speed;
  }
}
