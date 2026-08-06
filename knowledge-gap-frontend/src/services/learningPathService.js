import api from "./api";

/**
 * ============================================
 * Learning Path Service
 * ============================================
 * Handles Employee Learning Path APIs.
 */

// Get current employee's active learning path
export const getCurrentLearningPath = async () => {
    const response = await api.get("/api/learning-paths/me");
    return response.data;
};

// Get courses of the current learning path
export const getLearningPathCourses = async (learningPathId) => {
    const response = await api.get(
        `/api/learning-path-courses/learning-path/${learningPathId}`
    );
    return response.data;
};

// Get learning path by ID
export const getLearningPathById = async (id) => {
    const response = await api.get(`/api/learning-paths/${id}`);
    return response.data;
};

// Get learning path history of current employee
export const getLearningPathHistory = async () => {
    const response = await api.get("/api/learning-paths/history");
    return response.data;
};