import { Actor } from "./Actor";

export class HUD extends Actor {
  constructor() {
    super();
    this.elements = [];
  };

  clear() {
    this.elements = [];
  }

  add(element) {
    this.elements.push(element);
  }

  draw(ctx) {
    for(let element of this.elements) {
      ctx.save();
      element.draw(ctx);
      ctx.restore();
    }
  }

  update(collisions, globalCounter) {
    for(let element of this.elements) {
      element.update(collisions, globalCounter);
    }
  }
}
