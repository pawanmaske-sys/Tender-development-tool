"use client";

import { useMemo, useState } from "react";

const initialCountries = [
  {
    id: "CNT-00001",
    name: "India",
    iso2: "IN",
    iso3: "IND",
    dialCode: "+91",
    continent: "Asia",
    subContinent: "South Asia",
    presence: true,
    status: "Active",
  },
  {
    id: "CNT-00002",
    name: "United Arab Emirates",
    iso2: "AE",
    iso3: "ARE",
    dialCode: "+971",
    continent: "Asia",
    subContinent: "Western Asia",
    presence: true,
    status: "Active",
  },
  {
    id: "CNT-00003",
    name: "Saudi Arabia",
    iso2: "SA",
    iso3: "SAU",
    dialCode: "+966",
    continent: "Asia",
    subContinent: "Western Asia",
    presence: false,
    status: "Active",
  },
  {
    id: "CNT-00004",
    name: "United Kingdom",
    iso2: "GB",
    iso3: "GBR",
    dialCode: "+44",
    continent: "Europe",
    subContinent: "Northern Europe",
    presence: false,
    status: "Active",
  },
  {
    id: "CNT-00005",
    name: "United States",
    iso2: "US",
    iso3: "USA",
    dialCode: "+1",
    continent: "North America",
    subContinent: "Northern America",
    presence: false,
    status: "Active",
  },
];

const continents = [
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
];

