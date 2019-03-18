import { Circle } from "./js/Ball.js";
import detect from "./js/modileDetect.js";
import { config } from "./js/ConfigFile.js";
import { bannerIntro, bannerEnd } from "./js/uiElements.js";
import {
  mouseCss,
  mousePos,
  buttonStart,
  buttonRestart,
  orientationHandler
} from "./js/EventsHandlers.js";

const canvas = document.getElementById("app");

export let blackBall;
let rndArray = [];
let order = 0;
let animationRequestId;

console.log(detect());
//------- Add events and detect platform -------------------
canvas.addEventListener("click", buttonStart);
canvas.addEventListener("click", buttonRestart);

if (detect()) {
  canvas.addEventListener("click", launchIntoFullscreen);
  window.addEventListener("deviceorientation", orientationHandler);
  (config.Vmax = 10),
    (config.Sx = 5),
    (config.Sy = 5),
    (config.deceleration = 0.8);
  config.fontSizeIntro = 35;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
} else {
  if (window.matchMedia("(min-width: 768px)").matches) {
    config.fontSizeIntro = 50;
    window.addEventListener("mousemove", mouseCss);
    console.log("Wersja na desktopy");
  } else {
    config.fontSizeIntro = 35;
    console.log("Wersja mobilna");
  }
  window.addEventListener("mousemove", mousePos);
}

window.addEventListener("resize", function() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    window.addEventListener("mousemove", mouseCss);
    config.fontSizeIntro = 50;
    // console.log('Wersja na desktopy');
  } else {
    config.fontSizeIntro = 35;
    window.removeEventListener("mousemove", mouseCss, false);
    // console.log('Wersja mobilna');
  }
  canvas.style.transform = "";
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  init();
});

// ------ Init method -----------
if (canvas.getContext) {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  var ctx = canvas.getContext("2d");
  init();
} else {
  alert("sry, you should update your browser");
}
// --------  Main init  ---------
export function init() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  animationRequestId = undefined;
  blackBall = null;
  order = 0;
  rndArray = [];
  blackBall = new Circle(
    canvas.clientWidth / 2,
    canvas.clientHeight / 2,
    config.radius,
    "black"
    );
    drawRandomPositions(config.ballAmount);
    rndArray[order].color = "red";
    bannerIntro();
  }
  // --------  Main Loop  ---------
export function start() {
  if (!animationRequestId) {
    animationRequestId = window.requestAnimationFrame(animationLoop);
    config.time = new Date().getTime();
  }
}
export function stop() {
  if (animationRequestId) {
    window.cancelAnimationFrame(animationRequestId);
    animationRequestId = undefined;
  }
}
function animationLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  blackBall.applyForce();
  blackBall.update();
  checkColision();
  for (let el of rndArray) {
    if (el.color === "red") {
      el.draw();
    }
  }
  blackBall.draw();

  if (rndArray.length === order) {
    bannerEnd();
    stop();
  }
  if (rndArray.length !== order) {
    requestAnimationFrame(animationLoop);
  }
}
//--------- Helpers ----------------
// mapping properties
export function mapping(x, Xmin, Xmax, Ymin, Ymax) {
  let a = (Ymin - Ymax) / (Xmin - Xmax);
  let b = Ymax - a * Xmax;
  return a * x + b;
}
// draw basl positions
function drawRandomPositions(amount) {
  const minX = config.radius;
  const maxX = canvas.clientWidth - config.radius;
  const minY = config.radius;
  const maxY = canvas.clientHeight - config.radius;

  for (let i = 0; i < amount; i++) {
    let rndX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
    let rndY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
    if (i !== 0) {
      for (let j = 0; j < rndArray.length; j++) {
        if (
          getDistance({ x: rndX, y: rndY, radius: config.radius }, rndArray[j])
        ) {
          console.log("ta");
          rndX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
          rndY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
          j = -1;
        }
      }
    }
    rndArray.push(new Circle(rndX, rndY, config.radius, "#66A652"));
  }
}
// calcilate distance betveen balls
function getDistance(obj1, obj2) {
  let yDistance = obj1.y - obj2.y;
  let xDistance = obj1.x - obj2.x;
  let dist =
    Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)) -
    (obj1.radius + obj2.radius);
  if (dist <= 0) {
    return true;
  } else {
    return false;
  }
}
// check chechColision
function checkColision() {
  for (let i = 0; i < rndArray.length; i++) {
    if (getDistance(blackBall, rndArray[i]) && i === order) {
      rndArray[order].color = "#66A652";
      order++;
      if (rndArray.length - 1 >= order) {
        rndArray[order].color = "red";
      }
    }
  }
}
// fulscreen
function launchIntoFullscreen() {
  document.documentElement.webkitRequestFullscreen();
}
