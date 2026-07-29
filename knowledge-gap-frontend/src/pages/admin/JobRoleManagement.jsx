import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Briefcase, X } from 'lucide-react';
import {
    getAllJobRoles,
    createJobRole,
    updateJobRole,
    deleteJobRole,
} from '../../services/jobRoleService';
import { getDepartments } from '../../services/departmentService';

export default function JobRoleManagement() {
    const [jobRoles, setJobRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: '', departmentId: '', description: '' });
    const [saving, setSaving] = useState(false);

    const fetchAll = () => {
        setLoading(true);
        setError('');
        Promise.all([getAllJobRoles(), getDepartments()])
            .then(([roles, depts]) => {
                setJobRoles(roles);
                setDepartments(depts);
            })
            .catch((err) =>
                setError(err.response?.data?.message || 'Failed to load job roles.')
            )
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const departmentName = (id) =>
        departments.find((d) => d.id === id)?.name || '—';

    const openAddModal = () => {
        setEditingId(null);
        setForm({ title: '', departmentId: '', description: '' });
        setShowModal(true);
    };

    const openEditModal = (role) => {
        setEditingId(role.id);
        setForm({
            title: role.title,
            departmentId: role.departmentId || '',
            description: role.description || '',
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        setSaving(true);
        try {
            const payload = {
                title: form.title,
                departmentId: form.departmentId ? Number(form.departmentId) : null,
                description: form.description,
            };
            if (editingId) {
                await updateJobRole(editingId, payload);
            } else {
                await createJobRole(payload);
            }
            setShowModal(false);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || 'Save failed.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this job role?')) return;
        try {
            await deleteJobRole(id);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || 'Delete failed.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Job Roles</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage organizational job roles</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-sm"
                >
                    <Plus size={16} /> Add Job Role
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : jobRoles.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                    No job roles yet. Add one to get started.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Title</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Department</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Description</th>
                                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobRoles.map((role) => (
                                <tr key={role.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 bg-indigo-50 rounded-lg">
                                                <Briefcase className="text-indigo-600" size={15} />
                                            </div>
                                            <span className="font-semibold text-gray-800">{role.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">{departmentName(role.departmentId)}</td>
                                    <td className="px-5 py-3 text-gray-500 max-w-xs truncate">{role.description || '—'}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openEditModal(role)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(role.id)}
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
                                {editingId ? 'Edit Job Role' : 'Add Job Role'}
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
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Backend Developer"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                    autoFocus
                                />
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
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Brief description of the role"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition text-sm disabled:opacity-60"
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}