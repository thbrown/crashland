import { Background } from "./actors/Background.js";
import { Button } from "./actors/Button.js";
import {
  newComponent,
  getCount,
  getType,
} from "./actors/components/ComponentFactory";
import { DirectionalParticle } from "./actors/DirectionalParticle.js";
import { Future } from "./actors/Future.js";
import { Grid } from "./actors/Grid.js";
import { Mouse } from "./actors/Mouse.js";
import { Rectangle } from "./actors/Rectangle.js";
import { MenuShip } from "./actors/MenuShip.js";
import { Streak } from "./actors/Streak.js";
import { Text } from "./actors/Text.js";
import { Keyboard } from "./actors/Keyboard.js";
import { Ship } from "./actors/Ship.js";
import { PlanetGround } from "./actors/PlanetGround.js";
import { PlanetAtmosphere } from "./actors/PlanetAtmosphere.js";
import { SpaceStation } from "./actors/SpaceStation.js";
import { HUD } from "./actors/HUD.js";
import { Speedometer } from "./actors/Speedometer.js";
import { StationTracker } from "./actors/StationTracker.js";
import { Confetti } from "./actors/Confetti.js";
import { SlideScreen } from "./actors/SlideScreen.js";
import { CommandModule } from "./actors/components/CommandModule.js";
import { Scaffolding } from "./actors/Scaffolding.js";

import { WIDTH, HEIGHT, FIRE_COLORS, PPM, DIM } from "./Constants.js";
import { randomIntFromInterval, collide, unicode, stopBeep, playMusic, stopMusic } from "./Utils.js";
import { Chronometer } from "./actors/Chronometer.js";
import { PlanetInfo } from "./actors/PlanetInfo.js";

// ZzFX (https://github.com/KilledByAPixel/ZzFX)
window.zzfxP = (...t) => {
  let e = zzfxX.createBufferSource(),
    f = zzfxX.createBuffer(t.length, t[0].length, zzfxR);
  t.map((d, i) => f.getChannelData(i).set(d)),
    (e.buffer = f),
    e.connect(zzfxX.destination),
    e.start();
  return e;
};
window.zzfxG = (
  q = 1,
  k = 0.05,
  c = 220,
  e = 0,
  t = 0,
  u = 0.1,
  r = 0,
  F = 1,
  v = 0,
  z = 0,
  w = 0,
  A = 0,
  l = 0,
  B = 0,
  x = 0,
  G = 0,
  d = 0,
  y = 1,
  m = 0,
  C = 0
) => {
  let b = 2 * Math.PI,
    H = (v *= (500 * b) / zzfxR ** 2),
    I = ((0 < x ? 1 : -1) * b) / 4,
    D = (c *= ((1 + 2 * k * Math.random() - k) * b) / zzfxR),
    Z = [],
    g = 0,
    E = 0,
    a = 0,
    n = 1,
    J = 0,
    K = 0,
    f = 0,
    p,
    h;
  e = 99 + zzfxR * e;
  m *= zzfxR;
  t *= zzfxR;
  u *= zzfxR;
  d *= zzfxR;
  z *= (500 * b) / zzfxR ** 3;
  x *= b / zzfxR;
  w *= b / zzfxR;
  A *= zzfxR;
  l = (zzfxR * l) | 0;
  for (h = (e + m + t + u + d) | 0; a < h; Z[a++] = f)
    ++K % ((100 * G) | 0) ||
      ((f = r
        ? 1 < r
          ? 2 < r
            ? 3 < r
              ? Math.sin((g % b) ** 3)
              : Math.max(Math.min(Math.tan(g), 1), -1)
            : 1 - (((((2 * g) / b) % 2) + 2) % 2)
          : 1 - 4 * Math.abs(Math.round(g / b) - g / b)
        : Math.sin(g)),
      (f =
        (l ? 1 - C + C * Math.sin((2 * Math.PI * a) / l) : 1) *
        (0 < f ? 1 : -1) *
        Math.abs(f) ** F *
        q *
        zzfxV *
        (a < e
          ? a / e
          : a < e + m
          ? 1 - ((a - e) / m) * (1 - y)
          : a < e + m + t
          ? y
          : a < h - d
          ? ((h - a - d) / u) * y
          : 0)),
      (f = d
        ? f / 2 +
          (d > a ? 0 : ((a < h - d ? 1 : (h - a) / d) * Z[(a - d) | 0]) / 2)
        : f)),
      (p = (c += v += z) * Math.sin(E * x - I)),
      (g += p - p * B * (1 - ((1e9 * (Math.sin(a) + 1)) % 2))),
      (E += p - p * B * (1 - ((1e9 * (Math.sin(a) ** 2 + 1)) % 2))),
      n && ++n > A && ((c += w), (D += w), (n = 0)),
      !l || ++J % l || ((c = D), (v = H), (n = n || 1));
  return Z;
};
window.zzfxV = 0.3;
window.zzfxR = 44100;
window.zzfxX = new (window.AudioContext || webkitAudioContext)();
window.zzfx = (...t) => zzfxP(zzfxG(...t));

