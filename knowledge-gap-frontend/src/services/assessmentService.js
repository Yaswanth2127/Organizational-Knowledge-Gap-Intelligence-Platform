import api from "./api";

const BASE_URL = "api/assessments";

const assessmentService = {
  // Employee
  createAssessment: (skillId) =>
    api.post(BASE_URL, { skillId }),

  getMyAssessments: () =>
    api.get(`${BASE_URL}/my`),

  getAssessmentHistory: () =>
    api.get(`${BASE_URL}/history`),

  submitAssessment: (payload) =>
    api.post(`${BASE_URL}/submit`, payload),

  // Common
  getAssessmentById: (id) =>
    api.get(`${BASE_URL}/${id}`),

  // Manager/Admin
  getAllAssessments: () =>
    api.get(BASE_URL),

  getPendingApprovals: () =>
    api.get(`${BASE_URL}/pending-approvals`),

  approveAssessment: (payload) =>
    api.patch(`${BASE_URL}/approve`, payload),

  getStatistics: () =>
    api.get(`${BASE_URL}/statistics`)
};

export default assessmentService;