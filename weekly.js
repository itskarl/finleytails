// Weekly free coloring page. Books are ordered so that a book from the
// same series (Tired but Trying 1/2, Cozy Critters 1/2) never lands on
// back-to-back weeks. Each book's own free pages then cycle round-robin,
// so consecutive weeks always feature a different book *and* a different
// page, for as long as fresh pages are available.
const WEEKLY_BOOKS = [
  {
    title: "Big Tiny World",
    tagline: "Tiny critters in big worlds",
    accent: "#4a8c4d",
    cover: "covers/big-tiny-world.jpg",
    etsy: "https://www.etsy.com/listing/4382809777/big-tiny-world-coloring-book-pdfjpg-40",
    amazon: "https://www.amazon.com/Big-Tiny-World-Coloring-Book/dp/B0FVFBMXGH",
    pages: [
      "weekly-pages/Big_Tiny_World_05.jpg",
      "weekly-pages/Big_Tiny_World_06.jpg",
      "weekly-pages/Big_Tiny_World_10.jpg",
      "weekly-pages/Big_Tiny_World_15.jpg",
      "weekly-pages/Big_Tiny_World_17.jpg",
      "weekly-pages/Big_Tiny_World_22.jpg",
      "weekly-pages/Big_Tiny_World_37.jpg",
      "weekly-pages/Big_Tiny_World_43.jpg",
    ],
  },
  {
    title: "Tired but Trying",
    tagline: "Relatable adulting humor",
    accent: "#2f8fa6",
    cover: "covers/tired-but-trying.jpg",
    etsy: "https://www.etsy.com/listing/4309432994/tired-but-trying-funny-animals-coloring",
    amazon: "https://www.amazon.com/Tired-but-Trying-Easy-Color/dp/B0F8NSGVPY",
    pages: [
      "weekly-pages/Tired_but_Trying_10.jpg",
      "weekly-pages/Tired_but_Trying_12.jpg",
      "weekly-pages/Tired_but_Trying_17.jpg",
      "weekly-pages/Tired_but_Trying_18.jpg",
      "weekly-pages/Tired_but_Trying_21.jpg",
      "weekly-pages/Tired_but_Trying_30.jpg",
      "weekly-pages/Tired_but_Trying_35.jpg",
      "weekly-pages/Tired_but_Trying_38.jpg",
    ],
  },
  {
    title: "Color This Cozy",
    tagline: "Guided prompts, animal scenes",
    accent: "#c98a12",
    cover: "covers/color-this-cozy.jpg",
    etsy: "https://www.etsy.com/listing/4509660089/color-this-cozy-coloring-book-guided",
    amazon: "https://www.amazon.com/Color-This-Cozy-Coloring-Challenges/dp/B0H23PYS2T",
    pages: [
      "weekly-pages/Color_This_Cozy_12.png",
      "weekly-pages/Color_This_Cozy_16.png",
      "weekly-pages/Color_This_Cozy_17.png",
      "weekly-pages/Color_This_Cozy_27.png",
      "weekly-pages/Color_This_Cozy_29.png",
      "weekly-pages/Color_This_Cozy_33.png",
      "weekly-pages/Color_This_Cozy_36.png",
      "weekly-pages/Color_This_Cozy_41.png",
    ],
  },
  {
    title: "Tired but Trying 2",
    tagline: "More relatable adulting humor",
    accent: "#3f7cff",
    cover: "covers/tired-but-trying-2.jpg",
    etsy: "https://www.etsy.com/listing/4327570208/tired-but-trying-2-funny-animals",
    amazon: "https://www.amazon.com/dp/B0FG3C83GT",
    pages: [
      "weekly-pages/Tired_but_Trying_2_07.jpg",
      "weekly-pages/Tired_but_Trying_2_09.jpg",
      "weekly-pages/Tired_but_Trying_2_13.jpg",
      "weekly-pages/Tired_but_Trying_2_14.jpg",
      "weekly-pages/Tired_but_Trying_2_17.jpg",
      "weekly-pages/Tired_but_Trying_2_21.jpg",
      "weekly-pages/Tired_but_Trying_2_22.jpg",
      "weekly-pages/Tired_but_Trying_2_35.jpg",
      "weekly-pages/Tired_but_Trying_2_40.jpg",
    ],
  },
  {
    title: "So Many Outfits!",
    tagline: "A bold-line fashion coloring book",
    accent: "#d9467d",
    cover: "covers/so-many-outfits.jpg",
    etsy: "https://www.etsy.com/listing/4532546817/so-many-outfits-a-bold-line-coloring",
    amazon: "https://www.amazon.com/So-Many-Outfits-Fashion-Coloring/dp/B0H7FC542N",
    pages: [
      "weekly-pages/So_Many_Outfits_07.png",
      "weekly-pages/So_Many_Outfits_09.png",
      "weekly-pages/So_Many_Outfits_11.png",
      "weekly-pages/So_Many_Outfits_13.png",
      "weekly-pages/So_Many_Outfits_15.png",
      "weekly-pages/So_Many_Outfits_16.png",
      "weekly-pages/So_Many_Outfits_17.png",
      "weekly-pages/So_Many_Outfits_18.png",
    ],
  },
  {
    title: "Cozy Critters with Big Butts",
    tagline: "Bold-line kawaii cozy humor",
    accent: "#db7420",
    cover: "covers/cozy-critters-big-butts.jpg",
    etsy: "https://www.etsy.com/listing/4312236579/cozy-critters-with-big-butts-pdfjpg-40",
    amazon: "https://www.amazon.com/Cozy-Critters-Big-Butts-Bold-Line/dp/B0F6SXK31T",
    pages: [
      "weekly-pages/Cozy_Critters_with_Big_Butts_09.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_10.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_13.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_31.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_34.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_43.jpg",
    ],
  },
  {
    title: "Cute, Cozy, Chaotic",
    tagline: "Cute critters, cozy scenes",
    accent: "#8c5cf5",
    cover: "covers/cute-cozy-chaotic.jpg",
    etsy: "https://www.etsy.com/listing/4312235347/cute-cozy-chaotic-by-finley-tails-pdfjpg",
    amazon: "https://www.amazon.com/Cute-Cozy-Chaotic-Single%E2%80%91Sided-Light%E2%80%91Filled/dp/B0F5PXFTJ1",
    pages: [
      "weekly-pages/Cute_Cozy_Chaotic_Bathtime_Puddles.jpg",
      "weekly-pages/Cute_Cozy_Chaotic_Cafe_Chaos.jpg",
      "weekly-pages/Cute_Cozy_Chaotic_Chemistry_Chaos.jpg",
      "weekly-pages/Cute_Cozy_Chaotic_Cozy_Cuddles.jpg",
      "weekly-pages/Cute_Cozy_Chaotic_Janitor_Dance.jpg",
      "weekly-pages/Cute_Cozy_Chaotic_Loopy_Library.jpg",
      "weekly-pages/Cute_Cozy_Chaotic_Pooltime.jpg",
      "weekly-pages/Cute_Cozy_Chaotic_Sleepover_Sillies.jpg",
    ],
  },
  {
    title: "Cozy Critters with Big Butts 2",
    tagline: "Cozy critters, round two",
    accent: "#e5484d",
    cover: "covers/cozy-critters-big-butts-2.jpg",
    etsy: "https://www.etsy.com/listing/4343043609/cozy-critters-with-big-butts-coloring",
    amazon: "https://www.amazon.com/dp/B0FKRGFDHL",
    pages: [
      "weekly-pages/Cozy_Critters_with_Big_Butts_2_05.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_2_06.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_2_08.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_2_12.jpg",
      "weekly-pages/Cozy_Critters_with_Big_Butts_2_16.jpg",
    ],
  },
];

