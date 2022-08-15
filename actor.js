class Actor {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.shape = shape;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
    ctx.restore();
  }

  update() {}
}

class Text extends Actor {
  constructor(x, y, value, font) {
    super();
    this.x = x;
    this.y = y;
    this.value = value;
    this.font = font;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = this.font;
    ctx.fillText(this.value, this.x, this.y);
    ctx.restore();
  }

  //update() {}
}

class Streak extends Actor {
  constructor(x, y, length) {
    super();
    this.x = x;
    this.y = y;
    this.length = length;
  }

  draw(ctx) {
    ctx.save();
    ctx.lineWidth = 3;
    //ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length, this.y + this.length);
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.x -= 15;
    this.y -= 15;
    if (this.x < 0) {
      this.x = WIDTH;
    }

    if (this.y < 0) {
      this.y = HEIGHT;
    }
  }
}

class Ship extends Actor {
  constructor(x, y, angle) {
    super();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.xShake = 0;
    this.yShake = 0;
    this.speed = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(WIDTH / 2, HEIGHT / 2);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.translate(this.x + this.xShake, this.y + this.yShake);
    ctx.lineWidth = 3;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.fill(SPACE_SHIP);
    ctx.restore();
  }

  update() {
    this.xShake = randomIntFromInterval(-2, 2);
    this.yShake = randomIntFromInterval(-2, 2);
    this.y += this.speed;
  }
}

class Button extends Actor {
  constructor(x, y, w, h, text, buttonColor, textColor, font, yOffset, mouse, onClick) {
    super();
    this.x = x;
    this.y = y;
    this.text = text;
    this.buttonColor = buttonColor;
    this.originalButtonColor = buttonColor;
    this.textColor = textColor;
    this.originalTextColor = textColor;
    this.w = w;
    this.h = h;
    this.collide = true;
    this.onClick = onClick;
    this.mouse = mouse;
    this.font = font;
    this.yOffset = yOffset;
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.buttonColor;
    ctx.strokeStyle = this.textColor;

    ctx.roundRect(this.x, this.y, this.w, this.h, 10).fill();
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();

    ctx.fillStyle = this.textColor;
    ctx.font = this.font;
    ctx.fillText(this.text, this.x + 20, this.y + this.yOffset);
    ctx.restore();
  }

  update(collisions) {
    let mouseClicked = false;
    if (isCollidingWith(Mouse, collisions)) {
      this.buttonColor = this.originalTextColor;
      this.textColor = this.originalButtonColor;
      mouseClicked = true;
      if (this.mouse.click) {
        // TODO: this happens if you click off the button and drag onto it
        this.onClick();
        return true;
      }
    }
    if (!mouseClicked) {
      this.buttonColor = this.originalButtonColor;
      this.textColor = this.originalTextColor;
    }
  }
}

class Mouse extends Actor {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.collide = true;
    this.w = 2;
    this.h = 2;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.w, this.h, 10);
    ctx.restore();
  }

  update() {
    if (this.dragged) {
      if (!this.click) {
        if (this.dragged.onRelease) {
          this.dragged.onRelease();
        }
        this.dragged = undefined;
        return;
      }
      this.dragged.x = mouse.x - this.dragged.w / 2;
      this.dragged.y = mouse.y - this.dragged.h / 2;
    }
  }
}

class Background extends Actor {
  constructor() {
    super();
    this.fadeStart = 99999999999;
    this.color = "black";
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
  }

  update(collisions, globalCounter) {
    if (this.fadeStart <= globalCounter) {
      let progress = (globalCounter - this.fadeStart) / 150;
      if (progress >= 1) {
        this.color = "rgb(135,206,235)";
      } else {
        this.color = getColor(progress, [
          "rgb(0,0,0)", // Black
          "rgb(135,206,235)", // Sky Blue
        ]);
        this.x += this.speed;
      }
    }
  }
}

class Future extends Actor {
  constructor(counter, onCounter) {
    super();
    this.counter = counter;
    this.onCounter = onCounter;
  }

  update(collisions, globalCounter) {
    if (globalCounter >= this.counter) {
      this.onCounter();
      return true;
    }
  }
}

class Rectangle extends Actor {
  constructor(x, y, w, h, color) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.roundRect(this.x, this.y, this.w, this.h, 10).stroke();
    ctx.restore();
  }
}

class DirectionalParticle extends Actor {
  constructor(x, y, angle, count, frequency, length, size, color, spread) {
    super();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.size = size;
    this.color = color;
    this.particles = [];
    this.count = count;
    this.frequency = frequency;
    this.speed = 0;
    this.spread = spread;
  }

  draw(ctx) {
    for (let part of this.particles) {
      part.draw(ctx);
    }
  }

  update() {
    let toRemove = [];

    this.x += this.speed;
    this.y += this.speed;

    for (let part of this.particles) {
      if (part.update()) {
        toRemove.push(part);
      }
    }
    // Remove dead parts
    this.particles = this.particles.filter(function (el) {
      return toRemove.indexOf(el) < 0;
    });

    // Add new ones
    let random = Math.random();
    if (random < this.frequency) {
      for (let i = 0; i < this.count; i++) {
        this.particles.push(
          new Particle(
            this.x,
            this.y,
            this.angle,
            this.length,
            this.size,
            this.color,
            this.spread
          )
        );
      }
    }
  }
}

