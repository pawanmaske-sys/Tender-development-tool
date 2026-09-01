export default function DataQualityPage() {
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
          Home / Management / Data Quality
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Data Quality
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Monitor tender data completeness, validation issues and missing information.
        </p>
      </div>

      {/* QUALITY SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Total Records", "0"],
          ["Complete Records", "0"],
          ["Incomplete Records", "0"],
          ["Issues Found", "0"],
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

      {/* COMPLETENESS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
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
            Data Completeness
          </h2>

          <div
            style={{
              marginTop: "20px",
              padding: "28px",
              textAlign: "center",
              borderRadius: "10px",
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
            }}
          >
            <div
              style={{
                fontSize: "34px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              0%
            </div>

            <div
              style={{
                marginTop: "6px",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Overall completeness
            </div>
          </div>
        </div>

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
            Validation Status
          </h2>

          <div
            style={{
              marginTop: "20px",
              padding: "28px",
              textAlign: "center",
              borderRadius: "10px",
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
            }}
          >
            <div
              style={{
                fontSize: "34px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              0
            </div>

            <div
              style={{
                marginTop: "6px",
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              Validation issues
            </div>
          </div>
        </div>
      </div>

      {/* QUALITY CHECKS */}
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
            Data Quality Checks
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Review missing or invalid tender information.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr 0.8fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Quality Check</div>
          <div>Total Records</div>
          <div>Passed</div>
          <div>Issues</div>
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
          No data quality issues are currently available.
        </div>
      </div>

      {/* CHECK TYPES */}
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
            title: "Mandatory Fields",
            text: "Check whether required tender fields have been completed.",
          },
          {
            title: "Reference Data",
            text: "Validate branches, legal entities, sources and other master values.",
          },
          {
            title: "Date & Status",
            text: "Identify inconsistent deadlines, submission dates and tender statuses.",
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
