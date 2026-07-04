import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminLayout from './layouts/AdminLayout';
import SkillAssessment from "./pages/SkillAssessment";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Root Redirect (Sabse pehle yeh chalega aur user ko /login par bhejega) */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2. Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 3. Private Portal Area (Layout Wrapper) */}
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/profile" element={<AdminLayout><Profile /></AdminLayout>} />
        <Route path="/assessment" element={<AdminLayout><SkillAssessment /></AdminLayout>} />

        {/* 4. Fallbacks & Error Handlers */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;