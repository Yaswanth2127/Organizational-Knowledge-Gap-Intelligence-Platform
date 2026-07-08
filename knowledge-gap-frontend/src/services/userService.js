export const getUser = (id) =>
    api.get(`/api/users/${id}`);

export const updateUser = (id, data) =>
    api.put(`/api/users/${id}`, data);