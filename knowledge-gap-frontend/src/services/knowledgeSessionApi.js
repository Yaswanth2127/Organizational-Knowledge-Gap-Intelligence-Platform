import api from "./api";

const knowledgeSessionApi = {

    // Create session
    createSession: (data) =>
        api.post("/api/knowledge-sessions", data),

    // Update session
    updateSession: (id, data) =>
        api.put(`/api/knowledge-sessions/${id}`, data),

    // Delete session
    deleteSession: (id) =>
        api.delete(`/api/knowledge-sessions/${id}`),

    // Get all sessions
    getAllSessions: () =>
        api.get("/api/knowledge-sessions"),

    // Get session by ID
    getSessionById: (id) =>
        api.get(`/api/knowledge-sessions/${id}`),

    // Get sessions by host
    getSessionsByHost: (hostId) =>
        api.get(`/api/knowledge-sessions/host/${hostId}`),

    // Get sessions by skill
    getSessionsBySkill: (skillId) =>
        api.get(`/api/knowledge-sessions/skill/${skillId}`),

    // Get sessions by status
    getSessionsByStatus: (status) =>
        api.get(`/api/knowledge-sessions/status/${status}`),

};

export default knowledgeSessionApi;