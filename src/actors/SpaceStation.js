import { Actor } from "./Actor";
import { isCollidingWith, startBeep, stopBeep, stopMusic } from "../Utils";
import { Ship } from "./Ship";
import { collideRectPt } from "../Utils";
import { DIM } from "../Constants";
import { Confetti } from "./Confetti";
import { SlideScreen } from "./SlideScreen";

const SPACE_STATION =
  new Path2D(`M502.4,7.5h-153.6c-5.1,0-8.5,3.4-8.5,8.5v25.6H305.4C301.3,17.5,280.2-1,255-1
  c-25.2,0-46.3,18.5-50.4,42.6h-34.8v-25.6c0-5.1-3.4-8.5-8.5-8.5H7.5C2.4,7.5-1,10.9-1,16.0
  v68.2c0,5.1,3.4,8.5,8.5,8.5h153.6c5.1,0,8.5-3.4,8.5-8.5v-25.6h34.8
  c3.6,21.3,20.5,38.3,41.9,41.9v10.3c-14.6,3.8-25.6,17.2-25.6,33.0v8.6
  c-18.8,1.6-33.2,17.2-33.2,36.5v57.1h-17.9v-25.6c0-5.1-3.4-8.5-8.5-8.5H7.5
  c-5.1,0-8.5,3.4-8.5,8.5v68.2c0,5.1,3.4,8.5,8.5,8.5h153.6c5.1,0,8.5-3.4,8.5-8.5v-25.6h17.9
  v57.1c0,19.3,14.4,34.8,33.2,36.5v8.6c0,15.8,10.9,29.2,25.6,33.0v10.3
  c-21.3,3.6-38.3,20.5-41.9,41.9h-34.8v-25.6c0-5.1-3.4-8.5-8.5-8.5H7.5
  c-5.1,0-8.5,3.4-8.5,8.5v68.2c0,5.1,3.4,8.5,8.5,8.5h153.6c5.1,0,8.5-3.4,8.5-8.5v-25.6h34.8
  C208.6,492.4,229.7,511,255,511c25.2,0,46.3-18.5,50.4-42.6h34.8v25.6c0,5.1,3.4,8.5,8.5,8.5h153.6
  c5.1,0,8.5-3.4,8.5-8.5v-68.2c0-5.1-3.4-8.5-8.5-8.5h-153.6c-5.1,0-8.5,3.4-8.5,8.5v25.6H305.4
  c-3.6-21.3-20.5-38.3-41.9-41.9v-10.3c14.6-3.8,25.6-17.2,25.6-33.0v-8.6
  c19.2-1.2,34.1-17.0,34.1-37.4v-56.3h17.0v25.6c0,5.1,3.4,8.5,8.5,8.5h153.6
  c5.1,0,8.5-3.4,8.5-8.5v-68.2c0-5.1-3.4-8.5-8.5-8.5h-153.6c-5.1,0-8.5,3.4-8.5,8.5v25.6h-17.0
  v-57.1c0-19.6-14.8-35.3-34.1-36.5v-8.6c0-15.8-10.9-29.2-25.6-33.0V100.6
  c21.3-3.6,38.3-20.5,41.9-41.9h34.8v25.6c0,5.1,3.4,8.5,8.5,8.5h153.6c5.1,0,8.5-3.4,8.5-8.5
  V16.0C511,10.9,507.5,7.5,502.4,7.5z M152.6,246.4h-34.1V229.4H152.6V246.4z M67.2,246.4V229.4H101.4
  v17.0H67.2z M101.4,263.5V280.6H67.2v-17.0H101.4z M50.2,229.4v17.0H16.0V229.4H50.2z M16.0,263.5H50.2V280.6
  H16.0V263.5z M118.4,280.6v-17.0H152.6V280.6H118.4z M357.4,263.5h34.1V280.6H357.4V263.5z M442.7,263.5
  V280.6H408.6v-17.0H442.7z M408.6,246.4V229.4h34.1v17.0H408.6z M459.8,280.6v-17.0h34.1V280.6H459.8z
   M493.9,246.4H459.8V229.4h34.1V246.4z M391.5,229.4v17.0H357.4V229.4H391.5z M493.9,41.6H459.8V24.6h34.1
  V41.6z M408.6,41.6V24.6h34.1v17.0H408.6z M442.7,58.7V75.8H408.6V58.7H442.7z M391.5,24.6v17.0H357.4V24.6
  H391.5z M152.6,41.6h-34.1V24.6H152.6V41.6z M67.2,41.6V24.6H101.4v17.0H67.2z M101.4,58.7V75.8H67.2V58.7
  H101.4z M50.2,24.6v17.0H16.0V24.6H50.2z M16.0,58.7H50.2V75.8H16.0V58.7z M118.4,75.8V58.7H152.6V75.8H118.4z
   M152.6,451.2h-34.1V434.2H152.6V451.2z M67.2,451.2V434.2H101.4v17.0H67.2z M101.4,468.3V485.4H67.2v-17.0
  H101.4z M50.2,434.2v17.0H16.0V434.2H50.2z M16.0,468.3H50.2V485.4H16.0V468.3z M118.4,485.4v-17.0H152.6V485.4
  H118.4z M357.4,468.3h34.1V485.4H357.4V468.3z M442.7,468.3V485.4H408.6v-17.0H442.7z M408.6,451.2V434.2
  h34.1v17.0H408.6z M459.8,485.4v-17.0h34.1V485.4H459.8z M493.9,451.2H459.8V434.2h34.1V451.2z M391.5,434.2
  v17.0H357.4V434.2H391.5z M289.1,459.8c0,18.7-15.3,34.1-34.1,34.1c-18.7,0-34.1-15.3-34.1-34.1
  c0-18.7,15.3-34.1,34.1-34.1C273.7,425.6,289.1,441.0,289.1,459.8z M272.0,365.9
  c0,9.3-7.6,17.0-17.0,17.0s-17.0-7.6-17.0-17.0V357.4h34.1V365.9z M305.3,189.2v130.5
  c0,11.0-8.5,19.6-19.6,19.6h-62.2c-11.0,0-19.6-8.5-19.6-19.6v-130.5
  c0-11.0,8.5-19.6,19.6-19.6h5.9h51.2h5.1C296.8,169.6,305.3,178.2,305.3,189.2z M272.0,144.0v8.5
  h-34.1v-8.5c0-9.3,7.6-17.0,17.0-17.0S272.0,134.6,272.0,144.0z M255,84.3
  c-18.7,0-34.1-15.3-34.1-34.1S236.2,16.0,255,16.0c18.7,0,34.1,15.3,34.1,34.1
  S273.7,84.3,255,84.3z M357.4,58.7h34.1V75.8H357.4V58.7z M459.8,75.8V58.7h34.1V75.8H459.8z`);

