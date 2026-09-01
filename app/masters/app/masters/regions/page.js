"use client";

import { useMemo, useState } from "react";

const initialRegions = [
  {
    id: "REG-00001",
    name: "Maharashtra",
    code: "MH",
    country: "India",
    status: "Active",
  },
  {
    id: "REG-00002",
    name: "Delhi NCR",
    code: "DL",
    country: "India",
    status: "Active",
  },
  {
    id: "REG-00003",
    name: "Karnataka",
    code: "KA",
    country: "India",
    status: "Active",
  },
  {
    id: "REG-00004",
    name: "Gujarat",
    code: "GJ",
    country: "India",
    status: "Active",
  },
];

const countries = [
  "India",
  "United Arab Emirates",
  "Saudi Arabia",
  "United Kingdom",
  "United States",
  "Singapore",
];

export default function RegionsPage() {
  const [regions, setRegions] = useState(initialRegions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [countryFilter, setCountryFilter] = useState("All Countries");

  const [showModal, setShowModal] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    country: "",
    status: "Active",
    remarks: "",
  });

  const filteredRegions = useMemo(() => {
    return regions.filter((region) => {
      const text = search.toLowerCase();

      const matchesSearch =
        region.name.toLowerCase().includes(text) ||
        region.code.toLowerCase().includes(text) ||
        region.id.toLowerCase().includes(text) ||
        region.country.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        region.status === statusFilter;

      const matchesCountry =
        countryFilter === "All Countries" ||
        region.country === countryFilter;

      return matchesSearch && matchesStatus && matchesCountry;
    });
  }, [regions, search, statusFilter, countryFilter]);

  const activeCount = regions.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = regions.filter(
    (item) => item.status === "Inactive"
  ).length;

  function openAddModal() {
    setEditingRegion(null);

    setForm({
      name: "",
      code: "",
      country: "",
      status: "Active",
      remarks: "",
    });

    setShowModal(true);
  }

  function openEditModal(region) {
    setEditingRegion(region);

    setForm({
      name: region.name,
      code: region.code,
      country: region.country,
      status: region.status,
      remarks: "",
    });

    setShowModal(true);
  }

  function saveRegion() {
    if (!form.name || !form.code || !form.country) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingRegion) {
      setRegions((current) =>
        current.map((region) =>
          region.id === editingRegion.id
            ? {
                ...region,
                name: form.name,
                code: form.code.toUpperCase(),
                country: form.country,
                status: form.status,
              }
            : region
        )
      );
    } else {
      const newRegion = {
        id: `REG-${String(regions.length + 1).padStart(5, "0")}`,
        name: form.name,
        code: form.code.toUpperCase(),
        country: form.country,
        status: form.status,
      };

      setRegions((current) => [newRegion, ...current]);
    }

    setShowModal(false);
  }

  function toggleStatus(region) {
    setRegions((current) =>
      current.map((item) =>
        item.id === region.id
          ? {
              ...item,
              status:
                item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  }

  function archiveRegion(region) {
    const confirmed = window.confirm(
      `Archive ${region.name}?`
    );

    if (!confirmed) return;

    setRegions((current) =>
      current.filter((item) => item.id !== region.id)
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "24px",
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
            Home / Administration / Master Management / Regions
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Region Master
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage regions and map them to countries for tender
            operations.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          style={{
            padding: "11px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          + Add Region
        </button>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Total Regions", regions.length],
          ["Active Regions", activeCount],
          ["Inactive Regions", inactiveCount],
          [
            "Countries Covered",
            new Set(regions.map((item) => item.country)).size,
          ],
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
              "2fr 1fr 1.3fr auto",
            gap: "12px",
            alignItems: "end",
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
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by region, code, ID, country..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
                outline: "none",
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
                padding: "11px 12px",
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
              Country
            </label>

            <select
              value={countryFilter}
              onChange={(e) =>
                setCountryFilter(e.target.value)
              }
              style={{
                width: "100%",
                padding: "11px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                fontSize: "13px",
              }}
            >
              <option>All Countries</option>

              {countries.map((country) => (
                <option key={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("Active");
              setCountryFilter("All Countries");
            }}
            style={{
              padding: "11px 16px",
              border: "none",
              borderRadius: "8px",
              background: "#f1f5f9",
              color: "#475569",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* REGION TABLE */}
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
            Region Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Maintain regions used by branches and tender
            operations.
          </p>
        </div>

        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1.6fr 1fr 1.5fr 1fr 1.5fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Region ID</div>
          <div>Region Name</div>
          <div>Code</div>
          <div>Country</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filteredRegions.length === 0 ? (
          <div
            style={{
              padding: "50px 24px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            No regions found.
          </div>
        ) : (
          filteredRegions.map((region) => (
            <div
              key={region.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1.6fr 1fr 1.5fr 1fr 1.5fr",
                gap: "12px",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: "1px solid #e2e8f0",
                fontSize: "13px",
                color: "#0f172a",
              }}
            >
              <div
                style={{
                  color: "#64748b",
                  fontFamily: "monospace",
                  fontSize: "12px",
                }}
              >
                {region.id}
              </div>

              <div
                style={{
                  fontWeight: "600",
                }}
              >
                {region.name}
              </div>

              <div>{region.code}</div>

              <div>{region.country}</div>

              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: "999px",
                    background:
                      region.status === "Active"
                        ? "#dcfce7"
                        : "#f1f5f9",
                    color:
                      region.status === "Active"
                        ? "#15803d"
                        : "#64748b",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  {region.status.toUpperCase()}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    openEditModal(region)
                  }
                  style={{
                    padding: "6px 10px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toggleStatus(region)
                  }
                  style={{
                    padding: "6px 10px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#f1f5f9",
                    color: "#475569",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  {region.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    archiveRegion(region)
                  }
                  style={{
                    padding: "6px 10px",
                    border: "1px solid #fecaca",
                    borderRadius: "6px",
                    background: "#fffafa",
                    color: "#dc2626",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Archive
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SYSTEM NOTE */}
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
        Regions should be maintained centrally and mapped to
        countries before branches are created.
      </div>

      {/* ADD / EDIT MODAL */}
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
              maxWidth: "620px",
              background: "#ffffff",
              borderRadius: "14px",
              padding: "26px",
              boxSizing: "border-box",
              boxShadow:
                "0 20px 50px rgba(15,23,42,0.2)",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "22px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  color: "#0f172a",
                }}
              >
                {editingRegion
                  ? "Edit Region"
                  : "Add Region"}
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
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
                    color: "#334155",
                  }}
                >
                  Region Name *
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Maharashtra"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px 12px",
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
                    color: "#334155",
                  }}
                >
                  Region Code *
                </label>

                <input
                  value={form.code}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      code: e.target.value,
                    })
                  }
                  placeholder="e.g. MH"
                  maxLength={10}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    textTransform: "uppercase",
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
                    color: "#334155",
                  }}
                >
                  Country *
                </label>

                <select
                  value={form.country}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      country: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "11px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    fontSize: "13px",
                  }}
                >
                  <option value="">
                    Select country
                  </option>

                  {countries.map((country) => (
                    <option
                      key={country}
                      value={country}
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Status *
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "11px 12px",
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

              <div
                style={{
                  gridColumn: "1 / -1",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Remarks
                </label>

                <textarea
                  value={form.remarks}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      remarks: e.target.value,
                    })
                  }
                  placeholder="Internal notes or governance remarks"
                  rows={3}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                    resize: "vertical",
                  }}
                />
              </div>
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
                onClick={() => setShowModal(false)}
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
                type="button"
                onClick={saveRegion}
                style={{
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {editingRegion
                  ? "Save Changes"
                  : "Save Region"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
