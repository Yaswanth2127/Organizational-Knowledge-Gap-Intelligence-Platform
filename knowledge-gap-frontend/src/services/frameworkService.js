// src/services/frameworkService.js
import api from './api';

// Fetch the active framework for the user's job role
export const getFrameworkForUser = (userId) => {
    return api.get(`/api/frameworks/user/${userId}`);
};

// Optionally, get the required skills for a framework
export const getFrameworkSkills = (frameworkId) => {
    return api.get(`/api/frameworks/${frameworkId}/skills`);
};