"use client";

import Link from "next/link";

const masterGroups = [
  {
    title: "Core Masters",
    description:
      "Organisational and reference data used across multiple modules.",
    items: [
      {
        title: "Country Master",
        description:
          "Manage countries, ISO codes, dialing codes, continents and country status.",
        path: "/masters/countries",
        available: true,
        icon: "◎",
      },
      {
        title: "Region Master",
        description:
          "Manage regions and map them to countries for organisational and tender operations.",
        path: "/masters/regions",
        available: true,
        icon: "◇",
      },
      {
        title: "Branch Management",
        description:
          "Manage branches, branch codes, country, region, city and branch status.",
        path: "/branch-management",
        available: true,
        icon: "▣",
      },
      {
        title: "Legal Entities",
        description:
          "Manage legal entities used for tender participation, proposals and commercial records.",
        path: "/masters/legal-entities",
        available: true,
        icon: "▤",
      },
      {
        title: "Services",
        description:
          "Manage services and service categories used for tender classification.",
        path: "",
        available: false,
        icon: "◇",
      },
      {
        title: "Currencies",
        description:
          "Manage currencies used for tender values and financial information.",
        path: "",
        available: false,
        icon: "$",
      },
    ],
  },

  {
    title: "Tender Masters",
    description:
      "Reference values used for tender classification and lifecycle management.",
    items: [
      {
        title: "Tender Types",
        description:
          "Manage procurement and tender types used across tender records.",
        path: "",
        available: false,
        icon: "▤",
      },
      {
        title: "Tender Sources",
        description:
          "Manage portals, websites and other sources from which opportunities are received.",
        path: "",
        available: false,
        icon: "⌕",
      },
      {
        title: "Tender Status",
        description:
          "Manage permitted statuses used during the tender lifecycle.",
        path: "",
        available: false,
        icon: "◷",
      },
      {
        title: "Evaluation / Hold Reasons",
        description:
          "Manage standard reasons used for evaluation, hold and decision tracking.",
        path: "",
        available: false,
        icon: "✓",
      },
      {
        title: "Loss Reasons",
        description:
          "Manage standard reasons for unsuccessful tender outcomes.",
        path: "",
        available: false,
        icon: "△",
      },
    ],
  },
];

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
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "6px",
          }}
        >
          Home / Administration / Master Management
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Master Management
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage reference data used across the Tender Management Tool.
        </p>
      </div>

      {/* MASTER GROUPS */}
      {masterGroups.map((group) => (
        <section
          key={group.title}
          style={{
            marginBottom: "32px",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <h2
              style={{
                margin: 0,
                fontSize: "19px",
                color: "#0f172a",
              }}
            >
              {group.title}
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              {group.description}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "16px",
            }}
          >
            {group.items.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#ffffff",
                  border: "1px solid #dbe3ef",
                  borderRadius: "12px",
                  padding: "20px",
                  minHeight: "180px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* TOP ROW */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "9px",
                      background: "#eff6ff",
                      color: "#2563eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    {item.icon}
                  </div>

                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: "600",
                      background: item.available
                        ? "#dcfce7"
                        : "#f1f5f9",
                      color: item.available
                        ? "#15803d"
                        : "#64748b",
                    }}
                  >
                    {item.available
                      ? "Available"
                      : "Planned"}
                  </span>
                </div>

                {/* TITLE */}
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "#0f172a",
                  }}
                >
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  style={{
                    marginTop: "8px",
                    marginBottom: "18px",
                    color: "#64748b",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>

                {/* ACTION */}
                {item.available ? (
                  <Link
                    href={item.path}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "flex-start",
                      padding: "9px 14px",
                      borderRadius: "7px",
                      background: "#2563eb",
                      color: "#ffffff",
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Manage →
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    style={{
                      alignSelf: "flex-start",
                      padding: "9px 14px",
                      border: "none",
                      borderRadius: "7px",
                      background: "#e2e8f0",
                      color: "#94a3b8",
                      fontSize: "12px",
                      cursor: "not-allowed",
                    }}
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* SYSTEM NOTE */}
      <div
        style={{
          padding: "16px 20px",
          borderRadius: "10px",
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e40af",
          fontSize: "13px",
          lineHeight: "1.5",
        }}
      >
        Master data should be maintained centrally so that
        tender records, workflows and reports use consistent
        reference values.
      </div>
    </div>
  );
}
