import { ImageResponse } from "next/og";

export const alt = "ReadRush — Read at the speed of focus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#f7f8fc",
          color: "#111827",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.055,
            backgroundImage:
              "linear-gradient(#111827 1px, transparent 1px), linear-gradient(90deg, #111827 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 690,
            height: 690,
            borderRadius: 999,
            background: "#2563eb",
            opacity: 0.08,
            filter: "blur(70px)",
            right: -140,
            top: -260,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <svg width="72" height="72" viewBox="0 0 48 48">
              <defs>
                <linearGradient id="og-mark" x1="5" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3978FF" />
                  <stop offset="1" stopColor="#154ED8" />
                </linearGradient>
              </defs>
              <rect width="48" height="48" rx="13" fill="url(#og-mark)" />
              <path d="M14.5 35V13h10.25c5.55 0 9.25 3.2 9.25 8 0 3.48-2.02 6.12-5.38 7.3L35 35h-7.08l-5.43-6.05h-1.93V35H14.5Zm6.06-11.14h3.7c2.3 0 3.68-1 3.68-2.76 0-1.8-1.38-2.82-3.68-2.82h-3.7v5.58Z" fill="white" />
              <circle cx="24.3" cy="26.4" r="2.6" fill="#FF6B4A" />
              <path d="M7.5 17.5h4M6 24h5.5M7.5 30.5h4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".72" />
            </svg>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: "-1.8px" }}>
              Read<span style={{ color: "#2563eb" }}>Rush</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
            <div style={{ display: "flex", fontSize: 76, lineHeight: 1.03, fontWeight: 800, letterSpacing: "-4px" }}>
              Read at the speed of focus.
            </div>
            <div style={{ display: "flex", marginTop: 28, color: "#5f6879", fontSize: 29, lineHeight: 1.35 }}>
              Any text. One word at a time. Your pace.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#5f6879", fontSize: 20 }}>
            <span style={{ width: 10, height: 10, borderRadius: 99, background: "#ff6b4a" }} />
            Focus-first RSVP reading
          </div>
        </div>
      </div>
    ),
    size,
  );
}
