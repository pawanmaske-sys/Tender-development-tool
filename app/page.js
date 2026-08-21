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
    <main className="content">
      
      {/* TOP BAR */}
      <header className="topbar">
        <div>
          <div className="breadcrumb">
            Home / Dashboard
          </div>

          <h1>Dashboard</h1>
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

      {/* PAGE BODY */}
      <main className="page-body">

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
              onChange={(e) => setYear(e.target.value)}
            >
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>

            <select
              className="filter-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option>August</option>
              <option>July</option>
              <option>June</option>
              <option>May</option>
            </select>

            <select
              className="filter-select"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            >
              <option>All Business</option>
              <option>Corporate</option>
              <option>Retail</option>
              <option>Government</option>
            </select>

            <select
              className="filter-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              onChange={(e) => setZsm(e.target.value)}
            >
              <option>All ZSM</option>
              <option>Rahul</option>
              <option>Priya</option>
              <option>Amit</option>
            </select>

            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              onChange={(e) => setBranch(e.target.value)}
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
                onChange={(e) => setYear(e.target.value)}
              >
                <option>2026</option>
                <option>2025</option>
              </select>

            </div>

            <div className="bar-chart">

              {[35, 52, 42, 70, 50, 75].map(
                (height, index) => (
                  <div
                    className="bar-group"
                    key={index}
                  >

                    <div
                      className="bar"
                      style={{
                        height: `${height}%`,
                      }}
                    ></div>

                    <div
                      className="bar secondary"
                      style={{
                        height: `${height / 2}%`,
                      }}
                    ></div>

                  </div>
                )
              )}

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

    </main>
  );
}
