export default function AIProposalPage() {
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
          Home / Bid Management / AI Proposal Maker
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          AI Proposal Maker
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Analyse tenders, create compliance matrices and generate proposal drafts.
        </p>
      </div>

      {/* TENDER SELECTION */}
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
          Select Tender
        </h2>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Select a participating tender to start AI-assisted proposal preparation.
        </p>

        <div
          style={{
            marginTop: "18px",
            padding: "14px 16px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            color: "#94a3b8",
            background: "#f8fafc",
          }}
        >
          No tender selected
        </div>
      </div>

      {/* AI TOOLS */}
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
          AI Proposal Tools
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
            {
              title: "Analyse Tender",
              description: "Analyse RFP requirements and identify key requirements.",
            },
            {
              title: "Compliance Matrix",
              description: "Create mandatory requirements and compliance mapping.",
            },
            {
              title: "Missing Documents",
              description: "Identify documents and information required for bidding.",
            },
            {
              title: "Proposal Structure",
              description: "Create the recommended proposal structure.",
            },
            {
              title: "Generate Draft",
              description: "Generate an AI-assisted first proposal draft.",
            },
            {
              title: "Check Proposal",
              description: "Check the proposal for gaps and inconsistencies.",
            },
          ].map((tool) => (
            <div
              key={tool.title}
              style={{
                padding: "20px",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                background: "#f8fafc",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "16px",
                  color: "#0f172a",
                }}
              >
                {tool.title}
              </h3>

              <p
                style={{
                  marginTop: "8px",
                  marginBottom: 0,
                  fontSize: "13px",
                  lineHeight: "1.5",
                  color: "#64748b",
                }}
              >
                {tool.description}
              </p>

              <button
                type="button"
                disabled
                style={{
                  marginTop: "16px",
                  padding: "9px 14px",
                  border: "none",
                  borderRadius: "7px",
                  background: "#e2e8f0",
                  color: "#94a3b8",
                  cursor: "not-allowed",
                }}
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI SAFETY NOTE */}
      <div
        style={{
          marginTop: "20px",
          padding: "16px 20px",
          borderRadius: "10px",
          background: "#fff7ed",
          border: "1px solid #fed7aa",
          color: "#9a3412",
          fontSize: "13px",
        }}
      >
        AI-generated proposal content will remain a draft until reviewed and
        approved by the Bid Team.
      </div>
    </div>
  );
}
