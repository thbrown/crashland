import { Actor } from "../Actor";
import { Rotate } from "../Rotate";
import { Mouse } from "../Mouse";

import { collide, isCollidingWith, toRad } from "../../Utils.js";

export class Component extends Actor {
  constructor(x, y, angle, mouse, grid, key, keyboard) {
    super();
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.angle = angle;
    this.collide = true;
    this.mouse = mouse;
    this.grid = grid;
    this.rot = new Rotate(45, 0, this);
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
    this.key = key;
    this.keyboard = keyboard;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(toRad(this.angle));

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
    ctx.fill(this.getSprite());
    ctx.restore();

    // Draw label and rotation icon
    ctx.fillStyle = "white";
    ctx.font = "16px Helvetica";
    if (!this.grid.getKey(this)) {
      ctx.fillText(this.getName(), this.x, this.y - 10);
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
      //ctx.roundRect(this.x + 18, this.y + 15, 15, 0).fill();
      ctx.fillStyle = "white";
      ctx.font = "15px Helvetica";
      let textToDraw = this.key;
      if(this.key === "Shift") {
        textToDraw = String.fromCharCode(parseInt("21E7", 16));
      } else if(this.key === "ArrowLeft") {
        textToDraw = String.fromCharCode(parseInt("2190", 16));
      } else if(this.key === "ArrowRight") {
        textToDraw = String.fromCharCode(parseInt("2192", 16));
      } else if(this.key === "ArrowUp") {
        textToDraw = String.fromCharCode(parseInt("2191", 16));
      } else if(this.key === "ArrowDown") {
        textToDraw = String.fromCharCode(parseInt("2193", 16));
      }
      let halfTextWidth = ctx.measureText(textToDraw).width / 2;
      ctx.fillText(textToDraw, this.x + this.w / 2 - halfTextWidth, this.y + this.h / 1.7);
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


  getThrust() {
    return 0;
  }
}