//! ZzFXM (v2.0.3) | (C) Keith Clark | MIT | https://github.com/keithclark/ZzFXM
window.zzfxM = (n, f, t, e = 125) => {
  let l,
    o,
    z,
    r,
    g,
    h,
    x,
    a,
    u,
    c,
    d,
    i,
    m,
    p,
    G,
    M = 0,
    R = [],
    b = [],
    j = [],
    k = 0,
    q = 0,
    s = 1,
    v = {},
    w = ((zzfxR / e) * 60) >> 2;
  for (; s; k++)
    (R = [(s = a = d = m = 0)]),
      t.map((e, d) => {
        for (
          x = f[e][k] || [0, 0, 0],
            s |= !!f[e][k],
            G = m + (f[e][0].length - 2 - !a) * w,
            p = d == t.length - 1,
            o = 2,
            r = m;
          o < x.length + p;
          a = ++o
        ) {
          for (
            g = x[o],
              u = (o == x.length + p - 1 && p) || (c != (x[0] || 0)) | g | 0,
              z = 0;
            z < w && a;
            z++ > w - 99 && u ? (i += (i < 1) / 99) : 0
          )
            (h = ((1 - i) * R[M++]) / 2 || 0),
              (b[r] = (b[r] || 0) - h * q + h),
              (j[r] = (j[r++] || 0) + h * q + h);
          g &&
            ((i = g % 1),
            (q = x[1] || 0),
            (g |= 0) &&
              (R = v[[(c = x[(M = 0)] || 0), g]] =
                v[[c, g]] ||
                ((l = [...n[c]]),
                (l[2] *= 2 ** ((g - 12) / 12)),
                g > 0 ? zzfxG(...l) : [])));
        }
        m = G;
      });
  return [b, j];
};

// TIME UP: zzfx(...[,,360,,.05,.03,2,.74,,,713,.06,,,-130,,,,.23,.85]);

const levels = [
  {
    n: 0,
    pn: "Test", // Planet name
    pg: 1, // Planet gravity
    pa: 1, // Planet atmosphere
    pc: "brown", // Planet color
    parts: [
      // Ship components
      { id: 2, a: "ArrowLeft" },
      { id: 2, a: "ArrowRight" },
      { id: 2, a: "ArrowUp" },
      { id: 2, a: "ArrowDown" },
      { id: 4 },
    ],
    cparts: [
      // Bonus Coil ship components
      { id: 2, a: "s" },
    ],
    sx: 500, // Space station X coord
    sy: 300, // Space station Y coord
    sm: 300, // Space station docking margin
    st: 100, // Space station docking time
    atmh: -2000, // Atmosphere height in px
  },
  {
    n: 1,
    pn: "Recta!", // Planet name
    pc: "yellow",
    pg: 1, // Planet gravity
    pa: 1, // Planet atmosphere
    parts: [
      // Ship components
      { id: 1, a: "a" },
      { id: 2, a: "b" },
      { id: 3, a: "c" },
      { id: 4 },
      { id: 4 },
      { id: 4 },
      { id: 4 },
      { id: 4 },
      { id: 4 },
    ],
    cparts: [
      // Bonus Coil ship components
      { id: 2, a: "s" },
    ],
    sx: 600, // Space station X coord
    sy: -1500, // Space station Y coord
    sm: 100, // Space station docking margin
    st: 100, // Space station docking time
    atmh: -2000, // Atmosphere height in px
  },
  {
    n: 2,
    pn: "Vi",
    pg: 1, // Planet Gravity
    pa: 1, // Planet Atmosphere
    pc: "red",
    parts: [
      { id: 2, a: "h" },
      { id: 2, a: "j" },
      { id: 2, a: "k" },
      { id: 2, a: "l" },
      { id: 4 },
      { id: 4 },
      { id: 4 },
      { id: 4 },
    ],
    cparts: [
      { id: 2, a: "ArrowLeft" },
      { id: 2, a: "ArrowRight" },
      { id: 2, a: "ArrowUp" },
      { id: 2, a: "ArrowDown" },
    ],
    sx: 500,
    sy: 400,
    sm: 300,
    st: 300,
    atmh: -2000,
  },
  {
    n: 3,
    pn: "Coruscant", // Planet name
    pg: 1, // Planet gravity
    pa: 1, // Planet atmosphere
    pc: "grey",
    parts: [
      // Ship components
      { id: 2, a: "s" },
      { id: 2, a: "S" },
      { id: 4 },
      { id: 4 },
      { id: 4 },
    ],
    cparts: [
      // Bonus Coil ship components
      { id: 2, a: "s" },
      { id: 2, a: "S" },
    ],
    sx: 500, // Space station X coord
    sy: 300, // Space station Y coord
    sm: 300, // Space station docking margin
    st: 100, // Space station docking time
    atmh: -2000, // Atmosphere height in px
  },
];

