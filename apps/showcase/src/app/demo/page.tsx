"use client";

import { useEffect, useMemo, useState } from "react";
import FlipClock from "flip-clock";
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
  if (props.cardColor !== "#575757") {
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

export default function DemoPage() {
  const [targetPreset, setTargetPreset] = useState<TargetPreset>("newYear");
  const [customDate, setCustomDate] = useState("");
  const [digitColor, setDigitColor] = useState("#ffffff");
  const [cardColor, setCardColor] = useState("#575757");
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
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: !mounted ? "1.5rem" : isNarrow ? "1rem" : "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Demo
        </h1>
        <p style={{ color: "#666", marginBottom: "1.5rem", fontSize: "0.9375rem" }}>
          FlipClock is a countdown component (days, hours, minutes, seconds). Tweak
          the controls and copy the code below.
        </p>
      </div>

      {/* Full-width clock section */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "320px",
          padding: "1rem",
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
            }}
            digitStyle={{ ...digitStyleBreakpoint, color: digitColor }}
            segments={isNarrow ? { ...segments, days: false } : segments}
            separator={separator === "none" ? { type: "none" } : { type: separator }}
            labelStyle={{ visible: showLabels }}
            orientation={orientation}
            scale={separator === "none" ? 1 : 0.82}
          />
        )}
      </div>

      {/* Horizontal control bar */}
      <section
        style={{
          width: "100%",
          padding: "1rem 1.5rem",
          background: "#fafafa",
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              Target
            </label>
            <select
              value={targetPreset}
              onChange={(e) => setTargetPreset(e.target.value as TargetPreset)}
              style={{ padding: "0.4rem 0.5rem", fontSize: "0.875rem" }}
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
                style={{ padding: "0.4rem", fontSize: "0.875rem" }}
              />
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              Digit
            </label>
            <input
              type="color"
              value={digitColor}
              onChange={(e) => setDigitColor(e.target.value)}
              style={{ width: "32px", height: "32px", padding: 0, border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <span style={{ fontSize: "0.8125rem" }}>{digitColor}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              Card
            </label>
            <input
              type="color"
              value={cardColor}
              onChange={(e) => setCardColor(e.target.value)}
              style={{ width: "32px", height: "32px", padding: 0, border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <span style={{ fontSize: "0.8125rem" }}>{cardColor}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              Segments
            </span>
            {(["days", "hours", "minutes", "seconds"] as const).map((seg) => (
              <label key={seg} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <input
                  type="checkbox"
                  checked={segments[seg]}
                  onChange={(e) => setSegments((s) => ({ ...s, [seg]: e.target.checked }))}
                />
                <span style={{ fontSize: "0.8125rem", textTransform: "capitalize" }}>{seg}</span>
              </label>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              Separator
            </label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as "none" | "colon" | "dot")}
              style={{ padding: "0.4rem 0.5rem", fontSize: "0.875rem" }}
            >
              <option value="none">None</option>
              <option value="colon">Colon</option>
              <option value="dot">Dot</option>
            </select>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
            />
            <span style={{ fontSize: "0.875rem" }}>Labels</span>
          </label>
        </div>
      </section>

      <section
        style={{
          margin: "2rem auto 0",
          maxWidth: "1200px",
          padding: "0 1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Code
        </h2>
        <pre
          style={{
            background: "#1a1a1a",
            color: "#e5e5e5",
            padding: "1rem",
            borderRadius: "0.5rem",
            overflow: "auto",
            fontSize: "0.8125rem",
            lineHeight: 1.5,
          }}
        >
          <code>{snippet}</code>
        </pre>
      </section>
    </main>
  );
}
