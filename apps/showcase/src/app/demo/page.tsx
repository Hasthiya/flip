"use client";

import { useEffect, useMemo, useState } from "react";
import FlipClock from "@hasthiya_/flip-clock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type TargetPreset = "newYear" | "thirtyDays" | "custom";

function getTargetDate(preset: TargetPreset, customDate: string): Date {
  const now = new Date();
  if (preset === "newYear") {
    return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
  }
  if (preset === "thirtyDays") {
    const d = new Date(now);
    d.setDate(d.getDate() + 30);
    return d;
  }
  if (preset === "custom" && customDate) {
    const d = new Date(customDate);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
}

function buildSnippet(props: {
  targetDate: Date;
  digitColor: string;
  cardColor: string;
  segments: { days: boolean; hours: boolean; minutes: boolean; seconds: boolean };
  separator: "none" | "colon" | "dot";
  showLabels: boolean;
}): string {
  const lines: string[] = [];
  const iso = props.targetDate.toISOString().slice(0, 19);
  lines.push(`<FlipClock`);
  lines.push(`  targetDate={new Date("${iso}")}`);
  if (props.cardColor !== "#1a1a1a") {
    lines.push(`  cardStyle={{ background: "${props.cardColor}", backgroundDark: "${props.cardColor}" }}`);
  }
  if (props.digitColor !== "#ffffff") {
    lines.push(`  digitStyle={{ color: "${props.digitColor}" }}`);
  }
  const seg = props.segments;
  if (!seg.days || !seg.hours || !seg.minutes || !seg.seconds) {
    lines.push(`  segments={{ days: ${seg.days}, hours: ${seg.hours}, minutes: ${seg.minutes}, seconds: ${seg.seconds} }}`);
  }
  if (props.separator !== "none") {
    lines.push(`  separator={{ type: "${props.separator}" }}`);
  }
  if (!props.showLabels) {
    lines.push(`  labelStyle={{ visible: false }}`);
  }
  lines.push(`/>`);
  return lines.join("\n");
}

const labelStyle = {
  fontFamily: "var(--font-space-mono), monospace",
  fontSize: "0.75rem",
  fontWeight: 600,
  whiteSpace: "nowrap" as const,
  color: "var(--text)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const inputStyle = {
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  border: "1px solid var(--border)",
  borderRadius: "0.5rem",
  background: "var(--bg)",
  color: "var(--text)",
  fontFamily: "var(--font-space-mono), monospace",
};

export default function DemoPage() {
  const [targetPreset, setTargetPreset] = useState<TargetPreset>("newYear");
  const [customDate, setCustomDate] = useState("");
  const [digitColor, setDigitColor] = useState("#ffffff");
  const [cardColor, setCardColor] = useState("#1a1a1a");
  const [segments, setSegments] = useState({
    days: true,
    hours: true,
    minutes: true,
    seconds: true,
  });
  const [separator, setSeparator] = useState<"none" | "colon" | "dot">("none");
  const [showLabels, setShowLabels] = useState(true);

  const targetDate = useMemo(
    () => getTargetDate(targetPreset, customDate),
    [targetPreset, customDate]
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const minWidth768 = useMediaQuery("(min-width: 768px)");
  const minWidth1024 = useMediaQuery("(min-width: 1024px)");
  const isNarrow = !minWidth768;
  const isLarge = minWidth1024;
  const isMedium = minWidth768 && !minWidth1024;
  const isSmall = !minWidth768;

  const orientation: "row" | "column" = isSmall ? "column" : "row";
  const cardStyleBreakpoint =
    isLarge || isMedium
      ? { width: "6rem" as const, height: "8rem" as const }
      : { width: "5rem" as const, height: "7rem" as const };
  const digitStyleBreakpoint =
    isLarge || isMedium ? { fontSize: "6.5rem" as const } : { fontSize: "4rem" as const };

  const snippet = useMemo(
    () =>
      buildSnippet({
        targetDate,
        digitColor,
        cardColor,
        segments,
        separator,
        showLabels,
      }),
    [targetDate, digitColor, cardColor, segments, separator, showLabels]
  );

  return (
    <main style={{ width: "100%" }}>
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: isSmall ? "2rem 1rem 1rem" : "3rem 2rem 1.5rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 700,
            color: "var(--text)",
            margin: 0,
          }}
        >
          Interactive Demo
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.9375rem",
            marginTop: "0.5rem",
          }}
        >
          Customize the clock and see changes in real-time.
        </p>
      </div>

      {/* Clock display section */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "280px",
          padding: "1.5rem 1rem",
        }}
      >
        {!mounted ? (
          <div
            aria-hidden
            style={{ minHeight: "10rem", width: "100%", maxWidth: "32rem" }}
          />
        ) : (
          <FlipClock
            targetDate={targetDate}
            cardStyle={{
              ...cardStyleBreakpoint,
              background: cardColor,
              backgroundDark: cardColor,
              borderRadius: "0.5rem",
            }}
            digitStyle={{ ...digitStyleBreakpoint, color: digitColor }}
            labelStyle={{ visible: showLabels, color: "#888888", fontSize: "0.75rem", fontWeight: "500", letterSpacing: "0.1em" }}
            segments={isNarrow ? { ...segments, days: false } : segments}
            separator={separator === "none" ? { type: "none" } : { type: separator }}
            orientation={orientation}
            scale={separator === "none" ? 1 : 0.82}
          />
        )}
      </div>

      {/* Controls section */}
      <section
        style={{
          width: "100%",
          padding: isSmall ? "1.5rem 1rem" : "2rem 1.5rem",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
            gap: "1.5rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {/* Target */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Target</label>
            <select
              value={targetPreset}
              onChange={(e) => setTargetPreset(e.target.value as TargetPreset)}
              style={inputStyle}
            >
              <option value="newYear">New Year</option>
              <option value="thirtyDays">30 days</option>
              <option value="custom">Custom</option>
            </select>
            {targetPreset === "custom" && (
              <input
                type="datetime-local"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                style={inputStyle}
              />
            )}
          </div>

          {/* Digit Color */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Digit Color</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="color"
                value={digitColor}
                onChange={(e) => setDigitColor(e.target.value)}
                style={{
                  width: "40px",
                  height: "40px",
                  padding: 0,
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                {digitColor}
              </span>
            </div>
          </div>

          {/* Card Color */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Card Color</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="color"
                value={cardColor}
                onChange={(e) => setCardColor(e.target.value)}
                style={{
                  width: "40px",
                  height: "40px",
                  padding: 0,
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                {cardColor}
              </span>
            </div>
          </div>

          {/* Segments */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Segments</label>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {(["days", "hours", "minutes", "seconds"] as const).map((seg) => (
                <label
                  key={seg}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={segments[seg]}
                    onChange={(e) => setSegments((s) => ({ ...s, [seg]: e.target.checked }))}
                    style={{ accentColor: "var(--text)" }}
                  />
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8125rem", textTransform: "capitalize" }}>
                    {seg}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Separator</label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as "none" | "colon" | "dot")}
              style={inputStyle}
            >
              <option value="none">None</option>
              <option value="colon">Colon</option>
              <option value="dot">Dot</option>
            </select>
          </div>

          {/* Labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Labels</label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                padding: "0.5rem 0",
              }}
            >
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                style={{ accentColor: "var(--text)" }}
              />
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8125rem" }}>
                Show Labels
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* Code output section */}
      <section
        style={{
          padding: isSmall ? "2rem 1rem" : "3rem 1.5rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: "1rem",
            color: "var(--text)",
          }}
        >
          Generated Code
        </h2>
        <pre
          style={{
            background: "var(--code-bg)",
            color: "var(--code-text)",
            padding: "1.25rem",
            borderRadius: "0.75rem",
            overflow: "auto",
            fontSize: "0.875rem",
            lineHeight: 1.6,
          }}
        >
          <code>{snippet}</code>
        </pre>
      </section>
    </main>
  );
}
