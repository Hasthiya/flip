"use client";

import PropsTable from "@/components/PropsTable";
import { useMediaQuery, NARROW_MEDIA_QUERY } from "@/hooks/useMediaQuery";

const flipClockProps = [
  {
    name: "targetDate",
    type: "Date",
    default: "88 days from now",
    description: "The target date to count down to.",
  },
  {
    name: "staticTime",
    type: "{ days?, hours?, minutes?, seconds? }",
    default: "—",
    description: "Override the countdown with static values (disables auto-tick).",
  },
  {
    name: "cardStyle",
    type: "FlipCardStyle",
    default: "—",
    description: "Card appearance: background, backgroundDark, width, height, borderRadius, boxShadow.",
  },
  {
    name: "digitStyle",
    type: "FlipDigitStyle",
    default: "—",
    description: "Digit typography: color, fontFamily, fontSize, textShadow.",
  },
  {
    name: "labelStyle",
    type: "FlipLabelStyle",
    default: "—",
    description: "Label configuration: visible, color, fontFamily, fontSize, fontWeight, letterSpacing, textTransform.",
  },
  {
    name: "lineStyle",
    type: "FlipLineStyle",
    default: "—",
    description: "Horizontal divider line on each card: color, height.",
  },
  {
    name: "animation",
    type: "FlipAnimationConfig",
    default: "—",
    description: "Flip animation: flipDuration, bounceIntensity, flipDownEasing, flipUpEasing.",
  },
  {
    name: "separator",
    type: "FlipSeparatorConfig",
    default: "none",
    description: "Separator between groups: type ('none' | 'colon' | 'dot'), color, size.",
  },
  {
    name: "labels",
    type: "FlipClockLabels",
    default: "—",
    description: "Custom label text for days, hours, minutes, seconds.",
  },
  {
    name: "segments",
    type: "FlipClockSegments",
    default: "all true",
    description: "Which segments to display: days, hours, minutes, seconds.",
  },
  {
    name: "dayDigits",
    type: "number",
    default: "2",
    description: "Number of digits for the days display.",
  },
  {
    name: "groupGap",
    type: "string",
    default: "'3rem'",
    description: "Gap between time groups (CSS value).",
  },
  {
    name: "cardGap",
    type: "string",
    default: "'0.375rem'",
    description: "Gap between individual digit cards (CSS value).",
  },
  {
    name: "labelGap",
    type: "string",
    default: "'1rem'",
    description: "Gap between cards and the label (CSS value).",
  },
  {
    name: "onComplete",
    type: "() => void",
    default: "—",
    description: "Callback fired when countdown reaches zero.",
  },
  {
    name: "orientation",
    type: "'row' | 'column'",
    default: "'row'",
    description: "Layout direction: row (horizontal) or column (stacked). Set from the parent (e.g. via media queries) for optimal view per screen size.",
  },
  {
    name: "scale",
    type: "number",
    default: "1",
    description: "Scale factor for the whole clock (cards, digits, gaps). Use for coarse size control from outside; applied on top of cardStyle/digitStyle. Example: scale={0.8} for 80% size. Clamped to 0.1–10.",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Additional className for the outer wrapper.",
  },
  {
    name: "style",
    type: "CSSProperties",
    default: "—",
    description: "Additional inline style for the outer wrapper.",
  },
];

const codeBlockStyle = {
  background: "var(--code-bg)",
  color: "var(--code-text)",
  padding: "1rem",
  borderRadius: "0.5rem",
  overflow: "auto" as const,
  fontSize: "0.875rem",
};

const sidebarLinks = [
  { href: "#installation", label: "A. Installation" },
  { href: "#basic-usage", label: "B. Basic Usage" },
  { href: "#props", label: "C. Props" },
];

export default function DocsPage() {
  const isNarrow = useMediaQuery(NARROW_MEDIA_QUERY);
  const showSidebarColumn = useMediaQuery("(min-width: 1024px)");

  return (
    <main
      style={{
        display: "flex",
        flexDirection: showSidebarColumn ? "row" : "column",
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <aside
        style={{
          flexShrink: 0,
          width: showSidebarColumn ? "200px" : "100%",
          padding: isNarrow ? "1rem 1rem 0" : "1.5rem 1.5rem 0",
          borderRight: showSidebarColumn ? "1px solid var(--border)" : "none",
          borderBottom: showSidebarColumn ? "none" : "1px solid var(--border)",
          paddingBottom: showSidebarColumn ? "1.5rem" : "1rem",
        }}
      >
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          CORE CONCEPTS
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {sidebarLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                color: "var(--text)",
                textDecoration: "none",
                fontSize: "0.9375rem",
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <div
        style={{
          flex: 1,
          padding: isNarrow ? "1rem" : "1.5rem 2rem 2rem",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "0.5rem",
          }}
        >
          Documentation
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1rem",
            marginBottom: "2rem",
          }}
        >
          Integrate FlipClock into your React application in minutes.
        </p>

        <section id="installation" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              color: "var(--text)",
            }}
          >
            A. Installation
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9375rem",
              marginBottom: "0.75rem",
            }}
          >
            Install the package and its peer dependencies.
          </p>
          <pre style={codeBlockStyle}>
            <code>npm install @hasthiya_/flip-clock</code>
          </pre>
        </section>

        <section id="basic-usage" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              color: "var(--text)",
            }}
          >
            B. Basic usage
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9375rem",
              marginBottom: "0.75rem",
            }}
          >
            Import and initialize with a target date.
          </p>
          <pre style={codeBlockStyle}>
            <code>{`import FlipClock from "@hasthiya_/flip-clock";

<FlipClock targetDate={new Date("2026-12-31T00:00:00")} />`}</code>
          </pre>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              marginTop: "0.5rem",
            }}
          >
            In Next.js, use FlipClock inside a Client Component (
            <code>&quot;use client&quot;</code>).
          </p>
        </section>

        <section id="props" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              color: "var(--text)",
            }}
          >
            C. Props
          </h2>
          <PropsTable props={flipClockProps} />
        </section>
      </div>
    </main>
  );
}
