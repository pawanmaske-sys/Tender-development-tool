"use client";

import { useMemo, useState } from "react";

const initialEntities = [
  {
    id: "LE-00001",
    name: "Satguru Travel Pvt. Ltd.",
    code: "STPL",
    country: "India",
    region: "India Region",
    currency: "INR",
    address: "Mumbai, Maharashtra, India",
    email: "info@example.com",
    phone: "+91",
    status: "Active",
    remarks: "",
  },
  {
    id: "LE-00002",
    name: "Satguru Travel Limited",
    code: "STL",
    country: "United Kingdom",
    region: "Europe Region",
    currency: "GBP",
    address: "London, United Kingdom",
    email: "info@example.com",
    phone: "+44",
    status: "Active",
    remarks: "",
  },
];

const emptyForm = {
  name: "",
  code: "",
  country: "",
  region: "",
  currency: "",
  address: "",
  email: "",
  phone: "",
  status: "Active",
  remarks: "",
};

const countries = [
  "India",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "Nigeria",
  "Kenya",
  "South Africa",
  "Egypt",
  "Ethiopia",
  "Tanzania",
];

const regions = [
  "India Region",
  "Europe Region",
  "Middle East Region",
  "Africa Region",
  "Asia Region",
];

const currencies = [
  "INR",
  "GBP",
  "AED",
  "SAR",
  "NGN",
  "KES",
  "ZAR",
  "EGP",
  "ETB",
  "TZS",
];

