import { setupEventListeners } from "./events.js";
import { loadSettings, applyTheme } from "./settings.js";

document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  setupEventListeners();
  applyTheme();
});