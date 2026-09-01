export default function TSRPage() {
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
          Home / Bid Management / TSR
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          TSR / Result Update
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage Tender Status Reports and update tender results.
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
          ["Pending Result Update", "0"],
          ["Result Awaited", "0"],
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

      {/* TSR REGISTER */}
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
            Tender Status Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Review tender status and update final results.
          </p>
        </div>

        {/* TABLE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1.7fr 1fr 1fr 1fr 1fr",
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
          <div>Branch</div>
          <div>Submission Date</div>
          <div>Result</div>
          <div>Action</div>
        </div>

        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          No tender results are currently pending update.
        </div>
      </div>

      {/* RESULT UPDATE */}
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
          Result Update
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "16px",
            marginTop: "18px",
          }}
        >
          {[
            {
              title: "Won",
              text: "Record successful tender results and supporting evidence.",
            },
            {
              title: "Lost",
              text: "Record unsuccessful results and reason where available.",
            },
            {
              title: "Result Awaited",
              text: "Keep submitted tenders pending until the result is received.",
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

      {/* ACCESS NOTE */}
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
        Result updates should be restricted to authorised users according to
        their assigned role and permissions.
      </div>
    </div>
  );
}
