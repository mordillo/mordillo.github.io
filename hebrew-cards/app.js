const levels = [
  {
    title: "Level 1: Basic Words",
    cards: [
      { english: "Mom", hebrew: "אמא", speak: "אמא", pronunciation: "ima" },
      { english: "Dad", hebrew: "אבא", speak: "אבא", pronunciation: "aba" },
      { english: "House", hebrew: "בית", speak: "בית", pronunciation: "bayit" },
      { english: "Water", hebrew: "מים", speak: "מים", pronunciation: "mayim" },
      { english: "Book", hebrew: "ספר", speak: "ספר", pronunciation: "sefer" },
      { english: "Dog", hebrew: "כלב", speak: "כלב", pronunciation: "kelev" },
      { english: "Cat", hebrew: "חתול", speak: "חתול", pronunciation: "chatul" },
      { english: "Hello", hebrew: "שלום", speak: "שלום", pronunciation: "shalom" }
    ]
  },
  {
    title: "Level 2: Numbers",
    cards: [
      { english: "One", hebrew: "אחת", speak: "אחת", pronunciation: "achat" },
      { english: "Two", hebrew: "שתיים", speak: "שתיים", pronunciation: "shtayim" },
      { english: "Three", hebrew: "שלוש", speak: "שלוש", pronunciation: "shalosh" },
      { english: "Four", hebrew: "ארבע", speak: "ארבע", pronunciation: "arba" },
      { english: "Five", hebrew: "חמש", speak: "חמש", pronunciation: "chamesh" },
      { english: "Six", hebrew: "שש", speak: "שש", pronunciation: "shesh" },
      { english: "Seven", hebrew: "שבע", speak: "שבע", pronunciation: "sheva" },
      { english: "Eight", hebrew: "שמונה", speak: "שמונה", pronunciation: "shmoneh" },
      { english: "Nine", hebrew: "תשע", speak: "תשע", pronunciation: "tesha" },
      { english: "Ten", hebrew: "עשר", speak: "עשר", pronunciation: "eser" }
    ]
  },
  {
    title: "Level 3: More Basic Vocabulary",
    cards: [
      { english: "Food", hebrew: "אוכל", speak: "אוכל", pronunciation: "ochel" },
      { english: "Apple", hebrew: "תפוח", speak: "תפוח", pronunciation: "tapuach" },
      { english: "Milk", hebrew: "חלב", speak: "חלב", pronunciation: "chalav" },
      { english: "School", hebrew: "בית ספר", speak: "בית ספר", pronunciation: "beit sefer" },
      { english: "Friend", hebrew: "חבר", speak: "חבר", pronunciation: "chaver" },
      { english: "Car", hebrew: "מכונית", speak: "מכונית", pronunciation: "mechonit" },
      { english: "Sun", hebrew: "שמש", speak: "שמש", pronunciation: "shemesh" },
      { english: "Moon", hebrew: "ירח", speak: "ירח", pronunciation: "yareach" }
    ]
  },
  {
    title: "Level 4: Higher Numbers",
    cards: [
      { english: "Eleven", hebrew: "אחת עשרה", speak: "אחת עשרה", pronunciation: "achat esreh" },
      { english: "Twelve", hebrew: "שתים עשרה", speak: "שתים עשרה", pronunciation: "shtem esreh" },
      { english: "Thirteen", hebrew: "שלוש עשרה", speak: "שלוש עשרה", pronunciation: "shlosh esreh" },
      { english: "Twenty", hebrew: "עשרים", speak: "עשרים", pronunciation: "esrim" },
      { english: "Thirty", hebrew: "שלושים", speak: "שלושים", pronunciation: "shloshim" },
      { english: "Forty", hebrew: "ארבעים", speak: "ארבעים", pronunciation: "arbaim" },
      { english: "Fifty", hebrew: "חמישים", speak: "חמישים", pronunciation: "chamishim" },
      { english: "One hundred", hebrew: "מאה", speak: "מאה", pronunciation: "me'ah" }
    ]
  },
  {
    title: "Level 5: Short Sentences",
    cards: [
      { english: "Good morning", hebrew: "בוקר טוב", speak: "בוקר טוב", pronunciation: "boker tov" },
      { english: "Good night", hebrew: "לילה טוב", speak: "לילה טוב", pronunciation: "layla tov" },
      { english: "Thank you", hebrew: "תודה רבה", speak: "תודה רבה", pronunciation: "todah rabah" },
      { english: "I want water", hebrew: "אני רוצה מים", speak: "אני רוצה מים", pronunciation: "ani rotzeh mayim" },
      { english: "I am hungry", hebrew: "אני רעב", speak: "אני רעב", pronunciation: "ani ra'ev" },
      { english: "Where is Dad?", hebrew: "איפה אבא?", speak: "איפה אבא", pronunciation: "eifo aba?" }
    ]
  },
  {
    title: "Level 6: Longer Sentences",
    cards: [
      { english: "I want to read a book", hebrew: "אני רוצה לקרוא ספר", speak: "אני רוצה לקרוא ספר", pronunciation: "ani rotzeh likro sefer" },
      { english: "The dog is in the house", hebrew: "הכלב בבית", speak: "הכלב בבית", pronunciation: "hakelev babayit" },
      { english: "I am going to school", hebrew: "אני הולך לבית ספר", speak: "אני הולך לבית ספר", pronunciation: "ani holech lebeit sefer" },
      { english: "Can I have water?", hebrew: "אפשר לקבל מים?", speak: "אפשר לקבל מים", pronunciation: "efshar lekabel mayim?" },
      { english: "I love Mom and Dad", hebrew: "אני אוהב את אמא ואבא", speak: "אני אוהב את אמא ואבא", pronunciation: "ani ohev et ima ve'aba" },
      { english: "I want to play outside", hebrew: "אני רוצה לשחק בחוץ", speak: "אני רוצה לשחק בחוץ", pronunciation: "ani rotzeh lesachek bachutz" }
    ]
  }
];

