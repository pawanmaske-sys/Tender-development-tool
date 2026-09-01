"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuSections = [
  {
    title: "",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: "⌂",
      },
    ],
  },

  // =========================
  // TENDERS
  // =========================
  {
    title: "TENDERS",
    items: [
      {
        name: "All Tenders",
        path: "/all-tenders",
        icon: "▣",
      },
      {
        name: "My Tenders",
        path: "/my-tenders",
        icon: "◎",
      },
      {
        name: "Tender Sources",
        path: "/tender-sources",
        icon: "⌕",
      },
      {
        name: "Evaluation",
        path: "/evaluation",
        icon: "✓",
      },
      {
        name: "On Hold",
        path: "/on-hold",
        icon: "⟳",
      },
      {
        name: "Result Awaited",
        path: "/result-awaited",
        icon: "◷",
      },
    ],
  },

  // =========================
  // BID MANAGEMENT
  // =========================
  {
    title: "BID MANAGEMENT",
    items: [
      {
        name: "Bid Workspace",
        path: "/bid-workspace",
        icon: "▤",
      },
      {
        name: "AI Proposal Maker",
        path: "/ai-proposal",
        icon: "✦",
      },
      {
        name: "Submission",
        path: "/submission",
        icon: "↗",
      },
      {
        name: "Post-Submission",
        path: "/post-submission",
        icon: "◉",
      },
      {
        name: "TSR / Result Update",
        path: "/tsr",
        icon: "▤",
      },
    ],
  },

  // =========================
  // PROPOSAL
  // =========================
  {
    title: "PROPOSAL",
    items: [
      {
        name: "Content Library",
        path: "/content-library",
        icon: "▥",
      },
      {
        name: "Template Studio",
        path: "/template-studio",
        icon: "▧",
      },
    ],
  },

  // =========================
  // MANAGEMENT
  // =========================
  {
    title: "MANAGEMENT",
    items: [
      {
        name: "Reports & Analytics",
        path: "/reports",
        icon: "▥",
      },
      {
        name: "Targets",
        path: "/targets",
        icon: "◎",
      },
      {
        name: "Data Quality",
        path: "/data-quality",
        icon: "△",
      },
    ],
  },

  // =========================
  // ADMINISTRATION
  // =========================
  {
    title: "ADMINISTRATION",
    items: [
      {
        name: "Master Management",
        path: "/masters",
        icon: "⚙",
      },
      {
        name: "Users & Roles",
        path: "/users-roles",
        icon: "♙",
      },
      {
        name: "Audit History",
        path: "/audit-history",
        icon: "☷",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sidebar ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* =========================
          BRAND
      ========================= */}
      <div className="brand">
        <div className="brand-logo">
          T
        </div>

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

      {/* =========================
          COLLAPSE BUTTON
      ========================= */}
      <button
        type="button"
        className="collapse-button"
        onClick={() => setCollapsed(!collapsed)}
        title={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
      >
        {collapsed ? "→" : "« Collapse"}
      </button>

      {/* =========================
          NAVIGATION
      ========================= */}
      <nav className="nav">
        {menuSections.map((section) => (
          <div
            key={section.title || "main"}
            className="nav-section"
          >
            {/* SECTION TITLE */}
            {section.title && (
              <div className="nav-label">
                {section.title}
              </div>
            )}

            {/* SECTION ITEMS */}
            {section.items.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-item ${
                    isActive ? "active" : ""
                  }`}
                >
                  <span className="nav-icon">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <span className="nav-text">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
