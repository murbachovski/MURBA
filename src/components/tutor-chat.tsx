"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ERROR_MARK, REFUSAL_MARK, tutorModes, type ChatTurn, type TutorMode } from "@/lib/tutor";

type Notice = keyof Dictionary["tutor"]["errors"];

type TutorChatProps = {
  lang: string;
  t: Dictionary["tutor"];
  pricingHref: string;
};

// A phrase note can open the tutor with a question ready (?ask=…). It's filled in, not sent,
// so the learner decides what to spend their free messages on.
export function TutorChatWithAsk(props: TutorChatProps) {
  const ask = useSearchParams().get("ask") ?? "";
  return <TutorChat {...props} initialDraft={ask.slice(0, 1500)} />;
}

export function TutorChat({ lang, t, pricingHref, initialDraft = "" }: TutorChatProps & { initialDraft?: string }) {
  const [mode, setMode] = useState<TutorMode>("daily");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState(initialDraft);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns]);

  function switchMode(next: TutorMode) {
    if (busy || next === mode) return;
    setMode(next);
    setTurns([]);
    setNotice(null);
  }

  function startOver() {
    setTurns([]);
    setNotice(null);
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;

    // Keep the request small: the latest turns are enough context for a tutor chat.
    const history: ChatTurn[] = [...turns, { role: "user" as const, content }].slice(-20);
    while (history[0]?.role === "assistant") history.shift();

    setTurns([...turns, { role: "user", content }, { role: "assistant", content: "" }]);
    setDraft("");
    setNotice(null);
    setBusy(true);

    const fail = (kind: Notice) => {
      setNotice(kind);
      // Drop the empty tutor bubble (and the question, so it can be resent).
      setTurns((prev) => prev.slice(0, -2));
      setDraft(content);
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, mode, lang }),
      });
      if (!res.ok || !res.body) {
        fail(res.status === 429 ? "limit" : res.status === 503 ? "unavailable" : "generic");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        const shown = reply.replace(REFUSAL_MARK, "").replace(ERROR_MARK, "");
        setTurns((prev) => [...prev.slice(0, -1), { role: "assistant", content: shown }]);
      }

      if (reply.includes(ERROR_MARK) || reply.includes(REFUSAL_MARK)) {
        const kind: Notice = reply.includes(REFUSAL_MARK) ? "refusal" : "generic";
        const partial = reply.replace(REFUSAL_MARK, "").replace(ERROR_MARK, "").trim();
        if (partial) setNotice(kind);
        else fail(kind);
      }
    } catch {
      fail("generic");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink pb-3">
        <div role="tablist" className="flex gap-5">
          {tutorModes.map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={m === mode}
              onClick={() => switchMode(m)}
              className={
                m === mode
                  ? "border-b-2 border-accent pb-1 font-semibold"
                  : "pb-1 text-ink-soft hover:text-ink"
              }
            >
              {t.modes[m]}
            </button>
          ))}
        </div>
        {turns.length > 0 && (
          <button
            onClick={startOver}
            disabled={busy}
            className="text-sm text-ink-soft hover:text-accent disabled:opacity-40"
          >
            {t.newChat}
          </button>
        )}
      </div>

      <div className="min-h-[18rem] py-8" aria-live="polite">
        {turns.length === 0 ? (
          <div>
            <p className="font-serif text-2xl">{t.emptyTitle}</p>
            <p className="mt-2 text-ink-soft">{t.emptyBody}</p>
            <ul className="mt-5 space-y-2">
              {t.starters[mode].map((s) => (
                <li key={s}>
                  <button onClick={() => send(s)} className="text-left hover:text-accent">
                    <span className="mr-2 text-accent">↳</span>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ol className="space-y-7">
            {turns.map((turn, i) => (
              <li key={i} className={turn.role === "user" ? "ml-auto max-w-[85%] text-right" : "max-w-[92%]"}>
                <p className="label mb-1">{turn.role === "user" ? t.you : t.tutorName}</p>
                {turn.role === "user" ? (
                  <p className="inline-block bg-paper-deep px-4 py-2 text-left whitespace-pre-wrap">{turn.content}</p>
                ) : (
                  <p className="border-l-2 border-pine pl-4 leading-relaxed whitespace-pre-wrap">
                    {turn.content || <span className="text-ink-soft italic">{t.writing}</span>}
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}
        <div ref={endRef} />
      </div>

      {notice && (
        <p className="mb-4 border-l-2 border-accent bg-[#fbeee8] px-4 py-3 text-sm">
          {t.errors[notice]}{" "}
          {notice === "limit" && (
            <Link href={pricingHref} className="ink-link">
              Pro →
            </Link>
          )}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="flex items-end gap-3 border-t border-ink pt-4"
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              send(draft);
            }
          }}
          rows={2}
          maxLength={1500}
          placeholder={t.placeholder}
          className="flex-1 resize-none border border-rule bg-[#fffdf8] px-3 py-2 outline-none focus:border-ink"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
          className="bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent disabled:opacity-40"
        >
          {t.send}
        </button>
      </form>
      <p className="mt-3 text-xs text-ink-soft">{t.disclaimer}</p>
    </div>
  );
}
