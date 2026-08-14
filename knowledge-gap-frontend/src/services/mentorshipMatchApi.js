import api from "./api";

const mentorshipMatchApi = {

    // Create mentorship match
    createMatch: (data) =>
        api.post("/api/mentorship-matches", data),

    // Update mentorship match
    updateMatch: (id, data) =>
        api.put(`/api/mentorship-matches/${id}`, data),

    // Delete mentorship match
    deleteMatch: (id) =>
        api.delete(`/api/mentorship-matches/${id}`),

    // Get all mentorship matches - Admin
    getAllMatches: () =>
        api.get("/api/mentorship-matches/all"),

    // Get match by ID
    getMatchById: (id) =>
        api.get(`/api/mentorship-matches/${id}`),

    // Get matches by mentor
    getMatchesByMentor: (mentorId) =>
        api.get(`/api/mentorship-matches/mentor/${mentorId}`),

    // Get matches by mentee
    getMatchesByMentee: (menteeId) =>
        api.get(`/api/mentorship-matches/mentee/${menteeId}`),

    // Get matches by skill
    getMatchesBySkill: (skillId) =>
        api.get(`/api/mentorship-matches/skill/${skillId}`),

    // Get matches by status
    getMatchesByStatus: (status) =>
        api.get(`/api/mentorship-matches/status/${status}`),

    // Accept mentorship
    acceptMatch: (id) =>
        api.post(`/api/mentorship-matches/${id}/accept`),

    // Complete mentorship
    completeMatch: (id) =>
        api.post(`/api/mentorship-matches/${id}/complete`),

    // Cancel mentorship
    cancelMatch: (id) =>
        api.post(`/api/mentorship-matches/${id}/cancel`),
};

export default mentorshipMatchApi;