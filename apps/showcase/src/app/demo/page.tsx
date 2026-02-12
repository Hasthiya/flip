"use client";

import { useEffect, useMemo, useState } from "react";
import FlipClock from "@hasthiya_/flip-clock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type TargetPreset = "newYear" | "thirtyDays" | "custom";
type DigitFont =
  | "spaceMono"
  | "inter"
  | "bebasNeue"
  | "roboto"
  | "openSans"
  | "lato"
  | "montserrat"
  | "raleway"
  | "poppins"
  | "sourceSansPro"
  | "nunito"
  | "playfairDisplay"
  | "merriweather"
  | "ptSans"
  | "ubuntu"
  | "notoSans"
  | "workSans"
  | "dmSans"
  | "manrope"
  | "plusJakartaSans"
  | "outfit"
  | "sora";
type CardShadowPreset = "none" | "soft" | "medium" | "strong";

const DIGIT_FONT_MAP: Record<DigitFont, string> = {
  spaceMono: "var(--font-space-mono), monospace",
  inter: "var(--font-inter), sans-serif",
  bebasNeue: "var(--font-bebas), sans-serif",
  roboto: "var(--font-roboto), sans-serif",
  openSans: "var(--font-open-sans), sans-serif",
  lato: "var(--font-lato), sans-serif",
  montserrat: "var(--font-montserrat), sans-serif",
  raleway: "var(--font-raleway), sans-serif",
  poppins: "var(--font-poppins), sans-serif",
  sourceSansPro: "var(--font-source-sans-pro), sans-serif",
  nunito: "var(--font-nunito), sans-serif",
  playfairDisplay: "var(--font-playfair-display), serif",
  merriweather: "var(--font-merriweather), serif",
  ptSans: "var(--font-pt-sans), sans-serif",
  ubuntu: "var(--font-ubuntu), sans-serif",
  notoSans: "var(--font-noto-sans), sans-serif",
  workSans: "var(--font-work-sans), sans-serif",
  dmSans: "var(--font-dm-sans), sans-serif",
  manrope: "var(--font-manrope), sans-serif",
  plusJakartaSans: "var(--font-plus-jakarta-sans), sans-serif",
  outfit: "var(--font-outfit), sans-serif",
  sora: "var(--font-sora), sans-serif",
};

const DIGIT_FONT_DISPLAY_NAMES: Record<DigitFont, string> = {
  spaceMono: "Space Mono",
  inter: "Inter",
  bebasNeue: "Bebas Neue",
  roboto: "Roboto",
  openSans: "Open Sans",
  lato: "Lato",
  montserrat: "Montserrat",
  raleway: "Raleway",
  poppins: "Poppins",
  sourceSansPro: "Source Sans Pro",
  nunito: "Nunito",
  playfairDisplay: "Playfair Display",
  merriweather: "Merriweather",
  ptSans: "PT Sans",
  ubuntu: "Ubuntu",
  notoSans: "Noto Sans",
  workSans: "Work Sans",
  dmSans: "DM Sans",
  manrope: "Manrope",
  plusJakartaSans: "Plus Jakarta Sans",
  outfit: "Outfit",
  sora: "Sora",
};

const CARD_SHADOW_MAP: Record<CardShadowPreset, string> = {
  none: "none",
  soft: "0 4px 12px rgba(0, 0, 0, 0.15)",
  medium: "0 8px 24px rgba(0, 0, 0, 0.3)",
  strong: "0 16px 48px rgba(0, 0, 0, 0.5)",
};

const DEFAULT_DIGIT_FONT: DigitFont = "bebasNeue";
const DEFAULT_CARD_SHADOW: CardShadowPreset = "medium";

function randomHex(): string {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}

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

const DEFAULT_CARD_BG = "#1a1a1a";
const DEFAULT_CARD_BG_DARK = "#0f0f0f";
const DEFAULT_BOUNCE = 8;
const DEFAULT_FLIP_DURATION = 300;
const DEFAULT_SCALE = 1;
const DEFAULT_BORDER_RADIUS = "0.5rem";
const DEFAULT_GROUP_GAP = "3rem";
const DEFAULT_CARD_GAP = "0.375rem";

