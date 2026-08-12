import api from "./api";

// =========================================================
// GET ALL EXPERTS
// GET /api/expert-directory
// =========================================================
const getAllExperts = () => {
    return api.get("/api/expert-directory");
};

// =========================================================
// GET TOP 5 EXPERTS
// GET /api/expert-directory/top5
// =========================================================
const getTop5Experts = () => {
    return api.get("/api/expert-directory/top5");
};

// =========================================================
// GET EXPERT BY ID
// GET /api/expert-directory/{id}
// =========================================================
const getExpertById = (id) => {
    return api.get(`/api/expert-directory/${id}`);
};

// =========================================================
// GET EXPERTS BY SKILL
// GET /api/expert-directory/skill/{skillId}
// =========================================================
const getExpertsBySkill = (skillId) => {
    return api.get(
        `/api/expert-directory/skill/${skillId}`
    );
};

// =========================================================
// GET EXPERTS BY USER
// GET /api/expert-directory/user/{userId}
// =========================================================
const getExpertsByUser = (userId) => {
    return api.get(
        `/api/expert-directory/user/${userId}`
    );
};

// =========================================================
// GET EXPERTS BY SKILL AND EXPERTISE LEVEL
// GET /api/expert-directory/skill/{skillId}/level/{level}
// =========================================================
const getExpertsBySkillAndLevel = (
    skillId,
    level
) => {
    return api.get(
        `/api/expert-directory/skill/${skillId}/level/${level}`
    );
};

// =========================================================
// ADD CURRENT USER AS EXPERT
// POST /api/expert-directory
// =========================================================
const addExpert = (expertData) => {
    return api.post(
        "/api/expert-directory",
        expertData
    );
};

// =========================================================
// UPDATE OWN EXPERTISE
// PUT /api/expert-directory/{id}
// =========================================================
const updateExpert = (id, expertData) => {
    return api.put(
        `/api/expert-directory/${id}`,
        expertData
    );
};

// =========================================================
// DELETE OWN EXPERTISE
// DELETE /api/expert-directory/{id}
// =========================================================
const deleteExpert = (id) => {
    return api.delete(
        `/api/expert-directory/${id}`
    );
};

// =========================================================
// GET MY EXPERTISE
// GET /api/expert-directory/me
// =========================================================
const getMyExpertise = () => {
    return api.get("/api/expert-directory/me");
};

// =========================================================
// EXPORT
// =========================================================
const expertDirectoryApi = {

    getAllExperts,
    getTop5Experts,
    getExpertById,
    getExpertsBySkill,
    getExpertsByUser,
    getExpertsBySkillAndLevel,
    addExpert,
    updateExpert,
    deleteExpert,
    getMyExpertise,
};

export default expertDirectoryApi;