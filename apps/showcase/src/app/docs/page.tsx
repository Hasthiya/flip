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
    description: "Layout direction: row (horizontal) or column (stacked).",
  },
  {
    name: "scale",
    type: "number",
    default: "1",
    description: "Scale factor for the whole clock. Example: scale={0.8} for 80% size.",
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
  padding: "1.25rem",
  borderRadius: "0.75rem",
  overflow: "auto" as const,
  fontSize: "0.875rem",
  lineHeight: 1.6,
};

const sidebarLinks = [
  { href: "#installation", label: "Installation" },
  { href: "#basic-usage", label: "Basic Usage" },
  { href: "#props", label: "Props Reference" },
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
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          flexShrink: 0,
          width: showSidebarColumn ? "220px" : "100%",
          padding: isNarrow ? "1.5rem 1rem" : "2rem 1.5rem",
          borderRight: showSidebarColumn ? "1px solid var(--border)" : "none",
          borderBottom: showSidebarColumn ? "none" : "1px solid var(--border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Contents
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {sidebarLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                color: "var(--text)",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: isNarrow ? "1.5rem 1rem 3rem" : "2rem 2.5rem 3rem",
          maxWidth: "800px",
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
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
            marginBottom: "3rem",
            lineHeight: 1.5,
          }}
        >
          Integrate FlipClock into your React application in minutes.
        </p>

        {/* Installation */}
        <section id="installation" style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "1rem",
              color: "var(--text)",
            }}
          >
            Installation
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9375rem",
              marginBottom: "1rem",
              lineHeight: 1.5,
            }}
          >
            Install the package using npm, yarn, or pnpm.
          </p>
          <pre style={codeBlockStyle}>
            <code>npm install @hasthiya_/flip-clock</code>
          </pre>
        </section>

        {/* Basic Usage */}
        <section id="basic-usage" style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "1rem",
              color: "var(--text)",
            }}
          >
            Basic Usage
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9375rem",
              marginBottom: "1rem",
              lineHeight: 1.5,
            }}
          >
            Import the component and pass a target date.
          </p>
          <pre style={codeBlockStyle}>
            <code>{`import FlipClock from "@hasthiya_/flip-clock";

<FlipClock targetDate={new Date("2026-12-31T00:00:00")} />`}</code>
          </pre>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              marginTop: "1rem",
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: "var(--text)" }}>Note:</strong> In Next.js, use FlipClock inside a Client Component (
            <code
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                background: "var(--border)",
                padding: "0.15rem 0.4rem",
                borderRadius: "0.25rem",
                fontSize: "0.8125rem",
              }}
            >
              &quot;use client&quot;
            </code>
            ).
          </p>
        </section>

        {/* Props Reference */}
        <section id="props" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "1rem",
              color: "var(--text)",
            }}
          >
            Props Reference
          </h2>
          <PropsTable props={flipClockProps} />
        </section>
      </div>
    </main>
  );
}
