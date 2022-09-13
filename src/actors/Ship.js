import { Actor } from "./Actor";
import { DIM } from "../Constants";
import { toDeg, toRad, pthag, isCollidingWith } from "../Utils";
import { CargoContainer } from "./components/CargoContainer";
import { PlanetGround } from "./PlanetGround";

const mass = 100; // mass of one tile/square/part/component

export class Ship extends Actor {
  constructor(x, y, grid, keyboard, level, onCrash) {
    super();
    this.parts = [];
    this.keyboard = keyboard;
    this.yAdj = 0;
    this.xAdj = 0;
    this.collide = true;
    this.freeze = false;
    this.keyboardFreeze = true;
    this.onCrash = onCrash;
    this.level = level;

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

    this.x = x;
    this.y = y;
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
        // Component is not inside the COM (TODO: should this be mult by .5?)
        moi += mass * dist * dist;
      }
    }
    return moi;
  }

  _toShipCoord(x, y) {
    // No
  }

  _toSceneCoord(x, y) {
    let xFromCOM = x - this.COM.x * 1;
    let yFromCOM = y - this.COM.y * 1;

    let magnitude = pthag(xFromCOM, yFromCOM);

    // Why do I need to do this, idk but I do
    if (yFromCOM > 0) {
      magnitude = -magnitude;
    }

    let phi = -toDeg(Math.atan(xFromCOM / yFromCOM));

    return {
      x: this.x + this.COM.x + magnitude * Math.sin(toRad(this.theta + phi)),
      y: this.y + this.COM.y - magnitude * Math.cos(toRad(this.theta + phi)),
    };
  }

  getSceneCoordsOfParts() {
    let partMap = {};
    for (let part of this.parts) {
      for (let corner = 0; corner < 4; corner++) {
        let xAdj = 0;
        let yAdj = 0;
        if (corner === 0) {
          // No adjustments, this is the upper left corner
        } else if (corner === 1) {
          xAdj = DIM;
        } else if (corner === 2) {
          xAdj = DIM;
          yAdj = DIM;
        } else if (corner === 3) {
          yAdj = DIM;
        }
        let mapped = this._toSceneCoord(part.x + xAdj, part.y + yAdj);
        partMap[mapped.x + "|" + mapped.y] = mapped;
      }
    }

    // Convert map to array
    let parts = [];
    for(let key in partMap) {
      parts.push(partMap[key]);
    }

    return parts;
  }

  getCargoCount() {
    let counter = 0;
    for (let part of this.parts) {
      if(part instanceof CargoContainer) {
        counter ++;
      }
    }
    return counter;
  }

  draw(ctx) {
    ctx.save();
    // Bounding Box
    /*
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";
    ctx
      .roundRect(this.x + this.xAdj, this.y + this.yAdj, this.w, this.h, 10)
      .fill();
    ctx
      .roundRect(this.x + this.xAdj, this.y + this.yAdj, this.w, this.h, 10)
      .stroke();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "purple";
    ctx.strokeStyle = "green";
    */

    // Make the COM of the ship the origin
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
    
    // DEBUG: draw part corner points
    /*
    for(let part of this.getSceneCoordsOfParts()) {

      ctx.fillStyle = "purple";
      ctx.strokeStyle = "green";
  
      ctx.beginPath();
      ctx.arc(part.x, part.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
    */
  }

  update(collisions, globalCounter) {
    for (let part of this.parts) {
      part.update(collisions, globalCounter);
    }

    if(this.keyboardFreeze && this.keyboard.length() > 0) {
      this.keyboardFreeze = false
    }

    // Remove ship on timeout
    if(this.timeout) {
      return true;
    }

    // Don't update anything if the ship is frozen
    if(this.freeze || this.keyboardFreeze) {
      return;
    }

    // Crash
    if(isCollidingWith(PlanetGround, collisions)) {
      this.onCrash(this, globalCounter, "crash", this.chron);
      return true;
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
    }

    // TODO: make these altitude dependent
    // Adjust velocity for gravity
    this.vy += .01 * this.level.pg;

    // Adjust velocity for drag
    this.vx = this.vx * .999 * this.level.pa;
    this.vy = this.vy * .999 * this.level.pa;

    // Now apply velocity to the ship
    this.x += this.vx;
    this.y += this.vy;
    this.theta += this.vTheta;

    // Update bounding box
    let minX = 999999;
    let minY = 999999;
    let maxX = -999999;
    let maxY = -999999;
    for (let part of this.parts) {
      // Four corners per square (we'll have duplicate points, but it make the code easier)
      for (let corner = 0; corner < 4; corner++) {
        let xAdj = 0;
        let yAdj = 0;
        if (corner === 0) {
          // No adjustments, this is the upper left corner
        } else if (corner === 1) {
          xAdj = DIM;
        } else if (corner === 2) {
          xAdj = DIM;
          yAdj = DIM;
        } else if (corner === 3) {
          yAdj = DIM;
        }

        let mapped = this._toSceneCoord(part.x + xAdj, part.y + yAdj);
        if (mapped.x > maxX) {
          maxX = mapped.x;
        }

        if (mapped.x < minX) {
          minX = mapped.x;
        }

        if (mapped.y > maxY) {
          maxY = mapped.y;
        }

        if (mapped.y < minY) {
          minY = mapped.y;
        }
      }
    }

    this.w = maxX - minX;
    this.h = maxY - minY;

    this.yAdj = minY - this.y;
    this.xAdj = minX - this.x;
  }
}