const canvasElem = document.querySelector("canvas");
const ctx = canvasElem.getContext("2d");

const mouse = new Mouse(0, 0);
const background = new Background();
const keyboard = new Keyboard();
const hud = new HUD();

let toAdd = [];
let centeredActor = undefined;

let actors = initMainMenu();
//let actors = initBuild(levels[0]);

let globalCounter = 0;
function clock() {
  globalCounter++;

  const scale = 1; // TODO multiply WIDTH and HEIGHT by scale when necessary! and move this to the constants file.

  // Clear the canvas first
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Adjust camera position to center ship (if enabled)
  ctx.save();
  if (centeredActor) {
    // TODO - assuming centeredActor is always a Ship, fix (COM)
    let xTrans = centeredActor.x + centeredActor.COM.x;
    let yTrans = centeredActor.y + centeredActor.COM.y;

    ctx.translate(WIDTH / 2, HEIGHT / 2); // We want the ship at the center of the screen, not at the top left corner
    ctx.scale(scale, scale);
    //ctx.rotate(-toRad(centeredActor.theta)); // Comment this out if we don't want fixed rotation (broken)
    ctx.translate(-xTrans, -yTrans);
  }

  // Draw all actors
  for (let actor of actors) {
    //console.log("DRAW", globalCounter);
    ctx.save();
    actor.draw(ctx);
    ctx.restore();
  }

  // Restore centered
  ctx.restore();

  // Draw the HUD without any axis transforms
  hud.draw(ctx);

  // Update all actors
  hud.update(null, globalCounter);
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

    if (actor.update(collisions, globalCounter, actors)) {
      toRemove.push(actor);
    }
  }

  // Remove dead actors
  actors = actors.filter(function (el) {
    return toRemove.indexOf(el) < 0;
  });

  // Add any new actors
  for (let addition of toAdd) {
    actors.splice(addition.at ? addition.at : 0, 0, addition.value);
  }
  toAdd = [];

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);

