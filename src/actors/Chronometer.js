import { Actor } from "./Actor";
import { startCountBeep, stopCountBeep, f } from "../Utils";

export class Chronometer extends Actor {
  constructor(x, y, hud, level, ship, onExpire) {
    super(x,y);
    this.hud = hud;
    this.lockedTime = undefined;
    this.level = level;
    this.onExpire = onExpire;
    this.ship = ship;
  };

  draw(ctx) {
    ctx.font = f(23);

    let finishTime = new Date();
    let elapsedTimeMs = Math.abs(finishTime - this.hud.startTime)/1000;
    let displayTime = this.lockedTime !== undefined ? (this.level.t - this.lockedTime).toFixed(1) : (this.level.t - elapsedTimeMs).toFixed(1);

    if(displayTime < 10) {
      ctx.fillStyle = "red"; // TODO: gradient here
      // TODO: music adj here too
    } else {
      ctx.fillStyle = "white";
    }

    if(displayTime < 10 && this.lockedTime === undefined) {
      startCountBeep();
    }
    
    ctx.fillText(
      `Remaining Time: ${displayTime} sec`,
      this.x + 30,
      this.y - 30
    );
  }

  freeze(val) {
    stopCountBeep();
    if(val === undefined) {
      let finishTime = new Date();
      let elapsedTimeMs = Math.abs(finishTime - this.hud.startTime)/1000;
      this.lockedTime = elapsedTimeMs;
    } else {
      this.lockedTime = this.level.t;
    }
  }

  update(collisions, globalCounter) {
    let finishTime = new Date();
    let elapsedTimeMs = Math.abs(finishTime - this.hud.startTime)/1000;
    let remainingTime = this.level.t - elapsedTimeMs;
    if(remainingTime <= 0 && this.lockedTime === undefined) {
      this.ship.timeout = true;
      this.onExpire(this.ship, globalCounter, "timeout", this);
    }
  }
}
