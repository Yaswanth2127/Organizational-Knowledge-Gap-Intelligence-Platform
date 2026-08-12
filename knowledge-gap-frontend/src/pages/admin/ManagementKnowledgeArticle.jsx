import React, { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    Eye,
    FileText,
    Loader2,
    Search,
    Trash2,
    X,
} from "lucide-react";

import knowledgeArticleApi from "../../services/knowledgeArticleApi";

const ManagementKnowledgeArticle = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [selectedArticle, setSelectedArticle] = useState(null);

    const [viewOpen, setViewOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [deleteReason, setDeleteReason] = useState("");

    // =====================================================
    // LOAD ARTICLES
    // =====================================================

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await knowledgeArticleApi.getAllArticles();

            setArticles(response.data || []);

        } catch (err) {
            console.error(
                "Failed to load articles:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load knowledge articles."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadArticles();
    }, []);

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredArticles = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) {
            return articles;
        }

        return articles.filter((article) =>
            article.title
                ?.toLowerCase()
                .includes(keyword) ||
            article.authorName
                ?.toLowerCase()
                .includes(keyword) ||
            article.skillName
                ?.toLowerCase()
                .includes(keyword)
        );
    }, [articles, search]);

    // =====================================================
    // VIEW
    // =====================================================

    const handleView = (article) => {
        setSelectedArticle(article);
        setViewOpen(true);
    };

    const closeView = () => {
        setSelectedArticle(null);
        setViewOpen(false);
    };

    // =====================================================
    // DELETE MODAL
    // =====================================================

    const openDeleteModal = (article) => {
        setSelectedArticle(article);
        setDeleteReason("");
        setDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        if (deleting) {
            return;
        }

        setSelectedArticle(null);
        setDeleteReason("");
        setDeleteOpen(false);
    };

    // =====================================================
    // DELETE BY HR / ADMIN
    // =====================================================

    const handleDelete = async () => {

        if (!selectedArticle) {
            return;
        }

        if (!deleteReason.trim()) {
            setError(
                "Deletion reason is required."
            );
            return;
        }

        try {
            setDeleting(true);
            setError("");

            await knowledgeArticleApi.deleteArticleByAdmin(
                selectedArticle.id,
                 deleteReason.trim()
            );

            setArticles((previous) =>
                previous.filter(
                    (article) =>
                        article.id !== selectedArticle.id
                )
            );

            closeDeleteModal();

        } catch (err) {
            console.error(
                "Failed to delete article:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to delete article."
            );
        } finally {
            setDeleting(false);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="flex justify-center py-32">
                <Loader2
                    size={42}
                    className="animate-spin text-indigo-600"
                />
            </div>
        );
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div>
                <div className="flex items-center gap-3">

                    <div className="p-3 bg-indigo-100 rounded-xl">
                        <FileText
                            size={25}
                            className="text-indigo-600"
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Knowledge Article Management
                    </h1>

                </div>

                <p className="text-gray-500 mt-2">
                    Review organizational knowledge articles and
                    manage inappropriate or outdated content.
                </p>
            </div>

            {/* ERROR */}
            {error && (
                <div className="flex items-start gap-3
                                bg-red-50 border border-red-200
                                text-red-700 p-4 rounded-xl">

                    <AlertTriangle
                        size={20}
                        className="mt-0.5"
                    />

                    <p>{error}</p>
                </div>
            )}

            {/* SEARCH */}
            <div className="bg-white border border-gray-200
                            rounded-xl p-4">

                <div className="relative">

                    <Search
                        size={19}
                        className="absolute left-3 top-1/2
                                   -translate-y-1/2
                                   text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search by title, author or skill..."
                        className="w-full pl-10 pr-4 py-3
                                   border border-gray-300
                                   rounded-lg
                                   focus:outline-none
                                   focus:ring-2
                                   focus:ring-indigo-500"
                    />

                </div>

            </div>

            {/* COUNT */}
            <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold text-gray-800">
                    Articles ({filteredArticles.length})
                </h2>

            </div>

            {/* ARTICLES */}
            {filteredArticles.length === 0 ? (

                <div className="bg-white border border-gray-200
                                rounded-xl p-12 text-center">

                    <FileText
                        size={45}
                        className="mx-auto text-gray-300"
                    />

                    <h3 className="text-lg font-semibold
                                   text-gray-700 mt-4">
                        No articles found
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Try changing your search.
                    </p>

                </div>

            ) : (

                <div className="bg-white border border-gray-200
                                rounded-xl overflow-hidden">

                    <div className="divide-y">

                        {filteredArticles.map((article) => (

                            <div
                                key={article.id}
                                className="p-6 hover:bg-gray-50"
                            >

                                <div className="flex flex-col
                                                lg:flex-row
                                                lg:items-start
                                                lg:justify-between
                                                gap-5">

                                    {/* ARTICLE INFO */}

                                    <div className="flex-1">

                                        <h3 className="text-xl
                                                       font-semibold
                                                       text-gray-900">
                                            {article.title}
                                        </h3>

                                        <p className="text-gray-600
                                                      mt-2 line-clamp-2">
                                            {article.content}
                                        </p>

                                        <div className="flex flex-wrap
                                                        gap-2 mt-4">

                                            <span className="bg-blue-100
                                                             text-blue-700
                                                             px-3 py-1
                                                             rounded-full
                                                             text-sm">
                                                Skill: {article.skillName}
                                            </span>

                                            <span className="bg-purple-100
                                                             text-purple-700
                                                             px-3 py-1
                                                             rounded-full
                                                             text-sm">
                                                Author: {article.authorName}
                                            </span>

                                        </div>

                                        <p className="text-sm
                                                      text-gray-400 mt-4">
                                            Created:{" "}
                                            {article.createdAt
                                                ? new Date(
                                                    article.createdAt
                                                ).toLocaleString()
                                                : "-"}
                                        </p>

                                    </div>

                                    {/* ACTIONS */}

                                    <div className="flex gap-2">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleView(article)
                                            }
                                            className="flex items-center
                                                       gap-2 px-4 py-2
                                                       bg-gray-100
                                                       hover:bg-gray-200
                                                       rounded-lg
                                                       text-gray-700"
                                        >
                                            <Eye size={17} />
                                            View
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openDeleteModal(article)
                                            }
                                            className="flex items-center
                                                       gap-2 px-4 py-2
                                                       bg-red-100
                                                       hover:bg-red-200
                                                       rounded-lg
                                                       text-red-700"
                                        >
                                            <Trash2 size={17} />
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            )}

            {/* =====================================================
                VIEW MODAL
            ===================================================== */}

            {viewOpen && selectedArticle && (

                <div className="fixed inset-0 z-50
                                bg-black/50 flex items-center
                                justify-center p-4">

                    <div className="bg-white rounded-2xl
                                    shadow-xl w-full max-w-3xl
                                    max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center
                                        justify-between
                                        px-6 py-5 border-b">

                            <div>
                                <p className="text-sm text-indigo-600
                                              font-medium">
                                    Knowledge Article
                                </p>

                                <h2 className="text-2xl font-bold
                                               text-gray-900 mt-1">
                                    {selectedArticle.title}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={closeView}
                                className="p-2 text-gray-500
                                           hover:bg-gray-100
                                           rounded-lg"
                            >
                                <X size={22} />
                            </button>

                        </div>

                        <div className="p-6">

                            <div className="flex flex-wrap gap-3 mb-6">

                                <span className="bg-purple-100
                                                 text-purple-700
                                                 px-3 py-2
                                                 rounded-lg">
                                    Author:{" "}
                                    {selectedArticle.authorName}
                                </span>

                                <span className="bg-blue-100
                                                 text-blue-700
                                                 px-3 py-2
                                                 rounded-lg">
                                    Skill:{" "}
                                    {selectedArticle.skillName}
                                </span>

                            </div>

                            <p className="text-gray-700
                                          whitespace-pre-wrap
                                          leading-7">
                                {selectedArticle.content}
                            </p>

                            {selectedArticle.resourceUrl && (
                                <div className="mt-8 pt-5 border-t">

                                    <h3 className="font-semibold
                                                   text-gray-800 mb-2">
                                        Additional Resource
                                    </h3>

                                    <a
                                        href={
                                            selectedArticle.resourceUrl
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600
                                                   hover:underline
                                                   break-all"
                                    >
                                        {selectedArticle.resourceUrl}
                                    </a>

                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}

            {/* =====================================================
                DELETE MODAL
            ===================================================== */}

            {deleteOpen && selectedArticle && (

                <div className="fixed inset-0 z-50
                                bg-black/50 flex items-center
                                justify-center p-4">

                    <div className="bg-white rounded-2xl
                                    shadow-xl w-full max-w-lg">

                        <div className="flex items-center
                                        justify-between
                                        px-6 py-5 border-b">

                            <div className="flex items-center gap-3">

                                <div className="p-2 bg-red-100
                                                rounded-lg">

                                    <AlertTriangle
                                        size={21}
                                        className="text-red-600"
                                    />

                                </div>

                                <h2 className="text-xl font-bold">
                                    Delete Article
                                </h2>

                            </div>

                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                disabled={deleting}
                                className="p-2 hover:bg-gray-100
                                           rounded-lg"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <div className="p-6 space-y-5">

                            <div className="bg-gray-50
                                            rounded-xl p-4">

                                <p className="font-semibold
                                              text-gray-800">
                                    {selectedArticle.title}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    Author:{" "}
                                    {selectedArticle.authorName}
                                </p>

                            </div>

                            <div>

                                <label className="block text-sm
                                                   font-semibold
                                                   text-gray-700 mb-2">
                                    Reason for deletion *
                                </label>

                                <textarea
                                    value={deleteReason}
                                    onChange={(e) =>
                                        setDeleteReason(
                                            e.target.value
                                        )
                                    }
                                    rows={5}
                                    maxLength={500}
                                    disabled={deleting}
                                    placeholder="Explain why this article is being deleted..."
                                    className="w-full border
                                               border-gray-300
                                               rounded-xl p-3
                                               resize-none
                                               focus:outline-none
                                               focus:ring-2
                                               focus:ring-red-500"
                                />

                                <p className="text-xs text-gray-400
                                              text-right mt-1">
                                    {deleteReason.length}/500
                                </p>

                                <p className="text-xs text-gray-500 mt-2">
                                    The article author will be notified
                                    with this reason.
                                </p>

                            </div>

                        </div>

                        <div className="flex justify-end gap-3
                                        px-6 py-4 border-t">

                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                disabled={deleting}
                                className="px-5 py-2.5
                                           border border-gray-300
                                           rounded-lg
                                           hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={
                                    deleting ||
                                    !deleteReason.trim()
                                }
                                className="flex items-center
                                           gap-2 px-5 py-2.5
                                           bg-red-600 text-white
                                           rounded-lg
                                           hover:bg-red-700
                                           disabled:opacity-50"
                            >
                                <Trash2 size={17} />

                                {deleting
                                    ? "Deleting..."
                                    : "Delete Article"}

                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default ManagementKnowledgeArticle;