const pomodoroTime = document.querySelector(".pomodoro__time");
const sound = document.querySelector("audio");
const circle = document.querySelector(".progress-ring__circle");

let countdown;
const RADIUS = 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

circle.style.strokeDasharray = CIRCUMFERENCE;
circle.style.strokeDashoffset = CIRCUMFERENCE;

export function timer(seconds) {
  clearInterval(countdown); // Si une session est déjà en cours, on l'arrête

  const finish = Date.now() + seconds * 1000; // L'heure de fin de la session
  displayTimeLeft(seconds);
  updateProgressRing(seconds, seconds); // Initialiser le cercle de progression

  countdown = setInterval(() => {
    const secondsLeft = Math.round((finish - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      document.title = "Time Up!";
      sound.play();
      return;
    }
    displayTimeLeft(secondsLeft);
    updateProgressRing(secondsLeft, seconds); // Mettre à jour le cercle
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const displayTime = `${minutes}:${secondsRemaining.toString().padStart(2, "0")}`;
  document.title = displayTime;
  pomodoroTime.textContent = displayTime;
}

function updateProgressRing(timeLeft, totalTime) {
  const offset = CIRCUMFERENCE * (1 - timeLeft / totalTime);
  circle.style.strokeDashoffset = offset;
}

export function resetProgressRing() {
  // Réinitialiser le cercle et le temps à 25 minutes (quand la session est arrêtée)
  circle.style.strokeDashoffset = CIRCUMFERENCE;
  pomodoroTime.textContent = "25:00"; // Réinitialiser le temps affiché
  document.title = "Pomodoro Timer"; // Réinitialiser le titre
}