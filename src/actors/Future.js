import { Actor } from "./Actor";

export class Future extends Actor {
  constructor(counter, onCounter) {
    super();
    this.counter = counter;
    this.onCounter = onCounter;
  }

  update(collisions, globalCounter) {
    if (globalCounter >= this.counter) {
      this.onCounter();
      return true;
    }
  }
}
