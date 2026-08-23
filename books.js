const sampleModal = document.getElementById("sample-modal");
const sampleModalImg = sampleModal.querySelector(".sample-modal-img");
const sampleModalDownload = sampleModal.querySelector(".sample-modal-download");
let lastFocused = null;

function openSampleModal(trigger) {
  lastFocused = trigger;
  const src = trigger.getAttribute("href");
  const filename = trigger.getAttribute("download");
  const title = trigger.closest(".book-card")?.querySelector("h3")?.textContent || "Free sample";

  sampleModalImg.src = src;
  sampleModalImg.alt = `${title} free sample page`;
  sampleModalDownload.href = src;
  sampleModalDownload.setAttribute("download", filename);

  sampleModal.hidden = false;
  document.body.style.overflow = "hidden";
  sampleModal.querySelector(".sample-modal-close").focus();
}

function closeSampleModal() {
  sampleModal.hidden = true;
  document.body.style.overflow = "";
  sampleModalImg.src = "";
  lastFocused?.focus();
}

document.querySelectorAll(".cover-btn-sample").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openSampleModal(btn);
  });
});

sampleModal.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", closeSampleModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !sampleModal.hidden) closeSampleModal();
});
