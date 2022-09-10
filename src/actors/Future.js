import { Actor } from "./Actor";

const MIN = 10;

export class Future extends Actor {
  constructor(counter, diff, keyboard, onCounter) {
    super();
    this.counter = counter;
    this.onCounter = onCounter;
    this.diff = diff;
    this.keyboard = keyboard;
    this.executed = false;
  }

  update(collisions, globalCounter) {
    if (
      globalCounter >= this.counter + this.diff ||
      (globalCounter > this.counter + MIN && this.keyboard && this.keyboard.keys.size > 0)
    ) {
      
      this.onCounter();
      return true;
    }
  }
}
