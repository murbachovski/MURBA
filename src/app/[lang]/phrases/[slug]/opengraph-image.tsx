import { ImageResponse } from "next/og";
import { getPhraseNote } from "@/content/phrases";
import { OgFrame, ogFonts, ogSize } from "@/lib/og";

export const alt = "MURBA phrase note";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getPhraseNote(slug);

  return new ImageResponse(
    (
      <OgFrame footer="Phrase note">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 130, lineHeight: 1.1 }}>{note?.ko ?? "말"}</span>
          <span style={{ fontSize: 34, color: "#5a534a", marginTop: 12 }}>{note?.roman ?? ""}</span>
          <span
            style={{
              fontSize: 40,
              marginTop: 28,
              paddingLeft: 24,
              borderLeft: "6px solid #b8432a",
            }}
          >
            {note?.gist ?? ""}
          </span>
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
