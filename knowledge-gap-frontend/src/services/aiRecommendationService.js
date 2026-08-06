import api from "./api";

/**
 * ============================================
 * AI Recommendation Service
 * ============================================
 * Handles AI-generated course recommendation requests.
 */

export const getAIRecommendation = async () => {
    const response = await api.get("/api/ai/recommendation");
    return response.data;
};

export const generateAIRecommendation = async (userId) => {
    const response = await api.post(`/api/ai/recommendation/analyze/${userId}`);
    return response.data;
}