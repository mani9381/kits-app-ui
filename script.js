startButton = document.getElementById('letsStart');
startLeft = document.getElementById('startLeft');
forwardLeftFrec = document.getElementById('forwardLeftFrec');
forwardRightFrec = document.getElementById('forwardRightFrec');
finalButton = document.getElementById('finalButton');

stopLeft = document.getElementById('stopLeft');
restartLeft = document.getElementById('restartLeft');

// Divs
const intro = document.querySelector('.intro');
const interface = document.querySelector('.interface');

const left = document.querySelector('.left');
const right = document.querySelector('.right');

const config = document.querySelector('.config');
const result = document.querySelector('.result');

const optionsLeft = document.querySelector('.optionsLeft');
const optionsRight = document.querySelector('.optionsRight');

//Name and Email

const name = document.getElementById('name').addEventListener("change",(e)=>{e.preventDefault();localStorage.setItem('name',e.target.value)});
const email = document.getElementById('email').addEventListener("change",(e)=>{e.preventDefault();localStorage.setItem('email',e.target.value)})


const show = document.querySelector('.show-frequency');

window.addEventListener("load", start);

document.getElementById('startLeft').addEventListener("click", startFrequenciaLeft);

document.getElementById('rangeLeftFrec').addEventListener("change", changeFrequenciaLeft);
document.getElementById('rangeLeftVol').addEventListener("change", changeVolumenLeft);

document.getElementById('rangeRightFrec').addEventListener("change", changeFrequenciaRight);
document.getElementById('rangeRightVol').addEventListener("change", changeVolumenRight);

finalButton.addEventListener('click', final);

// Variables globals
var leftFrec = 0;
var rightFrec = 0;
var leftSound = 0.3;
var rightSound = 0.3;

function start() {
  try{
    window.AudioContext = window.AudioContext || window.webKitAudioContext;
    audioContext = new AudioContext();
  }
  catch(e) {
    alert("The API doesn't work. :(");
  }
}


function startFrequenciaLeft() {
  var form = document.getElementById('form')

  form.style.display='none'
  let rangeLeftFrec = document.getElementById('rangeLeftFrec').value;
  
  leftOscillator = audioContext.createOscillator();
  leftGain = audioContext.createGain();
  rightOscillator = audioContext.createOscillator();
  rightGain = audioContext.createGain();
  merger = audioContext.createChannelMerger(2);

  leftOscillator.connect(leftGain).connect(merger, 0, 0);
  rightOscillator.connect(rightGain).connect(merger, 0, 1);

  merger.connect(audioContext.destination); 

  leftOscillator.frequency.value = rangeLeftFrec;
  leftFrec = rangeLeftFrec;

  leftGain.gain.value = 0.3;
  leftOscillator.start(0);

  document.querySelector(".show-frequency-left").innerHTML = rangeLeftFrec + "Hz";
}

function changeFrequenciaLeft() {
  let rangeLeftFrec = document.getElementById('rangeLeftFrec').value;

  leftOscillator.frequency.value = rangeLeftFrec;
  leftFrec = rangeLeftFrec;

  document.querySelector(".show-frequency-left").innerHTML = rangeLeftFrec + "Hz";
}

function changeVolumenLeft() {
  let rangeLeftVol = document.getElementById('rangeLeftVol').value;
  let volume = rangeLeftVol / 1000;
  leftGain.gain.value = volume;
  leftSound = rangeLeftVol;
}

function startFrequenciaRight() {
  let rangeRightFrec = document.getElementById('rangeRightFrec').value;

  rightOscillator.frequency.value = rangeRightFrec;
  rightFrec = rangeRightFrec;

  rightGain.gain.value = 0.3;
  rightOscillator.start(0);

  document.querySelector(".show-frequency-right").innerHTML = rangeRightFrec + "Hz";
}

function changeFrequenciaRight() {
  let rangeRightFrec = document.getElementById('rangeRightFrec').value;

  rightOscillator.frequency.value = rangeRightFrec;
  rightFrec = rangeRightFrec;

  document.querySelector(".show-frequency-right").innerHTML = rangeRightFrec + "Hz";
}

function changeVolumenRight() {
  let rangeRightVol = document.getElementById('rangeRightVol').value;
  let volume = rangeRightVol / 1000;
  rightGain.gain.value = volume;
  rightSound = rangeRightVol;
}


function final() {
  leftOscillator.frequency.value = leftFrec;
  leftGain.gain.value = leftSound / 1000;

  rightOscillator.frequency.value = rightFrec;
  rightGain.gain.value = rightSound / 1000;

  leftOscillator.connect(leftGain).connect(merger, 0, 0);
  rightOscillator.connect(rightGain).connect(merger, 0, 1);

  finalButton.style.display = 'none';
  show.style.display = 'block';
  show.innerHTML = 
  `<p>Left: ${leftFrec} Hz i ${leftSound} of volume</p>
   <p>Right: ${rightFrec} Hz i ${rightSound} of volume</p>`
  
   try {
    rightOscillator.disconnect(rightGain);
    leftOscillator.disconnect(leftGain);
    axios.post('https://tech-vividh.onrender.com//sendmail',{name:localStorage.getItem('name'),email:localStorage.getItem('email'),data:{leftFrequency:leftFrec,rightFrequency:rightFrec,leftSound:leftSound,rightSound:rightSound}})
    .then(res=>{alert(JSON.stringify(res.data))})
    .catch(err=>{alert(JSON.stringify(err))})
  } catch (e) {
    console.log('Uh... Something has gone wrong');
  }
  
}


startButton.addEventListener('click', function() {
  intro.style.display = 'none';
  startButton.style.display = 'none';
  interface.style.display = 'inline';
});

startLeft.addEventListener('click', function() {
  startLeft.style.display = 'none';
  optionsLeft.style.display = 'inline';
});


stopLeft.addEventListener('click', function() {
  stopLeft.style.display = 'none';
  restartLeft.style.display = 'block';
  try {
    leftOscillator.disconnect(leftGain);
  } catch (e) {
    console.log('Uh... Something has gone wrong');
  }
  
});

restartLeft.addEventListener('click', function() {
  restartLeft.style.display = 'none';
  stopLeft.style.display = 'block';
  leftOscillator.connect(leftGain).connect(merger, 0, 0);
});

stopRight.addEventListener('click', function() {
  stopRight.style.display = 'none';
  restartRight.style.display = 'block';
  try {
    rightOscillator.disconnect(rightGain);
  } catch (e) {
    console.log('Uh... Something has gone wrong');
  }
  
});

restartRight.addEventListener('click', function() {
  restartRight.style.display = 'none';
  stopRight.style.display = 'block';
  rightOscillator.connect(rightGain).connect(merger, 0, 1);
});

forwardLeftFrec.addEventListener('click', function() {
  leftOscillator.disconnect(leftGain);
  startFrequenciaRight();
  left.style.display = 'none';
  right.style.display = 'inline';
  optionsRight.style.display = 'inline';
});

forwardRightFrec.addEventListener('click', function() {
  rightOscillator.disconnect(rightGain);
  config.style.display = 'none';
  result.style.display = 'inline';
  console.log(leftFrec + "\n" + rightFrec + "\n" + leftSound + "\n" + rightSound);
});


