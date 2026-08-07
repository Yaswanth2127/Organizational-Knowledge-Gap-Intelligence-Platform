import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Brain,
  Building2,
  FolderTree,
  Users,
  BrainCircuit,
  Network,
  BadgeCheck,
  ClipboardList,
  AlertTriangle,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";

import Header from "../components/layout/Header";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  const role = localStorage.getItem("role");
  const navigation = [
  {
    name: "Dashboard",
    href: role === "SYS_ADMIN" ? "/admin/dashboard" : "/hr/dashboard",
    icon: LayoutDashboard,
    roles: ["SYS_ADMIN", "HR_SPECIALIST"],
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    roles: ["SYS_ADMIN", "HR_SPECIALIST"],
  },
  {
    name: "Employee Skills",
    href: "/employee-skills",
    icon: Brain,
    roles: ["SYS_ADMIN", "HR_SPECIALIST"],
  },
  {
    name: "Departments",
    href: "/departments",
    icon: Building2,
    roles: ["SYS_ADMIN"],
  },
  {
    name: "Skill Categories",
    href: "/skill-categories",
    icon: FolderTree,
    roles: ["SYS_ADMIN"],
  },
  {
    name: "Job Roles",
    href: "/job-roles",
    icon: Users,
    roles: ["SYS_ADMIN"],
  },
  {
    name: "Skills",
    href: "/skills",
    icon: BrainCircuit,
    roles: ["SYS_ADMIN"],
  },
  {
    name: "Competency Frameworks",
    href: "/competency-frameworks",
    icon: Network,
    roles: ["SYS_ADMIN"],
  },
  {
    name: "Framework Required Skills",
    href: "/framework-required-skills",
    icon: ClipboardList,
    roles: ["SYS_ADMIN"],
  },
  {
    name: "Skill Gaps",
    href: "/skill-gaps",
    icon: AlertTriangle,
    roles: ["SYS_ADMIN", "HR_SPECIALIST"],
  },
  {
    name: "Certifications",
    href: "/certifications",
    icon: BadgeCheck,
    roles: ["SYS_ADMIN", "HR_SPECIALIST"],
  },
  {
    name: "Courses",
    href: "/courses",
    icon: BookOpen,
    roles: ["SYS_ADMIN", "HR_SPECIALIST"],
  },
  {
    name: "Pending Approvals",
    href: "/assessment/pending-approvals",
    icon: ClipboardCheck,
    roles: ["SYS_ADMIN", "HR_SPECIALIST"],
  },
  {
    name: "Assessment Statistics",
    href: "/assessment/statistics",
    icon: BarChart3,
    roles: ["SYS_ADMIN", "HR_SPECIALIST"],
  },
];

const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(role)
);
 
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Common Header */}
      <Header />

      <div className="flex relative">

        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky
            top-16
            h-[calc(100vh-64px)]
            overflow-y-auto
            w-64
            bg-white
            border-r
            border-gray-200
            p-4
            transition-transform
            duration-300
            ease-in-out
            z-20
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }
          `}
        >
          <nav className="space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    size={18}
                    className={
                      isActive
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }
                  />

                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main  className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;