import { Actor } from "./Actor";
import { collide } from "../Utils";

export class HUD extends Actor {
  constructor() {
    super();
    this.elements = [];
    this.startTime = new Date();
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

  resetTimer() {
    this.startTime = new Date();
  }

  update(collisions, globalCounter) {
    let toRemove = [];
    for (let element of this.elements) {
      // Get everything colliding with this element
      let collisions = [];
      for (let otherElement of this.elements) {
        if (element === otherElement) {
          continue;
        }
        if (collide(element, otherElement)) {
          collisions.push(otherElement);
        }
      }

      if (element.update(collisions, globalCounter, this.elements)) {
        toRemove.push(element);
      }
    }

    // Remove dead actors
    this.elements = this.elements.filter(function (el) {
      return toRemove.indexOf(el) < 0;
    });
  }
}
