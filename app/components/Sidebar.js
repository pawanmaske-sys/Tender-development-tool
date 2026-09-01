"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "▦",
  },
  {
    name: "All Tenders",
    path: "/all-tenders",
    icon: "▤",
  },
  {
    name: "Tender Sources",
    path: "/tender-sources",
    icon: "◎",
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


      {/* COLLAPSE BUTTON */}
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

        <div className="nav-label">
          MAIN MENU
        </div>

        {menuItems.map((item) => {

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


        {/* MODULES */}
        <div className="nav-label">
          MODULES
        </div>

        <Link
          href="/all-tenders"
          className={`nav-item ${
            pathname.startsWith("/all-tenders")
              ? "active"
              : ""
          }`}
        >
          <span className="nav-icon">
            📋
          </span>

          <span className="nav-text">
            Tender Management
          </span>
        </Link>


        <Link
          href="/tender-sources"
          className={`nav-item ${
            pathname.startsWith("/tender-sources")
              ? "active"
              : ""
          }`}
        >
          <span className="nav-icon">
            🌐
          </span>

          <span className="nav-text">
            Tender Sources
          </span>
        </Link>

      </nav>

    </aside>
  );
}
