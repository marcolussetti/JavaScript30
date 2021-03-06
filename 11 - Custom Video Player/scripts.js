// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreenbtn');


// Build function
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

    // OR
    // video[video.paused ? 'play' : 'pause']();
}

function updatePlayButton(){
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(scrubTime);
}

// Add Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mouseover', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub);

let mouseDown = false;
progressBar.addEventListener('mousedown', () => mouseDown = true);
progressBar.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', e => mouseDown && scrub(e)); // lazy evaluation trick

// Fullscreen
let fullscreenFunction;
let fullscreenElement;
let exitFullscreenFunction;
let fullscreenFunctions = ['requestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen', 'webkitRequestFullScreen'];
let exitFullscreenFunctions = ['exitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen', 'webkitExitFullscreen'];
let fullscreenElements  = ['fullscreenElement', 'mozFullScreenElement', 'msFullscreenElement', 'webkitFullscreenElement'];

fullscreenFunctions.forEach(function (tentativeFunction){
    if (player[tentativeFunction]) {
        index = fullscreenFunctions.indexOf(tentativeFunction);
        fullscreenFunction = player[tentativeFunction];
        exitFullscreenFunction = player[exitFullscreenFunctions[index]];
        fullscreenElement = player[fullscreenElements[index]];
        break; //if we already have a working one a working one...
    }
});

function handleFullscreen() {
    console.log(window[fullscreenElement]);
    /*if (window[fullscreenElement])*/

    fullscreenFunction.call(player);
}

fullscreen.addEventListener('click', handleFullscreen);