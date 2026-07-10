
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import api from "../services/api";

// Components
import WelcomeBanner from "../components/employee/WelcomeBanner";
import DashboardStats from "../components/employee/DashboardStats";
import MySkills from "../components/employee/MySkills";
import CompetencyProgress from "../components/employee/CompetencyProgress";
import SkillGapAnalysis from "../components/employee/SkillGapAnalysis";
import LearningRecommendations from "../components/employee/LearningRecommendations";
import UpcomingAssessments from "../components/employee/UpcomingAssessments";
import RecentActivity from "../components/employee/RecentActivity";
import Notifications from "../components/employee/Notifications";
import QuickActions from "../components/employee/QuickActions";
import CareerGoal from "../components/employee/CareerGoal";

export default function EmployeeDashboard() {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    /* ============================================
            Temporary Demo Data
       Replace these with API responses later
    ============================================ */

    const profileCompletion = 88;
    const competencyScore = 72;

    const dashboardStats = {
        totalSkills: 14,
        assessments: 8,
        certifications: 3,
        competencyScore: competencyScore
    };

    const mySkills = [
        {
            skill: "Java",
            current: "Advanced",
            required: "Expert",
            progress: 85,
            gap: "1 Level"
        },
        {
            skill: "Spring Boot",
            current: "Intermediate",
            required: "Advanced",
            progress: 70,
            gap: "1 Level"
        },
        {
            skill: "React",
            current: "Beginner",
            required: "Intermediate",
            progress: 45,
            gap: "1 Level"
        },
        {
            skill: "Docker",
            current: "Not Learned",
            required: "Beginner",
            progress: 10,
            gap: "Missing"
        },
        {
            skill: "SQL",
            current: "Expert",
            required: "Expert",
            progress: 100,
            gap: "Completed"
        }
    ];

    const competency = {
        score: 72,
        technical: 80,
        assessments: 70,
        certifications: 60,
        learning: 78
    };

    const learningRecommendations = [
        {
            title: "Docker Fundamentals",
            priority: "High",
            duration: "8 Hours",
            reason: "Required for Backend Developer competency."
        },
        {
            title: "AWS Cloud Practitioner",
            priority: "High",
            duration: "16 Hours",
            reason: "Cloud knowledge is missing."
        },
        {
            title: "Microservices with Spring Boot",
            priority: "Medium",
            duration: "12 Hours",
            reason: "Improve backend architecture."
        }
    ];

    const upcomingAssessments = [
        {
            title: "Java Advanced",
            date: "20 Jul 2026",
            status: "Assigned"
        },
        {
            title: "Spring Boot",
            date: "24 Jul 2026",
            status: "Assigned"
        },
        {
            title: "SQL Assessment",
            date: "28 Jul 2026",
            status: "Assigned"
        }
    ];

    const recentActivities = [
        {
            title: "Completed Java Basics Assessment",
            time: "Yesterday"
        },
        {
            title: "Manager approved SQL Skill",
            time: "2 Days Ago"
        },
        {
            title: "Started Docker Learning Path",
            time: "Last Week"
        }
    ];

    const notifications = [
        {
            message: "Spring Boot assessment assigned.",
            type: "info"
        },
        {
            message: "AWS certification expires in 30 days.",
            type: "warning"
        },
        {
            message: "Manager reviewed your latest skill update.",
            type: "success"
        }
    ];

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

            const response = await api.get(`/api/users/${userId}`);

            setUser(response.data);

        } catch (err) {

            console.error(err);

            setError("Unable to load dashboard.");

        } finally {

            setLoading(false);

        }

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

            <div className="max-w-7xl mx-auto px-6 py-8">

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-red-700">
                        {error}
                    </div>
                )}

                <WelcomeBanner
                    user={user}
                    displayValue={displayValue}
                    profileCompletion={profileCompletion}
                    competencyScore={competencyScore}
                />

                <DashboardStats
                    stats={dashboardStats}
                />

                <MySkills
                    skills={mySkills}
                />

                <CompetencyProgress
                    competency={competency}
                />

                <SkillGapAnalysis
                    skills={mySkills}
                />

                <LearningRecommendations
                    recommendations={learningRecommendations}
                />

                <UpcomingAssessments
                    assessments={upcomingAssessments}
                />

                <RecentActivity
                    activities={recentActivities}
                />

                <Notifications
                    notifications={notifications}
                />

                <QuickActions />

                <CareerGoal />

            </div>

        </div>

    );

}