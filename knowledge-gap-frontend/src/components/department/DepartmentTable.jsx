import React from "react";
import {
    Edit,
    Trash2,
    Building2,
    GitBranch,
    Inbox
} from "lucide-react";

export default function DepartmentTable({

    departments,

    onEdit,

    onDelete

}) {

    if (!departments.length) {

        return (

            <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-16 text-center">

                <Inbox

                    size={60}

                    className="mx-auto text-gray-300"

                />

                <h2 className="text-2xl font-bold text-gray-700 mt-6">

                    No Departments Found

                </h2>

                <p className="text-gray-500 mt-3">

                    No departments match your search.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">

            {/* ===========================
                    Header
            =========================== */}

            <div className="px-8 py-6 border-b flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Departments

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Manage your organizational departments.

                    </p>

                </div>

                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">

                    {departments.length} Records

                </span>

            </div>

            {/* ===========================
                    Table
            =========================== */}

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">

                                Department

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">

                                Description

                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">

                                Parent Department

                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            departments.map((department) => (

                                <tr

                                    key={department.id}

                                    className="border-t hover:bg-gray-50 transition"

                                >

                                    {/* Department */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-4">

                                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

                                                <Building2

                                                    size={22}

                                                    className="text-indigo-600"

                                                />

                                            </div>

                                            <div>

                                                <h3 className="font-semibold text-gray-800">

                                                    {department.name}

                                                </h3>

                                                <p className="text-sm text-gray-500">

                                                    ID : {department.id}

                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Description */}

                                    <td className="px-6 py-5">

                                        <p className="text-gray-600">

                                            {

                                                department.description ||

                                                "No description"

                                            }

                                        </p>

                                    </td>

                                    {/* Parent */}

                                    <td className="px-6 py-5">

                                        {

                                            department.parentDeptId

                                                ?

                                                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-full">

                                                    <GitBranch size={16}/>

                                                    ID : {department.parentDeptId}

                                                </span>

                                                :

                                                <span className="bg-gray-100 text-gray-600 px-3 py-2 rounded-full">

                                                    Root Department

                                                </span>

                                        }

                                    </td>

                                    {/* Actions */}

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center gap-3">

                                            <button

                                                onClick={() => onEdit(department)}

                                                className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-xl transition"

                                            >

                                                <Edit size={18}/>

                                            </button>

                                            <button

                                                onClick={() => onDelete(department)}

                                                className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-xl transition"

                                            >

                                                <Trash2 size={18}/>

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}