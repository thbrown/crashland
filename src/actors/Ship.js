import { Actor } from "./Actor";

export class Ship extends Actor {
  constructor(grid) {
    // Add all components
    for (let compKey of grid.components) {
    }

    // Calc center of mass
    let COM = this._getCenterOfMass(Object.keys(grid));

    this.x = COM.x;
    this.y = COM.y;
    this.theta = 0;

    this.vx = 0;
    this.vy = 0;
    this.vTheta = 0;

    this.parts = [];
  }

  _getCenterOfMass() {}

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).fill();
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();
    ctx.restore();
  }

  update() {}
}
