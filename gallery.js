// Gallery of finished, colored pages. Each photo has a full-size image
// (max 1600px) and a small thumbnail (max 640px) for the grid, both WebP
// with location/camera metadata removed. `book` is the book the page is
// from (null would show a photo with no book label or filter).
const GALLERY_PHOTOS = [
  { src: "gallery/big-tiny-world-01.webp", thumb: "gallery/thumbs/big-tiny-world-01.webp", w: 1600, h: 1358, book: "Big Tiny World" },
  { src: "gallery/big-tiny-world-02.webp", thumb: "gallery/thumbs/big-tiny-world-02.webp", w: 1600, h: 1562, book: "Big Tiny World" },
  { src: "gallery/big-tiny-world-03.webp", thumb: "gallery/thumbs/big-tiny-world-03.webp", w: 1600, h: 1497, book: "Big Tiny World" },
  { src: "gallery/big-tiny-world-04.webp", thumb: "gallery/thumbs/big-tiny-world-04.webp", w: 1594, h: 1600, book: "Big Tiny World" },
  { src: "gallery/big-tiny-world-05.webp", thumb: "gallery/thumbs/big-tiny-world-05.webp", w: 1371, h: 1334, book: "Big Tiny World" },
  { src: "gallery/big-tiny-world-06.webp", thumb: "gallery/thumbs/big-tiny-world-06.webp", w: 1600, h: 1591, book: "Big Tiny World" },
  { src: "gallery/big-tiny-world-07.webp", thumb: "gallery/thumbs/big-tiny-world-07.webp", w: 1563, h: 1600, book: "Big Tiny World" },
  { src: "gallery/big-tiny-world-08.webp", thumb: "gallery/thumbs/big-tiny-world-08.webp", w: 1600, h: 1586, book: "Big Tiny World" },
  { src: "gallery/big-tiny-world-09.webp", thumb: "gallery/thumbs/big-tiny-world-09.webp", w: 1600, h: 1581, book: "Big Tiny World" },
  { src: "gallery/color-this-cozy-01.webp", thumb: "gallery/thumbs/color-this-cozy-01.webp", w: 1600, h: 1599, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-02.webp", thumb: "gallery/thumbs/color-this-cozy-02.webp", w: 1590, h: 1600, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-03.webp", thumb: "gallery/thumbs/color-this-cozy-03.webp", w: 1562, h: 1600, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-04.webp", thumb: "gallery/thumbs/color-this-cozy-04.webp", w: 1600, h: 1583, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-05.webp", thumb: "gallery/thumbs/color-this-cozy-05.webp", w: 1582, h: 1600, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-06.webp", thumb: "gallery/thumbs/color-this-cozy-06.webp", w: 1600, h: 1507, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-07.webp", thumb: "gallery/thumbs/color-this-cozy-07.webp", w: 1548, h: 1600, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-08.webp", thumb: "gallery/thumbs/color-this-cozy-08.webp", w: 1600, h: 1574, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-09.webp", thumb: "gallery/thumbs/color-this-cozy-09.webp", w: 1599, h: 1600, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-10.webp", thumb: "gallery/thumbs/color-this-cozy-10.webp", w: 1600, h: 1480, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-11.webp", thumb: "gallery/thumbs/color-this-cozy-11.webp", w: 1600, h: 1600, book: "Color This Cozy" },
  { src: "gallery/color-this-cozy-12.webp", thumb: "gallery/thumbs/color-this-cozy-12.webp", w: 1600, h: 1597, book: "Color This Cozy" },
  { src: "gallery/cozy-critters-big-butts-01.webp", thumb: "gallery/thumbs/cozy-critters-big-butts-01.webp", w: 1600, h: 1514, book: "Cozy Critters with Big Butts" },
  { src: "gallery/cozy-critters-big-butts-02.webp", thumb: "gallery/thumbs/cozy-critters-big-butts-02.webp", w: 1519, h: 1600, book: "Cozy Critters with Big Butts" },
  { src: "gallery/cozy-critters-big-butts-03.webp", thumb: "gallery/thumbs/cozy-critters-big-butts-03.webp", w: 1580, h: 1600, book: "Cozy Critters with Big Butts" },
  { src: "gallery/cozy-critters-big-butts-04.webp", thumb: "gallery/thumbs/cozy-critters-big-butts-04.webp", w: 1600, h: 1410, book: "Cozy Critters with Big Butts" },
  { src: "gallery/so-many-outfits-01.webp", thumb: "gallery/thumbs/so-many-outfits-01.webp", w: 1600, h: 1584, book: "So Many Outfits!" },
  { src: "gallery/so-many-outfits-02.webp", thumb: "gallery/thumbs/so-many-outfits-02.webp", w: 1546, h: 1600, book: "So Many Outfits!" },
  { src: "gallery/so-many-outfits-03.webp", thumb: "gallery/thumbs/so-many-outfits-03.webp", w: 1577, h: 1600, book: "So Many Outfits!" },
  { src: "gallery/so-many-outfits-04.webp", thumb: "gallery/thumbs/so-many-outfits-04.webp", w: 1478, h: 1600, book: "So Many Outfits!" },
  { src: "gallery/so-many-outfits-05.webp", thumb: "gallery/thumbs/so-many-outfits-05.webp", w: 1600, h: 1485, book: "So Many Outfits!" },
  { src: "gallery/so-many-outfits-06.webp", thumb: "gallery/thumbs/so-many-outfits-06.webp", w: 1600, h: 1191, book: "So Many Outfits!" },
  { src: "gallery/so-many-outfits-07.webp", thumb: "gallery/thumbs/so-many-outfits-07.webp", w: 1600, h: 1527, book: "So Many Outfits!" },
  { src: "gallery/tired-but-trying-01.webp", thumb: "gallery/thumbs/tired-but-trying-01.webp", w: 1600, h: 1579, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-02.webp", thumb: "gallery/thumbs/tired-but-trying-02.webp", w: 1600, h: 1600, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-03.webp", thumb: "gallery/thumbs/tired-but-trying-03.webp", w: 1586, h: 1600, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-04.webp", thumb: "gallery/thumbs/tired-but-trying-04.webp", w: 1600, h: 1600, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-05.webp", thumb: "gallery/thumbs/tired-but-trying-05.webp", w: 1600, h: 1406, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-06.webp", thumb: "gallery/thumbs/tired-but-trying-06.webp", w: 1600, h: 1582, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-07.webp", thumb: "gallery/thumbs/tired-but-trying-07.webp", w: 1600, h: 1423, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-08.webp", thumb: "gallery/thumbs/tired-but-trying-08.webp", w: 1600, h: 1581, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-09.webp", thumb: "gallery/thumbs/tired-but-trying-09.webp", w: 1600, h: 1508, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-10.webp", thumb: "gallery/thumbs/tired-but-trying-10.webp", w: 1600, h: 1385, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-11.webp", thumb: "gallery/thumbs/tired-but-trying-11.webp", w: 1564, h: 1600, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-12.webp", thumb: "gallery/thumbs/tired-but-trying-12.webp", w: 1484, h: 1600, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-13.webp", thumb: "gallery/thumbs/tired-but-trying-13.webp", w: 1600, h: 1368, book: "Tired but Trying" },
  { src: "gallery/tired-but-trying-2-01.webp", thumb: "gallery/thumbs/tired-but-trying-2-01.webp", w: 1529, h: 1600, book: "Tired but Trying 2" },
  { src: "gallery/tired-but-trying-2-02.webp", thumb: "gallery/thumbs/tired-but-trying-2-02.webp", w: 1579, h: 1600, book: "Tired but Trying 2" },
  { src: "gallery/tired-but-trying-2-03.webp", thumb: "gallery/thumbs/tired-but-trying-2-03.webp", w: 1576, h: 1600, book: "Tired but Trying 2" },
  { src: "gallery/tired-but-trying-2-04.webp", thumb: "gallery/thumbs/tired-but-trying-2-04.webp", w: 1600, h: 1304, book: "Tired but Trying 2" },
  { src: "gallery/tired-but-trying-2-05.webp", thumb: "gallery/thumbs/tired-but-trying-2-05.webp", w: 1600, h: 1336, book: "Tired but Trying 2" },
  { src: "gallery/tired-but-trying-2-06.webp", thumb: "gallery/thumbs/tired-but-trying-2-06.webp", w: 1503, h: 1600, book: "Tired but Trying 2" },
  { src: "gallery/tired-but-trying-2-07.webp", thumb: "gallery/thumbs/tired-but-trying-2-07.webp", w: 1600, h: 1581, book: "Tired but Trying 2" },
  { src: "gallery/tired-but-trying-2-08.webp", thumb: "gallery/thumbs/tired-but-trying-2-08.webp", w: 1597, h: 1600, book: "Tired but Trying 2" },
  { src: "gallery/cute-cozy-chaotic-01.webp", thumb: "gallery/thumbs/cute-cozy-chaotic-01.webp", w: 1600, h: 1557, book: "Cute, Cozy, Chaotic" },
];

