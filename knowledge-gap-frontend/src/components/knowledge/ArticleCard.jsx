import React from "react";
import { Eye, Edit, Trash2, User, Tag } from "lucide-react";

const ArticleCard = ({
    article,
    currentUserId,
    userRole,
    onView,
    onEdit,
    onDelete,
}) => {

    const isAuthor =
        Number(article.authorId) === Number(currentUserId);

    const canEdit = isAuthor;

    const canDelete =
        isAuthor ||
        userRole === "HR_SPECIALIST" ||
        userRole === "SYS_ADMIN";

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5">

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {article.title}
            </h2>

            {/* Author */}
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <User size={16} />
                <span>
                    {article.authorName || "Unknown Author"}
                </span>
            </div>

            {/* Skill */}
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <Tag size={16} />
                <span>
                    {article.skillName || "No Skill"}
                </span>
            </div>

            {/* Content Preview */}
            <p className="text-sm text-gray-600 mt-4 line-clamp-3">
                {article.content}
            </p>

            {/* Date */}
            {article.createdAt && (
                <p className="text-xs text-gray-400 mt-4">
                    {new Date(article.createdAt).toLocaleDateString()}
                </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 mt-5">

                {/* View */}
                <button
                    onClick={() => onView(article)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
                >
                    <Eye size={16} />
                    View
                </button>

                {/* Edit - Author only */}
                {canEdit && (
                    <button
                        onClick={() => onEdit(article)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm"
                    >
                        <Edit size={16} />
                        Edit
                    </button>
                )}

                {/* Delete */}
                {canDelete && (
                    <button
                        onClick={() => onDelete(article)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-sm"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                )}

            </div>

        </div>
    );
};

export default ArticleCard;