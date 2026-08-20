"use client";

import { useMemo, useState } from "react";

const tenders = [
  {
    id: "T-05621",
    client: "ABC Ltd",
    branch: "Pune",
    assigned: "Rahul",
    deadline: "22 Aug 2026",
    amount: 1250000,
    status: "In Process",
    result: "-",
    category: "IT Services",
  },
  {
    id: "T-05622",
    client: "XYZ Corporation",
    branch: "Mumbai",
    assigned: "Pawan",
    deadline: "24 Aug 2026",
    amount: 2800000,
    status: "Submitted",
    result: "-",
    category: "Infrastructure",
  },
  {
    id: "T-05623",
    client: "Global Tech",
    branch: "Delhi",
    assigned: "Amit",
    deadline: "26 Aug 2026",
    amount: 1750000,
    status: "Won",
    result: "Won",
    category: "IT Services",
  },
  {
    id: "T-05624",
    client: "Metro Solutions",
    branch: "Pune",
    assigned: "Rahul",
    deadline: "28 Aug 2026",
    amount: 950000,
    status: "Result Awaited",
    result: "Pending",
    category: "Consulting",
  },
  {
    id: "T-05625",
    client: "Prime Industries",
    branch: "Bangalore",
    assigned: "Neha",
    deadline: "30 Aug 2026",
    amount: 3200000,
    status: "On Hold",
    result: "Pending",
    category: "Infrastructure",
  },
  {
    id: "T-05626",
    client: "Sunrise Group",
    branch: "Mumbai",
    assigned: "Pawan",
    deadline: "02 Sep 2026",
    amount: 2100000,
    status: "Lost",
    result: "Lost",
    category: "IT Services",
  },
  {
    id: "T-05627",
    client: "National Systems",
    branch: "Delhi",
    assigned: "Amit",
    deadline: "05 Sep 2026",
    amount: 1450000,
    status: "Submitted",
    result: "-",
    category: "Consulting",
  },
  {
    id: "T-05628",
    client: "Smart Solutions",
    branch: "Pune",
    assigned: "Neha",
    deadline: "08 Sep 2026",
    amount: 1850000,
    status: "In Process",
    result: "-",
    category: "Infrastructure",
  },
];

const statusOptions = [
  "All Status",
  "Submitted",
  "In Process",
  "Won",
  "Result Awaited",
  "On Hold",
  "Lost",
];

const branchOptions = [
  "All Branches",
  "Pune",
  "Mumbai",
  "Delhi",
  "Bangalore",
];

const categoryOptions = [
  "All Categories",
  "IT Services",
  "Infrastructure",
  "Consulting",
];

