import api from './api';

export const loginUser = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const registerUser = (fullName, email, password) =>
  api.post('/api/auth/register', { fullName, email, password });