import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n";
import {
  ERROR_MARK,
  FREE_DAILY_LIMIT,
  MAX_CHARS,
  MAX_TURNS,
  REFUSAL_MARK,
  buildSystemPrompt,
  tutorModes,
  type ChatTurn,
  type TutorMode,
} from "@/lib/tutor";

const MODEL = process.env.CLAUDE_MODEL ?? "claude-opus-5-5";
const USAGE_COOKIE = "murba_usage";

let client: Anthropic | null = null;
function getClient() {
  client ??= new Anthropic();
  return client;
}

function parseTurns(value: unknown): ChatTurn[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_TURNS) return null;
  const turns: ChatTurn[] = [];
  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (!text) return null;
    turns.push({ role, content: text });
  }
  return turns.at(-1)?.role === "user" ? turns : null;
}

// Free usage is counted per browser per day (UTC). It's a soft limit meant to keep costs
// predictable, not a security boundary; add real per-user limits when accounts arrive.
function readUsage(request: NextRequest) {
  const today = new Date().toISOString().slice(0, 10);
  const [day, count] = (request.cookies.get(USAGE_COOKIE)?.value ?? "").split(".");
  return { today, used: day === today ? Number(count) || 0 : 0 };
}

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const turns = parseTurns(body.messages);
  const mode = tutorModes.includes(body.mode as TutorMode) ? (body.mode as TutorMode) : "daily";
  const lang = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "en";
  if (!turns) return Response.json({ error: "bad_request" }, { status: 400 });

  const { today, used } = readUsage(request);
  if (used >= FREE_DAILY_LIMIT) {
    return Response.json({ error: "limit" }, { status: 429 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const reply = getClient().beta.messages.stream({
          model: MODEL,
          max_tokens: 4000,
          system: buildSystemPrompt(mode, lang),
          messages: turns,
          // Short, chatty answers: low effort keeps replies quick and inexpensive.
          output_config: { effort: "low" },
          // If the model declines on policy grounds, let the API retry on its recommended fallback.
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
        });

        for await (const event of reply) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await reply.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode(REFUSAL_MARK));
        }
      } catch (error) {
        if (error instanceof Anthropic.APIError) {
          console.error("Claude API error", error.status, error.message);
        } else {
          console.error("Tutor stream failed", error);
        }
        controller.enqueue(encoder.encode(ERROR_MARK));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": `${USAGE_COOKIE}=${today}.${used + 1}; Path=/; Max-Age=172800; HttpOnly; SameSite=Lax; Secure`,
    },
  });
}
