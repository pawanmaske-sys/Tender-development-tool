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
    assigned: "Priya",
    deadline: "25 Aug 2026",
    amount: 850000,
    status: "Submitted",
    result: "-",
    category: "Consulting",
  },
  {
    id: "T-05623",
    client: "Global Tech",
    branch: "Delhi",
    assigned: "Amit",
    deadline: "28 Aug 2026",
    amount: 2100000,
    status: "Result Awaited",
    result: "-",
    category: "Technology",
  },
  {
    id: "T-05624",
    client: "Metro Industries",
    branch: "Pune",
    assigned: "Sneha",
    deadline: "30 Aug 2026",
    amount: 650000,
    status: "Won",
    result: "Won",
    category: "Infrastructure",
  },
  {
    id: "T-05625",
    client: "Sunrise Pvt Ltd",
    branch: "Bangalore",
    assigned: "Rahul",
    deadline: "02 Sep 2026",
    amount: 1450000,
    status: "On Hold",
    result: "-",
    category: "IT Services",
  },
  {
    id: "T-05626",
    client: "Prime Solutions",
    branch: "Mumbai",
    assigned: "Priya",
    deadline: "05 Sep 2026",
    amount: 980000,
    status: "Lost",
    result: "Lost",
    category: "Consulting",
  },
];

const statusOptions = [
  "All Status",
  "In Process",
  "Submitted",
  "Result Awaited",
  "On Hold",
  "Won",
  "Lost",
];

