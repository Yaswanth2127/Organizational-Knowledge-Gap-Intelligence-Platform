import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ListChecks, X } from 'lucide-react';
import {
    getAllFrameworkRequiredSkills,
    createFrameworkRequiredSkill,
    updateFrameworkRequiredSkill,
    deleteFrameworkRequiredSkill,
} from '../../services/frameworkRequiredSkillService';
import { getAllCompetencyFrameworks } from '../../services/competencyFrameworkService';
import { getAllSkills } from '../../services/skillService';
import { getAllJobRoles } from '../../services/jobRoleService';
import { getDepartments } from '../../services/departmentService';

const PROFICIENCY_LEVELS = ['UNAWARE', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

export default function FrameworkRequiredSkillManagement() {
    const [items, setItems] = useState([]);
    const [frameworks, setFrameworks] = useState([]);
    const [skills, setSkills] = useState([]);
    const [jobRoles, setJobRoles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        frameworkId: '',
        skillId: '',
        requiredProficiency: 'BEGINNER',
        weight: '1.00',
    });
    const [saving, setSaving] = useState(false);

    const fetchAll = () => {
        setLoading(true);
        setError('');
        Promise.all([
            getAllFrameworkRequiredSkills(),
            getAllCompetencyFrameworks(),
            getAllSkills(),
            getAllJobRoles(),
            getDepartments(),
        ])
            .then(([reqSkills, fws, sks, roles, depts]) => {
                setItems(reqSkills);
                setFrameworks(fws);
                setSkills(sks);
                setJobRoles(roles);
                setDepartments(depts);
            })
            .catch((err) =>
                setError(err.response?.data?.message || 'Failed to load framework required skills.')
            )
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const frameworkLabel = (fw) => {
        if (!fw) return 'Unknown';
        const roleTitle = jobRoles.find((r) => r.id === fw.jobRoleId)?.title || 'Unknown';
        const deptName = departments.find((d) => d.id === fw.departmentId)?.name || 'Unknown';
        return `${roleTitle} — ${deptName} (v${fw.version ?? 1})`;
    };

    const frameworkName = (id) => {
        const fw = frameworks.find((f) => f.id === id);
        return fw ? frameworkLabel(fw) : '—';
    };

    const skillName = (id) =>
        skills.find((s) => s.id === id)?.name || '—';

    const openAddModal = () => {
        setEditingId(null);
        setForm({ frameworkId: '', skillId: '', requiredProficiency: 'BEGINNER', weight: '1.00' });
        setShowModal(true);
    };

    const openEditModal = (item) => {
        setEditingId(item.id);
        setForm({
            frameworkId: item.frameworkId || '',
            skillId: item.skillId || '',
            requiredProficiency: item.requiredProficiency || 'BEGINNER',
            weight: item.weight != null ? String(item.weight) : '1.00',
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.frameworkId || !form.skillId) return;
        setSaving(true);
        try {
            const payload = {
                frameworkId: Number(form.frameworkId),
                skillId: Number(form.skillId),
                requiredProficiency: form.requiredProficiency,
                weight: Number(form.weight),
            };
            if (editingId) {
                await updateFrameworkRequiredSkill(editingId, payload);
            } else {
                await createFrameworkRequiredSkill(payload);
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
        if (!window.confirm('Delete this required skill mapping?')) return;
        try {
            await deleteFrameworkRequiredSkill(id);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || 'Delete failed.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Framework Required Skills</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Map skills and proficiency levels required by each competency framework
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-sm"
                >
                    <Plus size={16} /> Add Required Skill
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : items.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                    No required skills yet. Add one to get started.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Framework</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Skill</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Required Proficiency</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Weight</th>
                                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 bg-indigo-50 rounded-lg">
                                                <ListChecks className="text-indigo-600" size={15} />
                                            </div>
                                            <span className="font-semibold text-gray-800">{frameworkName(item.frameworkId)}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">{skillName(item.skillId)}</td>
                                    <td className="px-5 py-3 text-gray-600">{item.requiredProficiency}</td>
                                    <td className="px-5 py-3 text-gray-600">{item.weight}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
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
                                {editingId ? 'Edit Required Skill' : 'Add Required Skill'}
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
                                    Framework
                                </label>
                                <select
                                    name="frameworkId"
                                    value={form.frameworkId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                >
                                    <option value="">Select framework</option>
                                    {frameworks.map((f) => (
                                        <option key={f.id} value={f.id}>{frameworkLabel(f)}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Skill
                                </label>
                                <select
                                    name="skillId"
                                    value={form.skillId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                >
                                    <option value="">Select skill</option>
                                    {skills.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Required Proficiency
                                </label>
                                <select
                                    name="requiredProficiency"
                                    value={form.requiredProficiency}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                >
                                    {PROFICIENCY_LEVELS.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Weight
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="weight"
                                    value={form.weight}
                                    onChange={handleChange}
                                    placeholder="e.g. 1.00"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
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