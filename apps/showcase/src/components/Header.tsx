import Link from "next/link";

export default function Header() {
  return (
    <header
      className="showcase-header"
      style={{
        borderBottom: "1px solid #e5e5e5",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        style={{
          fontWeight: 700,
          fontSize: "1.125rem",
          color: "#1a1a1a",
          textDecoration: "none",
        }}
      >
        FlipClock
      </Link>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link
          href="/demo"
          style={{ color: "#555", textDecoration: "none", fontSize: "0.9375rem" }}
        >
          Demo
        </Link>
        <Link
          href="/docs"
          style={{ color: "#555", textDecoration: "none", fontSize: "0.9375rem" }}
        >
          Docs
        </Link>
        <Link
          href="/examples"
          style={{ color: "#555", textDecoration: "none", fontSize: "0.9375rem" }}
        >
          Examples
        </Link>
      </nav>
    </header>
  );
}
