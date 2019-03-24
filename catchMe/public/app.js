import { emitEvent } from "./js/socket.js";
import { initMap, SetMarker } from "./js/mapGoG.js";
import { getLocation } from "./js/location.js";
import * as Config from "./js/config.js";

let message = document.getElementById("message");
let sendBtn = document.getElementById("buttonMessage");

export const players = [];
export let userID;

//--- Add event listeners ---
try{
  sendBtn.addEventListener("click", sendMessage);
  window.addEventListener("keyup",  onKeyPress);
}catch(err){}

// -- main function --
function main() {
  getLocation
    .then(res => {
      initMap(res);
      initGame(res);
    }).catch(err => console.warn(err));
}
// init game
function initGame(cords) {
  userID = Math.floor(Math.random() * 10);
  addUser(userID, cords);
  emitEvent(
    `New player connected to the game.`,
    Config.PLAYER_MESSAGE,
    userID
  );
  emitEvent(cords, Config.PLAYER_CONNECTED, userID);
}
// add User
export function addUser(userID, position) {
  let mark = SetMarker(userID, position);
  let user = {
    userID: userID,
    userPos: position,
    marker: mark
  };
  players.push(user);
}
//player move
function onKeyPress(event) {
  let curentUser = players.find(user => user.userID === userID);
  let { lat, lng } = curentUser.userPos;

  switch (event.key) {
    case "ArrowLeft":
      lng -= Config.PLAYER_SPEED;
      break;
    case "ArrowRight":
      lng += Config.PLAYER_SPEED;
      break;
    case "ArrowUp":
      lat += Config.PLAYER_SPEED;
      break;
    case "ArrowDown":
      lat -= Config.PLAYER_SPEED;
      break;
  }
  emitEvent({ lat, lng }, Config.PLAYER_MOVE, userID);
}
// send message
function sendMessage(){
  emitEvent(message.value, Config.PLAYER_MESSAGE, userID);
  message.value = "";
}
document.addEventListener("DOMContentLoaded", main);
