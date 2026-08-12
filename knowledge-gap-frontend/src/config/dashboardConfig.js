import {
    UserRound,
    Users,
    BriefcaseBusiness,
    Building2,
    GraduationCap,
    Shield,
} from "lucide-react";

export const DASHBOARD_CONFIG = [
    {
        id: "EMPLOYEE",

        label: "Employee Dashboard",

        description: "Personal development",

        path: "/employee/dashboard",

        roles: ["EMPLOYEE"],

        icon: UserRound,

        iconClass: "bg-indigo-50 text-indigo-600",

        activeClass: "bg-indigo-50 text-indigo-700",
    },

    {
        id: "MANAGER",

        label: "Manager Dashboard",

        description: "Team management",

        path: "/manager/dashboard",

        roles: ["MANAGER"],

        icon: Users,

        iconClass: "bg-blue-50 text-blue-600",

        activeClass: "bg-blue-50 text-blue-700",
    },

    {
        id: "HR",

        label: "HR Dashboard",

        description: "Workforce management",

        path: "/hr/dashboard",

        roles: ["HR_SPECIALIST"],

        icon: BriefcaseBusiness,

        iconClass: "bg-emerald-50 text-emerald-600",

        activeClass: "bg-emerald-50 text-emerald-700",
    },

    {
        id: "DEPARTMENT_HEAD",

        label: "Department Dashboard",

        description: "Department management",

        path: "/department-head/dashboard",

        roles: ["DEPARTMENT_HEAD"],

        icon: Building2,

        iconClass: "bg-amber-50 text-amber-600",

        activeClass: "bg-amber-50 text-amber-700",
    },

    {
        id: "LND",

        label: "L&D Dashboard",

        description: "Learning & development",

        path: "/lnd/dashboard",

        roles: ["LND_ADMIN"],

        icon: GraduationCap,

        iconClass: "bg-purple-50 text-purple-600",

        activeClass: "bg-purple-50 text-purple-700",
    },

    {
        id: "ADMIN",

        label: "Admin Dashboard",

        description: "Platform administration",

        path: "/admin/dashboard",

        roles: ["SYS_ADMIN"],

        icon: Shield,

        iconClass: "bg-slate-100 text-slate-700",

        activeClass: "bg-slate-100 text-slate-800",
    },
];