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
                borderBottom: "2px solid #e5e5e5",
                fontWeight: 600,
              }}
            >
              Prop
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem 0.75rem",
                borderBottom: "2px solid #e5e5e5",
                fontWeight: 600,
              }}
            >
              Type
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem 0.75rem",
                borderBottom: "2px solid #e5e5e5",
                fontWeight: 600,
              }}
            >
              Default
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "0.5rem 0.75rem",
                borderBottom: "2px solid #e5e5e5",
                fontWeight: 600,
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
                  borderBottom: "1px solid #eee",
                  fontFamily: "monospace",
                  fontWeight: 500,
                }}
              >
                {row.name}
              </td>
              <td
                style={{
                  padding: "0.5rem 0.75rem",
                  borderBottom: "1px solid #eee",
                  fontFamily: "monospace",
                  fontSize: "0.8125rem",
                }}
              >
                {row.type}
              </td>
              <td
                style={{
                  padding: "0.5rem 0.75rem",
                  borderBottom: "1px solid #eee",
                  fontFamily: "monospace",
                  fontSize: "0.8125rem",
                  color: "#666",
                }}
              >
                {row.default}
              </td>
              <td
                style={{
                  padding: "0.5rem 0.75rem",
                  borderBottom: "1px solid #eee",
                  color: "#444",
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
