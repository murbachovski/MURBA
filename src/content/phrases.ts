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
  },
  {
    slug: "annyeonghi-gaseyo",
    ko: "안녕히 가세요",
    roman: "annyeonghi gaseyo",
    gist: "Two goodbyes — one for whoever leaves, one for whoever stays.",
    body: [
      "Korean has two polite goodbyes, and which one you use depends on who is walking away. 안녕히 가세요 means “go in peace.” You say it to the person leaving. 안녕히 계세요 means “stay in peace.” You say it when you are the one leaving.",
      "So when you walk out of a shop, you say 안녕히 계세요 to the staff, and they answer 안녕히 가세요. If both of you are leaving in different directions, 안녕히 가세요 works for both.",
      "Among friends, all of this shrinks to 잘 가 (bye) or 들어가 — literally “go in,” a warm way of saying get home safe, often heard at the end of a phone call."
    ],
    examples: [
      { ko: "감사합니다. 안녕히 계세요!", roman: "gamsahamnida. annyeonghi gyeseyo!", en: "Thank you. Goodbye! (you're leaving)" },
      { ko: "네, 안녕히 가세요.", roman: "ne, annyeonghi gaseyo.", en: "Okay, goodbye. (they're leaving)" },
      { ko: "조심히 들어가!", roman: "josimhi deureoga!", en: "Get home safe!" }
    ],
    tip: "Leaving a shop or a restaurant? It's “안녕히 계세요” — you're the one going."
  },
  {
    slug: "hwaiting",
    ko: "화이팅",
    roman: "hwaiting",
    gist: "“Fighting!” — the cheer that has nothing to do with fighting.",
    body: [
      "화이팅 comes from the English word “fighting,” but it means you can do it, good luck, go for it. You'll hear it before exams, job interviews, sports matches and Monday mornings.",
      "You'll also see it spelled 파이팅, which is the officially recommended spelling. Both are everywhere, and nobody will correct you either way.",
      "It works almost anywhere. Shout it at a friend, end a work message with 오늘도 화이팅하세요, or say it quietly to yourself before something scary."
    ],
    examples: [
      { ko: "시험 잘 봐! 화이팅!", roman: "siheom jal bwa! hwaiting!", en: "Good luck on the exam! You've got this!" },
      { ko: "우리 팀 화이팅!", roman: "uri tim hwaiting!", en: "Go team!" },
      { ko: "오늘도 화이팅하세요.", roman: "oneuldo hwaitinghaseyo.", en: "Have a good one today. (polite sign-off)" }
    ],
    tip: "End your next message to a Korean friend with “화이팅!” before their big day."
  },
  {
    slug: "jinjja",
    ko: "진짜",
    roman: "jinjja",
    gist: "Really, real, seriously — the word that fills every pause.",
    body: [
      "진짜 means real or really, and Koreans use it constantly. As a question, 진짜? is “really?” As an adverb, it turns up the volume on whatever comes next: 진짜 맛있어, really delicious.",
      "Its more formal sibling is 정말. In writing, speeches and polite talk with older people, 정말 sounds a little more careful. Among friends, 진짜 wins every time.",
      "Add 요 and it becomes polite: 진짜요? is how you'd answer surprising news from a coworker."
    ],
    examples: [
      { ko: "진짜? 대박.", roman: "jinjja? daebak.", en: "Really? No way." },
      { ko: "이거 진짜 맛있어요.", roman: "igeo jinjja masisseoyo.", en: "This is really good." },
      { ko: "진짜요? 몰랐어요.", roman: "jinjjayo? mollasseoyo.", en: "Really? I didn't know." }
    ],
    tip: "Next time you're surprised, skip “really?” and say “진짜?” instead."
  },
  {
    slug: "oppa",
    ko: "오빠",
    roman: "oppa",
    gist: "Older brother — and the four words Koreans use instead of names.",
    body: [
      "Koreans often call people older than them by a family word instead of their name. Which word depends on both your gender and theirs.",
      "A woman calls an older man 오빠 and an older woman 언니. A man calls an older man 형 and an older woman 누나. These are used for real siblings, close friends, boyfriends and girlfriends, and — yes — for idols by their fans.",
      "Using them is a sign of closeness. With someone you've just met, wait until they suggest it, or until you've had a meal or two together."
    ],
    examples: [
      { ko: "오빠, 이거 먹어.", roman: "oppa, igeo meogeo.", en: "Oppa, have this. (a woman to an older man)" },
      { ko: "형, 어디야?", roman: "hyeong, eodiya?", en: "Where are you? (a man to an older man)" },
      { ko: "언니, 같이 가요!", roman: "eonni, gachi gayo!", en: "Let's go together! (a woman to an older woman)" }
    ],
    tip: "Listen for 오빠, 언니, 형 and 누나 in the next drama you watch. Notice who says which word to whom."
  },
  {
    slug: "jamkkanmanyo",
    ko: "잠깐만요",
    roman: "jamkkanmanyo",
    gist: "Just a moment — and how to get off a packed subway.",
    body: [
      "잠깐 means a short moment. 잠깐만요 is “just a moment, please,” and you'll use it when you need someone to wait while you find your card or answer a call.",
      "It has a second life on crowded trains and buses. Said while gently squeezing past people, 잠깐만요 means excuse me, coming through. Add 내릴게요 (I'm getting off) and people will make room.",
      "잠시만요 means the same thing and sounds slightly more polite. You'll hear staff say 잠시만 기다려 주세요, please wait a moment."
    ],
    examples: [
      { ko: "잠깐만요, 내릴게요!", roman: "jamkkanmanyo, naerilgeyo!", en: "Excuse me, I'm getting off!" },
      { ko: "잠시만 기다려 주세요.", roman: "jamsiman gidaryeo juseyo.", en: "Please wait a moment." }
    ],
    tip: "Keep “잠깐만요, 내릴게요” ready for your next rush-hour ride in Seoul."
  },
  {
    slug: "eotteokae",
    ko: "어떡해",
    roman: "eotteokae",
    gist: "Oh no, what do I do — and, oddly, “this is too cute.”",
    body: [
      "어떡해 is a shortened 어떻게 해, “what do I do?” It's what slips out when you miss the last train, spill coffee on a white shirt, or realize your phone is at home.",
      "It also covers sympathy. When a friend tells you bad news, a soft 어떡해… means oh no, I'm so sorry.",
      "And then there's the happy version. Faced with a puppy or a baby in a tiny hat, people say 어떡해, 너무 귀여워 — what do I do, it's too cute. Spelling note: even Koreans sometimes write 어떻해 by mistake. The correct form is 어떡해."
    ],
    examples: [
      { ko: "어떡해, 지갑을 잃어버렸어.", roman: "eotteokae, jigabeul ireobeoryeosseo.", en: "Oh no, I lost my wallet." },
      { ko: "어떡하지?", roman: "eotteokaji?", en: "What should I do?" },
      { ko: "어떡해… 너무 귀여워.", roman: "eotteokae... neomu gwiyeowo.", en: "Oh my gosh… it's so cute." }
    ],
    tip: "The next time something goes wrong, try “어떡해” instead of the word you were about to say."
  },
  {
    slug: "heol",
    ko: "헐",
    roman: "heol",
    gist: "The one-syllable gasp of the internet age.",
    body: [
      "헐 is pure reaction. Surprise, disbelief, mild horror — it covers them all in one short breath. It started as internet slang and moved into everyday speech.",
      "It pairs naturally with other reaction words: 헐, 진짜? or 헐, 대박. Stretch it out — 허얼 — when the news is really something.",
      "Keep it for friends and group chats. Said to your boss after hearing about a deadline, it lands a little too honest."
    ],
    examples: [
      { ko: "헐, 진짜?", roman: "heol, jinjja?", en: "Whoa, seriously?" },
      { ko: "헐… 벌써 열두 시야?", roman: "heol... beolsseo yeoldu siya?", en: "Wait… it's already twelve?" }
    ],
    tip: "Reply “헐” to the next surprising message in your group chat. One syllable is enough."
  },
  {
    slug: "geonbae",
    ko: "건배",
    roman: "geonbae",
    gist: "Cheers — plus the small manners that come with a Korean drink.",
    body: [
      "건배 is the standard toast, the word you say as glasses meet. Among friends you'll more often hear 짠, which is just the sound of the clink.",
      "A few manners go with it. When someone older pours for you, hold your glass with both hands. When you drink in front of someone much older, turn your head slightly away. And don't pour your own glass — fill someone else's, and they'll fill yours.",
      "At company dinners someone may lead a longer toast and the table answers together, often with 위하여! — “to that!”"
    ],
    examples: [
      { ko: "건배!", roman: "geonbae!", en: "Cheers!" },
      { ko: "짠!", roman: "jjan!", en: "Cheers! (casual, the clink sound)" },
      { ko: "우리의 새 출발을 위하여!", roman: "uriui sae chulbareul wihayeo!", en: "To our new start!" }
    ],
    tip: "At your next Korean dinner, fill a friend's glass before your own and say “짠!”"
  }
];

export function getPhraseNote(slug: string) {
  return phraseNotes.find((note) => note.slug === slug);
}
