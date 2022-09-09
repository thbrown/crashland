import { Actor } from "./Actor";
import { pthag } from "../Utils";
import { WIDTH, HEIGHT, PPM } from "../Constants";
import { toRad } from "../Utils";

export class StationTracker extends Actor {
  constructor(ship, station, mouse) {
    super();
    this.ship = ship;
    this.station = station;
    this.mouse = mouse;
  }

  draw(ctx) {
    let shipX = this.ship.x + this.ship.COM.x;
    let shipY = this.ship.y + this.ship.COM.y;

    let stationX = this.station.x + this.station.sw / 2;
    let stationY = this.station.y + this.station.sh / 2;

    let xDist = shipX - stationX;
    let yDist = shipY - stationY;
    let distToStation = pthag(xDist, yDist);

    let xPer = ((WIDTH / 2) - 20) / xDist;
    let yPer = ((HEIGHT / 2) - 20) / yDist;

    /*
    ctx.fillStyle = "white";
    ctx.font = "30px Helvetica";
    ctx.fillText(
      `Dist: ${distToStation.toFixed(2)} px ${xPer.toFixed(2)} ${yPer.toFixed(
        2
      )}`,
      100,
      100
    );*/

    // Draw indicator if station is off-screen
    if (Math.abs(xPer) < 1 || Math.abs(yPer) < 1) {

      // Fancy trig to determine which cardinal direction of the screen the station is in relative to the ship
      let theta = Math.atan(WIDTH / 2 / (HEIGHT / 2));
      let phi = 180 - 90 - theta;
      let alpha = (HEIGHT / 2) * Math.sin(theta);
      let pX = 2 * alpha * Math.cos(phi);
      let pY = 2 * alpha * Math.sin(phi);

      let points = [
        { x: shipX - WIDTH / 2 + pX, y: shipY + pY },
        { x: shipX + WIDTH / 2 - pX, y: shipY + pY },
        { x: shipX + WIDTH / 2, y: shipY },
        { x: shipX + WIDTH / 2 - pX, y: shipY - pY },
        { x: shipX - WIDTH / 2 + pX, y: shipY - pY },
        { x: shipX - WIDTH / 2, y: shipY },
      ];

      let minIndex = 0;
      let minDist = Number.MAX_SAFE_INTEGER;
      let allCalcs = [];
      for (let pointIndex in points) {
        let point = points[pointIndex];
        let dist = pthag(point.x - stationX, point.y - stationY);
        allCalcs.push(dist.toFixed(2));
        if (dist < minDist) {
          minIndex = pointIndex;
          minDist = dist;
        }
      }

      let text = `${(distToStation/PPM).toFixed(2)}m         `;
      let halfTextWidth = ctx.measureText(text).width/2;

      let x = 0;
      let y = 0;
      let rot = 0;
      let textYOffset = 0;
      let labelYOffset = 0;
      if (minIndex == 0 || minIndex == 1) {
        // ABOVE the station
        x = WIDTH / 2 + yPer * xDist;
        y = HEIGHT - 5;
        textYOffset = -5;
        labelYOffset = -25;
      } else if (minIndex == 2) {
        // LEFT of the station
        x = WIDTH - 5;
        y = HEIGHT / 2 + xPer * yDist;
        rot = 270;
        textYOffset = -5;
        labelYOffset = -25;
      } else if (minIndex == 3 || minIndex == 4) {
        // BELOW the station
        x = WIDTH / 2 - yPer * xDist;
        y = 5;
        textYOffset = 20;
        labelYOffset = 40;
      } else if (minIndex == 5) {
        // RIGHT of the station
        x = 5;
        y = HEIGHT / 2 - xPer * yDist;
        rot = 90;
        textYOffset = -5;
        labelYOffset = -25;
      }

      ctx.fillStyle = "green";
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.arc(x-1, y-1, 2, 0, 2 * Math.PI);
      ctx.stroke(); 
      ctx.fill();

      ctx.translate(x,y);
      ctx.rotate(toRad(rot));

      ctx.fillStyle = "white";
      ctx.font = "20px Helvetica";


      let labelText = `Space Station`;
      let halfLabelTextWidth = ctx.measureText(labelText).width/2;

      ctx.fillText(
        labelText,
        -halfLabelTextWidth,
        labelYOffset
      );

      ctx.fillText(
        text,
        -halfTextWidth,
        textYOffset
      );
    }
  }

  update(collisions, globalCounter) {}
}
