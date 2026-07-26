import api from "./api";

/**
 * ============================================
 * AI Recommendation Service
 * ============================================
 * Handles AI-generated course recommendation requests.
 */

export const getAIRecommendation = async (userId) => {
    const response = await api.get(`/api/ai/recommendation/${userId}`);
    return response.data;
};