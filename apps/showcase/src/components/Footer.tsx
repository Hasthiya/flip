"use client";

import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Footer() {
    const isSmall = useMediaQuery("(max-width: 768px)");

    return (
        <footer
            style={{
                padding: isSmall ? "1.5rem 1rem" : "2rem 1.5rem",
                borderTop: "1px solid var(--border)",
            }}
        >
            <div
                style={{
                    display: isSmall ? "flex" : "grid",
                    flexDirection: isSmall ? "column" : undefined,
                    gridTemplateColumns: isSmall ? undefined : "1fr auto 1fr",
                    alignItems: "center",
                    gap: isSmall ? "1rem" : "1.5rem",
                    maxWidth: "1100px",
                    margin: "0 auto",
                    textAlign: isSmall ? "center" : undefined,
                }}
            >
                {/* Left side - Email */}
                <a
                    href="mailto:hardstudio.rambukwella@gmail.com"
                    style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontSize: isSmall ? "0.8125rem" : "0.875rem",
                        justifySelf: isSmall ? undefined : "start",
                        order: isSmall ? 2 : undefined,
                    }}
                >
                    hardstudio.rambukwella@gmail.com
                </a>

                {/* Center - Navigation links */}
                <div
                    style={{
                        display: "flex",
                        gap: isSmall ? "1.5rem" : "2rem",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        order: isSmall ? 1 : undefined,
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
                </div>

                {/* Right side - GitHub profile */}
                <a
                    href="https://github.com/Hasthiya/flip/tree/main/packages/flip-clock"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        color: "var(--text-muted)",
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        justifySelf: isSmall ? undefined : "end",
                        order: isSmall ? 3 : undefined,
                    }}
                >
                    @Hasthiya
                </a>
            </div>
        </footer>
    );
}
