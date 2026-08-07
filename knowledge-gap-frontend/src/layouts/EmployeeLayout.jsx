import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Award,
  LayoutDashboard,
  User,
  AlertTriangle,
  LogOut,
  Bell,
  BookOpen,
  Route,
  Lightbulb,
  ClipboardCheck,
  BadgeCheck,
  MapPinned,
  ClipboardList,
  Users,
} from "lucide-react";
import Header from "../components/layout/Header";

const EmployeeLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/employee/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
    {
        name: "My Skills",
        icon: Award,
        href: "/employee/skills",
    },
    {
      name: "Learning Path",
      icon: MapPinned,
      href: "/employee/learning-path",
    },
    {
      name: "Recommendations",
      href: "/ai-recommendations",
      icon: Lightbulb,
    },

    {
      name: "Assessments",
      href: "/assessment",
      icon: ClipboardCheck,
    },
    ,
{
    name: "Assessment History",
    href: "/assessment/history",
    icon: ClipboardList,
},
    {
    name: "My Certifications",
    icon: Award,
    href: "/my-certifications",
},
 {
        name: "Peer Ratings",
        icon: Users,
        href: "/employee/ratings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Header
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
/>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-[52px]
            h-[calc(100vh-52px)]
            overflow-y-auto
            w-64 bg-white border-r border-gray-200 p-4
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
            }
          `}
        >
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive
                      ? "bg-indigo-50 text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <Icon
                    size={18}
                    className={
                      isActive ? "text-indigo-600" : "text-gray-400"
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
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;