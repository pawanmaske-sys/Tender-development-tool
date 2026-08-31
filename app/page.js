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
  serviceCategory: "",
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

  const [showAddTender, setShowAddTender] = useState(false);
  const [form, setForm] = useState(emptyForm);

  /* =========================================================
     FILTER DATA
     ========================================================= */

  const filteredTenders = useMemo(() => {
    return tenders.filter((tender) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        tender.id.toLowerCase().includes(searchValue) ||
        tender.client.toLowerCase().includes(searchValue) ||
        tender.assigned.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All Status" ||
        tender.status === status;

      const matchesBranch =
        branch === "All Branches" ||
        tender.branch === branch;

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
    (total, tender) => total + tender.amount,
    0
  );

  const submittedCount = filteredTenders.filter(
    (tender) => tender.status === "Submitted"
  ).length;

  const inProcessCount = filteredTenders.filter(
    (tender) => tender.status === "In Process"
  ).length;

  /* =========================================================
     FILTER RESET
     ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setStatus("All Status");
    setBranch("All Branches");
    setCategory("All Categories");
  };

  /* =========================================================
     ADD TENDER
     ========================================================= */

  const openAddTender = () => {
    setForm(emptyForm);
    setShowAddTender(true);
  };

  const closeAddTender = () => {
    setShowAddTender(false);
    setForm(emptyForm);
  };

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmitTender = (event) => {
    event.preventDefault();

    if (
      !form.client.trim() ||
      !form.branch ||
      !form.serviceCategory
    ) {
      alert(
        "Please fill Client, Branch and Service Category."
      );
      return;
    }

    const nextNumber =
      5621 + tenders.length;

    const formattedDeadline = form.deadline
      ? new Date(
          `${form.deadline}T00:00:00`
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

    const newTender = {
      id: `T-${String(nextNumber).padStart(5, "0")}`,
      client: form.client.trim(),
      branch: form.branch,
      assigned: "Pawan",
      deadline: formattedDeadline,
      amount: Number(form.potentialValue) || 0,
      status: "In Process",
      result: "-",
      category: form.serviceCategory,
    };

    setTenders((previous) => [
      newTender,
      ...previous,
    ]);

    closeAddTender();
  };

  return (
    <>
      <div className="all-tenders-page">

        {/* =====================================================
            HEADER
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
            SUMMARY CARDS
        ====================================================== */}

        <div className="summary-grid">

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
              ₹{totalAmount.toLocaleString("en-IN")}
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

        </div>

        {/* =====================================================
            SEARCH & FILTERS
        ====================================================== */}

        <div className="filter-panel">

          <div className="filter-title-row">

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
            TENDER LIST
        ====================================================== */}

        <div className="table-card">

          <div className="table-header">

            <div>
              <h2>Tender List</h2>

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
                        ₹
                        {tender.amount.toLocaleString(
                          "en-IN"
                        )}
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

                      <td>
                        {tender.result}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="view-button"
                          onClick={() =>
                            alert(
                              `Tender ID: ${tender.id}\nClient: ${tender.client}`
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
          ADD TENDER FORM
          ONLY APPEARS AFTER CLICKING + ADD TENDER
      ======================================================== */}

      {showAddTender && (
        <div
          className="add-tender-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeAddTender();
            }
          }}
        >

          <div className="add-tender-modal">

            {/* FORM HEADER */}

            <div className="add-tender-header">

              <div>
                <h2>Add Tender</h2>

                <p>
                  Enter tender details
                </p>
              </div>

              <button
                type="button"
                className="add-tender-close"
                onClick={closeAddTender}
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmitTender}
            >

              <div className="add-tender-form-grid">

                {/* CLIENT */}

                <div className="add-tender-field">
                  <label>
                    Client <span>*</span>
                  </label>

                  <input
                    type="text"
                    value={form.client}
                    onChange={(event) =>
                      updateForm(
                        "client",
                        event.target.value
                      )
                    }
                    placeholder="Enter client name"
                  />
                </div>

                {/* BRANCH */}

                <div className="add-tender-field">
                  <label>
                    Branch <span>*</span>
                  </label>

                  <select
                    value={form.branch}
                    onChange={(event) =>
                      updateForm(
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

                <div className="add-tender-field">
                  <label>
                    Tender Type
                  </label>

                  <select
                    value={form.tenderType}
                    onChange={(event) =>
                      updateForm(
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

                <div className="add-tender-field">
                  <label>
                    Service Category <span>*</span>
                  </label>

                  <select
                    value={form.serviceCategory}
                    onChange={(event) =>
                      updateForm(
                        "serviceCategory",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Service Category
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

                <div className="add-tender-field">
                  <label>
                    Deadline
                  </label>

                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(event) =>
                      updateForm(
                        "deadline",
                        event.target.value
                      )
                    }
                  />
                </div>

                {/* SUBMISSION METHOD */}

                <div className="add-tender-field">
                  <label>
                    Submission Method
                  </label>

                  <select
                    value={form.submissionMethod}
                    onChange={(event) =>
                      updateForm(
                        "submissionMethod",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Submission Method
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

                <div className="add-tender-field">
                  <label>
                    Potential Value
                  </label>

                  <input
                    type="number"
                    value={form.potentialValue}
                    onChange={(event) =>
                      updateForm(
                        "potentialValue",
                        event.target.value
                      )
                    }
                    placeholder="Enter potential value"
                  />
                </div>

                {/* EMD / TENDER FEE */}

                <div className="add-tender-field">
                  <label>
                    EMD / Tender Fee
                  </label>

                  <input
                    type="text"
                    value={form.emdFee}
                    onChange={(event) =>
                      updateForm(
                        "emdFee",
                        event.target.value
                      )
                    }
                    placeholder="Enter EMD / tender fee"
                  />
                </div>

                {/* BID VALIDITY */}

                <div className="add-tender-field">
                  <label>
                    Bid Validity
                  </label>

                  <input
                    type="text"
                    value={form.bidValidity}
                    onChange={(event) =>
                      updateForm(
                        "bidValidity",
                        event.target.value
                      )
                    }
                    placeholder="e.g. 90 Days"
                  />
                </div>

                {/* DOCUMENTS */}

                <div className="add-tender-field">
                  <label>
                    Documents
                  </label>

                  <input
                    type="text"
                    value={form.documents}
                    onChange={(event) =>
                      updateForm(
                        "documents",
                        event.target.value
                      )
                    }
                    placeholder="Enter document details"
                  />
                </div>

                {/* REMARKS */}

                <div className="add-tender-field add-tender-full">
                  <label>
                    Remarks
                  </label>

                  <textarea
                    rows="4"
                    value={form.remarks}
                    onChange={(event) =>
                      updateForm(
                        "remarks",
                        event.target.value
                      )
                    }
                    placeholder="Enter remarks..."
                  />
                </div>

              </div>

              {/* FORM FOOTER */}

              <div className="add-tender-actions">

                <button
                  type="button"
                  className="add-tender-cancel"
                  onClick={closeAddTender}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-tender-save"
                >
                  Add Tender
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =======================================================
          MODAL CSS
      ======================================================== */}

      <style jsx>{`
        .add-tender-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background: rgba(15, 23, 42, 0.5);

          overflow-y: auto;
        }

        .add-tender-modal {
          width: min(900px, 100%);
          max-height: calc(100vh - 40px);

          overflow-y: auto;

          background: #ffffff;

          border-radius: 14px;

          box-shadow:
            0 20px 60px rgba(15, 23, 42, 0.25);
        }

        .add-tender-header {
          position: sticky;
          top: 0;
          z-index: 2;

          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          padding: 20px 24px;

          background: #ffffff;

          border-bottom: 1px solid #e5eaf2;
        }

        .add-tender-header h2 {
          margin: 0;

          font-size: 20px;

          color: #10213f;
        }

        .add-tender-header p {
          margin: 5px 0 0;

          font-size: 12px;

          color: #7583a0;
        }

        .add-tender-close {
          width: 32px;
          height: 32px;

          border: 0;
          border-radius: 7px;

          background: #f1f3f7;

          color: #52617b;

          font-size: 22px;

          cursor: pointer;
        }

        .add-tender-close:hover {
          background: #e5eaf2;
        }

        .add-tender-modal form {
          padding: 22px 24px 24px;
        }

        .add-tender-form-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 16px;
        }

        .add-tender-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .add-tender-field.add-tender-full {
          grid-column: 1 / -1;
        }

        .add-tender-field label {
          font-size: 11px;
          font-weight: 600;

          color: #30415f;
        }

        .add-tender-field label span {
          color: #ef4444;
        }

        .add-tender-field input,
        .add-tender-field select,
        .add-tender-field textarea {
          width: 100%;

          border: 1px solid #d7dfeb;

          border-radius: 7px;

          background: #ffffff;

          color: #30415f;

          font-family: inherit;

          font-size: 12px;

          outline: none;
        }

        .add-tender-field input,
        .add-tender-field select {
          height: 40px;
          padding: 0 12px;
        }

        .add-tender-field textarea {
          padding: 11px 12px;
          resize: vertical;
        }

        .add-tender-field input:focus,
        .add-tender-field select:focus,
        .add-tender-field textarea:focus {
          border-color: #2563eb;

          box-shadow:
            0 0 0 3px
            rgba(37, 99, 235, 0.08);
        }

        .add-tender-actions {
          display: flex;

          justify-content: flex-end;

          gap: 10px;

          margin-top: 24px;
          padding-top: 18px;

          border-top: 1px solid #e5eaf2;
        }

        .add-tender-cancel,
        .add-tender-save {
          height: 38px;

          padding: 0 18px;

          border-radius: 7px;

          font-family: inherit;

          font-size: 12px;

          font-weight: 600;

          cursor: pointer;
        }

        .add-tender-cancel {
          border: 1px solid #d7dfeb;

          background: #ffffff;

          color: #52617b;
        }

        .add-tender-cancel:hover {
          background: #f5f7fb;
        }

        .add-tender-save {
          border: 0;

          background: #2563eb;

          color: #ffffff;

          box-shadow:
            0 4px 10px
            rgba(37, 99, 235, 0.18);
        }

        .add-tender-save:hover {
          background: #1d4ed8;
        }

        @media (max-width: 700px) {
          .add-tender-overlay {
            padding: 10px;
          }

          .add-tender-form-grid {
            grid-template-columns: 1fr;
          }

          .add-tender-field.add-tender-full {
            grid-column: auto;
          }

          .add-tender-header,
          .add-tender-modal form {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
      `}</style>
    </>
  );
}
