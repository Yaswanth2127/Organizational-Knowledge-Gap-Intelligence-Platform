import api from './api';

export const loginUser = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const sendOTP = (fullName, email, password) =>
  api.post('/api/auth/send-otp', { fullName, email, password });

export const verifyOTP = (email, otp) =>
  api.post('/api/auth/verify-otp', { email, otp });

export const resendOTP = (email) =>
  api.post('/api/auth/resend-otp', { email });

export const sendPasswordResetOTP = (email) =>
  api.post('/api/auth/forgot-password/send-otp', { email });
 
export const resendPasswordResetOTP = (email) =>
  api.post('/api/auth/forgot-password/resend-otp', { email });

export const resetPassword = (email, otp, password) =>
  api.post('/api/auth/forgot-password/reset', { email, otp, password });