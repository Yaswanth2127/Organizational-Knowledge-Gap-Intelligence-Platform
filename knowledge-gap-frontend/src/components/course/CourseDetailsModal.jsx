import React from "react";
import {
    BookOpen,
    CalendarDays,
    Clock3,
    ExternalLink,
    Tag,
    X,
} from "lucide-react";

const SOURCE_LABELS = {
    INTERNAL: "Internal",
    COURSERA: "Coursera",
    UDEMY: "Udemy",
    LINKEDIN_LEARNING: "LinkedIn Learning",
    OTHER: "Other",
};

export default function CourseDetailsModal({
    course,
    skillName,
    onClose,
}) {
    if (!course) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">

                            <BookOpen
                                size={20}
                                className="text-indigo-600"
                            />

                        </div>

                        <div>

                            <h2 className="font-bold text-gray-900">
                                Course Details
                            </h2>

                            <p className="text-xs text-gray-400 mt-0.5">
                                Course information
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* Body */}

                <div className="p-6">

                    {/* Title */}

                    <div className="p-5 bg-indigo-50/60 border border-indigo-100 rounded-2xl">

                        <p className="text-xs uppercase tracking-wider font-semibold text-indigo-500">
                            Course
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-2">
                            {course.title}
                        </h3>

                        {course.provider && (
                            <p className="text-sm text-gray-500 mt-2">
                                Provided by{" "}
                                <span className="font-semibold text-gray-700">
                                    {course.provider}
                                </span>
                            </p>
                        )}

                    </div>

                    {/* Description */}

                    {course.description && (
                        <div className="mt-5">

                            <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                                Description
                            </p>

                            <p className="text-sm text-gray-600 mt-2 leading-6">
                                {course.description}
                            </p>

                        </div>
                    )}

                    {/* Details */}

                    <div className="grid grid-cols-2 gap-3 mt-5">

                        <div className="p-4 bg-gray-50 rounded-xl">

                            <div className="flex items-center gap-2 text-gray-400">
                                <Tag size={14} />
                                <span className="text-xs">
                                    Skill
                                </span>
                            </div>

                            <p className="text-sm font-semibold text-gray-800 mt-2">
                                {skillName(course.skillId)}
                            </p>

                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">

                            <div className="flex items-center gap-2 text-gray-400">
                                <BookOpen size={14} />
                                <span className="text-xs">
                                    Source
                                </span>
                            </div>

                            <p className="text-sm font-semibold text-gray-800 mt-2">
                                {SOURCE_LABELS[
                                    course.source
                                ] || course.source || "-"}
                            </p>

                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">

                            <div className="flex items-center gap-2 text-gray-400">
                                <Clock3 size={14} />
                                <span className="text-xs">
                                    Duration
                                </span>
                            </div>

                            <p className="text-sm font-semibold text-gray-800 mt-2">
                                {course.durationHours
                                    ? `${course.durationHours} hours`
                                    : "Not specified"}
                            </p>

                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">

                            <div className="flex items-center gap-2 text-gray-400">
                                <CalendarDays size={14} />
                                <span className="text-xs">
                                    Difficulty
                                </span>
                            </div>

                            <p className="text-sm font-semibold text-gray-800 mt-2">
                                {course.difficulty || "-"}
                            </p>

                        </div>

                    </div>

                    {/* Status */}

                    <div className="flex items-center justify-between mt-5 p-4 bg-gray-50 rounded-xl">

                        <span className="text-sm text-gray-500">
                            Course Status
                        </span>

                        <span
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                                course.isActive
                                    ? "bg-green-50 text-green-600"
                                    : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            {course.isActive
                                ? "Active"
                                : "Inactive"}
                        </span>

                    </div>

                    {/* External link */}

                    {course.externalUrl && (
                        <a
                            href={course.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
                        >
                            <ExternalLink size={16} />
                            Open Course
                        </a>
                    )}

                </div>

            </div>

        </div>
    );
}