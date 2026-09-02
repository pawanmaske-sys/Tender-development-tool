"use client";

import { useState } from "react";

const initialReasons = [
  {
    id: 1,
    name: "Price Not Competitive",
    description: "Submitted price was not competitive.",
    status: "Active",
  },
  {
    id: 2,
    name: "Technical Requirements Not Met",
    description: "Proposal did not meet the required technical criteria.",
    status: "Active",
  },
  {
    id: 3,
    name: "Lost to Competitor",
    description: "Tender was awarded to a competing bidder.",
    status: "Active",
  },
  {
    id: 4,
    name: "Customer Cancelled Tender",
    description: "Customer cancelled or withdrew the tender.",
    status: "Active",
  },
  {
    id: 5,
    name: "Scope Not Suitable",
    description: "Final scope was not suitable for the organisation.",
    status: "Active",
  },
  {
    id: 6,
    name: "Commercial Terms Not Acceptable",
    description: "Commercial terms were not acceptable.",
    status: "Active",
  },
  {
    id: 7,
    name: "Compliance Requirements Not Met",
    description: "Mandatory compliance requirements were not fulfilled.",
    status: "Active",
  },
  {
    id: 8,
    name: "Tender Withdrawn",
    description: "Tender opportunity was withdrawn before award.",
    status: "Active",
  },
];

export default function LossReasonsPage() {
  const [reasons, setReasons] = useState(initialReasons);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [newReason, setNewReason] = useState({
    name: "",
    description: "",
  });

  const filteredReasons = reasons.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeCount = reasons.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = reasons.filter(
    (item) => item.status === "Inactive"
  ).length;

  function handleAddReason(e) {
    e.preventDefault();

    if (!newReason.name.trim()) {
      return;
    }

    const newItem = {
      id: Date.now(),
      name: newReason.name.trim(),
      description:
        newReason.description.trim() ||
        "Tender loss reason",
      status: "Active",
    };

    setReasons([...reasons, newItem]);

    setNewReason({
      name: "",
      description: "",
    });

    setShowModal(false);
  }

  function toggleStatus(id) {
    setReasons(
      reasons.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : item
      )
    );
  }

  function deleteReason(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this loss reason?"
    );

    if (!confirmed) return;

    setReasons(
      reasons.filter((item) => item.id !== id)
    );
  }

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "28px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              color: "#64748b",
              marginBottom: "6px",
            }}
          >
            Home / Administration / Masters / Loss Reasons
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Loss Reasons
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage standard reasons for unsuccessful tender
            outcomes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{
            border: "none",
            borderRadius: "8px",
            padding: "11px 18px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Add Loss Reason
        </button>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "22px",
        }}
      >
        <div style={cardStyle}>
          <div style={cardLabelStyle}>
            Total Loss Reasons
          </div>

          <div style={cardNumberStyle}>
            {reasons.length}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={cardLabelStyle}>
            Active
          </div>

          <div
            style={{
              ...cardNumberStyle,
              color: "#15803d",
            }}
          >
            {activeCount}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={cardLabelStyle}>
            Inactive
          </div>

          <div
            style={{
              ...cardNumberStyle,
              color: "#dc2626",
            }}
          >
            {inactiveCount}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #dbe3ef",
          borderRadius: "12px",
          padding: "18px",
          marginBottom: "18px",
          display: "flex",
          gap: "12px",
        }}
      >
        <input
          type="text"
          placeholder="Search loss reasons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "11px 13px",
            border: "1px solid #cbd5e1",
            borderRadius: "7px",
            fontSize: "13px",
            outline: "none",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          style={{
            width: "160px",
            padding: "11px 13px",
            border: "1px solid #cbd5e1",
            borderRadius: "7px",
            fontSize: "13px",
            background: "#ffffff",
          }}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #dbe3ef",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "17px",
              color: "#0f172a",
            }}
          >
            Loss Reason Register
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Controlled reasons available for recording
            unsuccessful tender outcomes.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                }}
              >
                <th style={headerStyle}>
                  Loss Reason
                </th>

                <th style={headerStyle}>
                  Description
                </th>

                <th style={headerStyle}>
                  Status
                </th>

                <th
                  style={{
                    ...headerStyle,
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredReasons.map((item) => (
                <tr key={item.id}>
                  <td style={cellStyle}>
                    <strong
                      style={{
                        color: "#0f172a",
                        fontSize: "13px",
                      }}
                    >
                      {item.name}
                    </strong>
                  </td>

                  <td
                    style={{
                      ...cellStyle,
                      color: "#64748b",
                    }}
                  >
                    {item.description}
                  </td>

                  <td style={cellStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "5px 10px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: "600",
                        background:
                          item.status === "Active"
                            ? "#dcfce7"
                            : "#fee2e2",
                        color:
                          item.status === "Active"
                            ? "#15803d"
                            : "#b91c1c",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td
                    style={{
                      ...cellStyle,
                      textAlign: "right",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        toggleStatus(item.id)
                      }
                      style={actionButtonStyle}
                    >
                      {item.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteReason(item.id)
                      }
                      style={{
                        ...actionButtonStyle,
                        color: "#dc2626",
                        marginLeft: "8px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredReasons.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#64748b",
                      fontSize: "13px",
                    }}
                  >
                    No loss reasons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "480px",
              background: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  color: "#0f172a",
                }}
              >
                Add Loss Reason
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddReason}>
              <label style={labelStyle}>
                Loss Reason
              </label>

              <input
                type="text"
                placeholder="e.g. Price Not Competitive"
                value={newReason.name}
                onChange={(e) =>
                  setNewReason({
                    ...newReason,
                    name: e.target.value,
                  })
                }
                style={inputStyle}
                required
              />

              <label style={labelStyle}>
                Description
              </label>

              <textarea
                placeholder="Enter description"
                value={newReason.description}
                onChange={(e) =>
                  setNewReason({
                    ...newReason,
                    description: e.target.value,
                  })
                }
                rows="4"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 16px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "7px",
                    background: "#ffffff",
                    color: "#475569",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "7px",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Save Loss Reason
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #dbe3ef",
  borderRadius: "12px",
  padding: "20px",
};

const cardLabelStyle = {
  color: "#64748b",
  fontSize: "13px",
  marginBottom: "8px",
};

const cardNumberStyle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#0f172a",
};

const headerStyle = {
  padding: "13px 16px",
  textAlign: "left",
  fontSize: "11px",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  borderBottom: "1px solid #e2e8f0",
};

const cellStyle = {
  padding: "15px 16px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "13px",
};

const actionButtonStyle = {
  border: "none",
  background: "transparent",
  color: "#2563eb",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  marginTop: "14px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#334155",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "7px",
  fontSize: "13px",
  outline: "none",
};
