import api from "./api";

const roleService = {

    // Get all available roles
    getAllRoles: () => {
        return api.get("/api/roles");
    },

    // Get roles assigned to a specific user
    getUserRoles: (userId) => {
        return api.get(`/api/roles/user/${userId}`);
    },

    // Replace user's current roles
    assignRoles: (userId, roleIds) => {
        return api.put(`/api/roles/user/${userId}`, {
            roleIds,
        });
    },
};

export default roleService;