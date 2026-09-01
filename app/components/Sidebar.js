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

function SectionLabel({ children, collapsed }) {
  if (collapsed) return null;

  return (
    <div className="nav-label">
      {children}
    </div>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tenderhub-sidebar-collapsed");

    if (saved === "true") {
      setCollapsed(true);
    }

    setCurrentPath(window.location.pathname);
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

  const isActive = (path) => currentPath === path;

  return (
    <aside
      className={`sidebar ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >

      {/* BRAND */}
      <div className="brand">
        <div className="brand-logo">T</div>

        {!collapsed && (
          <div>
            <div className="brand-title">
              TenderHub
            </div>

            <div className="brand-sub">
              Management Tool
            </div>
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

      <nav className="nav">

        {/* ================= WORKSPACE ================= */}

        <NavItem
          icon="⌂"
          label="Dashboard"
          active={isActive("/")}
          collapsed={collapsed}
          onClick={() => goTo("/")}
        />

        {/* ================= TENDERS ================= */}

        <SectionLabel collapsed={collapsed}>
          TENDERS
        </SectionLabel>

        <NavItem
          icon="▣"
          label="All Tenders"
          active={isActive("/all-tenders")}
          collapsed={collapsed}
          onClick={() => goTo("/all-tenders")}
        />

        <NavItem
          icon="◎"
          label="My Tenders"
          active={isActive("/my-tenders")}
          collapsed={collapsed}
          onClick={() => goTo("/my-tenders")}
        />

        <NavItem
          icon="⌕"
          label="Tender Sources"
          active={isActive("/tender-sources")}
          collapsed={collapsed}
          onClick={() => goTo("/tender-sources")}
        />

        <NavItem
          icon="✓"
          label="Evaluation"
          active={isActive("/evaluation")}
          collapsed={collapsed}
          onClick={() => goTo("/evaluation")}
        />

        <NavItem
          icon="⟳"
          label="On Hold"
          active={isActive("/on-hold")}
          collapsed={collapsed}
          onClick={() => goTo("/on-hold")}
        />

        <NavItem
          icon="◷"
          label="Result Awaited"
          active={isActive("/result-awaited")}
          collapsed={collapsed}
          onClick={() => goTo("/result-awaited")}
        />

        {/* ================= BID MANAGEMENT ================= */}

        <SectionLabel collapsed={collapsed}>
          BID MANAGEMENT
        </SectionLabel>

        <NavItem
          icon="▤"
          label="Bid Workspace"
          active={isActive("/bid-workspace")}
          collapsed={collapsed}
          onClick={() => goTo("/bid-workspace")}
        />

        <NavItem
          icon="✦"
          label="AI Proposal Maker"
          active={isActive("/ai-proposal")}
          collapsed={collapsed}
          onClick={() => goTo("/ai-proposal")}
        />

        <NavItem
          icon="↗"
          label="Submission"
          active={isActive("/submission")}
          collapsed={collapsed}
          onClick={() => goTo("/submission")}
        />

        <NavItem
          icon="◉"
          label="Post-Submission"
          active={isActive("/post-submission")}
          collapsed={collapsed}
          onClick={() => goTo("/post-submission")}
        />

        <NavItem
          icon="▤"
          label="TSR / Result Update"
          active={isActive("/tsr")}
          collapsed={collapsed}
          onClick={() => goTo("/tsr")}
        />

        {/* ================= PROPOSAL ================= */}

        <SectionLabel collapsed={collapsed}>
          PROPOSAL
        </SectionLabel>

        <NavItem
          icon="▥"
          label="Content Library"
          active={isActive("/content-library")}
          collapsed={collapsed}
          onClick={() => goTo("/content-library")}
        />

        <NavItem
          icon="▧"
          label="Template Studio"
          active={isActive("/template-studio")}
          collapsed={collapsed}
          onClick={() => goTo("/template-studio")}
        />

        {/* ================= MANAGEMENT ================= */}

        <SectionLabel collapsed={collapsed}>
          MANAGEMENT
        </SectionLabel>

        <NavItem
          icon="▥"
          label="Reports & Analytics"
          active={isActive("/reports")}
          collapsed={collapsed}
          onClick={() => goTo("/reports")}
        />

        <NavItem
          icon="◎"
          label="Targets"
          active={isActive("/targets")}
          collapsed={collapsed}
          onClick={() => goTo("/targets")}
        />

        <NavItem
          icon="△"
          label="Data Quality"
          active={isActive("/data-quality")}
          collapsed={collapsed}
          onClick={() => goTo("/data-quality")}
        />

        {/* ================= ADMINISTRATION ================= */}

        <SectionLabel collapsed={collapsed}>
          ADMINISTRATION
        </SectionLabel>

        <NavItem
          icon="⚙"
          label="Masters"
          active={isActive("/masters")}
          collapsed={collapsed}
          onClick={() => goTo("/masters")}
        />

        <NavItem
          icon="♙"
          label="Users & Roles"
          active={isActive("/users-roles")}
          collapsed={collapsed}
          onClick={() => goTo("/users-roles")}
        />

        <NavItem
          icon="☷"
          label="Audit History"
          active={isActive("/audit-history")}
          collapsed={collapsed}
          onClick={() => goTo("/audit-history")}
        />

      </nav>
    </aside>
  );
}
