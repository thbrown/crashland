import { Actor } from "./Actor";
import { randomRange } from "../Utils";
import { WIDTH, HEIGHT } from "../Constants";

const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
  { front : 'red', back: 'darkred'},
  { front : 'green', back: 'darkgreen'},
  { front : 'blue', back: 'darkblue'},
  { front : 'yellow', back: 'darkyellow'},
  { front : 'orange', back: 'darkorange'},
  { front : 'pink', back: 'darkpink'},
  { front : 'purple', back: 'darkpurple'},
  { front : 'turquoise', back: 'darkturquoise'},
];

// Adapted from CodePen (Canvas Confetti - Nicholas Suski)
// https://codepen.io/n33kos/pen/gjVQwv
export class Confetti extends Actor {
  constructor() {
    super();
    this.confetti = [];
    for (let i = 0; i < confettiCount; i++) {
      this.confetti.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
          x: randomRange(10, 20),
          y: randomRange(10, 30),
        },
        position: {
          x: randomRange(0, canvas.width),
          y: canvas.height - 1,
        },
        rotation: randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1,
        },
        velocity: {
          x: randomRange(-25, 25),
          y: randomRange(0, -50),
        },
      });
    }
  }

  draw(ctx) {
    this.confetti.forEach((confetto, index) => {
      let width = confetto.dimensions.x * confetto.scale.x;
      let height = confetto.dimensions.y * confetto.scale.y;

      // Move canvas to position and rotate
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);

      // Apply forces to velocity
      confetto.velocity.x -= confetto.velocity.x * drag;
      confetto.velocity.y = Math.min(
        confetto.velocity.y + gravity,
        terminalVelocity
      );
      confetto.velocity.x +=
        Math.random() > 0.5 ? Math.random() : -Math.random();

      // Set position
      confetto.position.x += confetto.velocity.x;
      confetto.position.y += confetto.velocity.y;

      // Delete confetti when out of frame -- EDIT: move it instead
      if (confetto.position.y >= canvas.height) {
        confetto.position.y = -HEIGHT*randomRange(1, 5);
      }//this.confetti.splice(index, 1);

      // Loop confetto x position
      if (confetto.position.x > canvas.width) confetto.position.x = 0;
      if (confetto.position.x < 0) confetto.position.x = canvas.width;

      // Spin confetto by scaling y
      confetto.scale.y = Math.cos(confetto.position.y * 0.1);
      ctx.fillStyle =
        confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

      // Draw confetto
      ctx.fillRect(-width / 2, -height / 2, width, height);

      // Reset transform matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
  }

  update() {}
}
