"use client";

import { useMemo, useState } from "react";

const initialBranches = [
  {
    id: "BR-0001",
    name: "Mumbai Head Office",
    code: "MUM",
    fullName: "Mumbai Head Office",
    country: "India",
    region: "Maharashtra",
    city: "Mumbai",
    status: "Active",
    users: 5,
    address: "Mumbai, Maharashtra, India",
    phone: "+91 22 4000 1000",
    email: "mumbai@satgurutravel.com",
    remarks: "Head office",
  },
  {
    id: "BR-0002",
    name: "Delhi Branch",
    code: "DEL",
    fullName: "Delhi Branch",
    country: "India",
    region: "Delhi",
    city: "New Delhi",
    status: "Active",
    users: 4,
    address: "New Delhi, India",
    phone: "+91 11 4000 2000",
    email: "delhi@satgurutravel.com",
    remarks: "",
  },
  {
    id: "BR-0003",
    name: "Bangalore Office",
    code: "BLR",
    fullName: "Bangalore Office",
    country: "India",
    region: "Karnataka",
    city: "Bengaluru",
    status: "Active",
    users: 3,
    address: "Bengaluru, Karnataka, India",
    phone: "+91 80 4000 3000",
    email: "bangalore@satgurutravel.com",
    remarks: "",
  },
  {
    id: "BR-0004",
    name: "Abuja",
    code: "ABV",
    fullName: "Abuja Branch",
    country: "Nigeria",
    region: "Nigeria Region",
    city: "Abuja",
    status: "Active",
    users: 3,
    address: "Abuja, Nigeria",
    phone: "",
    email: "",
    remarks: "",
  },
  {
    id: "BR-0005",
    name: "Nairobi Office",
    code: "NRB",
    fullName: "Nairobi Office",
    country: "Kenya",
    region: "Kenya Region",
    city: "Nairobi",
    status: "Active",
    users: 2,
    address: "Nairobi, Kenya",
    phone: "",
    email: "",
    remarks: "",
  },
  {
    id: "BR-0006",
    name: "Lagos Branch",
    code: "LAG",
    fullName: "Lagos Branch",
    country: "Nigeria",
    region: "Nigeria Region",
    city: "Lagos",
    status: "Active",
    users: 1,
    address: "Lagos, Nigeria",
    phone: "",
    email: "",
    remarks: "",
  },
  {
    id: "BR-0007",
    name: "Dubai Office",
    code: "DXB",
    fullName: "Dubai Office",
    country: "UAE",
    region: "UAE Region",
    city: "Dubai",
    status: "Inactive",
    users: 2,
    address: "Dubai, UAE",
    phone: "",
    email: "",
    remarks: "",
  },
  {
    id: "BR-0008",
    name: "Pune Branch",
    code: "PUN",
    fullName: "Pune Branch",
    country: "India",
    region: "Maharashtra",
    city: "Pune",
    status: "Active",
    users: 2,
    address: "Pune, Maharashtra, India",
    phone: "",
    email: "",
    remarks: "",
  },
  {
    id: "BR-0009",
    name: "Chennai Office",
    code: "MAA",
    fullName: "Chennai Office",
    country: "India",
    region: "Tamil Nadu",
    city: "Chennai",
    status: "Active",
    users: 2,
    address: "Chennai, Tamil Nadu, India",
    phone: "",
    email: "",
    remarks: "",
  },
  {
    id: "BR-0010",
    name: "Hyderabad Branch",
    code: "HYD",
    fullName: "Hyderabad Branch",
    country: "India",
    region: "Telangana",
    city: "Hyderabad",
    status: "Active",
    users: 1,
    address: "Hyderabad, Telangana, India",
    phone: "",
    email: "",
    remarks: "",
  },
];

const emptyForm = {
  name: "",
  code: "",
  fullName: "",
  country: "",
  region: "",
  city: "",
  status: "Active",
  address: "",
  phone: "",
  email: "",
  remarks: "",
};

