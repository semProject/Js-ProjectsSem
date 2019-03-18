import { config } from "./ConfigFile.js";
import { mapping, blackBall, start, stop, init } from "../index.js";

const canvas = document.getElementById("app");
let ctx = canvas.getContext("2d");

// start button
export function buttonStart(e) {
  let cvHalfW = canvas.width / 2;
  let x = e.layerX;
  let y = e.layerY;
  if (x > cvHalfW - cvHalfW / 2) {
    if (x < cvHalfW - cvHalfW / 2 + cvHalfW) {
      if (y > canvas.height / 1.5) {
        if (y < canvas.height / 1.5 + (config.fontSizeButton + 10)) {
          start();
        }
      }
    }
  }
}
// reset button
export function buttonRestart(e) {
  let cvHalfW = canvas.width / 2;
  let x = e.layerX;
  let y = e.layerY;
  if (x > cvHalfW - cvHalfW / 2) {
    if (x < cvHalfW - cvHalfW / 2 + cvHalfW) {
      if (y > canvas.height / 1.8) {
        if (y < canvas.height / 1.8 + (config.fontSizeButton + 10)) {
          init();
        }
      }
    }
  }
}
// orientation handler
export function orientationHandler(evt) {
  let axisY = Math.round(evt.gamma); // 90 +/-
  let axisX = Math.round(evt.beta); // 180 +/-
  let mapValueX;
  let mapValueY;

  if (axisX > 90) {
    axisX = 90;
  } else if (axisX < -90) {
    axisX = -90;
  }

  mapValueX = mapping(axisY, -90, 90, -config.Sx, config.Sx);
  mapValueY = mapping(axisX, -90, 90, -config.Sy, config.Sy);
  blackBall.setForce(mapValueX, mapValueY);
}
// pitch canvas css
export function mouseCss(e) {
  let X = e.layerX;
  let Y = e.layerY;
  let maxX = canvas.width / 2;
  let maxY = canvas.height / 2;

  let axisX = Math.floor((X - maxX) / 50);
  let axisY = Math.floor((Y - maxY) / 35) * -1;

  canvas.style.transform = `perspective(600px) `;
  canvas.style.transform += `rotateY(${axisX}deg) `;
  canvas.style.transform += `rotateX(${axisY}deg) `;
}
// mouse mapping into velocity
export function mousePos(e) {
  let mouseX = e.x;
  let mouseY = e.y;

  let halfWidth = innerWidth / 2;
  let halfHeight = innerHeight / 2;

  let mouseFromCenterX = mouseX - halfWidth;
  let mouseFromCenterY = mouseY - halfHeight;

  let mapValueX = mapping(
    mouseFromCenterX,
    -halfWidth,
    halfWidth,
    -config.Sx,
    config.Sx
  );
  let mapValueY = mapping(
    mouseFromCenterY,
    -halfHeight,
    halfHeight,
    -config.Sy,
    config.Sy
  );

  blackBall.setForce(mapValueX, mapValueY);
}
