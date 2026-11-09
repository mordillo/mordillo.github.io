const levels = [
  {
    title: "Level 1: Basic Words",
    cards: [
      { english: "Mom", hebrew: "אמא", speak: "אִמָּא", pronunciation: "ima" },
      { english: "Dad", hebrew: "אבא", speak: "אַבָּא", pronunciation: "aba" },
      { english: "House", hebrew: "בית", speak: "בַּיִת", pronunciation: "bayit" },
      { english: "Water", hebrew: "מים", speak: "מַיִם", pronunciation: "mayim" },
      { english: "Book", hebrew: "ספר", speak: "סֵפֶר", pronunciation: "sefer" },
      { english: "Dog", hebrew: "כלב", speak: "כֶּלֶב", pronunciation: "kelev" },
      { english: "Cat", hebrew: "חתול", speak: "חָתוּל", pronunciation: "chatul" },
      { english: "Hello", hebrew: "שלום", speak: "שָׁלוֹם", pronunciation: "shalom" }
    ]
  },
  {
    title: "Level 2: Numbers",
    cards: [
      { english: "One", hebrew: "אחת", speak: "אַחַת", pronunciation: "achat" },
      { english: "Two", hebrew: "שתיים", speak: "שְׁתַּיִם", pronunciation: "shtayim" },
      { english: "Three", hebrew: "שלוש", speak: "שָׁלוֹשׁ", pronunciation: "shalosh" },
      { english: "Four", hebrew: "ארבע", speak: "אַרְבַּע", pronunciation: "arba" },
      { english: "Five", hebrew: "חמש", speak: "חָמֵשׁ", pronunciation: "chamesh" },
      { english: "Six", hebrew: "שש", speak: "שֵׁשׁ", pronunciation: "shesh" },
      { english: "Seven", hebrew: "שבע", speak: "שֶׁבַע", pronunciation: "sheva" },
      { english: "Eight", hebrew: "שמונה", speak: "שְׁמוֹנֶה", pronunciation: "shmoneh" },
      { english: "Nine", hebrew: "תשע", speak: "תֵּשַׁע", pronunciation: "tesha" },
      { english: "Ten", hebrew: "עשר", speak: "עֶשֶׂר", pronunciation: "eser" }
    ]
  },
  {
    title: "Level 3: More Basic Vocabulary",
    cards: [
      { english: "Food", hebrew: "אוכל", speak: "אֹכֶל", pronunciation: "ochel" },
      { english: "Apple", hebrew: "תפוח", speak: "תַּפּוּחַ", pronunciation: "tapuach" },
      { english: "Milk", hebrew: "חלב", speak: "חָלָב", pronunciation: "chalav" },
      { english: "School", hebrew: "בית ספר", speak: "בֵּית סֵפֶר", pronunciation: "beit sefer" },
      { english: "Friend", hebrew: "חבר", speak: "חָבֵר", pronunciation: "chaver" },
      { english: "Car", hebrew: "מכונית", speak: "מְכוֹנִית", pronunciation: "mechonit" },
      { english: "Sun", hebrew: "שמש", speak: "שֶׁמֶשׁ", pronunciation: "shemesh" },
      { english: "Moon", hebrew: "ירח", speak: "יָרֵחַ", pronunciation: "yareach" }
    ]
  },
  {
    title: "Level 4: Higher Numbers",
    cards: [
      { english: "Eleven", hebrew: "אחת עשרה", speak: "אַחַת עֶשְׂרֵה", pronunciation: "achat esreh" },
      { english: "Twelve", hebrew: "שתים עשרה", speak: "שְׁתֵּים עֶשְׂרֵה", pronunciation: "shteym esreh" },
      { english: "Thirteen", hebrew: "שלוש עשרה", speak: "שְׁלֹשׁ עֶשְׂרֵה", pronunciation: "shlosh esreh" },
      { english: "Twenty", hebrew: "עשרים", speak: "עֶשְׂרִים", pronunciation: "esrim" },
      { english: "Thirty", hebrew: "שלושים", speak: "שְׁלוֹשִׁים", pronunciation: "shloshim" },
      { english: "Forty", hebrew: "ארבעים", speak: "אַרְבָּעִים", pronunciation: "arbaim" },
      { english: "Fifty", hebrew: "חמישים", speak: "חֲמִשִּׁים", pronunciation: "chamishim" },
      { english: "One hundred", hebrew: "מאה", speak: "מֵאָה", pronunciation: "me'ah" }
    ]
  },
  {
    title: "Level 5: Short Sentences",
    cards: [
      { english: "Good morning", hebrew: "בוקר טוב", speak: "בֹּקֶר טוֹב.", pronunciation: "boker tov" },
      { english: "Good night", hebrew: "לילה טוב", speak: "לַיְלָה טוֹב.", pronunciation: "layla tov" },
      { english: "Thank you", hebrew: "תודה רבה", speak: "תּוֹדָה רַבָּה.", pronunciation: "todah rabah" },
      { english: "I want water", hebrew: "אני רוצה מים", speak: "אֲנִי רוֹצֶה מַיִם.", pronunciation: "ani rotzeh mayim" },
      { english: "I am hungry", hebrew: "אני רעב", speak: "אֲנִי רָעֵב.", pronunciation: "ani ra'ev" },
      { english: "Where is Dad?", hebrew: "איפה אבא?", speak: "אֵיפֹה אַבָּא?", pronunciation: "eifo aba?" }
    ]
  },
  {
    title: "Level 6: Longer Sentences",
    cards: [
      { english: "I want to read a book", hebrew: "אני רוצה לקרוא ספר", speak: "אֲנִי רוֹצֶה לִקְרֹא סֵפֶר.", pronunciation: "ani rotzeh likro sefer" },
      { english: "The dog is in the house", hebrew: "הכלב בבית", speak: "הַכֶּלֶב בַּבַּיִת.", pronunciation: "hakelev babayit" },
      { english: "I am going to school", hebrew: "אני הולך לבית ספר", speak: "אֲנִי הוֹלֵךְ לְבֵית סֵפֶר.", pronunciation: "ani holech lebeit sefer" },
      { english: "Can I have water?", hebrew: "אפשר לקבל מים?", speak: "אֶפְשָׁר לְקַבֵּל מַיִם?", pronunciation: "efshar lekabel mayim?" },
      { english: "I love Mom and Dad", hebrew: "אני אוהב את אמא ואבא", speak: "אֲנִי אוֹהֵב אֶת אִמָּא וְאַבָּא.", pronunciation: "ani ohev et ima ve'aba" },
      { english: "I want to play outside", hebrew: "אני רוצה לשחק בחוץ", speak: "אֲנִי רוֹצֶה לְשַׂחֵק בַּחוּץ.", pronunciation: "ani rotzeh lesachek bachutz" }
    ]
  }
];

