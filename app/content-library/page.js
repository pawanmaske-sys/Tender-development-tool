export default function ContentLibraryPage() {
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
          Home / Proposal / Content Library
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Content Library
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage approved content used for tender and proposal preparation.
        </p>
      </div>

      {/* SEARCH / FILTER */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search content..."
          style={{
            flex: "1",
            minWidth: "240px",
            padding: "11px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "13px",
            outline: "none",
          }}
        />

        <select
          style={{
            padding: "11px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "13px",
            background: "#ffffff",
          }}
        >
          <option>All Content Types</option>
          <option>Company Profile</option>
          <option>Service</option>
          <option>Experience</option>
          <option>Case Study</option>
          <option>Other</option>
        </select>

        <select
          style={{
            padding: "11px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "13px",
            background: "#ffffff",
          }}
        >
          <option>All Entities</option>
          <option>Satguru Group</option>
          <option>Satguru Travel</option>
          <option>Other</option>
        </select>

        <button
          type="button"
          style={{
            padding: "11px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Add Content
        </button>
      </div>

      {/* CONTENT CATEGORIES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Company Profile", "0"],
          ["Services", "0"],
          ["Experience", "0"],
          ["Case Studies", "0"],
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

      {/* CONTENT REGISTER */}
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
            Approved Content
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Only approved content should be available for proposal generation.
          </p>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 0.8fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Content Title</div>
          <div>Type</div>
          <div>Entity</div>
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
          No approved content is currently available.
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
        Content used for AI-generated proposals should come from approved
        organisation, entity, service, experience and case-study content.
      </div>
    </div>
  );
}
