import React, { useEffect, useMemo, useState } from "react";
import {
    FileText,
    Plus,
    Loader2,
    AlertCircle,
} from "lucide-react";

import knowledgeArticleApi from "../../services/knowledgeArticleApi";
import { getAllSkills } from "../../services/skillService";

import ArticleCard from "../../components/knowledge/ArticleCard";
import ArticleSearch from "../../components/knowledge/ArticleSearch";
import ArticleFormModal from "../../components/knowledge/ArticleFormModal";
import ArticleDetailsModal from "../../components/knowledge/ArticleDetailsModal";
import ArticleDeleteModal from "../../components/knowledge/ArticleDeleteModal";

const KnowledgeArticles = () => {
    const [articles, setArticles] = useState([]);
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [skillsLoading, setSkillsLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [selectedArticle, setSelectedArticle] = useState(null);

    const [formModalOpen, setFormModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [editingArticle, setEditingArticle] = useState(null);

    const [isAdminDelete, setIsAdminDelete] = useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // ---------------------------------------------------------
    // CURRENT USER
    // ---------------------------------------------------------

    const currentUserId = Number(
        localStorage.getItem("userId")
    );

    const userRole =
        localStorage.getItem("role") ||
        localStorage.getItem("userRole");

    // ---------------------------------------------------------
    // LOAD ARTICLES
    // ---------------------------------------------------------

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await knowledgeArticleApi.getAllArticles();

            setArticles(response.data || []);

        } catch (err) {
            console.error("Failed to load articles:", err);

            setError(
                "Unable to load knowledge articles. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------------------
    // LOAD SKILLS
    // ---------------------------------------------------------

    const loadSkills = async () => {
        try {
            setSkillsLoading(true);

            const data = await getAllSkills();

            setSkills(data || []);

        } catch (err) {
            console.error("Failed to load skills:", err);

            setError("Unable to load skills.");
        } finally {
            setSkillsLoading(false);
        }
    };


    // ---------------------------------------------------------
    // INITIAL LOAD
    // ---------------------------------------------------------

    useEffect(() => {
        loadArticles();
        loadSkills();
    }, []);

    // ---------------------------------------------------------
    // SEARCH
    // ---------------------------------------------------------

    const filteredArticles = useMemo(() => {

        const query = search.trim().toLowerCase();

        if (!query) {
            return articles;
        }

        return articles.filter((article) =>
            article.title
                ?.toLowerCase()
                .includes(query)
            ||
            article.authorName
                ?.toLowerCase()
                .includes(query)
            ||
            article.skillName
                ?.toLowerCase()
                .includes(query)
        );

    }, [articles, search]);

    // ---------------------------------------------------------
    // CREATE
    // ---------------------------------------------------------

    const handleCreate = () => {
        setEditingArticle(null);
        setFormModalOpen(true);
    };

    // ---------------------------------------------------------
    // EDIT
    // ---------------------------------------------------------

    const handleEdit = (article) => {
        setEditingArticle(article);
        setFormModalOpen(true);
    };

    // ---------------------------------------------------------
    // VIEW
    // ---------------------------------------------------------

    const handleView = (article) => {
        setSelectedArticle(article);
        setDetailsModalOpen(true);
    };

    // ---------------------------------------------------------
    // DELETE MODAL
    // ---------------------------------------------------------

    const handleDeleteClick = (article) => {

        const isAuthor =
            Number(article.authorId) ===
            Number(currentUserId);

        const adminDelete =
            !isAuthor &&
            (
                userRole === "HR_SPECIALIST" ||
                userRole === "SYS_ADMIN"
            );

        setSelectedArticle(article);
        setIsAdminDelete(adminDelete);
        setDeleteModalOpen(true);
    };

    // ---------------------------------------------------------
    // CREATE / UPDATE SUBMIT
    // ---------------------------------------------------------

    const handleFormSubmit = async (articleData) => {

        try {
            setSubmitting(true);
            setError("");

            if (editingArticle) {

                await knowledgeArticleApi.updateArticle(
                    editingArticle.id,
                    articleData
                );

            } else {

                await knowledgeArticleApi.createArticle(
                    articleData
                );
            }

            setFormModalOpen(false);
            setEditingArticle(null);

            await loadArticles();

        } catch (err) {
            console.error(
                "Failed to save article:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to save article."
            );

        } finally {
            setSubmitting(false);
        }
    };

    // ---------------------------------------------------------
    // DELETE
    // ---------------------------------------------------------

    const handleDeleteConfirm = async (reason) => {

        if (!selectedArticle) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            if (isAdminDelete) {

                await knowledgeArticleApi
                    .deleteArticleByAdmin(
                        selectedArticle.id,
                        reason
                    );

            } else {

                await knowledgeArticleApi
                    .deleteArticle(
                        selectedArticle.id
                    );
            }

            setDeleteModalOpen(false);
            setSelectedArticle(null);

            await loadArticles();

        } catch (err) {
            console.error(
                "Failed to delete article:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to delete article."
            );

        } finally {
            setDeleting(false);
        }
    };

    // ---------------------------------------------------------
    // LOADING
    // ---------------------------------------------------------

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32">
                <Loader2
                    size={40}
                    className="animate-spin text-indigo-600"
                />
            </div>
        );
    }

    // ---------------------------------------------------------
    // PAGE
    // ---------------------------------------------------------

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="p-3 bg-indigo-100 rounded-xl">
                            <FileText
                                size={25}
                                className="text-indigo-600"
                            />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Knowledge Articles
                        </h1>

                    </div>

                    <p className="text-gray-500 mt-2">
                        Share and discover knowledge from your organization.
                    </p>

                </div>

                {/* Employees can create */}
                <button
                    type="button"
                    onClick={handleCreate}
                    className="flex items-center justify-center gap-2
                               px-5 py-3 rounded-xl
                               bg-indigo-600 text-white
                               font-semibold hover:bg-indigo-700
                               transition"
                >
                    <Plus size={19} />
                    Create Article
                </button>

            </div>

            {/* Error */}
            {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl
                                bg-red-50 border border-red-200">

                    <AlertCircle
                        size={20}
                        className="text-red-600 mt-0.5"
                    />

                    <p className="text-sm text-red-700">
                        {error}
                    </p>

                </div>
            )}

            {/* Search */}
            <ArticleSearch
                value={search}
                onChange={setSearch}
            />

            {/* Results */}
            {filteredArticles.length === 0 ? (

                <div className="bg-white border border-gray-200
                                rounded-2xl p-12 text-center">

                    <FileText
                        size={45}
                        className="mx-auto text-gray-300"
                    />

                    <h2 className="text-lg font-semibold text-gray-700 mt-4">
                        No articles found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        {search
                            ? "Try a different search."
                            : "Be the first to share your knowledge."}
                    </p>

                </div>

            ) : (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {filteredArticles.map((article) => (

                        <ArticleCard
                            key={article.id}
                            article={article}
                            currentUserId={currentUserId}
                            userRole={userRole}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />

                    ))}

                </div>
            )}

            {/* Create / Edit */}
            <ArticleFormModal
                open={formModalOpen}
                article={editingArticle}
                skills={skills}
                loading={submitting}
                onClose={() => {
                    if (!submitting) {
                        setFormModalOpen(false);
                        setEditingArticle(null);
                    }
                }}
                onSubmit={handleFormSubmit}
            />

            {/* Details */}
            <ArticleDetailsModal
                open={detailsModalOpen}
                article={selectedArticle}
                onClose={() => {
                    setDetailsModalOpen(false);
                    setSelectedArticle(null);
                }}
            />

            {/* Delete */}
            <ArticleDeleteModal
                open={deleteModalOpen}
                article={selectedArticle}
                isAdminDelete={isAdminDelete}
                loading={deleting}
                onClose={() => {
                    if (!deleting) {
                        setDeleteModalOpen(false);
                        setSelectedArticle(null);
                        setIsAdminDelete(false);
                    }
                }}
                onConfirm={handleDeleteConfirm}
            />

        </div>
    );
};

export default KnowledgeArticles;