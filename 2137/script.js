function runScript() {
  confetti.start()
    
            setTimeout(function() {
                confetti.stop()
            }, 60000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
}



setTimeout(function() {
  clearInterval(intervalId);
}, 1000 * 60); // stop after 1 minute

// Calculate the number of milliseconds until 21:37
var currentTime = new Date();
var targetTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 21, 37, 0, 0);
if (targetTime < currentTime) {
  targetTime.setDate(targetTime.getDate() + 1); // set to tomorrow if the target time has already passed
}
var millisUntilTarget = targetTime - currentTime;

// Schedule the runScript function to run every day at 21:37
var intervalId = setInterval(runScript, millisUntilTarget);


function updateClock() {
  const targetTime = new Date();
  targetTime.setHours( 21, 37, 0, 0);

  // Calculate the time remaining until the target time
  const currentTime = new Date();
  let timeRemaining = targetTime - currentTime;
  if (timeRemaining < 0) {
    // If the target time has passed, set the time remaining to the same time on the following day
    timeRemaining += 24 * 60 * 60 * 1000;
  }

  // Calculate the number of hours, minutes, and seconds remaining
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

  // Update the clock display
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

  // If the time remaining is zero, add the "hidden" class to the clock container
  if (timeRemaining === 0) {
    document.getElementById("clock-container").classList.add("hidden");
  } else {
    // If the time remaining is not zero, remove the "hidden" class from the clock container
    document.getElementById("clock-container").classList.remove("hidden");
  }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Update the clock immediately when the page loads
updateClock();