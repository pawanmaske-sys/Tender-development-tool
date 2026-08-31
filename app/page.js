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

const emptyForm = {
  client: "",
  branch: "",
  tenderType: "",
  category: "",
  deadline: "",
  submissionMethod: "",
  potentialValue: "",
  emdFee: "",
  bidValidity: "",
  documents: "",
  remarks: "",
};

export default function AllTendersPage() {
  const [tenders, setTenders] = useState(initialTenders);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [branch, setBranch] = useState("All Branches");
  const [category, setCategory] = useState("All Categories");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      const searchText = search.toLowerCase();

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

  const handleFormChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const openAddTender = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const closeAddTender = () => {
    setShowForm(false);
    setForm(emptyForm);
  };

  const handleAddTender = (event) => {
    event.preventDefault();

    if (!form.client || !form.branch || !form.category) {
      alert("Please fill Client, Branch and Service Category.");
      return;
    }

    const newTender = {
      id: `T-${String(5627 + tenders.length - 6).padStart(5, "0")}`,
      client: form.client,
      branch: form.branch,
      assigned: "Pawan",
      deadline: form.deadline
        ? new Date(form.deadline).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-",
      amount: Number(form.potentialValue) || 0,
      status: "In Process",
      result: "-",
      category: form.category,
    };

    setTenders((previous) => [newTender, ...previous]);

    closeAddTender();
  };

  return (
    <>
      <div className="all-tenders-page">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

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
            onClick={openAddTender}
          >
            + Add Tender
          </button>

        </div>

        {/* =====================================================
            SUMMARY
        ====================================================== */}

        <div className="summary-grid">

          <div className="summary-card">
            <span>Total Tenders</span>
            <strong>{filteredTenders.length}</strong>
            <small>Matching records</small>
          </div>

          <div className="summary-card">
            <span>Total Potential Amount</span>
            <strong>
              ₹{totalAmount.toLocaleString("en-IN")}
            </strong>
            <small>Filtered tender value</small>
          </div>

          <div className="summary-card">
            <span>Submitted</span>
            <strong>{submittedCount}</strong>
            <small>Currently submitted</small>
          </div>

          <div className="summary-card">
            <span>In Process</span>
            <strong>{inProcessCount}</strong>
            <small>Currently working</small>
          </div>

        </div>

        {/* =====================================================
            SEARCH & FILTERS
        ====================================================== */}

        <div className="filter-panel">

          <div className="filter-title">

            <h2>Search &amp; Filters</h2>

            <button
              type="button"
              className="reset-button"
              onClick={resetFilters}
            >
              Reset
            </button>

          </div>

          <div className="filter-grid">

            <div className="filter-field">
              <label>Search</label>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search Tender ID, Client or Assignee..."
              />
            </div>

            <div className="filter-field">
              <label>Status</label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option>All Status</option>
                <option>In Process</option>
                <option>Submitted</option>
                <option>Result Awaited</option>
                <option>Won</option>
                <option>On Hold</option>
                <option>Lost</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Branch</label>

              <select
                value={branch}
                onChange={(event) =>
                  setBranch(event.target.value)
                }
              >
                <option>All Branches</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Category</label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                <option>All Categories</option>
                <option>IT Services</option>
                <option>Consulting</option>
                <option>Technology</option>
                <option>Infrastructure</option>
              </select>
            </div>

          </div>
        </div>

        {/* =====================================================
            TENDER TABLE
        ====================================================== */}

        <div className="table-card">

          <div className="table-header">

            <h2>Tender List</h2>

            <p>
              {filteredTenders.length} records found
            </p>

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

                {filteredTenders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="empty-state"
                    >
                      No tenders found.
                    </td>
                  </tr>
                ) : (
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

                      <td>{tender.branch}</td>

                      <td>{tender.assigned}</td>

                      <td>{tender.deadline}</td>

                      <td className="amount">
                        ₹{tender.amount.toLocaleString("en-IN")}
                      </td>

                      <td>
                        <span
                          className={`status-badge status-${tender.status
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {tender.status}
                        </span>
                      </td>

                      <td>{tender.result}</td>

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
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* =======================================================
          ADD TENDER MODAL
      ======================================================== */}

      {showForm && (
        <div
          className="tender-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAddTender();
            }
          }}
        >

          <div className="tender-modal">

            {/* MODAL HEADER */}

            <div className="tender-modal-header">

              <div>
                <h2>Add Tender</h2>
                <p>
                  Enter the tender opportunity details below.
                </p>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={closeAddTender}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form onSubmit={handleAddTender}>

              <div className="tender-form-grid">

                {/* CLIENT */}

                <div className="tender-form-field">
                  <label>
                    Client <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={form.client}
                    onChange={(event) =>
                      handleFormChange(
                        "client",
                        event.target.value
                      )
                    }
                    placeholder="Enter client name"
                  />
                </div>

                {/* BRANCH */}

                <div className="tender-form-field">
                  <label>
                    Branch <span>*</span>
                  </label>

                  <select
                    value={form.branch}
                    onChange={(event) =>
                      handleFormChange(
                        "branch",
                        event.target.value
                      )
                    }
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
                  </select>
                </div>

                {/* TENDER TYPE */}

                <div className="tender-form-field">
                  <label>Tender Type</label>

                  <select
                    value={form.tenderType}
                    onChange={(event) =>
                      handleFormChange(
                        "tenderType",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Tender Type
                    </option>

                    <option value="Government">
                      Government
                    </option>

                    <option value="Private">
                      Private
                    </option>

                    <option value="Corporate">
                      Corporate
                    </option>

                    <option value="E-Tender">
                      E-Tender
                    </option>
                  </select>
                </div>

                {/* SERVICE CATEGORY */}

                <div className="tender-form-field">
                  <label>
                    Service Category <span>*</span>
                  </label>

                  <select
                    value={form.category}
                    onChange={(event) =>
                      handleFormChange(
                        "category",
                        event.target.value
                      )
                    }
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
                  </select>
                </div>

                {/* DEADLINE */}

                <div className="tender-form-field">
                  <label>Deadline</label>

                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(event) =>
                      handleFormChange(
                        "deadline",
                        event.target.value
                      )
                    }
                  />
                </div>

                {/* SUBMISSION METHOD */}

                <div className="tender-form-field">
                  <label>Submission Method</label>

                  <select
                    value={form.submissionMethod}
                    onChange={(event) =>
                      handleFormChange(
                        "submissionMethod",
                        event.target.value
                      )
                    }
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

                    <option value="Online + Offline">
                      Online + Offline
                    </option>
                  </select>
                </div>

                {/* POTENTIAL VALUE */}

                <div className="tender-form-field">
                  <label>Potential Value</label>

                  <input
                    type="number"
                    value={form.potentialValue}
                    onChange={(event) =>
                      handleFormChange(
                        "potentialValue",
                        event.target.value
                      )
                    }
                    placeholder="₹ Enter amount"
                  />
                </div>

                {/* EMD / TENDER FEE */}

                <div className="tender-form-field">
                  <label>EMD / Tender Fee</label>

                  <input
                    type="text"
                    value={form.emdFee}
                    onChange={(event) =>
                      handleFormChange(
                        "emdFee",
                        event.target.value
                      )
                    }
                    placeholder="Enter amount"
                  />
                </div>

                {/* BID VALIDITY */}

                <div className="tender-form-field">
                  <label>Bid Validity</label>

                  <input
                    type="text"
                    value={form.bidValidity}
                    onChange={(event) =>
                      handleFormChange(
                        "bidValidity",
                        event.target.value
                      )
                    }
                    placeholder="e.g. 90 Days"
                  />
                </div>

                {/* DOCUMENTS */}

                <div className="tender-form-field">
                  <label>Documents</label>

                  <input
                    type="text"
                    value={form.documents}
                    onChange={(event) =>
                      handleFormChange(
                        "documents",
                        event.target.value
                      )
                    }
                    placeholder="Document name / reference"
                  />
                </div>

                {/* REMARKS */}

                <div className="tender-form-field full-width">
                  <label>Remarks</label>

                  <textarea
                    rows="4"
                    value={form.remarks}
                    onChange={(event) =>
                      handleFormChange(
                        "remarks",
                        event.target.value
                      )
                    }
                    placeholder="Enter additional remarks..."
                  />
                </div>

              </div>

              {/* FORM FOOTER */}

              <div className="tender-form-actions">

                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={closeAddTender}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save-button"
                >
                  Add Tender
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}
