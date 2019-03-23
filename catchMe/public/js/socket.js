import * as Config from "./config.js";
import { players, addUser, userID } from "../app.js";
import { SetMarker, centerMap } from "./mapGoG.js";

let dialBox = document.getElementById("posts");
let socket = io.connect("http://localhost:4000");

// ---  emit event -----------
export function emitEvent(payload, type, playerID) {
  const messageObject = {
    gameId: Config.GAME_ID,
    playerId: playerID,
     date: Date.now(),
    type,
    payload
  };
  socket.emit("Marker-Race", messageObject);
}
// ---  listener for events -----------
socket.on("Marker-Race", function(data) {
  if (data.gameId === Config.GAME_ID) {
    const { playerId, date, type, payload } = data;

    switch (type) {
      case Config.PLAYER_MOVE:
        // console.log("Case Move");
        changeMarkerPosition(playerId, payload);
        break;

      case Config.PLAYER_MESSAGE:
        //console.log("Case Message");
        let post = `<li class="list-group-item post">${playerId}: ${payload}</li>`;
        dialBox.innerHTML += post;
        break;

      case Config.PLAYER_CONNECTED:
        if (playerId !== userID) {
          //  console.log("NewGay");
          addUser(playerId, payload);
          let playersTemp = players.map(player => ({
            userID: player.userID,
            userPos: player.userPos
          }));
          emitEvent({ playersTemp: playersTemp }, Config.PLAYER_SYNC);
        }
        break;
      case Config.PLAYER_SYNC:
        // console.log("Case Sync");
        gameSync(payload);
        break;
    }
    function gameSync(data) {
      data.playersTemp.forEach(playerTemp => {
        if (!players.some(el => el.userID === playerTemp.userID)) {
          addUser(playerTemp.userID, playerTemp.userPos);
        }
      });
    }
  }
});
// -- position change ---
function changeMarkerPosition(playId, data) {
  const player = players.find(item => item.userID === playId);

  if (player) {
    player.userPos = data;
    player.marker.setPosition(player.userPos);

    if (userID === playId) {
      centerMap(player.userPos);
    }
  }
}
