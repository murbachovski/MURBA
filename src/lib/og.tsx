import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

// Share-card styling, kept in step with globals.css.
export const ogSize = { width: 1200, height: 630 };

// Gowun Batang (OFL), subset to Latin and the 2,350 common Hangul syllables (KS X 1001)
// so it stays small. A syllable outside that set would render as a blank box.
export async function ogFonts() {
  const data = await readFile(join(process.cwd(), "assets/fonts/GowunBatang-Bold-og.ttf"));
  return [{ name: "Gowun Batang", data, style: "normal" as const, weight: 700 as const }];
}

export function OgFrame({ children, footer }: { children: ReactNode; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f5f0e6",
        color: "#1f1c18",
        padding: "64px 80px",
        fontFamily: "Gowun Batang",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, fontSize: 36 }}>
        <span>MURBA</span>
        <span style={{ fontSize: 26, color: "#b8432a" }}>머르바</span>
      </div>
      {children}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid #1f1c18",
          paddingTop: 20,
          fontSize: 24,
          color: "#5a534a",
        }}
      >
        <span>{footer}</span>
        <span>Korean the way people actually talk</span>
      </div>
    </div>
  );
}
