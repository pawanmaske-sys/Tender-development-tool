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
  /* =====================================================
     FILTER STATES
     ===================================================== */

  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("August");
  const [business, setBusiness] = useState("All Business");
  const [businessType, setBusinessType] = useState("All");
  const [zsm, setZsm] = useState("All ZSM");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All");


  /* =====================================================
     RESET FILTERS
     ===================================================== */

  const resetFilters = () => {
    setYear("2026");
    setMonth("August");
    setBusiness("All Business");
    setBusinessType("All");
    setZsm("All ZSM");
    setCategory("All Categories");
    setLocation("All");
  };


  return (
    <main className="content">

      {/* =================================================
          TOP BAR
         ================================================= */}

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
              ˅
            </span>

          </div>

        </div>

      </header>


      {/* =================================================
          PAGE BODY
         ================================================= */}

      <div className="page-body">


        {/* =================================================
            WELCOME
           ================================================= */}

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


        {/* =================================================
            FILTERS
           ================================================= */}

        <section className="filter-panel">

          <div className="filter-row">

            <span className="filter-title">
              Filters
            </span>


            {/* =================================================
                YEAR
               ================================================= */}

            <select
              className="filter-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="2026">
                2026
              </option>

              <option value="2025">
                2025
              </option>

              <option value="2024">
                2024
              </option>

              <option value="2023">
                2023
              </option>
            </select>


            {/* =================================================
                MONTH
               ================================================= */}

            <select
              className="filter-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="January">
                January
              </option>

              <option value="February">
                February
              </option>

              <option value="March">
                March
              </option>

              <option value="April">
                April
              </option>

              <option value="May">
                May
              </option>

              <option value="June">
                June
              </option>

              <option value="July">
                July
              </option>

              <option value="August">
                August
              </option>

              <option value="September">
                September
              </option>

              <option value="October">
                October
              </option>

              <option value="November">
                November
              </option>

              <option value="December">
                December
              </option>
            </select>


            {/* =================================================
                BUSINESS
               ================================================= */}

            <select
              className="filter-select"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="All Business">
                All Business
              </option>

              <option value="IT Services">
                IT Services
              </option>

              <option value="Consulting">
                Consulting
              </option>

              <option value="Infrastructure">
                Infrastructure
              </option>

              <option value="Technology">
                Technology
              </option>
            </select>


            {/* =================================================
                BUSINESS TYPE
               ================================================= */}

            <select
              className="filter-select"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="All">
                All
              </option>

              <option value="Government">
                Government
              </option>

              <option value="Private">
                Private
              </option>
            </select>


            {/* =================================================
                ZSM
               ================================================= */}

            <select
              className="filter-select"
              value={zsm}
              onChange={(e) => setZsm(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="All ZSM">
                All ZSM
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


            {/* =================================================
                CATEGORY
               ================================================= */}

            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="All Categories">
                All Categories
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


            {/* =================================================
                LOCATION
               ================================================= */}

            <select
              className="filter-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Select All">
                Select All
              </option>

              <option value="All">
                All
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


            {/* =================================================
                RESET
               ================================================= */}

            <button
              type="button"
              className="reset-btn"
              onClick={resetFilters}
            >
              Reset
            </button>

          </div>

        </section>


        {/* =================================================
            KPI CARDS
           ================================================= */}

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


        {/* =================================================
            CHARTS
           ================================================= */}

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

                <span
                  key={monthData.name}
                >
                  {monthData.name}
                </span>

              ))}

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

                  <span>
                    Won
                  </span>

                </div>


                <div className="legend-item">

                  <span className="legend-dot dot-blue"></span>

                  <span>
                    Submitted
                  </span>

                </div>


                <div className="legend-item">

                  <span className="legend-dot dot-orange"></span>

                  <span>
                    In Process
                  </span>

                </div>


                <div className="legend-item">

                  <span className="legend-dot dot-purple"></span>

                  <span>
                    Result Awaited
                  </span>

                </div>


                <div className="legend-item">

                  <span className="legend-dot dot-red"></span>

                  <span>
                    Lost
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}
