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

function formatAmount(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`nav-item ${active ? "active" : ""}`}
    >
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
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

export default function AllTenders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [branch, setBranch] = useState("All Branches");
  const [category, setCategory] = useState("All Categories");

  const branches = [
    "All Branches",
    ...new Set(tenders.map((item) => item.branch)),
  ];

  const categories = [
    "All Categories",
    ...new Set(tenders.map((item) => item.category)),
  ];

  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      const searchText = search.toLowerCase();

      const searchMatch =
        tender.id.toLowerCase().includes(searchText) ||
        tender.client.toLowerCase().includes(searchText) ||
        tender.assigned.toLowerCase().includes(searchText);

      const statusMatch =
        status === "All Status" || tender.status === status;

      const branchMatch =
        branch === "All Branches" || tender.branch === branch;

      const categoryMatch =
        category === "All Categories" ||
        tender.category === category;

      return (
        searchMatch &&
        statusMatch &&
        branchMatch &&
        categoryMatch
      );
    });
  }, [search, status, branch, category]);

  const totalAmount = filteredTenders.reduce(
    (sum, tender) => sum + tender.amount,
    0
  );

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
          background: #f5f7fb;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
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
          background: #111a2b;
          color: white;
          min-height: 100vh;
          padding: 22px 14px;
          display: flex;
          flex-direction: column;
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
          transition: 0.15s ease;
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

        .sidebar-footer {
          margin-top: auto;
          padding: 16px 12px;
          border-top: 1px solid #243047;
        }

        .help-title {
          font-size: 12px;
          font-weight: 600;
        }

        .help-text {
          margin-top: 5px;
          font-size: 10px;
          color: #718096;
          line-height: 1.5;
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
          color: #10213f;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .icon-btn {
          position: relative;
          border: 0;
          background: transparent;
          color: #64748b;
          font-size: 20px;
          cursor: pointer;
        }

        .notification-dot {
          position: absolute;
          top: 1px;
          right: 0;
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
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
          margin-top: 2px;
          font-size: 10px;
          color: #8a98ae;
        }

        .chevron {
          color: #8a98ae;
        }

        /* BODY */

        .page-body {
          padding: 28px 32px 45px;
        }

        .welcome-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .welcome-row h2 {
          margin: 0;
          font-size: 21px;
          color: #10213f;
        }

        .welcome-row p {
          margin: 7px 0 0;
          color: #72809a;
          font-size: 12px;
        }

        .primary-btn {
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

        .primary-btn:hover {
          background: #1d4ed8;
        }

        /* KPI */

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .kpi-card {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 11px;
          padding: 18px;
          min-height: 125px;
        }

        .kpi-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #66758f;
          font-size: 11px;
        }

        .kpi-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
        }

        .icon-0 {
          background: #eef5ff;
          color: #2563eb;
        }

        .icon-1 {
          background: #ecfdf5;
          color: #16a34a;
        }

        .icon-2 {
          background: #f5f3ff;
          color: #7c3aed;
        }

        .icon-3 {
          background: #fff7ed;
          color: #f97316;
        }

        .kpi-value {
          margin-top: 14px;
          font-size: 23px;
          font-weight: 700;
          color: #111827;
        }

        .kpi-sub {
          margin-top: 5px;
          color: #8b98ad;
          font-size: 10px;
        }

        /* FILTER */

        .filter-panel {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 11px;
          padding: 19px;
          margin-bottom: 18px;
        }

        .filter-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .filter-title h2 {
          margin: 0;
          font-size: 14px;
          color: #10213f;
        }

        .reset-btn {
          border: 1px solid #e0e6ef;
          background: #f8fafc;
          color: #43516a;
          border-radius: 7px;
          padding: 7px 13px;
          font-size: 11px;
          cursor: pointer;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: 1.5fr 0.8fr 0.8fr 0.8fr;
          gap: 12px;
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
          height: 38px;
          border: 1px solid #dce3ed;
          border-radius: 7px;
          padding: 0 11px;
          color: #26364f;
          background: white;
          font-size: 11px;
          outline: none;
        }

        .filter-field input:focus,
        .filter-field select:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.08);
        }

        /* TABLE */

        .table-card {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 11px;
          overflow: hidden;
        }

        .table-header {
          padding: 18px 19px;
          border-bottom: 1px solid #e9edf3;
        }

        .table-header h2 {
          margin: 0;
          font-size: 14px;
          color: #10213f;
        }

        .table-header p {
          margin: 5px 0 0;
          color: #8a98ae;
          font-size: 10px;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        th {
          text-align: left;
          padding: 12px 12px;
          background: #fafbfd;
          border-bottom: 1px solid #e5e9f1;
          color: #65748d;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        td {
          padding: 13px 12px;
          border-bottom: 1px solid #edf0f5;
          color: #43516a;
          font-size: 11px;
          vertical-align: middle;
        }

        tbody tr:hover {
          background: #fafcff;
        }

        td strong {
          color: #1c2d48;
          font-weight: 600;
        }

        td small {
          display: block;
          margin-top: 3px;
          color: #9aa6b8;
          font-size: 9px;
        }

        .tender-id {
          color: #2563eb !important;
        }

        .amount {
          font-weight: 600;
          color: #26364f;
        }

        .status-badge {
          display: inline-flex;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 9px;
          font-weight: 600;
          white-space: nowrap;
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
          background: #fff1f2;
          color: #e11d48;
        }

        .view-button {
          border: 1px solid #d7deea;
          background: white;
          color: #2563eb;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 10px;
          cursor: pointer;
        }

        .view-button:hover {
          background: #eff6ff;
        }

        .empty-state {
          text-align: center;
          padding: 35px;
          color: #8a98ae;
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {
          .kpi-grid {
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
            padding: 0 0 25px;
          }

          .brand > div:not(.brand-mark),
          .nav-item span:last-child,
          .nav-label,
          .sidebar-footer {
            display: none;
          }

          .nav-item {
            justify-content: center;
            padding: 12px;
          }

          .topbar {
            padding: 0 16px;
          }

          .profile > div:not(.avatar),
          .chevron {
            display: none;
          }

          .page-body {
            padding: 20px 16px;
          }

          .welcome-row {
            align-items: flex-start;
            gap: 15px;
          }

          .kpi-grid {
            grid-template-columns: 1fr;
          }

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

           <a href="/" className="nav-item">
  <span className="nav-icon">⌂</span>
  <span>Dashboard</span>
</a>

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
              onClick={() => goTo("/my-tenders")}
            />

            <NavItem
              icon="◌"
              label="On Hold"
              onClick={() => goTo("/on-hold")}
            />

            <NavItem
              icon="◷"
              label="Result Awaited"
              onClick={() => goTo("/result-awaited")}
            />

            <div className="nav-label">
              MANAGEMENT
            </div>

            <NavItem
              icon="▥"
              label="Reports & Analytics"
              onClick={() => goTo("/reports")}
            />

            <NavItem
              icon="◎"
              label="Targets"
              onClick={() => goTo("/targets")}
            />

            <NavItem
              icon="⚠"
              label="Data Quality"
              onClick={() => goTo("/data-quality")}
            />

            <NavItem
              icon="⚙"
              label="Masters"
              onClick={() => goTo("/masters")}
            />

            <NavItem
              icon="♙"
              label="Users & Roles"
              onClick={() => goTo("/users-roles")}
            />

            <NavItem
              icon="≡"
              label="Audit History"
              onClick={() => goTo("/audit-history")}
            />

          </nav>

          <div className="sidebar-footer">
            <div className="help-title">
              Need help?
            </div>

            <div className="help-text">
              Contact your system administrator.
            </div>
          </div>

        </aside>

        {/* MAIN CONTENT */}

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

              <button
                className="icon-btn"
                type="button"
              >
                ♧
                <span className="notification-dot"></span>
              </button>

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

                <span className="chevron">
                  ⌄
                </span>

              </div>

            </div>

          </header>

          <main className="page-body">

            {/* PAGE HEADER */}

            <div className="welcome-row">

              <div>
                <h2>
                  Good afternoon, Pawan👋
                </h2>

                <p>
                  View and manage all tender opportunities.
                </p>
              </div>

              <button
                className="primary-btn"
                type="button"
              >
                ＋ New Tender
              </button>

            </div>

            {/* KPI CARDS */}

            <section className="kpi-grid">

              <div className="kpi-card">

                <div className="kpi-top">
                  <span>Total Tenders</span>

                  <div className="kpi-icon icon-0">
                    ↗
                  </div>
                </div>

                <div className="kpi-value">
                  {filteredTenders.length}
                </div>

                <div className="kpi-sub">
                  Matching records
                </div>

              </div>

              <div className="kpi-card">

                <div className="kpi-top">
                  <span>Total Potential Amount</span>

                  <div className="kpi-icon icon-1">
                    ₹
                  </div>
                </div>

                <div className="kpi-value">
                  {formatAmount(totalAmount)}
                </div>

                <div className="kpi-sub">
                  Filtered tender value
                </div>

              </div>

              <div className="kpi-card">

                <div className="kpi-top">
                  <span>Submitted</span>

                  <div className="kpi-icon icon-2">
                    ✓
                  </div>
                </div>

                <div className="kpi-value">
                  {
                    filteredTenders.filter(
                      (t) => t.status === "Submitted"
                    ).length
                  }
                </div>

                <div className="kpi-sub">
                  Currently submitted
                </div>

              </div>

              <div className="kpi-card">

                <div className="kpi-top">
                  <span>In Process</span>

                  <div className="kpi-icon icon-3">
                    ◔
                  </div>
                </div>

                <div className="kpi-value">
                  {
                    filteredTenders.filter(
                      (t) => t.status === "In Process"
                    ).length
                  }
                </div>

                <div className="kpi-sub">
                  Currently working
                </div>

              </div>

            </section>

            {/* SEARCH FILTERS */}

            <section className="filter-panel">

              <div className="filter-title">

                <h2>
                  Search & Filters
                </h2>

                <button
                  className="reset-btn"
                  type="button"
                  onClick={resetFilters}
                >
                  Reset
                </button>

              </div>

              <div className="filter-grid">

                <div className="filter-field">

                  <label>
                    Search
                  </label>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search Tender ID, Client or Assignee..."
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
                    <option>All Status</option>
                    <option>In Process</option>
                    <option>Submitted</option>
                    <option>Result Awaited</option>
                    <option>On Hold</option>
                    <option>Won</option>
                    <option>Lost</option>
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
                    {branches.map((item) => (
                      <option key={item}>
                        {item}
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
                    {categories.map((item) => (
                      <option key={item}>
                        {item}
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
                      <th>Tender ID</th>
                      <th>Client</th>
                      <th>Branch</th>
                      <th>Assigned To</th>
                      <th>Deadline</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Result</th>
                      <th>Action</th>
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
                              type="button"
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