function initMainMenu() {
  hud.clear();
  centeredActor = undefined;
  stopBeep();
  stopMusic();
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
  all.push(new Text(20, 100, "Spaceship Resurrection", "100px Helvetica"));

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
  let ship = new MenuShip(-100, -100, 135);
  all.push(ship);

  let initMovie = () => {
    // Start background gradient
    background.fadeStart = globalCounter;
    // Move Ship
    ship.speed = -10;
    // Move Particles
    particles.speed = 7;
    // Queue Explosion
    actors.push(
      new Future(globalCounter, 120, keyboard, () => {
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
        // Queue Blackout
        actors.push(
          new Future(globalCounter, 100, keyboard, () => {
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
            // Queue Instructions
            actors.push(
              new Future(globalCounter, 90, keyboard, () => {
                actors = actors.filter(function (el) {
                  return el.constructor.name === "Future";
                });
                actors.push(new Rectangle(0, 0, WIDTH, HEIGHT, "black", true));
                actors.push(
                  new Text(
                    20,
                    270,
                    "You've crashed on a hostile planet, but you've escaped death for now...",
                    "39px Helvetica"
                  )
                );
                // Queue Instructions 2
                actors.push(
                  new Future(globalCounter, 180, keyboard, () => {
                    actors.push(
                      new Text(
                        20,
                        310,
                        "However, the same can't be said for your spaceship.",
                        "39px Helvetica"
                      )
                    );
                    // Queue Instructions 2
                    actors.push(
                      new Future(globalCounter, 180, keyboard, () => {
                        actors.push(
                          new Text(
                            20,
                            400,
                            "Rebuild your ship and escape to the space station to survive.",
                            "39px Helvetica"
                          )
                        );
                        actors.push(
                          new Text(
                            20,
                            490,
                            "[Press any key to continue]",
                            "39px Helvetica"
                          )
                        );
                        // Queue Remove All & Show Build Screen
                        actors.push(
                          new Future(globalCounter, undefined, keyboard, () => {
                            actors = initBuild(levels[0]);
                          })
                        );
                      })
                    );
                  })
                );
              })
            );
          })
        );
      })
    );
  };

  let maxLevel = localStorage.getItem("MAX_LEVEL");
  if (maxLevel !== undefined) {
    maxLevel = Math.min(localStorage.getItem("MAX_LEVEL"), levels.length - 1); // Don't show more levels than we have
    for (let level = 0; level < maxLevel; level++) {
      all.push(
        new Button(
          965 - maxLevel * 100 + 100 * level,
          600,
          90,
          100,
          `${level + 1}`,
          "black",
          "white",
          "70px Helvetica",
          75,
          mouse,
          () => {
            if (level === 0) {
              initMovie();
            } else {
              actors = initBuild(levels[level]);
            }
          },
          true,
          28
        )
      );
    }
  }
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
        if (maxLevel === undefined || maxLevel === 0) {
          initMovie();
        } else {
          actors = initBuild(levels[maxLevel]);
        }
      }
    )
  );
  all.push(mouse);
  return all;
}

function initBuild(level, rebuildShip) {
  console.log("Init Build", level.n, rebuildShip);
  let all = [];
  hud.clear();
  stopBeep();
  stopMusic();
  centeredActor = undefined;
  background.fadeStart = undefined;
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
  all.push(new Rectangle(650, 70, 550, 550, "white"));

  let grid = new Grid(650, 70, mouse);
  all.push(grid);

  // Rebuild the ship (if it exists)
  let filteredLevelComponents = level.parts.slice(); // copy
  let filteredCoilComponents = level.cparts.slice(); // copy
  if (rebuildShip) {
    // Find the location of the command module (we want this at location 5,5) - if builder moved the command module :shrug:
    let commandX = 0;
    let commandY = 0;
    for (let part of rebuildShip.parts) {
      if (part instanceof CommandModule) {
        commandX = part.x / PPM;
        commandY = part.y / PPM;
        break;
      }
    }
    // Remove each part from parts lists so they can't be added again
    for (let part of rebuildShip.parts) {
      // Get rid of the reference to the old grid
      part.updateGrid(grid);

      let skip = false;
      // First remove from the normal level parts
      for (let i = 0; i < filteredLevelComponents.length; i++) {
        let levelPart = filteredLevelComponents[i];
        if (levelPart.a === part.key && part instanceof getType(levelPart.id)) {
          filteredLevelComponents.splice(i, 1);
          skip = true;
          break;
        }
      }
      // Then remove it from the coil parts if we didn't find it in the normal parts
      if (!skip) {
        for (let i = 0; i < filteredCoilComponents.length; i++) {
          let coilPart = filteredCoilComponents[i];
          if (coilPart.a === part.key && part instanceof getType(coilPart.id)) {
            filteredCoilComponents.splice(i, 1);
            break;
          }
        }
      }
    }

    for (let part of rebuildShip.parts) {
      let gridX = 5 - commandX + part.x / PPM;
      let gridY = 5 - commandY + part.y / PPM;
      all.push(part);
      grid.addComponent(part, gridX, gridY);
    }
  } else {
    let commandModule = newComponent(500, 500, 0, mouse, grid, null, 0);
    all.push(commandModule);
    grid.addComponent(commandModule, 5, 5);
  }

  // Coil Stuff
  if (document.monetization && document.monetization.state === "started") {
    let hl = unicode("2015");
    all.push(
      new Text(
        60,
        460,
        `${hl.repeat(12)} Bonus Coil Components ${hl.repeat(12)}`,
        "15px Helvetica",
        false,
        "red"
      )
    );
    for (let i = 0; i < filteredCoilComponents.length; i++) {
      all.push(
        newComponent(
          60 + (i % 5) * 102,
          490 + (i % 5) * 2 + (i / 5) * 100,
          0,
          mouse,
          grid,
          filteredCoilComponents[i].a,
          filteredCoilComponents[i].id,
          keyboard
        )
      );
    }
    all.push(new Rectangle(50, 70, 550, 570, "white"));
  } else {
    all.push(new Rectangle(50, 70, 550, 550, "white"));
  }

  for (let i = 0; i < filteredLevelComponents.length; i++) {
    all.push(
      newComponent(
        60 + (i % 5) * 102,
        100 + (i % 5) * 2 + (i / 5) * 100,
        0,
        mouse,
        grid,
        filteredLevelComponents[i].a,
        filteredLevelComponents[i].id,
        keyboard
      )
    );
  }

  all.push(
    new Button(
      950,
      640,
      200,
      50,
      "Main Menu",
      "black",
      "white",
      "35px Helvetica",
      38,
      mouse,
      () => {
        actors = initMainMenu();
      },
      true,
      15
    )
  );

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
        actors = initFly(grid, level);
      }
    )
  );

  all.push(mouse);
  return all;
}

