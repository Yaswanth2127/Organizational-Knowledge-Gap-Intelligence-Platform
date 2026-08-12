import React from "react";
import { X, User, Tag, ExternalLink, CalendarDays } from "lucide-react";

const ArticleDetailsModal = ({
    open,
    article,
    onClose,
}) => {
    if (!open || !article) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between border-b px-6 py-5">

                    <div className="pr-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {article.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">

                            {/* Author */}
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>
                                    {article.authorName || "Unknown Author"}
                                </span>
                            </div>

                            {/* Skill */}
                            <div className="flex items-center gap-2">
                                <Tag size={16} />
                                <span>
                                    {article.skillName || "No Skill"}
                                </span>
                            </div>

                            {/* Created Date */}
                            {article.createdAt && (
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    <span>
                                        {new Date(
                                            article.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            )}

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Close article"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Content */}
                <div className="px-6 py-6">

                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-7 whitespace-pre-wrap">
                            {article.content}
                        </p>
                    </div>

                    {/* Resource */}
                    {article.resourceUrl && (
                        <div className="mt-8 pt-6 border-t">

                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                Additional Resource
                            </h3>

                            <a
                                href={article.resourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5
                                           rounded-xl bg-indigo-50 text-indigo-700
                                           hover:bg-indigo-100 transition"
                            >
                                <ExternalLink size={17} />
                                Open Resource
                            </a>

                        </div>
                    )}

                    {/* Updated information */}
                    {article.updatedAt &&
                        article.updatedAt !== article.createdAt && (
                            <p className="text-xs text-gray-400 mt-6">
                                Last updated:{" "}
                                {new Date(
                                    article.updatedAt
                                ).toLocaleString()}
                            </p>
                        )}

                </div>

                {/* Footer */}
                <div className="flex justify-end border-t px-6 py-4">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl border border-gray-300
                                   text-gray-700 hover:bg-gray-100"
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ArticleDetailsModal;