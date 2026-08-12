import React from "react";
import {
    BookOpen,
    Pencil,
    Trash2,
    ExternalLink,
    Clock3,
    BarChart3,
    ArrowUpRight,
} from "lucide-react";

const SOURCE_LABELS = {
    INTERNAL: "Internal",
    COURSERA: "Coursera",
    UDEMY: "Udemy",
    LINKEDIN_LEARNING: "LinkedIn Learning",
    OTHER: "Other",
};

const SOURCE_STYLES = {
    INTERNAL: "bg-indigo-50 text-indigo-700",
    COURSERA: "bg-blue-50 text-blue-700",
    UDEMY: "bg-purple-50 text-purple-700",
    LINKEDIN_LEARNING: "bg-sky-50 text-sky-700",
    OTHER: "bg-gray-100 text-gray-600",
};

const DIFFICULTY_STYLES = {
    BEGINNER: "text-green-600",
    INTERMEDIATE: "text-amber-600",
    ADVANCED: "text-red-600",
};

export default function CourseCard({
    course,
    skillName,
    onView,
    onEdit,
    onDelete,
}) {
    const sourceLabel =
        SOURCE_LABELS[course.source] ||
        course.source ||
        "Other";

    const sourceStyle =
        SOURCE_STYLES[course.source] ||
        SOURCE_STYLES.OTHER;

    const difficulty =
        course.difficulty || "Not specified";

    const difficultyStyle =
        DIFFICULTY_STYLES[course.difficulty] ||
        "text-gray-500";

    return (
        <div className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-200">

            {/* =================================================
                TOP ACCENT
            ================================================= */}

            <div className="h-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-purple-400" />

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="p-5">

                {/* TOP ROW */}

                <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">

                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition">

                            <BookOpen
                                size={19}
                                className="text-indigo-600"
                            />

                        </div>

                        <div className="min-w-0">

                            <span
                                className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${sourceStyle}`}
                            >
                                {sourceLabel}
                            </span>

                        </div>

                    </div>

                    {/* STATUS */}

                    <span
                        className={`flex-shrink-0 flex items-center gap-1.5 text-[10px] font-bold ${
                            course.isActive
                                ? "text-green-600"
                                : "text-gray-400"
                        }`}
                    >

                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                course.isActive
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                            }`}
                        />

                        {course.isActive
                            ? "Active"
                            : "Inactive"}

                    </span>

                </div>

                {/* TITLE */}

                <button
                    type="button"
                    onClick={() => onView(course)}
                    className="block text-left w-full mt-4"
                >

                    <h3 className="text-[16px] font-bold text-gray-900 leading-6 line-clamp-2 group-hover:text-indigo-600 transition">
                        {course.title}
                    </h3>

                </button>

                {/* DESCRIPTION */}

                <p className="text-[13px] text-gray-500 leading-5 mt-2 line-clamp-2 min-h-[40px]">
                    {course.description ||
                        "No course description available."}
                </p>

                {/* SKILL */}

                <div className="mt-4">

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-700">

                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />

                        {skillName(course.skillId)}

                    </span>

                </div>

                {/* METADATA */}

                <div className="flex items-center gap-4 mt-5">

                    {/* Duration */}

                    <div className="flex items-center gap-1.5 text-gray-500">

                        <Clock3
                            size={14}
                            className="text-gray-400"
                        />

                        <span className="text-xs font-medium">

                            {course.durationHours
                                ? `${course.durationHours} hrs`
                                : "No duration"}

                        </span>

                    </div>

                    {/* Difficulty */}

                    <div className="flex items-center gap-1.5">

                        <BarChart3
                            size={14}
                            className={difficultyStyle}
                        />

                        <span
                            className={`text-xs font-semibold ${difficultyStyle}`}
                        >
                            {difficulty}
                        </span>

                    </div>

                </div>

                {/* PROVIDER */}

                <div className="mt-4 pt-4 border-t border-gray-100">

                    <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                        Provider
                    </p>

                    <p className="text-xs font-semibold text-gray-700 mt-1 truncate">
                        {course.provider ||
                            "Not specified"}
                    </p>

                </div>

            </div>

            {/* =================================================
                ACTION FOOTER
            ================================================= */}

            <div className="px-5 py-3 bg-gray-50/60 border-t border-gray-100 flex items-center justify-between">

                {/* View */}

                <button
                    type="button"
                    onClick={() => onView(course)}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                    View course
                    <ArrowUpRight size={13} />
                </button>

                {/* ACTIONS */}

                <div className="flex items-center gap-1">

                    {course.externalUrl && (
                        <a
                            href={course.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open external course"
                            className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                        >
                            <ExternalLink
                                size={15}
                            />
                        </a>
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            onEdit(course)
                        }
                        title="Edit course"
                        className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                    >
                        <Pencil size={15} />
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete(course)
                        }
                        title="Delete course"
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                    >
                        <Trash2 size={15} />
                    </button>

                </div>

            </div>

        </div>
    );
}