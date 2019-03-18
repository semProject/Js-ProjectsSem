import { emitEvent, syncEvent } from "./js/socket.js";
import { initMap, SetMarker } from "./js/mapGoG.js";
import { getLocation } from "./js/location.js";
import * as Config from "./js/config.js";

// let map, marker, infoWindow;
// let position = { lat: -34.397, lng: 150.644 };
let PLAYER_SPEED = 1;
export let players = [];
export let usersCurrent = {};
let userID;
// let serverPlayersAmount;
const gameID = "This_Game";

// word wrap massage ----
// send syns message eith
//------

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
  // initConnecton();
  getLocation
    // .then(res=>console.log(res))
    .then(res => {
      initMap(res);
      initGame(res);
    });
}

function initGame(cords) {
  userID = Math.floor(Math.random() * 99999);
  addUser(userID, cords );
  // SetMarker(userID, cords);
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
    // marker:marker,
    marker:mark,
  };
  // map.setCenter(position)
  // usersCurrent = user
  players.push(user);
    console.log(user);
}
//-------------------------------------------------------------
window.addEventListener("keyup", function(e) {
  // onKeyPress();
  // console.log(e.key);
  // console.log(players);
  onKeyPress(e);
});

function onKeyPress(event) {
  let userXXX = players.find(user=>user.userID === userID);
  console.log(userXXX);
  let { lat, lng } = userXXX.userPos;

  // console.log(players[0].userPos);
  switch (event.key) {
    case "ArrowLeft":
      // changeMarkerPosition(players)
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

  // console.log(lat, lng);
  // SetMarker(userID, { lat, lng });
  emitEvent(
    { lat, lng } ,
    Config.PLAYER_MOVE,
    userID
  );
  // // broadcastWsEvent({ lat, lng }, Events.PLAYER_MOVE);
}

document.addEventListener("DOMContentLoaded", main);
