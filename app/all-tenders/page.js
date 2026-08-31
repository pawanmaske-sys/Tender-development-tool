"use client";

import { useMemo, useState } from "react";

const initialTenders = [
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

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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
  const [tenders, setTenders] = useState(initialTenders);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [branch, setBranch] = useState("All Branches");
  const [category, setCategory] = useState("All Categories");

  const [showAddTender, setShowAddTender] = useState(false);

  const [newTender, setNewTender] = useState({
    client: "",
    branch: "",
    tenderType: "",
    serviceCategory: "",
    deadline: "",
    submissionMethod: "",
    potentialValue: "",
    emdFee: "",
    bidValidity: "",
    documents: "",
    remarks: "",
  });

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
  }, [tenders, search, status, branch, category]);

  const totalAmount = filteredTenders.reduce(
    (sum, tender) => sum + Number(tender.amount || 0),
    0
  );

  const submittedCount = filteredTenders.filter(
    (tender) => tender.status === "Submitted"
  ).length;

  const inProcessCount = filteredTenders.filter(
    (tender) => tender.status === "In Process"
  ).length;

  const handleTenderChange = (event) => {
    const { name, value } = event.target;

    setNewTender((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetTenderForm = () => {
    setNewTender({
      client: "",
      branch: "",
      tenderType: "",
      serviceCategory: "",
      deadline: "",
      submissionMethod: "",
      potentialValue: "",
      emdFee: "",
      bidValidity: "",
      documents: "",
      remarks: "",
    });
  };

  const handleAddTender = (event) => {
    event.preventDefault();

    const nextNumber =
      Math.max(
        ...tenders.map((tender) => {
          const number = Number(
            tender.id.replace("T-", "")
          );

          return Number.isNaN(number) ? 0 : number;
        })
      ) + 1;

    const newTenderRecord = {
      id: `T-${String(nextNumber).padStart(5, "0")}`,
      client: newTender.client,
      branch: newTender.branch,
      assigned: "Pawan",
      deadline: formatDate(newTender.deadline),
      amount: Number(newTender.potentialValue || 0),
      status: "In Process",
      result: "-",
      category: newTender.serviceCategory,
      tenderType: newTender.tenderType,
      submissionMethod: newTender.submissionMethod,
      emdFee: newTender.emdFee,
      bidValidity: newTender.bidValidity,
      documents: newTender.documents,
      remarks: newTender.remarks,
    };

    setTenders((previous) => [
      newTenderRecord,
      ...previous,
    ]);

    setShowAddTender(false);
    resetTenderForm();

    setSearch("");
    setStatus("All Status");
    setBranch("All Branches");
    setCategory("All Categories");
  };

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
          onClick={() => setShowAddTender(true)}
        >
          + Add Tender
        </button>
      </div>

      {/* SUMMARY */}
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
      <section className="filter-panel">

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

          <div className="filter-field search-field">
            <label>
              Search
            </label>

            <input
              type="text"
              placeholder="Search Tender ID, Client or Assignee..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="filter-field">
            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
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

          <div className="filter-field">
            <label>
              Branch
            </label>

            <select
              value={branch}
              onChange={(event) =>
                setBranch(event.target.value)
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

          <div className="filter-field">
            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
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
                        onClick={() =>
                          alert(
                            `Tender ${tender.id}\nClient: ${tender.client}`
                          )
                        }
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

      {/* =====================================================
          ADD TENDER MODAL
          ===================================================== */}

      {showAddTender && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setShowAddTender(false);
            }
          }}
        >

          <div className="add-tender-modal">

            {/* MODAL HEADER */}
            <div className="modal-header">

              <div>
                <h2>
                  Add Tender
                </h2>

                <p>
                  Enter the tender details below.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setShowAddTender(false)
                }
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form onSubmit={handleAddTender}>

              <div className="form-grid">

                {/* CLIENT */}
                <div className="form-field">
                  <label>
                    Client
                  </label>

                  <input
                    type="text"
                    name="client"
                    placeholder="Enter client name"
                    value={newTender.client}
                    onChange={handleTenderChange}
                    required
                  />
                </div>

                {/* BRANCH */}
                <div className="form-field">
                  <label>
                    Branch
                  </label>

                  <select
                    name="branch"
                    value={newTender.branch}
                    onChange={handleTenderChange}
                    required
                  >
                    <option value="">
                      Select Branch
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

                    <option value="Nagpur">
                      Nagpur
                    </option>
                  </select>
                </div>

                {/* TENDER TYPE */}
                <div className="form-field">
                  <label>
                    Tender Type
                  </label>

                  <select
                    name="tenderType"
                    value={newTender.tenderType}
                    onChange={handleTenderChange}
                    required
                  >
                    <option value="">
                      Select Tender Type
                    </option>

                    <option value="Open Tender">
                      Open Tender
                    </option>

                    <option value="Limited Tender">
                      Limited Tender
                    </option>

                    <option value="Government Tender">
                      Government Tender
                    </option>

                    <option value="Private Tender">
                      Private Tender
                    </option>

                    <option value="EOI">
                      EOI
                    </option>

                    <option value="RFP">
                      RFP
                    </option>
                  </select>
                </div>

                {/* SERVICE CATEGORY */}
                <div className="form-field">
                  <label>
                    Service Category
                  </label>

                  <select
                    name="serviceCategory"
                    value={newTender.serviceCategory}
                    onChange={handleTenderChange}
                    required
                  >
                    <option value="">
                      Select Category
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

                    <option value="Software">
                      Software
                    </option>

                    <option value="Manpower">
                      Manpower
                    </option>
                  </select>
                </div>

                {/* DEADLINE */}
                <div className="form-field">
                  <label>
                    Deadline
                  </label>

                  <input
                    type="date"
                    name="deadline"
                    value={newTender.deadline}
                    onChange={handleTenderChange}
                    required
                  />
                </div>

                {/* SUBMISSION METHOD */}
                <div className="form-field">
                  <label>
                    Submission Method
                  </label>

                  <select
                    name="submissionMethod"
                    value={newTender.submissionMethod}
                    onChange={handleTenderChange}
                    required
                  >
                    <option value="">
                      Select Method
                    </option>

                    <option value="Online">
                      Online
                    </option>

                    <option value="Offline">
                      Offline
                    </option>

                    <option value="Online & Offline">
                      Online & Offline
                    </option>
                  </select>
                </div>

                {/* POTENTIAL VALUE */}
                <div className="form-field">
                  <label>
                    Potential Value
                  </label>

                  <input
                    type="number"
                    name="potentialValue"
                    placeholder="Enter potential value"
                    value={newTender.potentialValue}
                    onChange={handleTenderChange}
                    min="0"
                  />
                </div>

                {/* EMD / TENDER FEE */}
                <div className="form-field">
                  <label>
                    EMD / Tender Fee
                  </label>

                  <input
                    type="text"
                    name="emdFee"
                    placeholder="Enter EMD / Tender Fee"
                    value={newTender.emdFee}
                    onChange={handleTenderChange}
                  />
                </div>

                {/* BID VALIDITY */}
                <div className="form-field">
                  <label>
                    Bid Validity
                  </label>

                  <input
                    type="text"
                    name="bidValidity"
                    placeholder="Example: 90 Days"
                    value={newTender.bidValidity}
                    onChange={handleTenderChange}
                  />
                </div>

                {/* DOCUMENTS */}
                <div className="form-field">
                  <label>
                    Documents
                  </label>

                  <input
                    type="text"
                    name="documents"
                    placeholder="Enter document details"
                    value={newTender.documents}
                    onChange={handleTenderChange}
                  />
                </div>

                {/* REMARKS */}
                <div className="form-field full-width">
                  <label>
                    Remarks
                  </label>

                  <textarea
                    name="remarks"
                    placeholder="Enter any additional remarks..."
                    rows="4"
                    value={newTender.remarks}
                    onChange={handleTenderChange}
                  />
                </div>

              </div>

              {/* FORM BUTTONS */}
              <div className="modal-footer">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowAddTender(false);
                    resetTenderForm();
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-tender-button"
                >
                  + Add Tender
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </main>
  );
}
