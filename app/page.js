"use client";

import { useMemo, useState } from "react";

const tenders = [
  {
    id: "T_05621",
    client: "ABC Ltd",
    branch: "Pune",
    assigned: "Rahul",
    deadline: "22 Aug 2026",
    days: 2,
    status: "In Process",
    result: "—",
    amount: 1250000,
  },
  {
    id: "T_05624",
    client: "XYZ Travels",
    branch: "Mumbai",
    assigned: "Amit",
    deadline: "23 Aug 2026",
    days: 3,
    status: "Submitted",
    result: "Result Awaited",
    amount: 850000,
  },
  {
    id: "T_05630",
    client: "PQR Group",
    branch: "Delhi",
    assigned: "Neha",
    deadline: "24 Aug 2026",
    days: 4,
    status: "Completed",
    result: "Won",
    amount: 2100000,
  },
  {
    id: "T_05633",
    client: "Global Air",
    branch: "Pune",
    assigned: "Pawan",
    deadline: "25 Aug 2026",
    days: 5,
    status: "In Process",
    result: "—",
    amount: 675000,
  },
  {
    id: "T_05641",
    client: "Metro Corp",
    branch: "Bangalore",
    assigned: "Sanjay",
    deadline: "28 Aug 2026",
    days: 8,
    status: "On Hold",
    result: "—",
    amount: 490000,
  },
];

