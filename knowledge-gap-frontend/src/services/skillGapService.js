import api from "./api";

/**
 * ============================================
 * Skill Gap Service
 * ============================================
 * Handles Skill Gap analysis API requests.
 */

// HR_SPECIALIST / SYS_ADMIN — analyze skill gap for a specific user
export const analyzeSkillGapForUser = async (userId) => {
    const response = await api.post(`/api/management/skill-gaps/analyze/${userId}`);
    return response.data;
};

// EMPLOYEE — analyze own skill gap
export const analyzeMySkillGap = async () => {
    const response = await api.post("/api/skill-gaps/employee/analyze");
    return response.data;
};