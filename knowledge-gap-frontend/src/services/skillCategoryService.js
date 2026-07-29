import api from "./api";

export const getAllSkillCategories = async () => {
    const response = await api.get("/api/skill-categories/all");
    return response.data;
};

export const getSkillCategoryById = async (id) => {
    const response = await api.get(`/api/skill-categories/${id}`);
    return response.data;
};

export const createSkillCategory = async (name) => {
    const response = await api.post("/api/skill-categories/add", { name });
    return response.data;
};

export const updateSkillCategory = async (id, name) => {
    const response = await api.put(`/api/skill-categories/${id}`, { name });
    return response.data;
};

export const deleteSkillCategory = async (id) => {
    const response = await api.delete(`/api/skill-categories/${id}`);
    return response.data;
};