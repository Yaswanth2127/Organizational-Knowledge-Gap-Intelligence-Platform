import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminLayout from './layouts/AdminLayout';
import SkillAssessment from "./pages/SkillAssessment";
import NotFound from "./pages/NotFound";
import EditProfile from "./pages/EditProfile";
import EmployeeSkills from "./pages/EmployeeSkills";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DepartmentManagement from "./pages/DepartmentManagement";
import OAuthSuccess from "./pages/OAuthSuccess";

// Protected Route wrapper — token check karke hi andar jaane deta hai
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/oauth-success"
            element={<OAuthSuccess />}
        />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><AdminLayout><Profile /></AdminLayout></ProtectedRoute>
        } />
        <Route path="/assessment" element={
          <ProtectedRoute><AdminLayout><SkillAssessment /></AdminLayout></ProtectedRoute>
        } />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/employee-skills"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <EmployeeSkills />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      <Route
          path="/departments"
          element={
              <ProtectedRoute allowedRoles={["SYS_ADMIN", "HR_SPECIALIST"]}>
                  <DepartmentManagement />
              </ProtectedRoute>
          }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;