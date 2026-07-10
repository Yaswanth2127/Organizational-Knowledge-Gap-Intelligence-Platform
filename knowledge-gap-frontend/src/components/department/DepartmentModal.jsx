import React, { useEffect, useState } from "react";
import { Building2, Save, X } from "lucide-react";

export default function DepartmentModal({
    open,
    onClose,
    onSubmit,
    department,
    departments
}) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        parentDeptId: ""
    });

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (department) {

            setFormData({

                name: department.name || "",

                description: department.description || "",

                parentDeptId: department.parentDeptId || ""

            });

        } else {

            setFormData({

                name: "",

                description: "",

                parentDeptId: ""

            });

        }

        setErrors({});

    }, [department, open]);

    if (!open) return null;

    /* ==========================================
            Validation
    ========================================== */

    const validate = () => {

        const newErrors = {};

        if (!formData.name.trim()) {

            newErrors.name = "Department name is required.";

        }

        if (!formData.description.trim()) {

            newErrors.description = "Department description is required.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    /* ==========================================
            Input Change
    ========================================== */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };

    /* ==========================================
            Submit
    ========================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {

            return;

        }

        try {

            setSaving(true);

            await onSubmit({

                ...formData,

                parentDeptId:

                    formData.parentDeptId === ""

                        ? null

                        : Number(formData.parentDeptId)

            });

            onClose();

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setSaving(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">

                {/* =======================================
                        Header
                ======================================= */}

                <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 text-white">

                    <div className="flex justify-between items-center">

                        <div className="flex items-center gap-4">

                            <Building2 size={32} />

                            <div>

                                <h2 className="text-2xl font-bold">

                                    {

                                        department

                                            ? "Edit Department"

                                            : "Add Department"

                                    }

                                </h2>

                                <p className="text-indigo-100 mt-1">

                                    Manage your organization's departments.

                                </p>

                            </div>

                        </div>

                        <button

                            onClick={onClose}

                            className="hover:bg-white/20 rounded-xl p-2 transition"

                        >

                            <X size={24} />

                        </button>

                    </div>

                </div>

                {/* =======================================
                        Form
                ======================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-6"
                >

                    {/* Department Name */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Department Name <span className="text-red-500">*</span>

                        </label>

                        <input

                            type="text"

                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"

                            placeholder="Enter department name"

                        />

                        {

                            errors.name && (

                                <p className="text-red-500 text-sm mt-2">

                                    {errors.name}

                                </p>

                            )

                        }

                    </div>

                    {/* Description */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Description <span className="text-red-500">*</span>

                        </label>

                        <textarea

                            rows={4}

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"

                            placeholder="Enter department description"

                        />

                        {

                            errors.description && (

                                <p className="text-red-500 text-sm mt-2">

                                    {errors.description}

                                </p>

                            )

                        }

                    </div>

                    {/* Parent Department */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Parent Department

                        </label>

                        <select

                            name="parentDeptId"

                            value={formData.parentDeptId}

                            onChange={handleChange}

                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"

                        >

                            <option value="">

                                None (Root Department)

                            </option>

                            {

                                departments

                                    .filter(d => d.id !== department?.id)

                                    .map(dept => (

                                        <option

                                            key={dept.id}

                                            value={dept.id}

                                        >

                                            {dept.name}

                                        </option>

                                    ))

                            }

                        </select>

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-4 pt-4 border-t">

                        <button

                            type="button"

                            onClick={onClose}

                            className="px-6 py-3 rounded-xl border hover:bg-gray-100 transition"

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={saving}

                            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition"

                        >

                            <Save size={18} />

                            {

                                saving

                                    ? "Saving..."

                                    : department

                                        ? "Update Department"

                                        : "Create Department"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}