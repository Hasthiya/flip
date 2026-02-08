import Link from "next/link";

export default function Footer() {
    return (
        <footer
            style={{
                padding: "2rem 1.5rem",
                borderTop: "1px solid var(--border)",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "2rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
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
                <a
                    href="https://www.npmjs.com/package/@hasthiya_/flip-clock"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                    }}
                >
                    npm
                </a>
                <a
                    href="https://github.com/hasthiya-org/flip-clock"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                    }}
                >
                    GitHub
                </a>
            </div>
        </footer>
    );
}
