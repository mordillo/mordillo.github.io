const levels = curriculumLevels;

let levelIndex = 0;
let cardIndex = 0;
let isFlipped = false;
let hebrewVoice = null;
let hebrewVoices = [];
let activeUtterance = null;
let playbackVersion = 0;
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
const recordedSpeech = document.getElementById("recordedSpeech");
const audioSource = document.getElementById("audioSource");
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
  playbackVersion += 1;
  recordedSpeech.pause();
  // Safari can reject seeking media whose metadata has not loaded yet.
  if (recordedSpeech.readyState > 0) {
    try { recordedSpeech.currentTime = 0; } catch (_) { /* Navigation must still work. */ }
  }
  // Avoid canceling the idle speech engine on every recorded-audio tap.
  const synth = window.speechSynthesis;
  if (activeUtterance || synth?.speaking || synth?.pending) synth?.cancel();
  activeUtterance = null;
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
  const isSentence = level.stage !== "words";
  card.classList.toggle("sentence-card", isSentence);
  card.classList.toggle("long-sentence-card", level.stage === "long");
  englishHint.textContent = "Tap to see Hebrew";
  hebrewWord.textContent = current.hebrew;
  pronunciation.textContent = current.pronunciation
    ? `Sounds like: ${current.pronunciation}`
    : "";

  audioSource.textContent = current.audio?.startsWith("parent-") ? "Dad’s voice" : current.audio ? "Recorded Hebrew voice" : "Device Hebrew voice";
  // Prepare each recording on navigation; playback still starts directly from a tap.
  if (current.audio && recordedSpeech.getAttribute("src") !== current.audio) {
    recordedSpeech.src = current.audio;
    recordedSpeech.load();
  }
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
  const current = currentCard();
  if (current.audio) {
    const version = playbackVersion;
    recordedSpeech.playbackRate = Number(speechRate.value);
    recordedSpeech.preservesPitch = true;
    recordedSpeech.webkitPreservesPitch = true;
    const reportError = () => {
      if (version === playbackVersion) {
        speechStatus.textContent = "The recording could not play. Check your connection and tap Hear Hebrew again.";
      }
    };
    try {
      const playing = recordedSpeech.play();
      if (playing && typeof playing.catch === "function") playing.catch(reportError);
    } catch (_) { reportError(); }
    return;
  }
  if (!("speechSynthesis" in window)) {
    speechStatus.textContent = "Speech is unavailable in this browser. Try Safari on your iPhone or iPad.";
    return;
  }

  findHebrewVoice();
  // Some iOS versions omit installed Hebrew voices from getVoices().
  // Let he-IL resolve through the OS instead of blocking playback.

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
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();
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
