import api from "./api";

/**
 * ============================================
 * Job Role Service
 * ============================================
 * Handles all Job Role API requests.
 */

export const getAllJobRoles = async () => {
    const response = await api.get("/api/job-roles/all");
    return response.data;
};

export const getJobRoleById = async (id) => {
    const response = await api.get(`/api/job-roles/${id}`);
    return response.data;
};

export const createJobRole = async (jobRole) => {
    const response = await api.post("/api/job-roles/add", jobRole);
    return response.data;
};

export const updateJobRole = async (id, jobRole) => {
    const response = await api.put(`/api/job-roles/${id}`, jobRole);
    return response.data;
};

export const deleteJobRole = async (id) => {
    await api.delete(`/api/job-roles/${id}`);
};