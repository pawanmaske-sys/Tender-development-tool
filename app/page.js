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
    icon: "◉",
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
    icon: "◉",
    iconClass: "orange",
  },
];

const months = [
  { name: "Jan", submitted: 55, won: 28 },
  { name: "Feb", submitted: 78, won: 40 },
  { name: "Mar", submitted: 65, won: 32 },
  { name: "Apr", submitted: 98, won: 55 },
  { name: "May", submitted: 75, won: 38 },
  { name: "Jun", submitted: 105, won: 60 },
];

export default function Dashboard() {
  const [filter1, setFilter1] = useState("Select All");
  const [filter2, setFilter2] = useState("Select All");
  const [filter3, setFilter3] = useState("Select All");
  const [filter4, setFilter4] = useState("Select All");
  const [filter5, setFilter5] = useState("Select All");
  const [filter6, setFilter6] = useState("Select All");
  const [filter7, setFilter7] = useState("Select All");

  const resetFilters = () => {
    setFilter1("Select All");
    setFilter2("Select All");
    setFilter3("Select All");
    setFilter4("Select All");
    setFilter5("Select All");
    setFilter6("Select All");
    setFilter7("Select All");
  };

  return (
    <main className="content">

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
              ˅
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
              Good afternoon, Pawan 👋
            </h2>

            <p>
              Here's your tender performance overview.
            </p>
          </div>

          <button
            type="button"
            className="primary-btn"
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

            {/* FILTER 1 */}
            <select
              className="filter-select"
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
            >
              <option>Select All</option>
            </select>

            {/* FILTER 2 */}
            <select
              className="filter-select"
              value={filter2}
              onChange={(e) => setFilter2(e.target.value)}
            >
              <option>Select All</option>
            </select>

            {/* FILTER 3 */}
            <select
              className="filter-select"
              value={filter3}
              onChange={(e) => setFilter3(e.target.value)}
            >
              <option>Select All</option>
            </select>

            {/* FILTER 4 */}
            <select
              className="filter-select"
              value={filter4}
              onChange={(e) => setFilter4(e.target.value)}
            >
              <option>Select All</option>
            </select>

            {/* FILTER 5 */}
            <select
              className="filter-select"
              value={filter5}
              onChange={(e) => setFilter5(e.target.value)}
            >
              <option>Select All</option>
            </select>

            {/* FILTER 6 */}
            <select
              className="filter-select"
              value={filter6}
              onChange={(e) => setFilter6(e.target.value)}
            >
              <option>Select All</option>
            </select>

            {/* FILTER 7 */}
            <select
              className="filter-select"
              value={filter7}
              onChange={(e) => setFilter7(e.target.value)}
            >
              <option>Select All</option>
            </select>

            {/* RESET */}
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
                  className={`kpi-icon icon-${kpi.iconClass}`}
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

                <h2 className="chart-title">
                  Tender Performance
                </h2>

                <div className="chart-subtitle">
                  Monthly submitted vs won tenders
                </div>

              </div>

            </div>


            {/* BAR CHART */}
            <div className="bar-chart">

              {months.map((monthData) => (
                <div
                  className="bar-group"
                  key={monthData.name}
                >

                  <div
                    className="bar"
                    style={{
                      height: `${monthData.submitted}%`,
                    }}
                    title={`Submitted: ${monthData.submitted}`}
                  />

                  <div
                    className="bar secondary"
                    style={{
                      height: `${monthData.won}%`,
                    }}
                    title={`Won: ${monthData.won}`}
                  />

                </div>
              ))}

            </div>


            {/* MONTH LABELS */}
            <div className="month-labels">

              {months.map((monthData) => (
                <span key={monthData.name}>
                  {monthData.name}
                </span>
              ))}

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
                  <span>Won</span>
                </div>

                <div className="legend-item">
                  <span className="legend-dot dot-blue"></span>
                  <span>Submitted</span>
                </div>

                <div className="legend-item">
                  <span className="legend-dot dot-orange"></span>
                  <span>In Process</span>
                </div>

                <div className="legend-item">
                  <span className="legend-dot dot-purple"></span>
                  <span>Result Awaited</span>
                </div>

                <div className="legend-item">
                  <span className="legend-dot dot-red"></span>
                  <span>Lost</span>
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
