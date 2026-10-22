// Hand-written phrase notes. These are the site's evergreen content: they bring in
// search traffic and give readers something worth coming back for between chats.
// Keep the voice plain and specific. One idea per note.

export type PhraseNote = {
  slug: string;
  ko: string;
  roman: string;
  gist: string;
  body: string[];
  examples: { ko: string; roman: string; en: string }[];
  tip: string;
};

export const phraseNotes: PhraseNote[] = [
  {
    slug: "bap-meogeosseo",
    ko: "밥 먹었어?",
    roman: "bap meogeosseo?",
    gist: "“Did you eat?” — the Korean way of saying hi.",
    body: [
      "If you spend a week in Korea, someone will ask whether you've eaten. A coworker in the elevator, a friend's aunt, the owner of the corner shop you visit every morning. It is almost never a real question about food.",
      "The phrase works like “how are you?” in English. It checks in. It says I noticed you and I care a little. Older Koreans sometimes explain it with a memory of leaner years, when a full stomach was the clearest sign that someone was doing fine.",
      "So don't overthink the answer. A short yes and the same question back is the polite move. If you actually haven't eaten, saying so is fine too — just be ready for someone to take you to lunch."
    ],
    examples: [
      { ko: "밥 먹었어?", roman: "bap meogeosseo?", en: "Did you eat? (to a friend)" },
      { ko: "식사하셨어요?", roman: "siksa hasyeosseoyo?", en: "Have you had your meal? (polite, to someone older)" },
      { ko: "응, 먹었어. 너는?", roman: "eung, meogeosseo. neoneun?", en: "Yeah, I did. You?" }
    ],
    tip: "Next time a Korean friend messages you, open with “밥 먹었어?” instead of “hi”."
  },
  {
    slug: "sugohaseyo",
    ko: "수고하세요",
    roman: "sugohaseyo",
    gist: "What to say to a shop clerk on your way out.",
    body: [
      "Textbooks rarely teach this one, but you'll hear it every day. 수고 means effort or trouble. 수고하세요 is roughly “keep up the good work” — and it's what Koreans say to a cashier, a taxi driver or a delivery person as they leave.",
      "Its past-tense cousin, 수고하셨습니다, closes the workday. Teammates say it to each other when a meeting ends or someone heads home. It means “thanks for your hard work” and carries no irony.",
      "One small catch: some people feel 수고하세요 sounds slightly top-down when said to your boss, because it can read as an instruction to keep working. With seniors, “먼저 들어가 보겠습니다” (I'll head out first) plus a bow is the safer exit."
    ],
    examples: [
      { ko: "감사합니다, 수고하세요!", roman: "gamsahamnida, sugohaseyo!", en: "Thank you, have a good one! (leaving a shop)" },
      { ko: "오늘 다들 수고하셨습니다.", roman: "oneul dadeul sugohasyeotseumnida.", en: "Thanks for the hard work today, everyone." }
    ],
    tip: "Pay for your coffee, take it, and say “수고하세요” on the way out. Watch the barista smile."
  },
  {
    slug: "gwaenchanayo",
    ko: "괜찮아요",
    roman: "gwaenchanayo",
    gist: "It's okay, I'm fine, and no thank you — all in one word.",
    body: [
      "괜찮아요 is the Swiss army knife of Korean. Someone bumps into you: 괜찮아요, no harm done. A friend asks if you're alright after a long day: 괜찮아요. A shop assistant offers a plastic bag: 괜찮아요 — which here means no thanks.",
      "That last use trips people up. When you're offered something and you answer 괜찮아요, you are usually declining. If you want the thing, say 네, 주세요 (yes, please) instead.",
      "Tone does most of the work. A bright, quick 괜찮아요 sounds easygoing. A slow one with a small sigh can mean the opposite, and Koreans will hear it."
    ],
    examples: [
      { ko: "봉투 필요하세요? — 아니요, 괜찮아요.", roman: "bongtu piryohaseyo? — aniyo, gwaenchanayo.", en: "Do you need a bag? — No, I'm fine." },
      { ko: "괜찮아? 많이 아파?", roman: "gwaenchana? mani apa?", en: "Are you okay? Does it hurt a lot?" }
    ],
    tip: "Use “괜찮아요” the next time you turn down a receipt. Use “네, 주세요” when you actually want one."
  },
  {
    slug: "jeogiyo",
    ko: "저기요",
    roman: "jeogiyo",
    gist: "How to get a server's attention without waving.",
    body: [
      "In most Korean restaurants nobody comes by to check on you. You call when you need something — and that is not rude. 저기요 literally points to “over there”, and as a call it means “excuse me”.",
      "You'll also hear 여기요 (“over here”). Both are fine. Raise your voice a little; restaurants are loud and staff expect it. Many tables also have a call button, which removes the problem entirely.",
      "Avoid 아줌마 (ma'am) or 아저씨 (mister) as a way of calling staff unless you hear locals doing it in that place. Some people find those words a bit blunt."
    ],
    examples: [
      { ko: "저기요, 물 좀 주세요.", roman: "jeogiyo, mul jom juseyo.", en: "Excuse me, some water please." },
      { ko: "여기요, 계산할게요.", roman: "yeogiyo, gyesanhalgeyo.", en: "Over here, we'd like to pay." }
    ],
    tip: "At your next Korean meal, call for the check with “저기요, 계산할게요.”"
  },
  {
    slug: "daebak",
    ko: "대박",
    roman: "daebak",
    gist: "Jackpot. Also: no way, amazing, and sometimes disaster.",
    body: [
      "대박 started out meaning a big hit or a jackpot. Today it's the reaction word of a whole generation. Good news? 대박. Unbelievable gossip? 대박. A concert ticket you somehow got? 대박.",
      "It can flip negative too. 대박 망했다 means “totally ruined”, and a deadpan 대박… after bad news means something like “wow, great.” Context does all the work.",
      "It's casual. Use it with friends, in comments and in group chats. In a job interview, keep it to yourself."
    ],
    examples: [
      { ko: "대박! 진짜 합격했어?", roman: "daebak! jinjja hapgyeokaesseo?", en: "No way! You actually passed?" },
      { ko: "이 집 떡볶이 대박이다.", roman: "i jip tteokbokki daebagida.", en: "This place's tteokbokki is incredible." }
    ],
    tip: "Reply “대박” the next time a Korean friend shares good news. That's the whole sentence."
  },
  {
    slug: "jal-meokgetseumnida",
    ko: "잘 먹겠습니다",
    roman: "jal meokgetseumnida",
    gist: "The thank-you you say before the first bite.",
    body: [
      "Before eating, especially when someone else made or paid for the meal, Koreans say 잘 먹겠습니다: “I will eat well.” It thanks the host and announces that the meal can begin.",
      "After the meal comes 잘 먹었습니다, “I ate well.” Say it to whoever cooked, whoever paid, or the restaurant owner as you leave. It's one of the easiest ways to sound warm and well-raised.",
      "With close friends you can drop the formality: 잘 먹을게! before, 잘 먹었어! after."
    ],
    examples: [
      { ko: "와, 맛있겠다. 잘 먹겠습니다!", roman: "wa, masitgetda. jal meokgetseumnida!", en: "Wow, this looks great. Thank you for the meal!" },
      { ko: "사장님, 잘 먹었습니다!", roman: "sajangnim, jal meogeotseumnida!", en: "Thank you, that was great! (to the owner, leaving)" }
    ],
    tip: "Say “잘 먹었습니다” to the owner when you leave a small restaurant. It gets remembered."
  },
  {
    slug: "nunchi",
    ko: "눈치",
    roman: "nunchi",
    gist: "Reading the room — a skill Koreans name out loud.",
    body: [
      "눈치 is the ability to sense what others are thinking or feeling without being told. Noticing that your host is tired and it's time to leave. Realizing the meeting has gone quiet because the boss disagrees.",
      "Someone who has it 눈치가 빠르다 — has quick nunchi. Someone who doesn't 눈치가 없다. Being called 눈치 없어 is a gentle but real criticism.",
      "You'll also hear 눈치 보다, “to watch someone's nunchi”: being careful and a little anxious about how others will react. Many dramas are, more or less, two hours of characters doing this."
    ],
    examples: [
      { ko: "걔는 눈치가 진짜 빨라.", roman: "gyaeneun nunchiga jinjja ppalla.", en: "That person really picks up on things fast." },
      { ko: "눈치 보지 말고 편하게 먹어.", roman: "nunchi boji malgo pyeonhage meogeo.", en: "Don't worry about anyone, just eat comfortably." }
    ],
    tip: "Notice when someone says “눈치 보지 마” in a drama. Someone is being told to relax."
  },
  {
    slug: "aigo",
    ko: "아이고",
    roman: "aigo",
    gist: "The sigh that can mean almost anything.",
    body: [
      "아이고 is a sound before it's a word. Getting up from a low table: 아이고. Seeing a toddler fall over: 아이고. Hearing that your friend's flight was cancelled: 아이고…",
      "It covers surprise, sympathy, tiredness and mild frustration. Grandparents say it constantly; younger people use it too, often with a bit of humor.",
      "Stretch it for effect — 아이고오 — or shorten it to 에고 for something lighter and cuter."
    ],
    examples: [
      { ko: "아이고, 허리야.", roman: "aigo, heoriya.", en: "Oof, my back." },
      { ko: "아이고, 고생 많았네.", roman: "aigo, gosaeng manatne.", en: "Oh no, you've been through a lot." }
    ],
    tip: "The next time you stand up after sitting on the floor, try “아이고” out loud. Nobody will blink."
  }
];

export function getPhraseNote(slug: string) {
  return phraseNotes.find((note) => note.slug === slug);
}
