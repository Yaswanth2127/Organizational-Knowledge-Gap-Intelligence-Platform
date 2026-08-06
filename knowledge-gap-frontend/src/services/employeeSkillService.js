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


const BASE_URL = "/api/employee-skills";

const employeeSkillService = {

    getMySkills: () =>
        api.get(`${BASE_URL}/me`),

    addSkill: (data) =>
        api.post(BASE_URL, data),

    updateSkill: (id, data) =>
        api.put(`${BASE_URL}/${id}`, data),

    deleteSkill: (id) =>
        api.delete(`${BASE_URL}/${id}`),

    getStatistics: () =>
        api.get(`${BASE_URL}/statistics`),getEligiblePeerReviews() {
    return api.get("/api/employee-skills/peer-review");
},

getEligiblePeerReviews() {
    return api.get("/api/employee-skills/peer-review/eligible");
},

submitPeerReview(id, payload) {
    return api.patch(
        `/api/employee-skills/${id}/peer-review`,
        payload
    );
},

};

export default employeeSkillService;