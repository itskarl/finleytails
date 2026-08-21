const paletteEl = document.getElementById("palette");
const generateBtn = document.getElementById("generate-btn");
const toastEl = document.getElementById("toast");

// Loaded from marker_palettes.json: array of 5-entry arrays, each entry
// { hex, code, name, oldName, originalHex, deltaE }.
let palettes = [];
let lastIndex = -1;

// Each entry: marker entry + { locked }
let colors = [];

// Display old (R2) or new (R3) codes/names as the primary label.
let showOld = localStorage.getItem("showOld") === "true";

// Recently viewed palettes (snapshots of `colors`), persisted so users can
// step back through what they've seen — including across page reloads.
const HISTORY_LIMIT = 20;
let history = [];
let historyIndex = -1;

function saveHistory() {
  localStorage.setItem(
    "paletteHistory",
    JSON.stringify({ history, index: historyIndex })
  );
}

// Returns true if a previous session's history was restored into `colors`.
function loadHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem("paletteHistory"));
    if (saved && Array.isArray(saved.history) && saved.history.length) {
      history = saved.history.slice(-HISTORY_LIMIT);
      historyIndex = Math.min(Math.max(saved.index ?? 0, 0), history.length - 1);
      colors = history[historyIndex].map((c) => ({ ...c }));
      return true;
    }
  } catch {
    // Corrupt storage: start fresh.
  }
  return false;
}

function pushHistory() {
  history = history.slice(0, historyIndex + 1);
  history.push(colors.map((c) => ({ ...c })));
  if (history.length > HISTORY_LIMIT) {
    history = history.slice(history.length - HISTORY_LIMIT);
  }
  historyIndex = history.length - 1;
  saveHistory();
}

function goToHistory(index) {
  if (index < 0 || index >= history.length) return;
  historyIndex = index;
  colors = history[index].map((c) => ({ ...c }));
  saveHistory();
  render();
}

function pickPalette() {
  let index;
  do {
    index = Math.floor(Math.random() * palettes.length);
  } while (index === lastIndex && palettes.length > 1);
  lastIndex = index;
  return palettes[index];
}

function generateColors() {
  const palette = pickPalette();
  colors = colors.length
    ? colors.map((c, i) => (c.locked ? c : { ...palette[i], locked: false }))
    : palette.map((entry) => ({ ...entry, locked: false }));
}

// Pick readable text color for a background.
function textColorFor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#111111" : "#ffffff";
}

function render() {
  backBtn.disabled = historyIndex <= 0;
  forwardBtn.disabled = historyIndex >= history.length - 1;
  paletteEl.innerHTML = "";
  colors.forEach((color, i) => {
    const swatch = document.createElement("div");
    swatch.className = "swatch" + (color.locked ? " locked" : "");
    swatch.style.background = color.hex;

    const textColor = textColorFor(color.hex);

    const lockBtn = document.createElement("button");
    lockBtn.className = "lock-btn";
    lockBtn.textContent = color.locked ? "🔒" : "🔓";
    lockBtn.title = color.locked ? "Unlock" : "Lock";
    lockBtn.setAttribute("aria-label", (color.locked ? "Unlock " : "Lock ") + color.hex);
    lockBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      colors[i].locked = !colors[i].locked;
      // Keep the current history snapshot in sync so locks survive
      // back/forward navigation and reloads.
      if (history[historyIndex]) {
        history[historyIndex] = colors.map((c) => ({ ...c }));
        saveHistory();
      }
      render();
    });

    const info = document.createElement("div");
    info.className = "info";
    info.style.color = textColor;

    const codeLabel = document.createElement("span");
    codeLabel.className = "code";
    codeLabel.textContent = showOld ? color.oldCode : color.code;

    const nameLabel = document.createElement("span");
    nameLabel.className = "name";
    nameLabel.textContent = showOld ? color.oldName : color.name;

    info.appendChild(codeLabel);
    info.appendChild(nameLabel);

    const hexLabel = document.createElement("span");
    hexLabel.className = "hex";
    hexLabel.textContent = color.hex;
    info.appendChild(hexLabel);

    swatch.addEventListener("click", () => copyHex(color.hex));

    swatch.appendChild(lockBtn);
    swatch.appendChild(info);
    paletteEl.appendChild(swatch);
  });
}

async function copyHex(hex) {
  try {
    await navigator.clipboard.writeText(hex);
    showToast(`Copied ${hex.toUpperCase()}`);
  } catch {
    showToast("Copy failed");
  }
}

let toastTimer;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1500);
}

function regenerate() {
  generateColors();
  pushHistory();
  render();
}

generateBtn.addEventListener("click", regenerate);

const backBtn = document.getElementById("back-btn");
const forwardBtn = document.getElementById("forward-btn");

backBtn.addEventListener("click", () => goToHistory(historyIndex - 1));
forwardBtn.addEventListener("click", () => goToHistory(historyIndex + 1));

const oldNamesCheckbox = document.getElementById("old-names-checkbox");
oldNamesCheckbox.checked = showOld;
oldNamesCheckbox.addEventListener("change", () => {
  showOld = oldNamesCheckbox.checked;
  localStorage.setItem("showOld", showOld);
  render();
});

document.addEventListener("keydown", (e) => {
  if (e.target !== document.body) return;
  const isSpace = e.code === "Space" || e.key === " " || e.key === "Spacebar";
  if (isSpace) {
    e.preventDefault();
    regenerate();
  } else if (e.key === "ArrowLeft") {
    goToHistory(historyIndex - 1);
  } else if (e.key === "ArrowRight") {
    goToHistory(historyIndex + 1);
  }
});

function init() {
  palettes = MARKER_PALETTES;
  if (loadHistory()) {
    render();
  } else {
    regenerate();
  }
}

init();
