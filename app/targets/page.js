export default function TargetsPage() {
  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* PAGE HEADER */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "6px",
          }}
        >
          Home / Management / Targets
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Targets
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Monitor tender submission, win and value targets.
        </p>
      </div>

      {/* FILTERS */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "17px",
            color: "#0f172a",
          }}
        >
          Target Filters
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "14px",
            marginTop: "18px",
          }}
        >
          {[
            {
              label: "Year",
              options: ["2026", "2025", "2024"],
            },
            {
              label: "Period",
              options: ["Year", "Quarter", "Month"],
            },
            {
              label: "Branch",
              options: ["All Branches"],
            },
            {
              label: "Service",
              options: ["All Services"],
            },
          ].map((filter) => (
            <div key={filter.label}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#475569",
                }}
              >
                {filter.label}
              </label>

              <select
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  background: "#ffffff",
                  color: "#334155",
                  fontSize: "13px",
                }}
              >
                {filter.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* TARGET SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Submission Target", "0"],
          ["Submitted", "0"],
          ["Win Target", "0"],
          ["Won", "0"],
        ].map(([title, value]) => (
          <div
            key={title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              {title}
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "27px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* TARGET REGISTER */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              color: "#0f172a",
            }}
          >
            Target Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Review targets and actual tender performance.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1.3fr 1fr 1fr 1fr 1fr 1fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Target</div>
          <div>Period</div>
          <div>Target Value</div>
          <div>Actual</div>
          <div>Achievement</div>
          <div>Status</div>
        </div>

        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          No targets have been configured yet.
        </div>
      </div>

      {/* TARGET TYPES */}
      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        {[
          {
            title: "Submission Targets",
            text: "Track the expected number or value of tender submissions.",
          },
          {
            title: "Win Targets",
            text: "Track expected tender wins and achievement against target.",
          },
          {
            title: "Value Targets",
            text: "Track potential and awarded value against business targets.",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                color: "#0f172a",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                color: "#64748b",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
