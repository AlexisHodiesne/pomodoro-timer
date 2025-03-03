const pomodoroTimeInput = document.querySelector("#pomodoro");
const shortBreakTimeInput = document.querySelector("#short-break");

const pomodoroModeTime = document.querySelector("[data-pomodoro]");
const shortBreakModeTime = document.querySelector("[data-short-break]");

export function loadSettings() {
  if (!window.settings) return;
  populateSettingsForm(window.settings);
  setAppSettings(window.settings);
} 

function populateSettingsForm(settings) {
  pomodoroTimeInput.value = settings.pomodoroTime / 60;
  shortBreakTimeInput.value = settings.shortBreakTime / 60;
}

function setAppSettings(settings) {
  pomodoroModeTime.dataset.time = settings.pomodoroTime;
  shortBreakModeTime.dataset.time = settings.shortBreakTime;
}
