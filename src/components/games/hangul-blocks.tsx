"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { blockWords, jamoSequence, partialWord, shuffle, tilesFor, type BlockWord } from "@/lib/games";

type T = Dictionary["play"]["hangul"];
const ROUND = 6;

function meaning(word: BlockWord, lang: string) {
  return lang === "ja" ? word.ja : lang === "es" ? word.es : word.en;
}

export function HangulBlocks({ lang, t }: { lang: string; t: T }) {
  const [round, setRound] = useState<BlockWord[] | null>(null);
  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState<{ id: number; ch: string }[]>([]);
  const [used, setUsed] = useState<number[]>([]);
  const [typed, setTyped] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function start() {
    const words = shuffle(blockWords).slice(0, ROUND);
    setRound(words);
    setIndex(0);
    setTiles(tilesFor(words[0].ko));
    setUsed([]);
    setTyped(0);
    setMistakes(0);
    setDone(false);
  }

  if (!round) {
    return (
      <div className="mt-10 border-t border-ink pt-8">
        <p className="text-ink-soft">{t.instructions}</p>
        <button onClick={start} className="mt-6 bg-ink px-6 py-3 text-paper hover:bg-accent">
          {t.cta} →
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mt-10 border-t border-ink pt-8">
        <p className="font-serif text-4xl">
          {t.result.replace("{n}", String(round.length)).replace("{m}", String(mistakes))}
        </p>
        <p className="mt-6 font-serif text-3xl tracking-wide text-pine">{round.map((w) => w.ko).join(" · ")}</p>
        <button onClick={start} className="mt-8 bg-ink px-6 py-3 text-paper hover:bg-accent">
          {t.again}
        </button>
      </div>
    );
  }

  const word = round[index];
  const sequence = jamoSequence(word.ko);
  const complete = typed === sequence.length;

  function tap(tile: { id: number; ch: string }) {
    if (complete || used.includes(tile.id)) return;
    if (tile.ch === sequence[typed]) {
      setUsed((prev) => [...prev, tile.id]);
      setTyped((n) => n + 1);
    } else {
      setMistakes((n) => n + 1);
      setShake(tile.id);
      setTimeout(() => setShake(null), 350);
    }
  }

  function next() {
    if (index + 1 >= round!.length) {
      setDone(true);
      return;
    }
    const nextWord = round![index + 1];
    setIndex(index + 1);
    setTiles(tilesFor(nextWord.ko));
    setUsed([]);
    setTyped(0);
  }

  return (
    <div className="mt-10 border-t border-ink pt-8">
      <div className="flex items-baseline justify-between text-sm text-ink-soft">
        <span className="label">
          {index + 1} / {round.length}
        </span>
        <span>{t.mistakes.replace("{n}", String(mistakes))}</span>
      </div>

      <p className="mt-6 text-ink-soft">
        <span className="italic">{word.roman}</span> — {t.hint} {meaning(word, lang)}
      </p>

      {/* The word as it is being built: a wide, quiet line that fills up block by block. */}
      <p
        className={`mt-4 flex min-h-[7rem] items-center border-b-2 font-serif text-7xl ${
          complete ? "border-pine text-pine" : "border-rule"
        }`}
        aria-live="polite"
      >
        {partialWord(word.ko, typed) || <span className="text-rule">·</span>}
      </p>

      <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-6">
        {tiles.map((tile) => {
          const isUsed = used.includes(tile.id);
          return (
            <button
              key={tile.id}
              onClick={() => tap(tile)}
              disabled={isUsed || complete}
              className={`aspect-square border font-serif text-3xl transition-all ${
                isUsed
                  ? "border-transparent text-rule"
                  : shake === tile.id
                    ? "translate-x-1 border-accent bg-[#fbeee8]"
                    : "border-ink bg-[#fffdf8] hover:bg-paper-deep"
              }`}
            >
              {tile.ch}
            </button>
          );
        })}
      </div>

      {complete && (
        <div className="mt-8 flex justify-end">
          <button onClick={next} className="bg-ink px-6 py-3 text-paper hover:bg-accent">
            {index + 1 >= round.length ? t.finish : t.next} →
          </button>
        </div>
      )}
    </div>
  );
}