function initFly(grid, level) {
  console.log("INIT FLY", level.n);
  hud.clear();
  hud.resetTimer();
  let chron = new Chronometer(WIDTH - 300, HEIGHT - 20, hud);
  hud.add(chron);

  playMusic();

  let onCrash = (x, y, crashedShip, counter) => {
    // Play crash sound!
    zzfx(...[1.02,,605,.04,.02,.49,4,4.41,.6,.4,,,,.1,,.8,,.43,.16]);

    // Add flaming particles right under the PlanetGround
    let start = 0;
    for (let i = 0; i < actors.length; i++) {
      if (actors[i] instanceof PlanetGround) {
        start = i;
      }
    }

    // Add a fireball for each corner
    let shipPoints = crashedShip.getSceneCoordsOfParts();
    for (let i = 0; i < shipPoints.length; i++) {
      toAdd.push({
        at: start,
        value: new DirectionalParticle(
          shipPoints[i].x,
          WIDTH / 2 - 1, // Copied from PlanetGround TODO: DRY
          0,
          2, // Something
          2, // Frequency
          50, // Length
          10, // Size
          FIRE_COLORS,
          10, // Spread
          3 // Particle velocity
        ),
      });
    }

    // Show the defeat screen
    hud.add(
      new Future(globalCounter, 100, null, () => {
        hud.add(new SlideScreen(counter));
      })
    );

    hud.add(
      new Future(globalCounter, 130, null, () => {
        hud.add(
          new Text(
            WIDTH / 2,
            HEIGHT * 0.25,
            "You did not survive",
            "40px Helvetica",
            true
          )
        );
      })
    );

    hud.add(
      new Future(globalCounter, 150, null, () => {
        hud.add(
          new Button(
            WIDTH / 2 - 20,
            HEIGHT * 0.45,
            200,
            50,
            "Try Again?",
            "black",
            "white",
            "35px Helvetica",
            38,
            mouse,
            () => {
              actors = initBuild(levels[level.n], crashedShip);
            },
            true
          )
        );
      })
    );

    hud.add(
      new Future(globalCounter, 150, null, () => {
        hud.add(
          new Button(
            WIDTH / 2 - 20,
            HEIGHT * 0.65,
            200,
            50,
            "      No      ",
            "black",
            "white",
            "35px Helvetica",
            38,
            mouse,
            () => {
              actors = initMainMenu();
            },
            true
          )
        );
      })
    );
  };

  let ground = new PlanetGround(level);

  let all = [];
  let ship = new Ship(WIDTH / 2, (HEIGHT * 2) / 3, grid, keyboard, onCrash);
  ship.y = ground.y - (ship.h + DIM); // One block above the ground

  let station = new SpaceStation(level, ship, function (counter) {
    // Show the victory screen
    let finishTime = new Date();
    let elapsedTimeMs = Math.abs(finishTime - hud.startTime) / 1000;
    chron.lockedTime = elapsedTimeMs;
    localStorage.setItem(
      "MAX_LEVEL",
      Math.max(level.n + 1, localStorage.getItem("MAX_LEVEL"))
    );
    hud.add(new Confetti());
    hud.add(
      new Future(globalCounter, 100, null, () => {
        hud.add(new SlideScreen(counter));
      })
    );

    hud.add(
      new Future(globalCounter, 130, null, () => {
        hud.add(
          new Text(
            WIDTH / 2,
            HEIGHT * 0.25,
            "You survived!",
            "40px Helvetica",
            true
          )
        );
      })
    );
    hud.add(
      new Future(globalCounter, 135, null, () => {
        hud.add(
          new Text(
            WIDTH / 2,
            HEIGHT * 0.35,
            `Elapsed Time: ${elapsedTimeMs.toFixed(3)} seconds`,
            "20px Helvetica",
            true
          )
        );
      })
    );
    hud.add(
      new Future(globalCounter, 140, null, () => {
        hud.add(
          new Text(
            WIDTH / 2,
            HEIGHT * 0.45,
            `Cargo Saved: ${ship.getCargoCount()} (-5 per container)`,
            "20px Helvetica",
            true
          )
        );
      })
    );
    hud.add(
      new Future(globalCounter, 145, null, () => {
        hud.add(
          new Text(
            WIDTH / 2,
            HEIGHT * 0.55,
            `Total Score: ${(elapsedTimeMs - 5 * ship.getCargoCount()).toFixed(
              3
            )}`,
            "25px Helvetica",
            true
          )
        );
      })
    );
    if (level.n === levels.length) {
      hud.add(
        new Future(globalCounter, 150, null, () => {
          hud.add(
            new Button(
              WIDTH / 2 - 20,
              HEIGHT * 0.65,
              200,
              50,
              "Main Menu",
              "black",
              "white",
              "35px Helvetica",
              38,
              mouse,
              () => {
                actors = initMainMenu();
              },
              true,
              15
            )
          );
        })
      );
    } else {
      hud.add(
        new Future(globalCounter, 150, null, () => {
          hud.add(
            new Button(
              WIDTH / 2 - 20,
              HEIGHT * 0.65,
              200,
              50,
              "Next Level",
              "black",
              "white",
              "35px Helvetica",
              38,
              mouse,
              () => {
                actors = initBuild(levels[level.n + 1]);
              },
              true
            )
          );
        })
      );
    }
  });

  hud.add(new PlanetInfo(50, 70, level));
  hud.add(new Speedometer(20, HEIGHT - 20, ship, ground));
  hud.add(new StationTracker(ship, station, mouse));
  hud.add(
    new Button(
      WIDTH - 100,
      70,
      48,
      48,
      unicode("27F3"),
      "black",
      "white",
      "48px Helvetica",
      36,
      mouse,
      function () {
        actors = initBuild(level, ship);
      },
      true,
      13
    )
  );

  all.push(new PlanetAtmosphere(level.atmh));
  all.push(ground);
  all.push(station);

  // Add Scaffolding for each ship bloc on the x axis
  for (let part of ship.parts) {
    all.push(new Scaffolding(ship.x + part.x, ground.y - DIM));
  }

  all.push(ship);
  mouse.coll = station;
  //all.push(mouse);
  hud.add(mouse);
  centeredActor = ship;
  return all;
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
});

canvasElem.addEventListener("mouseup", function (e) {
  e.preventDefault();
  mouse.click = false;
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
    //zzfx(...[,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]);

    //console.log("Down", event.key);
    keyboard.add(event.key);
  },
  false
);

document.addEventListener(
  "keyup",
  (event) => {
    //console.log("Up", event.key);
    keyboard.remove(event.key);
  },
  false
);
