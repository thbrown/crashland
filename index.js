// Constants
const WIDTH = 1280;
const HEIGHT = 720;
const CELL_SIZE = 30;

const canvasElem = document.querySelector("canvas");
const ctx = canvasElem.getContext("2d");

const mouse = new Mouse(0, 0);
let mode = 0;
let actors = initMainMenu();

const SPACE_SHIP =
  new Path2D(`M73.778,188.362l-37.454,5.717c-2.978,0.451-5.941-0.918-7.52-3.484L14.838,167.89c-0.779-1.267-1.135-2.709-1.094-4.144
c-0.006-0.12-0.018-0.237-0.018-0.358v-48.03c0-4.143,3.358-7.5,7.5-7.5s7.5,3.357,7.5,7.5v19.927L58.71,81.887l15.068,25.715
	V188.362z M196.934,107.857c-4.143,0-7.5,3.357-7.5,7.5v19.927l-29.983-53.397l-15.068,25.716v80.76l37.454,5.717
	c2.976,0.452,5.941-0.918,7.521-3.485l13.965-22.705c0.779-1.266,1.134-2.708,1.093-4.143c0.006-0.12,0.018-0.237,0.018-0.358
	v-48.03C204.434,111.215,201.076,107.857,196.934,107.857z M129.383,188.679l-12.803,9.547v12.434c0,4.143-3.357,7.5-7.5,7.5
	c-4.142,0-7.5-3.357-7.5-7.5v-12.434l-12.803-9.547v-83.112c0-1.333-0.355-2.642-1.029-3.792l-20.531-35.04l35.323-62.907
	C103.868,1.464,106.369,0,109.08,0c2.712,0,5.212,1.464,6.54,3.828l35.323,62.907l-20.531,35.04
	c-0.674,1.15-1.029,2.459-1.029,3.792V188.679z M129.348,68.613c3.194-2.636,3.647-7.363,1.012-10.559
	c-0.868-1.053-8.839-10.284-21.09-10.284c-12.123,0-20.421,9.083-21.327,10.119c-2.728,3.117-2.432,7.877,0.686,10.604
	c1.429,1.25,3.193,1.865,4.949,1.865c2.075,0,4.138-0.859,5.615-2.548c1.268-1.402,5.55-5.041,10.078-5.041
	c5.316,0,9.519,4.831,9.519,4.831C121.426,70.796,126.153,71.249,129.348,68.613z`);

let globalCounter = 0;
function clock() {
  ctx.save();
  ctx.fillStyle = getColor(globalCounter / 200, [
    "rgb(0,0,0)", // Black
    "rgb(135,206,235)", // Sky Blue
  ]);
  globalCounter++;
  globalCounter = globalCounter % 200;

  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.restore();

  for (let actor of actors) {
    actor.draw(ctx);
  }

  // Update loop
  let toRemove = [];
  for (let actor of actors) {
    // Get everything colliding with this actor
    let collisions = [];
    for (let otherActor of actors) {
      if (actor === otherActor) {
        continue;
      }
      if (collide(actor, otherActor)) {
        collisions.push(otherActor);
      }
    }

    if (actor.update(collisions, globalCounter)) {
      toRemove.push(actor);
    }
  }

  // Remove dead actors
  actors = actors.filter(function (el) {
    return toRemove.indexOf(el) < 0;
  });

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);

function initMainMenu() {
  let all = [];
  for (let i = 0; i < 100; i++) {
    all.push(
      new Streak(
        randomIntFromInterval(0, WIDTH),
        randomIntFromInterval(0, HEIGHT),
        randomIntFromInterval(10, 70)
      )
    );
  }
  all.push(new Text(20, 100, "CRASH LANDING!", "100px Helvetica"));
  //all.push(new Actor(100, 100));

  all.push(new DirectionalParticle(540, 380, -45, 2, 1, 20, 5, "red"));
  all.push(new Ship(-100, -100, 135));
  all.push(
    new Button(960, 600, 300, 100, "Play Now", "black", "white", () => {
      // Start background gradient
      // Move Ship
      // Move Particles
      // Start Explosion
      // Start Remove all
      // Start Populate Build Screen
    })
  );
  all.push(mouse);
  return all;
}

function getColor(percentage, colors) {
  // Convert colors from string to rgb array
  let rgbColors = [];
  for (let color of colors) {
    rgbColors.push(
      color
        .substring(4, color.length - 1)
        .replace(/ /g, "")
        .split(",")
    );
  }

  // Determine the colors we are using for the gradient
  let colorA;
  let colorB;
  let sectorIndex;
  let sectorSize = 1 / (colors.length - 1);
  for (let i = 1; i < colors.length; i++) {
    if (percentage <= i * sectorSize) {
      colorA = rgbColors[i - 1];
      colorB = rgbColors[i];
      sectorIndex = i - 1;
      break;
    }
  }

  let percentageIntoColor =
    (percentage - sectorIndex * sectorSize) / sectorSize;

  let red =
    parseInt(colorA[0]) +
    (parseInt(colorB[0]) - parseInt(colorA[0])) * percentageIntoColor;
  let green =
    parseInt(colorA[1]) +
    (parseInt(colorB[1]) - parseInt(colorA[1])) * percentageIntoColor;
  let blue =
    parseInt(colorA[2]) +
    (parseInt(colorB[2]) - parseInt(colorA[2])) * percentageIntoColor;

  //console.log(percentage, percentageIntoColor, red);

  return `rgb(${red},${green},${blue})`;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  let cellX = Math.floor(x / CELL_SIZE);
  let cellY = Math.floor(y / CELL_SIZE);
  if (cells[cellY] && cells[cellY][cellX]) {
    if (event.button == 1) {
      cells[cellY][cellX] = new Cell(0, cellX, cellY, true);
    } else {
      cells[cellY][cellX] = new Cell(10000, cellX, cellY);
    }
  }
}

function collide(actorA, actorB) {
  if (!actorA.collide || !actorB.collide) {
    return false;
  }
  if (
    actorA.x < actorB.x + actorB.w &&
    actorA.x + actorA.w > actorB.x &&
    actorA.y < actorB.y + actorB.h &&
    actorA.h + actorA.y > actorB.y
  ) {
    return true;
  } else {
    return false;
  }
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

canvasElem.addEventListener("mousedown", function (e) {
  e.preventDefault();
  mouse.click = true;
  console.log("Click DOWN");
});

canvasElem.addEventListener("mouseup", function (e) {
  e.preventDefault();
  mouse.click = false;
  console.log("Click UP");
});

canvasElem.addEventListener("mousemove", function (e) {
  e.preventDefault();
  mouse.x = e.x;
  mouse.y = e.y;
});

document.addEventListener(
  "keydown",
  (event) => {
    console.log("Press");
  },
  false
);
