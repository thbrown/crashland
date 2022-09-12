import { Actor } from "./Actor";

import { randomIntFromInterval, toRad } from "../Utils.js";
import { WIDTH, HEIGHT } from "../Constants.js";

const SPACE_SHIP =
  new Path2D(`M73.7,188.3l-37.4,5.7c-2.9,0.4-5.9-0.9-7.5-3.4L14.8,167.8c-0.7-1.2-1.1-2.7-1.0-4.1
  c-0.0-0.1-0.0-0.2-0.0-0.3v-48.0c0-4.1,3.3-7.5,7.5-7.5s7.5,3.3,7.5,7.5v19.9L58.7,81.8l15.0,25.7
    V188.3z M196.9,107.8c-4.1,0-7.5,3.3-7.5,7.5v19.9l-29.9-53.3l-15.0,25.7v80.7l37.4,5.7
    c2.9,0.4,5.9-0.9,7.5-3.4l13.9-22.7c0.7-1.2,1.1-2.7,1.0-4.1c0.0-0.1,0.0-0.2,0.0-0.3
    v-48.0C204.4,111.2,201.0,107.8,196.9,107.8z M129.3,188.6l-12.8,9.5v12.4c0,4.1-3.3,7.5-7.5,7.5
    c-4.1,0-7.5-3.3-7.5-7.5v-12.4l-12.8-9.5v-83.1c0-1.3-0.3-2.6-1.0-3.7l-20.5-35.0l35.3-62.9
    C103.8,1.4,106.3,0,109.0,0c2.7,0,5.2,1.4,6.5,3.8l35.3,62.9l-20.5,35.0
    c-0.6,1.1-1.0,2.4-1.0,3.7V188.6z M129.3,68.6c3.1-2.6,3.6-7.3,1.0-10.5
    c-0.8-1.0-8.8-10.2-21.0-10.2c-12.1,0-20.4,9.0-21.3,10.1c-2.7,3.1-2.4,7.8,0.6,10.6
    c1.4,1.2,3.1,1.8,4.9,1.8c2.0,0,4.1-0.8,5.6-2.5c1.2-1.4,5.5-5.0,10.0-5.0
    c5.3,0,9.5,4.8,9.5,4.8C121.4,70.7,126.1,71.2,129.3,68.6z`);

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
