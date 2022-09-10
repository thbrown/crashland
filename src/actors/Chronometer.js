import { Actor } from "./Actor";

export class Chronometer extends Actor {
  constructor(x, y, hud) {
    super();
    this.x = x;
    this.y = y;
    this.hud = hud;
    this.lockedTime = undefined;
  };

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "23px Helvetica";

    if(this.lockedTime !== undefined) {
      ctx.fillText(`Elapsed Time: ${this.lockedTime.toFixed(1)} sec`, this.x + 30, this.y - 30);
    } else {
      let finishTime = new Date();
      let elapsedTimeMs = Math.abs(finishTime - this.hud.startTime)/1000;
      ctx.fillText(`Elapsed Time: ${elapsedTimeMs.toFixed(1)} sec`, this.x + 30, this.y - 30);
    }
  }

  update(collisions, globalCounter) {

  }
}
