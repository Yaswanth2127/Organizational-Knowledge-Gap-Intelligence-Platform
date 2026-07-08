import api from "./api";

export const getEmployeeSkills = () =>
    api.get("/api/employee-skills/all");

export const addEmployeeSkill = (data) =>
    api.post("/api/employee-skills/add", data);

export const updateEmployeeSkill = (id, data) =>
    api.put(`/api/employee-skills/${id}`, data);

export const deleteEmployeeSkill = (id) =>
    api.delete(`/api/employee-skills/${id}`);

export const getEmployeeSkillsByUserId = (userId) =>
    api.get(`/api/employee-skills/user/${userId}`);