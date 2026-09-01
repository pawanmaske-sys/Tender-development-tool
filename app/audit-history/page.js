"use client";

import { useMemo, useState } from "react";

const initialEvents = [
  {
    id: 1,
    date: "01 Sep 2026, 14:32",
    user: "Pawan",
    module: "Users & Roles",
    action: "Update",
    record: "User #USR-001",
    source: "Web",
    details: "Updated user role from Bid Team Member to Team Lead / Bid Manager.",
    status: "Success",
  },
  {
    id: 2,
    date: "01 Sep 2026, 13:48",
    user: "Pawan",
    module: "Bid Workspace",
    action: "Status Change",
    record: "TEN-2026-0012",
    source: "Web",
    details: "Tender workspace status changed from In Process to Ready for Review.",
    status: "Success",
  },
  {
    id: 3,
    date: "01 Sep 2026, 12:15",
    user: "Pawan",
    module: "Evaluation",
    action: "Approve",
    record: "TEN-2026-0010",
    source: "Web",
    details: "Bid / No-Bid evaluation approved for participation.",
    status: "Success",
  },
  {
    id: 4,
    date: "01 Sep 2026, 11:42",
    user: "Pawan",
    module: "Tenders",
    action: "Create",
    record: "TEN-2026-0015",
    source: "Web",
    details: "New tender created from tender source.",
    status: "Success",
  },
  {
    id: 5,
    date: "01 Sep 2026, 10:55",
    user: "Admin",
    module: "Administration",
    action: "Update",
    record: "Master #M-004",
    source: "Web",
    details: "Tender category master data was updated.",
    status: "Success",
  },
  {
    id: 6,
    date: "31 Aug 2026, 18:20",
    user: "Pawan",
    module: "Results",
    action: "Update",
    record: "TEN-2026-0008",
    source: "Web",
    details: "Tender result updated to Won.",
    status: "Success",
  },
  {
    id: 7,
    date: "31 Aug 2026, 17:05",
    user: "Pawan",
    module: "Submission",
    action: "Status Change",
    record: "TEN-2026-0007",
    source: "Web",
    details: "Tender submission status changed to Submitted.",
    status: "Success",
  },
  {
    id: 8,
    date: "30 Aug 2026, 16:40",
    user: "Admin",
    module: "Users & Roles",
    action: "Create",
    record: "User #USR-002",
    source: "Web",
    details: "New system user created.",
    status: "Success",
  },
  {
    id: 9,
    date: "30 Aug 2026, 15:25",
    user: "Pawan",
    module: "Tenders",
    action: "Update",
    record: "TEN-2026-0005",
    source: "Web",
    details: "Tender information was updated.",
    status: "Success",
  },
  {
    id: 10,
    date: "29 Aug 2026, 12:10",
    user: "Admin",
    module: "Administration",
    action: "Login",
    record: "SESSION-0091",
    source: "Web",
    details: "User successfully logged into the system.",
    status: "Success",
  },
];