const OFFSET = 20;

export class SpaceStation extends Actor {
  constructor(level, ship, onVictory) {
    super();
    this.x = level.sx;
    this.y = level.sy;
    this.sm = level.sm;
    this.dockTime = level.st;
    this.sh = 126;
    this.sw = 126;
    this.w = this.sh;
    this.h = this.sw;
    this.ship = ship;
    this.collide = true;
    this.docking = false;
    this.textColor = "white";
    this.dockingText = "Docking...";
    this.initVictory = true;
    this.onVictory = onVictory;
  }

  stopBeep() {
    clearInterval(this.beep);
  }

  draw(ctx) {
    let stationOffset = OFFSET;

    // Draw Docking Location
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.strokeStyle = "rgba(0, 0, 139, 0.5)";

    // TODO: DRY rects
    ctx
      .roundRect(
        this.x + this.sw / 2 - this.ship.w / 2 - this.sm / 2,
        this.y + this.sh + stationOffset - this.sm / 2,
        this.ship.w + this.sm,
        this.ship.h + this.sm,
        10
      )
      .fill();
    ctx
      .roundRect(
        this.x + this.sw / 2 - this.ship.w / 2 - this.sm / 2,
        this.y + this.sh + stationOffset - this.sm / 2,
        this.ship.w + this.sm,
        this.ship.h + this.sm,
        10
      )
      .stroke();

    ctx
      .roundRect(
        this.x + this.sw / 2 - this.ship.w / 2,
        this.y + this.sh + stationOffset,
        this.ship.w,
        this.ship.h,
        10
      )
      .fill();
    ctx
      .roundRect(
        this.x + this.sw / 2 - this.ship.w / 2,
        this.y + this.sh + stationOffset,
        this.ship.w,
        this.ship.h,
        10
      )
      .stroke();

    let text = `Docking Area`;
    ctx.fillStyle = this.textColor;
    ctx.font = "15px Helvetica";
    let halfTextWidth = ctx.measureText(text).width / 2;
    ctx.fillText(
      text,
      this.x - halfTextWidth + this.sw / 2,
      this.y + this.sh + stationOffset + this.ship.h / 2
    );

    // Draw space station graphic
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(0.25, 0.25);
    ctx.fillStyle = "white";
    ctx.fill(SPACE_STATION);
    ctx.restore();

    // Draw docking countdown
    if (this.docking) {
      ctx.fillStyle = this.textColor;
      ctx.font = "15px Helvetica";
      let halfTextWidth = ctx.measureText(this.dockingText).width / 2;

      let docX = this.x + this.sw / 2;
      let docY = this.y + this.sh + stationOffset + this.ship.h + this.sm/2 + OFFSET;
      ctx.fillText(
        this.dockingText,
        docX - halfTextWidth,
        docY
      );

      const PIE_OFFSET = 40;
      ctx.moveTo(docX, docY + PIE_OFFSET);
      ctx.beginPath();
      ctx.arc(
        docX,
        docY + PIE_OFFSET,
        30,
        -Math.PI/2,
        ((this.dockingTime - this.dockingStart) / this.dockTime) * (Math.PI*2) - Math.PI/2,
        false
      );
      ctx.lineTo(docX, docY + PIE_OFFSET);
      ctx.fill();
      ctx.closePath();
    }
  }

