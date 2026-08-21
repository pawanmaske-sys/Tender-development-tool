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
  return (
    <span
      className={`status-badge status-${status
        .toLowerCase()
        .replaceAll(" ", "-")}`}
    >
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
        status === "All Status" || tender.status === status;

      const matchesBranch =
        branch === "All Branches" || tender.branch === branch;

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

  return (
    <main className="all-tenders-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            Home / Tenders / All Tenders
          </div>

          <h1>All Tenders</h1>

          <p>
            View and manage all tender opportunities.
          </p>
        </div>

        <button
          type="button"
          className="new-tender-button"
        >
          + New Tender
        </button>
      </div>


      {/* SUMMARY CARDS */}
      <section className="summary-grid">

        <div className="summary-card">
          <span>Total Tenders</span>

          <strong>
            {filteredTenders.length}
          </strong>

          <small>
            Matching records
          </small>
        </div>


        <div className="summary-card">
          <span>Total Potential Amount</span>

          <strong>
            {formatAmount(totalAmount)}
          </strong>

          <small>
            Filtered tender value
          </small>
        </div>


        <div className="summary-card">
          <span>Submitted</span>

          <strong>
            {submittedCount}
          </strong>

          <small>
            Currently submitted
          </small>
        </div>


        <div className="summary-card">
          <span>In Process</span>

          <strong>
            {inProcessCount}
          </strong>

          <small>
            Currently working
          </small>
        </div>

      </section>


      {/* SEARCH & FILTERS */}
      <section className="filter-panel all-tenders-filter">

        <div className="filter-title">

          <h2>
            Search & Filters
          </h2>

          <button
            type="button"
            className="reset-button"
            onClick={resetFilters}
          >
            Reset
          </button>

        </div>


        <div className="filter-grid">

          {/* SEARCH */}
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


          {/* STATUS */}
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
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>

          </div>


          {/* BRANCH */}
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
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>

          </div>


          {/* CATEGORY */}
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
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>

          </div>

        </div>

      </section>


      {/* TENDER TABLE */}
      <section className="table-card">

        <div className="table-header">

          <div>

            <h2>
              Tender List
            </h2>

            <p>
              {filteredTenders.length} records found
            </p>

          </div>

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
                        type="button"
                        className="view-button"
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
  );
}
