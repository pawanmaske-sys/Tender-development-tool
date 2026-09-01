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

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingUser(null);
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

    if (!form.name.trim() || !form.email.trim()) {
      setMessage("Please enter user name and email.");
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
        ...form,
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
                user.status === "Active" ? "Inactive" : "Active",
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

    setMessage("User deleted.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
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

      {/* SUCCESS / ERROR MESSAGE */}

      {message && (
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
        {/* REGISTER HEADER */}

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
              "1.3fr 1.6fr 1.2fr 1fr 0.8fr 1fr",
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

        {/* USER ROWS */}

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
                  "1.3fr 1.6fr 1.2fr 1fr 0.8fr 1fr",
                gap: "12px",
                padding: "16px 24px",
                borderBottom: "1px solid #e2e8f0",
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

              <div>{user.email}</div>

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
                  onClick={() => openEditUser(user)}
                  style={{
                    padding: "6px 9px",
                    border: "1px solid #cbd5e1",
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
                  onClick={() => toggleStatus(user.id)}
                  style={{
                    padding: "6px 9px",
                    border: "1px solid #cbd5e1",
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
                  onClick={() => deleteUser(user.id)}
                  style={{
                    padding: "6px 9px",
                    border: "1px solid #fecaca",
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

      {/* ROLES */}

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "24px",
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
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                <strong>Primary access:</strong>{" "}
                {item.access}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD / EDIT USER MODAL */}

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.45)",
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
                padding: "20px 24px",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                    margin: "5px 0 0",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Enter user details and assign access.
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
                  background: "#f1f5f9",
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
                  padding: "24px",
                  display: "grid",
                  gap: "16px",
                }}
              >
                {/* NAME */}

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "11px 12px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "11px 12px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                {/* ROLE + BRANCH */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#334155",
                      }}
                    >
                      Role
                    </label>

                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "11px 12px",
                        border:
                          "1px solid #cbd5e1",
                        borderRadius: "8px",
                        background: "#ffffff",
                        fontSize: "13px",
                      }}
                    >
                      {roleOptions.map(
                        (role) => (
                          <option
                            key={role}
                            value={role}
                          >
                            {role}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#334155",
                      }}
                    >
                      Branch
                    </label>

                    <select
                      name="branch"
                      value={form.branch}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "11px 12px",
                        border:
                          "1px solid #cbd5e1",
                        borderRadius: "8px",
                        background: "#ffffff",
                        fontSize: "13px",
                      }}
                    >
                      {branchOptions.map(
                        (branch) => (
                          <option
                            key={branch}
                            value={branch}
                          >
                            {branch}
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
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      border:
                        "1px solid #cbd5e1",
                      borderRadius: "8px",
                      background: "#ffffff",
                      fontSize: "13px",
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
              </div>

              {/* MODAL FOOTER */}

              <div
                style={{
                  padding: "16px 24px",
                  borderTop: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: "10px 18px",
                    border:
                      "1px solid #cbd5e1",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
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