function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatusBadge({ status }) {
  const styles = {
    Submitted: {
      background: "#eef2ff",
      color: "#4f46e5",
    },
    "In Process": {
      background: "#fff7ed",
      color: "#ea580c",
    },
    Won: {
      background: "#ecfdf5",
      color: "#059669",
    },
    "Result Awaited": {
      background: "#fffbeb",
      color: "#d97706",
    },
    "On Hold": {
      background: "#f5f3ff",
      color: "#7c3aed",
    },
    Lost: {
      background: "#fef2f2",
      color: "#dc2626",
    },
  };

  const style = styles[status] || {
    background: "#f3f4f6",
    color: "#374151",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        background: style.background,
        color: style.color,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

export default function AllTendersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [branch, setBranch] = useState("All Branches");
  const [category, setCategory] = useState("All Categories");

  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        tender.id.toLowerCase().includes(searchText) ||
        tender.client.toLowerCase().includes(searchText) ||
        tender.assigned.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "All Status" || tender.status === status;

      const matchesBranch =
        branch === "All Branches" || tender.branch === branch;

      const matchesCategory =
        category === "All Categories" || tender.category === category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesBranch &&
        matchesCategory
      );
    });
  }, [search, status, branch, category]);

  const resetFilters = () => {
    setSearch("");
    setStatus("All Status");
    setBranch("All Branches");
    setCategory("All Categories");
  };

  const totalAmount = filteredTenders.reduce(
    (total, tender) => total + tender.amount,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "28px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        color: "#172033",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              color: "#7b8497",
              marginBottom: "6px",
            }}
          >
            Home / Tenders / All Tenders
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
              color: "#172033",
            }}
          >
            All Tenders
          </h1>

          <p
            style={{
              margin: "7px 0 0",
              color: "#7b8497",
              fontSize: "14px",
            }}
          >
            View and manage all tender opportunities.
          </p>
        </div>

        <button
          style={{
            border: "none",
            background: "#2563eb",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => alert("New Tender form will be added later.")}
        >
          + New Tender
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <SummaryCard
          title="Total Tenders"
          value={filteredTenders.length}
          subtitle="Matching current filters"
        />

        <SummaryCard
          title="Potential Amount"
          value={formatAmount(totalAmount)}
          subtitle="Total potential value"
        />

        <SummaryCard
          title="Showing"
          value={`${filteredTenders.length} Records`}
          subtitle={`Out of ${tenders.length} demo records`}
        />
      </div>

      {/* FILTER AREA */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e9f0",
          borderRadius: "12px",
          padding: "18px",
          marginBottom: "20px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search Tender ID, Client or Assignee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          {/* BRANCH */}
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            style={inputStyle}
          >
            {branchOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            {categoryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          {/* RESET */}
          <button
            onClick={resetFilters}
            style={{
              border: "1px solid #dfe4ec",
              background: "#fff",
              color: "#4b5563",
              padding: "10px 15px",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e9f0",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid #e9edf3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                fontWeight: "700",
              }}
            >
              Tender List
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "12px",
                color: "#8a93a5",
              }}
            >
              {filteredTenders.length} tender(s) found
            </p>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1050px",
            }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {[
                  "Tender ID",
                  "Client",
                  "Branch",
                  "Assigned To",
                  "Deadline",
                  "Potential Amount",
                  "Category",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#687386",
                      borderBottom: "1px solid #e9edf3",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredTenders.length > 0 ? (
                filteredTenders.map((tender) => (
                  <tr key={tender.id}>
                    <td style={cellStyle}>
                      <span
                        style={{
                          color: "#2563eb",
                          fontWeight: "700",
                        }}
                      >
                        {tender.id}
                      </span>
                    </td>

                    <td style={cellStyle}>
                      <div style={{ fontWeight: "600" }}>
                        {tender.client}
                      </div>
                    </td>

                    <td style={cellStyle}>{tender.branch}</td>

                    <td style={cellStyle}>{tender.assigned}</td>

                    <td style={cellStyle}>{tender.deadline}</td>

                    <td
                      style={{
                        ...cellStyle,
                        fontWeight: "600",
                      }}
                    >
                      {formatAmount(tender.amount)}
                    </td>

                    <td style={cellStyle}>{tender.category}</td>

                    <td style={cellStyle}>
                      <StatusBadge status={tender.status} />
                    </td>

                    <td style={cellStyle}>
                      <button
                        onClick={() =>
                          alert(`Viewing ${tender.id}`)
                        }
                        style={{
                          border: "1px solid #dbe3ef",
                          background: "#fff",
                          color: "#2563eb",
                          padding: "7px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "50px 20px",
                      color: "#7b8497",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "32px",
                        marginBottom: "10px",
                      }}
                    >
                      🔍
                    </div>

                    <div
                      style={{
                        fontWeight: "700",
                        color: "#374151",
                        marginBottom: "5px",
                      }}
                    >
                      No tenders found
                    </div>

                    <div style={{ fontSize: "13px" }}>
                      Try changing your search or filters.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* NOTE */}
      <div
        style={{
          marginTop: "16px",
          fontSize: "12px",
          color: "#8a93a5",
        }}
      >
        Demo data is currently being used. Database integration will be added
        in a later module.
      </div>
    </div>
  );
}

function SummaryCard({ title, value, subtitle }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e9f0",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#7b8497",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#172033",
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: "5px",
          fontSize: "11px",
          color: "#9aa3b2",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #dfe4ec",
  background: "#fff",
  color: "#374151",
  padding: "10px 12px",
  borderRadius: "7px",
  fontSize: "13px",
  outline: "none",
};

const cellStyle = {
  padding: "15px 16px",
  fontSize: "13px",
  color: "#4b5563",
  borderBottom: "1px solid #edf0f4",
  whiteSpace: "nowrap",
};
