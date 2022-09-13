import { Ship } from "./actors/Ship";
import { Button } from "./actors/Button";

export function getColor(percentage, colors) {
  if (percentage <= 0) {
    return colors[0];
  } else if (percentage >= 1) {
    return colors[colors.length - 1];
  }

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

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function collide(actorA, actorB) {
  if (!actorA.collide || !actorB.collide) {
    return false;
  }
  let Ax = actorA.x + (actorA.xAdj ? actorA.xAdj : 0);
  let Ay = actorA.y + (actorA.yAdj ? actorA.yAdj : 0);

  let Bx = actorB.x + (actorB.xAdj ? actorB.xAdj : 0);
  let By = actorB.y + (actorB.yAdj ? actorB.yAdj : 0);


  if (
    Ax < Bx + actorB.w &&
    Ax + actorA.w > Bx &&
    Ay < By + actorB.h &&
    actorA.h + Ay > By
  ) {
    return true;
  } else {
    return false;
  }
}

export function isCollidingWith(type, collisions) {
  for (let col of collisions) {
    if (col instanceof type) {
      return true;
    }
  }
  return false;
}

export function randomLetter() {
  let length = 1;
  let result = "";
  let characters = "abcdefghijklmnopqrstuvwxyz0123456789"; //"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Add Shift?? <- this is funny , Also TODO: press shift 6 times to win!
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getThrusterSprite(dim, wid, ang) {
  return `m 0 ${dim} l ${dim / 2 - wid / 2} ${-wid} l ${ang} ${ang} l ${-ang} ${
    wid - ang
  } h ${wid} l ${-ang} ${-(wid - ang)} l ${ang} ${-ang} l ${
    dim / 2 - wid / 2
  } ${wid} v ${-dim} h ${-dim} v ${dim}`;
}

export function toRad(deg) {
  return deg * (Math.PI / 180);
}

export function toDeg(rad) {
  return rad * (180 / Math.PI);
}

export function createTransform(ctx, originX, originY, rotation, scale) {
  var x, y;
  x = Math.cos(rotation) * scale;
  y = Math.sin(rotation) * scale;
  ctx.setTransform(x, y, -y, x, originX, originY);
}

export function pthag(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

// Assuming rectangle isn't rotated
export function collideRectPt(x,y, actor) {
  const buff = .001;
  let Ax = actor.x;
  let Ay = actor.y;
  let Cx = actor.x + actor.w;
  let Cy = actor.y + actor.h;
  let area = (Math.abs(Ax - x) * actor.h + Math.abs(Ay - y) * actor.w + Math.abs(Cy - y) * actor.w + Math.abs(Cx - x) * actor.h) / 2;
  let rectArea = actor.w * actor.h;
  return area > (rectArea+buff) ? false : true;
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function unicode(hex) {
  return String.fromCharCode(parseInt(hex, 16));
}

// Sound function that respects mute
export function sound(sound) {
  if(localStorage.getItem("MT") == "t") {
    return;
  }
  zzfx(...sound);
}

export function playThrust(vol,bit) {
  sound([vol,.3,444,,.29,.23,2,3.6,,,,,.15,1,-15,bit,,.3]); // Explosion 90
}

// Keep this global so we don't have multiple beepers happening
let beep = undefined;
export function startBeep() {
  if(beep === undefined) {
    beep = setInterval(()=>{sound([1.27,0,440,.01,.01,.01,,2.58,,.3,,.05,.04,,.1,-0.1,,.6,.01]);}, 200)
  }
}
export function stopBeep() {
  clearInterval(beep);
  beep = undefined;
}

// This beeping is for the countdown
let countBeep = undefined;
export function startCountBeep() {
  if(countBeep === undefined) {
    let soundInst = [,0,261.6256,,.58,.07,3,1.52,,,,,,.1,,,,.26,.09];
    sound(soundInst);
    countBeep = setInterval(()=>{sound(soundInst);}, 1000)
  }
}
export function stopCountBeep() {
  clearInterval(countBeep);
  countBeep = undefined;
}

let audioNode = undefined;
export function playMusic() {
  if(localStorage.getItem("MO") == "t") {
    return;
  }

  // Create a song
  let song = [[[,0,400,,.06,.13,,.21,.5,,,.05,.19,,.7,,.16,,.03,.38]],[[[,,5,5,10,5,12,,10,5,,10,10,5,12,12,10,8,3,3,8,3,10,,8,3,,3,8,3,10,10,8,6]]],[0],50,{"title":"","instruments":["I"],"patterns":["P"]}]
  let mySongData = zzfxM(...song);
  // Play the song (returns a AudioBufferSourceNode)
  audioNode = zzfxP(...mySongData);
  audioNode.loop = true;
}

export function stopMusic() {
  if(audioNode) {
    audioNode.stop();
  }
}

// Adjust playback rate
export function adjMusic(val) {
  if(audioNode) {
    audioNode.playbackRate.value = val
  }
}

export function f(v) {
  return `${v}px Helvetica`;
}



