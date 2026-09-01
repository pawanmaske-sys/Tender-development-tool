export default function ModulePlaceholder({
  title,
  subtitle,
}) {
  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "28px",
          maxWidth: "1100px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          {subtitle}
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "24px",
            borderRadius: "10px",
            background: "#f8fafc",
            border: "1px dashed #cbd5e1",
            color: "#64748b",
          }}
        >
          Module structure created.
          <br />
          Functionality will be developed in the next phase.
        </div>
      </div>
    </div>
  );
}