export default function CountriesPage() {
  const [countries, setCountries] = useState(initialCountries);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [continentFilter, setContinentFilter] =
    useState("All Continents");
  const [presenceFilter, setPresenceFilter] =
    useState("Any Presence");

  const [showModal, setShowModal] = useState(false);

  const [editingCountry, setEditingCountry] = useState(null);

  const [form, setForm] = useState({
    name: "",
    iso2: "",
    iso3: "",
    dialCode: "",
    continent: "",
    subContinent: "",
    remarks: "",
    presence: false,
  });

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const text = search.toLowerCase();

      const matchesSearch =
        country.name.toLowerCase().includes(text) ||
        country.id.toLowerCase().includes(text) ||
        country.iso2.toLowerCase().includes(text) ||
        country.iso3.toLowerCase().includes(text) ||
        country.continent.toLowerCase().includes(text);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        country.status === statusFilter;

      const matchesContinent =
        continentFilter === "All Continents" ||
        country.continent === continentFilter;

      const matchesPresence =
        presenceFilter === "Any Presence" ||
        (presenceFilter === "Has Presence" &&
          country.presence) ||
        (presenceFilter === "No Presence" &&
          !country.presence);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesContinent &&
        matchesPresence
      );
    });
  }, [
    countries,
    search,
    statusFilter,
    continentFilter,
    presenceFilter,
  ]);

  const activeCount = countries.filter(
    (c) => c.status === "Active"
  ).length;

  const inactiveCount = countries.filter(
    (c) => c.status === "Inactive"
  ).length;

  const presenceCount = countries.filter(
    (c) => c.presence
  ).length;

  const openAddModal = () => {
    setEditingCountry(null);

    setForm({
      name: "",
      iso2: "",
      iso3: "",
      dialCode: "",
      continent: "",
      subContinent: "",
      remarks: "",
      presence: false,
    });

    setShowModal(true);
  };

  const openEditModal = (country) => {
    setEditingCountry(country);

    setForm({
      name: country.name,
      iso2: country.iso2,
      iso3: country.iso3,
      dialCode: country.dialCode,
      continent: country.continent,
      subContinent: country.subContinent,
      remarks: "",
      presence: country.presence,
    });

    setShowModal(true);
  };

  const saveCountry = () => {
    if (
      !form.name ||
      !form.iso2 ||
      !form.iso3 ||
      !form.continent
    ) {
      alert("Please fill all mandatory fields.");
      return;
    }

    if (editingCountry) {
      setCountries(
        countries.map((country) =>
          country.id === editingCountry.id
            ? {
                ...country,
                name: form.name,
                iso2: form.iso2.toUpperCase(),
                iso3: form.iso3.toUpperCase(),
                dialCode: form.dialCode,
                continent: form.continent,
                subContinent: form.subContinent,
                presence: form.presence,
              }
            : country
        )
      );
    } else {
      const newCountry = {
        id: `CNT-${String(
          countries.length + 1
        ).padStart(5, "0")}`,
        name: form.name,
        iso2: form.iso2.toUpperCase(),
        iso3: form.iso3.toUpperCase(),
        dialCode: form.dialCode,
        continent: form.continent,
        subContinent: form.subContinent,
        presence: form.presence,
        status: "Active",
      };

      setCountries([...countries, newCountry]);
    }

    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setCountries(
      countries.map((country) =>
        country.id === id
          ? {
              ...country,
              status:
                country.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : country
      )
    );
  };

  const archiveCountry = (id) => {
    setCountries(
      countries.map((country) =>
        country.id === id
          ? {
              ...country,
              status: "Archived",
            }
          : country
      )
    );
  };

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "6px",
          }}
        >
          Home / Administration / Master Management / Country
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Country Master
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage countries, codes, continents and country
          availability for tender operations.
        </p>
      </div>

      {/* SUMMARY */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {[
          ["Total Countries", countries.length],
          ["Active", activeCount],
          ["Inactive", inactiveCount],
          ["Satguru Presence", presenceCount],
        ].map(([title, value]) => (
          <div
            key={title}
            style={{
              background: "#fff",
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
          background: "#fff",
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
              "2fr 1fr 1fr 1fr auto",
            gap: "12px",
            alignItems: "end",
          }}
        >
          {/* SEARCH */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
                marginBottom: "6px",
              }}
            >
              Search
            </label>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search country, ID, ISO-2, ISO-3..."
              style={{
                width: "100%",
                padding: "11px 12px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* STATUS */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
                marginBottom: "6px",
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
                padding: "11px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Archived</option>
              <option>All Statuses</option>
            </select>
          </div>

          {/* CONTINENT */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
                marginBottom: "6px",
              }}
            >
              Continent
            </label>

            <select
              value={continentFilter}
              onChange={(e) =>
                setContinentFilter(e.target.value)
              }
              style={{
                width: "100%",
                padding: "11px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <option>All Continents</option>

              {continents.map((continent) => (
                <option key={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>

          {/* PRESENCE */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
                marginBottom: "6px",
              }}
            >
              Presence
            </label>

            <select
              value={presenceFilter}
              onChange={(e) =>
                setPresenceFilter(e.target.value)
              }
              style={{
                width: "100%",
                padding: "11px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <option>Any Presence</option>
              <option>Has Presence</option>
              <option>No Presence</option>
            </select>
          </div>

          {/* ADD */}
          <button
            type="button"
            onClick={openAddModal}
            style={{
              padding: "11px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Add Country
          </button>
        </div>
      </div>

      {/* COUNTRY TABLE */}
      <div
        style={{
          background: "#fff",
          border:
            "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom:
              "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              color: "#0f172a",
            }}
          >
            Country Register
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Maintain country reference data used by
            regions and branches.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  textAlign: "left",
                  color: "#64748b",
                }}
              >
                {[
                  "Country ID",
                  "Country",
                  "ISO-2",
                  "ISO-3",
                  "Dial Code",
                  "Continent",
                  "Presence",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "14px 12px",
                      borderBottom:
                        "1px solid #e2e8f0",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredCountries.map(
                (country) => (
                  <tr key={country.id}>
                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                        color: "#64748b",
                      }}
                    >
                      {country.id}
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                        fontWeight: "600",
                        color: "#0f172a",
                      }}
                    >
                      {country.name}
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {country.iso2}
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {country.iso3}
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {country.dialCode}
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {country.continent}
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      {country.presence ? (
                        <span
                          style={{
                            color: "#16a34a",
                            fontWeight: "700",
                          }}
                        >
                          ●
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "#cbd5e1",
                          }}
                        >
                          —
                        </span>
                      )}
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      <span
                        style={{
                          padding:
                            "5px 10px",
                          borderRadius:
                            "999px",
                          background:
                            country.status ===
                            "Active"
                              ? "#dcfce7"
                              : "#f1f5f9",
                          color:
                            country.status ===
                            "Active"
                              ? "#15803d"
                              : "#64748b",
                          fontSize: "11px",
                          fontWeight: "600",
                        }}
                      >
                        {country.status.toUpperCase()}
                      </span>
                    </td>

                    <td
                      style={{
                        padding: "15px 12px",
                        borderBottom:
                          "1px solid #e2e8f0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(country)
                        }
                        style={{
                          border: "none",
                          background:
                            "transparent",
                          color: "#2563eb",
                          cursor: "pointer",
                          marginRight: "12px",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(
                            country.id
                          )
                        }
                        style={{
                          border: "none",
                          background:
                            "transparent",
                          color: "#475569",
                          cursor: "pointer",
                          marginRight: "12px",
                        }}
                      >
                        {country.status ===
                        "Active"
                          ? "Inactive"
                          : "Activate"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          archiveCountry(
                            country.id
                          )
                        }
                        style={{
                          border: "none",
                          background:
                            "transparent",
                          color: "#ea580c",
                          cursor: "pointer",
                        }}
                      >
                        Archive
                      </button>
                    </td>
                  </tr>
                )
              )}

              {filteredCountries.length ===
                0 && (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      padding: "40px",
                      textAlign:
                        "center",
                      color: "#64748b",
                    }}
                  >
                    No countries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15,23,42,0.45)",
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
              maxWidth: "650px",
              background: "#fff",
              borderRadius: "14px",
              padding: "24px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.18)",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
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
                {editingCountry
                  ? "Edit Country"
                  : "Add Country"}
              </h2>

              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                style={{
                  border: "none",
                  background:
                    "transparent",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#64748b",
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
              <FormField
                label="Country Name *"
                value={form.name}
                placeholder="e.g. India"
                onChange={(value) =>
                  setForm({
                    ...form,
                    name: value,
                  })
                }
              />

              <FormField
                label="ISO-2 Code *"
                value={form.iso2}
                placeholder="e.g. IN"
                onChange={(value) =>
                  setForm({
                    ...form,
                    iso2: value,
                  })
                }
              />

              <FormField
                label="ISO-3 Code *"
                value={form.iso3}
                placeholder="e.g. IND"
                onChange={(value) =>
                  setForm({
                    ...form,
                    iso3: value,
                  })
                }
              />

              <FormField
                label="Dialling Code"
                value={form.dialCode}
                placeholder="e.g. +91"
                onChange={(value) =>
                  setForm({
                    ...form,
                    dialCode: value,
                  })
                }
              />

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
                  Continent *
                </label>

                <select
                  value={form.continent}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      continent:
                        e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "11px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#fff",
                    boxSizing:
                      "border-box",
                  }}
                >
                  <option value="">
                    Select continent
                  </option>

                  {continents.map(
                    (continent) => (
                      <option
                        key={continent}
                      >
                        {continent}
                      </option>
                    )
                  )}
                </select>
              </div>

              <FormField
                label="Sub-continent"
                value={
                  form.subContinent
                }
                placeholder="e.g. South Asia"
                onChange={(value) =>
                  setForm({
                    ...form,
                    subContinent:
                      value,
                  })
                }
              />

              <div
                style={{
                  gridColumn:
                    "1 / -1",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#334155",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={
                      form.presence
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        presence:
                          e.target
                            .checked,
                      })
                    }
                  />

                  Satguru has presence
                  in this country
                </label>
              </div>

              <div
                style={{
                  gridColumn:
                    "1 / -1",
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
                      remarks:
                        e.target.value,
                    })
                  }
                  placeholder="Internal notes..."
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "11px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    resize: "vertical",
                    boxSizing:
                      "border-box",
                  }}
                />
              </div>
            </div>

            {/* MODAL ACTIONS */}
            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "10px",
                marginTop: "22px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setShowModal(false)
                }
                style={{
                  padding:
                    "10px 16px",
                  border:
                    "1px solid #cbd5e1",
                  borderRadius: "8px",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  saveCountry
                }
                style={{
                  padding:
                    "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  background:
                    "#2563eb",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {editingCountry
                  ? "Update Country"
                  : "Save Country"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  value,
  placeholder,
  onChange,
}) {
  return (
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
        {label}
      </label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        style={{
          width: "100%",
          padding: "11px",
          border:
            "1px solid #cbd5e1",
          borderRadius: "8px",
          boxSizing: "border-box",
          fontSize: "13px",
        }}
      />
    </div>
  );
}
