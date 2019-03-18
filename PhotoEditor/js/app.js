const canvas = document.getElementById("photo");
const range1 = document.getElementById("sd1");
const range2 = document.getElementById("sd2");
const range3 = document.getElementById("sd3");
const range4 = document.getElementById("sd4");
const btnGray = document.getElementById("buttonGray");
const buttonReset = document.getElementById("buttonReset");
let color = document.getElementById("colorPic");

let cv = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let imageDataOrigin;
let imageDataTemp;
//--- Load image ---
function loadImage() {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", () => {
      reject(new Error(`Failed to load image's `));
    });
    img.src = "b21.jpg";
  });
}
loadImage()
  .then(result => {
    cv.drawImage(result, 0, 0, canvas.width, canvas.height);
    imageDataOrigin = cv.getImageData(0, 0, canvas.width, canvas.height);
    imageDataTemp = cv.getImageData(0, 0, canvas.width, canvas.height);
  })
  .catch(err => console.error(err));

//-------------- Events listeners ------------------------
canvas.addEventListener("mousemove", pick);

range1.addEventListener("input", function() {
  opacity(sd1.value);
});
range2.addEventListener("input", function() {
  contrast( sd2.value);
});
range3.addEventListener("input", function() {
  invertColors( sd3.value);
});
range4.addEventListener("input", function() {
  applyBrightness( sd4.value);
});
btnGray.addEventListener("click", function() {
  grayscaleButton( );
});

//-------------- Events listeners ------------------------
function opacity(value) {
  let rangeMap = Math.ceil(mapping(value, 0, 100, 0, 255));

  let dataOrigin = imageDataOrigin.data;
  let data = imageDataTemp.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = dataOrigin[i]; // red
    data[i + 1] = dataOrigin[i + 1]; // green
    data[i + 2] = dataOrigin[i + 2]; // blue
    data[i + 3] = rangeMap; // alpha
  }
  cv.putImageData(imageDataTemp, 0, 0);
}
function grayscaleButton() {
  let data = imageDataTemp.data;
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i]     = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  cv.putImageData(imageDataTemp, 0, 0);
};

function contrast(value) {
  let rangeMap = Math.ceil(mapping(value, 0, 100, -100, 100));

  let dataOrigin = imageDataOrigin.data;
  let data = imageDataTemp.data;

  rangeMap *= 2.55;
  var factor = (255 + rangeMap) / (255.01 - rangeMap);
  for (var i = 0; i < data.length; i += 4) {
    data[i] = factor * (dataOrigin[i] - 128) + 128; //r value
    data[i + 1] = factor * (dataOrigin[i + 1] - 128) + 128; //g value
    data[i + 2] = factor * (dataOrigin[i + 2] - 128) + 128; //b value
  }
  cv.putImageData(imageDataTemp, 0, 0);
}

function invertColors(value) {
  let rangeMap = Math.ceil(mapping(value, 0, 100, 0, 255));

  let dataOrigin = imageDataOrigin.data;
  let data = imageDataTemp.data;

  for (var i = 0; i < data.length; i+= 4) {
    data[i] = dataOrigin[i] ^ rangeMap; // Invert Red
    data[i+1] = dataOrigin[i+1] ^ rangeMap; // Invert Green
    data[i+2] = dataOrigin[i+2] ^ rangeMap; // Invert Blue
  }
  cv.putImageData(imageDataTemp, 0, 0);
}

function applyBrightness( value) {
  let rangeMap = mapping(value, 0, 100, 0, 10);

  let dataOrigin = imageDataOrigin.data;
  let data = imageDataTemp.data;

  for (var i = 0; i < data.length; i+= 4) {
    data[i] = dataOrigin[i] / rangeMap;
    data[i+1] = dataOrigin[i+1] / rangeMap ;
    data[i+2] =  dataOrigin[i+2] / rangeMap;
  }
  cv.putImageData(imageDataTemp, 0, 0);
}

function pick(event) {
  let x = event.layerX;
  let y = event.layerY;
  let pixel = cv.getImageData(x, y, 1, 1);
  let data = pixel.data;
  let rgba =
    "rgba(" +
    data[0] +
    ", " +
    data[1] +
    ", " +
    data[2] +
    ", " +
    data[3] / 255 +
    ")";
  color.style.background = rgba;
  color.textContent = rgba;
}

// mapping properties
function mapping(x, Xmin, Xmax, Ymin, Ymax) {
  let a = (Ymin - Ymax) / (Xmin - Xmax);
  let b = Ymax - a * Xmax;
  return a * x + b;
}
