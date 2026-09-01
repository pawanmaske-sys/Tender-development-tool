export default function ReportsPage() {
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
          Home / Management / Reports & Analytics
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Reports & Analytics
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Analyse tender performance, pipeline, results and bid team workload.
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
          Report Filters
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
              options: ["All Years", "2026", "2025", "2024"],
            },
            {
              label: "Month",
              options: [
                "All Months",
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
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

      {/* KPI CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Total Tenders", "0"],
          ["Potential Value", "0"],
          ["Submitted", "0"],
          ["Won", "0"],
          ["Win Rate", "0%"],
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
                fontSize: "26px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* REPORT TYPES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "20px",
        }}
      >
        {[
          {
            title: "Tender Master Report",
            description:
              "Detailed tender-level report including status, branch, source, owner and potential value.",
          },
          {
            title: "Branch Performance",
            description:
              "Compare tender submissions, wins, losses, win rate and potential value by branch.",
          },
          {
            title: "Won / Lost Analysis",
            description:
              "Analyse tender outcomes, awarded value, lost value and loss reasons.",
          },
          {
            title: "Source Performance",
            description:
              "Analyse tender opportunities and conversion performance by tender source.",
          },
          {
            title: "Bid Team Workload",
            description:
              "Review active tenders, upcoming deadlines, overdue work and assigned workload.",
          },
          {
            title: "Result Awaited Ageing",
            description:
              "Track submitted tenders waiting for results and analyse ageing by time period.",
          },
          {
            title: "Potential vs Awarded",
            description:
              "Compare submitted potential value with awarded value.",
          },
          {
            title: "Ledger Pending",
            description:
              "Identify Won tenders that still require ledger action or finance confirmation.",
          },
        ].map((report) => (
          <div
            key={report.title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "22px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                color: "#0f172a",
              }}
            >
              {report.title}
            </h2>

            <p
              style={{
                marginTop: "8px",
                marginBottom: "18px",
                color: "#64748b",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              {report.description}
            </p>

            <button
              type="button"
              disabled
              style={{
                padding: "9px 14px",
                border: "none",
                borderRadius: "7px",
                background: "#e2e8f0",
                color: "#94a3b8",
                fontSize: "12px",
                cursor: "not-allowed",
              }}
            >
              Coming Soon
            </button>
          </div>
        ))}
      </div>

      {/* EXPORT NOTE */}
      <div
        style={{
          marginTop: "24px",
          padding: "16px 20px",
          borderRadius: "10px",
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e40af",
          fontSize: "13px",
        }}
      >
        Reports will use live tender data and support filtering and export
        after the underlying tender workflow is connected.
      </div>
    </div>
  );
}
