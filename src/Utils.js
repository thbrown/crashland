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
