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