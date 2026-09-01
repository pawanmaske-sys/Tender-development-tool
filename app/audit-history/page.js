export default function AuditHistoryPage() {
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
          Home / Administration / Audit History
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Audit History
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Track important user and system actions across the Tender Management Tool.
        </p>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Total Events", "0"],
          ["Today", "0"],
          ["User Actions", "0"],
          ["System Events", "0"],
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

      {/* FILTERS */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "17px",
            color: "#0f172a",
          }}
        >
          Audit Filters
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
              label: "User",
              options: ["All Users"],
            },
            {
              label: "Module",
              options: [
                "All Modules",
                "Tenders",
                "Evaluation",
                "Bid Workspace",
                "Submission",
                "Results",
                "Administration",
              ],
            },
            {
              label: "Action",
              options: [
                "All Actions",
                "Create",
                "Update",
                "Delete",
                "Approve",
                "Status Change",
                "Login",
                "Export",
              ],
            },
            {
              label: "Date",
              options: [
                "All Dates",
                "Today",
                "Last 7 Days",
                "Last 30 Days",
              ],
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

      {/* AUDIT REGISTER */}
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
            Audit Events
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Review recorded actions and system events.
          </p>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1.3fr 1fr 1fr 1.5fr 1fr 1fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Date / Time</div>
          <div>User</div>
          <div>Module</div>
          <div>Action</div>
          <div>Record</div>
          <div>IP / Source</div>
        </div>

        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          No audit events have been recorded yet.
        </div>
      </div>

      {/* AUDIT NOTE */}
      <div
        style={{
          marginTop: "20px",
          padding: "16px 20px",
          borderRadius: "10px",
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e40af",
          fontSize: "13px",
        }}
      >
        Audit history should be retained for important tender, result,
        user, permission and configuration changes.
      </div>
    </div>
  );
}
