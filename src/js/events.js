import { timer, resetProgressRing } from "./timer.js"; 

let sessionRunning = false;
let pausedTime = 0; // Pour garder la trace du temps restant lorsqu'on met en pause
let countdown; // Déclare le countdown globalement pour pouvoir l'utiliser dans toute la logique

const pomodoroTime = document.querySelector(".pomodoro__time"); // Affichage du timer

export function setupEventListeners() {
  document.querySelector("#start-session").addEventListener("click", startSession);
  document.querySelector("#pause-session").addEventListener("click", pauseSession);
  document.querySelector("#stop-session").addEventListener("click", stopSession);
}

function startSession() {
  if (sessionRunning) return; // Si une session est déjà en cours, rien ne se passe.

  sessionRunning = true;

  // Récupérer la valeur du input pour la durée de la session
  const sessionTime = parseInt(document.getElementById("session-time").value) * 60;

  // Masquer l'input et afficher les boutons "Pause" et "Stopper"
  document.querySelector("#start-session").style.display = "none";
  document.querySelector("#pause-session").style.display = "inline-block";
  document.querySelector("#stop-session").style.display = "inline-block";
  document.querySelector(".time-input").style.display = "none"; // Cacher l'input

  // Afficher le timer (le texte du timer devient visible)
  pomodoroTime.style.visibility = "visible";

  // Si une pause était en cours, reprendre depuis le temps restant
  if (pausedTime > 0) {
    timer(pausedTime); // Reprendre à partir du temps sauvegardé
    pausedTime = 0; // Réinitialiser le temps de pause
  } else {
    timer(sessionTime); // Démarrer une nouvelle session
  }

  // Retirer la classe "paused" pour restaurer la couleur normale du cercle
  document.querySelector(".progress-ring__circle").classList.remove("paused");

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

  // Ajouter la classe "paused" au cercle pour changer sa couleur
  document.querySelector(".progress-ring__circle").classList.add("paused");

  // Lancer une pause de 5 minutes (300 secondes)
  timer(300); // Démarrer la pause de 5 minutes

  // Changer l'état du bouton
  document.querySelector("#pause-session").classList.remove("active");
}

function stopSession() {
  sessionRunning = false;

  // Si on était en pause, on n'arrête pas le temps de pause
  if (pausedTime > 0) {
    clearInterval(countdown);
    resetProgressRing();
  }

  // Réinitialiser l'affichage du timer
  document.querySelector("#start-session").style.display = "inline-block";
  document.querySelector("#pause-session").style.display = "none";
  document.querySelector("#stop-session").style.display = "none";

  // Réinitialiser les boutons
  document.querySelector("#pause-session").classList.remove("active");

  // Réinitialiser le texte des boutons
  pomodoroTime.textContent = "25:00"; // Réinitialiser l'affichage du temps
  document.title = "Pomodoro Timer"; // Réinitialiser le titre de la page
}

const timeInput = document.getElementById("session-time");
const increaseBtn = document.getElementById("increase-time");
const decreaseBtn = document.getElementById("decrease-time");

increaseBtn.addEventListener("click", () => {
  let value = parseInt(timeInput.value);
  if (value < 120) timeInput.value = value + 5;
});

decreaseBtn.addEventListener("click", () => {
  let value = parseInt(timeInput.value);
  if (value > 5) timeInput.value = value - 5;
});