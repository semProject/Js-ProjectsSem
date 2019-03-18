import { config } from "./ConfigFile.js";
import { stop } from "../index.js";

const canvas = document.getElementById("app");
let ctx = canvas.getContext("2d");

export function bannerIntro(e) {
  // intro
  let cvHalfW = canvas.width / 2;
  ctx.fillStyle = "#368";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //banner
  ctx.font = `${config.fontSizeIntro}px serif`;
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText(config.introText, canvas.width / 2, (canvas.height * 1) / 3);
  //start button
  ctx.strokeRect(
    cvHalfW - cvHalfW / 2,
    canvas.height / 1.5,
    cvHalfW,
    config.fontSizeButton + 10
  );

  ctx.font = `${config.fontSizeButton}px serif`;
  ctx.textAlign = "center";
  ctx.fillText(
    "Start",
    canvas.width / 2,
    canvas.height / 1.5 + config.fontSizeButton
  );
}
export function bannerEnd(e) {
  let cvHalfW = canvas.width / 2;
  // intro
  ctx.fillStyle = "#368";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //banner
  ctx.font = `${config.fontSizeIntro}px serif`;
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  //   console.log(time(elapsed))
  ctx.fillText(time(), canvas.width / 2, (canvas.height * 1) / 3);

  //restart button
  ctx.strokeRect(
    cvHalfW - cvHalfW / 2,
    canvas.height / 1.8,
    cvHalfW,
    config.fontSizeButton + 10
  );

  ctx.font = `${config.fontSizeButton}px serif`;
  ctx.textAlign = "center";
  ctx.fillText(
    "Restart",
    canvas.width / 2,
    canvas.height / 1.8 + config.fontSizeButton
  );
}

function time() {
  let start = config.time;
  var elapsed = new Date().getTime() - start;
  return new Date(elapsed).toISOString().slice(11, -1);
}
