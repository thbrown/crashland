import { Actor } from "./Actor";
import { PPM, FPS } from "../Constants";

export class Speedometer extends Actor {
  constructor(x, y, ship) {
    super();
    this.x = x;
    this.y = y;
    this.ship = ship;
  };

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "23px Helvetica";
    let velocityMagnitude = Math.sqrt(Math.pow(this.ship.vx,2) + Math.pow(this.ship.vy,2));
    velocityMagnitude = velocityMagnitude;
    ctx.fillText(`Velocity: ${velocityMagnitude.toFixed(2)} m/s`, this.x + 30, this.y - 30);
  }

  update(collisions, globalCounter) {

  }
}
