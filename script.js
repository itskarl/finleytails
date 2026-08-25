const paletteEl = document.getElementById("palette");
const generateBtn = document.getElementById("generate-btn");
const toastEl = document.getElementById("toast");

// Loaded from marker_palettes.json: array of 5-entry arrays, each entry
// { hex, code, name, oldName, originalHex, deltaE }.
let palettes = [];
let filteredPalettes = [];
let lastIndex = -1;

// Limit generated palettes to colors available in a specific physical
// Ohuhu marker set. "320" means no restriction.
const SET_CODES = {
  "120": new Set(OHUHU_SET_120),
  "216": new Set(OHUHU_SET_216),
};
let markerSet = localStorage.getItem("markerSet") || "320";

function paletteFitsSet(palette) {
  if (markerSet === "320") return true;
  const codes = SET_CODES[markerSet];
  return palette.every((entry) => codes.has(entry.code));
}

function rebuildFilteredPalettes() {
  filteredPalettes = markerSet === "320" ? palettes : palettes.filter(paletteFitsSet);
  if (!filteredPalettes.length) filteredPalettes = palettes;
  lastIndex = -1;
}

// Full Ohuhu marker catalog (from markers.json), keyed by code, so a
// shared palette can be resolved even if its markers never happen to be
// the nearest match in any generated palette.
const MARKERS_BY_CODE = {};
MARKERS.forEach((m) => {
  MARKERS_BY_CODE[m.code] = m;
});

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
  render(true);
}

function pickPalette() {
  let index;
  do {
    index = Math.floor(Math.random() * filteredPalettes.length);
  } while (index === lastIndex && filteredPalettes.length > 1);
  lastIndex = index;
  return filteredPalettes[index];
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

function render(animate = false) {
  backBtn.disabled = historyIndex <= 0;
  forwardBtn.disabled = historyIndex >= history.length - 1;
  paletteEl.innerHTML = "";
  colors.forEach((color, i) => {
    const shouldAnimate = animate && !color.locked;
    const swatch = document.createElement("div");
    swatch.className = "swatch" + (color.locked ? " locked" : "") + (shouldAnimate ? " swatch-enter" : "");
    if (shouldAnimate) swatch.style.animationDelay = `${i * 45}ms`;
    swatch.style.background = color.hex;

    const textColor = textColorFor(color.hex);

    const lockBtn = document.createElement("button");
    lockBtn.className = "lock-btn";
    lockBtn.style.color = textColor;
    lockBtn.innerHTML = `<span class="btn-icon ${color.locked ? "icon-lock-locked" : "icon-lock-unlocked"}" aria-hidden="true"></span>`;
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
    info.className = "info " + (textColor === "#ffffff" ? "on-dark" : "on-light");
    info.style.color = textColor;

    const nameLabel = document.createElement("span");
    nameLabel.className = "name";
    nameLabel.textContent = showOld ? color.oldName : color.name;

    const codeLabel = document.createElement("span");
    codeLabel.className = "code";
    codeLabel.textContent = showOld ? color.oldCode : color.code;

    const hexLabel = document.createElement("span");
    hexLabel.className = "hex";
    hexLabel.textContent = color.hex;

    const nameRow = document.createElement("div");
    nameRow.className = "name-row";
    nameRow.appendChild(nameLabel);
    nameRow.appendChild(hexLabel);

    info.appendChild(codeLabel);
    info.appendChild(nameRow);

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

function buildShareUrl() {
  const url = new URL(location.href);
  url.search = "";
  url.searchParams.set("c", colors.map((c) => c.code).join(","));
  return url.toString();
}

// Reads a `?c=code,code,...` share link and, if every code resolves to a
// known marker, loads it as the current palette. Returns false (and
// leaves `colors` untouched) for a missing or unrecognized link.
function loadSharedPalette() {
  const raw = new URLSearchParams(location.search).get("c");
  if (!raw) return false;
  const codes = raw.split(",");
  const found = codes.map((code) => MARKERS_BY_CODE[code]).filter(Boolean);
  window.history.replaceState(null, "", location.pathname);
  if (found.length !== codes.length || found.length === 0) return false;
  colors = found.map((entry) => ({ ...entry, locked: false }));
  return true;
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
  render(true);
}

generateBtn.addEventListener("click", regenerate);

const backBtn = document.getElementById("back-btn");
const forwardBtn = document.getElementById("forward-btn");

backBtn.addEventListener("click", () => goToHistory(historyIndex - 1));
forwardBtn.addEventListener("click", () => goToHistory(historyIndex + 1));

const shareBtn = document.getElementById("share-btn");
shareBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(buildShareUrl());
    showToast("Share link copied");
  } catch {
    showToast("Copy failed");
  }
});

const oldNamesToggle = document.getElementById("old-names-toggle");
oldNamesToggle.textContent = showOld ? "Show new" : "Show old";
oldNamesToggle.addEventListener("click", () => {
  showOld = !showOld;
  localStorage.setItem("showOld", showOld);
  oldNamesToggle.textContent = showOld ? "Show new" : "Show old";
  showToast(showOld ? "Showing old names" : "Showing new names");
  render();
});

const markerSetSelect = document.getElementById("marker-set-select");
markerSetSelect.value = markerSet;
markerSetSelect.addEventListener("change", () => {
  markerSet = markerSetSelect.value;
  localStorage.setItem("markerSet", markerSet);
  rebuildFilteredPalettes();
  showToast(markerSet === "320" ? "Showing full 320 set" : `Limited to ${markerSet} set`);
  regenerate();
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
  rebuildFilteredPalettes();
  const hadHistory = loadHistory();
  if (loadSharedPalette()) {
    pushHistory();
    render(true);
    showToast("Loaded shared palette");
  } else if (hadHistory) {
    render();
  } else {
    regenerate();
  }
}

init();
