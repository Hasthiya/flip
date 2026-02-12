"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FlipClock from "@hasthiya_/flip-clock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HomePage() {
  const newYear = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);
  const minWidth768 = useMediaQuery("(min-width: 768px)");
  const minWidth1024 = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLarge = minWidth1024;
  const isMedium = minWidth768 && !minWidth1024;
  const isSmall = !minWidth768;

  const orientation: "row" | "column" = isSmall ? "column" : "row";
  const segments = isMedium
    ? { days: false, hours: true, minutes: true, seconds: true }
    : undefined;

  // Base sizes
  const cardStyle = isLarge
    ? { width: "6rem", height: "8rem" }
    : isMedium
      ? { width: "6rem", height: "8rem" }
      : { width: "5rem", height: "7rem" };
  const digitFontSize = isLarge ? "6.5rem" : isMedium ? "6.5rem" : "4rem";

  // Black and white clock styling
  const clockCardStyle = {
    ...cardStyle,
    background: "#1a1a1a",
    backgroundDark: "#0f0f0f",
    borderRadius: "0.5rem",
  };
  const clockDigitStyle = {
    fontSize: digitFontSize,
    color: "#ffffff",
  };
  const clockLabelStyle = {
    color: "#888888",
    fontSize: "0.75rem",
    fontWeight: "500",
    letterSpacing: "0.1em",
  };

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isSmall ? "3rem 1rem" : "5rem 2rem",
          gap: "2rem",
          textAlign: "center",
          background: "var(--bg)",
        }}
      >
        <div className="animate-fade-in">
          <h1
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              color: "var(--text)",
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            Flip Clock for React
          </h1>
          <p
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1rem)",
              color: "var(--text-muted)",
              maxWidth: "420px",
              lineHeight: 1.6,
              margin: "0.75rem auto 0",
              fontWeight: 400,
            }}
          >
            A{" "}
            <span style={{ fontFamily: "var(--font-space-mono), monospace", fontWeight: 600, color: "var(--text)" }}>
              customizable
            </span>{" "}
            flip clock{" "}
            <span style={{ fontFamily: "var(--font-space-mono), monospace", fontWeight: 600, color: "var(--text)" }}>
              countdown
            </span>{" "}
            component for React.
          </p>
        </div>

        {/* FlipClock Demo with B&W styling */}
        <div
          className="animate-fade-in-delay-1"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            width: "100%",
            marginTop: "0.5rem",
          }}
        >
          {!mounted ? (
            <div
              aria-hidden
              style={{ minHeight: "10rem", width: "100%", maxWidth: "32rem" }}
            />
          ) : (
            <FlipClock
              targetDate={newYear}
              cardStyle={clockCardStyle}
              digitStyle={clockDigitStyle}
              labelStyle={clockLabelStyle}
              separator={{ type: "none" }}
              segments={segments}
              orientation={orientation}
            />
          )}
        </div>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-delay-2"
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <Link href="/demo" className="cta-primary">
            Try Demo
          </Link>
          <Link href="/docs" className="cta-outline">
            Documentation
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: isSmall ? "4rem 1rem" : "5rem 2rem",
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="section-container" style={{ maxWidth: "640px" }}>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: isSmall ? "1fr" : "repeat(2, 1fr)",
              gap: isSmall ? "1.5rem" : "2rem 3rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {[
              { title: "Customizable", desc: "Colors, sizes, segments, and animation via props." },
              { title: "Zero dependencies", desc: "No external CSS or runtime deps beyond React." },
              { title: "Performant", desc: "Lightweight, minimal re-renders, smooth animations." },
              { title: "Accessible", desc: "Semantic markup and ARIA support." },
            ].map((item) => (
              <li key={item.title} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Start Section */}
      <section
        style={{
          padding: isSmall ? "4rem 1rem" : "5rem 2rem",
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="section-container" style={{ maxWidth: "640px" }}>
          <h2
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              marginBottom: "1rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Quick Start
          </h2>
          <div
            style={{
              background: "var(--code-bg)",
              borderRadius: "0.5rem",
              padding: isSmall ? "1.25rem" : "1.5rem",
              overflow: "auto",
            }}
          >
            <pre
              style={{
                margin: 0,
                fontSize: isSmall ? "0.8125rem" : "0.875rem",
                lineHeight: 1.8,
                color: "var(--code-text)",
              }}
            >
              <code>
                <span style={{ color: "#888" }}>{"# Install\n"}</span>
                <span style={{ color: "#fff" }}>npm install</span>
                {" @hasthiya_/flip-clock\n\n"}
                <span style={{ color: "#888" }}>{"# Usage\n"}</span>
                <span style={{ color: "#fff" }}>import</span>
                {" FlipClock "}
                <span style={{ color: "#fff" }}>from</span>
                {' "@hasthiya_/flip-clock";\n\n'}
                <span style={{ color: "#fff" }}>{"<"}</span>
                <span style={{ color: "#ccc" }}>FlipClock</span>{" "}
                <span style={{ color: "#999" }}>targetDate</span>
                {"={new Date("}
                <span style={{ color: "#aaa" }}>{'"2026-12-31"'}</span>
                {")} />"}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </>
  );
}
