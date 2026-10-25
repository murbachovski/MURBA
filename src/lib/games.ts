import { phraseNotes } from "@/content/phrases";

// ---------- Daily five ----------

// Puzzle #1 is the launch day; everyone gets the same five questions per UTC day.
const DAILY_EPOCH = Date.UTC(2026, 9, 25);

export function utcDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function previousDayKey(key: string) {
  return utcDayKey(new Date(Date.parse(key) - 86_400_000));
}

export function puzzleNumber(key: string) {
  return Math.floor((Date.parse(key) - DAILY_EPOCH) / 86_400_000) + 1;
}

// Small deterministic PRNG (mulberry32), seeded from the day key.
function seededRandom(seedText: string) {
  let seed = 0;
  for (const ch of seedText) seed = (Math.imul(seed, 31) + ch.charCodeAt(0)) | 0;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: T[], random: () => number = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export type DailyQuestion = {
  slug: string;
  ko: string;
  roman: string;
  options: string[];
  answer: number;
};

export function dailyQuestions(dayKey: string): DailyQuestion[] {
  const random = seededRandom(`murba-${dayKey}`);
  const picked = shuffle(phraseNotes, random).slice(0, 5);
  return picked.map((note) => {
    const others = shuffle(
      phraseNotes.filter((n) => n.slug !== note.slug),
      random,
    ).slice(0, 3);
    const options = shuffle([note.gist, ...others.map((n) => n.gist)], random);
    return { slug: note.slug, ko: note.ko, roman: note.roman, options, answer: options.indexOf(note.gist) };
  });
}

// ---------- Hangul blocks ----------

const INITIALS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const VOWELS = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const FINALS = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

export type Syllable = { initial: number; vowel: number; final: number };

export function decompose(word: string): Syllable[] {
  return [...word].map((ch) => {
    const code = ch.charCodeAt(0) - 0xac00;
    return { initial: Math.floor(code / 588), vowel: Math.floor((code % 588) / 28), final: code % 28 };
  });
}

// The letters a learner taps, in reading order.
export function jamoSequence(word: string) {
  return decompose(word).flatMap((s) => [INITIALS[s.initial], VOWELS[s.vowel], ...(s.final ? [FINALS[s.final]] : [])]);
}

// What the word looks like after `typed` letters: finished blocks plus the block being built.
export function partialWord(word: string, typed: number) {
  let left = typed;
  let out = "";
  for (const s of decompose(word)) {
    const size = s.final ? 3 : 2;
    if (left <= 0) break;
    if (left === 1) out += INITIALS[s.initial];
    else if (left === 2 || !s.final) out += String.fromCharCode(0xac00 + (s.initial * 21 + s.vowel) * 28);
    else out += String.fromCharCode(0xac00 + (s.initial * 21 + s.vowel) * 28 + s.final);
    left -= size;
  }
  return out;
}

const DISTRACTORS = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅓㅗㅜㅡㅣㅐㅔ";

export function tilesFor(word: string) {
  const sequence = jamoSequence(word);
  const extras = shuffle([...DISTRACTORS].filter((ch) => !sequence.includes(ch))).slice(0, 3);
  return shuffle([...sequence, ...extras]).map((ch, id) => ({ id, ch }));
}

export type BlockWord = { ko: string; roman: string; en: string; ja: string; es: string };

// Everyday words without double final consonants, so every block is easy to read.
export const blockWords: BlockWord[] = [
  { ko: "밥", roman: "bap", en: "rice, a meal", ja: "ご飯", es: "arroz, comida" },
  { ko: "물", roman: "mul", en: "water", ja: "水", es: "agua" },
  { ko: "집", roman: "jip", en: "home", ja: "家", es: "casa" },
  { ko: "눈", roman: "nun", en: "snow; eye", ja: "雪・目", es: "nieve; ojo" },
  { ko: "책", roman: "chaek", en: "book", ja: "本", es: "libro" },
  { ko: "김치", roman: "gimchi", en: "kimchi", ja: "キムチ", es: "kimchi" },
  { ko: "친구", roman: "chingu", en: "friend", ja: "友だち", es: "amigo" },
  { ko: "사랑", roman: "sarang", en: "love", ja: "愛", es: "amor" },
  { ko: "한국", roman: "hanguk", en: "Korea", ja: "韓国", es: "Corea" },
  { ko: "커피", roman: "keopi", en: "coffee", ja: "コーヒー", es: "café" },
  { ko: "학교", roman: "hakgyo", en: "school", ja: "学校", es: "escuela" },
  { ko: "바다", roman: "bada", en: "sea", ja: "海", es: "mar" },
  { ko: "하늘", roman: "haneul", en: "sky", ja: "空", es: "cielo" },
  { ko: "고양이", roman: "goyangi", en: "cat", ja: "猫", es: "gato" },
  { ko: "사과", roman: "sagwa", en: "apple; an apology", ja: "りんご・謝罪", es: "manzana; disculpa" },
  { ko: "우유", roman: "uyu", en: "milk", ja: "牛乳", es: "leche" },
  { ko: "노래", roman: "norae", en: "song", ja: "歌", es: "canción" },
  { ko: "시간", roman: "sigan", en: "time", ja: "時間", es: "tiempo" },
  { ko: "가방", roman: "gabang", en: "bag", ja: "かばん", es: "bolso" },
  { ko: "여름", roman: "yeoreum", en: "summer", ja: "夏", es: "verano" },
];
