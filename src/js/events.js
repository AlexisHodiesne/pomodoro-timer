import { timer } from "./timer.js";

let sessionRunning = false;
let pausedTime = 0; // Pour garder la trace du temps restant lorsqu'on met en pause

export function setupEventListeners() {
  document.querySelector("#start-session").addEventListener("click", startSession);
  document.querySelector("#pause-session").addEventListener("click", pauseSession);
  document.querySelector("#stop-session").addEventListener("click", stopSession);
}

function startSession() {
  if (sessionRunning) return; // Si une session est déjà en cours, rien ne se passe.

  sessionRunning = true;

  // Lancer une session de 25 minutes (1500 secondes par défaut)
  const sessionTime = 1500; // 25 minutes

  // Masquer le bouton "Lancer une session" et afficher "Pause" et "Stopper"
  document.querySelector("#start-session").style.display = "none";
  document.querySelector("#pause-session").style.display = "inline-block";
  document.querySelector("#stop-session").style.display = "inline-block";

  // Si une pause était en cours, reprendre depuis le temps restant
  if (pausedTime > 0) {
    timer(pausedTime);
    pausedTime = 0; // Réinitialiser le temps de pause
  } else {
    timer(sessionTime);
  }

  // Marquer le bouton "Pause" comme actif
  document.querySelector("#pause-session").classList.add("active");
}

function pauseSession() {
  if (!sessionRunning) return;

  // Sauvegarder le temps restant avant de mettre en pause
  const timeLeft = parseInt(pomodoroTime.textContent.split(":")[0]) * 60 + parseInt(pomodoroTime.textContent.split(":")[1]);
  pausedTime = timeLeft;

  // Arrêter la minuterie
  clearInterval(countdown);

  // Lancer une pause de 5 minutes (300 secondes)
  timer(300);

  // Changer l'état du bouton
  document.querySelector("#pause-session").classList.remove("active");
}

function stopSession() {
  sessionRunning = false;

  // Réinitialiser l'affichage
  document.querySelector("#start-session").style.display = "inline-block";
  document.querySelector("#pause-session").style.display = "none";
  document.querySelector("#stop-session").style.display = "none";

  // Réinitialiser le texte des boutons
  document.querySelector("#pause-session").classList.remove("active");

  // Arrêter la minuterie
  clearInterval(countdown);
  pomodoroTime.textContent = "25:00"; // Réinitialiser l'affichage du temps
  document.title = "Pomodoro Timer"; // Réinitialiser le titre de la page
}
