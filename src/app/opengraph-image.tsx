import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Jaseem C — Software Engineer, Backend & AI Applications";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/images/profile.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0c10",
          backgroundImage:
            "linear-gradient(to right, rgba(139,148,158,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,148,158,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          padding: 64,
          fontFamily: "monospace",
          color: "#e6edf3",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#8b949e" }}>
            <span style={{ color: "#3fb950" }}>$</span>
            <span style={{ marginLeft: 14 }}>whoami</span>
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 18, letterSpacing: -2 }}>
            Jaseem C<span style={{ color: "#58a6ff" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 36, marginTop: 10 }}>Software Engineer</div>
          <div style={{ display: "flex", fontSize: 26, color: "#8b949e", marginTop: 12 }}>
            <span style={{ color: "#3fb950" }}>{"// "}</span>
            <span style={{ marginLeft: 8 }}>Backend Engineering | AI Applications</span>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
            {["Go", "Python", "JavaScript", "RAG"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  border: "2px solid #30363d",
                  background: "#161b22",
                  borderRadius: 10,
                  padding: "8px 18px",
                  fontSize: 22,
                  color: "#c9d1d9",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 360,
            height: 450,
            alignSelf: "center",
            borderRadius: 24,
            border: "3px solid #30363d",
            overflow: "hidden",
          }}
        >
          <img src={photoSrc} width={360} height={450} style={{ objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
