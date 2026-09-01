"use client";

import { useMemo, useState } from "react";

const initialCountries = [
  {
    id: "CNT-00001",
    name: "Albania",
    iso2: "AL",
    iso3: "ALB",
    dialCode: "+355",
    continent: "Europe",
    subContinent: "Southern Europe",
    status: "Active",
    presence: false,
    remarks: "",
  },
  {
    id: "CNT-00002",
    name: "Algeria",
    iso2: "DZ",
    iso3: "DZA",
    dialCode: "+213",
    continent: "Africa",
    subContinent: "Northern Africa",
    status: "Active",
    presence: false,
    remarks: "",
  },
  {
    id: "CNT-00003",
    name: "Angola",
    iso2: "AO",
    iso3: "AGO",
    dialCode: "+244",
    continent: "Africa",
    subContinent: "Middle Africa",
    status: "Active",
    presence: true,
    remarks: "",
  },
  {
    id: "CNT-00004",
    name: "Antigua and Barbuda",
    iso2: "AG",
    iso3: "ATG",
    dialCode: "+1",
    continent: "North America",
    subContinent: "Caribbean",
    status: "Active",
    presence: false,
    remarks: "",
  },
  {
    id: "CNT-00005",
    name: "Australia",
    iso2: "AU",
    iso3: "AUS",
    dialCode: "+61",
    continent: "Oceania",
    subContinent: "Australia and New Zealand",
    status: "Active",
    presence: false,
    remarks: "",
  },
  {
    id: "CNT-00006",
    name: "India",
    iso2: "IN",
    iso3: "IND",
    dialCode: "+91",
    continent: "Asia",
    subContinent: "Southern Asia",
    status: "Active",
    presence: true,
    remarks: "Primary operating market",
  },
  {
    id: "CNT-00007",
    name: "Kenya",
    iso2: "KE",
    iso3: "KEN",
    dialCode: "+254",
    continent: "Africa",
    subContinent: "Eastern Africa",
    status: "Active",
    presence: true,
    remarks: "",
  },
  {
    id: "CNT-00008",
    name: "Nigeria",
    iso2: "NG",
    iso3: "NGA",
    dialCode: "+234",
    continent: "Africa",
    subContinent: "Western Africa",
    status: "Active",
    presence: true,
    remarks: "",
  },
  {
    id: "CNT-00009",
    name: "United Arab Emirates",
    iso2: "AE",
    iso3: "ARE",
    dialCode: "+971",
    continent: "Asia",
    subContinent: "Western Asia",
    status: "Active",
    presence: true,
    remarks: "",
  },
  {
    id: "CNT-00010",
    name: "United Kingdom",
    iso2: "GB",
    iso3: "GBR",
    dialCode: "+44",
    continent: "Europe",
    subContinent: "Northern Europe",
    status: "Active",
    presence: false,
    remarks: "",
  },
];

const emptyForm = {
  name: "",
  iso2: "",
  iso3: "",
  dialCode: "",
  continent: "",
  subContinent: "",
  status: "Active",
  presence: false,
  remarks: "",
};

const continents = [
  "Asia",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
];

