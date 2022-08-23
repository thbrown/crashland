import { Component } from "./Component";
import { DirectionalParticle } from "../DirectionalParticle.js";
import { FIRE_COLORS } from "../../Constants.js";

import { getThrusterSprite } from "../../Utils.js";

export class SmallThruster extends Component {
  constructor(x, y, angle, mouse, grid, key, keyboard) {
    super(x, y, angle, mouse, grid, key, keyboard);
    this.particles = new DirectionalParticle(
      this.x,
      this.y,
      0,
      4,
      5,
      2, // Length
      1, // Size
      FIRE_COLORS,
      5 // Spread
    );
  }

  getName() {
    return "Small Thruster";
  }

  getSprite() {
    return new Path2D(getThrusterSprite(50, 10, 1));
  }

  getAttachments() {
    return [1, 1, 0, 1];
  }

  draw(ctx) {
    if (this.keyboard.has(this.key)) {
      this.particles.draw(ctx);
    }
    super.draw(ctx);
  }

  update(collisions, globalCounter) {
    super.update(collisions, globalCounter);
    this.particles.x = this.x + this.w / 2;
    this.particles.y = this.y + this.h / 2;
    this.particles.angle = this.angle + 180;
    this.particles.update(collisions, globalCounter);
  }
}