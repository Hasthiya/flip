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
                padding: "0.5rem 0.75rem",
                borderBottom: "2px solid var(--border)",
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              Prop
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem 0.75rem",
                borderBottom: "2px solid var(--border)",
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              Type
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem 0.75rem",
                borderBottom: "2px solid var(--border)",
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              Default
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem 0.75rem",
                borderBottom: "2px solid var(--border)",
                fontWeight: 600,
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
                  padding: "0.5rem 0.75rem",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "monospace",
                  fontWeight: 500,
                  color: "var(--text)",
                }}
              >
                {row.name}
              </td>
              <td
                style={{
                  padding: "0.5rem 0.75rem",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "monospace",
                  fontSize: "0.8125rem",
                  color: "var(--text)",
                }}
              >
                {row.type}
              </td>
              <td
                style={{
                  padding: "0.5rem 0.75rem",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "monospace",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                }}
              >
                {row.default}
              </td>
              <td
                style={{
                  padding: "0.5rem 0.75rem",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--text)",
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
