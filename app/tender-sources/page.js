export default function TenderSourcesPage() {
  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "28px",
          color: "#0f172a",
        }}
      >
        Tender Sources
      </h1>

      <p
        style={{
          marginTop: "8px",
          color: "#64748b",
          fontSize: "15px",
        }}
      >
        Tender portal and opportunity source directory
      </p>

      <div
        style={{
          marginTop: "30px",
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
          Tender Sources
        </h2>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
          }}
        >
          This module will contain global, country-wise,
          government, UN/NGO and other tender sources.
        </p>
      </div>
    </div>
  );
}