function buildSnippet(props: {
  targetDate: Date;
  digitColor: string;
  digitFont: DigitFont;
  cardBackground: string;
  cardBackgroundDark: string;
  cardShadow: CardShadowPreset;
  segments: { days: boolean; hours: boolean; minutes: boolean; seconds: boolean };
  separator: "none" | "colon" | "dot";
  showLabels: boolean;
  bounceIntensity: number;
  scale: number;
  borderRadius: string;
  groupGap: string;
  cardGap: string;
}): string {
  const lines: string[] = [];
  const iso = props.targetDate.toISOString().slice(0, 19);
  lines.push(`<FlipClock`);
  lines.push(`  targetDate={new Date("${iso}")}`);
  const cardStyleProps: string[] = [];
  if (props.cardBackground !== DEFAULT_CARD_BG) {
    cardStyleProps.push(`background: "${props.cardBackground}"`);
  }
  if (props.cardBackgroundDark !== DEFAULT_CARD_BG_DARK) {
    cardStyleProps.push(`backgroundDark: "${props.cardBackgroundDark}"`);
  }
  if (props.borderRadius !== DEFAULT_BORDER_RADIUS) {
    cardStyleProps.push(`borderRadius: "${props.borderRadius}"`);
  }
  if (props.cardShadow !== DEFAULT_CARD_SHADOW) {
    const shadowValue = CARD_SHADOW_MAP[props.cardShadow];
    cardStyleProps.push(`boxShadow: "${shadowValue}"`);
  }
  if (cardStyleProps.length > 0) {
    lines.push(`  cardStyle={{ ${cardStyleProps.join(", ")} }}`);
  }
  const digitStyleProps: string[] = [];
  if (props.digitColor !== "#ffffff") {
    digitStyleProps.push(`color: "${props.digitColor}"`);
  }
  if (props.digitFont !== DEFAULT_DIGIT_FONT) {
    const fontFamily = DIGIT_FONT_MAP[props.digitFont];
    digitStyleProps.push(`fontFamily: "${fontFamily}"`);
  }
  if (digitStyleProps.length > 0) {
    lines.push(`  digitStyle={{ ${digitStyleProps.join(", ")} }}`);
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
  if (props.bounceIntensity !== DEFAULT_BOUNCE) {
    lines.push(`  animation={{ bounceIntensity: ${props.bounceIntensity} }}`);
  }
  if (props.scale !== DEFAULT_SCALE) {
    lines.push(`  scale={${props.scale}}`);
  }
  if (props.groupGap !== DEFAULT_GROUP_GAP) {
    lines.push(`  groupGap="${props.groupGap}"`);
  }
  if (props.cardGap !== DEFAULT_CARD_GAP) {
    lines.push(`  cardGap="${props.cardGap}"`);
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
  const [cardBackground, setCardBackground] = useState("#1a1a1a");
  const [cardBackgroundDark, setCardBackgroundDark] = useState("#0f0f0f");
  const [bounceIntensity, setBounceIntensity] = useState(8);
  const [scale, setScale] = useState(1);
  const [borderRadius, setBorderRadius] = useState("0.5rem");
  const [groupGap, setGroupGap] = useState("3rem");
  const [cardGap, setCardGap] = useState("0.375rem");
  const [segments, setSegments] = useState({
    days: true,
    hours: true,
    minutes: true,
    seconds: true,
  });
  const [separator, setSeparator] = useState<"none" | "colon" | "dot">("none");
  const [showLabels, setShowLabels] = useState(true);
  const [digitFont, setDigitFont] = useState<DigitFont>(DEFAULT_DIGIT_FONT);
  const [cardShadow, setCardShadow] = useState<CardShadowPreset>(DEFAULT_CARD_SHADOW);

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
        digitFont,
        cardBackground,
        cardBackgroundDark,
        cardShadow,
        segments,
        separator,
        showLabels,
        bounceIntensity,
        scale,
        borderRadius,
        groupGap,
        cardGap,
      }),
    [
      targetDate,
      digitColor,
      digitFont,
      cardBackground,
      cardBackgroundDark,
      cardShadow,
      segments,
      separator,
      showLabels,
      bounceIntensity,
      scale,
      borderRadius,
      groupGap,
      cardGap,
    ]
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
          position: "sticky",
          top: "0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "280px",
          padding: "1.5rem 1rem",
          background: "var(--bg)",
          zIndex: 10,
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
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
              background: cardBackground,
              backgroundDark: cardBackgroundDark,
              borderRadius,
              boxShadow: CARD_SHADOW_MAP[cardShadow],
            }}
            digitStyle={{ ...digitStyleBreakpoint, color: digitColor, fontFamily: DIGIT_FONT_MAP[digitFont] }}
            labelStyle={{ visible: showLabels, color: "#888888", fontSize: "0.75rem", fontWeight: "500", letterSpacing: "0.1em" }}
            segments={isNarrow ? { ...segments, days: false } : segments}
            separator={separator === "none" ? { type: "none" } : { type: separator }}
            orientation={orientation}
            animation={{ bounceIntensity, flipDuration: DEFAULT_FLIP_DURATION }}
            scale={scale}
            groupGap={groupGap}
            cardGap={cardGap}
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
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Content */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Content
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
                gap: "1.5rem",
              }}
            >
          {/* Content group */}
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

          {/* Randomize colors button */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Randomize</label>
            <button
              type="button"
              onClick={() => {
                setDigitColor(randomHex());
                setCardBackground(randomHex());
                setCardBackgroundDark(randomHex());
              }}
              style={{
                ...inputStyle,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Randomize colors
            </button>
          </div>

          {/* Colors */}
          <div style={{ gridColumn: isSmall ? "1" : "1 / -1" }}>
            <h3
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Colors
            </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Digit Font</label>
            <select
              value={digitFont}
              onChange={(e) => setDigitFont(e.target.value as DigitFont)}
              style={inputStyle}
            >
              {(Object.keys(DIGIT_FONT_DISPLAY_NAMES) as DigitFont[]).map((font) => (
                <option key={font} value={font}>
                  {DIGIT_FONT_DISPLAY_NAMES[font]}
                </option>
              ))}
            </select>
          </div>
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

          {/* Card background (top half) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Card background (top)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="color"
                value={cardBackground}
                onChange={(e) => setCardBackground(e.target.value)}
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
                {cardBackground}
              </span>
            </div>
          </div>

          {/* Card background dark (bottom half) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Card background (bottom)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="color"
                value={cardBackgroundDark}
                onChange={(e) => setCardBackgroundDark(e.target.value)}
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
                {cardBackgroundDark}
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

          {/* Animation */}
          <div style={{ gridColumn: isSmall ? "1" : "1 / -1" }}>
            <h3
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Animation
            </h3>
          </div>
          {/* Bounce intensity */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Bounce intensity</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={bounceIntensity}
                onChange={(e) => setBounceIntensity(Number(e.target.value))}
                style={{ flex: 1, accentColor: "var(--text)" }}
              />
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8125rem", color: "var(--text-muted)", minWidth: "2.5rem" }}>
                {bounceIntensity}°
              </span>
            </div>
          </div>

          {/* Size & Spacing */}
          <div style={{ gridColumn: isSmall ? "1" : "1 / -1" }}>
            <h3
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Size & Spacing
            </h3>
          </div>
          {/* Scale */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Scale</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                style={{ flex: 1, accentColor: "var(--text)" }}
              />
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8125rem", color: "var(--text-muted)", minWidth: "2.5rem" }}>
                {scale.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Border radius */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Border radius</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="range"
                min={0}
                max={8}
                step={1}
                value={Math.min(8, Math.max(0, Math.round((parseFloat(borderRadius) || 0.5) * 4)))}
                onChange={(e) => setBorderRadius((e.target.valueAsNumber * 0.25).toFixed(2) + "rem")}
                style={{ flex: 1, accentColor: "var(--text)" }}
              />
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8125rem", color: "var(--text-muted)", minWidth: "3rem" }}>
                {borderRadius}
              </span>
            </div>
          </div>

          {/* Group gap */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Group gap</label>
            <select
              value={groupGap}
              onChange={(e) => setGroupGap(e.target.value)}
              style={inputStyle}
            >
              {["1rem", "1.5rem", "2rem", "2.5rem", "3rem", "3.5rem", "4rem", "4.5rem", "5rem"].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Card gap */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Card gap</label>
            <select
              value={cardGap}
              onChange={(e) => setCardGap(e.target.value)}
              style={inputStyle}
            >
              {["0.125rem", "0.25rem", "0.375rem", "0.5rem", "0.75rem", "1rem"].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Clock shadow */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={labelStyle}>Clock shadow</label>
            <select
              value={cardShadow}
              onChange={(e) => setCardShadow(e.target.value as CardShadowPreset)}
              style={inputStyle}
            >
              {(Object.keys(CARD_SHADOW_MAP) as CardShadowPreset[]).map((preset) => (
                <option key={preset} value={preset}>
                  {preset.charAt(0).toUpperCase() + preset.slice(1)}
                </option>
              ))}
            </select>
          </div>
            </div>
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
