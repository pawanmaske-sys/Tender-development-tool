"use client";

import { useState } from "react";

const kpis = [
  {
    title: "Total Tenders",
    value: "1,245",
    subtitle: "All tenders",
    icon: "↗",
    color: "blue",
  },
  {
    title: "Potential Amount",
    value: "₹25.4 Cr",
    subtitle: "Total potential value",
    icon: "₹",
    color: "green",
  },
  {
    title: "Submitted",
    value: "842",
    subtitle: "67.6% of total",
    icon: "✓",
    color: "purple",
  },
  {
    title: "In Process",
    value: "230",
    subtitle: "Currently working",
    icon: "◉",
    color: "orange",
  },
  {
    title: "Won",
    value: "173",
    subtitle: "13.9% of total",
    icon: "↗",
    color: "green",
  },
  {
    title: "Result Awaited",
    value: "42",
    subtitle: "Need follow-up",
    icon: "₹",
    color: "teal",
  },
  {
    title: "On Hold",
    value: "38",
    subtitle: "Currently on hold",
    icon: "✓",
    color: "amber",
  },
  {
    title: "Lost",
    value: "94",
    subtitle: "Unsuccessful",
    icon: "◉",
    color: "red",
  },
];

export default function DashboardPage() {
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("August");
  const [business, setBusiness] = useState("All Business");
  const [status, setStatus] = useState("All");
  const [zsm, setZsm] = useState("All ZSM");
  const [category, setCategory] = useState("All Categories");
  const [region, setRegion] = useState("All");

  const resetFilters = () => {
    setYear("2026");
    setMonth("August");
    setBusiness("All Business");
    setStatus("All");
    setZsm("All ZSM");
    setCategory("All Categories");
    setRegion("All");
  };

  return (
    <div className="dashboard-page">
      {/* TOP BAR */}
      <header className="topbar">
        <div>
          <div className="breadcrumb">Home / Dashboard</div>
          <h1>Dashboard</h1>
        </div>

        <div className="top-actions">
          <button type="button" className="icon-btn" title="Notifications">
            ♧
            <span className="notification-dot"></span>
          </button>

          <div className="profile">
            <div className="avatar">PM</div>

            <div>
              <div className="profile-name">Pawan Maske</div>
              <div className="profile-role">Tender Executive</div>
            </div>

            <span className="chevron">⌄</span>
          </div>
        </div>
      </header>

      {/* PAGE BODY */}
      <main className="page-body">
        {/* WELCOME */}
        <section className="welcome-row">
          <div>
            <h2>Good afternoon, Pawan 👋</h2>
            <p>Here's your tender performance overview.</p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="filter-panel">
          <div className="filter-row">
            <span className="filter-title">Filters</span>

            <select
              className="filter-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="Select All">Select All</option>
            </select>

            <select
              className="filter-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="August">August</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
              <option value="Select All">Select All</option>
            </select>

            <select
              className="filter-select"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            >
              <option value="All Business">All Business</option>
              <option value="IT Services">IT Services</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Consulting">Consulting</option>
              <option value="Select All">Select All</option>
            </select>

            <select
              className="filter-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Submitted">Submitted</option>
              <option value="In Process">In Process</option>
              <option value="Won">Won</option>
              <option value="Result Awaited">Result Awaited</option>
              <option value="On Hold">On Hold</option>
              <option value="Lost">Lost</option>
              <option value="Select All">Select All</option>
            </select>

            <select
              className="filter-select"
              value={zsm}
              onChange={(e) => setZsm(e.target.value)}
            >
              <option value="All ZSM">All ZSM</option>
              <option value="Pawan Maske">Pawan Maske</option>
              <option value="Rahul">Rahul</option>
              <option value="Priya">Priya</option>
              <option value="Amit">Amit</option>
              <option value="Select All">Select All</option>
            </select>

            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              <option value="IT Services">IT Services</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Consulting">Consulting</option>
              <option value="Select All">Select All</option>
            </select>

            <select
              className="filter-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="All">All</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Select All">Select All</option>
            </select>

            <button
              type="button"
              className="reset-btn"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </section>

        {/* KPI CARDS */}
        <section className="kpi-grid">
          {kpis.map((kpi) => (
            <article
              className={`kpi-card kpi-${kpi.color}`}
              key={kpi.title}
            >
              <div className="kpi-top">
                <span className="kpi-title">{kpi.title}</span>

                <span className="kpi-icon" aria-hidden="true">
                  {kpi.icon}
                </span>
              </div>

              <div className="kpi-value">{kpi.value}</div>

              <div className="kpi-sub">{kpi.subtitle}</div>
            </article>
          ))}
        </section>

        {/* CHARTS */}
        <section className="charts-grid">
          {/* TENDER PERFORMANCE */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3 className="chart-title">Tender Performance</h3>
                <div className="chart-subtitle">
                  Monthly submitted vs won tenders
                </div>
              </div>

              <select className="year-select" defaultValue="2026">
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div className="bar-chart">
              <div className="bar-group">
                <div className="bar" style={{ height: "38%" }}></div>
                <div
                  className="bar secondary"
                  style={{ height: "24%" }}
                ></div>
              </div>

              <div className="bar-group">
                <div className="bar" style={{ height: "55%" }}></div>
                <div
                  className="bar secondary"
                  style={{ height: "34%" }}
                ></div>
              </div>

              <div className="bar-group">
                <div className="bar" style={{ height: "45%" }}></div>
                <div
                  className="bar secondary"
                  style={{ height: "28%" }}
                ></div>
              </div>

              <div className="bar-group">
                <div className="bar" style={{ height: "75%" }}></div>
                <div
                  className="bar secondary"
                  style={{ height: "39%" }}
                ></div>
              </div>

              <div className="bar-group">
                <div className="bar" style={{ height: "52%" }}></div>
                <div
                  className="bar secondary"
                  style={{ height: "32%" }}
                ></div>
              </div>

              <div className="bar-group">
                <div className="bar" style={{ height: "82%" }}></div>
                <div
                  className="bar secondary"
                  style={{ height: "42%" }}
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
                <h3 className="chart-title">Outcome Distribution</h3>
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
    </div>
  );
}
