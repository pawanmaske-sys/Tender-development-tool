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

  const [business, setBusiness] = useState("Select All");
  const [status, setStatus] = useState("Select All");
  const [zsm, setZsm] = useState("Select All");
  const [category, setCategory] = useState("Select All");
  const [branch, setBranch] = useState("Select All");

  const resetFilters = () => {
    setYear("2026");
    setMonth("August");

    setBusiness("Select All");
    setStatus("Select All");
    setZsm("Select All");
    setCategory("Select All");
    setBranch("Select All");
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <main className="content">

      {/* =====================================================
          TOP BAR
          ===================================================== */}

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


      {/* =====================================================
          PAGE BODY
          ===================================================== */}

      <main className="page-body">


        {/* ===================================================
            WELCOME
            =================================================== */}

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


        {/* ===================================================
            FILTERS
            =================================================== */}

        <section className="filter-panel">

          <div className="filter-row">

            <span className="filter-title">
              Filters
            </span>


            {/* YEAR */}

            <select
              className="filter-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="2026">
                2026
              </option>

              <option value="2025">
                2025
              </option>

              <option value="2024">
                2024
              </option>
            </select>


            {/* MONTH */}

            <select
              className="filter-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="August">
                August
              </option>

              <option value="July">
                July
              </option>

              <option value="June">
                June
              </option>

              <option value="May">
                May
              </option>
            </select>


            {/* BUSINESS */}

            <select
              className="filter-select"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="Corporate">
                Corporate
              </option>

              <option value="Retail">
                Retail
              </option>

              <option value="Government">
                Government
              </option>
            </select>


            {/* STATUS */}

            <select
              className="filter-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="Submitted">
                Submitted
              </option>

              <option value="In Process">
                In Process
              </option>

              <option value="Won">
                Won
              </option>

              <option value="Lost">
                Lost
              </option>

              <option value="On Hold">
                On Hold
              </option>

              <option value="Result Awaited">
                Result Awaited
              </option>
            </select>


            {/* ZSM */}

            <select
              className="filter-select"
              value={zsm}
              onChange={(e) => setZsm(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="Rahul">
                Rahul
              </option>

              <option value="Priya">
                Priya
              </option>

              <option value="Amit">
                Amit
              </option>
            </select>


            {/* CATEGORY */}

            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="IT Services">
                IT Services
              </option>

              <option value="Consulting">
                Consulting
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="Infrastructure">
                Infrastructure
              </option>
            </select>


            {/* BRANCH */}

            <select
              className="filter-select"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="Pune">
                Pune
              </option>

              <option value="Mumbai">
                Mumbai
              </option>

              <option value="Delhi">
                Delhi
              </option>

              <option value="Bangalore">
                Bangalore
              </option>
            </select>


            {/* RESET */}

            <button
              className="reset-btn"
              type="button"
              onClick={resetFilters}
            >
              Reset
            </button>

          </div>

        </section>


        {/* ===================================================
            KPI CARDS
            =================================================== */}

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


        {/* ===================================================
            CHARTS
            =================================================== */}

        <section className="charts-grid">


          {/* =================================================
              TENDER PERFORMANCE
              ================================================= */}

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

                <option value="2026">
                  2026
                </option>

                <option value="2025">
                  2025
                </option>

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


          {/* =================================================
              OUTCOME DISTRIBUTION
              ================================================= */}

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
