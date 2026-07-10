import React from "react";
import {
    Building2,
    GitBranch,
    FolderTree,
    BarChart3
} from "lucide-react";

export default function DepartmentStats({ departments }) {

    const totalDepartments = departments.length;

    const parentDepartments = departments.filter(
        department =>
            department.parentDeptId === null ||
            department.parentDeptId === undefined
    ).length;

    const childDepartments = totalDepartments - parentDepartments;

    const organizationDepth =
        childDepartments > 0 ? 2 : 1;

    const stats = [

        {
            title: "Total Departments",
            value: totalDepartments,
            icon: Building2,
            bg: "bg-indigo-100",
            color: "text-indigo-600"
        },

        {
            title: "Parent Departments",
            value: parentDepartments,
            icon: FolderTree,
            bg: "bg-green-100",
            color: "text-green-600"
        },

        {
            title: "Sub Departments",
            value: childDepartments,
            icon: GitBranch,
            bg: "bg-orange-100",
            color: "text-orange-600"
        },

        {
            title: "Organization Levels",
            value: organizationDepth,
            icon: BarChart3,
            bg: "bg-purple-100",
            color: "text-purple-600"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {

                stats.map((stat, index) => {

                    const Icon = stat.icon;

                    return (

                        <div

                            key={index}

                            className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition"

                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        {stat.title}

                                    </p>

                                    <h2 className="text-4xl font-bold mt-3 text-gray-800">

                                        {stat.value}

                                    </h2>

                                </div>

                                <div

                                    className={`

                                        w-16

                                        h-16

                                        rounded-2xl

                                        flex

                                        items-center

                                        justify-center

                                        ${stat.bg}

                                    `}

                                >

                                    <Icon

                                        size={30}

                                        className={stat.color}

                                    />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}