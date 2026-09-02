"use client";

import { useState } from "react";

const initialStatuses = [
  {
    id: 1,
    name: "Draft",
    description: "Tender record is being prepared.",
    status: "Active",
  },
  {
    id: 2,
    name: "New",
    description: "New tender opportunity received.",
    status: "Active",
  },
  {
    id: 3,
    name: "Qualification",
    description: "Tender is under initial qualification.",
    status: "Active",
  },
  {
    id: 4,
    name: "Evaluation",
    description: "Tender is under evaluation and decision.",
    status: "Active",
  },
  {
    id: 5,
    name: "On Hold",
    description: "Tender is temporarily placed on hold.",
    status: "Active",
  },
  {
    id: 6,
    name: "Submitted",
    description: "Bid or proposal has been submitted.",
    status: "Active",
  },
  {
    id: 7,
    name: "Post-Submission",
    description: "Tender is being managed after submission.",
    status: "Active",
  },
  {
    id: 8,
    name: "Result Awaited",
    description: "Waiting for the tender result.",
    status: "Active",
  },
  {
    id: 9,
    name: "Awarded",
    description: "Tender has been awarded successfully.",
    status: "Active",
  },
  {
    id: 10,
    name: "Lost",
    description: "Tender was unsuccessful.",
    status: "Active",
  },
  {
    id: 11,
    name: "Cancelled",
    description: "Tender has been cancelled.",
    status: "Active",
  },
];

export default function TenderStatusPage() {
  const [statuses, setStatuses] = useState(initialStatuses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [newStatus, setNewStatus] = useState({
    name: "",
    description: "",
  });

  const filteredStatuses = statuses.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeCount = statuses.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = statuses.filter(
    (item) => item.status === "Inactive"
  ).length;

  function handleAddStatus(e) {
    e.preventDefault();

    if (!newStatus.name.trim()) {
      return;
    }

    const newItem = {
      id: Date.now(),
      name: newStatus.name.trim(),
      description:
        newStatus.description.trim() || "Tender status",
      status: "Active",
    };

    setStatuses([...statuses, newItem]);

    setNewStatus({
      name: "",
      description: "",
    });

    setShowModal(false);
  }

  function toggleStatus(id) {
    setStatuses(
      statuses.map((item) =>
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

  function deleteStatus(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tender status?"
    );

    if (!confirmed) return;

    setStatuses(
      statuses.filter((item) => item.id !== id)
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
            Home / Administration / Masters / Tender Status
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Tender Status
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage controlled statuses used throughout the tender
            lifecycle.
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
          + Add Tender Status
        </button>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "22px",
        }}
      >
        <div style={cardStyle}>
          <div style={cardLabelStyle}>
            Total Statuses
          </div>

          <div style={cardNumberStyle}>
            {statuses.length}
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
          placeholder="Search tender statuses..."
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
          onChange={(e) => setStatusFilter(e.target.value)}
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
            Tender Status Register
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Controlled values available for tender lifecycle
            management.
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
                  Tender Status
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
              {filteredStatuses.map((item) => (
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
                        deleteStatus(item.id)
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

              {filteredStatuses.length === 0 && (
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
                    No tender statuses found.
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
                Add Tender Status
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

            <form onSubmit={handleAddStatus}>
              <label style={labelStyle}>
                Tender Status
              </label>

              <input
                type="text"
                placeholder="e.g. Under Review"
                value={newStatus.name}
                onChange={(e) =>
                  setNewStatus({
                    ...newStatus,
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
                value={newStatus.description}
                onChange={(e) =>
                  setNewStatus({
                    ...newStatus,
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
                  Save Tender Status
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
