"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <aside className="sidebar">

      {/* LOGO / BRAND */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          T
        </div>

        <div>
          <div className="brand-title">
            Tender Tool
          </div>

          <div className="brand-subtitle">
            Management System
          </div>
        </div>
      </div>


      {/* MENU */}
      <nav className="sidebar-nav">

        <div className="sidebar-section-title">
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
              className={`sidebar-item ${
                isActive ? "sidebar-item-active" : ""
              }`}
            >

              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span className="sidebar-label">
                {item.name}
              </span>

            </Link>
          );
        })}

      </nav>


      {/* MODULES */}
      <div className="sidebar-modules">

        <div className="sidebar-section-title">
          MODULES
        </div>

        <Link
          href="/all-tenders"
          className="sidebar-module"
        >
          <span className="module-icon">
            📋
          </span>

          <div>
            <div className="module-name">
              Tender Management
            </div>

            <div className="module-description">
              Manage all tenders
            </div>
          </div>
        </Link>


        <Link
          href="/tender-sources"
          className="sidebar-module"
        >
          <span className="module-icon">
            🌐
          </span>

          <div>
            <div className="module-name">
              Tender Sources
            </div>

            <div className="module-description">
              Manage tender portals
            </div>
          </div>
        </Link>

      </div>


      {/* BOTTOM USER */}
      <div className="sidebar-bottom">

        <div className="sidebar-user-avatar">
          PM
        </div>

        <div className="sidebar-user-info">
          <div className="sidebar-user-name">
            Pawan Maske
          </div>

          <div className="sidebar-user-role">
            Tender Executive
          </div>
        </div>

      </div>

    </aside>
  );
}
