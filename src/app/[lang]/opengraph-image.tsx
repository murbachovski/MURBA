import { ImageResponse } from "next/og";
import { OgFrame, ogFonts, ogSize } from "@/lib/og";

export const alt = "MURBA — Korean the way people actually talk";
export const size = ogSize;
export const contentType = "image/png";

// One English card for every language: the font only carries Latin and Hangul.
export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame footer="AI tutor · Phrase notes · Free">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.15 }}>
            <span>Learn the Korean</span>
            <span>people actually speak.</span>
          </div>
          <span style={{ fontSize: 230, color: "#b8432a", lineHeight: 1 }}>말</span>
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
