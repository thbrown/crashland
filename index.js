// Constants
const WIDTH = 1280;
const HEIGHT = 720;
const CELL_SIZE = 30;

const canvasElem = document.querySelector("canvas");
const ctx = canvasElem.getContext("2d");

const FIRE_COLORS = [
  "rgb(255,0,0)",
  "rgb(245,158,66)",
  "rgb(250,241,75)",
  "rgb(84,84,84)",
];
const mouse = new Mouse(0, 0);
const background = new Background();
//let actors = initMainMenu();
let actors = initBuild();

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
const ROTATE =
  new Path2D(`M202.403,95.22c0,46.312-33.237,85.002-77.109,93.484v25.663l-69.76-40l69.76-40v23.494
c27.176-7.87,47.109-32.964,47.109-62.642c0-35.962-29.258-65.22-65.22-65.22s-65.22,29.258-65.22,65.22
c0,9.686,2.068,19.001,6.148,27.688l-27.154,12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964,42.716,54.68,0,107.184,0
S202.403,42.716,202.403,95.22z`);

let globalCounter = 0;
function clock() {
  globalCounter++;

  // Draw all actors
  for (let actor of actors) {
    actor.draw(ctx);
  }

  // Update all actors
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
  all.push(background);
  for (let i = 0; i < 100; i++) {
    all.push(
      new Streak(
        randomIntFromInterval(0, WIDTH),
        randomIntFromInterval(0, HEIGHT),
        randomIntFromInterval(10, 70)
      )
    );
  }
  all.push(new Text(20, 100, "Ship Resurrection", "100px Helvetica"));

  let particles = new DirectionalParticle(
    540,
    380,
    -45,
    2,
    1,
    20,
    5,
    FIRE_COLORS,
    4
  );
  all.push(particles);
  let ship = new Ship(-100, -100, 135);
  all.push(ship);
  all.push(
    new Button(
      945,
      600,
      350,
      100,
      "Play Now",
      "black",
      "white",
      "70px Helvetica",
      75,
      mouse,
      () => {
        // Start background gradient
        background.fadeStart = globalCounter;
        // Move Ship
        ship.speed = -10;
        // Move Particles
        particles.speed = 7;
        // Queue Explosion
        actors.push(
          new Future(globalCounter + 140, () => {
            actors.push(
              new DirectionalParticle(
                WIDTH,
                HEIGHT,
                -65,
                1,
                1,
                60,
                500,
                FIRE_COLORS,
                50
              )
            );
          })
        );
        // Queue Blackout
        actors.push(
          new Future(globalCounter + 240, () => {
            actors.push(
              new DirectionalParticle(
                WIDTH,
                HEIGHT,
                -65,
                1,
                1,
                70,
                500,
                ["rgb(0,0,0)", "rgb(0,0,0)"],
                50
              )
            );
          })
        );
        // Queue Instructions
        actors.push(
          new Future(globalCounter + 310, () => {
            actors = actors.filter(function (el) {
              return el.constructor.name === "Future";
            });
            actors.push(
              new Text(
                20,
                320,
                "Your ship has crashed, but you've escaped death for now, but the same can't be said for your ship.",
                "40px Helvetica"
              )
            );
          })
        );
        // Queue Instructions 2
        actors.push(
          new Future(globalCounter + 420, () => {
            actors.push(
              new Text(
                20,
                360,
                "Rebuild your ship and escape to the space station to survive.",
                "40px Helvetica"
              )
            );
          })
        );
        // Queue Remove All & Show Build Screen
        actors.push(
          new Future(globalCounter + 580, () => {
            actors = initBuild();
          })
        );
      }
    )
  );
  all.push(mouse);
  return all;
}

function initBuild() {
  let all = [];
  background.fadeStart = 999999999;
  background.color = "black";
  all.push(background);
  all.push(
    new Text(
      20,
      40,
      'Click and drag the components to rebuild your ship! When finished click "Launch!"',
      "30px Helvetica"
    )
  );
  all.push(new Rectangle(50, 70, 550, 550, "white"));
  all.push(new Rectangle(650, 70, 550, 550, "white"));
  let grid = new Grid(650, 70, mouse);
  all.push(grid);
  for (let i = 0; i < 5; i++) {
    all.push(new Component(80 + i * 95, 100 + i * 25,0, mouse, grid));
  }

  let commandModule = new Component(500, 500, 0, mouse, grid);
  all.push(commandModule);
  grid.addComponent(commandModule, 5, 5, mouse);

  all.push(
    new Button(
      1100,
      640,
      200,
      50,
      "Launch!",
      "black",
      "white",
      "35px Helvetica",
      38,
      mouse,
      () => {
        actors = initMainMenu();
      }
    )
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

function isCollidingWith(type, collisions) {
  for (let col of collisions) {
    if (col instanceof type) {
      return true;
    }
  }
  return false;
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
