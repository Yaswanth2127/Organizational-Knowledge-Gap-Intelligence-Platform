import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteDepartmentModal({
    open,
    onClose,
    onConfirm,
    department
}) {

    if (!open || !department) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* ===========================
                        Header
                =========================== */}

                <div className="bg-red-600 text-white p-6">

                    <div className="flex justify-between items-center">

                        <div className="flex items-center gap-3">

                            <AlertTriangle size={32} />

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Delete Department

                                </h2>

                                <p className="text-red-100 mt-1">

                                    This action cannot be undone.

                                </p>

                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-red-700 transition"
                        >
                            <X size={22} />
                        </button>

                    </div>

                </div>

                {/* ===========================
                        Body
                =========================== */}

                <div className="p-8">

                    <div className="flex items-start gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

                            <Trash2
                                size={28}
                                className="text-red-600"
                            />

                        </div>

                        <div>

                            <h3 className="text-lg font-semibold text-gray-800">

                                Are you sure?

                            </h3>

                            <p className="text-gray-600 mt-2 leading-relaxed">

                                You are about to delete the department

                                <span className="font-semibold text-gray-900">

                                    {" "} "{department.name}"{" "}

                                </span>

                                from the organization.

                            </p>

                            {
                                department.parentDepartmentName && (

                                    <p className="mt-4 text-sm text-gray-500">

                                        Parent Department:

                                        <span className="font-medium text-gray-700">

                                            {" "}
                                            {department.parentDepartmentName}

                                        </span>

                                    </p>

                                )
                            }

                            <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4">

                                <p className="text-sm text-yellow-800">

                                    <strong>Warning:</strong> Deleting this
                                    department may affect employees,
                                    job roles, and competency mappings
                                    associated with it.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ===========================
                        Footer
                =========================== */}

                <div className="border-t px-8 py-5 flex justify-end gap-4">

                    <button

                        onClick={onClose}

                        className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onConfirm}

                        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition"

                    >

                        <Trash2 size={18} />

                        Delete Department

                    </button>

                </div>

            </div>

        </div>

    );

}