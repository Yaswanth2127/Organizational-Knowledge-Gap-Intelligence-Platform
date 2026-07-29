import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Tag, X } from 'lucide-react';
import {
    getAllSkillCategories,
    createSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
} from '../../services/skillCategoryService';

export default function SkillCategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [nameInput, setNameInput] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchCategories = () => {
    setLoading(true);

    getAllSkillCategories()
        .then((categories) => setCategories(categories))
        .catch((err) =>
            setError(
                err.response?.data?.message || "Failed to load skill categories."
            )
        )
        .finally(() => setLoading(false));
};

    useEffect(() => {
        fetchCategories();
    }, []);

    const openAddModal = () => {
        setEditingId(null);
        setNameInput('');
        setShowModal(true);
    };

    const openEditModal = (cat) => {
        setEditingId(cat.id);
        setNameInput(cat.name);
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!nameInput.trim()) return;
        setSaving(true);
        try {
            if (editingId) {
                await updateSkillCategory(editingId, nameInput);
            } else {
                await createSkillCategory(nameInput);
            }
            setShowModal(false);
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Save failed.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this skill category?')) return;
        try {
            await deleteSkillCategory(id);
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Delete failed.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Skill Categories</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage skill category taxonomy</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-sm"
                >
                    <Plus size={16} /> Add Category
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : categories.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                    No skill categories yet. Add one to get started.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-50 rounded-xl">
                                    <Tag className="text-indigo-600" size={18} />
                                </div>
                                <span className="font-semibold text-gray-800">{cat.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => openEditModal(cat)}
                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingId ? 'Edit Category' : 'Add Category'}
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
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    placeholder="e.g. Technical, Soft Skills"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                    autoFocus
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