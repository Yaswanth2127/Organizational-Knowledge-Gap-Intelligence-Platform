import api from "./api";

/**
 * ============================================
 * Competency Framework Service
 * ============================================
 * Handles all Competency Framework API requests.
 */

export const getAllCompetencyFrameworks = async () => {
    const response = await api.get("/api/competency-frameworks/all");
    return response.data;
};

export const getCompetencyFrameworkById = async (id) => {
    const response = await api.get(`/api/competency-frameworks/${id}`);
    return response.data;
};

export const createCompetencyFramework = async (framework) => {
    const response = await api.post("/api/competency-frameworks/add", framework);
    return response.data;
};

export const updateCompetencyFramework = async (id, framework) => {
    const response = await api.put(`/api/competency-frameworks/${id}`, framework);
    return response.data;
};

export const deleteCompetencyFramework = async (id) => {
    await api.delete(`/api/competency-frameworks/${id}`);
};
