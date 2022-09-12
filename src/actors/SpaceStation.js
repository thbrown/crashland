import { Actor } from "./Actor";
import { isCollidingWith, startBeep, stopBeep, stopMusic,sound, f } from "../Utils";
import { Ship } from "./Ship";
import { collideRectPt } from "../Utils";
import { DIM } from "../Constants";
import { Confetti } from "./Confetti";
import { SlideScreen } from "./SlideScreen";
/*
const SPACE_STATION =
  new Path2D(`M502,7h-153c-5,0-8,3-8,8v25H305C301,17,280-1,255-1
  c-25,0-46,18-50,42h-34v-25c0-5-3-8-8-8H7C2,7-1,10-1,16
  v68c0,5,3,8,8,8h153c5,0,8-3,8-8v-25h34
  c3,21,20,38,41,41v10c-14,3-25,17-25,33v8
  c-18,1-33,17-33,36v57h-17v-25c0-5-3-8-8-8H7
  c-5,0-8,3-8,8v68c0,5,3,8,8,8h153c5,0,8-3,8-8v-25h17
  v57c0,19,14,34,33,36v8c0,15,10,29,25,33v10
  c-21,3-38,20-41,41h-34v-25c0-5-3-8-8-8H7
  c-5,0-8,3-8,8v68c0,5,3,8,8,8h153c5,0,8-3,8-8v-25h34
  C208,492,229,511,255,511c25,0,46-18,50-42h34v25c0,5,3,8,8,8h153
  c5,0,8-3,8-8v-68c0-5-3-8-8-8h-153c-5,0-8,3-8,8v25H305
  c-3-21-20-38-41-41v-10c14-3,25-17,25-33v-8
  c19-1,34-17,34-37v-56h17v25c0,5,3,8,8,8h153
  c5,0,8-3,8-8v-68c0-5-3-8-8-8h-153c-5,0-8,3-8,8v25h-17
  v-57c0-19-14-35-34-36v-8c0-15-10-29-25-33V100
  c21-3,38-20,41-41h34v25c0,5,3,8,8,8h153c5,0,8-3,8-8
  V16C511,10,507,7,502,7z M152,246h-34V229H152V246z M67,246V229H101
  v17H67z M101,263V280H67v-17H101z M50,229v17H16V229H50z M16,263H50V280
  H16V263z M118,280v-17H152V280H118z M357,263h34V280H357V263z M442,263
  V280H408v-17H442z M408,246V229h34v17H408z M459,280v-17h34V280H459z
   M493,246H459V229h34V246z M391,229v17H357V229H391z M493,41H459V24h34
  V41z M408,41V24h34v17H408z M442,58V75H408V58H442z M391,24v17H357V24
  H391z M152,41h-34V24H152V41z M67,41V24H101v17H67z M101,58V75H67V58
  H101z M50,24v17H16V24H50z M16,58H50V75H16V58z M118,75V58H152V75H118z
   M152,451h-34V434H152V451z M67,451V434H101v17H67z M101,468V485H67v-17
  H101z M50,434v17H16V434H50z M16,468H50V485H16V468z M118,485v-17H152V485
  H118z M357,468h34V485H357V468z M442,468V485H408v-17H442z M408,451V434
  h34v17H408z M459,485v-17h34V485H459z M493,451H459V434h34V451z M391,434
  v17H357V434H391z M289,459c0,18-15,34-34,34c-18,0-34-15-34-34
  c0-18,15-34,34-34C273,425,289,441,289,459z M272,365
  c0,9-7,17-17,17s-17-7-17-17V357h34V365z M305,189v130
  c0,11-8,19-19,19h-62c-11,0-19-8-19-19v-130
  c0-11,8-19,19-19h5h51h5C296,169,305,178,305,189z M272,144v8
  h-34v-8c0-9,7-17,17-17S272,134,272,144z M255,84
  c-18,0-34-15-34-34S236,16,255,16c18,0,34,15,34,34
  S273,84,255,84z M357,58h34V75H357V58z M459,75V58h34V75H459z`);
  */

  // Use the space station outline instead
  const SPACE_STATION = new Path2D(`M502,7h-153c-5,0-8,3-8,8v25H305C301,17,280-1,255-1
  c-25,0-46,18-50,42h-34v-25c0-5-3-8-8-8H7C2,7-1,10-1,16
  v68c0,5,3,8,8,8h153c5,0,8-3,8-8v-25h34
  c3,21,20,38,41,41v10c-14,3-25,17-25,33v8
  c-18,1-33,17-33,36v57h-17v-25c0-5-3-8-8-8H7
  c-5,0-8,3-8,8v68c0,5,3,8,8,8h153c5,0,8-3,8-8v-25h17
  v57c0,19,14,34,33,36v8c0,15,10,29,25,33v10
  c-21,3-38,20-41,41h-34v-25c0-5-3-8-8-8H7
  c-5,0-8,3-8,8v68c0,5,3,8,8,8h153c5,0,8-3,8-8v-25h34
  C208,492,229,511,255,511c25,0,46-18,50-42h34v25c0,5,3,8,8,8h153
  c5,0,8-3,8-8v-68c0-5-3-8-8-8h-153c-5,0-8,3-8,8v25H305
  c-3-21-20-38-41-41v-10c14-3,25-17,25-33v-8
  c19-1,34-17,34-37v-56h17v25c0,5,3,8,8,8h153
  c5,0,8-3,8-8v-68c0-5-3-8-8-8h-153c-5,0-8,3-8,8v25h-17
  v-57c0-19-14-35-34-36v-8c0-15-10-29-25-33V100
  c21-3,38-20,41-41h34v25c0,5,3,8,8,8h153c5,0,8-3,8-8
  V16C511,10,507,7,502,7z,459c0,18-15,34-34,34c-18,0-34-15-34-34
  c0-18,15-34,34-34C273,425,289,441,289,459z M272,365
  c0,9-7,17-17,17s-17-7-17-17V357h34V365z M305,189v130
  c0,11-8,19-19,19h-62c-11,0-19-8-19-19v-130
  c0-11,8-19,19-19h5h51h5C296,169,305,178,305,189z M272,144v8
  h-34v-8c0-9,7-17,17-17S272,134,272,144z M255,84
  c-18,0-34-15-34-34S236,16,255,16c18,0,34,15,34,34
  S273,84,255,84z M357,58h34V75H357V58z M459,75V58h34V75H459z`);

const OFFSET = 20;

export class SpaceStation extends Actor {
  constructor(level, ship, onVictory) {
    super(level.sx, level.sy);
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
    ctx.font = f(15);
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
      ctx.font = f(15);
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
              sound([1.03,,221,.09,.24,.22,,.91,,,-2,.19,.11,,,.2,,.88,.17,.26]); 
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
        stopBeep();
        this.docking = false;
      }
    } else {
      stopBeep();
    }
  }
}
