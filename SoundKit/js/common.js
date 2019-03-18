"use strict";

// events listeners
window.addEventListener("keypress", playKey);
window.addEventListener("click", playClick);
document.querySelector("#play").addEventListener("click", playAudio);
document.querySelector("#rec1").addEventListener("click", recAudio);
document.querySelector("#rec2").addEventListener("click", recAudio2);
document.querySelector("#rec3").addEventListener("click", recAudio3);
document.querySelector("#rec4").addEventListener("click", recAudio4);

// channels
let channel1 = [];
let channel2 = [];
let channel3 = [];
let channel4 = [];

// sounds key code
const sounds = {
  113: "boom", // Q
  119: "clap", // w
  101: "hihat", //E
  97: "kick", // A
  115: "openhat", //S
  100: "ride", // D
  122: "snare",//Z
  120: "tink",//X
  99: "tom"//C
};

// local varibles
let Chn1reC = false;
let Chn2reC = false;
let Chn3reC = false;
let Chn4reC = false;
let recStart = 0;
let timepause = 0;
let beginRec = true;
let loop = false;

// method play sound after click
function playClick(e) {
  e.preventDefault();
  const button = e.target.closest(".button");
  if (!button.classList.contains("button__sound")) {
    return;
  }
  const soundName = e.target.firstElementChild.id;
  const audioDom = e.target.firstElementChild;
  audioDom.parentElement.classList.add("press");
  setTimeout(() => {
    audioDom.parentElement.classList.remove("press");
  }, 300);
  audioDom.currentTime = 0;
  audioDom.play();

  if (Chn1reC) {
    channel1.push({
      name: soundName,
      time: Date.now() - recStart
    });
  }
  if (Chn2reC) {
    channel2.push({
      name: soundName,
      time: Date.now() - recStart
    });
  }
  if (Chn3reC) {
    channel3.push({
      name: soundName,
      time: Date.now() - recStart
    });
  }
  if (Chn4reC) {
    channel4.push({
      name: soundName,
      time: Date.now() - recStart
    });    
  }
}

// method play sound after keypress
function playKey(e) {
  e.preventDefault();  
  const soundName = sounds[e.charCode];
  const audioDom = document.querySelector(`#${soundName}`);
  console.log(audioDom); 

  audioDom.parentElement.classList.add("press");
  setTimeout(() => {
    audioDom.parentElement.classList.remove("press");
  }, 300);

  audioDom.currentTime = 0;
  audioDom.play();

  if (Chn1reC) {
    channel1.push({
      name: soundName,
      time: Date.now() - recStart
    });
  }
  if (Chn2reC) {
    channel2.push({
      name: soundName,
      time: Date.now() - recStart
    });
  }
  if (Chn3reC) {
    channel3.push({
      name: soundName,
      time: Date.now() - recStart
    });
  }
  if (Chn4reC) {
    channel4.push({
      name: soundName,
      time: Date.now() - recStart
    }); 
  }
}

// RecordButton
function recAudio(e) {
  e.preventDefault();
  recStart = Date.now();
  let button = e.target.closest("#rec1");
  let icon = button.children[0];
  button.classList.toggle("button--active");
  icon.classList.toggle("fa-microphone");
  icon.classList.toggle("fa-microphone-slash");
  Chn1reC = !Chn1reC;
}
// RecordButton
function recAudio2(e) {
  e.preventDefault();
  recStart = Date.now();
  let button = e.target.closest("#rec2");
  let icon = button.children[0];
  button.classList.toggle("button--active");
  icon.classList.toggle("fa-microphone");
  icon.classList.toggle("fa-microphone-slash");
  Chn2reC = !Chn2reC;
}
// RecordButton
function recAudio3(e) {
  e.preventDefault();
  recStart = Date.now();
  let button = e.target.closest("#rec3");
  let icon = button.children[0];
  button.classList.toggle("button--active");
  icon.classList.toggle("fa-microphone");
  icon.classList.toggle("fa-microphone-slash");
  Chn3reC = !Chn3reC;
}
// RecordButton
function recAudio4(e) {
  e.preventDefault();
  recStart = Date.now();
  let button = e.target.closest("#rec4");
  let icon = button.children[0];
  button.classList.toggle("button--active");
  icon.classList.toggle("fa-microphone");
  icon.classList.toggle("fa-microphone-slash");
  Chn4reC = !Chn4reC;
}
// Play button method
function playAudio(e) {
  Chn1reC = false;
  Chn2reC = false;
  Chn3reC = false;
  Chn4reC = false;
  const playedEnded = [true, true, true, true];

  //stop all channels
  let recButtons = [
    ...document.querySelectorAll(
      ".button__channel1, .button__channel2, .button__channel3, .button__channel4"
    )
  ];
  for (let el of recButtons) {
    el.classList.remove("button--active");
    el.firstElementChild.className = "fas fa-microphone";
  }

  // togle clas start
  let button = e.target.closest("#play");
  let icon = button.children[0];
  button.classList.toggle("button--active");
  icon.classList.toggle("fa-play");
  icon.classList.toggle("fa-stop");
  
  // end playing method
  function recordEndChannel1() {
    handler1();   
  }
  function recordEndChannel2() {
    handler2();   
  }
  function recordEndChannel3() {
    handler3();   
  }
  function recordEndChannel4() {
    handler4();   
  }
  // end playing handler
  let handler1 = _.debounce(() => {
    playedEnded[0] = true;   
    playButtonEnd();
  }, 1000);
  let handler2 = _.debounce(() => {
    playedEnded[1] = true;   
    playButtonEnd();
  }, 1000);
  let handler3 = _.debounce(() => {
    playedEnded[2] = true;   
    playButtonEnd();
  }, 1000);
  let handler4 = _.debounce(() => {
    playedEnded[3] = true; 
    playButtonEnd();
  }, 1000);
  
  // toggle class buton
  function playButtonEnd() {
    if(playedEnded.every(el=>el === true)){
      button.classList.toggle("button--active");
      icon.classList.toggle("fa-play");
      icon.classList.toggle("fa-stop");
    }
  }

  // play records 
  channel1.forEach((el, key) => {
    setTimeout(() => {
      playedEnded[0] = false;
      const audioDom = document.querySelector(`#${el.name}`);
      audioDom.currentTime = 0;
      audioDom.play();
      audioDom.addEventListener("ended", recordEndChannel1());    
    }, el.time);
  });
  channel2.forEach((el, key) => {
    setTimeout(() => {
      playedEnded[1] = false;
      const audioDom = document.querySelector(`#${el.name}`);
      audioDom.currentTime = 0;
      audioDom.play();
      audioDom.addEventListener("ended", recordEndChannel2());      
    }, el.time);
  });
  channel3.forEach((el, key) => {
    setTimeout(() => {
      playedEnded[2] = false;
      const audioDom = document.querySelector(`#${el.name}`);
      audioDom.currentTime = 0;
      audioDom.play();
      audioDom.addEventListener("ended", recordEndChannel3());
    }, el.time);
  });
  channel4.forEach((el, key) => {
    setTimeout(() => {
      playedEnded[3] = false;
      const audioDom = document.querySelector(`#${el.name}`);
      audioDom.currentTime = 0;
      audioDom.play();
      audioDom.addEventListener("ended", recordEndChannel4());
    }, el.time);
  });
}
