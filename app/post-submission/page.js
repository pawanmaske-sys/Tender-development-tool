export default function PostSubmissionPage() {
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
          Home / Bid Management / Post-Submission
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Post-Submission
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Track tender results, follow-ups and post-submission activities.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Result Awaited", "0"],
          ["Clarification", "0"],
          ["Negotiation", "0"],
          ["Won", "0"],
          ["Lost", "0"],
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
                fontSize: "28px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* RESULT REGISTER */}
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
            Submitted Tender Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Monitor submitted tenders and update their post-submission status.
          </p>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1.7fr 1fr 1fr 1fr 1fr 0.8fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Tender ID</div>
          <div>Tender</div>
          <div>Submitted</div>
          <div>Deadline</div>
          <div>Status</div>
          <div>Owner</div>
          <div>Action</div>
        </div>

        {/* EMPTY STATE */}
        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          No submitted tenders are currently available.
        </div>
      </div>

      {/* RESULT TYPES */}
      <div
        style={{
          marginTop: "24px",
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
          Result Management
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "16px",
            marginTop: "18px",
          }}
        >
          {[
            {
              title: "Result Awaited",
              text: "Track tenders where the client result has not yet been received.",
            },
            {
              title: "Clarification",
              text: "Track clarification requests and required follow-up actions.",
            },
            {
              title: "Negotiation",
              text: "Track tenders currently under commercial or contractual negotiation.",
            },
            {
              title: "Won / Lost",
              text: "Record final tender outcome, result date and supporting evidence.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "18px",
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
                {item.title}
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
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* IMPORTANT NOTE */}
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
        Result updates will be restricted to authorised Bid Team Result
        Editors and other permitted roles.
      </div>
    </div>
  );
}
