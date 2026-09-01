"use client";

import { useState } from "react";

const roles = [
  {
    role: "Bid Team Member",
    description:
      "Works on assigned tenders, documents, evaluation and bid preparation.",
    access: "Tender & Bid Workspace",
  },
  {
    role: "Result Editor",
    description:
      "Updates tender results and maintains result-related information.",
    access: "Results & TSR",
  },
  {
    role: "Team Lead / Bid Manager",
    description:
      "Reviews tenders, manages team workload and approves bid activities.",
    access: "Team & Approval",
  },
  {
    role: "Admin",
    description:
      "Manages users, roles, masters and system configuration.",
    access: "Administration",
  },
  {
    role: "Management",
    description:
      "Views management dashboards, reports and tender performance.",
    access: "Reports & Analytics",
  },
];

const roleOptions = roles.map((item) => item.role);

const branchOptions = [
  "Mumbai",
  "Delhi",
  "Pune",
  "Nagpur",
  "Bangalore",
  "Hyderabad",
];

const permissionRows = [
  ["Dashboard", "View", "View", "View", "Full", "View"],
  ["All Tenders", "View", "View", "Edit", "Full", "View"],
  ["Tender Sources", "View", "View", "Full", "Full", "View"],
  ["Evaluation", "Edit", "View", "Approve", "Full", "View"],
  ["Bid Workspace", "Edit", "View", "Approve", "Full", "View"],
  ["AI Proposal Maker", "Edit", "View", "Approve", "Full", "View"],
  ["Submission", "Edit", "View", "Approve", "Full", "View"],
  ["TSR", "View", "Edit", "Approve", "Full", "View"],
  ["Reports & Analytics", "View", "View", "View", "Full", "View"],
  ["Targets", "View", "View", "Edit", "Full", "View"],
  ["Data Quality", "View", "View", "View", "Full", "View"],
  ["Masters", "No Access", "No Access", "View", "Full", "View"],
  ["Users & Roles", "No Access", "No Access", "No Access", "Full", "No Access"],
  ["Audit History", "No Access", "View", "View", "Full", "View"],
];

