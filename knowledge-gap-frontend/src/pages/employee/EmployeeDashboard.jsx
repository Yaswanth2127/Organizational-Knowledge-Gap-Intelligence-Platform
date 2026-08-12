
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import api from "../../services/api";
import assessmentService from "../../services/assessmentService";
import { getEmployeeDashboard } from "../../services/dashboardService";

// Components
import WelcomeBanner from "../../components/employee/WelcomeBanner";
import DashboardStats from "../../components/employee/DashboardStats";
import MySkills from "../../components/employee/MySkills";
import CompetencyProgress from "../../components/employee/CompetencyProgress";
import SkillGapAnalysis from "./EmployeeSkillGapAnalysis";
import PendingAssessments from "../../components/employee/PendingAssessments";
import RecentActivity from "../../components/employee/RecentActivity";
import Notifications from "../../components/employee/Notifications";
import QuickActions from "../../components/employee/QuickActions";
import CareerGoal from "../../components/employee/CareerGoal";

export default function EmployeeDashboard() {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const [assessments, setAssessments] = useState([]);
    const [dashboardStats, setDashboardStats] = useState(null);

    const displayValue = (value, fallback = "Not Available") => {
        if (value === null || value === undefined || value === "") {
            return fallback;
        }

        return value;
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const [
                userResponse,
                assessmentResponse,
                dashboardResponse,
            ] = await Promise.all([

                api.get(`/api/users/${userId}`),

                assessmentService.getMyAssessments(),

                getEmployeeDashboard(),

            ]);

            setUser(userResponse.data);

            setAssessments(assessmentResponse.data || []);

            setDashboardStats(dashboardResponse.data);

        } catch (err) {

            console.error(err);

            setError("Unable to load dashboard.");

        } finally {

            setLoading(false);

        }

    };
    const competency = {

        score: dashboardStats?.competencyScore ?? 0,

        technical: dashboardStats?.competencyScore ?? 0,

        assessments: dashboardStats?.completedAssessments ?? 0,

        certifications: dashboardStats?.certifications ?? 0,

        learning: dashboardStats?.profileCompletion ?? 0,

    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loader2
                    size={50}
                    className="animate-spin text-indigo-600"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                        {error}
                    </div>
                )}

                <WelcomeBanner
                    user={user}
                    displayValue={displayValue}
                    profileCompletion={
                        dashboardStats?.profileCompletion ?? 0
                    }
                    competencyScore={
                        dashboardStats?.competencyScore ?? 0
                    }
                />

                <DashboardStats
                    stats={dashboardStats}
                />

                <CompetencyProgress
                    competency={competency}
                />

                <SkillGapAnalysis
                />


                <PendingAssessments
                    assessments={assessments}
                />

                <QuickActions />

            </div>
        </div>
    );
}