"use client";

import { useState } from "react";

const kpis = [
  {
    title: "Total Tenders",
    value: "1,245",
    subtitle: "All tenders",
    icon: "↗",
    iconClass: "blue",
  },
  {
    title: "Potential Amount",
    value: "₹25.4 Cr",
    subtitle: "Total potential value",
    icon: "₹",
    iconClass: "green",
  },
  {
    title: "Submitted",
    value: "842",
    subtitle: "67.6% of total",
    icon: "✓",
    iconClass: "purple",
  },
  {
    title: "In Process",
    value: "230",
    subtitle: "Currently working",
    icon: "◔",
    iconClass: "orange",
  },
  {
    title: "Won",
    value: "173",
    subtitle: "13.9% of total",
    icon: "↗",
    iconClass: "blue",
  },
  {
    title: "Result Awaited",
    value: "42",
    subtitle: "Need follow-up",
    icon: "₹",
    iconClass: "green",
  },
  {
    title: "On Hold",
    value: "38",
    subtitle: "Currently on hold",
    icon: "✓",
    iconClass: "purple",
  },
  {
    title: "Lost",
    value: "94",
    subtitle: "Unsuccessful",
    icon: "◔",
    iconClass: "orange",
  },
];

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

export default function Dashboard() {
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("August");
  const [business, setBusiness] = useState("All Business");
  const [status, setStatus] = useState("All");
  const [zsm, setZsm] = useState("All ZSM");
  const [category, setCategory] = useState("All Categories");
  const [branch, setBranch] = useState("All");

  const resetFilters = () => {
    setYear("2026");
    setMonth("August");
    setBusiness("All Business");
    setStatus("All");
    setZsm("All ZSM");
    setCategory("All Categories");
    setBranch("All");
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

        html,
        body {
          margin: 0;
          padding: 0;
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

        /* ================= SIDEBAR ================= */

        .sidebar {
          width: 245px;
          min-width: 245px;
          min-height: 100vh;
          background: #111a2b;
          color: white;
          padding: 22px 14px;
          display: flex;
          flex-direction: column;
          transition:
            width 0.25s ease,
            min-width 0.25s ease,
            padding 0.25s ease;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 10px 14px;
        }

        .brand-mark {
          width: 38px;
          height: 38px;
          min-width: 38px;
          border-radius: 9px;
          background: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }

        .brand-info {
          min-width: 0;
          flex: 1;
        }

        .brand-name {
          font-size: 17px;
          font-weight: 700;
          white-space: nowrap;
        }

        .brand-sub {
          margin-top: 2px;
          font-size: 11px;
          color: #94a3b8;
          white-space: nowrap;
        }

        /* COLLAPSE BUTTON */

        .collapse-button {
          width: 100%;
          height: 34px;
          border: 1px solid #26344d;
          background: #18233a;
          color: #aeb8ca;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          cursor: pointer;
          font-size: 11px;
          margin-bottom: 15px;
          transition: 0.15s ease;
        }

        .collapse-button:hover {
          background: #22304a;
          color: white;
        }

        .collapse-icon {
          font-size: 15px;
          line-height: 1;
          font-weight: 600;
        }

        .sidebar.collapsed .brand {
          justify-content: center;
          padding-left: 0;
          padding-right: 0;
        }

        .sidebar.collapsed .brand-info {
          display: none;
        }

        .sidebar.collapsed .collapse-button {
          width: 38px;
          margin-left: auto;
          margin-right: auto;
        }

        .sidebar.collapsed .collapse-text {
          display: none;
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

        .sidebar.collapsed .nav-label {
          text-align: center;
          font-size: 0;
          padding: 12px 0;
        }

        .sidebar.collapsed .nav-label::after {
          content: "•";
          font-size: 9px;
          color: #64748b;
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
          min-width: 17px;
          text-align: center;
          font-size: 14px;
        }

        .nav-item-collapsed {
          justify-content: center;
          padding-left: 10px;
          padding-right: 10px;
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

        .sidebar.collapsed .sidebar-footer {
          display: none;
        }

        /* ================= MAIN ================= */

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

        /* ================= PAGE ================= */

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

        /* ================= FILTERS ================= */

        .filter-panel {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 11px;
          padding: 13px 13px;
          margin-bottom: 18px;
        }

        .filter-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-title {
          font-size: 11px;
          font-weight: 700;
          color: #10213f;
          margin-right: 2px;
        }

        .filter-select {
          height: 36px;
          min-width: 90px;
          border: 1px solid #dce3ed;
          border-radius: 7px;
          padding: 0 10px;
          background: white;
          color: #34445d;
          font-size: 11px;
          outline: none;
        }

        .filter-select:focus {
          border-color: #2563eb;
        }

        .reset-btn {
          border: 0;
          background: #f1f3f7;
          color: #52627b;
          border-radius: 7px;
          height: 36px;
          padding: 0 13px;
          font-size: 11px;
          cursor: pointer;
        }

        .reset-btn:hover {
          background: #e7ebf2;
        }

        /* ================= KPI ================= */

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
          min-height: 115px;
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

        .icon-blue {
          background: #eef5ff;
          color: #2563eb;
        }

        .icon-green {
          background: #ecfdf5;
          color: #16a34a;
        }

        .icon-purple {
          background: #f5f3ff;
          color: #7c3aed;
        }

        .icon-orange {
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

        /* ================= CHART AREA ================= */

        .charts-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 14px;
        }

        .chart-card {
          background: white;
          border: 1px solid #e4e9f1;
          border-radius: 11px;
          min-height: 280px;
          padding: 18px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .chart-title {
          margin: 0;
          font-size: 14px;
          color: #10213f;
        }

        .chart-subtitle {
          margin-top: 5px;
          color: #8a98ae;
          font-size: 10px;
        }

        .year-select {
          height: 36px;
          border: 1px solid #dce3ed;
          border-radius: 7px;
          background: white;
          padding: 0 10px;
          color: #34445d;
          font-size: 11px;
        }

        /* BAR CHART */

        .bar-chart {
          height: 190px;
          margin-top: 28px;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 14px;
          border-bottom: 1px solid #e8edf4;
          padding: 0 10px;
        }

        .bar-group {
          height: 100%;
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 5px;
        }

        .bar {
          width: 9px;
          border-radius: 5px 5px 0 0;
          background: #2563eb;
        }

        .bar.secondary {
          background: #93c5fd;
        }

        .month-labels {
          display: flex;
          justify-content: space-around;
          color: #94a3b8;
          font-size: 9px;
          margin-top: 8px;
        }

        /* DONUT */

        .donut-area {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
        }

        .donut {
          width: 145px;
          height: 145px;
          border-radius: 50%;
          background:
            conic-gradient(
              #16a34a 0deg 160deg,
              #2563eb 160deg 245deg,
              #f97316 245deg 285deg,
              #7c3aed 285deg 320deg,
              #e11d48 320deg 360deg
            );
          position: relative;
        }

        .donut::after {
          content: "";
          position: absolute;
          inset: 34px;
          background: white;
          border-radius: 50%;
        }

        .legend {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          color: #52627b;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-green {
          background: #16a34a;
        }

        .dot-blue {
          background: #2563eb;
        }

        .dot-orange {
          background: #f97316;
        }

        .dot-purple {
          background: #7c3aed;
        }

        .dot-red {
          background: #e11d48;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1100px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .charts-grid {
            grid-template-columns: 1fr;
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
            padding: 0 0 14px;
          }

          .brand-info,
          .collapse-text,
          .nav-item span:last-child,
          .nav-label,
          .sidebar-footer {
            display: none;
          }

          .collapse-button {
            width: 38px;
            margin-left: auto;
            margin-right: auto;
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

          .filter-row {
            align-items: stretch;
            flex-direction: column;
          }

          .filter-select,
          .reset-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="app-shell">

        {/* ================= SIDEBAR ================= */}

        <aside className="sidebar">

          {/* BRAND */}

          <div className="brand">

            <div className="brand-mark">
              T
            </div>

            <div className="brand-info">
              <div className="brand-name">
                TenderHub
              </div>

              <div className="brand-sub">
                Management Tool
              </div>
            </div>

          </div>

            <div className="nav-label">
              TENDERS
            </div>

            <NavItem
              icon="▣"
              label="All Tenders"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/all-tenders")}
            />

            <NavItem
              icon="◉"
              label="My Tenders"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/my-tenders")}
            />

            <NavItem
              icon="◌"
              label="On Hold"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/on-hold")}
            />

            <NavItem
              icon="◷"
              label="Result Awaited"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/result-awaited")}
            />

            <div className="nav-label">
              MANAGEMENT
            </div>

            <NavItem
              icon="▥"
              label="Reports & Analytics"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/reports")}
            />

            <NavItem
              icon="◎"
              label="Targets"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/targets")}
            />

            <NavItem
              icon="⚠"
              label="Data Quality"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/data-quality")}
            />

            <NavItem
              icon="⚙"
              label="Masters"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/masters")}
            />

            <NavItem
              icon="♙"
              label="Users & Roles"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/users-roles")}
            />

            <NavItem
              icon="≡"
              label="Audit History"
              active={false}
              collapsed={sidebarCollapsed}
              onClick={() => goTo("/audit-history")}
            />

          </nav>

          {/* FOOTER */}

          <div className="sidebar-footer">

            <div className="help-title">
              Need help?
            </div>

            <div className="help-text">
              Contact your system administrator.
            </div>

          </div>

        </aside>

        {/* ================= MAIN ================= */}

        <section className="content">

          {/* TOP BAR */}

          <header className="topbar">

            <div>

              <div className="breadcrumb">
                Home / Dashboard
              </div>

              <h1>
                Dashboard
              </h1>

            </div>

            <div className="top-actions">

              <button
                type="button"
                className="icon-btn"
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

          {/* PAGE */}

          <main className="page-body">

            {/* PAGE HEADER */}

            <div className="welcome-row">

              <div>

                <h2>
                  Good afternoon, Pawan👋
                </h2>

                <p>
                  Here's your tender performance overview.
                </p>

              </div>

              <button
                className="primary-btn"
                type="button"
                onClick={() => goTo("/all-tenders")}
              >
                + New Tender
              </button>

            </div>

            {/* FILTERS */}

            <section className="filter-panel">

              <div className="filter-row">

                <span className="filter-title">
                  Filters
                </span>

                <select
                  className="filter-select"
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value)
                  }
                >
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>

                <select
                  className="filter-select"
                  value={month}
                  onChange={(e) =>
                    setMonth(e.target.value)
                  }
                >
                  <option>August</option>
                  <option>July</option>
                  <option>June</option>
                  <option>May</option>
                </select>

                <select
                  className="filter-select"
                  value={business}
                  onChange={(e) =>
                    setBusiness(e.target.value)
                  }
                >
                  <option>All Business</option>
                  <option>Corporate</option>
                  <option>Retail</option>
                  <option>Government</option>
                </select>

                <select
                  className="filter-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>Submitted</option>
                  <option>In Process</option>
                  <option>Won</option>
                  <option>Lost</option>
                  <option>On Hold</option>
                </select>

                <select
                  className="filter-select"
                  value={zsm}
                  onChange={(e) =>
                    setZsm(e.target.value)
                  }
                >
                  <option>All ZSM</option>
                  <option>Rahul</option>
                  <option>Priya</option>
                  <option>Amit</option>
                </select>

                <select
                  className="filter-select"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  <option>All Categories</option>
                  <option>IT Services</option>
                  <option>Consulting</option>
                  <option>Technology</option>
                  <option>Infrastructure</option>
                </select>

                <select
                  className="filter-select"
                  value={branch}
                  onChange={(e) =>
                    setBranch(e.target.value)
                  }
                >
                  <option>All</option>
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </select>

                <button
                  className="reset-btn"
                  type="button"
                  onClick={resetFilters}
                >
                  Reset
                </button>

              </div>

            </section>

            {/* KPI CARDS */}

            <section className="kpi-grid">

              {kpis.map((item) => (
                <div
                  className="kpi-card"
                  key={item.title}
                >

                  <div className="kpi-top">

                    <span>
                      {item.title}
                    </span>

                    <div
                      className={`kpi-icon icon-${item.iconClass}`}
                    >
                      {item.icon}
                    </div>

                  </div>

                  <div className="kpi-value">
                    {item.value}
                  </div>

                  <div className="kpi-sub">
                    {item.subtitle}
                  </div>

                </div>
              ))}

            </section>

            {/* CHARTS */}

            <section className="charts-grid">

              {/* TENDER PERFORMANCE */}

              <div className="chart-card">

                <div className="chart-header">

                  <div>

                    <h2 className="chart-title">
                      Tender Performance
                    </h2>

                    <div className="chart-subtitle">
                      Monthly submitted vs won tenders
                    </div>

                  </div>

                  <select
                    className="year-select"
                    value={year}
                    onChange={(e) =>
                      setYear(e.target.value)
                    }
                  >
                    <option>2026</option>
                    <option>2025</option>
                  </select>

                </div>

                <div className="bar-chart">

                  <div className="bar-group">
                    <div
                      className="bar"
                      style={{ height: "35%" }}
                    ></div>

                    <div
                      className="bar secondary"
                      style={{ height: "18%" }}
                    ></div>
                  </div>

                  <div className="bar-group">
                    <div
                      className="bar"
                      style={{ height: "52%" }}
                    ></div>

                    <div
                      className="bar secondary"
                      style={{ height: "25%" }}
                    ></div>
                  </div>

                  <div className="bar-group">
                    <div
                      className="bar"
                      style={{ height: "42%" }}
                    ></div>

                    <div
                      className="bar secondary"
                      style={{ height: "22%" }}
                    ></div>
                  </div>

                  <div className="bar-group">
                    <div
                      className="bar"
                      style={{ height: "70%" }}
                    ></div>

                    <div
                      className="bar secondary"
                      style={{ height: "35%" }}
                    ></div>
                  </div>

                  <div className="bar-group">
                    <div
                      className="bar"
                      style={{ height: "50%" }}
                    ></div>

                    <div
                      className="bar secondary"
                      style={{ height: "28%" }}
                    ></div>
                  </div>

                  <div className="bar-group">
                    <div
                      className="bar"
                      style={{ height: "75%" }}
                    ></div>

                    <div
                      className="bar secondary"
                      style={{ height: "40%" }}
                    ></div>
                  </div>

                </div>

                <div className="month-labels">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>

              </div>

              {/* OUTCOME DISTRIBUTION */}

              <div className="chart-card">

                <div className="chart-header">

                  <div>

                    <h2 className="chart-title">
                      Outcome Distribution
                    </h2>

                    <div className="chart-subtitle">
                      Current tender result mix
                    </div>

                  </div>

                </div>

                <div className="donut-area">

                  <div className="donut"></div>

                  <div className="legend">

                    <div className="legend-item">
                      <span className="legend-dot dot-green"></span>
                      Won
                    </div>

                    <div className="legend-item">
                      <span className="legend-dot dot-blue"></span>
                      Submitted
                    </div>

                    <div className="legend-item">
                      <span className="legend-dot dot-orange"></span>
                      In Process
                    </div>

                    <div className="legend-item">
                      <span className="legend-dot dot-purple"></span>
                      On Hold
                    </div>

                    <div className="legend-item">
                      <span className="legend-dot dot-red"></span>
                      Lost
                    </div>

                  </div>

                </div>

              </div>

            </section>

          </main>

        </section>

      </div>
    </>
  );
}