let levelIndex = 0;
let cardIndex = 0;
let isFlipped = false;
let hebrewVoice = null;
let hebrewVoices = [];
let activeUtterance = null;
const speechPreferencesKey = "hebrewCards.speech.v1";
let speechPreferences = {};
try {
  const saved = JSON.parse(localStorage.getItem(speechPreferencesKey) || "{}");
  if (saved && typeof saved === "object" && !Array.isArray(saved)) speechPreferences = saved;
} catch (_) { /* Speech still works when storage is unavailable. */ }

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
const voiceSelect = document.getElementById("voiceSelect");
const speechRate = document.getElementById("speechRate");
const voiceHelp = document.getElementById("voiceHelp");
const speechStatus = document.getElementById("speechStatus");
speechRate.value = speechPreferences.rate === "0.85" ? "0.85" : "1";

function populateLevels() {
  levels.forEach((level, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = level.title;
    levelSelect.appendChild(option);
  });
}

function voiceKey(voice) {
  return JSON.stringify([voice.voiceURI, voice.lang, voice.name]);
}

function voiceLabel(voice) {
  if (!/premium|enhanced|neural|natural/i.test(voice.name)) {
    if (/premium/i.test(voice.voiceURI)) return `${voice.name} (Premium)`;
    if (/enhanced/i.test(voice.voiceURI)) return `${voice.name} (Enhanced)`;
    if (/neural/i.test(voice.voiceURI)) return `${voice.name} (Neural)`;
  }
  return voice.name;
}

function saveSpeechPreferences() {
  try { localStorage.setItem(speechPreferencesKey, JSON.stringify(speechPreferences)); }
  catch (_) { /* Private browsing/storage restrictions must not break audio. */ }
}

function voiceScore(voice) {
  // Quality is not exposed by the Web Speech API. These are name-based hints,
  // not a guarantee; the user can choose any Hebrew voice exposed by the device.
  const label = `${voice.name} ${voice.voiceURI}`;
  let score = 0;
  if (/premium/i.test(label)) score += 40;
  if (/enhanced/i.test(label)) score += 30;
  if (/neural|natural/i.test(label)) score += 20;
  if (voice.default) score += 5;
  if (/^(he|iw)[-_]il$/i.test(voice.lang)) score += 1;
  return score;
}

function findHebrewVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  hebrewVoices = voices.filter(voice => /^(he|iw)(?:[-_]|$)/i.test(voice.lang))
    .sort((a, b) => voiceScore(b) - voiceScore(a) || a.name.localeCompare(b.name));
  const preferred = hebrewVoices.find(voice => voiceKey(voice) === speechPreferences.voice);
  hebrewVoice = preferred || hebrewVoices[0] || null;

  voiceSelect.replaceChildren();
  const automatic = document.createElement("option");
  automatic.value = "auto";
  automatic.textContent = hebrewVoices.length ? `Automatic (${voiceLabel(hebrewVoices[0])})` : "Automatic Hebrew voice";
  voiceSelect.appendChild(automatic);
  hebrewVoices.forEach(voice => {
    const option = document.createElement("option");
    option.value = voiceKey(voice);
    option.textContent = voiceLabel(voice);
    voiceSelect.appendChild(option);
  });
  voiceSelect.value = preferred ? voiceKey(preferred) : "auto";
  voiceSelect.disabled = !hebrewVoices.length;
  voiceHelp.textContent = hebrewVoice
    ? "Try the available Hebrew voices and choose the one you like best. Your choice applies on this device."
    : "If the sound is unavailable, add a Hebrew voice in your device’s Accessibility speech settings, then reload.";
  return voices;
}

function stopSpeech() {
  activeUtterance = null;
  window.speechSynthesis?.cancel();
  speechStatus.textContent = "";
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
  stopSpeech();
  isFlipped = !isFlipped;
  renderCard();

  if (isFlipped) {
    speakHebrew();
  }
}

function moveCard(direction) {
  stopSpeech();
  const total = levels[levelIndex].cards.length;
  cardIndex = (cardIndex + direction + total) % total;
  isFlipped = false;
  renderCard();
}

function speakHebrew() {
  stopSpeech();
  if (!("speechSynthesis" in window)) {
    speechStatus.textContent = "Speech is unavailable in this browser. Try Safari on your iPhone or iPad.";
    return;
  }

  const voices = findHebrewVoice();
  // An empty list can mean that voices are still loading. Let the browser
  // resolve he-IL in that case, but never deliberately select an English voice.
  if (voices.length && !hebrewVoice) {
    speechStatus.textContent = "No Hebrew voice is available. Add one in your device’s Accessibility speech settings, then reload.";
    return;
  }

  const current = currentCard();
  // Niqqud is speech-only: disambiguate vowels, shin/sin and grammatical forms
  // while leaving the familiar unpointed spelling on the learning cards.
  const utterance = new SpeechSynthesisUtterance(current.speak || current.hebrew);
  utterance.lang = "he-IL";
  utterance.rate = Number(speechRate.value);
  utterance.pitch = 1;
  utterance.volume = 1;
  if (hebrewVoice) utterance.voice = hebrewVoice;
  activeUtterance = utterance;
  utterance.onend = () => {
    if (activeUtterance === utterance) activeUtterance = null;
  };
  utterance.onerror = event => {
    if (activeUtterance !== utterance) return;
    activeUtterance = null;
    if (event.error === "canceled" || event.error === "interrupted") return;
    speechStatus.textContent = event.error === "not-allowed"
      ? "Tap Hear Hebrew again to start the sound."
      : "The voice could not play. Try another Hebrew voice in Audio settings, then tap Hear Hebrew.";
  };
  // Keep this synchronous with the tap for Safari's user-gesture requirement.
  window.speechSynthesis.resume();
  window.speechSynthesis.speak(utterance);
}

voiceSelect.addEventListener("change", () => {
  stopSpeech();
  speechPreferences.voice = voiceSelect.value;
  saveSpeechPreferences();
  findHebrewVoice();
});

speechRate.addEventListener("change", () => {
  stopSpeech();
  speechPreferences.rate = speechRate.value;
  saveSpeechPreferences();
});

window.addEventListener("pagehide", stopSpeech);

levelSelect.addEventListener("change", event => {
  stopSpeech();
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
  // Let controls keep their native keyboard behavior (including the audio menus).
  if (event.target.closest("button, a, input, select, textarea, summary")) return;
  if (["ArrowLeft", "ArrowRight", " ", "Enter"].includes(event.key)) event.preventDefault();
  if (event.key === "ArrowLeft") moveCard(-1);
  if (event.key === "ArrowRight") moveCard(1);
  if (event.key === " " || event.key === "Enter") flipCard();
});

populateLevels();
findHebrewVoice();

if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener("voiceschanged", findHebrewVoice);
}

renderCard();
