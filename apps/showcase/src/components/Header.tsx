import Link from "next/link";

export default function Header() {
  return (
    <header
      className="showcase-header"
      style={{
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "var(--text)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontWeight: 700,
            fontSize: "1.125rem",
          }}
        >
          FlipClock
        </span>
      </Link>
      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link
          href="/demo"
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          Demo
        </Link>
        <Link
          href="/docs"
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          Docs
        </Link>
        <Link
          href="/examples"
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          Examples
        </Link>
      </nav>
    </header>
  );
}