  update(collisions, counter, actors) {
    this.w = this.sw + OFFSET + this.sm * 1 + this.ship.w;
    this.h = this.sh + OFFSET + this.sm * 1 + this.ship.h;


    if (isCollidingWith(Ship, collisions)) {
      let stationOffset = OFFSET;
      const targetRect = {
        x: this.x + this.sw / 2 - this.ship.w / 2 - this.sm / 2,
        y: this.y + this.sh + stationOffset - this.sm / 2,
        w: this.ship.w + this.sm,
        h: this.ship.h + this.sm,
      };

      let colliding = 0;

      // How many corners are colliding with our box?
      let sceneCoordsOfParts = this.ship.getSceneCoordsOfParts();
      const total = sceneCoordsOfParts.length;

      for (let part of sceneCoordsOfParts) {
        if (collideRectPt(part.x, part.y, targetRect)) {
          colliding++;
        }
      }

      if (colliding === total) {
        if (this.docking === true) {
          
          if(this.dockingTime - this.dockingStart >= this.dockTime) {
            // Docking Complete! Victory!
            if(this.initVictory) {
              stopBeep();
              stopMusic();
              this.initVictory = false; // only do this once
              this.textColor = "blue";
              this.ship.freeze = true;
              this.dockingText = "Docking COMPLETE!";
              zzfx(...[1.03,,221,.09,.24,.22,,.91,,,-2,.19,.11,,,.2,,.88,.17,.26]); 
              this.onVictory(counter);
            }
          }
          this.dockingTime = counter;
        } else {
          this.docking = true;
          this.dockingStart = counter;
          startBeep();
        }
      } else {
        this.docking = false;
      }
    }
  }
}
