import { Component } from "./Component";

export class CommandModule extends Component {
  constructor(x, y, angle, mouse, grid, key, keyboard) {
    super(x, y, angle, mouse, grid, key, keyboard);
  }

  getName() {
    return "Command Module";
  }

  getSprite() {
    return new Path2D(`m 0 50h50v-50h-50v50`);
  }

  getAttachments() {
    return [1, 1, 1, 1];
  }

  draw(ctx) {
    super.draw(ctx);
  }

  update(collisions, globalCounter) {
    // Can't drag command module
  }
}
