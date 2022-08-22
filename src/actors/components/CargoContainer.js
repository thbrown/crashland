import { Component } from "./Component";

export class CargoContainer extends Component {
  constructor(x, y, angle, mouse, grid, key, keyboard) {
    super(x, y, angle, mouse, grid, key, keyboard);
  }

  getName() {
    return "Cargo Container";
  }

  getSprite() {
    return new Path2D(
      `m 0 0 v 20 h 20 v 10 h -20 v 20 h 20v -20h 10 v 20 h 20 v -20h -20 v -10 h 20 v -20 h -20 v 20 h -10 v -20 h -20`
    );
  }

  getAttachments() {
    return [1, 1, 1, 1];
  }

  draw(ctx) {
    super.draw(ctx);
  }

  update(collisions, globalCounter) {
    super.update(collisions, globalCounter);
  }
}