// Fixed Monday anchor (UTC) so every visitor, in any timezone, sees the
// same feature switch over on the same real-world week.
const WEEK_EPOCH = Date.UTC(2026, 0, 5);
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function currentWeekNumber(now = Date.now()) {
  return Math.floor((now - WEEK_EPOCH) / WEEK_MS);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function getWeeklyFeature(now = Date.now()) {
  const week = currentWeekNumber(now);
  const book = WEEKLY_BOOKS[mod(week, WEEKLY_BOOKS.length)];
  const round = Math.floor(week / WEEKLY_BOOKS.length);
  const page = book.pages[mod(round, book.pages.length)];
  return { book, page, week };
}

function nextMondayLabel(now = Date.now()) {
  const d = new Date(now);
  const day = d.getUTCDay(); // 0 Sun ... 1 Mon
  const daysUntilMonday = mod(1 - day, 7) || 7;
  d.setUTCDate(d.getUTCDate() + daysUntilMonday);
  return d.toLocaleDateString(undefined, { month: "long", day: "numeric" });
}

function renderWeekly() {
  const { book, page } = getWeeklyFeature();
  const ext = page.split(".").pop().toUpperCase();
  const downloadName = `${book.title.replace(/[^a-z0-9]+/gi, "-")}-Free-Page.${ext.toLowerCase()}`;

  document.getElementById("weekly-page-img").src = page;
  document.getElementById("weekly-page-img").alt = `Free coloring page from ${book.title}`;
  document.getElementById("weekly-source-card").style.setProperty("--accent", book.accent);
  document.getElementById("weekly-book-title").textContent = book.title;
  document.getElementById("weekly-cover-img").src = book.cover;
  document.getElementById("weekly-cover-img").alt = `${book.title} cover`;
  document.getElementById("weekly-tagline").textContent = book.tagline;
  document.getElementById("weekly-etsy-link").href = book.etsy;
  document.getElementById("weekly-amazon-link").href = book.amazon;
  document.getElementById("weekly-next").textContent = `Next free page: ${nextMondayLabel()}`;

  const downloadLink = document.getElementById("weekly-download-link");
  downloadLink.href = page;
  downloadLink.download = downloadName;
  document.getElementById("weekly-download-label").textContent = `Download ${ext}`;
}

renderWeekly();