export default function UsersRolesPage() {
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Bid Team Member",
    branch: "Mumbai",
    status: "Active",
  });

  const [message, setMessage] = useState("");

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  function openAddUser() {
    setEditingUser(null);

    setForm({
      name: "",
      email: "",
      role: "Bid Team Member",
      branch: "Mumbai",
      status: "Active",
    });

    setMessage("");
    setShowModal(true);
  }

  function openEditUser(user) {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      branch: user.branch,
      status: user.status,
    });

    setMessage("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingUser(null);
    setMessage("");
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function saveUser(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      setMessage("Please enter the user name.");
      return;
    }

    if (!form.email.trim()) {
      setMessage("Please enter the email address.");
      return;
    }

    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...form,
              }
            : user
        )
      );

      setMessage("User updated successfully.");
    } else {
      const newUser = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        branch: form.branch,
        status: form.status,
      };

      setUsers((previous) => [...previous, newUser]);

      setMessage("User added successfully.");
    }

    setShowModal(false);
    setEditingUser(null);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  function toggleStatus(userId) {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );
  }

  function deleteUser(userId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    setUsers((previous) =>
      previous.filter((user) => user.id !== userId)
    );

    setMessage("User deleted successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  function permissionStyle(value) {
    if (value === "Full") {
      return {
        color: "#166534",
        background: "#dcfce7",
      };
    }

    if (value === "Approve") {
      return {
        color: "#1d4ed8",
        background: "#dbeafe",
      };
    }

    if (value === "Edit") {
      return {
        color: "#92400e",
        background: "#fef3c7",
      };
    }

    if (value === "No Access") {
      return {
        color: "#94a3b8",
        background: "#f1f5f9",
      };
    }

    return {
      color: "#475569",
      background: "#f8fafc",
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
          Home / Administration / Users & Roles
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#0f172a",
          }}
        >
          Users & Roles
        </h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: 0,
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Manage users, roles and access permissions.
        </p>
      </div>

      {/* MESSAGE */}

      {message && !showModal && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#047857",
            fontSize: "13px",
          }}
        >
          {message}
        </div>
      )}

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
          ["Total Users", totalUsers],
          ["Active Users", activeUsers],
          ["Inactive Users", inactiveUsers],
          ["Roles", roles.length],
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

      {/* USER REGISTER */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
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
              User Register
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Manage system users and their assigned roles.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddUser}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#ffffff",
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            + Add User
          </button>
        </div>

        {/* TABLE HEADER */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1.3fr 1.6fr 1.2fr 1fr 0.8fr 1.2fr",
            gap: "12px",
            padding: "14px 24px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
          <div>Branch</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* USER DATA */}

        {users.length === 0 ? (
          <div
            style={{
              padding: "50px 24px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            No users have been configured yet.

            <div
              style={{
                marginTop: "8px",
                fontSize: "12px",
              }}
            >
              Click "+ Add User" to create the first user.
            </div>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1.3fr 1.6fr 1.2fr 1fr 0.8fr 1.2fr",
                gap: "12px",
                padding: "16px 24px",
                borderBottom:
                  "1px solid #e2e8f0",
                alignItems: "center",
                fontSize: "13px",
                color: "#334155",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {user.name}
              </div>

              <div
                style={{
                  wordBreak: "break-word",
                }}
              >
                {user.email}
              </div>

              <div>{user.role}</div>

              <div>{user.branch}</div>

              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background:
                      user.status === "Active"
                        ? "#dcfce7"
                        : "#fee2e2",
                    color:
                      user.status === "Active"
                        ? "#166534"
                        : "#991b1b",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  {user.status}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    openEditUser(user)
                  }
                  style={{
                    padding: "6px 9px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toggleStatus(user.id)
                  }
                  style={{
                    padding: "6px 9px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  {user.status === "Active"
                    ? "Disable"
                    : "Activate"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteUser(user.id)
                  }
                  style={{
                    padding: "6px 9px",
                    border:
                      "1px solid #fecaca",
                    borderRadius: "6px",
                    background: "#fff1f2",
                    color: "#b91c1c",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SYSTEM ROLES */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            color: "#0f172a",
          }}
        >
          System Roles
        </h2>

        <p
          style={{
            marginTop: "6px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Role definitions and high-level access areas.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          {roles.map((item) => (
            <div
              key={item.role}
              style={{
                padding: "20px",
                border:
                  "1px solid #e2e8f0",
                borderRadius: "10px",
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  gap: "12px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    color: "#0f172a",
                  }}
                >
                  {item.role}
                </h3>

                <span
                  style={{
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background: "#e2e8f0",
                    color: "#475569",
                    fontSize: "11px",
                  }}
                >
                  Role
                </span>
              </div>

              <p
                style={{
                  marginTop: "10px",
                  marginBottom: "8px",
                  color: "#64748b",
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  fontSize: "12px",
                  color: "#475569",
                }}
              >
                <strong>
                  Primary access:
                </strong>{" "}
                {item.access}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROLE PERMISSIONS */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom:
              "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              color: "#0f172a",
            }}
          >
            Role Permissions
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            Review module access assigned to
            each system role.
          </p>
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "1050px",
              borderCollapse:
                "collapse",
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
                    padding:
                      "14px 20px",
                    textAlign: "left",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#475569",
                    minWidth: "180px",
                  }}
                >
                  Module
                </th>

                {[
                  "Bid Team Member",
                  "Result Editor",
                  "Team Lead / Bid Manager",
                  "Admin",
                  "Management",
                ].map((role) => (
                  <th
                    key={role}
                    style={{
                      padding:
                        "14px 12px",
                      textAlign:
                        "center",
                      borderBottom:
                        "1px solid #e2e8f0",
                      color: "#475569",
                      minWidth: "135px",
                    }}
                  >
                    {role}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {permissionRows.map(
                (row) => (
                  <tr key={row[0]}>
                    <td
                      style={{
                        padding:
                          "13px 20px",
                        borderBottom:
                          "1px solid #e2e8f0",
                        color: "#334155",
                        fontWeight:
                          "600",
                      }}
                    >
                      {row[0]}
                    </td>

                    {row
                      .slice(1)
                      .map(
                        (
                          permission,
                          index
                        ) => {
                          const style =
                            permissionStyle(
                              permission
                            );

                          return (
                            <td
                              key={
                                index
                              }
                              style={{
                                padding:
                                  "13px 12px",
                                borderBottom:
                                  "1px solid #e2e8f0",
                                textAlign:
                                  "center",
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
                                  color:
                                    style.color,
                                  background:
                                    style.background,
                                }}
                              >
                                {
                                  permission
                                }
                              </span>
                            </td>
                          );
                        }
                      )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            padding:
              "14px 20px",
            background:
              "#f8fafc",
            color: "#64748b",
            fontSize: "12px",
          }}
        >
          <strong>
            Access levels:
          </strong>{" "}
          View = read only
          &nbsp;•&nbsp; Edit =
          create/update
          &nbsp;•&nbsp; Approve =
          approval actions
          &nbsp;•&nbsp; Full =
          full module access
        </div>
      </div>

      {/* ADD / EDIT USER MODAL */}

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15, 23, 42, 0.45)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
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
                padding:
                  "20px 24px",
                borderBottom:
                  "1px solid #e2e8f0",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    color: "#0f172a",
                  }}
                >
                  {editingUser
                    ? "Edit User"
                    : "Add New User"}
                </h2>

                <p
                  style={{
                    margin:
                      "5px 0 0",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Enter user details
                  and assign access.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "none",
                  borderRadius: "7px",
                  background:
                    "#f1f5f9",
                  color: "#475569",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={saveUser}>
              <div
                style={{
                  padding:
                    "24px",
                  display: "grid",
                  gap: "16px",
                }}
              >
                {/* NAME */}

                <div>
                  <label
                    style={{
                      display:
                        "block",
                      marginBottom:
                        "6px",
                      fontSize:
                        "12px",
                      fontWeight:
                        "600",
                      color:
                        "#334155",
                    }}
                  >
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      form.name
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter full name"
                    style={{
                      width:
                        "100%",
                      boxSizing:
                        "border-box",
                      padding:
                        "11px 12px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius:
                        "8px",
                      fontSize:
                        "13px",
                    }}
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    style={{
                      display:
                        "block",
                      marginBottom:
                        "6px",
                      fontSize:
                        "12px",
                      fontWeight:
                        "600",
                      color:
                        "#334155",
                    }}
                  >
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={
                      form.email
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="name@company.com"
                    style={{
                      width:
                        "100%",
                      boxSizing:
                        "border-box",
                      padding:
                        "11px 12px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius:
                        "8px",
                      fontSize:
                        "13px",
                    }}
                  />
                </div>

                {/* ROLE + BRANCH */}

                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display:
                          "block",
                        marginBottom:
                          "6px",
                        fontSize:
                          "12px",
                        fontWeight:
                          "600",
                        color:
                          "#334155",
                      }}
                    >
                      Role
                    </label>

                    <select
                      name="role"
                      value={
                        form.role
                      }
                      onChange={
                        handleChange
                      }
                      style={{
                        width:
                          "100%",
                        padding:
                          "11px 12px",
                        border:
                          "1px solid #cbd5e1",
                        borderRadius:
                          "8px",
                        background:
                          "#ffffff",
                        fontSize:
                          "13px",
                      }}
                    >
                      {roleOptions.map(
                        (
                          role
                        ) => (
                          <option
                            key={
                              role
                            }
                            value={
                              role
                            }
                          >
                            {
                              role
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display:
                          "block",
                        marginBottom:
                          "6px",
                        fontSize:
                          "12px",
                        fontWeight:
                          "600",
                        color:
                          "#334155",
                      }}
                    >
                      Branch
                    </label>

                    <select
                      name="branch"
                      value={
                        form.branch
                      }
                      onChange={
                        handleChange
                      }
                      style={{
                        width:
                          "100%",
                        padding:
                          "11px 12px",
                        border:
                          "1px solid #cbd5e1",
                        borderRadius:
                          "8px",
                        background:
                          "#ffffff",
                        fontSize:
                          "13px",
                      }}
                    >
                      {branchOptions.map(
                        (
                          branch
                        ) => (
                          <option
                            key={
                              branch
                            }
                            value={
                              branch
                            }
                          >
                            {
                              branch
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* STATUS */}

                <div>
                  <label
                    style={{
                      display:
                        "block",
                      marginBottom:
                        "6px",
                      fontSize:
                        "12px",
                      fontWeight:
                        "600",
                      color:
                        "#334155",
                    }}
                  >
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      form.status
                    }
                    onChange={
                      handleChange
                    }
                    style={{
                      width:
                        "100%",
                      padding:
                        "11px 12px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius:
                        "8px",
                      background:
                        "#ffffff",
                      fontSize:
                        "13px",
                    }}
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>

                {/* FORM ERROR */}

                {message && (
                  <div
                    style={{
                      padding:
                        "10px 12px",
                      borderRadius:
                        "7px",
                      background:
                        "#fef2f2",
                      border:
                        "1px solid #fecaca",
                      color:
                        "#b91c1c",
                      fontSize:
                        "12px",
                    }}
                  >
                    {message}
                  </div>
                )}
              </div>

              {/* MODAL FOOTER */}

              <div
                style={{
                  padding:
                    "16px 24px",
                  borderTop:
                    "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent:
                    "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  style={{
                    padding:
                      "10px 18px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius:
                      "8px",
                    background:
                      "#ffffff",
                    color:
                      "#334155",
                    fontSize:
                      "13px",
                    cursor:
                      "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding:
                      "10px 18px",
                    border: "none",
                    borderRadius:
                      "8px",
                    background:
                      "#2563eb",
                    color:
                      "#ffffff",
                    fontSize:
                      "13px",
                    cursor:
                      "pointer",
                    fontWeight:
                      "600",
                  }}
                >
                  {editingUser
                    ? "Update User"
                    : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
