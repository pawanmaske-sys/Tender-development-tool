export default function BidWorkspacePage() {
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
          Home / Tenders / Bid Workspace
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Bid Workspace
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage tender preparation, documents, reviews and submission readiness.
        </p>
      </div>

      {/* TENDER SUMMARY */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            color: "#0f172a",
          }}
        >
          Tender Workspace
        </h2>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Select a participating tender to begin bid preparation.
        </p>
      </div>

      {/* WORKFLOW */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            color: "#0f172a",
          }}
        >
          Bid Preparation Workflow
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {[
            "Tender Review",
            "Compliance Matrix",
            "Technical Proposal",
            "Financial Proposal",
            "Supporting Documents",
            "Internal Review",
          ].map((step, index) => (
            <div
              key={step}
              style={{
                padding: "18px",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                Step {index + 1}
              </div>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {step}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >
                Not started
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
