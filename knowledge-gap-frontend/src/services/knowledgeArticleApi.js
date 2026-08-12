import api from "./api";

// =========================================================
// CREATE ARTICLE
// POST /api/knowledge-articles
// =========================================================
const createArticle = (articleData) => {
    return api.post("/api/knowledge-articles", articleData);
};

// =========================================================
// GET ALL ARTICLES
// GET /api/knowledge-articles
// =========================================================
const getAllArticles = () => {
    return api.get("/api/knowledge-articles");
};

// =========================================================
// GET ARTICLE BY ID
// GET /api/knowledge-articles/{id}
// =========================================================
const getArticleById = (id) => {
    return api.get(`/api/knowledge-articles/${id}`);
};

// =========================================================
// UPDATE OWN ARTICLE
// PUT /api/knowledge-articles/{id}
// =========================================================
const updateArticle = (id, articleData) => {
    return api.put(
        `/api/knowledge-articles/${id}`,
        articleData
    );
};

// =========================================================
// DELETE OWN ARTICLE
// DELETE /api/knowledge-articles/{id}
// =========================================================
const deleteArticle = (id) => {
    return api.delete(`/api/knowledge-articles/${id}`);
};

// =========================================================
// HR / ADMIN DELETE ANY ARTICLE
// DELETE /api/knowledge-articles/admin/{id}
// =========================================================
const deleteArticleByAdmin = (id, reason) => {
    return api.delete(`/api/knowledge-articles/admin/${id}`, {
        data: { reason }
    });
};

// =========================================================
// GET ARTICLES BY AUTHOR
// GET /api/knowledge-articles/author/{authorId}
// =========================================================
const getArticlesByAuthor = (authorId) => {
    return api.get(
        `/api/knowledge-articles/author/${authorId}`
    );
};

// =========================================================
// GET ARTICLES BY SKILL
// GET /api/knowledge-articles/skill/{skillId}
// =========================================================
const getArticlesBySkill = (skillId) => {
    return api.get(
        `/api/knowledge-articles/skill/${skillId}`
    );
};

// =========================================================
// SEARCH ARTICLES BY TITLE
// GET /api/knowledge-articles/search?title=...
// =========================================================
const searchByTitle = (title) => {
    return api.get("/api/knowledge-articles/search", {
        params: {
            title: title,
        },
    });
};

// =========================================================
// EXPORT
// =========================================================
const knowledgeArticleApi = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    deleteArticleByAdmin,
    getArticlesByAuthor,
    getArticlesBySkill,
    searchByTitle,
};

export default knowledgeArticleApi;