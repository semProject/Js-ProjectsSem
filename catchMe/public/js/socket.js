import * as Config from "./config.js";
import { players, syncTab, addUser, usersCurrent } from "../app.js";
import { SetMarker } from "./mapGoG.js";
// console.log(players);
let tempTab;
let dialBox = document.getElementById("posts");
let socket = io.connect("http://localhost:4000");

export function emitEvent(payload, type, playerID) {
  const messageObject = {
    gameId: Config.GAME_ID,
    playerId: playerID,
    // date: Date.now(),
    type,
    payload
  };
  socket.emit("Marker-Race", messageObject);
}
// listener for events ------------------------
socket.on("Marker-Race", function(data) {
  if (data.gameId === Config.GAME_ID) {
    // console.log("Message received: ", data);
    const { playerId, date, type, payload } = data;
    switch (type) {
      case Config.PLAYER_MOVE:
        updateMarker(playerId, payload);
        // changeMarkerPosition(playerId, payload);
        break;
      case Config.PLAYER_MESSAGE:
        let post = `<li class="list-group-item">${playerId}: ${payload}</li>`;
        dialBox.innerHTML += post;
        break;
      case Config.PLAYER_CONNECTED:
        players.find(item => {
          if (item.userID !== playerId) {
            // addUser(playerId, payload );
            addUser(playerId, payload);
          }
        });

        players.forEach(
          player =>
            (player.marker = SetMarker(
              player.userID,
              player.userPos,
              player.marker
            ))
        );
        break;
    }
  }
});

function updateMarker(id, payload) {
  // -- payload wspolzedne --
  players.find(item => {
    if (item.userID === id) {
      console.log(item.userID);
      item.userPos = payload;
      item.marker = SetMarker(item.userID, item.userPos, item.marker);
    }
  });
}

