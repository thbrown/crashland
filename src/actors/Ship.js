import { Actor } from "./Actor";
import { DIM } from "../Constants";

export class Ship extends Actor {
  constructor(x, y, grid, keyboard) {
    super();
    this.parts = [];
    this.keyboard = keyboard;

    // Add all components
    for (let compKey of Object.keys(grid.components)) {
      let part = grid.components[compKey];
      let locSplit = compKey.split(",");
      let locX = parseInt(locSplit[0]);
      let locY = parseInt(locSplit[1]);
      part.x = locX * DIM;
      part.y = locY * DIM;
      this.parts.push(part);
    }

    // Calc bounding box
    let minX = this.parts.reduce(function (prev, curr) {
      return prev.x < curr.x ? prev : curr;
    });
    let maxX = this.parts.reduce(function (prev, curr) {
      return prev.x > curr.x ? prev : curr;
    });
    let minY = this.parts.reduce(function (prev, curr) {
      return prev.y < curr.y ? prev : curr;
    });
    let maxY = this.parts.reduce(function (prev, curr) {
      return prev.y > curr.y ? prev : curr;
    });
    this.w = maxX.x - minX.x + DIM;
    this.h = maxY.y - minY.y + DIM;

    // Calc center of mass
    let COM = this._getCenterOfMass(this.parts);

    this.x = COM.x - this.w / 2;
    this.y = COM.y - this.h / 2;
    this.theta = 0;

    this.vx = 0;
    this.vy = 0;
    this.vTheta = 0;
  }

  _getCenterOfMass(items) {
    let xSum = 0;
    let ySum = 0;
    for (let item of items) {
      xSum += item.x + item.w / 2;
      ySum += item.y + item.h / 2;
    }
    console.log(xSum / items.length, ySum / items.length);
    return { x: xSum / items.length, y: ySum / items.length };
  }

  // http://hyperphysics.phy-astr.gsu.edu/hbase/mi.html
  // For simplicity we'll treat each square as a circle (i.e. whole mass of square is treated as a point mass at the square's center)
  _getMomentOfInertia(items, com) {
    let xCom = com.x;
    let yCom = com.y;

    let moi = 0;
    for (let item of items) {
      let itemCenterX = item.x + item.w / 2;
      let itemCenterY = item.y + item.h / 2;
      let dist = Math.sqrt(
        Math.pow(itemCenterX - xCom, 2) + Math.pow(itemCenterY - yCom, 2)
      );

      // Assume the mass of each square is 1
      moi += 1 * dist * dist;
    }
    return moi;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).fill();
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();

    for (let part of this.parts) {
      part.draw(ctx);
    }

    // Point at COM
    ctx.beginPath();
    ctx.arc(this.x + this.w / 2, this.y + this.h / 2, 2, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.restore();
  }

  update(collisions, globalCounter) {
    for (let part of this.parts) {
      part.update(collisions, globalCounter);
    }
  }
}