const kpis = [
  ["Total Tenders", "1,245", "All tenders"],
  ["Potential Amount", "₹25.4 Cr", "Total potential value"],
  ["Submitted", "842", "67.6% of total"],
  ["In Process", "230", "Currently working"],
  ["Won", "173", "13.9% of total"],
  ["Result Awaited", "42", "Need follow-up"],
  ["On Hold", "38", "Currently on hold"],
  ["Lost", "94", "Unsuccessful"],
];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [branch, setBranch] = useState("All");
  const [result, setResult] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tenders.filter((tender) => {
      const matchesSearch =
        !search ||
        [tender.id, tender.client, tender.branch, tender.assigned]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesBranch =
        branch === "All" || tender.branch === branch;

      const matchesResult =
        result === "All" || tender.result === result;

      return matchesSearch && matchesBranch && matchesResult;
    });
  }, [search, branch, result]);

  const resetFilters = () => {
    setBranch("All");
    setResult("All");
    setSearch("");
  };

  return (
    <main className="app-shell">

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
            active={activeNav === "Dashboard"}
            onClick={setActiveNav}
          />

          <div className="nav-label">
            TENDERS
          </div>

          <NavItem
            icon="▣"
            label="All Tenders"
            active={activeNav === "All Tenders"}
            onClick={setActiveNav}
          />

          <NavItem
            icon="◉"
            label="My Tenders"
            active={activeNav === "My Tenders"}
            onClick={setActiveNav}
          />

          <NavItem
            icon="◌"
            label="On Hold"
            active={activeNav === "On Hold"}
            onClick={setActiveNav}
          />

          <NavItem
            icon="◷"
            label="Result Awaited"
            active={activeNav === "Result Awaited"}
            onClick={setActiveNav}
          />

          <div className="nav-label">
            MANAGEMENT
          </div>

          <NavItem
            icon="▥"
            label="Reports & Analytics"
            active={activeNav === "Reports & Analytics"}
            onClick={setActiveNav}
          />

          <NavItem
            icon="◎"
            label="Targets"
            active={activeNav === "Targets"}
            onClick={setActiveNav}
          />

          <NavItem
            icon="⚠"
            label="Data Quality"
            active={activeNav === "Data Quality"}
            onClick={setActiveNav}
          />

          <NavItem
            icon="⚙"
            label="Masters"
            active={activeNav === "Masters"}
            onClick={setActiveNav}
          />

          <NavItem
            icon="♙"
            label="Users & Roles"
            active={activeNav === "Users & Roles"}
            onClick={setActiveNav}
          />

          <NavItem
            icon="≡"
            label="Audit History"
            active={activeNav === "Audit History"}
            onClick={setActiveNav}
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
              Home / Dashboard
            </div>

            <h1>
              {activeNav}
            </h1>
          </div>

          <div className="top-actions">

            <button
              className="icon-btn"
              aria-label="Notifications"
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

        {/* PAGE BODY */}
        <div className="page-body">

          {/* WELCOME */}
          <div className="welcome-row">

            <div>
              <h2>
                Good afternoon, Pawan👋
              </h2>

              <p>
                Here&apos;s your tender performance overview.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() =>
                setActiveNav("Create Tender")
              }
            >
              <span>＋</span>
              New Tender
            </button>

          </div>

          {/* FILTERS */}
          <section className="filter-bar">

            <div className="filter-title">
              Filters
            </div>

            <select>
              <option>2026</option>
              <option>2025</option>
            </select>

            <select>
              <option>August</option>
              <option>July</option>
            </select>

            <select>
              <option>All Business</option>
              <option>Air</option>
              <option>Non Air</option>
            </select>

            <select
              value={branch}
              onChange={(event) =>
                setBranch(event.target.value)
              }
            >
              <option>All</option>
              <option>Pune</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>

            <select>
              <option>All ZSM</option>
              <option>ZSM North</option>
              <option>ZSM West</option>
            </select>

            <select>
              <option>All Categories</option>
              <option>Air</option>
              <option>Accommodation</option>
              <option>MICE</option>
            </select>

            <select
              value={result}
              onChange={(event) =>
                setResult(event.target.value)
              }
            >
              <option>All</option>
              <option>Won</option>
              <option>Lost</option>
              <option>Result Awaited</option>
            </select>

            <button
              className="reset-btn"
              onClick={resetFilters}
            >
              Reset
            </button>

          </section>

          {/* KPI CARDS */}
          <section className="kpi-grid">

            {kpis.map(([title, value, sub], index) => (

              <div
                className="kpi-card"
                key={title}
              >

                <div className="kpi-top">

                  <span>
                    {title}
                  </span>

                  <div
                    className={`kpi-icon icon-${
                      index % 4
                    }`}
                  >
                    {
                      ["↗", "₹", "✓", "◔"][
                        index % 4
                      ]
                    }
                  </div>

                </div>

                <div className="kpi-value">
                  {value}
                </div>

                <div className="kpi-sub">
                  {sub}
                </div>

              </div>

            ))}

          </section>

          {/* CHARTS */}
          <section className="analytics-grid">

            {/* PERFORMANCE */}
            <div className="panel">

              <div className="panel-head">

                <div>
                  <h3>
                    Tender Performance
                  </h3>

                  <p>
                    Monthly submitted vs won tenders
                  </p>
                </div>

                <select className="small-select">
                  <option>2026</option>
                  <option>2025</option>
                </select>

              </div>

              <div className="chart">

                {[
                  42,
                  55,
                  48,
                  68,
                  60,
                  76,
                  70,
                  84,
                  72,
                  91,
                  82,
                  96,
                ].map((height, index) => (

                  <div
                    className="bar-group"
                    key={index}
                  >

                    <div
                      className="bar submitted-bar"
                      style={{
                        height: `${height}%`,
                      }}
                    ></div>

                    <div
                      className="bar won-bar"
                      style={{
                        height: `${Math.max(
                          12,
                          height * 0.38
                        )}%`,
                      }}
                    ></div>

                    <span>
                      {
                        [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ][index]
                      }
                    </span>

                  </div>

                ))}

              </div>

              <div className="legend">

                <span>
                  <i className="legend-dot submitted-dot"></i>
                  Submitted
                </span>

                <span>
                  <i className="legend-dot won-dot"></i>
                  Won
                </span>

              </div>

            </div>

            {/* OUTCOME */}
            <div className="panel">

              <div className="panel-head">

                <div>
                  <h3>
                    Outcome Distribution
                  </h3>

                  <p>
                    Current tender result mix
                  </p>
                </div>

              </div>

              <div className="donut-wrap">

                <div className="donut">

                  <div>
                    <strong>
                      1,245
                    </strong>

                    <span>
                      Total
                    </span>
                  </div>

                </div>

                <div className="outcome-list">

                  <Outcome
                    label="Won"
                    value="173"
                    pct="13.9%"
                    cls="won"
                  />

                  <Outcome
                    label="Result Awaited"
                    value="42"
                    pct="3.4%"
                    cls="awaited"
                  />

                  <Outcome
                    label="Lost"
                    value="94"
                    pct="7.6%"
                    cls="lost"
                  />

                  <Outcome
                    label="In Process"
                    value="230"
                    pct="18.5%"
                    cls="process"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* LOWER SECTION */}
          <section className="lower-grid">

            {/* NEAR DEADLINE */}
            <div className="panel">

              <div className="panel-head">

                <div>
                  <h3>
                    Near Deadline
                  </h3>

                  <p>
                    Tenders requiring immediate attention
                  </p>
                </div>

                <button
                  className="text-btn"
                  onClick={() =>
                    setActiveNav("All Tenders")
                  }
                >
                  View all →
                </button>

              </div>

              <div className="tender-list">

                {filtered
                  .slice(0, 4)
                  .map((tender) => (

                    <div
                      className="tender-row"
                      key={tender.id}
                    >

                      <div className="tender-id">
                        {tender.id}
                      </div>

                      <div className="tender-main">

                        <strong>
                          {tender.client}
                        </strong>

                        <span>
                          {tender.branch} ·{" "}
                          {tender.assigned}
                        </span>

                      </div>

                      <div className="deadline">

                        <strong>
                          {tender.days} days left
                        </strong>

                        <span>
                          {tender.deadline}
                        </span>

                      </div>

                      <StatusBadge
                        status={tender.status}
                      />

                    </div>

                  ))}

              </div>

            </div>

            {/* RESULT FOLLOW UP */}
            <div className="panel">

              <div className="panel-head">

                <div>
                  <h3>
                    Result Follow-up
                  </h3>

                  <p>
                    Submitted tenders awaiting outcome
                  </p>
                </div>

                <button
                  className="text-btn"
                  onClick={() =>
                    setActiveNav("Result Awaited")
                  }
                >
                  View all →
                </button>

              </div>

              <div className="followup">

                <div className="follow-card danger">

                  <span>●</span>

                  <div>
                    <strong>5</strong>
                    <small>Overdue</small>
                  </div>

                </div>

                <div className="follow-card warning">

                  <span>●</span>

                  <div>
                    <strong>3</strong>
                    <small>Expected today</small>
                  </div>

                </div>

                <div className="follow-card info">

                  <span>●</span>

                  <div>
                    <strong>7</strong>
                    <small>Expected shortly</small>
                  </div>

                </div>

              </div>

              <div className="result-mini">

                <div>
                  <span>T_05624</span>
                  <strong>XYZ Travels</strong>
                  <em>Today</em>
                </div>

                <div>
                  <span>T_05651</span>
                  <strong>Global Air</strong>
                  <em>23 Aug</em>
                </div>

                <div>
                  <span>T_05663</span>
                  <strong>Metro Corp</strong>
                  <em>24 Aug</em>
                </div>

              </div>

            </div>

          </section>

          {/* RECENT TENDERS */}
          <section className="panel recent-panel">

            <div className="panel-head">

              <div>
                <h3>
                  Recent Tenders
                </h3>

                <p>
                  Latest tender activity
                </p>
              </div>

              <div className="search-box">

                <span>
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search tender, client..."
                />

              </div>

            </div>

            <div className="table-wrap">

              <table>

                <thead>

                  <tr>
                    <th>Tender ID</th>
                    <th>Client</th>
                    <th>Branch</th>
                    <th>Assigned To</th>
                    <th>Deadline</th>
                    <th>Work Status</th>
                    <th>Result</th>
                    <th>Amount</th>
                  </tr>

                </thead>

                <tbody>

                  {filtered.map((tender) => (

                    <tr key={tender.id}>

                      <td>
                        <button className="link-btn">
                          {tender.id}
                        </button>
                      </td>

                      <td>
                        <strong>
                          {tender.client}
                        </strong>
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

                      <td>
                        <StatusBadge
                          status={tender.status}
                        />
                      </td>

                      <td>

                        {tender.result === "—" ? (
                          <span className="muted">
                            —
                          </span>
                        ) : (
                          <StatusBadge
                            status={tender.result}
                          />
                        )}

                      </td>

                      <td>
                        ₹
                        {(
                          tender.amount / 100000
                        ).toFixed(1)}
                        L
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </div>

      </section>

    </main>
  );
}

/* NAVIGATION ITEM */

function NavItem({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      className={`nav-item ${
        active ? "active" : ""
      }`}
      onClick={() => onClick(label)}
    >
      <span className="nav-icon">
        {icon}
      </span>

      {label}
    </button>
  );
}

/* STATUS BADGE */

function StatusBadge({ status }) {

  const className = status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span
      className={`status ${className}`}
    >
      {status}
    </span>
  );
}

/* OUTCOME */

function Outcome({
  label,
  value,
  pct,
  cls,
}) {
  return (
    <div className="outcome">

      <i className={cls}></i>

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

      <small>
        {pct}
      </small>

    </div>
  );
}
