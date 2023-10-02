function formatNumber(num) {
  return num < 10 ? '0' + num : num;
}

function updateClock(hours, minutes, seconds) {
  const clockElement = document.getElementById('stopwatch');
  const timeString = `${formatNumber(hours)}:${formatNumber(
    minutes
  )}:${formatNumber(seconds)}`;
  clockElement.textContent = timeString;
}

let hours = 0;
let minutes = 0;
let seconds = 0;

setInterval(() => {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateClock(hours, minutes, seconds);
}, 1000);