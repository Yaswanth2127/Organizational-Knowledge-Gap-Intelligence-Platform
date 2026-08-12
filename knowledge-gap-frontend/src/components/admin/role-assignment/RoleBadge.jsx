import React from "react";

const ROLE_CONFIG = {
    SYS_ADMIN: {
        label: "System Admin",
        icon: "🛡",
        className:
            "bg-slate-900 text-white border-slate-700 shadow-sm",
    },

    LND_ADMIN: {
        label: "L&D Admin",
        icon: "🎓",
        className:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
    },

    DEPARTMENT_HEAD: {
        label: "Department Head",
        icon: "◆",
        className:
            "bg-amber-50 text-amber-700 border-amber-200",
    },

    HR_SPECIALIST: {
        label: "HR Specialist",
        icon: "♟",
        className:
            "bg-purple-50 text-purple-700 border-purple-200",
    },

    MANAGER: {
    label: "Manager",
    icon: "👥",
    className:
        "bg-blue-50 text-blue-700 border-blue-200",
},

    EMPLOYEE: {
        label: "Employee",
        icon: "●",
        className:
            "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
};

export default function RoleBadge({ role }) {

    const config = ROLE_CONFIG[role] || {
        label: role,
        icon: "●",
        className:
            "bg-gray-50 text-gray-600 border-gray-200",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                gap-1.5
                px-2.5
                py-1
                rounded-lg
                border
                text-xs
                font-semibold
                whitespace-nowrap
                ${config.className}
            `}
        >
            <span className="text-[10px]">
                {config.icon}
            </span>

            {config.label}
        </span>
    );
}