class Particle extends Actor {
  constructor(x, y, angle, length, size, color, spread) {
    super();
    this.speed = 15;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.size = size;
    this.initialColor = color;
    this.color = color[0];
    this.counter = 0;
    this.spread = spread;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw circle
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x -=
      this.speed * Math.sin((-this.angle / 360) * 2 * Math.PI) +
      randomIntFromInterval(-this.spread, this.spread);
    this.y -=
      this.speed * Math.cos((-this.angle / 360) * 2 * Math.PI) +
      randomIntFromInterval(-this.spread, this.spread);
    this.size = Math.max(this.size + randomIntFromInterval(0, 3), 0);

    this.color = getColor(this.counter / this.length, this.initialColor);

    this.counter++;
    if (this.counter > this.length) {
      return true;
    }
  }
}

class Component extends Actor {
  constructor(x, y, mouse, grid) {
    super();
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.collide = true;
    this.mouse = mouse;
    this.grid = grid;
    this.onRelease = function () {
      let targetLocation = this.grid.getClosestValidLocation(this.x, this.y);
      if(targetLocation === undefined) {
        return;
      }
      let locSplit = targetLocation.split(",");
      let locX = parseInt(locSplit[0]);
      let locY = parseInt(locSplit[1]);

      this.grid.addComponent(this, locX, locY);
    };
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    ctx.strokeStyle = this.color;
    ctx.roundRect(this.x, this.y, this.w, this.h, 5).fill();
    ctx.roundRect(this.x, this.y, this.w, this.h, 5).stroke();
    ctx.restore();
  }

  update(collisions, globalCounter) {
    if (isCollidingWith(Mouse, collisions)) {
      //this.buttonColor = this.originalTextColor;
      //this.textColor = this.originalButtonColor;
      //mouseClicked = true;
      if (this.mouse.click && !this.mouse.dragged) {
        this.mouse.dragged = this;

        // Remove this component from the grid (if it's on the grid)
        for (let i = 0; i < Object.keys(this.grid.components).length; i++) {
          if (
            this.grid.components[Object.keys(this.grid.components)[i]] === this
          ) {
            delete this.grid.components[Object.keys(this.grid.components)[i]];
            return;
          }
        }
      }
    }
  }
}

class Grid extends Actor {
  constructor(x, y, mouse) {
    super();
    this.x = x;
    this.y = y;
    this.dim = 50;
    this.num = 11;
    this.mouse = mouse;
    this.components = {};
  }

  getClosestValidLocation(x, y) {
    const MIN_DISTANCE = 100;
    let validKeys = this.getValidLocations();
    let minValue = 999999;
    let minLocation = undefined;
    for (let key of validKeys) {
      let locSplit = key.split(",");
      let locX = parseInt(locSplit[0]);
      let locY = parseInt(locSplit[1]);
      let dist = Math.sqrt(
        Math.pow(x - (this.x + locX * this.dim), 2) +
          Math.pow(y - (this.y + locY * this.dim), 2)
      );

      if(dist < minValue && dist < MIN_DISTANCE) {
        minValue = dist;
        minLocation = key;
      }
    }
    return minLocation;
  }

  getValidLocations() {
    // BFS on components to find valid neighbor locations
    if (Object.keys(this.components).length === 0) {
      // TODO: all locations valid if nothing is on the grid? OR make command module immovable?
      return [];
    }

    let start = Object.keys(this.components)[0];
    let queue = [start];
    let visited = new Set();
    let results = [];

    while (queue.length > 0) {
      let nodeKey = queue.shift();
      let nodeSplit = nodeKey.split(",");
      let nodeX = parseInt(nodeSplit[0]);
      let nodeY = parseInt(nodeSplit[1]);

      let leftKey = [nodeX - 1, nodeY].join(",");
      let rightKey = [nodeX + 1, nodeY].join(",");
      let topKey = [nodeX, nodeY - 1].join(",");
      let bottomKey = [nodeX, nodeY + 1].join(",");

      let allKeys = [leftKey, rightKey, topKey, bottomKey];
      for (let key of allKeys) {
        if (visited.has(key)) {
          // Do Nothing
        } else if (this.components[key]) {
          // Queue component
          queue.push(key);
          visited.add(key);
        } else {
          // Add Result
          results.push(key);
        }
      }
    }

    return results;
  }

  addComponent(toAdd, x, y) {
    // First snap the component to the grid
    toAdd.x = this.x + this.dim * x;
    toAdd.y = this.y + this.dim * y;

    // Then add the component to the list
    let key = `${x},${y}`;
    this.components[key] = toAdd;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "white";

    /*
    // Horizontal Lines
    for (let i = 0; i < this.num; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + this.dim * i);
      ctx.lineTo(this.x + this.dim * this.num, this.y + this.dim * i);
      ctx.stroke();
    }

    // Vertical Lines
    for (let i = 0; i < this.num; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x + this.dim * i, this.y);
      ctx.lineTo(this.x + this.dim * i, this.y + this.dim * this.num);
      ctx.stroke();
    }
    */

    // Draw any highlighted components (if something is being dragged by the mouse)
    if (this.mouse.dragged) {
      let validLocations = this.getValidLocations();
      let closestValidLocation = this.getClosestValidLocation(this.mouse.dragged.x, this.mouse.dragged.y);

      for (let location of validLocations) {
        let locSplit = location.split(",");
        let locX = parseInt(locSplit[0]);
        let locY = parseInt(locSplit[1]);

        if(location === closestValidLocation) {
          ctx.strokeStyle = "green";
        } else {
          ctx.strokeStyle = "red";
        }
        ctx.lineWidth = 3;
        const shrink = 6;
        ctx
          .roundRect(
            this.x + this.dim * locX + shrink / 2,
            this.y + this.dim * locY + shrink / 2,
            this.dim - shrink,
            this.dim - shrink,
            5
          )
          .stroke();
      }
    }

    // TODO: Find the closest highlighted component, if it's withing some range, highlight it! or animate it!

    ctx.restore();
  }

  update(collisions, globalCounter) {}
}