const grid = document.getElementById("gallery-grid");
const filters = document.getElementById("gallery-filters");
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImg = lightbox.querySelector(".gallery-lightbox-img");
const lightboxCaption = lightbox.querySelector(".gallery-lightbox-caption");

// "All" view: take one photo from each book in turn so the grid mixes
// books instead of showing them in blocks.
const MIXED_PHOTOS = (() => {
  const groups = new Map();
  GALLERY_PHOTOS.forEach((p) => {
    const key = p.book || "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  });
  const lists = [...groups.values()];
  const mixed = [];
  for (let i = 0; mixed.length < GALLERY_PHOTOS.length; i++) {
    lists.forEach((list) => { if (list[i]) mixed.push(list[i]); });
  }
  return mixed;
})();

let visible = MIXED_PHOTOS;
let current = 0;

function altFor(photo) {
  return photo.book
    ? `Finished colored page from the ${photo.book} adult coloring book`
    : "Finished colored page from a Finley Tails coloring book";
}

function renderGrid() {
  grid.innerHTML = "";
  visible.forEach((photo, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-item";
    btn.setAttribute("aria-label", `Open photo ${i + 1} of ${visible.length}`);
    const img = document.createElement("img");
    img.src = photo.thumb;
    img.alt = altFor(photo);
    img.loading = "lazy";
    img.decoding = "async";
    img.width = photo.w;
    img.height = photo.h;
    btn.appendChild(img);
    if (photo.book) {
      const tag = document.createElement("span");
      tag.className = "gallery-tag";
      tag.textContent = photo.book;
      btn.appendChild(tag);
    }
    btn.addEventListener("click", () => openLightbox(i));
    grid.appendChild(btn);
  });
}

function renderFilters() {
  const books = [...new Set(GALLERY_PHOTOS.map((p) => p.book).filter(Boolean))];
  ["All", ...books].forEach((name) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "gallery-chip";
    chip.textContent = name;
    chip.setAttribute("aria-pressed", name === "All" ? "true" : "false");
    chip.addEventListener("click", () => {
      filters.querySelectorAll(".gallery-chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      visible = name === "All" ? MIXED_PHOTOS : GALLERY_PHOTOS.filter((p) => p.book === name);
      renderGrid();
    });
    filters.appendChild(chip);
  });
}

function showPhoto(i) {
  current = (i + visible.length) % visible.length;
  const photo = visible[current];
  lightboxImg.src = photo.src;
  lightboxImg.alt = altFor(photo);
  lightboxCaption.textContent = `${photo.book ? photo.book + " · " : ""}${current + 1} / ${visible.length}`;
}

function openLightbox(i) {
  showPhoto(i);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".gallery-lightbox-close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

lightbox.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeLightbox();
  else if (e.target.closest("[data-prev]")) showPhoto(current - 1);
  else if (e.target.closest("[data-next]")) showPhoto(current + 1);
});

document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPhoto(current - 1);
  if (e.key === "ArrowRight") showPhoto(current + 1);
});

// Swipe left/right on phones.
let touchX = null;
lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showPhoto(current + (dx < 0 ? 1 : -1));
  touchX = null;
});

renderFilters();
renderGrid();
