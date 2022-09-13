import { Actor } from "./Actor";

// This probably doesn't need to be an actor, but adding it here in case we want to draw something when keys are pressed
export class Keyboard extends Actor {
  constructor() {
    super();
    this.keys = new Set();
  }

  has(has) {
    return this.keys.has(has);
  }

  add(toAdd) {
    this.keys.add(toAdd);
  }

  remove(toRemove) {
    this.keys.delete(toRemove);
  }

  length() {
    return this.keys.size;
  }

  clear() {
    this.keys = new Set();
  }

  draw(ctx) {}

  update() {}
}
