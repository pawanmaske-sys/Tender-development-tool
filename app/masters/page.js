export default function MastersPage() {
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
          Home / Administration / Masters
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Masters
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage reference data used throughout the Tender Management Tool.
        </p>
      </div>

      {/* MASTER CATEGORIES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "18px",
        }}
      >
        {[
          {
            title: "Branches",
            description:
              "Manage branches and branch-related tender information.",
          },
          {
            title: "Legal Entities",
            description:
              "Manage legal entities used for tender participation and proposals.",
          },
          {
            title: "Countries",
            description:
              "Manage countries where tender opportunities are handled.",
          },
          {
            title: "Services",
            description:
              "Manage services and service categories used for tender classification.",
          },
          {
            title: "Tender Sources",
            description:
              "Manage tender portals and other opportunity sources.",
          },
          {
            title: "Tender Types",
            description:
              "Manage tender and procurement types used in the system.",
          },
          {
            title: "Tender Status",
            description:
              "Manage permitted tender lifecycle statuses.",
          },
          {
            title: "Loss Reasons",
            description:
              "Manage standard reasons for unsuccessful tender outcomes.",
          },
          {
            title: "Currencies",
            description:
              "Manage currencies used for tender values and financial information.",
          },
        ].map((item) => (
          <div
            key={item.title}
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
              {item.title}
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
              {item.description}
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
              Manage
            </button>
          </div>
        ))}
      </div>

      {/* SYSTEM NOTE */}
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
        Master data should be maintained centrally so that tender records,
        reports and workflows use consistent reference values.
      </div>
    </div>
  );
}
