import { config } from "./ConfigFile.js";

const canvas = document.getElementById("app");
let ctx = canvas.getContext("2d");


export class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.vx = 0;
    this.fx = 0;
    this.y = y;
    this.vy = 0;
    this.fy = 0;
    this.radius = radius;
    this.color = color;
  }

  update() {

    this.x += this.vx;
    if ((this.x + this.vx) < this.radius) {
      this.vx *= config.deceleration
      this.vx = -this.vx;
      this.x = this.radius;
    }
    else if ((this.x + this.vx) > canvas.clientWidth - this.radius) {
      this.vx *= config.deceleration
      this.vx = -this.vx
      this.x = canvas.clientWidth - this.radius;
    }

    this.y += this.vy;
    if ((this.y + this.vy) < this.radius) {
      this.vy *= config.deceleration
      this.vy = -this.vy
      this.y = this.radius;
    } else if ((this.y + this.vy) > canvas.clientHeight - this.radius) {
      this.vy *= config.deceleration
      this.vy = -this.vy
      this.y = canvas.clientHeight - this.radius;
    }
  }

  applyForce() {
    this.vx += this.fx;
    this.vx = this.limit(this.vx, -config.Vmax, config.Vmax);

    this.vy += this.fy;
    this.vy = this.limit(this.vy, -config.Vmax, config.Vmax);
  }
  setForce(fx, fy) {
    this.fx = fx;
    this.fy = fy;
  }

  limit(velocity, lowVmax, upVmax) {
    if (velocity < lowVmax) {
      return lowVmax;
    } else if (velocity > upVmax) {
      return upVmax;
    } else {
      return velocity;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;

    ctx.fill();
    ctx.closePath();
  }
}


