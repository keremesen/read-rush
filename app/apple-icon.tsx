import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          background: "linear-gradient(145deg, #3978ff, #154ed8)",
          color: "white",
          fontFamily: "Arial, sans-serif",
          fontSize: 116,
          fontWeight: 800,
          letterSpacing: "-10px",
        }}
      >
        <span style={{ transform: "translateX(-4px)" }}>R</span>
        <span style={{ position: "absolute", width: 17, height: 17, borderRadius: 99, background: "#ff6b4a", left: 91, top: 99 }} />
      </div>
    ),
    size,
  );
}
