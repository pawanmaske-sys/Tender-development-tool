"use client";

import { useMemo, useState } from "react";

const initialSources = [
  {
    id: "SRC-0001",
    name: "Government Tender Portal",
    code: "GOVT",
    type: "Government Portal",
    website: "",
    description: "Government and public-sector tender opportunities.",
    status: "Active",
  },
  {
    id: "SRC-0002",
    name: "Corporate Portal",
    code: "CORP",
    type: "Corporate Portal",
    website: "",
    description: "Corporate and private-sector tender opportunities.",
    status: "Active",
  },
  {
    id: "SRC-0003",
    name: "Email Invitation",
    code: "EMAIL",
    type: "Email",
    website: "",
    description: "Tender opportunities received directly by email.",
    status: "Active",
  },
  {
    id: "SRC-0004",
    name: "Direct Client",
    code: "DIRECT",
    type: "Direct",
    website: "",
    description: "Tender opportunities received directly from clients.",
    status: "Active",
  },
  {
    id: "SRC-0005",
    name: "Other",
    code: "OTHER",
    type: "Other",
    website: "",
    description: "Other tender opportunity sources.",
    status: "Active",
  },
];

export default function TenderSourcesPage() {
  const [sources, setSources] = useState(initialSources);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "Government Portal",
    website: "",
    description: "",
    status: "Active",
  });

  const filteredSources = useMemo(() => {
    return sources.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.code.toLowerCase().includes(searchText) ||
        item.id.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [sources, search, statusFilter]);

  const activeCount = sources.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = sources.filter(
    (item) => item.status === "Inactive"
  ).length;

  function handleFormChange(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleAddSource(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.code.trim()) {
      alert("Source Name and Code are required.");
      return;
    }

    const duplicate = sources.some(
      (item) =>
        item.name.toLowerCase() ===
          form.name.trim().toLowerCase() ||
        item.code.toLowerCase() ===
          form.code.trim().toLowerCase()
    );

    if (duplicate) {
      alert("Source Name or Code already exists.");
      return;
    }

    const newSource = {
      id: `SRC-${String(sources.length + 1).padStart(4, "0")}`,
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      type: form.type,
      website: form.website.trim(),
      description: form.description.trim(),
      status: form.status,
    };

    setSources((previous) => [
      ...previous,
      newSource,
    ]);

    setForm({
      name: "",
      code: "",
      type: "Government Portal",
      website: "",
      description: "",
      status: "Active",
    });

    setShowModal(false);
  }

  function toggleStatus(id) {
    setSources((previous) =>
      previous.map((item) =>
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

  function deleteSource(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this tender source?"
    );

    if (!confirmed) return;

    setSources((previous) =>
      previous.filter((item) => item.id !== id)
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
      {/* PAGE HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          marginBottom: "24px",
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
            Home / Administration / Master Management / Tender Sources
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Tender Sources Master
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage portals and other sources from which tender
            opportunities are received.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{
            padding: "11px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Add Source
        </button>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Total Sources", sources.length],
          ["Active Sources", activeCount],
          ["Inactive Sources", inactiveCount],
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

      {/* FILTERS */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by source name, code or ID..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#334155",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#334155",
                fontSize: "13px",
              }}
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>All Statuses</option>
            </select>
          </div>
        </div>
      </div>

      {/* REGISTER */}
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
            Tender Source Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Maintain controlled tender opportunity sources.
          </p>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "0.8fr 1.4fr 0.8fr 1.2fr 1.8fr 0.8fr 1.4fr",
            gap: "10px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>ID</div>
          <div>Source Name</div>
          <div>Code</div>
          <div>Type</div>
          <div>Description</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filteredSources.length === 0 ? (
          <div
            style={{
              padding: "40px 24px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            No tender sources found.
          </div>
        ) : (
          filteredSources.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "0.8fr 1.4fr 0.8fr 1.2fr 1.8fr 0.8fr 1.4fr",
                gap: "10px",
                padding: "17px 24px",
                borderBottom: "1px solid #e2e8f0",
                alignItems: "center",
                fontSize: "13px",
                color: "#334155",
              }}
            >
              <div
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                }}
              >
                {item.id}
              </div>

              <div
                style={{
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {item.name}
              </div>

              <div>{item.code}</div>

              <div>{item.type}</div>

              <div
                style={{
                  color: "#64748b",
                }}
              >
                {item.description}
              </div>

              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background:
                      item.status === "Active"
                        ? "#dcfce7"
                        : "#f1f5f9",
                    color:
                      item.status === "Active"
                        ? "#15803d"
                        : "#64748b",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  {item.status}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    toggleStatus(item.id)
                  }
                  style={{
                    padding: "6px 8px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  {item.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteSource(item.id)
                  }
                  style={{
                    padding: "6px 8px",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#dc2626",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* NOTE */}
      <div
        style={{
          marginTop: "20px",
          padding: "16px 20px",
          borderRadius: "10px",
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e40af",
          fontSize: "13px",
          lineHeight: "1.5",
        }}
      >
        Tender sources should be maintained centrally so that
        opportunities can be consistently classified and reported
        across the tender lifecycle.
      </div>

      {/* ADD SOURCE MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              background: "#ffffff",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow:
                "0 20px 50px rgba(15,23,42,.2)",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                  Add Tender Source
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Add a new source for tender opportunities.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "22px",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleAddSource}
              style={{
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    Source Name *
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      handleFormChange(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Government Tender Portal"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#475569",
                    }}
                  >
                    Code *
                  </label>

                  <input
                    required
                    value={form.code}
                    onChange={(event) =>
                      handleFormChange(
                        "code",
                        event.target.value
                      )
                    }
                    placeholder="e.g. GOVT"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Source Type
                </label>

                <select
                  value={form.type}
                  onChange={(event) =>
                    handleFormChange(
                      "type",
                      event.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    fontSize: "13px",
                  }}
                >
                  <option>Government Portal</option>
                  <option>Corporate Portal</option>
                  <option>Email</option>
                  <option>Direct</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Website
                </label>

                <input
                  value={form.website}
                  onChange={(event) =>
                    handleFormChange(
                      "website",
                      event.target.value
                    )
                  }
                  placeholder="https://example.com"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    handleFormChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe this tender source..."
                  rows={3}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(event) =>
                    handleFormChange(
                      "status",
                      event.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    fontSize: "13px",
                  }}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              {/* MODAL ACTIONS */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "24px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  style={{
                    padding: "10px 16px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "13px",
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
                    borderRadius: "8px",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Save Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
