export default function TemplateStudioPage() {
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
          Home / Proposal / Template Studio
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Template Studio
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage proposal templates for branches and legal entities.
        </p>
      </div>

      {/* TEMPLATE SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Total Templates", "0"],
          ["Active Templates", "0"],
          ["Draft Templates", "0"],
          ["Pending Review", "0"],
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

      {/* ACTION BAR */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              color: "#0f172a",
            }}
          >
            Proposal Templates
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Create and manage reusable proposal structures.
          </p>
        </div>

        <button
          type="button"
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Create Template
        </button>
      </div>

      {/* TEMPLATE REGISTER */}
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
            display: "grid",
            gridTemplateColumns:
              "1.5fr 1fr 1.2fr 0.8fr 1fr 0.8fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Template Name</div>
          <div>Entity</div>
          <div>Branch</div>
          <div>Version</div>
          <div>Status</div>
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
          No proposal templates are currently available.
        </div>
      </div>

      {/* TEMPLATE TYPES */}
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
          Template Configuration
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
              title: "Branch Template",
              text: "Templates specific to individual branches.",
            },
            {
              title: "Legal Entity Template",
              text: "Templates mapped to the appropriate legal entity.",
            },
            {
              title: "Proposal Structure",
              text: "Define sections, ordering and reusable proposal components.",
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

      {/* GOVERNANCE NOTE */}
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
        Templates should be version-controlled and mapped to the correct
        branch and legal entity before being used for proposal generation.
      </div>
    </div>
  );
}