export default function CountryMasterPage() {
  const [countries, setCountries] = useState(initialCountries);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [continentFilter, setContinentFilter] =
    useState("All Continents");
  const [presenceFilter, setPresenceFilter] =
    useState("Any Presence");

  const [showModal, setShowModal] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const filteredCountries = useMemo(() => {
    const term = search.trim().toLowerCase();

    return countries.filter((country) => {
      const matchesSearch =
        !term ||
        country.name.toLowerCase().includes(term) ||
        country.id.toLowerCase().includes(term) ||
        country.iso2.toLowerCase().includes(term) ||
        country.iso3.toLowerCase().includes(term) ||
        country.dialCode.toLowerCase().includes(term) ||
        country.continent.toLowerCase().includes(term) ||
        country.subContinent.toLowerCase().includes(term);

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCountries.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedCountries = filteredCountries.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const activeCountries = countries.filter(
    (country) => country.status === "Active"
  ).length;

  const inactiveCountries = countries.filter(
    (country) => country.status === "Inactive"
  ).length;

  const presenceCountries = countries.filter(
    (country) => country.presence
  ).length;

  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function openAddModal() {
    setEditingCountry(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(country) {
    setEditingCountry(country);

    setForm({
      name: country.name,
      iso2: country.iso2,
      iso3: country.iso3,
      dialCode: country.dialCode,
      continent: country.continent,
      subContinent: country.subContinent,
      status: country.status,
      presence: country.presence,
      remarks: country.remarks,
    });

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingCountry(null);
    setForm(emptyForm);
  }

  function saveCountry(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.iso2.trim() ||
      !form.iso3.trim() ||
      !form.dialCode.trim() ||
      !form.continent
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const updatedCountry = {
      ...form,
      name: form.name.trim(),
      iso2: form.iso2.trim().toUpperCase(),
      iso3: form.iso3.trim().toUpperCase(),
      dialCode: form.dialCode.trim(),
      subContinent: form.subContinent.trim(),
    };

    if (editingCountry) {
      setCountries((previous) =>
        previous.map((country) =>
          country.id === editingCountry.id
            ? {
                ...country,
                ...updatedCountry,
              }
            : country
        )
      );
    } else {
      const nextNumber = String(
        countries.length + 1
      ).padStart(5, "0");

      const newCountry = {
        id: `CNT-${nextNumber}`,
        ...updatedCountry,
      };

      setCountries((previous) => [
        ...previous,
        newCountry,
      ]);

      setCurrentPage(1);
    }

    closeModal();
  }

  function toggleStatus(country) {
    const nextStatus =
      country.status === "Active"
        ? "Inactive"
        : "Active";

    setCountries((previous) =>
      previous.map((item) =>
        item.id === country.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    );
  }

  function archiveCountry(country) {
    const confirmed = window.confirm(
      `Archive ${country.name}?`
    );

    if (!confirmed) return;

    setCountries((previous) =>
      previous.map((item) =>
        item.id === country.id
          ? {
              ...item,
              status: "Archived",
            }
          : item
      )
    );
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("Active");
    setContinentFilter("All Continents");
    setPresenceFilter("Any Presence");
    setCurrentPage(1);
  }

  function exportCSV() {
    const headers = [
      "Country ID",
      "Country Name",
      "ISO-2",
      "ISO-3",
      "Dial Code",
      "Continent",
      "Sub-continent",
      "Presence",
      "Status",
    ];

    const rows = filteredCountries.map((country) => [
      country.id,
      country.name,
      country.iso2,
      country.iso3,
      country.dialCode,
      country.continent,
      country.subContinent,
      country.presence ? "Yes" : "No",
      country.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "country-master.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          marginBottom: "24px",
          flexWrap: "wrap",
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
            Home / Administration / Master Management /
            Country Master
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
              margin: "8px 0 0",
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            Manage countries, standard codes, regions and
            Satguru presence.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            type="button"
            onClick={exportCSV}
            style={secondaryButton}
          >
            ↓ Export CSV
          </button>

          <button
            type="button"
            onClick={openAddModal}
            style={primaryButton}
          >
            + Add Country
          </button>
        </div>
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
        <SummaryCard
          title="Total Countries"
          value={countries.length}
          subtitle="Configured countries"
        />

        <SummaryCard
          title="Active"
          value={activeCountries}
          subtitle="Currently active"
        />

        <SummaryCard
          title="Inactive"
          value={inactiveCountries}
          subtitle="Currently inactive"
        />

        <SummaryCard
          title="With Presence"
          value={presenceCountries}
          subtitle="Satguru presence"
        />
      </div>

      {/* FILTERS */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #dbe3ef",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(280px, 2fr) repeat(3, minmax(150px, 1fr)) auto",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {/* SEARCH */}
          <div
            style={{
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "13px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                color: "#94a3b8",
              }}
            >
              ⌕
            </span>

            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, ID, ISO-2, ISO-3, region, continent..."
              style={{
                ...inputStyle,
                paddingLeft: "38px",
              }}
            />
          </div>

          {/* STATUS */}
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Archived</option>
            <option>All Statuses</option>
          </select>

          {/* CONTINENT */}
          <select
            value={continentFilter}
            onChange={(event) => {
              setContinentFilter(
                event.target.value
              );
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            <option>All Continents</option>

            {continents.map((continent) => (
              <option
                key={continent}
                value={continent}
              >
                {continent}
              </option>
            ))}
          </select>

          {/* PRESENCE */}
          <select
            value={presenceFilter}
            onChange={(event) => {
              setPresenceFilter(
                event.target.value
              );
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            <option>Any Presence</option>
            <option>Has Presence</option>
            <option>No Presence</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            style={resetButton}
          >
            Reset
          </button>
        </div>

        <div
          style={{
            marginTop: "14px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          <span>
            {filteredCountries.length} matched
          </span>

          <span>
            {presenceCountries} with presence
          </span>
        </div>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #dbe3ef",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "1100px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  borderBottom:
                    "1px solid #e2e8f0",
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
                    style={tableHeaderStyle}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedCountries.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      padding: "50px 20px",
                      textAlign: "center",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    No countries match the selected
                    filters.
                  </td>
                </tr>
              ) : (
                paginatedCountries.map((country) => (
                  <tr
                    key={country.id}
                    style={{
                      borderBottom:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <td style={tableCellStyle}>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {country.id}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#0f172a",
                        }}
                      >
                        {country.name}
                      </div>

                      {country.subContinent && (
                        <div
                          style={{
                            marginTop: "3px",
                            fontSize: "11px",
                            color: "#94a3b8",
                          }}
                        >
                          {country.subContinent}
                        </div>
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {country.iso2}
                    </td>

                    <td style={tableCellStyle}>
                      {country.iso3}
                    </td>

                    <td style={tableCellStyle}>
                      {country.dialCode}
                    </td>

                    <td style={tableCellStyle}>
                      {country.continent}
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        textAlign: "center",
                      }}
                    >
                      {country.presence ? (
                        <span
                          style={{
                            color: "#16a34a",
                            fontSize: "18px",
                          }}
                          title="Satguru presence"
                        >
                          ✓
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

                    <td style={tableCellStyle}>
                      <StatusBadge
                        status={country.status}
                      />
                    </td>

                    <td style={tableCellStyle}>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(country)
                          }
                          style={actionButton}
                          title="Edit"
                        >
                          ✎
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleStatus(country)
                          }
                          style={actionButton}
                          title={
                            country.status ===
                            "Active"
                              ? "Inactivate"
                              : "Activate"
                          }
                        >
                          {country.status ===
                          "Active"
                            ? "⊘"
                            : "✓"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            archiveCountry(country)
                          }
                          style={{
                            ...actionButton,
                            color: "#dc2626",
                          }}
                          title="Archive"
                        >
                          ▣
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 20px",
            borderTop:
              "1px solid #e2e8f0",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Showing{" "}
            {filteredCountries.length === 0
              ? 0
              : (safePage - 1) * pageSize + 1}{" "}
            to{" "}
            {Math.min(
              safePage * pageSize,
              filteredCountries.length
            )}{" "}
            of {filteredCountries.length} entries
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(
                  Number(event.target.value)
                );
                setCurrentPage(1);
              }}
              style={{
                ...selectStyle,
                width: "105px",
              }}
            >
              <option value="7">
                7 / page
              </option>
              <option value="10">
                10 / page
              </option>
              <option value="20">
                20 / page
              </option>
              <option value="50">
                50 / page
              </option>
            </select>

            <button
              type="button"
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
              style={{
                ...pageButton,
                opacity:
                  safePage === 1 ? 0.4 : 1,
              }}
            >
              ‹
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => index + 1
            )
              .slice(0, 5)
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  style={{
                    ...pageButton,
                    background:
                      safePage === page
                        ? "#2563eb"
                        : "#fff",
                    color:
                      safePage === page
                        ? "#fff"
                        : "#334155",
                    borderColor:
                      safePage === page
                        ? "#2563eb"
                        : "#cbd5e1",
                  }}
                >
                  {page}
                </button>
              ))}

            <button
              type="button"
              disabled={
                safePage === totalPages
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
                )
              }
              style={{
                ...pageButton,
                opacity:
                  safePage === totalPages
                    ? 0.4
                    : 1,
              }}
            >
              ›
            </button>
          </div>
        </div>
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
          lineHeight: "1.6",
        }}
      >
        <strong>Country Master</strong>

        <div style={{ marginTop: "6px" }}>
          Country records provide the standard reference
          used by Branch Management, Region Management,
          tender records and reporting.
          <br />
          ISO-2, ISO-3 and dialing codes should be
          maintained consistently.
          <br />
          Country status and presence changes should be
          captured in Audit History.
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15, 23, 42, 0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              background: "#fff",
              borderRadius: "14px",
              boxShadow:
                "0 20px 50px rgba(15,23,42,0.25)",
            }}
          >
            {/* MODAL HEADER */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom:
                  "1px solid #e2e8f0",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
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

                <p
                  style={{
                    margin: "5px 0 0",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  Maintain country master data used
                  throughout the system.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
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
            <form onSubmit={saveCountry}>
              <div
                style={{
                  padding: "24px",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "16px",
                }}
              >
                <FormField
                  label="Country Name"
                  required
                  value={form.name}
                  onChange={(value) =>
                    updateForm(
                      "name",
                      value
                    )
                  }
                  placeholder="e.g. India"
                />

                <SelectField
                  label="Status"
                  required
                  value={form.status}
                  onChange={(value) =>
                    updateForm(
                      "status",
                      value
                    )
                  }
                  options={[
                    "Active",
                    "Inactive",
                    "Archived",
                  ]}
                />

                <FormField
                  label="ISO-2 Code"
                  required
                  value={form.iso2}
                  onChange={(value) =>
                    updateForm(
                      "iso2",
                      value
                    )
                  }
                  placeholder="e.g. IN"
                />

                <FormField
                  label="ISO-3 Code"
                  required
                  value={form.iso3}
                  onChange={(value) =>
                    updateForm(
                      "iso3",
                      value
                    )
                  }
                  placeholder="e.g. IND"
                />

                <FormField
                  label="Dialling Code"
                  required
                  value={form.dialCode}
                  onChange={(value) =>
                    updateForm(
                      "dialCode",
                      value
                    )
                  }
                  placeholder="e.g. +91"
                />

                <SelectField
                  label="Continent"
                  required
                  value={form.continent}
                  onChange={(value) =>
                    updateForm(
                      "continent",
                      value
                    )
                  }
                  options={continents}
                  placeholder="Select continent"
                />

                <FormField
                  label="Sub-continent"
                  value={form.subContinent}
                  onChange={(value) =>
                    updateForm(
                      "subContinent",
                      value
                    )
                  }
                  placeholder="e.g. Southern Asia"
                />

                <div>
                  <label style={labelStyle}>
                    Satguru Presence
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      minHeight: "40px",
                      fontSize: "13px",
                      color: "#334155",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        form.presence
                      }
                      onChange={(event) =>
                        updateForm(
                          "presence",
                          event.target.checked
                        )
                      }
                    />

                    Satguru has presence in
                    this country
                  </label>
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
                    value={form.remarks}
                    onChange={(event) =>
                      updateForm(
                        "remarks",
                        event.target.value
                      )
                    }
                    placeholder="Internal notes, exceptions, anything reportable"
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                  />
                </div>
              </div>

              {/* FOOTER */}
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "flex-end",
                  gap: "10px",
                  padding:
                    "16px 24px",
                  borderTop:
                    "1px solid #e2e8f0",
                }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  style={secondaryButton}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={primaryButton}
                >
                  {editingCountry
                    ? "Save Changes"
                    : "Save Country"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SummaryCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #dbe3ef",
        borderRadius: "12px",
        padding: "18px",
        minHeight: "105px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: "12px",
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

      <div
        style={{
          marginTop: "2px",
          fontSize: "11px",
          color: "#64748b",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let background = "#dcfce7";
  let color = "#15803d";

  if (status === "Inactive") {
    background = "#fef3c7";
    color = "#b45309";
  }

  if (status === "Archived") {
    background = "#f1f5f9";
    color = "#64748b";
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "5px 9px",
        borderRadius: "999px",
        background,
        color,
        fontSize: "10px",
        fontWeight: "700",
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}

function FormField({
  label,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label}

        {required && (
          <span
            style={{
              color: "#dc2626",
            }}
          >
            {" "}
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label}

        {required && (
          <span
            style={{
              color: "#dc2626",
            }}
          >
            {" "}
            *
          </span>
        )}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        style={selectStyle}
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#fff",
  color: "#334155",
  fontSize: "13px",
  outline: "none",
};

const selectStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#fff",
  color: "#334155",
  fontSize: "13px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#334155",
};

const primaryButton = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "#fff",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "10px 16px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#fff",
  color: "#334155",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
};

const resetButton = {
  padding: "10px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  background: "#f8fafc",
  color: "#475569",
  fontSize: "13px",
  cursor: "pointer",
};

const tableHeaderStyle = {
  padding: "13px 14px",
  textAlign: "left",
  fontSize: "11px",
  fontWeight: "700",
  color: "#64748b",
  whiteSpace: "nowrap",
};

const tableCellStyle = {
  padding: "14px",
  fontSize: "13px",
  color: "#334155",
  whiteSpace: "nowrap",
};

const actionButton = {
  width: "30px",
  height: "30px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  background: "#fff",
  color: "#475569",
  cursor: "pointer",
  fontSize: "14px",
};

const pageButton = {
  width: "30px",
  height: "30px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  background: "#fff",
  color: "#334155",
  cursor: "pointer",
  fontSize: "12px",
};