function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatusBadge({ status }) {
  const className = status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span className={`status-badge status-${className}`}>
      {status}
    </span>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function AllTenders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [branch, setBranch] = useState("All Branches");
  const [category, setCategory] = useState("All Categories");

  const branches = [
    "All Branches",
    ...new Set(tenders.map((tender) => tender.branch)),
  ];

  const categories = [
    "All Categories",
    ...new Set(tenders.map((tender) => tender.category)),
  ];

  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        tender.id.toLowerCase().includes(searchText) ||
        tender.client.toLowerCase().includes(searchText) ||
        tender.assigned.toLowerCase().includes(searchText);

      const matchesStatus =
        status === "All Status" ||
        tender.status === status;

      const matchesBranch =
        branch === "All Branches" ||
        tender.branch === branch;

      const matchesCategory =
        category === "All Categories" ||
        tender.category === category;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesBranch &&
        matchesCategory
      );
    });
  }, [search, status, branch, category]);

  const totalAmount = filteredTenders.reduce(
    (sum, tender) => sum + tender.amount,
    0
  );

  const submittedCount = filteredTenders.filter(
    (tender) => tender.status === "Submitted"
  ).length;

  const inProcessCount = filteredTenders.filter(
    (tender) => tender.status === "In Process"
  ).length;

  const resetFilters = () => {
    setSearch("");
    setStatus("All Status");
    setBranch("All Branches");
    setCategory("All Categories");
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          background: #f5f7fb;
          color: #10213f;
        }

        button,
        input,
        select {
          font: inherit;
        }

        .app-shell {
          min-height: 100vh;
          display: flex;
          background: #f5f7fb;
        }

        /* SIDEBAR */

        .sidebar {
          width: 245px;
          min-width: 245px;
          min-height: 100vh;
          background: #111a2b;
          color: white;
          padding: 22px 14px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 10px 28px;
        }

        .brand-mark {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }

        .brand-name {
          font-size: 17px;
          font-weight: 700;
        }

        .brand-sub {
          margin-top: 2px;
          font-size: 11px;
          color: #94a3b8;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nav-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #64748b;
          padding: 20px 10px 7px;
        }

        .nav-item {
          width: 100%;
          border: 0;
          background: transparent;
          color: #aeb8ca;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 12px 14px;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
          font-size: 13px;
        }

        .nav-item:hover {
          background: #1a263c;
          color: white;
        }

        .nav-item.active {
          background: #285be8;
          color: white;
        }

        .nav-icon {
          width: 17px;
          text-align: center;
          font-size: 14px;
        }

        /* MAIN */

        .content {
          flex: 1;
          min-width: 0;
        }

        .topbar {
          height: 80px;
          background: white;
          border-bottom: 1px solid #e5e9f1;
          padding: 0 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .breadcrumb {
          color: #8a98ae;
          font-size: 11px;
          margin-bottom: 5px;
        }

        .topbar h1 {
          margin: 0;
          font-size: 20px;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification {
          position: relative;
          font-size: 19px;
          color: #64748b;
        }

        .notification-dot {
          position: absolute;
          top: 0;
          right: -2px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #e6efff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .profile-name {
          font-size: 12px;
          font-weight: 700;
        }

        .profile-role {
          font-size: 10px;
          color: #8a98ae;
          margin-top: 2px;
        }

        .page-body {
          padding: 28px 32px 50px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 22px;
        }

        .page-header h2 {
          margin: 0;
          font-size: 22px;
        }

        .page-header p {
          margin: 7px 0 0;
          color: #72809a;
          font-size: 12px;
        }

        .new-tender-button {
          border: 0;
          background: #2563eb;
          color: white;
          padding: 11px 17px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.18);
        }

        .new-tender-button:hover {
          background: #1d4ed8;
        }

        /* SUMMARY */

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .summary-card {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 11px;
          padding: 18px;
          min-height: 118px;
        }

        .summary-card span {
          display: block;
          font-size: 11px;
          color: #66758f;
        }

        .summary-card strong {
          display: block;
          margin-top: 14px;
          font-size: 23px;
          color: #111827;
        }

        .summary-card small {
          display: block;
          margin-top: 5px;
          color: #8b98ad;
          font-size: 10px;
        }

        /* FILTER */

        .filter-panel {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 11px;
          padding: 18px;
          margin-bottom: 18px;
        }

        .filter-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .filter-title h2 {
          margin: 0;
          font-size: 14px;
        }

        .reset-button {
          border: 0;
          background: #f1f3f7;
          color: #52627b;
          padding: 9px 14px;
          border-radius: 7px;
          font-size: 11px;
          cursor: pointer;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 13px;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .filter-field label {
          font-size: 10px;
          color: #52627b;
          font-weight: 600;
        }

        .filter-field input,
        .filter-field select {
          width: 100%;
          height: 38px;
          border: 1px solid #dce3ed;
          border-radius: 7px;
          background: white;
          padding: 0 11px;
          color: #34445d;
          font-size: 11px;
          outline: none;
        }

        .filter-field input:focus,
        .filter-field select:focus {
          border-color: #2563eb;
        }

        .filter-field input::placeholder {
          color: #9aa6b8;
        }

        /* TABLE */

        .table-card {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 11px;
          overflow: hidden;
        }

        .table-header {
          padding: 18px;
          border-bottom: 1px solid #e8edf4;
        }

        .table-header h2 {
          margin: 0;
          font-size: 14px;
        }

        .table-header p {
          margin: 5px 0 0;
          color: #8a98ae;
          font-size: 10px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        th {
          background: #fbfcfe;
          color: #718096;
          font-size: 10px;
          font-weight: 700;
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid #e8edf4;
          white-space: nowrap;
        }

        td {
          padding: 13px 12px;
          border-bottom: 1px solid #edf0f5;
          font-size: 11px;
          color: #52627b;
          white-space: nowrap;
        }

        tbody tr:hover {
          background: #fafcff;
        }

        .tender-id {
          color: #2563eb;
          font-weight: 600;
        }

        td strong {
          display: block;
          color: #26344d;
          font-size: 11px;
        }

        td small {
          display: block;
          color: #8a98ae;
          font-size: 9px;
          margin-top: 3px;
        }

        .amount {
          color: #26344d;
          font-weight: 600;
        }

        /* STATUS */

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 9px;
          font-weight: 600;
        }

        .status-in-process {
          background: #eef5ff;
          color: #2563eb;
        }

        .status-submitted {
          background: #ecfdf5;
          color: #16a34a;
        }

        .status-result-awaited {
          background: #fff7ed;
          color: #ea580c;
        }

        .status-on-hold {
          background: #f5f3ff;
          color: #7c3aed;
        }

        .status-won {
          background: #ecfdf5;
          color: #15803d;
        }

        .status-lost {
          background: #fef2f2;
          color: #dc2626;
        }

        .view-button {
          border: 1px solid #d9e1ed;
          background: white;
          color: #34445d;
          border-radius: 6px;
          padding: 6px 13px;
          font-size: 10px;
          cursor: pointer;
        }

        .view-button:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .empty-state {
          text-align: center;
          padding: 35px;
          color: #8a98ae;
        }

        @media (max-width: 1100px) {
          .summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 750px) {
          .sidebar {
            width: 70px;
            min-width: 70px;
            padding: 15px 8px;
          }

          .brand {
            justify-content: center;
          }

          .brand-name,
          .brand-sub,
          .nav-item span:last-child {
            display: none;
          }

          .nav-item {
            justify-content: center;
          }

          .topbar {
            padding: 0 16px;
          }

          .profile-name,
          .profile-role {
            display: none;
          }

          .page-body {
            padding: 20px 16px;
          }

          .summary-grid,
          .filter-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="app-shell">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <div className="brand">
            <div className="brand-mark">T</div>

            <div>
              <div className="brand-name">
                TenderHub
              </div>

              <div className="brand-sub">
                Management Tool
              </div>
            </div>
          </div>

          <nav className="nav">

            <NavItem
              icon="⌂"
              label="Dashboard"
              active={false}
              onClick={() => goTo("/")}
            />

            <div className="nav-label">
              TENDERS
            </div>

            <NavItem
              icon="▣"
              label="All Tenders"
              active={true}
              onClick={() => goTo("/all-tenders")}
            />

            <NavItem
              icon="◉"
              label="My Tenders"
              active={false}
              onClick={() => goTo("/my-tenders")}
            />

            <NavItem
              icon="◌"
              label="On Hold"
              active={false}
              onClick={() => goTo("/on-hold")}
            />

            <NavItem
              icon="◷"
              label="Result Awaited"
              active={false}
              onClick={() => goTo("/result-awaited")}
            />

            <div className="nav-label">
              MANAGEMENT
            </div>

            <NavItem
              icon="▥"
              label="Reports & Analytics"
              active={false}
              onClick={() => goTo("/reports")}
            />

            <NavItem
              icon="◎"
              label="Targets"
              active={false}
              onClick={() => goTo("/targets")}
            />

            <NavItem
              icon="⚠"
              label="Data Quality"
              active={false}
              onClick={() => goTo("/data-quality")}
            />

            <NavItem
              icon="⚙"
              label="Masters"
              active={false}
              onClick={() => goTo("/masters")}
            />

            <NavItem
              icon="♙"
              label="Users & Roles"
              active={false}
              onClick={() => goTo("/users-roles")}
            />

            <NavItem
              icon="≡"
              label="Audit History"
              active={false}
              onClick={() => goTo("/audit-history")}
            />

          </nav>

        </aside>

        {/* MAIN */}

        <section className="content">

          {/* TOP BAR */}

          <header className="topbar">

            <div>
              <div className="breadcrumb">
                Home / Tenders / All Tenders
              </div>

              <h1>
                All Tenders
              </h1>
            </div>

            <div className="top-actions">

              <div className="notification">
                ♧
                <span className="notification-dot"></span>
              </div>

              <div className="profile">

                <div className="avatar">
                  PM
                </div>

                <div>
                  <div className="profile-name">
                    Pawan Maske
                  </div>

                  <div className="profile-role">
                    Tender Executive
                  </div>
                </div>

                <span>
                  ⌄
                </span>

              </div>

            </div>

          </header>

          <main className="page-body">

            {/* PAGE HEADER */}

            <div className="page-header">

              <div>
                <h2>
                  Good afternoon, Pawan👋
                </h2>

                <p>
                  View and manage all tender opportunities.
                </p>
              </div>

              <button
                className="new-tender-button"
                onClick={() => alert("New Tender module coming next.")}
              >
                + New Tender
              </button>

            </div>

            {/* SUMMARY */}

            <section className="summary-grid">

              <div className="summary-card">
                <span>Total Tenders</span>
                <strong>{filteredTenders.length}</strong>
                <small>Matching records</small>
              </div>

              <div className="summary-card">
                <span>Total Potential Amount</span>
                <strong>{formatAmount(totalAmount)}</strong>
                <small>Filtered tender value</small>
              </div>

              <div className="summary-card">
                <span>Submitted</span>
                <strong>{submittedCount}</strong>
                <small>Currently submitted</small>
              </div>

              <div className="summary-card">
                <span>In Process</span>
                <strong>{inProcessCount}</strong>
                <small>Currently working</small>
              </div>

            </section>

            {/* FILTERS */}

            <section className="filter-panel">

              <div className="filter-title">

                <h2>
                  Search & Filters
                </h2>

                <button
                  className="reset-button"
                  onClick={resetFilters}
                >
                  Reset
                </button>

              </div>

              <div className="filter-grid">

                <div className="filter-field search-field">

                  <label>
                    Search
                  </label>

                  <input
                    type="text"
                    placeholder="Search Tender ID, Client or Assignee..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

                <div className="filter-field">

                  <label>
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                  >
                    {statusOptions.map((option) => (
                      <option key={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="filter-field">

                  <label>
                    Branch
                  </label>

                  <select
                    value={branch}
                    onChange={(e) =>
                      setBranch(e.target.value)
                    }
                  >
                    {branches.map((option) => (
                      <option key={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="filter-field">

                  <label>
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  >
                    {categories.map((option) => (
                      <option key={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

            </section>

            {/* TABLE */}

            <section className="table-card">

              <div className="table-header">

                <h2>
                  Tender List
                </h2>

                <p>
                  {filteredTenders.length} records found
                </p>

              </div>

              <div className="table-wrapper">

                <table>

                  <thead>
                    <tr>
                      <th>TENDER ID</th>
                      <th>CLIENT</th>
                      <th>BRANCH</th>
                      <th>ASSIGNED TO</th>
                      <th>DEADLINE</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                      <th>RESULT</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredTenders.length > 0 ? (

                      filteredTenders.map((tender) => (

                        <tr key={tender.id}>

                          <td>
                            <strong className="tender-id">
                              {tender.id}
                            </strong>
                          </td>

                          <td>
                            <strong>
                              {tender.client}
                            </strong>

                            <small>
                              {tender.category}
                            </small>
                          </td>

                          <td>
                            {tender.branch}
                          </td>

                          <td>
                            {tender.assigned}
                          </td>

                          <td>
                            {tender.deadline}
                          </td>

                          <td className="amount">
                            {formatAmount(tender.amount)}
                          </td>

                          <td>
                            <StatusBadge
                              status={tender.status}
                            />
                          </td>

                          <td>
                            {tender.result}
                          </td>

                          <td>
                            <button
                              className="view-button"
                              onClick={() =>
                                alert(
                                  `Viewing ${tender.id}`
                                )
                              }
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
                          className="empty-state"
                        >
                          No tenders found.
                        </td>
                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </section>

          </main>

        </section>

      </div>
    </>
  );
}