export default function LegalEntitiesPage() {
  const [entities, setEntities] = useState(initialEntities);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [countryFilter, setCountryFilter] = useState("All Countries");

  const [showModal, setShowModal] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {
      const text = search.toLowerCase();

      const matchesSearch =
        entity.name.toLowerCase().includes(text) ||
        entity.code.toLowerCase().includes(text) ||
        entity.id.toLowerCase().includes(text) ||
        entity.country.toLowerCase().includes(text) ||
        entity.region.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        entity.status === statusFilter;

      const matchesCountry =
        countryFilter === "All Countries" ||
        entity.country === countryFilter;

      return matchesSearch && matchesStatus && matchesCountry;
    });
  }, [entities, search, statusFilter, countryFilter]);

  const totalEntities = entities.length;

  const activeEntities = entities.filter(
    (entity) => entity.status === "Active"
  ).length;

  const inactiveEntities = entities.filter(
    (entity) => entity.status === "Inactive"
  ).length;

  const countriesCovered = new Set(
    entities.map((entity) => entity.country)
  ).size;

  function openAddModal() {
    setEditingEntity(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(entity) {
    setEditingEntity(entity);
    setForm({
      name: entity.name,
      code: entity.code,
      country: entity.country,
      region: entity.region,
      currency: entity.currency,
      address: entity.address,
      email: entity.email,
      phone: entity.phone,
      status: entity.status,
      remarks: entity.remarks,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingEntity(null);
    setForm(emptyForm);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function saveEntity(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.code.trim() || !form.country) {
      alert("Please enter Legal Entity Name, Code and Country.");
      return;
    }

    if (editingEntity) {
      setEntities((current) =>
        current.map((entity) =>
          entity.id === editingEntity.id
            ? {
                ...entity,
                ...form,
              }
            : entity
        )
      );
    } else {
      const newEntity = {
        id: `LE-${String(entities.length + 1).padStart(5, "0")}`,
        ...form,
      };

      setEntities((current) => [newEntity, ...current]);
    }

    closeModal();
  }

  function toggleStatus(entity) {
    const newStatus =
      entity.status === "Active" ? "Inactive" : "Active";

    setEntities((current) =>
      current.map((item) =>
        item.id === entity.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  }

  function archiveEntity(entity) {
    const confirmed = window.confirm(
      `Archive ${entity.name}?`
    );

    if (!confirmed) return;

    setEntities((current) =>
      current.map((item) =>
        item.id === entity.id
          ? {
              ...item,
              status: "Archived",
            }
          : item
      )
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
          marginBottom: "24px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
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
            Home / Administration / Master Management / Legal Entities
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Legal Entity Master
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Manage legal entities used for tender participation,
            proposals and commercial records.
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
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Add Legal Entity
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
          ["Total Entities", totalEntities],
          ["Active Entities", activeEntities],
          ["Inactive Entities", inactiveEntities],
          ["Countries Covered", countriesCovered],
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
              "2fr 1fr 1fr",
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
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, code, ID, country or region..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 12px",
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
              onChange={(event) =>
                setStatusFilter(event.target.value)
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
              <option>Archived</option>
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
              onChange={(event) =>
                setCountryFilter(event.target.value)
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
              <option>All Countries</option>

              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
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
            Legal Entity Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Maintain approved legal entities available for
            tender participation.
          </p>
        </div>

        {/* TABLE */}
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <div
            style={{
              minWidth: "1050px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "0.8fr 1.7fr 0.8fr 1fr 1fr 0.8fr 0.8fr 1.1fr",
                gap: "10px",
                padding: "14px 24px",
                background: "#f8fafc",
                borderBottom:
                  "1px solid #e2e8f0",
                fontSize: "12px",
                fontWeight: "600",
                color: "#64748b",
              }}
            >
              <div>ID</div>
              <div>Legal Entity</div>
              <div>Code</div>
              <div>Country</div>
              <div>Region</div>
              <div>Currency</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {filteredEntities.length === 0 ? (
              <div
                style={{
                  padding: "50px 24px",
                  textAlign: "center",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                No legal entities found.
              </div>
            ) : (
              filteredEntities.map((entity) => (
                <div
                  key={entity.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "0.8fr 1.7fr 0.8fr 1fr 1fr 0.8fr 0.8fr 1.1fr",
                    gap: "10px",
                    alignItems: "center",
                    padding: "17px 24px",
                    borderBottom:
                      "1px solid #e2e8f0",
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
                    {entity.id}
                  </div>

                  <div
                    style={{
                      fontWeight: "600",
                      color: "#0f172a",
                    }}
                  >
                    {entity.name}
                  </div>

                  <div>{entity.code}</div>

                  <div>{entity.country}</div>

                  <div
                    style={{
                      color: "#475569",
                    }}
                  >
                    {entity.region}
                  </div>

                  <div>{entity.currency}</div>

                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "5px 9px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: "600",
                        background:
                          entity.status === "Active"
                            ? "#dcfce7"
                            : entity.status ===
                              "Inactive"
                            ? "#fef3c7"
                            : "#e2e8f0",
                        color:
                          entity.status === "Active"
                            ? "#15803d"
                            : entity.status ===
                              "Inactive"
                            ? "#92400e"
                            : "#475569",
                      }}
                    >
                      {entity.status.toUpperCase()}
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
                        openEditModal(entity)
                      }
                      style={{
                        border:
                          "1px solid #cbd5e1",
                        background: "#ffffff",
                        color: "#334155",
                        borderRadius: "6px",
                        padding: "6px 8px",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleStatus(entity)
                      }
                      style={{
                        border: "none",
                        background:
                          entity.status === "Active"
                            ? "#fff7ed"
                            : "#eff6ff",
                        color:
                          entity.status === "Active"
                            ? "#c2410c"
                            : "#1d4ed8",
                        borderRadius: "6px",
                        padding: "6px 8px",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      {entity.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        archiveEntity(entity)
                      }
                      style={{
                        border: "none",
                        background: "#fef2f2",
                        color: "#dc2626",
                        borderRadius: "6px",
                        padding: "6px 8px",
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
        </div>
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
          lineHeight: "1.5",
        }}
      >
        Legal entities should be maintained centrally and
        linked with the relevant country, region, currency
        and branch records before they are used for tender
        participation.
      </div>

      {/* MODAL */}
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
              maxWidth: "720px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "14px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom:
                  "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "19px",
                    color: "#0f172a",
                  }}
                >
                  {editingEntity
                    ? "Edit Legal Entity"
                    : "Add Legal Entity"}
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  Maintain legal entity information for
                  tender operations.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "22px",
                  color: "#475569",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={saveEntity}>
              <div
                style={{
                  padding: "24px",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={labelStyle}
                  >
                    Legal Entity Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter legal entity name"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={labelStyle}
                  >
                    Entity Code *
                  </label>

                  <input
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    placeholder="e.g. STPL"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={labelStyle}
                  >
                    Country *
                  </label>

                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    style={inputStyle}
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
                    style={labelStyle}
                  >
                    Region
                  </label>

                  <select
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">
                      Select region
                    </option>

                    {regions.map((region) => (
                      <option
                        key={region}
                        value={region}
                      >
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={labelStyle}
                  >
                    Currency
                  </label>

                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">
                      Select currency
                    </option>

                    {currencies.map((currency) => (
                      <option
                        key={currency}
                        value={currency}
                      >
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={labelStyle}
                  >
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Archived</option>
                  </select>
                </div>

                <div
                  style={{
                    gridColumn: "1 / -1",
                  }}
                >
                  <label
                    style={labelStyle}
                  >
                    Registered Address
                  </label>

                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Full registered address"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={labelStyle}
                  >
                    Contact Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    style={labelStyle}
                  >
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91..."
                    style={inputStyle}
                  />
                </div>

                <div
                  style={{
                    gridColumn: "1 / -1",
                  }}
                >
                  <label
                    style={labelStyle}
                  >
                    Remarks
                  </label>

                  <textarea
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    placeholder="Internal notes, exceptions or governance remarks"
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                  />
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div
                style={{
                  padding: "16px 24px",
                  borderTop:
                    "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: "10px 16px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#334155",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "10px 18px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {editingEntity
                    ? "Update Entity"
                    : "Save Entity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#475569",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#ffffff",
  color: "#334155",
  fontSize: "13px",
  outline: "none",
};
