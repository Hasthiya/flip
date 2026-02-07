"use client";

import FlipClock from "flip-clock";

export default function ShowcasePage() {
  const newYear = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4rem",
      }}
    >
      <header style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: "0.5rem",
          }}
        >
          FlipClock Showcase
        </h1>
        <p style={{ color: "#666" }}>
          A customizable flip clock countdown React component
        </p>
      </header>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#333",
          }}
        >
          Default (countdown to New Year)
        </h2>
        <FlipClock targetDate={newYear} />
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#333",
          }}
        >
          Custom style (Catppuccin)
        </h2>
        <FlipClock
          targetDate={newYear}
          cardStyle={{
            background: "#1e1e2e",
            backgroundDark: "#181825",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          digitStyle={{
            color: "#cba6f7",
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "4.5rem",
          }}
          labelStyle={{
            color: "#a6adc8",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: "0.8rem",
          }}
          animation={{ bounceIntensity: 12, flipDuration: 350 }}
          separator={{ type: "colon", color: "#cba6f7", size: "0.5rem" }}
          groupGap="2rem"
        />
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#333",
          }}
        >
          Seconds only (static demo)
        </h2>
        <FlipClock
          staticTime={{ days: 0, hours: 0, minutes: 0, seconds: 42 }}
          segments={{ days: false, hours: false, minutes: false, seconds: true }}
          cardStyle={{ width: "5rem", height: "7rem" }}
          digitStyle={{ fontSize: "4rem" }}
        />
      </section>
    </main>
  );
}
