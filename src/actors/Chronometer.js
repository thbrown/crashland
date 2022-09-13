import { Actor } from "./Actor";
import { startCountBeep, stopCountBeep, f, adjMusic, stopMusic } from "../Utils";

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
    } else {
      ctx.fillStyle = "white";
    }

    // TODO: music adj here too
    // TODO: should this go in update??
    if(displayTime < 10 && this.lockedTime === undefined) {
      this.hud.s = 10 - Math.floor(displayTime);
      startCountBeep();
    } else {
      this.hud.s = 0;
    }

    if(this.lockedTime === undefined) {
      adjMusic(1 + 1*(elapsedTimeMs/this.level.t));
    }
    
    ctx.fillText(
      `Remaining Time: ${displayTime}s`,
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

    if(this.lockedTime !== undefined) {
      this.hud.s = 0;// Stop shaking
      adjMusic(1); // Stop fast playback
      stopMusic();
    }


  }
}