let levelIndex = 0;
let cardIndex = 0;
let isFlipped = false;
let hebrewVoice = null;

const levelSelect = document.getElementById("levelSelect");
const levelTitle = document.getElementById("levelTitle");
const cardCounter = document.getElementById("cardCounter");
const card = document.getElementById("card");
const englishWord = document.getElementById("englishWord");
const englishHint = document.getElementById("englishHint");
const hebrewWord = document.getElementById("hebrewWord");
const pronunciation = document.getElementById("pronunciation");
const speakBtn = document.getElementById("speakBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const flipBtn = document.getElementById("flipBtn");

function populateLevels() {
  levels.forEach((level, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = level.title;
    levelSelect.appendChild(option);
  });
}

function findHebrewVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];

  hebrewVoice =
    voices.find(v => v.lang.toLowerCase().startsWith("he")) ||
    voices.find(v => v.lang.toLowerCase().includes("iw")) ||
    null;
}

function currentCard() {
  return levels[levelIndex].cards[cardIndex];
}

function renderCard() {
  const level = levels[levelIndex];
  const current = currentCard();

  levelTitle.textContent = level.title;
  cardCounter.textContent = `${cardIndex + 1} of ${level.cards.length}`;
  englishWord.textContent = current.english;
  englishHint.textContent = "Tap to see Hebrew";
  hebrewWord.textContent = current.hebrew;
  pronunciation.textContent = current.pronunciation
    ? `Sounds like: ${current.pronunciation}`
    : "";

  card.classList.toggle("flipped", isFlipped);
}

function flipCard() {
  isFlipped = !isFlipped;
  renderCard();

  if (isFlipped) {
    speakHebrew();
  }
}

function moveCard(direction) {
  const total = levels[levelIndex].cards.length;
  cardIndex = (cardIndex + direction + total) % total;
  isFlipped = false;
  renderCard();
}

function speakHebrew() {
  const current = currentCard();

  if (!("speechSynthesis" in window)) {
    alert("This browser does not support speech synthesis.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(current.speak || current.hebrew);
  utterance.lang = "he-IL";
  utterance.rate = 0.78;
  utterance.pitch = 1;

  if (hebrewVoice) {
    utterance.voice = hebrewVoice;
  }

  window.speechSynthesis.speak(utterance);
}

levelSelect.addEventListener("change", event => {
  levelIndex = Number(event.target.value);
  cardIndex = 0;
  isFlipped = false;
  renderCard();
});

card.addEventListener("click", flipCard);
flipBtn.addEventListener("click", flipCard);
speakBtn.addEventListener("click", speakHebrew);
prevBtn.addEventListener("click", () => moveCard(-1));
nextBtn.addEventListener("click", () => moveCard(1));

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") moveCard(-1);
  if (event.key === "ArrowRight") moveCard(1);
  if (event.key === " " || event.key === "Enter") flipCard();
});

populateLevels();
findHebrewVoice();

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = findHebrewVoice;
}

renderCard();
