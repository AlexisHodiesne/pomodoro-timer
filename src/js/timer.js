const pomodoroTime = document.querySelector(".pomodoro__time");
const sound = document.querySelector("audio");
const circle = document.querySelector(".progress-ring__circle");

let countdown;
const RADIUS = 150;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

circle.style.strokeDasharray = CIRCUMFERENCE;
circle.style.strokeDashoffset = CIRCUMFERENCE;

export function timer(seconds) {
  clearInterval(countdown);
  const finish = Date.now() + seconds * 1000;
  displayTimeLeft(seconds);
  updateProgressRing(seconds, seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((finish - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      document.title = "Time Up!";
      sound.play();
      return;
    }
    displayTimeLeft(secondsLeft);
    updateProgressRing(secondsLeft, seconds);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const displayTime = `${minutes}:${secondsRemaining
    .toString()
    .padStart(2, "0")}`;
  document.title = displayTime;
  pomodoroTime.textContent = displayTime;
}

function updateProgressRing(timeLeft, totalTime) {
  circle.style.strokeDashoffset = CIRCUMFERENCE * (1 - timeLeft / totalTime);
}
