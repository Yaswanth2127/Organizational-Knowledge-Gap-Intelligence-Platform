import React from "react";
import {
    BookOpen,
    X,
    Link as LinkIcon,
    Clock3,
} from "lucide-react";

import SkillSearchSelect from "../knowledge/SkillSearchSelect";

const SOURCES = [
    "INTERNAL",
    "COURSERA",
    "UDEMY",
    "LINKEDIN_LEARNING",
    "OTHER",
];

const DIFFICULTIES = [
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
];

export default function CourseFormModal({
    open,
    editingId,
    form,
    skills,
    saving,
    onChange,
    onSkillChange,
    onSubmit,
    onClose,
}) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <BookOpen
                                size={20}
                                className="text-indigo-600"
                            />
                        </div>

                        <div>

                            <h2 className="text-lg font-bold text-gray-900">
                                {editingId
                                    ? "Edit Course"
                                    : "Add Course"}
                            </h2>

                            <p className="text-xs text-gray-400 mt-0.5">
                                {editingId
                                    ? "Update the course information."
                                    : "Add a course to the learning catalog."}
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Form */}

                <form
                    onSubmit={onSubmit}
                    className="p-6 space-y-5 max-h-[calc(90vh-90px)] overflow-y-auto"
                >

                    {/* Title */}

                    <div>

                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                            Course Title *
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={onChange}
                            placeholder="e.g. Advanced React Patterns"
                            required
                            autoFocus
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
                        />

                    </div>

                    {/* Description */}

                    <div>

                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={onChange}
                            rows={3}
                            placeholder="Briefly describe what employees will learn..."
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none transition"
                        />

                    </div>

                    {/* Skill */}

                    <div>

                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                            Skill *
                        </label>

                        <SkillSearchSelect
                            skills={skills}
                            value={form.skillId}
                            onChange={onSkillChange}
                            placeholder="Search and select a skill..."
                        />

                    </div>

                    {/* Source + Difficulty */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                                Source
                            </label>

                            <select
                                name="source"
                                value={form.source}
                                onChange={onChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                            >

                                {SOURCES.map(
                                    (source) => (
                                        <option
                                            key={source}
                                            value={source}
                                        >
                                            {source
                                                .replace(
                                                    "_",
                                                    " "
                                                )
                                                .replace(
                                                    "_",
                                                    " "
                                                )}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                                Difficulty
                            </label>

                            <select
                                name="difficulty"
                                value={form.difficulty}
                                onChange={onChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                            >

                                {DIFFICULTIES.map(
                                    (difficulty) => (
                                        <option
                                            key={
                                                difficulty
                                            }
                                            value={
                                                difficulty
                                            }
                                        >
                                            {difficulty}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                    </div>

                    {/* Provider */}

                    <div>

                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                            Provider
                        </label>

                        <input
                            type="text"
                            name="provider"
                            value={form.provider}
                            onChange={onChange}
                            placeholder="e.g. Internal Training Team"
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                        />

                    </div>

                    {/* External URL + Duration */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                                External URL
                            </label>

                            <div className="relative">

                                <LinkIcon
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="url"
                                    name="externalUrl"
                                    value={
                                        form.externalUrl
                                    }
                                    onChange={
                                        onChange
                                    }
                                    placeholder="https://..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                                Duration (hours)
                            </label>

                            <div className="relative">

                                <Clock3
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    name="durationHours"
                                    value={
                                        form.durationHours
                                    }
                                    onChange={
                                        onChange
                                    }
                                    placeholder="e.g. 4"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Thumbnail */}

                    <div>

                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                            Thumbnail URL
                        </label>

                        <input
                            type="url"
                            name="thumbnailUrl"
                            value={form.thumbnailUrl}
                            onChange={onChange}
                            placeholder="https://..."
                            className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                        />

                    </div>

                    {/* Active */}

                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">

                        <input
                            type="checkbox"
                            name="isActive"
                            checked={form.isActive}
                            onChange={onChange}
                            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />

                        <div>

                            <p className="text-sm font-semibold text-gray-700">
                                Active Course
                            </p>

                            <p className="text-xs text-gray-400">
                                Make this course available for recommendations.
                            </p>

                        </div>

                    </label>

                    {/* Actions */}

                    <div className="flex gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-semibold transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition disabled:opacity-60"
                        >
                            {saving
                                ? "Saving..."
                                : editingId
                                ? "Update Course"
                                : "Add Course"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}