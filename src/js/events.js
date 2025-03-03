import { timer } from "./timer.js";

export function setupEventListeners() {
  document.querySelectorAll(".mode").forEach((mode) => {
    mode.addEventListener("click", switchModes);
  });
}

function switchModes(event) {
  const selectedMode = event.target;
  const secondsForMode = parseInt(selectedMode.dataset.time, 10);

  if (isNaN(secondsForMode)) return;

  document
    .querySelectorAll(".mode")
    .forEach((mode) => mode.classList.remove("active"));
  selectedMode.classList.add("active");
  timer(secondsForMode);
}
