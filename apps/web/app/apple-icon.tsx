import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={120}
          height={120}
          fill="none"
          stroke="#a78bfa"
          strokeWidth={1.5}
        >
          <path d="M3 18 L12 4 L21 18 Z" strokeLinejoin="round" />
          <path d="M8 14 L16 14" strokeLinecap="round" stroke="#fafafa" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
