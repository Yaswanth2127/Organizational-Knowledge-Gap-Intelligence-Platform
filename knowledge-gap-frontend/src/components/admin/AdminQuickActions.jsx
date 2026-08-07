import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Building,
    Brain,
    Briefcase,
    Users,
} from "lucide-react";

const AdminQuickActions = () => {

    const navigate = useNavigate();

    const actions = [
        {
            title: "Manage Employee Skills",
            description:
                "Assign and update employee skills and proficiency levels.",
            icon: Users,
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
            hover: "hover:bg-indigo-50 hover:border-indigo-300",
            path: "/employee-skills",
        },
        {
            title: "Manage Departments",
            description:
                "Create and organize departments across the organization.",
            icon: Building,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            hover: "hover:bg-green-50 hover:border-green-300",
            path: "/departments",
        },
        {
            title: "Manage Skills",
            description:
                "Create and maintain technical and soft skills.",
            icon: Brain,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            hover: "hover:bg-purple-50 hover:border-purple-300",
            path: "/skills",
        },
        {
            title: "Manage Job Roles",
            description:
                "Create and maintain organizational job roles.",
            icon: Briefcase,
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            hover: "hover:bg-orange-50 hover:border-orange-300",
            path: "/job-roles",
        },
    ];

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">

                Quick Actions

            </h2>

            <div className="space-y-4">

                {

                    actions.map((action) => {

                        const Icon = action.icon;

                        return (

                            <button

                                key={action.title}

                                onClick={() => navigate(action.path)}

                                className={`
                                    w-full
                                    flex
                                    items-start
                                    gap-4
                                    border
                                    border-gray-200
                                    rounded-xl
                                    p-4
                                    transition
                                    ${action.hover}
                                `}

                            >

                                <div
                                    className={`
                                        ${action.iconBg}
                                        p-3
                                        rounded-xl
                                    `}
                                >

                                    <Icon
                                        size={22}
                                        className={action.iconColor}
                                    />

                                </div>

                                <div className="text-left">

                                    <h3 className="font-semibold text-gray-800">

                                        {action.title}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                        {action.description}

                                    </p>

                                </div>

                            </button>

                        );

                    })

                }

            </div>

        </div>

    );

};

export default AdminQuickActions;