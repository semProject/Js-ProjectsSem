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

export function syncEvent(id) {
  console.log(" pingS ");
  socket.emit("sync-ping", { gameId: id });
}
socket.on("sync-ping", function(data) {
  // if (data.gameId === Config.GAME_ID) {
  console.log(" pingR ");
  setData(Config.GAME_ID, players);
  // }
});

//  function setData(id, tab) {
//     console.log("dataSend");
//     socket.emit("setData", { gameId: id, tab });
// }
// socket.on("setData", function(data) {
//     if (data.gameId === Config.GAME_ID) {
//                 console.log(" dataSSSet");
//                 // console.log(data.tab);
//                 // tempTab = data.tab
//                 syncTab(data.tab)
//   }
// });

// listener for events ---------------------------------------------------------------
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

        // players.forEach(player => updateMarker(player.userID,player.userPos)

        //  console.log(players);
        //---
        // emitEvent(
        //   playersData,
        //   Config.GAME_STATE
        // );
        // if (payload.playerId !== hero.playerId) {
        //   addPlayer(payload);
        //   const playersData = players.map(player => ({
        //     playerId: player.playerId,
        //     position: player.position
        //   }));
        //   broadcastWsEvent({ players: playersData }, Events.GAME_STATE);
        // emitEvent()
        // }
        break;
      // case Config.GAME_STATE:
      // updateGameState(payload);
      // break;
    }
  }
});


function updateMarker(id, payload) {
  // -- payload wspolzedne --
  players.find(item => {
    if (item.userID === id) {
      console.log(item.userID);
      item.userPos = payload;
      // item.marker.setMap(null);
      // item.marker = SetMarker(id, payload);
      item.marker = SetMarker(item.userID, item.userPos, item.marker);
    }
  });
}

// // function changeMarkerPosition(user) {
//   function changeMarkerPosition(playId,data) {
//     const player = players.find(item =>
//       item.userID === playId
//       );
//       console.log(player);

// if (player) {
//     player.position = data;
//     player.marker.setPosition(player.position);
// }

//   // let {userPos,marker} = user
//   // let latlng = new google.maps.LatLng(userPos);
//   // console.log(latlng);
//   // marker.setPosition(latlng);

//   // players.push(addUser(player.userID,player.userPos));
// }

function updateGameState(data) {
  // const newPlayers = data.filter(player =>
  //     // console.log(players.some(p => p.playerId === player.playerId))
  //     players.every(p => p.playerId === player.playerId)
  //     );
  //     // console.log('uptGa');
  //     console.log(newPlayers);
  //     console.log(players);
  //     // players = [];
  //     // data.forEach((player,key) =>
  //     //   {
  //     //     players.push(addUser(player.userID,player.userPos));
  //     //   })
}
