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
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          color: "var(--text)",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: "#1a1a1a",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
            }}
          >
            F
          </span>
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: "1.125rem",
          }}
        >
          FlipClock
        </span>
      </Link>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link
          href="/demo"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.9375rem",
          }}
        >
          Demo
        </Link>
        <Link
          href="/docs"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.9375rem",
          }}
        >
          Docs
        </Link>
        <Link
          href="/examples"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.9375rem",
          }}
        >
          Examples
        </Link>
      </nav>
    </header>
  );
}
