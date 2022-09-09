import { Actor } from "./Actor";

export class HUD extends Actor {
  constructor() {
    super();
    this.elements = [];
  }

  clear() {
    this.elements = [];
  }

  add(element) {
    this.elements.push(element);
  }

  draw(ctx) {
    for (let element of this.elements) {
      ctx.save();
      element.draw(ctx);
      ctx.restore();
    }
  }

  update(collisions, globalCounter) {
    let toRemove = [];
    for (let element of this.elements) {
      if (element.update(collisions, globalCounter)) {
        toRemove.push(element);
      }
    }

    // Remove dead actors
    this.elements = this.elements.filter(function (el) {
      return toRemove.indexOf(el) < 0;
    });
  }
}
