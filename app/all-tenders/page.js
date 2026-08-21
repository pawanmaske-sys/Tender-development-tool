"use client";

import { useState } from "react";

const kpis = [
  {
    title: "Total Tenders",
    value: "1,245",
    subtitle: "All tenders",
    icon: "↗",
    iconClass: "icon-blue",
  },
  {
    title: "Potential Amount",
    value: "₹25.4 Cr",
    subtitle: "Total potential value",
    icon: "₹",
    iconClass: "icon-green",
  },
  {
    title: "Submitted",
    value: "842",
    subtitle: "67.6% of total",
    icon: "✓",
    iconClass: "icon-purple",
  },
  {
    title: "In Process",
    value: "230",
    subtitle: "Currently working",
    icon: "⏱",
    iconClass: "icon-orange",
  },
  {
    title: "Won",
    value: "173",
    subtitle: "13.9% of total",
    icon: "↗",
    iconClass: "icon-blue",
  },
  {
    title: "Result Awaited",
    value: "42",
    subtitle: "Need follow-up",
    icon: "₹",
    iconClass: "icon-green",
  },
  {
    title: "On Hold",
    value: "38",
    subtitle: "Currently on hold",
    icon: "✓",
    iconClass: "icon-purple",
  },
  {
    title: "Lost",
    value: "94",
    subtitle: "Unsuccessful",
    icon: "⏱",
    iconClass: "icon-orange",
  },
];

const months = [
  { month: "Jan", submitted: 62, won: 38 },
  { month: "Feb", submitted: 75, won: 45 },
  { month: "Mar", submitted: 55, won: 31 },
  { month: "Apr", submitted: 88, won: 52 },
  { month: "May", submitted: 70, won: 44 },
  { month: "Jun", submitted: 92, won: 58 },
  { month: "Jul", submitted: 82, won: 49 },
  { month: "Aug", submitted: 96, won: 61 },
];

export default function Dashboard() {
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("August");
  const [business, setBusiness] = useState("All Business");
  const [branch, setBranch] = useState("All");
  const [zsm, setZsm] = useState("All ZSM");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All");

  const resetFilters = () => {
    setYear("2026");
    setMonth("August");
    setBusiness("All Business");
    setBranch("All");
    setZsm("All ZSM");
    setCategory("All Categories");
    setStatus("All");
  };

  return (
    <main className="dashboard-page">

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

          <button className="icon-btn" type="button">
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

      <section className="page-body">

        {/* WELCOME */}

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
            type="button"
            className="primary-btn"
            onClick={() =>
              alert("New Tender module coming next.")
            }
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
              <option>April</option>
              <option>March</option>
              <option>February</option>
              <option>January</option>
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

            <select
              className="filter-select"
              value={zsm}
              onChange={(e) =>
                setZsm(e.target.value)
              }
            >
              <option>All ZSM</option>
              <option>ZSM 1</option>
              <option>ZSM 2</option>
              <option>ZSM 3</option>
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
              <option>Result Awaited</option>
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

            <div
              className="kpi-card"
              key={kpi.title}
            >

              <div className="kpi-top">

                <span>
                  {kpi.title}
                </span>

                <span
                  className={`kpi-icon ${kpi.iconClass}`}
                >
                  {kpi.icon}
                </span>

              </div>

              <div className="kpi-value">
                {kpi.value}
              </div>

              <div className="kpi-sub">
                {kpi.subtitle}
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

                <h3 className="chart-title">
                  Tender Performance
                </h3>

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
                <option>2024</option>
              </select>

            </div>


            <div className="bar-chart">

              {months.map((item) => (

                <div
                  className="bar-group"
                  key={item.month}
                >

                  <div
                    className="bar"
                    style={{
                      height: `${item.submitted}%`,
                    }}
                    title={`Submitted: ${item.submitted}`}
                  />

                  <div
                    className="bar secondary"
                    style={{
                      height: `${item.won}%`,
                    }}
                    title={`Won: ${item.won}`}
                  />

                </div>

              ))}

            </div>


            <div className="month-labels">

              {months.map((item) => (
                <span key={item.month}>
                  {item.month}
                </span>
              ))}

            </div>

          </div>


          {/* OUTCOME DISTRIBUTION */}

          <div className="chart-card">

            <div className="chart-header">

              <div>

                <h3 className="chart-title">
                  Outcome Distribution
                </h3>

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
                  Won — 173
                </div>

                <div className="legend-item">
                  <span className="legend-dot dot-blue"></span>
                  Submitted — 842
                </div>

                <div className="legend-item">
                  <span className="legend-dot dot-orange"></span>
                  Result Awaited — 42
                </div>

                <div className="legend-item">
                  <span className="legend-dot dot-purple"></span>
                  On Hold — 38
                </div>

                <div className="legend-item">
                  <span className="legend-dot dot-red"></span>
                  Lost — 94
                </div>

              </div>

            </div>

          </div>

        </section>

      </section>

    </main>
  );
}
