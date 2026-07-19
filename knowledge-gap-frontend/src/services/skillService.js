import api from "./api";

/**
 * ============================================
 * Skill Service
 * ============================================
 * Handles all Skill API requests.
 */

export const getAllSkills = async () => {
    const response = await api.get("/api/skills/all");
    return response.data;
};

export const getSkillById = async (id) => {
    const response = await api.get(`/api/skills/${id}`);
    return response.data;
};

export const createSkill = async (skill) => {
    const response = await api.post("/api/skills/add", skill);
    return response.data;
};

export const updateSkill = async (id, skill) => {
    const response = await api.put(`/api/skills/${id}`, skill);
    return response.data;
};

export const deleteSkill = async (id) => {
    await api.delete(`/api/skills/${id}`);
};