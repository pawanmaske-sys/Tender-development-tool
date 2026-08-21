"use client";

import { useEffect, useState } from "react";

function NavItem({ icon, label, active, onClick, collapsed }) {
  return (
    <button
      type="button"
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
      title={collapsed ? label : ""}
    >
      <span className="nav-icon">{icon}</span>

      {!collapsed && (
        <span className="nav-text">{label}</span>
      )}
    </button>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tenderhub-sidebar-collapsed");

    if (saved === "true") {
      setCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    const newValue = !collapsed;

    setCollapsed(newValue);

    localStorage.setItem(
      "tenderhub-sidebar-collapsed",
      String(newValue)
    );
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>

      {/* BRAND */}
      <div className="brand">
        <div className="brand-logo">T</div>

        {!collapsed && (
          <div>
            <div className="brand-title">TenderHub</div>
            <div className="brand-sub">Management Tool</div>
          </div>
        )}
      </div>

      {/* COLLAPSE */}
      <button
        type="button"
        className="collapse-button"
        onClick={toggleSidebar}
      >
        {collapsed ? "»" : "« Collapse"}
      </button>

      {/* NAVIGATION */}
      <nav className="nav">

        {/* DASHBOARD */}
        <NavItem
          icon="⌂"
          label="Dashboard"
          active={
            typeof window !== "undefined" &&
            window.location.pathname === "/"
          }
          collapsed={collapsed}
          onClick={() => goTo("/")}
        />

        {!collapsed && (
          <div className="nav-label">
            TENDERS
          </div>
        )}

        <NavItem
          icon="▣"
          label="All Tenders"
          active={
            typeof window !== "undefined" &&
            window.location.pathname === "/all-tenders"
          }
          collapsed={collapsed}
          onClick={() => goTo("/all-tenders")}
        />

        <NavItem
          icon="◎"
          label="My Tenders"
          active={
            typeof window !== "undefined" &&
            window.location.pathname === "/my-tenders"
          }
          collapsed={collapsed}
          onClick={() => goTo("/my-tenders")}
        />

        <NavItem
          icon="⟳"
          label="On Hold"
          active={
            typeof window !== "undefined" &&
            window.location.pathname === "/on-hold"
          }
          collapsed={collapsed}
          onClick={() => goTo("/on-hold")}
        />

        <NavItem
          icon="◷"
          label="Result Awaited"
          active={
            typeof window !== "undefined" &&
            window.location.pathname === "/result-awaited"
          }
          collapsed={collapsed}
          onClick={() => goTo("/result-awaited")}
        />

        {!collapsed && (
          <div className="nav-label">
            MANAGEMENT
          </div>
        )}

        <NavItem
          icon="▥"
          label="Reports & Analytics"
          collapsed={collapsed}
          onClick={() => goTo("/reports")}
        />

        <NavItem
          icon="◎"
          label="Targets"
          collapsed={collapsed}
          onClick={() => goTo("/targets")}
        />

        <NavItem
          icon="△"
          label="Data Quality"
          collapsed={collapsed}
          onClick={() => goTo("/data-quality")}
        />

        <NavItem
          icon="⚙"
          label="Masters"
          collapsed={collapsed}
          onClick={() => goTo("/masters")}
        />

        <NavItem
          icon="♙"
          label="Users & Roles"
          collapsed={collapsed}
          onClick={() => goTo("/users-roles")}
        />

        <NavItem
          icon="☷"
          label="Audit History"
          collapsed={collapsed}
          onClick={() => goTo("/audit-history")}
        />

      </nav>
    </aside>
  );
}
