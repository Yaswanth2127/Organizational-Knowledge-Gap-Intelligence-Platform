import {
    UserRound,
    Users,
    BriefcaseBusiness,
    Building2,
    GraduationCap,
    Shield,
} from "lucide-react";

export const WORKSPACE_CONFIG = {
    EMPLOYEE: {
        id: "EMPLOYEE",
        label: "Employee Dashboard",
        path: "/employee/dashboard",
        description: "Personal development",
        icon: UserRound,
        iconClass: "bg-indigo-50 text-indigo-600",
    },

    MANAGER: {
        id: "MANAGER",
        label: "Manager Dashboard",
        path: "/manager/dashboard",
        description: "Team management",
        icon: Users,
        iconClass: "bg-blue-50 text-blue-600",
    },

    HR: {
        id: "HR",
        label: "HR Dashboard",
        path: "/hr/dashboard",
        description: "Workforce management",
        icon: BriefcaseBusiness,
        iconClass: "bg-emerald-50 text-emerald-600",
    },

    DEPARTMENT_HEAD: {
        id: "DEPARTMENT_HEAD",
        label: "Department Dashboard",
        path: "/department-head/dashboard",
        description: "Department management",
        icon: Building2,
        iconClass: "bg-amber-50 text-amber-600",
    },

    LND: {
        id: "LND",
        label: "L&D Dashboard",
        path: "/lnd/dashboard",
        description: "Learning & development",
        icon: GraduationCap,
        iconClass: "bg-purple-50 text-purple-600",
    },

    ADMIN: {
        id: "ADMIN",
        label: "Admin Dashboard",
        path: "/admin/dashboard",
        description: "Platform administration",
        icon: Shield,
        iconClass: "bg-slate-100 text-slate-700",
    },
};

export const getWorkspaceFromRole = (role) => {
    switch (role) {
        case "SYS_ADMIN":
            return "ADMIN";

        case "HR_SPECIALIST":
            return "HR";

        case "MANAGER":
            return "MANAGER";

        case "DEPARTMENT_HEAD":
            return "DEPARTMENT_HEAD";

        case "LND_ADMIN":
            return "LND";

        case "EMPLOYEE":
        default:
            return "EMPLOYEE";
    }
};