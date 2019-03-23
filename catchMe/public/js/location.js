
export const getLocation = new Promise((resolve, rejects) => {
  if (!navigator.geolocation) {
    console.warn(">Geolocation is not supported by your browser");
    return;
  }

  // static cordinates (Warszawa)
  const data = {
    lat: 52.2319,
    lng: 21.0067
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  //Wait for cords
  async function success(pos) {
    const crd = await pos.coords;
    data.lat = crd.latitude;
    data.lng = crd.longitude;
    resolve(data);
  }

  function error() {
    resolve(ipGeoLoc());
    //  resolve(data);
    // rejects();
  }
});

async function ipGeoLoc(){
  let localIp = await axios.get( `https://ipapi.co/json`).then(res=>res.data)
  return localIp
}
