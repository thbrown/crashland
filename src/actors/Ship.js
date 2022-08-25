import { Actor } from "./Actor";
import { DIM } from "../Constants";
import { toDeg, toRad } from "../Utils";

const mass = 100; // mass of one tile/square/part/component

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

    // Calc mass
    this.mass = this.parts.length * mass;

    // Calc bounding box
    let minX = this.parts.reduce(function (prev, curr) {
      return prev.x < curr.x ? prev : curr;
    }).x;
    let maxX = this.parts.reduce(function (prev, curr) {
      return prev.x > curr.x ? prev : curr;
    }).x;
    let minY = this.parts.reduce(function (prev, curr) {
      return prev.y < curr.y ? prev : curr;
    }).y;
    let maxY = this.parts.reduce(function (prev, curr) {
      return prev.y > curr.y ? prev : curr;
    }).y;
    this.w = maxX - minX + DIM;
    this.h = maxY - minY + DIM;

    // Components coordinates are relative to the ship
    for (let part of this.parts) {
      part.x = part.x - minX;
      part.y = part.y - minY;
    }

    // Calc center of mass
    this.COM = this._getCenterOfMass(this.parts);
    this.I = this._getMomentOfInertia(this.parts, this.COM);
    console.log(this.I);

    this.x = x; //this.COM.x - this.w / 2;
    this.y = y; //this.COM.y - this.h / 2;
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

      // Treating all squares as circles for simplicity
      if (dist < DIM) {
        // What if COM is inside the circle??
        // COM of flat disk = .5*m*r^2 (http://hyperphysics.phy-astr.gsu.edu/hbase/tdisc.html)
        let circleMoi = 0.5 * mass * Math.pow(DIM, 2);
        // parallel axis theorem: I_s = I_cm + m*d^2
        moi += circleMoi + mass * Math.pow(dist, 2);
      } else {
        // Component is not inside the COM
        moi += mass * dist * dist;
      }
    }
    return moi;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).fill();
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    // Make the center of the ship the origin
    ctx.translate(this.x + this.COM.x, this.y + this.COM.y);
    ctx.rotate(toRad(this.theta));
    ctx.translate(-this.COM.x, -this.COM.y); // Keep drawing from top-left corner

    for (let part of this.parts) {
      part.draw(ctx);
    }

    // Point at COM
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.arc(this.COM.x, this.COM.y, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.restore();
  }

  update(collisions, globalCounter) {
    for (let part of this.parts) {
      part.update(collisions, globalCounter);
    }

    // Now determine how much each component affects the ship's translational and angular velocity
    for (let part of this.parts) {
      let thrust = part.getThrust();
      let xVelDelta =
        (thrust * Math.sin(toRad(part.angle + this.theta))) / this.mass;
      let yVelDelta =
        (-thrust * Math.cos(toRad(part.angle + this.theta))) / this.mass;

      let distToCOMx = this.COM.x - (part.x + part.w / 2);
      let distToCOMy = this.COM.y - (part.y + part.h / 2);

      // W_f = l * P / I
      let changeX = distToCOMx * thrust * Math.cos(toRad(part.angle));
      let changeY = distToCOMy * thrust * Math.sin(toRad(part.angle));
      this.vTheta += toDeg(changeX + changeY) / this.I;
      this.vx += xVelDelta;
      this.vy += yVelDelta;


      // Determine new w/h
    }

    // Now apply velocity to the ship
    this.x += this.vx;
    this.y += this.vy;
    this.theta += this.vTheta;
  }
}
