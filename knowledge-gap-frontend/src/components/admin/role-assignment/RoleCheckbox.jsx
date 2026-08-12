import React from "react";
import {
    Shield,
    UserRound,
    Users,
    BriefcaseBusiness,
    GraduationCap,
    Building2,
} from "lucide-react";

const ROLE_CONFIG = {
    EMPLOYEE: {
        label: "Employee",
        description: "Access personal profile, skills, learning and assessments.",
        icon: UserRound,
    },

    MANAGER: {
        label: "Manager",
        description: "Access team management and team skill information.",
        icon: Users,
    },

    HR_SPECIALIST: {
        label: "HR Specialist",
        description: "Access workforce, employee and HR management features.",
        icon: BriefcaseBusiness,
    },

    DEPARTMENT_HEAD: {
        label: "Department Head",
        description: "Access department-level workforce and competency information.",
        icon: Building2,
    },

    LND_ADMIN: {
        label: "L&D Admin",
        description: "Manage learning, training and development activities.",
        icon: GraduationCap,
    },

    SYS_ADMIN: {
        label: "System Administrator",
        description: "Full system administration and role management access.",
        icon: Shield,
    },
};

export default function RoleCheckbox({
    role,
    checked,
    onChange,
}) {

    const config = ROLE_CONFIG[role.name] || {
        label: role.name,
        description: "Platform access role.",
        icon: Shield,
    };

    const Icon = config.icon;

    const isSystemAdmin = role.name === "SYS_ADMIN";

    return (
        <label
            className={`
                group flex items-start gap-4 p-4 rounded-xl border cursor-pointer
                transition-all duration-200
                ${
                    checked
                        ? "border-indigo-200 bg-indigo-50/60"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }
            `}
        >

            {/* Checkbox */}
            <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(role.id)}
                className="sr-only"
            />

            <div
                className={`
                    mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center
                    transition
                    ${
                        checked
                            ? "bg-indigo-600 border-indigo-600"
                            : "border-gray-300 bg-white"
                    }
                `}
            >
                {checked && (
                    <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="w-3.5 h-3.5 text-white"
                    >
                        <path
                            d="M4 10.5L8 14L16 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>

            {/* Icon */}
            <div
                className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    flex-shrink-0
                    ${
                        checked
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-gray-100 text-gray-500"
                    }
                `}
            >
                <Icon size={18} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2">

                    <h4 className="text-sm font-semibold text-gray-900">
                        {config.label}
                    </h4>

                    {isSystemAdmin && (
                        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            Sensitive
                        </span>
                    )}

                </div>

                <p className="text-xs text-gray-500 mt-1 leading-5">
                    {config.description}
                </p>

            </div>

        </label>
    );
}