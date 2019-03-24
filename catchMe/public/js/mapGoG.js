import { styledMapType } from "./mapStyle.js";

let map;

export function initMap(cords) {
    let lat = parseFloat(cords.lat || cords.latitude);
    let lng = parseFloat(cords.lng || cords.longitude);
    let position = new google.maps.LatLng(lat, lng);

    map = new google.maps.Map(document.getElementById("map"), {
      center: position,
      keyboardShortcuts: false,
      disableDefaultUI: true,
      scrollwheel: false,
      zoom: 5,
      minZoom: 8
    });
    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");

    map.setCenter(position)
  }

export function SetMarker(userId , cords,marker) {
  let lat = parseFloat(cords.lat || cords.latitude);
  let lng = parseFloat(cords.lng || cords.longitude);

    // //Remove previous Marker.
    if (marker != null) {
      marker.setMap(null);
    }
    //Set Marker on Map.
    let myLatlng = new google.maps.LatLng(lat, lng);
    return marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      // icon: iconBase + '1.png'
      label: {
        fontWeight: 'bold',
        fontSize: '14px',
        text:`P${userId}`,
      }
    });
  }

 export function centerMap(cords){
    let lat = parseFloat(cords.lat || cords.latitude);
    let lng = parseFloat(cords.lng || cords.longitude);
    let myLatlng = new google.maps.LatLng(lat, lng);
    map.setCenter(myLatlng)
  }