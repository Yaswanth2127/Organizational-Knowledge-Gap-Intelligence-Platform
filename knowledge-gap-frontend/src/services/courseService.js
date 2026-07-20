import api from "./api";

/**
 * ============================================
 * Course Service
 * ============================================
 * Handles all Course API requests.
 * Note: Course endpoints do NOT use /all suffix.
 */

export const getAllCourses = async () => {
    const response = await api.get("/api/courses");
    return response.data;
};

export const getCourseById = async (id) => {
    const response = await api.get(`/api/courses/${id}`);
    return response.data;
};

export const createCourse = async (course) => {
    const response = await api.post("/api/courses", course);
    return response.data;
};

export const updateCourse = async (id, course) => {
    const response = await api.put(`/api/courses/${id}`, course);
    return response.data;
};

export const deleteCourse = async (id) => {
    await api.delete(`/api/courses/${id}`);
};
