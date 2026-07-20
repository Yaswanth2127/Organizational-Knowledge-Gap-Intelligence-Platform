import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, BookOpen, X } from "lucide-react";
import {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../services/courseService";
import { getAllSkills } from "../services/skillService";

const SOURCES = ["INTERNAL", "COURSERA", "UDEMY", "LINKEDIN_LEARNING", "OTHER"];
const DIFFICULTIES = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const emptyForm = {
    title: "",
    description: "",
    skillId: "",
    source: "INTERNAL",
    provider: "",
    externalUrl: "",
    durationHours: "",
    difficulty: "BEGINNER",
    thumbnailUrl: "",
    isActive: true,
};

export default function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchAll = () => {
        setLoading(true);
        setError("");
        Promise.all([getAllCourses(), getAllSkills()])
            .then(([courseList, skillList]) => {
                setCourses(courseList);
                setSkills(skillList);
            })
            .catch((err) =>
                setError(err.response?.data?.message || "Failed to load courses.")
            )
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const skillName = (id) =>
        skills.find((s) => s.id === id)?.name || "-";

    const openAddModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEditModal = (course) => {
        setEditingId(course.id);
        setForm({
            title: course.title || "",
            description: course.description || "",
            skillId: course.skillId || "",
            source: course.source || "INTERNAL",
            provider: course.provider || "",
            externalUrl: course.externalUrl || "",
            durationHours: course.durationHours || "",
            difficulty: course.difficulty || "BEGINNER",
            thumbnailUrl: course.thumbnailUrl || "",
            isActive: course.isActive ?? true,
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.skillId) return;
        setSaving(true);
        try {
            const payload = {
                title: form.title,
                description: form.description,
                skillId: Number(form.skillId),
                source: form.source,
                provider: form.provider,
                externalUrl: form.externalUrl,
                durationHours: form.durationHours ? Number(form.durationHours) : null,
                difficulty: form.difficulty,
                thumbnailUrl: form.thumbnailUrl,
                isActive: form.isActive,
            };
            if (editingId) {
                await updateCourse(editingId, payload);
            } else {
                await createCourse(payload);
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
        if (!window.confirm("Delete this course?")) return;
        try {
            await deleteCourse(id);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage the organization's course catalog</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-sm"
                >
                    <Plus size={16} /> Add Course
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : courses.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                    No courses yet. Add one to get started.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Title</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Skill</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Source</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Difficulty</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 bg-indigo-50 rounded-lg">
                                                <BookOpen className="text-indigo-600" size={15} />
                                            </div>
                                            <span className="font-semibold text-gray-800">{course.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">{skillName(course.skillId)}</td>
                                    <td className="px-5 py-3 text-gray-600">{course.source}</td>
                                    <td className="px-5 py-3 text-gray-600">{course.difficulty || "-"}</td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${course.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                                            {course.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openEditModal(course)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
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
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingId ? "Edit Course" : "Add Course"}
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
                                    placeholder="e.g. Advanced React Patterns"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none"
                                />
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
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                        Source
                                    </label>
                                    <select
                                        name="source"
                                        value={form.source}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                    >
                                        {SOURCES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                        Difficulty
                                    </label>
                                    <select
                                        name="difficulty"
                                        value={form.difficulty}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                    >
                                        {DIFFICULTIES.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Provider
                                </label>
                                <input
                                    type="text"
                                    name="provider"
                                    value={form.provider}
                                    onChange={handleChange}
                                    placeholder="e.g. Internal Training Team"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    External URL
                                </label>
                                <input
                                    type="text"
                                    name="externalUrl"
                                    value={form.externalUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Duration (hours)
                                </label>
                                <input
                                    type="number"
                                    step="0.5"
                                    name="durationHours"
                                    value={form.durationHours}
                                    onChange={handleChange}
                                    placeholder="e.g. 4"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={form.isActive}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
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
