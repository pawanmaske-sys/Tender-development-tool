export default function EvaluationPage() {
  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* PAGE HEADER */}
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "6px",
          }}
        >
          Home / Tenders / Evaluation
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Tender Evaluation
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Review tenders and make Bid / No-Bid participation decisions.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "13px" }}>
            Pending Evaluation
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            0
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "13px" }}>
            Participating
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            0
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "13px" }}>
            On Hold
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            0
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div style={{ color: "#64748b", fontSize: "13px" }}>
            Due Soon
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "28px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            0
          </div>
        </div>
      </div>

      {/* EVALUATION TABLE */}
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
            Pending Evaluation
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Tenders waiting for Bid / No-Bid evaluation.
          </p>
        </div>

        <div
          style={{
            padding: "24px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          No tenders are currently pending evaluation.
        </div>
      </div>
    </div>
  );
}