export default function BranchManagementPage() {
  const [branches, setBranches] = useState(initialBranches);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [countryFilter, setCountryFilter] = useState("All Countries");

  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const regions = useMemo(() => {
    return [
      "All Regions",
      ...Array.from(new Set(branches.map((branch) => branch.region))),
    ];
  }, [branches]);

  const countries = useMemo(() => {
    return [
      "All Countries",
      ...Array.from(new Set(branches.map((branch) => branch.country))),
    ];
  }, [branches]);

  const filteredBranches = useMemo(() => {
    const term = search.trim().toLowerCase();

    return branches.filter((branch) => {
      const matchesSearch =
        !term ||
        branch.name.toLowerCase().includes(term) ||
        branch.code.toLowerCase().includes(term) ||
        branch.id.toLowerCase().includes(term) ||
        branch.city.toLowerCase().includes(term) ||
        branch.country.toLowerCase().includes(term) ||
        branch.email.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        branch.status === statusFilter;

      const matchesRegion =
        regionFilter === "All Regions" ||
        branch.region === regionFilter;

      const matchesCountry =
        countryFilter === "All Countries" ||
        branch.country === countryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRegion &&
        matchesCountry
      );
    });
  }, [
    branches,
    search,
    statusFilter,
    regionFilter,
    countryFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBranches.length / pageSize)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedBranches = filteredBranches.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const totalBranches = branches.length;

  const activeBranches = branches.filter(
    (branch) => branch.status === "Active"
  ).length;

  const countriesCovered = new Set(
    branches.map((branch) => branch.country)
  ).size;

  const usersAssigned = branches.reduce(
    (total, branch) => total + branch.users,
    0
  );

  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function openAddModal() {
    setEditingBranch(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(branch) {
    setEditingBranch(branch);
    setForm({
      name: branch.name,
      code: branch.code,
      fullName: branch.fullName,
      country: branch.country,
      region: branch.region,
      city: branch.city,
      status: branch.status,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      remarks: branch.remarks,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingBranch(null);
    setForm(emptyForm);
  }

  function saveBranch(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.code.trim() ||
      !form.country ||
      !form.region ||
      !form.city.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingBranch) {
      setBranches((previous) =>
        previous.map((branch) =>
          branch.id === editingBranch.id
            ? {
                ...branch,
                ...form,
                name: form.name.trim(),
                code: form.code.trim().toUpperCase(),
              }
            : branch
        )
      );
    } else {
      const newNumber = String(branches.length + 1).padStart(4, "0");

      const newBranch = {
        id: `BR-${newNumber}`,
        ...form,
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        users: 0,
      };

      setBranches((previous) => [newBranch, ...previous]);
      setCurrentPage(1);
    }

    closeModal();
  }

  function toggleStatus(branch) {
    const nextStatus =
      branch.status === "Active" ? "Inactive" : "Active";

    setBranches((previous) =>
      previous.map((item) =>
        item.id === branch.id
          ? { ...item, status: nextStatus }
          : item
      )
    );
  }

  function archiveBranch(branch) {
    const confirmed = window.confirm(
      `Archive ${branch.name}?`
    );

    if (!confirmed) return;

    setBranches((previous) =>
      previous.map((item) =>
        item.id === branch.id
          ? { ...item, status: "Archived" }
          : item
      )
    );
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("Active");
    setRegionFilter("All Regions");
    setCountryFilter("All Countries");
    setCurrentPage(1);
  }

  function exportCSV() {
    const headers = [
      "BR-ID",
      "Branch Name",
      "Code",
      "Country",
      "Region",
      "City",
      "Users",
      "Status",
    ];

    const rows = filteredBranches.map((branch) => [
      branch.id,
      branch.name,
      branch.code,
      branch.country,
      branch.region,
      branch.city,
      branch.users,
      branch.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
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
    link.download = "branch-management.csv";
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
            Home / Administration / Masters / Branch Management
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#0f172a",
            }}
          >
            Branch Management
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            Manage branches and their country, region and tender ownership.
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
            + New Branch
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <SummaryCard
          title="Total Branches"
          value={totalBranches}
          subtitle={`${filteredBranches.length} shown`}
          icon="▣"
        />

        <SummaryCard
          title="Active Branches"
          value={activeBranches}
          subtitle="Currently active"
          icon="✓"
        />

        <SummaryCard
          title="Countries Covered"
          value={countriesCovered}
          subtitle="Countries with branches"
          icon="◎"
        />

        <SummaryCard
          title="Users Assigned"
          value={usersAssigned}
          subtitle="Across all branches"
          icon="♙"
        />
      </div>

      {/* FILTER AREA */}
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
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: "16px",
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
              placeholder="Search by name, code, BR-ID, city, country, email..."
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

          {/* REGION */}
          <select
            value={regionFilter}
            onChange={(event) => {
              setRegionFilter(event.target.value);
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            {regions.map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>

          {/* COUNTRY */}
          <select
            value={countryFilter}
            onChange={(event) => {
              setCountryFilter(event.target.value);
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
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
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          {filteredBranches.length} result
          {filteredBranches.length !== 1 ? "s" : ""} found
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
              minWidth: "1050px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {[
                  "BR-ID",
                  "Branch Name",
                  "Code",
                  "Country",
                  "Region",
                  "City",
                  "Users",
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
              {paginatedBranches.length === 0 ? (
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
                    No branches match the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedBranches.map((branch) => (
                  <tr
                    key={branch.id}
                    style={{
                      borderBottom:
                        "1px solid #e2e8f0",
                    }}
                  >
                    <td style={tableCellStyle}>
                      <span
                        style={{
                          color: "#475569",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {branch.id}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#0f172a",
                        }}
                      >
                        {branch.name}
                      </div>

                      {branch.fullName &&
                        branch.fullName !== branch.name && (
                          <div
                            style={{
                              marginTop: "3px",
                              color: "#94a3b8",
                              fontSize: "11px",
                            }}
                          >
                            {branch.fullName}
                          </div>
                        )}
                    </td>

                    <td style={tableCellStyle}>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "#334155",
                        }}
                      >
                        {branch.code}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      {branch.country}
                    </td>

                    <td style={tableCellStyle}>
                      <span
                        style={{
                          color: "#475569",
                        }}
                      >
                        {branch.region}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      {branch.city}
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          color: "#475569",
                        }}
                      >
                        ♙ {branch.users}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      <StatusBadge status={branch.status} />
                    </td>

                    <td style={tableCellStyle}>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(branch)
                          }
                          style={actionButton}
                          title="Edit"
                        >
                          ✎
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleStatus(branch)
                          }
                          style={actionButton}
                          title={
                            branch.status === "Active"
                              ? "Disable"
                              : "Activate"
                          }
                        >
                          {branch.status === "Active"
                            ? "⊘"
                            : "✓"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            archiveBranch(branch)
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
            borderTop: "1px solid #e2e8f0",
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
            {filteredBranches.length === 0
              ? 0
              : (safePage - 1) * pageSize + 1}{" "}
            to{" "}
            {Math.min(
              safePage * pageSize,
              filteredBranches.length
            )}{" "}
            of {filteredBranches.length} entries
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
                setPageSize(Number(event.target.value));
                setCurrentPage(1);
              }}
              style={{
                ...selectStyle,
                width: "105px",
              }}
            >
              <option value="7">7 / page</option>
              <option value="10">10 / page</option>
              <option value="20">20 / page</option>
              <option value="50">50 / page</option>
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
                opacity: safePage === 1 ? 0.4 : 1,
              }}
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .slice(0, 5)
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
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
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              style={{
                ...pageButton,
                opacity:
                  safePage === totalPages ? 0.4 : 1,
              }}
            >
              ›
            </button>
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
          lineHeight: "1.6",
        }}
      >
        <strong>About Branch Management</strong>
        <div style={{ marginTop: "6px" }}>
          • Branches are mapped to Country and Region.
          <br />
          • Branch information can be used for tender ownership,
          reporting and user-scoping.
          <br />
          • Branch changes should be recorded in Audit History.
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.45)",
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
              maxWidth: "760px",
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
                justifyContent: "space-between",
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
                  {editingBranch
                    ? "Edit Branch"
                    : "Add Branch"}
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    fontSize: "12px",
                    color: "#64748b",
                  }}
                >
                  Maintain branch details used by the
                  tender management system.
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
            <form onSubmit={saveBranch}>
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
                  label="Branch Name"
                  required
                  value={form.name}
                  onChange={(value) =>
                    updateForm("name", value)
                  }
                  placeholder="e.g. Mumbai Head Office"
                />

                <FormField
                  label="Code"
                  required
                  value={form.code}
                  onChange={(value) =>
                    updateForm("code", value)
                  }
                  placeholder="e.g. MUM"
                />

                <div
                  style={{
                    gridColumn: "1 / -1",
                  }}
                >
                  <FormField
                    label="Full Name"
                    value={form.fullName}
                    onChange={(value) =>
                      updateForm("fullName", value)
                    }
                    placeholder="Optional long-form name"
                  />
                </div>

                <SelectField
                  label="Country"
                  required
                  value={form.country}
                  onChange={(value) =>
                    updateForm("country", value)
                  }
                  options={[
                    "India",
                    "Nigeria",
                    "Kenya",
                    "UAE",
                    "United Kingdom",
                    "Other",
                  ]}
                  placeholder="Select country"
                />

                <SelectField
                  label="Region"
                  required
                  value={form.region}
                  onChange={(value) =>
                    updateForm("region", value)
                  }
                  options={[
                    "Maharashtra",
                    "Delhi",
                    "Karnataka",
                    "Tamil Nadu",
                    "Telangana",
                    "Nigeria Region",
                    "Kenya Region",
                    "UAE Region",
                    "Other Region",
                  ]}
                  placeholder="Select region"
                />

                <FormField
                  label="City"
                  required
                  value={form.city}
                  onChange={(value) =>
                    updateForm("city", value)
                  }
                  placeholder="e.g. Mumbai"
                />

                <SelectField
                  label="Status"
                  required
                  value={form.status}
                  onChange={(value) =>
                    updateForm("status", value)
                  }
                  options={[
                    "Active",
                    "Inactive",
                    "Archived",
                  ]}
                />

                <div
                  style={{
                    gridColumn: "1 / -1",
                  }}
                >
                  <FormField
                    label="Address"
                    value={form.address}
                    onChange={(value) =>
                      updateForm("address", value)
                    }
                    placeholder="Full office address"
                  />
                </div>

                <FormField
                  label="Phone"
                  value={form.phone}
                  onChange={(value) =>
                    updateForm("phone", value)
                  }
                  placeholder="e.g. +91 22 4000 1000"
                />

                <FormField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    updateForm("email", value)
                  }
                  placeholder="e.g. branch@company.com"
                />

                <div
                  style={{
                    gridColumn: "1 / -1",
                  }}
                >
                  <label style={labelStyle}>
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
                    placeholder="Internal notes for governance / audit"
                    rows={4}
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
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  padding: "16px 24px",
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
                  {editingBranch
                    ? "Save Changes"
                    : "Save Branch"}
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
  icon,
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
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

        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "9px",
            background: "#eff6ff",
            color: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          {icon}
        </div>
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
        fontSize: "11px",
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
          <span style={{ color: "#dc2626" }}>
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
          <span style={{ color: "#dc2626" }}>
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
          <option key={option}>{option}</option>
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
  padding: "15px 14px",
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
