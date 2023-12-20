// globals
var 
_player = document.getElementById("audio"),
_playlist = document.getElementById("playlist"),
_playprev = document.getElementById("playprev"),
_playnext = document.getElementById("playnext");
document.getElementById('sampleVol').addEventListener("change", changeVolume);

var isPlaying = false;

// functions
function setIsPlaying( audioEl, isPlaying ) {
    audioEl.setAttribute('playstate', isPlaying);
}

function getIsPlaying( audioEl ) {
  return audioEl.getAttribute('playstate');
}

function playPrev( selectEl ) {
  var prevIdx = selectEl.selectedIndex - 1;
  
  if (prevIdx!==-1){
    selectEl.selectedIndex = prevIdx;
    selectionChanged(_playlist);
    playOption(selectEl.options[selectEl.selectedIndex]);
  }
}

function nextOptionIdx( selectEl ) {
  var lastIdx = selectEl.options.length - 1;
  var nextIdx = selectEl.selectedIndex + 1;
  
  if (nextIdx>lastIdx) return -1;
  else return nextIdx;
}

function playNext( selectEl ) {
  var nextIdx = nextOptionIdx( selectEl );
  
  if (nextIdx!==-1){
    selectEl.selectedIndex = nextIdx;
    selectionChanged(_playlist);
    playOption(selectEl.options[selectEl.selectedIndex]);
  }
}

function playOption(option) {
  _player.src = option.getAttribute("data-mp3");
  
  if (getIsPlaying(_playlist)==="true")
    _player.play();
}

function selectionChanged(selectEl) {
  var curId = selectEl.selectedIndex;
  var lastIdx = selectEl.options.length - 1;
  
  _playprev.disabled = (curId === 0);   
  _playnext.disabled = (curId === lastIdx);    
}

_player.addEventListener("play", function(e) { 
  setIsPlaying(_playlist, true);
});

_player.addEventListener("pause", function(e) { 
  setIsPlaying(_playlist, false);
});

_player.addEventListener("ended", function(e) { 
  setIsPlaying(_playlist, true);
  playNext(_playlist);
});

_playprev.addEventListener("click", function(e) { 
  playPrev(_playlist);
});

_playnext.addEventListener("click", function(e) { 
  playNext(_playlist);
});

_playlist.addEventListener("change", function(e) {
  if (e.target && e.target.nodeName === "SELECT") {
    selectionChanged(_playlist);
    playOption(e.target.options[e.target.selectedIndex], !getIsPlaying(_player));
  }
});

function changeVolume() {
    let sampleVol = document.getElementById('sampleVol').value;
    sampleVol=sampleVol/1000;
    _player.volume=sampleVol;
}

selectionChanged(_playlist);
//Get the first song loaded but paused
playOption(_playlist.options[_playlist.selectedIndex], true);