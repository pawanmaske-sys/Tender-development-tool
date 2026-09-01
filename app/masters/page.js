"use client";

import Link from "next/link";

const coreMasters = [
  {
    title: "Country Master",
    description:
      "Manage countries, ISO codes, dialing codes, continents and country status.",
    icon: "◎",
    path: "/masters/countries",
    status: "Available",
  },
  {
    title: "Region Master",
    description:
      "Manage regions and map them to countries for organisational and tender operations.",
    icon: "◇",
    path: "/masters/regions",
    status: "Available",
  },
  {
    title: "Branch Management",
    description:
      "Manage branches, branch codes, country, region, city and branch status.",
    icon: "▣",
    path: "/branch-management",
    status: "Available",
  },
  {
    title: "Legal Entities",
    description:
      "Manage legal entities used for tender participation, proposals and commercial records.",
    icon: "▤",
    path: "/masters/legal-entities",
    status: "Planned",
  },
  {
    title: "Services",
    description:
      "Manage services and service categories used for tender classification.",
    icon: "◇",
    path: "/masters/services",
    status: "Planned",
  },
  {
    title: "Currencies",
    description:
      "Manage currencies used for tender values and financial information.",
    icon: "$",
    path: "/masters/currencies",
    status: "Planned",
  },
];

const tenderMasters = [
  {
    title: "Tender Types",
    description:
      "Manage procurement and tender types used throughout the tender lifecycle.",
    icon: "▤",
    path: "/masters/tender-types",
  },
  {
    title: "Tender Sources",
    description:
      "Manage portals, websites and other sources from which tender opportunities are received.",
    icon: "⌕",
    path: "/tender-sources",
  },
  {
    title: "Tender Status",
    description:
      "Manage permitted statuses used during the tender lifecycle.",
    icon: "◷",
    path: "/masters/tender-status",
  },
  {
    title: "Loss Reasons",
    description:
      "Manage standard reasons for unsuccessful tender outcomes.",
    icon: "△",
    path: "/masters/loss-reasons",
  },
];

function MasterCard({
  title,
  description,
  icon,
  path,
  status,
}) {
  const available = status !== "Planned";

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #dbe3ef",
        borderRadius: "12px",
        padding: "20px",
        minHeight: "170px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
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
              fontWeight: "600",
            }}
          >
            {icon}
          </div>

          <span
            style={{
              padding: "5px 9px",
              borderRadius: "999px",
              background: available
                ? "#dcfce7"
                : "#f1f5f9",
              color: available
                ? "#15803d"
                : "#64748b",
              fontSize: "10px",
              fontWeight: "700",
            }}
          >
            {status || "Planned"}
          </span>
        </div>

        <h2
          style={{
            margin: "14px 0 0",
            fontSize: "17px",
            color: "#0f172a",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: "7px 0 0",
            color: "#64748b",
            fontSize: "13px",
            lineHeight: "1.5",
          }}
        >
          {description}
        </p>
      </div>

      {available ? (
        <Link
          href={path}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "18px",
            width: "fit-content",
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
            marginTop: "18px",
            width: "fit-content",
            padding: "9px 14px",
            border: "none",
            borderRadius: "7px",
            background: "#e2e8f0",
            color: "#94a3b8",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "not-allowed",
          }}
        >
          Coming Soon
        </button>
      )}
    </div>
  );
}

export default function MastersPage() {
  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
        boxSizing: "border-box",
      }}
    >
      {/* PAGE HEADER */}
      <div
        style={{
          marginBottom: "28px",
        }}
      >
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
            margin: "8px 0 0",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage reference data used across the Tender Management Tool.
        </p>
      </div>

      {/* CORE MASTERS */}
      <section
        style={{
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "19px",
              color: "#0f172a",
            }}
          >
            Core Masters
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Organisational and reference data used across multiple modules.
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
          {coreMasters.map((item) => (
            <MasterCard
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </section>

      {/* TENDER MASTERS */}
      <section
        style={{
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "19px",
              color: "#0f172a",
            }}
          >
            Tender Masters
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Reference values used for tender classification and lifecycle
            management.
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
          {tenderMasters.map((item) => (
            <MasterCard
              key={item.title}
              {...item}
              status="Planned"
            />
          ))}
        </div>
      </section>

      {/* MASTER GOVERNANCE */}
      <section
        style={{
          background: "#ffffff",
          border: "1px solid #dbe3ef",
          borderRadius: "12px",
          padding: "22px 24px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            color: "#0f172a",
          }}
        >
          Master Data Governance
        </h2>

        <p
          style={{
            margin: "7px 0 0",
            color: "#64748b",
            fontSize: "13px",
            lineHeight: "1.6",
          }}
        >
          Master data should be maintained centrally so that tender records,
          reporting, workflows and user access use consistent reference
          values.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: "12px",
            marginTop: "18px",
          }}
        >
          {[
            [
              "Centralised",
              "Reference data is maintained from one administration area.",
            ],
            [
              "Controlled",
              "Only authorised users should create or modify master values.",
            ],
            [
              "Auditable",
              "Important master-data changes should be captured in Audit History.",
            ],
          ].map(([title, description]) => (
            <div
              key={title}
              style={{
                padding: "14px",
                borderRadius: "9px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#334155",
                }}
              >
                {title}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  fontSize: "12px",
                  lineHeight: "1.5",
                  color: "#64748b",
                }}
              >
                {description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
