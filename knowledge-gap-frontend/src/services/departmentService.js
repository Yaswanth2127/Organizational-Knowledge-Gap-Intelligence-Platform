import api from "./api";

/**
 * ============================================
 * Department Service
 * ============================================
 * Handles all Department API requests.
 */

export const getDepartments = async () => {
    const response = await api.get("/api/departments/all");
    return response.data;
};

export const getDepartmentById = async (id) => {
    const response = await api.get(`/api/departments/${id}`);
    return response.data;
};

export const createDepartment = async (department) => {
    const response = await api.post(
        "/api/departments/add",
        department
    );
    return response.data;
};

export const updateDepartment = async (id, department) => {
    const response = await api.put(
        `/api/departments/${id}`,
        department
    );
    return response.data;
};

export const deleteDepartment = async (id) => {
    await api.delete(`/api/departments/${id}`);
};