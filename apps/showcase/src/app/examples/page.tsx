"use client";

import { useEffect, useState } from "react";
import FlipClock from "@hasthiya_/flip-clock";
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
    return { cardStyle: { width: "4.5rem", height: "6rem" }, digitStyle: { fontSize: "4rem" } };
  if (opts.isMedium)
    return { cardStyle: { width: "3.5rem", height: "5rem" }, digitStyle: { fontSize: "3rem" } };
  return { cardStyle: { width: "3rem", height: "4rem" }, digitStyle: { fontSize: "2.5rem" } };
}

const examples: Array<{
  title: string;
  description: string;
  code: string;
  node: (opts: BreakpointOpts) => React.ReactNode;
}> = [
    {
      title: "Minimal Classic",
      description: "Clean black and white default appearance.",
      code: `<FlipClock 
  targetDate={new Date("2026-12-31")} 
/>`,
      node: (opts) => {
        if (!opts.mounted) return placeholderNode();
        const { cardStyle, digitStyle } = sizeFromBreakpoint(opts);
        return (
          <FlipClock
            targetDate={nextNewYear()}
            cardStyle={{ ...cardStyle, background: "#1a1a1a", backgroundDark: "#0f0f0f", borderRadius: "0.5rem" }}
            digitStyle={{ ...digitStyle, color: "#ffffff" }}
            labelStyle={{ color: "#888", fontSize: "0.7rem", fontWeight: "500" }}
            segments={SEGMENTS_NO_DAYS}
            orientation={opts.isSmall ? "column" : "row"}
          />
        );
      },
    },
    {
      title: "With Colon Separator",
      description: "Classic time display with colon separators.",
      code: `<FlipClock 
  targetDate={new Date("2026-12-31")} 
  separator={{ type: "colon", color: "#1a1a1a" }}
/>`,
      node: (opts) => {
        if (!opts.mounted) return placeholderNode();
        const { cardStyle, digitStyle } = sizeFromBreakpoint(opts);
        return (
          <FlipClock
            targetDate={nextNewYear()}
            cardStyle={{ ...cardStyle, background: "#1a1a1a", backgroundDark: "#0f0f0f", borderRadius: "0.5rem" }}
            digitStyle={{ ...digitStyle, color: "#ffffff" }}
            labelStyle={{ color: "#888", fontSize: "0.7rem", fontWeight: "500" }}
            separator={{ type: "colon", color: "#1a1a1a", size: "0.4rem" }}
            segments={SEGMENTS_NO_DAYS}
            orientation={opts.isSmall ? "column" : "row"}
            scale={0.85}
          />
        );
      },
    },
    {
      title: "Inverted Theme",
      description: "Light cards with dark digits for contrast.",
      code: `<FlipClock 
  targetDate={new Date("2026-12-31")} 
  cardStyle={{ background: "#f5f5f5", backgroundDark: "#e5e5e5" }}
  digitStyle={{ color: "#1a1a1a" }}
/>`,
      node: (opts) => {
        if (!opts.mounted) return placeholderNode();
        const { cardStyle, digitStyle } = sizeFromBreakpoint(opts);
        return (
          <FlipClock
            targetDate={nextNewYear()}
            cardStyle={{ ...cardStyle, background: "#f5f5f5", backgroundDark: "#e5e5e5", borderRadius: "0.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            digitStyle={{ ...digitStyle, color: "#1a1a1a" }}
            labelStyle={{ color: "#666", fontSize: "0.7rem", fontWeight: "500" }}
            lineStyle={{ color: "#d4d4d4" }}
            segments={SEGMENTS_NO_DAYS}
            orientation={opts.isSmall ? "column" : "row"}
          />
        );
      },
    },
    {
      title: "Purple Accent",
      description: "Dark theme with purple accent color.",
      code: `<FlipClock 
  targetDate={new Date("2026-12-31")} 
  cardStyle={{ background: "#1e1e2e", backgroundDark: "#181825" }}
  digitStyle={{ color: "#cba6f7" }}
  separator={{ type: "colon", color: "#cba6f7" }}
/>`,
      node: (opts) => {
        if (!opts.mounted) return placeholderNode();
        const { cardStyle, digitStyle } = sizeFromBreakpoint(opts);
        return (
          <FlipClock
            targetDate={nextNewYear()}
            cardStyle={{ ...cardStyle, background: "#1e1e2e", backgroundDark: "#181825", borderRadius: "0.5rem" }}
            digitStyle={{ ...digitStyle, color: "#cba6f7" }}
            labelStyle={{ color: "#a6adc8", fontSize: "0.7rem", fontWeight: "500" }}
            separator={{ type: "colon", color: "#cba6f7", size: "0.4rem" }}
            segments={SEGMENTS_NO_DAYS}
            orientation={opts.isSmall ? "column" : "row"}
            scale={0.85}
          />
        );
      },
    },
    {
      title: "Warm Amber",
      description: "Retro warm palette with amber digits.",
      code: `<FlipClock 
  targetDate={new Date("2026-12-31")} 
  cardStyle={{ background: "#292524", backgroundDark: "#1c1917" }}
  digitStyle={{ color: "#f59e0b" }}
  separator={{ type: "dot", color: "#f59e0b" }}
/>`,
      node: (opts) => {
        if (!opts.mounted) return placeholderNode();
        const { cardStyle, digitStyle } = sizeFromBreakpoint(opts);
        return (
          <FlipClock
            targetDate={nextNewYear()}
            cardStyle={{ ...cardStyle, background: "#292524", backgroundDark: "#1c1917", borderRadius: "0.5rem" }}
            digitStyle={{ ...digitStyle, color: "#f59e0b" }}
            labelStyle={{ color: "#a8a29e", fontSize: "0.7rem", fontWeight: "500" }}
            separator={{ type: "dot", color: "#f59e0b", size: "0.35rem" }}
            segments={SEGMENTS_NO_DAYS}
            orientation={opts.isSmall ? "column" : "row"}
            scale={0.85}
          />
        );
      },
    },
    {
      title: "Emerald Green",
      description: "Modern dark theme with emerald accents.",
      code: `<FlipClock 
  targetDate={new Date("2026-12-31")} 
  cardStyle={{ background: "#064e3b", backgroundDark: "#022c22" }}
  digitStyle={{ color: "#34d399" }}
  separator={{ type: "colon", color: "#34d399" }}
/>`,
      node: (opts) => {
        if (!opts.mounted) return placeholderNode();
        const { cardStyle, digitStyle } = sizeFromBreakpoint(opts);
        return (
          <FlipClock
            targetDate={nextNewYear()}
            cardStyle={{ ...cardStyle, background: "#064e3b", backgroundDark: "#022c22", borderRadius: "0.5rem" }}
            digitStyle={{ ...digitStyle, color: "#34d399" }}
            labelStyle={{ color: "#6ee7b7", fontSize: "0.7rem", fontWeight: "500" }}
            separator={{ type: "colon", color: "#34d399", size: "0.4rem" }}
            segments={SEGMENTS_NO_DAYS}
            orientation={opts.isSmall ? "column" : "row"}
            scale={0.85}
          />
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
        padding: isNarrow ? "1.5rem 1rem" : "2rem 1.5rem",
        maxWidth: "900px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "0.5rem",
          }}
        >
          Examples
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          Copy and customize these snippets for your project.
        </p>
      </header>

      {/* Examples Grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {examples.map((ex, index) => (
          <section
            key={ex.title}
            style={{
              background: "var(--bg)",
              borderRadius: "0.75rem",
              border: "1px solid var(--border)",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Example header */}
            <div style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Example {index + 1}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginTop: "0.25rem",
                }}
              >
                {ex.title}
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.875rem",
                  lineHeight: 1.4,
                  marginTop: "0.25rem",
                }}
              >
                {ex.description}
              </p>
            </div>

            {/* Clock preview */}
            <div
              style={{
                background: "#fafafa",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "8rem",
                marginBottom: "1rem",
              }}
            >
              {ex.node(breakpointOpts)}
            </div>

            {/* Code snippet */}
            <pre
              style={{
                background: "var(--code-bg)",
                color: "var(--code-text)",
                padding: "1rem",
                borderRadius: "0.5rem",
                overflow: "auto",
                fontSize: "0.75rem",
                lineHeight: 1.5,
                margin: 0,
                flex: 1,
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
