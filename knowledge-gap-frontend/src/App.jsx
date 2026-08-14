import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import OAuthSuccess from "./pages/auth/OAuthSuccess";

import Profile from "./pages/shared/Profile";
import EditProfile from "./pages/shared/EditProfile";
import NotFound from "./pages/shared/NotFound";

import AdminDashboard from "./pages/admin/AdminDashboard";
import HRDashboard from "./pages/admin/HRDashboard";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import ManageEmployeeSkills from "./pages/admin/EmployeeSkills";
import SkillCategoryManagement from "./pages/admin/SkillCategoryManagement";
import JobRoleManagement from "./pages/admin/JobRoleManagement";
import SkillManagement from "./pages/admin/SkillManagement";
import CompetencyFrameworkManagement from "./pages/admin/CompetencyFrameworkManagement";
import CertificationManagement from "./pages/admin/CertificationManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import FrameworkRequiredSkillManagement from "./pages/admin/FrameworkRequiredSkillManagement";
import SkillGapManagement from "./pages/admin/SkillGapManagement";
import ManagementKnowledgeArticle
    from "./pages/admin/ManagementKnowledgeArticle";
import AdminKnowledgeSessions from "./pages/admin/AdminKnowledgeSessions";

import RoleAssignment from "./pages/admin/RoleAssignment";
import AdminMentorshipMatch from "./pages/admin/AdminMentorshipMatch";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import SkillAssessment from "./pages/employee/SkillAssessment";
import EmployeeSkillGapAnalysis from "./pages/employee/EmployeeSkillGapAnalysis";
import AIRecommendation from "./pages/employee/AIRecommendation";
import LearningPath from "./pages/employee/LearningPath";
import EmployeeCertifications from "./pages/employee/EmployeeCertifications";
import EmployeeSkills from "./pages/employee/EmployeeSkills";
import EmployeeRatings from "./pages/employee/EmployeeRatings";
import KnowledgeArticles from "./pages/employee/KnowledgeArticles";
import ExpertDirectory from "./pages/employee/ExpertDirectory";
import KnowledgeSessions from "./pages/employee/KnowledgeSessions";
import MentorshipMatch from "./pages/employee/MentorshipMatch";


import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import WorkspaceLayout from "./layouts/WorkspaceLayout";


import TakeAssessment from "./pages/employee/TakeAssessment";
import AssessmentHistory from "./pages/employee/AssessmentHistory";

import PendingApprovals from "./pages/admin/PendingApprovals";
import AssessmentStatistics from "./pages/admin/AssessmentStatistics";


import DashboardRedirect from "./pages/DashboardRedirect";
// Protected Route wrapper â€” token check karke hi andar jaane deta hai


import Notifications from "./pages/notifications/Notifications";
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
                <Route
                    path="/employee/learning-path"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <LearningPath />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <AdminDashboard />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/hr/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <HRDashboard />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employee/dashboard"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <EmployeeDashboard />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <WorkspaceLayout>
                                <Profile />
                            </WorkspaceLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/assessment"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <SkillAssessment />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/employee-skills"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <ManageEmployeeSkills />
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
                <Route
                    path="/employee-skill-gap-analysis"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <EmployeeSkillGapAnalysis />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ai-recommendations"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <AIRecommendation />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-courses"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <NotFound />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-certifications"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <EmployeeCertifications />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/assessment"
                    element={
                        <ProtectedRoute role="EMPLOYEE">
                            <EmployeeLayout>
                                <SkillAssessment />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/assessment/take/:assessmentId"
                    element={
                        <ProtectedRoute role="EMPLOYEE">
                            <EmployeeLayout>
                                <TakeAssessment />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/assessment/history"
                    element={
                        <ProtectedRoute role="EMPLOYEE">
                            <EmployeeLayout>
                                <AssessmentHistory />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/assessment/pending-approvals"
                    element={
                        <ProtectedRoute
                            roles={["HR_SPECIALIST", "MANAGER"]}
                        >
                            <AdminLayout>
                                <PendingApprovals />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/assessment/statistics"
                    element={
                        <ProtectedRoute
                            roles={["HR_SPECIALIST", "MANAGER"]}
                        >
                            <AdminLayout>
                                <AssessmentStatistics />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/skills"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <EmployeeSkills />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/ratings"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <EmployeeRatings />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <WorkspaceLayout>
                                <Notifications />
                            </WorkspaceLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="employee/knowledge-articles"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <KnowledgeArticles />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/knowledge-articles"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <ManagementKnowledgeArticle />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/expert-directory"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <ExpertDirectory />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={<DashboardRedirect />}
                />
                <Route
                    path="/role-assignment"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <RoleAssignment />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/knowledge-sessions"
                    element={
                        <ProtectedRoute>
                            <EmployeeLayout>
                                <KnowledgeSessions />
                            </EmployeeLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/mentorship"
                    element={
                        <ProtectedRoute>
                            <WorkspaceLayout>
                                <MentorshipMatch />
                            </WorkspaceLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/knowledge-sessions"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <AdminKnowledgeSessions />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/mentorship"
                    element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <AdminMentorshipMatch />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;














