import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ClipboardList, X } from "lucide-react";
import {
    getAllCompetencyFrameworks,
    createCompetencyFramework,
    updateCompetencyFramework,
    deleteCompetencyFramework,
} from "../services/competencyFrameworkService";
import { getAllJobRoles } from "../services/jobRoleService";
import { getDepartments } from "../services/departmentService";

export default function CompetencyFrameworkManagement() {
    const [frameworks, setFrameworks] = useState([]);
    const [jobRoles, setJobRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ jobRoleId: "", departmentId: "" });
    const [saving, setSaving] = useState(false);

    const fetchAll = () => {
        setLoading(true);
        setError("");
        Promise.all([getAllCompetencyFrameworks(), getAllJobRoles(), getDepartments()])
            .then(([fw, roles, depts]) => {
                setFrameworks(fw);
                setJobRoles(roles);
                setDepartments(depts);
            })
            .catch((err) =>
                setError(err.response?.data?.message || "Failed to load competency frameworks.")
            )
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const jobRoleTitle = (id) =>
        jobRoles.find((r) => r.id === id)?.title || "-";

    const departmentName = (id) =>
        departments.find((d) => d.id === id)?.name || "-";

    const openAddModal = () => {
        setEditingId(null);
        setForm({ jobRoleId: "", departmentId: "" });
        setShowModal(true);
    };

    const openEditModal = (fw) => {
        setEditingId(fw.id);
        setForm({
            jobRoleId: fw.jobRoleId || "",
            departmentId: fw.departmentId || "",
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.jobRoleId || !form.departmentId) return;
        setSaving(true);
        try {
            const createdById = Number(localStorage.getItem("userId"));
            const payload = {
                jobRoleId: Number(form.jobRoleId),
                departmentId: Number(form.departmentId),
                createdById,
            };
            if (editingId) {
                await updateCompetencyFramework(editingId, payload);
            } else {
                await createCompetencyFramework(payload);
            }
            setShowModal(false);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || "Save failed.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this competency framework?")) return;
        try {
            await deleteCompetencyFramework(id);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Competency Frameworks</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage skill requirements linked to job roles and departments
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-sm"
                >
                    <Plus size={16} /> Add Framework
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : frameworks.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                    No competency frameworks yet. Add one to get started.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Job Role</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Department</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Version</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {frameworks.map((fw) => (
                                <tr key={fw.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 bg-indigo-50 rounded-lg">
                                                <ClipboardList className="text-indigo-600" size={15} />
                                            </div>
                                            <span className="font-semibold text-gray-800">{jobRoleTitle(fw.jobRoleId)}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">{departmentName(fw.departmentId)}</td>
                                    <td className="px-5 py-3 text-gray-600">v{fw.version ?? 1}</td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${fw.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                                            {fw.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openEditModal(fw)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(fw.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingId ? "Edit Competency Framework" : "Add Competency Framework"}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Job Role
                                </label>
                                <select
                                    name="jobRoleId"
                                    value={form.jobRoleId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                >
                                    <option value="">Select job role</option>
                                    {jobRoles.map((r) => (
                                        <option key={r.id} value={r.id}>{r.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Department
                                </label>
                                <select
                                    name="departmentId"
                                    value={form.departmentId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                >
                                    <option value="">Select department</option>
                                    {departments.map((d) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition text-sm disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
