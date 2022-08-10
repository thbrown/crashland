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
    ctx.fillStyle = "white";
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
  }
}

class DirectionalParticle extends Actor {
  constructor(x, y, angle, count, length, size, color) {
    super();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.size = size;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(
        new Particle(
          this.x,
          this.y,
          this.angle,
          this.length,
          this.size,
          this.color
        )
      );
    }
  }

  draw(ctx) {
    for (let part of this.particles) {
      part.draw(ctx);
    }
  }

  update() {
    for (let part of this.particles) {
      part.update();
    }
  }
}

class Particle extends Actor {
  constructor(x, y, angle, length, size, color) {
    super();
    this.speed = 15;
    this.origX = x;
    this.origY = y;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.size = size;
    this.color = color;
    this.counter = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw circle
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.counter++;
    this.x -=
      this.speed * Math.sin((-this.angle / 360) * 2 * Math.PI) +
      randomIntFromInterval(-4, 4);
    this.y -=
      this.speed * Math.cos((-this.angle / 360) * 2 * Math.PI) +
      randomIntFromInterval(-4, 4);
    if (this.counter > this.length) {
      this.x = this.origX;
      this.y = this.origY;
      this.counter = 0;
    }
    //console.log(this.counter, this.length, this.x, this.y);
  }
}
