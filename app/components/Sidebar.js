"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuSections = [
  {
    title: "MAIN",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: "▦",
      },
      {
        name: "Tender Sources",
        path: "/tender-sources",
        icon: "◎",
      },
      {
        name: "My Tenders",
        path: "/my-tenders",
        icon: "♙",
      },
      {
        name: "All Tenders",
        path: "/all-tenders",
        icon: "▤",
      },
    ],
  },

  {
    title: "TENDER WORKFLOW",
    items: [
      {
        name: "Evaluation",
        path: "/evaluation",
        icon: "✓",
      },
      {
        name: "Bid Workspace",
        path: "/bid-workspace",
        icon: "▣",
      },
      {
        name: "AI Proposal Maker",
        path: "/ai-proposal-maker",
        icon: "✦",
      },
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
      {
        name: "Submission",
        path: "/submission",
        icon: "↗",
      },
      {
        name: "Post-Submission",
        path: "/post-submission",
        icon: "↻",
      },
      {
        name: "TSR / Result Update",
        path: "/tsr-result-update",
        icon: "◉",
      },
    ],
  },

  {
    title: "REPORTING & ADMIN",
    items: [
      {
        name: "Reports",
        path: "/reports",
        icon: "▥",
      },
      {
        name: "Admin / Masters",
        path: "/admin-masters",
        icon: "⚙",
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

      {/* BRAND */}
      <div className="brand">

        <div className="brand-logo">
          T
        </div>

        <div>
          <div className="brand-title">
            Tender Tool
          </div>

          <div className="brand-sub">
            Management System
          </div>
        </div>

      </div>


      {/* COLLAPSE */}
      <button
        type="button"
        className="collapse-button"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "→" : "←"}
      </button>


      {/* NAVIGATION */}
      <nav className="nav">

        {menuSections.map((section) => (

          <div key={section.title}>

            <div className="nav-label">
              {section.title}
            </div>

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

                  <span className="nav-text">
                    {item.name}
                  </span>

                </Link>
              );

            })}

          </div>

        ))}

      </nav>

    </aside>
  );
}
