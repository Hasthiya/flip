"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FlipClock from "flip-clock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HomePage() {
  const newYear = new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0);
  const minWidth768 = useMediaQuery("(min-width: 768px)");
  const minWidth1024 = useMediaQuery("(min-width: 1024px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // After mount: use actual breakpoints for layout and clock props.
  const isLarge = minWidth1024;
  const isMedium = minWidth768 && !minWidth1024;
  const isSmall = !minWidth768;

  const orientation: "row" | "column" = isSmall ? "column" : "row";
  const segments = isMedium
    ? { days: false, hours: true, minutes: true, seconds: true }
    : undefined;

  const cardStyle = isLarge
    ? { width: "6rem", height: "8rem" }
    : isMedium
      ? { width: "6rem", height: "8rem" }
      : { width: "5rem", height: "7rem" };
  const digitStyle = isLarge
    ? { fontSize: "6.5rem" }
    : isMedium
      ? { fontSize: "6.5rem" }
      : { fontSize: "4rem" };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: !mounted ? "4rem" : isSmall ? "3rem 1rem" : "4rem 2rem",
        gap: "2.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
          fontWeight: 700,
          color: "var(--text)",
          textAlign: "center",
          margin: 0,
        }}
      >
        All around retro vibes
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
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
            cardStyle={cardStyle}
            digitStyle={digitStyle}
            separator={{ type: "none" }}
            segments={segments}
            orientation={orientation}
          />
        )}
      </div>
      <p
        style={{
          fontSize: "1.125rem",
          color: "var(--text-muted)",
          textAlign: "center",
          maxWidth: "42ch",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        A customizable flip clock countdown component for React.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href="/demo" className="cta-primary">
          View Demo
        </Link>
        <Link href="/docs" className="cta-outline">
          Read Docs
        </Link>
      </div>
    </main>
  );
}
