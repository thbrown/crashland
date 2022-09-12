import { Actor } from "./Actor";
import { PPM } from "../Constants";
import { HEIGHT } from "../Constants";
import { f } from "../Utils";

// https://stackoverflow.com/questions/1583123/circular-buffer-in-javascript
const createRingBuffer = function (length) {
  var pointer = 0,
    buffer = [];

  return {
    get: function (key) {
      return buffer[key];
    },
    push: function (item) {
      buffer[pointer] = item;
      pointer = (length + pointer + 1) % length;
    },
    avg: function () {
      let sum = 0;
      let count = 0;
      for (let i = 0; i < buffer.length; i++) {
        sum += buffer[i] === undefined ? 0 : buffer[i];
        count += buffer[i] === undefined ? 0 : 1;
      }
      return sum / count;
    },
  };
};

export class Speedometer extends Actor {
  constructor(x, y, ship, ground) {
    super(x,y);
    this.ship = ship;
    this.ground = ground;
    this.times = createRingBuffer(50);
  }

  draw(ctx) {
    if (this.lastUpdateTime === undefined) {
      this.lastUpdateTime = new Date();
      return;
    }
    ctx.fillStyle = "white";
    ctx.font = f(23);
    let velocityMagnitude = Math.sqrt(
      Math.pow(this.ship.vx, 2) + Math.pow(this.ship.vy, 2)
    );
    let elapsed = (new Date() - this.lastUpdateTime) / 1000;
    this.times.push(elapsed);
    ctx.fillText(
      `Velocity: ${(velocityMagnitude / this.times.avg() / PPM).toFixed(
        2
      )} m/s`,
      this.x + 30,
      this.y - 30
    );
    this.lastUpdateTime = new Date();

    ctx.fillText(
      `Altitude: ${(-((this.ship.y + this.ship.COM.y) - this.ground.y)/PPM).toFixed(2)} m`,
      this.x + 30,
      this.y - 60
    );
  }

  update(collisions, globalCounter) {}
}
