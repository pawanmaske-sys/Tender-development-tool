export default function UsersRolesPage() {
  const roles = [
    {
      role: "Bid Team Member",
      description:
        "Works on assigned tenders, documents, evaluation and bid preparation.",
      access: "Tender & Bid Workspace",
    },
    {
      role: "Result Editor",
      description:
        "Updates tender results and maintains result-related information.",
      access: "Results & TSR",
    },
    {
      role: "Team Lead / Bid Manager",
      description:
        "Reviews tenders, manages team workload and approves bid activities.",
      access: "Team & Approval",
    },
    {
      role: "Admin",
      description:
        "Manages users, roles, masters and system configuration.",
      access: "Administration",
    },
    {
      role: "Management",
      description:
        "Views management dashboards, reports and tender performance.",
      access: "Reports & Analytics",
    },
  ];

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
          Home / Administration / Users & Roles
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Users & Roles
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage users, roles and access permissions.
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
          ["Total Users", "0"],
          ["Active Users", "0"],
          ["Inactive Users", "0"],
          ["Roles", "5"],
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

      {/* USER REGISTER */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
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
              User Register
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Manage system users and their assigned roles.
            </p>
          </div>

          <button
            type="button"
            disabled
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#e2e8f0",
              color: "#94a3b8",
              fontSize: "13px",
              cursor: "not-allowed",
            }}
          >
            Add User
          </button>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1.4fr 1.4fr 1fr 1fr 0.8fr 0.8fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
          <div>Branch</div>
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
          No users have been configured yet.
        </div>
      </div>

      {/* ROLES */}
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
          System Roles
        </h2>

        <p
          style={{
            marginTop: "6px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Role definitions and high-level access areas.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {roles.map((item) => (
            <div
              key={item.role}
              style={{
                padding: "20px",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "#0f172a",
                  }}
                >
                  {item.role}
                </h3>

                <span
                  style={{
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background: "#e2e8f0",
                    color: "#475569",
                    fontSize: "11px",
                  }}
                >
                  Role
                </span>
              </div>

              <p
                style={{
                  marginTop: "10px",
                  marginBottom: "8px",
                  color: "#64748b",
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  fontSize: "12px",
                  color: "#475569",
                }}
              >
                <strong>Primary access:</strong> {item.access}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PERMISSION NOTE */}
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
        Detailed permissions will be configured before the tender workflow is
        connected to live data.
      </div>
    </div>
  );
}
