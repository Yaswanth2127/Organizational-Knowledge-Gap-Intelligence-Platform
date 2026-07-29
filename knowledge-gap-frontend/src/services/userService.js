import api from "./api";

export const getUser = async (id) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
};

export const updateUser = async (id, data) => {
    const response = await api.put(`/api/users/${id}`, data);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await api.get("/api/users");
    return response.data;
};