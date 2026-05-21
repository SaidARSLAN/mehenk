import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "mehenk — AI test forge for Playwright";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: 80,
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: 300,
            width: 800,
            height: 400,
            borderRadius: "50%",
            background: "rgba(124,92,255,0.30)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -100,
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "rgba(6,182,212,0.20)",
            filter: "blur(120px)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -0.3,
          }}
        >
          <span style={{ display: "flex", color: "#a78bfa" }}>▲</span>
          mehenk
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            The touchstone for your tests.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a1a1aa",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            AI-powered Playwright tests from HTML or any MCP-aware agent —
            with Turkish-locale fixtures built in.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            display: "flex",
            gap: 12,
            alignItems: "center",
            fontSize: 18,
            color: "#71717a",
          }}
        >
          <span style={{ color: "#06b6d4" }}>MCP-native</span>
          <span>·</span>
          <span>5 tools</span>
          <span>·</span>
          <span>Open beta</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
