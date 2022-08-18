import { Actor } from "./Actor";

export class Grid extends Actor {
  constructor(x, y, mouse) {
    super();
    this.x = x;
    this.y = y;
    this.dim = 50;
    this.num = 11;
    this.mouse = mouse;
    this.components = {};
  }

  getClosestValidLocation(x, y) {
    const MIN_DISTANCE = 100;
    let validKeys = this.getValidLocations();
    let minValue = 999999;
    let minLocation = undefined;
    for (let key of validKeys) {
      let locSplit = key.split(",");
      let locX = parseInt(locSplit[0]);
      let locY = parseInt(locSplit[1]);
      let dist = Math.sqrt(
        Math.pow(x - (this.x + locX * this.dim), 2) +
          Math.pow(y - (this.y + locY * this.dim), 2)
      );

      if (dist < minValue && dist < MIN_DISTANCE) {
        minValue = dist;
        minLocation = key;
      }
    }
    return minLocation;
  }

  getValidLocations() {
    // BFS on components to find valid neighbor locations
    if (Object.keys(this.components).length === 0) {
      // TODO: all locations valid if nothing is on the grid? OR make command module immovable?
      return [];
    }

    let start = Object.keys(this.components)[0];
    let queue = [start];
    let visited = new Set();
    let results = [];

    while (queue.length > 0) {
      let nodeKey = queue.shift();
      let nodeSplit = nodeKey.split(",");
      let nodeX = parseInt(nodeSplit[0]);
      let nodeY = parseInt(nodeSplit[1]);

      let leftKey = [nodeX - 1, nodeY].join(",");
      let rightKey = [nodeX + 1, nodeY].join(",");
      let topKey = [nodeX, nodeY - 1].join(",");
      let bottomKey = [nodeX, nodeY + 1].join(",");

      let allKeys = [leftKey, rightKey, topKey, bottomKey];
      for (let key of allKeys) {
        if (visited.has(key)) {
          // Do Nothing
        } else if (this.components[key]) {
          // Queue component
          queue.push(key);
          visited.add(key);
        } else {
          // Add Result
          results.push(key);
        }
      }
    }

    return results;
  }

  addComponent(toAdd, x, y) {
    // First snap the component to the grid
    toAdd.x = this.x + this.dim * x;
    toAdd.y = this.y + this.dim * y;

    // Then add the component to the list
    let key = `${x},${y}`;
    this.components[key] = toAdd;
  }

  getKey(comp) {
    for (let i = 0; i < Object.keys(this.components).length; i++) {
      if (this.components[Object.keys(this.components)[i]] === comp) {
        return Object.keys(this.components)[i];
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "white";

    /*
    // Horizontal Lines
    for (let i = 0; i < this.num; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + this.dim * i);
      ctx.lineTo(this.x + this.dim * this.num, this.y + this.dim * i);
      ctx.stroke();
    }

    // Vertical Lines
    for (let i = 0; i < this.num; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.dim * i, this.y);
      ctx.lineTo(this.x + this.dim * i, this.y + this.dim * this.num);
      ctx.stroke();
    }
    */

    // Draw any highlighted components (if something is being dragged by the mouse)
    if (this.mouse.dragged) {
      let validLocations = this.getValidLocations();
      let closestValidLocation = this.getClosestValidLocation(
        this.mouse.dragged.x,
        this.mouse.dragged.y
      );

      for (let location of validLocations) {
        let locSplit = location.split(",");
        let locX = parseInt(locSplit[0]);
        let locY = parseInt(locSplit[1]);

        if (location === closestValidLocation) {
          ctx.strokeStyle = "green";
        } else {
          ctx.strokeStyle = "red";
        }
        ctx.lineWidth = 3;
        const shrink = 6;
        ctx
          .roundRect(
            this.x + this.dim * locX + shrink / 2,
            this.y + this.dim * locY + shrink / 2,
            this.dim - shrink,
            this.dim - shrink,
            5
          )
          .stroke();
      }
    }

    // TODO: Find the closest highlighted component, if it's within some range, highlight it! or animate it!

    ctx.restore();
  }

  update(collisions, globalCounter) {}
}
