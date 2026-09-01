"use client";

import { useMemo, useState } from "react";

const initialServices = [
  {
    id: "SRV-0001",
    name: "Corporate Travel Management",
    code: "CTM",
    category: "Travel Management",
    description: "Corporate travel management services.",
    status: "Active",
  },
  {
    id: "SRV-0002",
    name: "Air Ticketing",
    code: "AIR",
    category: "Travel Management",
    description: "Domestic and international air ticketing services.",
    status: "Active",
  },
  {
    id: "SRV-0003",
    name: "Hotel Accommodation",
    code: "HOT",
    category: "Accommodation",
    description: "Hotel booking and accommodation services.",
    status: "Active",
  },
];

const categories = [
  "Travel Management",
  "Accommodation",
  "Transport",
  "Visa & Immigration",
  "Meetings & Events",
  "Other",
];

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    category: "",
    description: "",
  });

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const text = search.toLowerCase();

      const matchesSearch =
        !text ||
        service.name.toLowerCase().includes(text) ||
        service.code.toLowerCase().includes(text) ||
        service.id.toLowerCase().includes(text) ||
        service.category.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        service.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All Categories" ||
        service.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [services, search, statusFilter, categoryFilter]);

  const activeCount = services.filter(
    (service) => service.status === "Active"
  ).length;

  const inactiveCount = services.filter(
    (service) => service.status === "Inactive"
  ).length;

  function handleSave() {
    if (!form.name || !form.code || !form.category) {
      alert("Please complete all required fields.");
      return;
    }

    const newService = {
      id: `SRV-${String(services.length + 1).padStart(4, "0")}`,
      name: form.name,
      code: form.code.toUpperCase(),
      category: form.category,
      description: form.description,
      status: "Active",
    };

    setServices((current) => [...current, newService]);

    setForm({
      name: "",
      code: "",
      category: "",
      description: "",
    });

    setShowModal(false);
  }

  function toggleStatus(id) {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? {
              ...service,
              status:
                service.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : service
      )
    );
  }

  function deleteService(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    setServices((current) =>
      current.filter((service) => service.id !== id)
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
      {/* HEADER */}
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
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
            Home / Administration / Master Management / Services
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Services Master
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage services used for tender classification and bid
            preparation.
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
          + Add Service
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
          ["Total Services", services.length],
          ["Active Services", activeCount],
          ["Inactive Services", inactiveCount],
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
            gridTemplateColumns:
              "2fr 1fr 1.2fr",
            gap: "14px",
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by service name, code, ID..."
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
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
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
              <option>All Statuses</option>
            </select>
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
              Category
            </label>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
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
              <option>All Categories</option>

              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SERVICE REGISTER */}
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
            Service Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Maintain standard service classifications used
            across tenders.
          </p>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "0.8fr 1.5fr 0.8fr 1.2fr 2fr 0.8fr 1.1fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Service ID</div>
          <div>Service Name</div>
          <div>Code</div>
          <div>Category</div>
          <div>Description</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filteredServices.length === 0 ? (
          <div
            style={{
              padding: "45px 24px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            No services found.
          </div>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "0.8fr 1.5fr 0.8fr 1.2fr 2fr 0.8fr 1.1fr",
                gap: "12px",
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
                {service.id}
              </div>

              <div
                style={{
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {service.name}
              </div>

              <div>{service.code}</div>

              <div>{service.category}</div>

              <div
                style={{
                  color: "#64748b",
                  lineHeight: "1.4",
                }}
              >
                {service.description}
              </div>

              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background:
                      service.status === "Active"
                        ? "#dcfce7"
                        : "#f1f5f9",
                    color:
                      service.status === "Active"
                        ? "#15803d"
                        : "#64748b",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  {service.status}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    toggleStatus(service.id)
                  }
                  style={{
                    padding: "5px 8px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  {service.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteService(service.id)
                  }
                  style={{
                    padding: "5px 8px",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    background: "#fffafa",
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

      {/* INFORMATION NOTE */}
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
        Services should be maintained as standard reference
        values so tender classification, reporting and proposal
        workflows remain consistent.
      </div>

      {/* ADD SERVICE MODAL */}
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
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              background: "#ffffff",
              borderRadius: "14px",
              boxShadow:
                "0 20px 50px rgba(15,23,42,0.25)",
              overflow: "hidden",
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
              <h2
                style={{
                  margin: 0,
                  fontSize: "19px",
                  color: "#0f172a",
                }}
              >
                Add Service
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ×
              </button>
            </div>

            {/* MODAL BODY */}
            <div style={{ padding: "24px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "14px",
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
                    Service Name *
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Air Ticketing"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border:
                        "1px solid #cbd5e1",
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
                    value={form.code}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        code: e.target.value,
                      })
                    }
                    placeholder="e.g. AIR"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "14px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#475569",
                  }}
                >
                  Category *
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    fontSize: "13px",
                  }}
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: "14px" }}>
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
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe this service..."
                  rows={4}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    resize: "vertical",
                  }}
                />
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: "9px 16px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius: "7px",
                  background: "#ffffff",
                  color: "#334155",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                style={{
                  padding: "9px 16px",
                  border: "none",
                  borderRadius: "7px",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
