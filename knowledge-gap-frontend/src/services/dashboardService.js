import api from "./api";

export const getUsers = () => {
    return api.get("/api/users");
};

export const getDepartments = () => {
    return api.get("/api/departments/all");
};

export const getJobRoles = () => {
    return api.get("/api/job-roles/all");
};

export const getSkills = () => {
    return api.get("/api/skills/all");
};

export const getCertifications = () => {
    return api.get("/api/certifications");
}
export const getCompetencyFrameworks = () => {
    return api.get("/api/competency-frameworks/all");
};

export const getRecentUsers = async () => {
    const response = await api.get("/api/users/recent");
    return response.data;
};

export const getEmployeeDashboard = () => {
    return api.get("/api/dashboard/employee");
};
