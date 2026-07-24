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
import SkillCategoryManagement from "./pages/SkillCategoryManagement";
import JobRoleManagement from "./pages/JobRoleManagement";
import SkillManagement from "./pages/SkillManagement";
import CompetencyFrameworkManagement from "./pages/CompetencyFrameworkManagement";
import CertificationManagement from "./pages/CertificationManagement";
import CourseManagement from "./pages/CourseManagement";
import FrameworkRequiredSkillManagement from "./pages/FrameworkRequiredSkillManagement";
import SkillGapManagement from "./pages/SkillGapManagement";

// Protected Route wrapper â€” token check karke hi andar jaane deta hai
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
                    <AdminLayout>
                        <DepartmentManagement />
                    </AdminLayout>
                </ProtectedRoute>
            }
        />
      <Route
          path="/skill-categories"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <SkillCategoryManagement />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      <Route
          path="/job-roles"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <JobRoleManagement />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      <Route
          path="/skills"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <SkillManagement />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      <Route
          path="/competency-frameworks"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <CompetencyFrameworkManagement />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      <Route
          path="/certifications"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <CertificationManagement />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      <Route
          path="/courses"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <CourseManagement />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      <Route
          path="/framework-required-skills"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <FrameworkRequiredSkillManagement />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      <Route
          path="/skill-gaps"
          element={
              <ProtectedRoute>
                  <AdminLayout>
                      <SkillGapManagement />
                  </AdminLayout>
              </ProtectedRoute>
          }
      />
      </Routes>
    </BrowserRouter>
  );
}
export default App;












