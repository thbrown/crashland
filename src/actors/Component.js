import { Actor } from "./Actor";
import { Rotate } from "./Rotate";
import { Mouse } from "./Mouse.js";

import { collide, isCollidingWith } from "../Utils.js";

function getThrusterPath(dim, wid, ang) {
  return `m 0 ${dim} l ${dim / 2 - wid / 2} ${-wid} l ${ang} ${ang} l ${-ang} ${
    wid - ang
  } h ${wid} l ${-ang} ${-(wid - ang)} l ${ang} ${-ang} l ${
    dim / 2 - wid / 2
  } ${wid} v ${-dim} h ${-dim} v ${dim}`;
}
const SML_THRUST = new Path2D(getThrusterPath(50, 10, 1));
const MED_THRUST = new Path2D(getThrusterPath(50, 16, 3));
const LAR_THRUST = new Path2D(getThrusterPath(50, 30, 5));
const CARGO = new Path2D(
  `m 0 0 v 20 h 20 v 10 h -20 v 20 h 20v -20h 10 v 20 h 20 v -20h -20 v -10 h 20 v -20 h -20 v 20 h -10 v -20 h -20`
);
const COMMAND = new Path2D(`m 0 50 h 50 v -50 h -50 v 50`);

export const COMP_TYPE = [
  { name: "Command Module", sprite: COMMAND, attach: [1, 1, 1, 1] },
  { name: "Small Thruster", sprite: SML_THRUST, attach: [1, 1, 1, 0] },
  { name: "Medium Thruster", sprite: MED_THRUST, attach: [1, 1, 1, 0] },
  { name: "Large Thruster", sprite: LAR_THRUST, attach: [1, 1, 1, 0] },
  { name: "Cargo Container", sprite: CARGO, attach: [1, 1, 1, 1] },
];

export const TYPES = [
  () => {
    return new CommandModule();
  },
  () => {
    return new SmallThruster();
  },
  () => {
    return new MediumThruster();
  },
  () => {
    return new LargeThruster();
  },
  () => {
    return new CargoContainer();
  },
];

export class Component extends Actor {
  constructor(x, y, angle, mouse, grid, type, key) {
    super();
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.angle = angle;
    this.collide = true;
    this.mouse = mouse;
    this.grid = grid;
    this.rot = new Rotate(50, 0, this);
    this.onRelease = function () {
      let targetLocation = this.grid.getClosestValidLocation(this.x, this.y);
      if (targetLocation === undefined) {
        return;
      }
      let locSplit = targetLocation.split(",");
      let locX = parseInt(locSplit[0]);
      let locY = parseInt(locSplit[1]);

      this.grid.addComponent(this, locX, locY);
    };
    this.rotToggle = true;
    this.type = type;
    this.key = key;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate((this.angle * Math.PI) / 180);

    ctx.strokeStyle = this.color;
    ctx.roundRect(-this.w / 2, -this.h / 2, this.w, this.h, 5).fill();
    ctx.roundRect(-this.w / 2, -this.h / 2, this.w, this.h, 5).stroke();

    // Rotation calibration line, points up by default
    //ctx.beginPath();
    //ctx.moveTo(0, 0);
    //ctx.lineTo(0, -this.h / 2);
    //ctx.stroke();

    // Draw
    ctx.translate(-this.w / 2, -this.h / 2);
    ctx.fillStyle = "gold";
    ctx.fill(this.type.sprite);
    ctx.restore();

    // Draw label and rotation icon
    ctx.fillStyle = "white";
    ctx.font = "16px Helvetica";
    if (!this.grid.getKey(this)) {
      ctx.fillText(this.type.name, this.x, this.y - 10);
      this.rot.draw(ctx);
      if (
        collide(this.mouse, this.rot) &&
        this.mouse.click &&
        this.mouse.dragged === undefined
      ) {
        if (this.rotToggle) {
          this.angle = (this.angle + 90) % 360;
          this.rotToggle = false;
        }
      } else {
        this.rotToggle = true;
      }
    }

    // Draw activation key press
    if (this.key) {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x + 18, this.y + 15, 15, 17);
      ctx.roundRect(this.x + 18, this.y + 15, 15, 17).fill();
      ctx.fillStyle = "white";
      ctx.font = "15px Helvetica";
      ctx.fillText(this.key, this.x + this.w / 2.5, this.y + this.h / 1.7);
    }

    ctx.restore();
  }

  update(collisions, globalCounter) {
    if (isCollidingWith(Mouse, collisions)) {
      //this.buttonColor = this.originalTextColor;
      //this.textColor = this.originalButtonColor;
      //mouseClicked = true;
      if (this.mouse.click && !this.mouse.dragged) {
        this.mouse.dragged = this;

        // Remove this component from the grid (if it's on the grid)
        let key = this.grid.getKey(this);
        if (key) {
          delete this.grid.components[key];
        }
      }
    }
    this.rot.update();
  }
}
