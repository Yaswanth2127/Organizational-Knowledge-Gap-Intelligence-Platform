import api from "./api";

/**
 * ============================================
 * Framework Required Skill Service
 * ============================================
 * Handles all Framework Required Skill API requests.
 */

export const getAllFrameworkRequiredSkills = async () => {
    const response = await api.get("/api/framework-required-skills/all");
    return response.data;
};

export const getFrameworkRequiredSkillById = async (id) => {
    const response = await api.get(`/api/framework-required-skills/${id}`);
    return response.data;
};

export const createFrameworkRequiredSkill = async (data) => {
    const response = await api.post("/api/framework-required-skills/add", data);
    return response.data;
};

export const updateFrameworkRequiredSkill = async (id, data) => {
    const response = await api.put(`/api/framework-required-skills/${id}`, data);
    return response.data;
};

export const deleteFrameworkRequiredSkill = async (id) => {
    await api.delete(`/api/framework-required-skills/${id}`);
};