export default function AuditHistoryPage() {
  const [events] = useState(initialEvents);

  const [userFilter, setUserFilter] = useState("All Users");
  const [moduleFilter, setModuleFilter] = useState("All Modules");
  const [actionFilter, setActionFilter] = useState("All Actions");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [search, setSearch] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);

  const users = [
    "All Users",
    ...Array.from(new Set(events.map((event) => event.user))),
  ];

  const modules = [
    "All Modules",
    "Tenders",
    "Evaluation",
    "Bid Workspace",
    "Submission",
    "Results",
    "Administration",
    "Users & Roles",
  ];

  const actions = [
    "All Actions",
    "Create",
    "Update",
    "Delete",
    "Approve",
    "Status Change",
    "Login",
    "Export",
  ];

  const dates = [
    "All Dates",
    "Today",
    "Last 7 Days",
    "Last 30 Days",
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesUser =
        userFilter === "All Users" ||
        event.user === userFilter;

      const matchesModule =
        moduleFilter === "All Modules" ||
        event.module === moduleFilter;

      const matchesAction =
        actionFilter === "All Actions" ||
        event.action === actionFilter;

      const matchesSearch =
        search.trim() === "" ||
        event.user
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.module
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.action
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.record
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.details
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesUser &&
        matchesModule &&
        matchesAction &&
        matchesSearch
      );
    });
  }, [
    events,
    userFilter,
    moduleFilter,
    actionFilter,
    search,
  ]);

  const todayEvents = events.filter((event) =>
    event.date.startsWith("01 Sep 2026")
  ).length;

  const userActions = events.filter(
    (event) =>
      event.module === "Users & Roles"
  ).length;

  const systemEvents = events.filter(
    (event) =>
      event.action === "Login"
  ).length;

  function resetFilters() {
    setUserFilter("All Users");
    setModuleFilter("All Modules");
    setActionFilter("All Actions");
    setDateFilter("All Dates");
    setSearch("");
  }

  function getActionStyle(action) {
    if (action === "Create") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (action === "Update") {
      return {
        background: "#dbeafe",
        color: "#1d4ed8",
      };
    }

    if (action === "Delete") {
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };
    }

    if (action === "Approve") {
      return {
        background: "#ede9fe",
        color: "#6d28d9",
      };
    }

    if (action === "Status Change") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#f1f5f9",
      color: "#475569",
    };
  }

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      {/* PAGE HEADER */}

      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "6px",
          }}
        >
          Home / Administration / Audit History
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Audit History
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Track important user and system actions
          across the Tender Management Tool.
        </p>
      </div>

      {/* SUMMARY */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          ["Total Events", events.length],
          ["Today", todayEvents],
          ["User Actions", userActions],
          ["System Events", systemEvents],
        ].map(([title, value]) => (
          <div
            key={title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              {title}
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "27px",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                color: "#0f172a",
              }}
            >
              Audit Filters
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Filter recorded user and system activity.
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            style={{
              padding: "9px 15px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#475569",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Reset Filters
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: "14px",
            marginTop: "18px",
          }}
        >
          {/* USER */}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              User
            </label>

            <select
              value={userFilter}
              onChange={(e) =>
                setUserFilter(e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#334155",
                fontSize: "13px",
              }}
            >
              {users.map((user) => (
                <option key={user}>{user}</option>
              ))}
            </select>
          </div>

          {/* MODULE */}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Module
            </label>

            <select
              value={moduleFilter}
              onChange={(e) =>
                setModuleFilter(e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#334155",
                fontSize: "13px",
              }}
            >
              {modules.map((module) => (
                <option key={module}>
                  {module}
                </option>
              ))}
            </select>
          </div>

          {/* ACTION */}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Action
            </label>

            <select
              value={actionFilter}
              onChange={(e) =>
                setActionFilter(e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#334155",
                fontSize: "13px",
              }}
            >
              {actions.map((action) => (
                <option key={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Date
            </label>

            <select
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#334155",
                fontSize: "13px",
              }}
            >
              {dates.map((date) => (
                <option key={date}>{date}</option>
              ))}
            </select>
          </div>
        </div>

        {/* SEARCH */}

        <div style={{ marginTop: "14px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#475569",
            }}
          >
            Search
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search user, module, action, tender reference..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "11px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "13px",
              color: "#334155",
            }}
          />
        </div>
      </div>

      {/* AUDIT REGISTER */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom:
              "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                color: "#0f172a",
              }}
            >
              Audit Events
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Review recorded actions and system events.
            </p>
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            {filteredEvents.length} event
            {filteredEvents.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* TABLE */}

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "1000px",
              borderCollapse: "collapse",
              fontSize: "12px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f8fafc",
                }}
              >
                <th
                  style={{
                    padding: "14px 20px",
                    textAlign: "left",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  Date / Time
                </th>

                <th
                  style={{
                    padding: "14px 12px",
                    textAlign: "left",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  User
                </th>

                <th
                  style={{
                    padding: "14px 12px",
                    textAlign: "left",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  Module
                </th>

                <th
                  style={{
                    padding: "14px 12px",
                    textAlign: "left",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  Action
                </th>

                <th
                  style={{
                    padding: "14px 12px",
                    textAlign: "left",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  Record
                </th>

                <th
                  style={{
                    padding: "14px 12px",
                    textAlign: "left",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  Source
                </th>

                <th
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#64748b",
                  }}
                >
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      padding: "50px 24px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    No audit events match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => {
                  const actionStyle =
                    getActionStyle(
                      event.action
                    );

                  return (
                    <tr key={event.id}>
                      <td
                        style={{
                          padding: "15px 20px",
                          borderBottom:
                            "1px solid #e2e8f0",
                          color: "#475569",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {event.date}
                      </td>

                      <td
                        style={{
                          padding: "15px 12px",
                          borderBottom:
                            "1px solid #e2e8f0",
                          color: "#0f172a",
                          fontWeight: "600",
                        }}
                      >
                        {event.user}
                      </td>

                      <td
                        style={{
                          padding: "15px 12px",
                          borderBottom:
                            "1px solid #e2e8f0",
                          color: "#475569",
                        }}
                      >
                        {event.module}
                      </td>

                      <td
                        style={{
                          padding: "15px 12px",
                          borderBottom:
                            "1px solid #e2e8f0",
                        }}
                      >
                        <span
                          style={{
                            display:
                              "inline-block",
                            padding:
                              "5px 9px",
                            borderRadius:
                              "999px",
                            fontSize:
                              "11px",
                            fontWeight:
                              "600",
                            background:
                              actionStyle.background,
                            color:
                              actionStyle.color,
                          }}
                        >
                          {event.action}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: "15px 12px",
                          borderBottom:
                            "1px solid #e2e8f0",
                          color: "#475569",
                          fontWeight: "500",
                        }}
                      >
                        {event.record}
                      </td>

                      <td
                        style={{
                          padding: "15px 12px",
                          borderBottom:
                            "1px solid #e2e8f0",
                          color: "#64748b",
                        }}
                      >
                        {event.source}
                      </td>

                      <td
                        style={{
                          padding: "15px 12px",
                          borderBottom:
                            "1px solid #e2e8f0",
                          textAlign: "center",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedEvent(
                              event
                            )
                          }
                          style={{
                            padding:
                              "6px 10px",
                            border:
                              "1px solid #cbd5e1",
                            borderRadius:
                              "6px",
                            background:
                              "#ffffff",
                            color:
                              "#334155",
                            fontSize:
                              "11px",
                            cursor:
                              "pointer",
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INFORMATION NOTE */}

      <div
        style={{
          marginTop: "20px",
          padding: "16px 20px",
          borderRadius: "10px",
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          color: "#1e40af",
          fontSize: "13px",
        }}
      >
        Audit records are intended to provide a
        traceable history of important tender,
        result, user, permission and configuration
        changes. Audit records should not be editable
        or deletable by normal users.
      </div>

      {/* VIEW DETAILS MODAL */}

      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15, 23, 42, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              background: "#ffffff",
              borderRadius: "14px",
              boxShadow:
                "0 20px 50px rgba(15, 23, 42, 0.2)",
              overflow: "hidden",
            }}
          >
            {/* MODAL HEADER */}

            <div
              style={{
                padding: "20px 24px",
                borderBottom:
                  "1px solid #e2e8f0",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "19px",
                    color: "#0f172a",
                  }}
                >
                  Audit Event Details
                </h2>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Detailed information about this activity.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedEvent(null)
                }
                style={{
                  width: "32px",
                  height: "32px",
                  border: "none",
                  borderRadius: "7px",
                  background: "#f1f5f9",
                  color: "#475569",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* DETAILS */}

            <div
              style={{
                padding: "24px",
                display: "grid",
                gap: "16px",
              }}
            >
              {[
                ["Date / Time", selectedEvent.date],
                ["User", selectedEvent.user],
                ["Module", selectedEvent.module],
                ["Action", selectedEvent.action],
                ["Record", selectedEvent.record],
                ["Source", selectedEvent.source],
                ["Status", selectedEvent.status],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "140px 1fr",
                    gap: "15px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontWeight: "600",
                    }}
                  >
                    {label}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#334155",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: "4px",
                  padding: "14px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  border:
                    "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Activity Details
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.5",
                    color: "#334155",
                  }}
                >
                  {selectedEvent.details}
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <div
              style={{
                padding: "16px 24px",
                borderTop:
                  "1px solid #e2e8f0",
                display: "flex",
                justifyContent:
                  "flex-end",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedEvent(null)
                }
                style={{
                  padding: "10px 18px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  background: "#ffffff",
                  color: "#334155",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
