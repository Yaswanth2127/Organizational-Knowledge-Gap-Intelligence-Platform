import React, { useEffect, useState } from "react";
import knowledgeArticleApi from "../../services/knowledgeArticleApi";

const KnowledgeArticles = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [articles, setArticles] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTitle, setSearchTitle] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [showView, setShowView] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const [formData, setFormData] = useState({
        authorId: "",
        skillId: "",
        title: "",
        content: "",
        resourceUrl: ""
    });

    // =====================================================
    // LOAD ALL ARTICLES
    // =====================================================

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await knowledgeArticleApi.getAllArticles();

            setArticles(data);

        } catch (err) {

            console.error("Failed to load articles:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load knowledge articles."
            );

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // FORM INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // =====================================================
    // OPEN CREATE FORM
    // =====================================================

    const openCreateForm = () => {

        setEditingId(null);

        setFormData({
            authorId: "",
            skillId: "",
            title: "",
            content: "",
            resourceUrl: ""
        });

        setShowForm(true);
    };

    // =====================================================
    // OPEN EDIT FORM
    // =====================================================

    const openEditForm = (article) => {

        setEditingId(article.id);

        setFormData({
            authorId: article.authorId || "",
            skillId: article.skillId || "",
            title: article.title || "",
            content: article.content || "",
            resourceUrl: article.resourceUrl || ""
        });

        setShowForm(true);
    };

    // =====================================================
    // CLOSE FORM
    // =====================================================

    const closeForm = () => {

        setShowForm(false);
        setEditingId(null);

        setFormData({
            authorId: "",
            skillId: "",
            title: "",
            content: "",
            resourceUrl: ""
        });
    };

    // =====================================================
    // CREATE / UPDATE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            const articleData = {
                authorId: Number(formData.authorId),
                skillId: Number(formData.skillId),
                title: formData.title.trim(),
                content: formData.content.trim(),
                resourceUrl: formData.resourceUrl.trim()
            };

            if (editingId) {

                await knowledgeArticleApi.updateArticle(
                    editingId,
                    articleData
                );

            } else {

                await knowledgeArticleApi.createArticle(
                    articleData
                );
            }

            closeForm();

            await loadArticles();

        } catch (err) {

            console.error("Failed to save article:", err);

            setError(
                err.response?.data?.message ||
                "Failed to save article."
            );
        }
    };

    // =====================================================
    // DELETE ARTICLE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this article?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await knowledgeArticleApi.deleteArticle(id);

            await loadArticles();

        } catch (err) {

            console.error("Failed to delete article:", err);

            setError(
                err.response?.data?.message ||
                "Failed to delete article."
            );
        }
    };

    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = async () => {

        const keyword = searchTitle.trim();

        if (!keyword) {

            await loadArticles();
            return;
        }

        try {

            setLoading(true);
            setError("");

            const data =
                await knowledgeArticleApi.searchByTitle(
                    keyword
                );

            setArticles(data);

        } catch (err) {

            console.error("Search failed:", err);

            setError(
                err.response?.data?.message ||
                "Failed to search articles."
            );

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // CLEAR SEARCH
    // =====================================================

    const clearSearch = async () => {

        setSearchTitle("");

        await loadArticles();
    };

    // =====================================================
    // VIEW ARTICLE
    // =====================================================

    const handleView = (article) => {

        setSelectedArticle(article);
        setShowView(true);
    };

    // =====================================================
    // CLOSE VIEW
    // =====================================================

    const closeView = () => {

        setSelectedArticle(null);
        setShowView(false);
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading && articles.length === 0) {

        return (
            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-7xl mx-auto">

                    <div className="bg-white rounded-xl shadow-sm p-10 text-center">

                        <p className="text-gray-500">
                            Loading knowledge articles...
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-100 p-6 md:p-8">

            <div className="max-w-7xl mx-auto">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Knowledge Articles
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Create, manage and share organizational knowledge.
                        </p>

                    </div>

                    <button
                        onClick={openCreateForm}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
                    >
                        + Add Article
                    </button>

                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">

                        {error}

                    </div>

                )}

                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

                    <div className="flex flex-col md:flex-row gap-3">

                        <input
                            type="text"
                            placeholder="Search articles by title..."
                            value={searchTitle}
                            onChange={(e) =>
                                setSearchTitle(e.target.value)
                            }
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {
                                    handleSearch();
                                }

                            }}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={handleSearch}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg"
                        >
                            Search
                        </button>

                        <button
                            onClick={clearSearch}
                            className="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg"
                        >
                            Clear
                        </button>

                    </div>

                </div>

                {/* =================================================
                    ARTICLE COUNT
                ================================================= */}

                <div className="bg-white rounded-xl shadow-sm mb-6">

                    <div className="px-6 py-5 border-b">

                        <h2 className="text-xl font-semibold text-gray-900">

                            Articles ({articles.length})

                        </h2>

                    </div>

                    {/* =================================================
                        NO ARTICLES
                    ================================================= */}

                    {articles.length === 0 ? (

                        <div className="p-12 text-center">

                            <div className="text-5xl mb-4">
                                📚
                            </div>

                            <h3 className="text-lg font-semibold text-gray-700">
                                No articles found
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Create your first knowledge article.
                            </p>

                        </div>

                    ) : (

                        <div className="divide-y">

                            {articles.map((article) => (

                                <div
                                    key={article.id}
                                    className="p-6 hover:bg-gray-50 transition"
                                >

                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                                        {/* ARTICLE DETAILS */}

                                        <div className="flex-1">

                                            <div className="flex flex-wrap items-center gap-2 mb-2">

                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {article.title}
                                                </h3>

                                            </div>

                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {article.content}
                                            </p>

                                            <div className="flex flex-wrap gap-3 text-sm">

                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                    Skill: {article.skillName}
                                                </span>

                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                                                    Author: {article.authorName}
                                                </span>

                                            </div>

                                            <div className="mt-4 text-sm text-gray-400">

                                                Created:{" "}

                                                {article.createdAt
                                                    ? new Date(
                                                        article.createdAt
                                                    ).toLocaleString()
                                                    : "-"}

                                            </div>

                                        </div>

                                        {/* ACTIONS */}

                                        <div className="flex flex-wrap gap-2">

                                            <button
                                                onClick={() =>
                                                    handleView(article)
                                                }
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    openEditForm(article)
                                                }
                                                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(article.id)
                                                }
                                                className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

            {/* =====================================================
                CREATE / EDIT MODAL
            ===================================================== */}

            {showForm && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between px-6 py-5 border-b">

                            <h2 className="text-xl font-bold">

                                {editingId
                                    ? "Edit Knowledge Article"
                                    : "Create Knowledge Article"}

                            </h2>

                            <button
                                onClick={closeForm}
                                className="text-gray-500 hover:text-gray-800 text-2xl"
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 space-y-5"
                        >

                            {/* AUTHOR ID */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Author ID *
                                </label>

                                <input
                                    type="number"
                                    name="authorId"
                                    value={formData.authorId}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder="Enter author ID"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* SKILL ID */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Skill ID *
                                </label>

                                <input
                                    type="number"
                                    name="skillId"
                                    value={formData.skillId}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder="Enter skill ID"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* TITLE */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter article title"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* CONTENT */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content *
                                </label>

                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows="8"
                                    placeholder="Write article content..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                                />

                            </div>

                            {/* RESOURCE URL */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resource URL
                                </label>

                                <input
                                    type="url"
                                    name="resourceUrl"
                                    value={formData.resourceUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/resource"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                            {/* BUTTONS */}

                            <div className="flex justify-end gap-3 pt-4 border-t">

                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                >
                                    {editingId
                                        ? "Update Article"
                                        : "Create Article"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* =====================================================
                VIEW ARTICLE MODAL
            ===================================================== */}

            {showView && selectedArticle && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between px-6 py-5 border-b">

                            <div>

                                <p className="text-sm text-blue-600 font-medium">
                                    Knowledge Article
                                </p>

                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                    {selectedArticle.title}
                                </h2>

                            </div>

                            <button
                                onClick={closeView}
                                className="text-gray-500 hover:text-gray-800 text-2xl"
                            >
                                ×
                            </button>

                        </div>

                        <div className="p-6">

                            {/* AUTHOR / SKILL */}

                            <div className="flex flex-wrap gap-3 mb-6">

                                <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg">
                                    Author: {selectedArticle.authorName}
                                </span>

                                <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg">
                                    Skill: {selectedArticle.skillName}
                                </span>

                            </div>

                            {/* CONTENT */}

                            <div className="prose max-w-none">

                                <p className="text-gray-700 whitespace-pre-wrap leading-7">
                                    {selectedArticle.content}
                                </p>

                            </div>

                            {/* RESOURCE */}

                            {selectedArticle.resourceUrl && (

                                <div className="mt-8 pt-5 border-t">

                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        Additional Resource
                                    </h3>

                                    <a
                                        href={selectedArticle.resourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all"
                                    >
                                        {selectedArticle.resourceUrl}
                                    </a>

                                </div>

                            )}

                            {/* DATES */}

                            <div className="mt-8 pt-5 border-t text-sm text-gray-500 space-y-1">

                                <p>
                                    Created:{" "}
                                    {selectedArticle.createdAt
                                        ? new Date(
                                            selectedArticle.createdAt
                                        ).toLocaleString()
                                        : "-"}
                                </p>

                                <p>
                                    Last updated:{" "}
                                    {selectedArticle.updatedAt
                                        ? new Date(
                                            selectedArticle.updatedAt
                                        ).toLocaleString()
                                        : "-"}
                                </p>

                            </div>

                        </div>

                        <div className="px-6 py-4 border-t flex justify-end">

                            <button
                                onClick={closeView}
                                className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default KnowledgeArticles;