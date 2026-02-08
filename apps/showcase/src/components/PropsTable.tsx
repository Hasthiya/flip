export interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface PropsTableProps {
  props: PropRow[];
}

export default function PropsTable({ props: rows }: PropsTableProps) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.875rem",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "0.75rem",
                borderBottom: "2px solid var(--text)",
                fontFamily: "var(--font-space-mono), monospace",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--text)",
              }}
            >
              Prop
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.75rem",
                borderBottom: "2px solid var(--text)",
                fontFamily: "var(--font-space-mono), monospace",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--text)",
              }}
            >
              Type
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.75rem",
                borderBottom: "2px solid var(--text)",
                fontFamily: "var(--font-space-mono), monospace",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--text)",
              }}
            >
              Default
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.75rem",
                borderBottom: "2px solid var(--text)",
                fontFamily: "var(--font-space-mono), monospace",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--text)",
              }}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontWeight: 500,
                  color: "var(--text)",
                  whiteSpace: "nowrap",
                }}
              >
                {row.name}
              </td>
              <td
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                }}
              >
                {row.type}
              </td>
              <td
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                }}
              >
                {row.default}
              </td>
              <td
                style={{
                  padding: "0.75rem",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  lineHeight: 1.4,
                }}
              >
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
