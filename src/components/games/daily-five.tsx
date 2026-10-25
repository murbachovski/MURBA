"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { dailyQuestions, previousDayKey, puzzleNumber, utcDayKey } from "@/lib/games";
import { readStored, writeStored } from "@/lib/storage";

type T = Dictionary["play"]["daily"];

const noSubscribe = () => () => {};
const STREAK_KEY = "murba:daily:streak";

function readStreak(): { last: string; count: number } {
  try {
    return JSON.parse(readStored(STREAK_KEY) ?? "") as { last: string; count: number };
  } catch {
    return { last: "", count: 0 };
  }
}

export function DailyFive({ lang, t, shareUrl }: { lang: string; t: T; shareUrl: string }) {
  // The day only exists in the browser; the prerendered page shows an empty frame.
  const dayKey = useSyncExternalStore(noSubscribe, () => utcDayKey(), () => null);
  const saved = useSyncExternalStore(
    noSubscribe,
    () => (dayKey ? readStored(`murba:daily:${dayKey}`) : null),
    () => null,
  );

  const questions = useMemo(() => (dayKey ? dailyQuestions(dayKey) : []), [dayKey]);
  const [results, setResults] = useState<boolean[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [finished, setFinished] = useState<{ marks: boolean[]; streak: number } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!dayKey) return <div className="min-h-[24rem]" />;

  const summary =
    finished ??
    (saved && results.length === 0 ? { marks: [...saved].map((c) => c === "1"), streak: readStreak().count } : null);

  function choose(index: number) {
    if (picked !== null) return;
    setPicked(index);
    setResults((prev) => [...prev, index === questions[prev.length].answer]);
  }

  function next() {
    if (results.length < questions.length) {
      setPicked(null);
      return;
    }
    const key = dayKey as string;
    writeStored(`murba:daily:${key}`, results.map((r) => (r ? "1" : "0")).join(""));
    const prev = readStreak();
    const count = prev.last === key ? prev.count : prev.last === previousDayKey(key) ? prev.count + 1 : 1;
    writeStored(STREAK_KEY, JSON.stringify({ last: key, count }));
    setFinished({ marks: results, streak: count });
  }

  async function share(marks: boolean[]) {
    const score = marks.filter(Boolean).length;
    const text = `MURBA Daily #${puzzleNumber(dayKey as string)} · ${score}/5\n${marks.map((m) => (m ? "●" : "○")).join(" ")}\n${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        // Share sheet closed.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard blocked.
    }
  }

  if (summary) {
    const score = summary.marks.filter(Boolean).length;
    return (
      <section className="mt-10 border-t border-ink pt-8">
        {!finished && <p className="text-ink-soft">{t.doneToday}</p>}
        <p className="mt-4 font-serif text-4xl">{t.score.replace("{n}", String(score))}</p>
        <p className="mt-4 text-2xl tracking-[0.4em] text-accent" aria-hidden>
          {summary.marks.map((m) => (m ? "●" : "○")).join("")}
        </p>
        {summary.streak > 0 && <p className="mt-4">{t.streak.replace("{n}", String(summary.streak))}</p>}
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button onClick={() => share(summary.marks)} className="bg-ink px-6 py-3 text-paper hover:bg-accent">
            {copied ? t.copied : t.share}
          </button>
          <span className="text-sm text-ink-soft">{t.comeBack}</span>
        </div>
      </section>
    );
  }

  // After answering, `results` already includes the current question.
  const step = picked !== null ? results.length - 1 : results.length;
  const q = questions[step];

  return (
    <section className="mt-10 border-t border-ink pt-8">
      <p className="label">
        #{puzzleNumber(dayKey)} · {step + 1} / 5
      </p>
      <p className="mt-6 font-serif text-5xl sm:text-6xl">{q.ko}</p>
      <p className="mt-2 text-ink-soft italic">{q.roman}</p>
      <p className="mt-8 font-semibold">{t.question}</p>
      <ol className="mt-4 space-y-3">
        {q.options.map((option, i) => {
          const state =
            picked === null ? "idle" : i === q.answer ? "answer" : i === picked ? "wrong" : "dim";
          return (
            <li key={option}>
              <button
                onClick={() => choose(i)}
                disabled={picked !== null}
                className={`w-full border px-4 py-3 text-left transition-colors ${
                  state === "idle"
                    ? "border-rule bg-[#fffdf8] hover:border-ink"
                    : state === "answer"
                      ? "border-pine bg-[#e4eee9]"
                      : state === "wrong"
                        ? "border-accent bg-[#fbeee8]"
                        : "border-rule text-ink-soft"
                }`}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ol>
      {picked !== null && (
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
          <p>
            {picked === q.answer ? t.correct : `${t.wrong} ${q.options[q.answer]}`}{" "}
            <Link href={`/${lang}/phrases/${q.slug}`} className="ink-link">
              {t.readNote}
            </Link>
          </p>
          <button onClick={next} className="bg-ink px-6 py-3 text-paper hover:bg-accent">
            {results.length < questions.length ? t.next : t.finish} →
          </button>
        </div>
      )}
    </section>
  );
}
