"use client";

import { useEffect, useState } from "react";
import FlipClock from "flip-clock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const nextNewYear = () =>
  new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);

const SEGMENTS_NO_DAYS = { days: false, hours: true, minutes: true, seconds: true };

type BreakpointOpts = {
  mounted: boolean;
  isLarge: boolean;
  isMedium: boolean;
  isSmall: boolean;
};

function placeholderNode() {
  return (
    <div
      aria-hidden
      style={{ minHeight: "8rem", width: "100%", maxWidth: "28rem" }}
    />
  );
}

function sizeFromBreakpoint(opts: BreakpointOpts) {
  if (opts.isLarge)
    return { cardStyle: { width: "5rem", height: "7rem" }, digitStyle: { fontSize: "4.5rem" } };
  if (opts.isMedium)
    return { cardStyle: { width: "4rem", height: "5.5rem" }, digitStyle: { fontSize: "3.5rem" } };
  return { cardStyle: { width: "3.25rem", height: "4.5rem" }, digitStyle: { fontSize: "2.75rem" } };
}

const examples: Array<{
  title: string;
  description: string;
  code: string;
  node: (opts: BreakpointOpts) => React.ReactNode;
}> = [
  {
    title: "Minimal",
    description: "Default countdown with no extra props.",
    code: `<FlipClock targetDate={new Date("2026-12-31T00:00:00")} />`,
    node: (opts) => {
      if (!opts.mounted) return placeholderNode();
      const { cardStyle, digitStyle } = sizeFromBreakpoint(opts);
      return (
        <FlipClock
          targetDate={nextNewYear()}
          cardStyle={cardStyle}
          digitStyle={digitStyle}
          segments={SEGMENTS_NO_DAYS}
          orientation={opts.isSmall ? "column" : "row"}
        />
      );
    },
  },
  {
    title: "Large display",
    description: "Bigger cards and digits for emphasis.",
    code: `<FlipClock
  targetDate={new Date("2026-12-31T00:00:00")}
  cardStyle={{ width: "9rem", height: "12rem" }}
  digitStyle={{ fontSize: "7rem" }}
/>`,
    node: (opts) => {
      if (!opts.mounted) return placeholderNode();
      const base = sizeFromBreakpoint(opts);
      const scale = opts.isLarge ? 1.15 : opts.isMedium ? 1 : 0.9;
      const cardStyle = {
        width: base.cardStyle.width,
        height: base.cardStyle.height,
      };
      const digitStyle = { fontSize: base.digitStyle.fontSize };
      return (
        <FlipClock
          targetDate={nextNewYear()}
          cardStyle={cardStyle}
          digitStyle={digitStyle}
          segments={SEGMENTS_NO_DAYS}
          orientation={opts.isSmall ? "column" : "row"}
          scale={scale}
        />
      );
    },
  },
  {
    title: "Custom styled",
    description: "Themed cards and digits (e.g. Catppuccin).",
    code: `<FlipClock
  targetDate={new Date("2026-12-31T00:00:00")}
  cardStyle={{
    background: "#1e1e2e",
    backgroundDark: "#181825",
    borderRadius: "0.75rem",
  }}
  digitStyle={{ color: "#cba6f7", fontSize: "4.5rem" }}
  labelStyle={{ color: "#a6adc8" }}
  separator={{ type: "colon", color: "#cba6f7" }}
/>`,
    node: (opts) => {
      if (!opts.mounted) return placeholderNode();
      const { cardStyle: sizeCard, digitStyle: sizeDigit } = sizeFromBreakpoint(opts);
      return (
        <FlipClock
          targetDate={nextNewYear()}
          cardStyle={{
            ...sizeCard,
            background: "#1e1e2e",
            backgroundDark: "#181825",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          digitStyle={{
            ...sizeDigit,
            color: "#cba6f7",
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          }}
          labelStyle={{
            color: "#a6adc8",
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            fontSize: "0.8rem",
          }}
          separator={{ type: "colon", color: "#cba6f7", size: "0.5rem" }}
          groupGap="2rem"
          segments={SEGMENTS_NO_DAYS}
          orientation={opts.isSmall ? "column" : "row"}
        />
      );
    },
  },
  {
    title: "Dashboard-style embed",
    description: "Compact clock, hours/minutes/seconds only.",
    code: `<FlipClock
  targetDate={new Date("2026-12-31T00:00:00")}
  segments={{ days: false, hours: true, minutes: true, seconds: true }}
  cardStyle={{ width: "4.5rem", height: "6rem" }}
  digitStyle={{ fontSize: "3rem" }}
  separator={{ type: "colon" }}
/>`,
    node: (opts) => {
      if (!opts.mounted) return placeholderNode();
      return (
        <div
          style={{
            padding: "1rem",
            background: "#fafafa",
            borderRadius: "0.75rem",
            border: "1px solid #eee",
            display: "inline-block",
          }}
        >
          <FlipClock
            targetDate={nextNewYear()}
            segments={SEGMENTS_NO_DAYS}
            cardStyle={{ width: "4.5rem", height: "6rem" }}
            digitStyle={{ fontSize: "3rem" }}
            separator={{ type: "colon" }}
            orientation={opts.isSmall ? "column" : "row"}
          />
        </div>
      );
    },
  },
];

export default function ExamplesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const minWidth768 = useMediaQuery("(min-width: 768px)");
  const minWidth1024 = useMediaQuery("(min-width: 1024px)");
  const isNarrow = !minWidth768;
  const breakpointOpts: BreakpointOpts = {
    mounted,
    isLarge: minWidth1024,
    isMedium: minWidth768 && !minWidth1024,
    isSmall: !minWidth768,
  };

  return (
    <main
      style={{
        padding: !mounted ? "1.5rem" : isNarrow ? "1rem" : "2rem",
        maxWidth: "900px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <header style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2rem)",
            fontWeight: 400,
            letterSpacing: "0.02em",
            color: "#1a1a1a",
            marginBottom: "0.5rem",
          }}
        >
          Examples
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "42ch",
          }}
        >
          Copy and adapt these snippets for your project.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {examples.map((ex, index) => (
          <section
            key={ex.title}
            style={{
              background: "#fff",
              borderRadius: "0.75rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              border: "1px solid #eee",
              padding: isNarrow ? "1.25rem" : "1.5rem",
              overflow: "hidden",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#999",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Example {index + 1}
              </span>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  marginTop: "0.25rem",
                  marginBottom: "0.5rem",
                }}
              >
                {ex.title}
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.9375rem",
                  lineHeight: 1.5,
                }}
              >
                {ex.description}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
                minHeight: "10rem",
                overflow: "visible",
              }}
            >
              {ex.node(breakpointOpts)}
            </div>
            <pre
              style={{
                background: "#1a1a1a",
                color: "#e5e5e5",
                padding: "1rem",
                borderRadius: "0.5rem",
                overflow: "auto",
                maxWidth: "100%",
                fontSize: "clamp(0.75rem, 2vw, 0.8125rem)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              <code>{ex.code}</code>
            </pre>
          </section>
        ))}
      </div>
    </main>
  );
}
