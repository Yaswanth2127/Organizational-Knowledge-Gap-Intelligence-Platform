
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  LogOut,
  Bell,
  BookOpen,
  Brain,
  Building2,
  FolderTree,
  Users,
  BrainCircuit,
  Network,
  BadgeCheck,
  ClipboardList,
  AlertTriangle
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
const role = localStorage.getItem("role");

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User
  },

  ...(role === "SYS_ADMIN" || role === "HR_SPECIALIST"
    ? [
        {
          name: "Employee Skills",
          href: "/employee-skills",
          icon: Brain
        },
        {
          name: "Departments",
          href: "/departments",
          icon: Building2
        },
        {
          name: "Skill Categories",
          href: "/skill-categories",
          icon: FolderTree
        },
        {
          name: "Job Roles",
          href: "/job-roles",
          icon: Users
        },
        {
          name: "Skills",
          href: "/skills",
          icon: BrainCircuit
        },
        {
          name: "Competency Frameworks",
          href: "/competency-frameworks",
          icon: Network
        },
        {
          name: "Framework Required Skills",
          href: "/framework-required-skills",
          icon: ClipboardList,
        },
        {
          name: "Skill Gaps",
          href: "/skill-gaps",
          icon: AlertTriangle,
        },
                {
          name: "Certifications",
          href: "/certifications",
          icon: BadgeCheck
        },
        {
          name: "Courses",
          href: "/courses",
          icon: BookOpen
        },
        {
        name: "Employee Skill Gap Analysis",
        href: "/employee-skill-gap-analysis",
        icon: AlertTriangle,
    }
      ]
    : [])
];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-2 font-bold text-lg tracking-wide text-indigo-400">
            <BookOpen size={24} />
            <span className="hidden sm:inline text-white">KnowledgeGap</span> Intelligence
          </div>
        </div>

        {/* Global Action Icons */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-white rounded-full hover:bg-slate-800 transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="flex items-center gap-1 text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-gray-200 transition"
          >
            <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar Container */}
        <aside
          className={`
            fixed md:sticky top-[52px]
            h-[calc(100vh-52px)]
            overflow-y-auto
            w-64 bg-white border-r border-gray-200 p-4
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Workspace */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;