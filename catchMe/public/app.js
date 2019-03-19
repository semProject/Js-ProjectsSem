import { emitEvent } from "./js/socket.js";
import { initMap, SetMarker } from "./js/mapGoG.js";
import { getLocation } from "./js/location.js";
import * as Config from "./js/config.js";

export let players = [];
export let usersCurrent = {};
let userID;

let message = document.getElementById("message");
let sendBtn = document.getElementById("buttonMessage");

// emit events
sendBtn.addEventListener("click", function() {
  console.log("poszedlo");
  console.log(message.value);
  emitEvent(message.value, Config.PLAYER_MESSAGE, userID);
  message.value = "";
});

export function syncTab(tab) {
  players = tab;
}

// -- main function --
function main() {
  getLocation
    .then(res => {
      initMap(res);
      initGame(res);
    });
}

function initGame(cords) {
  userID = Math.floor(Math.random() * 99999);
  addUser(userID, cords );

  emitEvent(
    `Player ${userID} just connected to the game.`,
    Config.PLAYER_MESSAGE,
    userID
  );
  emitEvent(
    cords,
    Config.PLAYER_CONNECTED,
    userID
  );
}

export function addUser(userID, position ) {
let mark = SetMarker(userID, position)
  let user = {
    userID: userID,
    userPos: position,
    marker:mark,
  };

  players.push(user);
    console.log(user);
}
//-------------------------------------------------------------
window.addEventListener("keyup", onPress);

function onPress(event) {
  let user = players.find(user=>user.userID === userID);
  let { lat, lng } = user.userPos;

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

  emitEvent(
    { lat, lng } ,
    Config.PLAYER_MOVE,
    userID
  );
}

document.addEventListener("DOMContentLoaded", main);
