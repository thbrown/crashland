import { Background } from "./actors/Background.js";
import { Button } from "./actors/Button.js";
import { Component, COMP_TYPE } from "./actors/Component.js";
import { DirectionalParticle } from "./actors/DirectionalParticle.js";
import { Future } from "./actors/Future.js";
import { Grid } from "./actors/Grid.js";
import { Mouse } from "./actors/Mouse.js";
import { Rectangle } from "./actors/Rectangle.js";
import { Ship } from "./actors/Ship.js";
import { Streak } from "./actors/Streak.js";
import { Text } from "./actors/Text.js";

import { WIDTH, HEIGHT } from "./Constants.js";
import { randomIntFromInterval, collide } from "./Utils.js";

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
let actors = initMainMenu();
//let actors = initBuild();

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
    all.push(
      new Component(
        80 + i * 95,
        100 + i * 25,
        0,
        mouse,
        grid,
        COMP_TYPE[i % COMP_TYPE.length]
      )
    );
  }

  let commandModule = new Component(500, 500, 0, mouse, grid, COMP_TYPE[0]);
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

/*
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
}*/

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
  var rect = canvas.getBoundingClientRect();
  mouse.x = e.x - rect.left;
  mouse.y = e.y - rect.top;
});

document.addEventListener(
  "keydown",
  (event) => {
    console.log("Press");
  },
  false
);
