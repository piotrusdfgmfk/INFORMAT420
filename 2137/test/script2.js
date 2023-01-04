function playSong() {
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'papa.mp3');
  audioElement.play();
}

var date = new Date();
var hour = 21;
var minute = 37;

// Calculate the number of milliseconds until the next 21:37
var millisecondsUntilNext = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0) - date;

// If the time has already passed today, add 1 day (86400000 milliseconds)
if (millisecondsUntilNext < 0) {
  millisecondsUntilNext += 86400000;
}

// Set the interval to execute the playSong function at the desired time each day
setInterval(playSong, millisecondsUntilNext);


window.onload = function() {
Interval(playSong, millisecondsUntilNext);
};