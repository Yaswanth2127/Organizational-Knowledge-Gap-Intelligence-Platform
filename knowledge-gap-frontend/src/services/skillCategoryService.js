import api from './api';

export const getAllSkillCategories = () => api.get('/api/skill-categories/all');
export const getSkillCategoryById = (id) => api.get(`/api/skill-categories/${id}`);
export const createSkillCategory = (name) => api.post('/api/skill-categories/add', { name });
export const updateSkillCategory = (id, name) => api.put(`/api/skill-categories/${id}`, { name });
export const deleteSkillCategory = (id) => api.delete(`/api/skill-categories/${id}`);