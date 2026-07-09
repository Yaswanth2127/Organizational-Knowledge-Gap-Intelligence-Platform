// import React, { useEffect, useState } from "react";
// import {
//     User,
//     Mail,
//     Building2,
//     Briefcase,
//     Phone,
//     ShieldCheck,
//     Calendar,
//     Loader2
// } from "lucide-react";

// import api from "../services/api";

// export default function EmployeeDashboard() {

//     const [loading, setLoading] = useState(true);

//     const [user, setUser] = useState(null);

//     const [error, setError] = useState("");

//     const displayValue = (value, fallback = "Not Available") => {

//         if (
//             value === null ||
//             value === undefined ||
//             value === ""
//         ) {
//             return fallback;
//         }

//         return value;

//     };

//     useEffect(() => {

//         loadEmployee();

//     }, []);

//     const loadEmployee = async () => {

//         try {

//             const userId = localStorage.getItem("userId");

//             const response = await api.get(`/api/users/${userId}`);

//             setUser(response.data);

//         }
//         catch (err) {

//             console.error(err);

//             setError("Unable to load employee details.");

//         }
//         finally {

//             setLoading(false);

//         }

//     };

//     if (loading) {

//         return (

//             <div className="min-h-screen flex justify-center items-center">

//                 <Loader2
//                     size={48}
//                     className="animate-spin text-indigo-600"
//                 />

//             </div>

//         );

//     }

//     return (

// <div className="min-h-screen bg-gray-100 p-6">

//     {/* ==========================
//             Header
//     ========================== */}

//     <div className="flex justify-between items-center mb-8">

//         <div>

//             <h1 className="text-4xl font-bold text-gray-800">

//                 Employee Dashboard

//             </h1>

//             <p className="text-gray-500 mt-2">

//                 View your profile, account information and personal details.

//             </p>

//         </div>

//         <div className="text-right">

//             <p className="text-gray-500 text-sm">

//                 Welcome Back

//             </p>

//             <h3 className="font-semibold text-gray-800 mt-1">

//                 {displayValue(user?.fullName)}

//             </h3>

//         </div>

//     </div>

//     {error && (

//         <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">

//             {error}

//         </div>

//     )}
//     {/* ==========================
//         Welcome Card
// ========================== */}

// <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl p-8 text-white shadow-xl">

//     <div className="flex flex-col md:flex-row justify-between items-center gap-6">

//         <div className="flex items-center gap-5">

//             <div className="w-24 h-24 rounded-full bg-white text-indigo-700 flex items-center justify-center text-4xl font-bold shadow-lg">

//                 {displayValue(user?.fullName)?.charAt(0)}

//             </div>

//             <div>

//                 <h2 className="text-3xl font-bold">

//                     Welcome, {displayValue(user?.fullName)}

//                 </h2>

//                 <p className="mt-2 text-indigo-100">

//                     Manage your profile and keep your personal information updated.

//                 </p>

//             </div>

//         </div>

//         <div>

//             <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">

//                 View Profile

//             </button>

//         </div>

//     </div>

// </div>

// {/* ==========================
//         Profile Summary
// ========================== */}

// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

//     <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

//         <User className="text-indigo-600 mb-4" size={30}/>

//         <p className="text-sm text-gray-500">

//             Full Name

//         </p>

//         <h3 className="text-lg font-bold text-gray-800 mt-2">

//             {displayValue(user?.fullName)}

//         </h3>

//     </div>

//     <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

//         <Mail className="text-green-600 mb-4" size={30}/>

//         <p className="text-sm text-gray-500">

//             Email

//         </p>

//         <h3 className="text-lg font-bold text-gray-800 mt-2 break-all">

//             {displayValue(user?.email)}

//         </h3>

//     </div>

//     <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

//         <Building2 className="text-orange-600 mb-4" size={30}/>

//         <p className="text-sm text-gray-500">

//             Department

//         </p>

//         <h3 className="text-lg font-bold text-gray-800 mt-2">

//             {displayValue(user?.departmentName, "Not Assigned")}

//         </h3>

//     </div>

//     <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

//         <Briefcase className="text-purple-600 mb-4" size={30}/>

//         <p className="text-sm text-gray-500">

//             Job Role

//         </p>

//         <h3 className="text-lg font-bold text-gray-800 mt-2">

//             {displayValue(user?.jobRoleName, "Not Assigned")}

//         </h3>

//     </div>

// </div>

// {/* ==========================
//         Account Overview
// ========================== */}

// <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

//     <div className="mb-6">

//         <h2 className="text-2xl font-bold text-gray-800">

//             Account Overview

//         </h2>

//         <p className="text-sm text-gray-500 mt-1">

//             Current account information.

//         </p>

//     </div>

//     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

//         <div className="bg-green-50 border border-green-100 rounded-xl p-5">

//             <ShieldCheck
//                 className="text-green-600 mb-3"
//                 size={28}
//             />

//             <p className="text-sm text-gray-500">

//                 Account Status

//             </p>

//             <h3 className="text-xl font-bold text-green-700 mt-2">

//                 {user?.isActive ? "Active" : "Inactive"}

//             </h3>

//         </div>

//         <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">

//             <Mail
//                 className="text-indigo-600 mb-3"
//                 size={28}
//             />

//             <p className="text-sm text-gray-500">

//                 Email Verification

//             </p>

//             <h3 className="text-xl font-bold text-indigo-700 mt-2">

//                 {user?.emailVerified ? "Verified" : "Pending"}

//             </h3>

//         </div>

//         <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">

//             <Phone
//                 className="text-orange-600 mb-3"
//                 size={28}
//             />

//             <p className="text-sm text-gray-500">

//                 Phone Number

//             </p>

//             <h3 className="text-lg font-bold text-orange-700 mt-2">

//                 {displayValue(user?.phoneNumber, "Not Added")}

//             </h3>

//         </div>

//         <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">

//             <Calendar
//                 className="text-purple-600 mb-3"
//                 size={28}
//             />

//             <p className="text-sm text-gray-500">

//                 Joined

//             </p>

//             <h3 className="text-lg font-bold text-purple-700 mt-2">

//                 {displayValue(user?.createdAt, "Not Available")}

//             </h3>

//         </div>

//     </div>

// </div>
// {/* ==========================
//         Personal Information
// ========================== */}

// <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

//     <div className="mb-6">

//         <h2 className="text-2xl font-bold text-gray-800">

//             Personal Information

//         </h2>

//         <p className="text-sm text-gray-500 mt-1">

//             Your profile information available in the organization.

//         </p>

//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         <div className="space-y-5">

//             <div>

//                 <p className="text-sm text-gray-500">

//                     Full Name

//                 </p>

//                 <h4 className="font-semibold text-gray-800 mt-1">

//                     {displayValue(user?.fullName)}

//                 </h4>

//             </div>

//             <div>

//                 <p className="text-sm text-gray-500">

//                     Email Address

//                 </p>

//                 <h4 className="font-semibold text-gray-800 mt-1">

//                     {displayValue(user?.email)}

//                 </h4>

//             </div>

//             <div>

//                 <p className="text-sm text-gray-500">

//                     Phone Number

//                 </p>

//                 <h4 className="font-semibold text-gray-800 mt-1">

//                     {displayValue(user?.phoneNumber, "Not Added")}

//                 </h4>

//             </div>

//         </div>

//         <div className="space-y-5">

//             <div>

//                 <p className="text-sm text-gray-500">

//                     Department

//                 </p>

//                 <h4 className="font-semibold text-gray-800 mt-1">

//                     {displayValue(user?.departmentName, "Not Assigned")}

//                 </h4>

//             </div>

//             <div>

//                 <p className="text-sm text-gray-500">

//                     Job Role

//                 </p>

//                 <h4 className="font-semibold text-gray-800 mt-1">

//                     {displayValue(user?.jobRoleName, "Not Assigned")}

//                 </h4>

//             </div>

//             <div>

//                 <p className="text-sm text-gray-500">

//                     Manager

//                 </p>

//                 <h4 className="font-semibold text-gray-800 mt-1">

//                     {displayValue(user?.managerName, "Not Assigned")}

//                 </h4>

//             </div>

//         </div>

//     </div>

// </div>


// {/* ==========================
//         Quick Actions
// ========================== */}

// <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

//     <h2 className="text-2xl font-bold text-gray-800 mb-6">

//         Quick Actions

//     </h2>

//     <div className="grid md:grid-cols-2 gap-5">

//         <button className="border border-indigo-200 rounded-xl p-5 hover:bg-indigo-50 transition text-left">

//             <User
//                 className="text-indigo-600 mb-3"
//                 size={28}
//             />

//             <h3 className="font-semibold text-gray-800">

//                 Edit Profile

//             </h3>

//             <p className="text-sm text-gray-500 mt-1">

//                 Update your profile information.

//             </p>

//         </button>

//         <button className="border border-green-200 rounded-xl p-5 hover:bg-green-50 transition text-left">

//             <Mail
//                 className="text-green-600 mb-3"
//                 size={28}
//             />

//             <h3 className="font-semibold text-gray-800">

//                 Verify Email

//             </h3>

//             <p className="text-sm text-gray-500 mt-1">

//                 Manage your email verification status.

//             </p>

//         </button>

//     </div>

// </div>


// {/* ==========================
//         Coming Soon
// ========================== */}

// <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl shadow-lg p-8 mt-8 text-white">

//     <h2 className="text-2xl font-bold">

//         More Features Coming Soon 🚀

//     </h2>

//     <p className="mt-3 text-indigo-100">

//         Your dashboard will soon include personal skills,
//         certifications, assessments, competency progress,
//         learning recommendations, and profile completion tracking.

//     </p>

// </div>

// </div>

// );

// }






















import React, { useEffect, useState } from "react";
import {
    Loader2,
    BookOpen,
    Brain,
    GraduationCap,
    ClipboardCheck,
    Target,
    Bell,
    TrendingUp,
    ArrowRight
} from "lucide-react";

import api from "../services/api";

export default function EmployeeDashboard() {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [error, setError] = useState("");

    const dashboardCards = [
        {
            title: "Learning Progress",
            value: "78%",
            icon: TrendingUp,
            color: "bg-indigo-500"
        },
        {
            title: "Assessments",
            value: 8,
            icon: ClipboardCheck,
            color: "bg-green-500"
        },
        {
            title: "Pending Tasks",
            value: 2,
            icon: Brain,
            color: "bg-orange-500"
        },
        {
            title: "Recommended Courses",
            value: 5,
            icon: BookOpen,
            color: "bg-purple-500"
        }
    ];
    const skillGap = [
        {
            skill: "Java",
            status: "Completed"
        },
        {
            skill: "Spring Boot",
            status: "Completed"
        },
        {
            skill: "React",
            status: "Need Improvement"
        },
        {
            skill: "Docker",
            status: "Missing"
        },
        {
            skill: "AWS",
            status: "Missing"
        }
    ];    const learningRecommendations = [
        "Docker Fundamentals",
        "AWS Cloud Practitioner",
        "Microservices using Spring Boot",
        "Kubernetes Basics",
        "System Design Fundamentals"
    ];
        const upcomingAssessments = [
        {
            title: "Java Advanced",
            date: "20 Jul 2026"
        },
        {
            title: "Spring Boot",
            date: "24 Jul 2026"
        },
        {
            title: "SQL Assessment",
            date: "28 Jul 2026"
        }
    ];
        const recentActivities = [
        {
            title: "Completed Java Basics",
            time: "Yesterday"
        },
        {
            title: "Completed SQL Assessment",
            time: "2 Days Ago"
        },
        {
            title: "Started Docker Learning Path",
            time: "Last Week"
        }
    ];
        const notifications = [
        "Spring Boot assessment assigned.",
        "AWS certification expires in 30 days.",
        "Manager reviewed your latest skill update.",
        "New learning resources are available."
    ];
        const displayValue = (value, fallback = "Not Available") => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return fallback;
        }

        return value;

    };
        useEffect(() => {

        loadEmployee();

    }, []);

    const loadEmployee = async () => {

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
                    size={48}
                    className="animate-spin text-indigo-600"
                />

            </div>

        );

    }
    return (

<div className="min-h-screen bg-gray-100 p-6">

    {/* ==========================
            Header
    ========================== */}

    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">

        <div>

            <h1 className="text-4xl font-bold text-gray-800">

                Employee Dashboard

            </h1>

            <p className="text-gray-500 mt-2">

                Track your learning progress, competency, assessments and recommendations.

            </p>

        </div>

        <div className="text-right">

            <p className="text-sm text-gray-500">

                Welcome Back 👋

            </p>

            <h2 className="text-2xl font-bold text-gray-800">

                {displayValue(user?.fullName)}

            </h2>

        </div>

    </div>

    {error && (

        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

            {error}

        </div>

    )}

    {/* ==========================
            Welcome Banner
    ========================== */}

    <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl shadow-xl overflow-hidden">

        <div className="p-8 flex flex-col lg:flex-row justify-between items-center">

            <div>

                <p className="text-indigo-100 text-sm font-semibold">

                    Continue Your Learning Journey

                </p>

                <h2 className="text-4xl font-bold text-white mt-2">

                    Welcome, {displayValue(user?.fullName)}

                </h2>

                <div className="flex flex-wrap gap-3 mt-5">

                    <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm">

                        {displayValue(user?.departmentName, "Department Not Assigned")}

                    </span>

                    <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm">

                        {displayValue(user?.jobRoleName, "Role Not Assigned")}

                    </span>

                </div>

                <p className="text-indigo-100 mt-6 max-w-2xl leading-relaxed">

                    Improve your competency by completing assessments,
                    learning recommended technologies and closing your
                    knowledge gaps.

                </p>

            </div>

            <div className="mt-8 lg:mt-0">

                <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center min-w-[220px]">

                    <p className="text-indigo-100 text-sm">

                        Overall Learning Progress

                    </p>

                    <h1 className="text-6xl font-bold text-white mt-3">

                        78%

                    </h1>

                    <div className="w-full h-3 bg-white/20 rounded-full mt-5 overflow-hidden">

                        <div
                            className="h-full bg-white rounded-full"
                            style={{ width: "78%" }}
                        />

                    </div>

                </div>

            </div>

        </div>

    </div>

    {/* ==========================
            Dashboard Statistics
    ========================== */}

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        {dashboardCards.map((card, index) => {

            const Icon = card.icon;

            return (

                <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-sm text-gray-500">

                                {card.title}

                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-3">

                                {card.value}

                            </h2>

                        </div>

                        <div className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center`}>

                            <Icon
                                size={28}
                                className="text-white"
                            />

                        </div>

                    </div>

                </div>

            );

        })}

    </div>    {/* ==========================
            Skill Gap Analysis
    ========================== */}

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Skill Gap Analysis

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Skills required for your role and current progress.

                    </p>

                </div>

                <Target
                    className="text-indigo-600"
                    size={34}
                />

            </div>

            <div className="space-y-5">

                {skillGap.map((item, index) => (

                    <div
                        key={index}
                        className="flex justify-between items-center border-b pb-4 last:border-none"
                    >

                        <div>

                            <h4 className="font-semibold text-gray-800">

                                {item.skill}

                            </h4>

                        </div>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                            ${
                                item.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : item.status === "Need Improvement"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >

                            {item.status}

                        </span>

                    </div>

                ))}

            </div>

        </div>

        {/* ==========================
                Competency Progress
        ========================== */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Competency

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Backend Developer Framework

                    </p>

                </div>

                <Brain
                    className="text-purple-600"
                    size={34}
                />

            </div>

            <div className="mt-8 text-center">

                <h1 className="text-6xl font-bold text-indigo-600">

                    72%

                </h1>

                <p className="text-gray-500 mt-2">

                    Overall Competency

                </p>

            </div>

            <div className="mt-8">

                <div className="w-full bg-gray-200 rounded-full h-4">

                    <div
                        className="bg-indigo-600 h-4 rounded-full"
                        style={{ width: "72%" }}
                    />

                </div>

            </div>

            <div className="mt-8 space-y-4">

                <div className="flex justify-between">

                    <span className="text-gray-600">

                        Technical Skills

                    </span>

                    <span className="font-semibold">

                        80%

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-gray-600">

                        Assessments

                    </span>

                    <span className="font-semibold">

                        65%

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-gray-600">

                        Certifications

                    </span>

                    <span className="font-semibold">

                        70%

                    </span>

                </div>

            </div>

        </div>

    </div>    {/* ==========================
            Learning Recommendations
            Upcoming Assessments
            Recent Activity
    ========================== */}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* ==========================
                Learning Recommendations
        ========================== */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Learning Recommendations

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Suggested courses to improve your skills.

                    </p>

                </div>

                <BookOpen
                    className="text-indigo-600"
                    size={30}
                />

            </div>

            <div className="space-y-4">

                {learningRecommendations.map((course, index) => (

                    <div
                        key={index}
                        className="flex items-center justify-between border rounded-xl p-4 hover:bg-indigo-50 transition"
                    >

                        <div>

                            <h4 className="font-semibold text-gray-800">

                                {course}

                            </h4>

                            <p className="text-xs text-gray-500 mt-1">

                                Recommended for your competency.

                            </p>

                        </div>

                        <ArrowRight
                            className="text-indigo-500"
                            size={20}
                        />

                    </div>

                ))}

            </div>

        </div>

        {/* ==========================
                Upcoming Assessments
        ========================== */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Upcoming Assessments

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Complete them before the deadline.

                    </p>

                </div>

                <ClipboardCheck
                    className="text-green-600"
                    size={30}
                />

            </div>

            <div className="space-y-4">

                {upcomingAssessments.map((assessment, index) => (

                    <div
                        key={index}
                        className="rounded-xl border border-gray-100 bg-green-50 p-4"
                    >

                        <h4 className="font-semibold text-gray-800">

                            {assessment.title}

                        </h4>

                        <p className="text-sm text-gray-500 mt-1">

                            Due Date

                        </p>

                        <p className="font-semibold text-green-700 mt-1">

                            {assessment.date}

                        </p>

                    </div>

                ))}

            </div>

        </div>

        {/* ==========================
                Recent Learning Activity
        ========================== */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Recent Activity

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Your latest learning progress.

                    </p>

                </div>

                <GraduationCap
                    className="text-purple-600"
                    size={30}
                />

            </div>

            <div className="space-y-5">

                {recentActivities.map((activity, index) => (

                    <div
                        key={index}
                        className="flex gap-4"
                    >

                        <div className="w-3 h-3 rounded-full bg-indigo-600 mt-2"/>

                        <div>

                            <h4 className="font-semibold text-gray-800">

                                {activity.title}

                            </h4>

                            <p className="text-sm text-gray-500 mt-1">

                                {activity.time}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    </div>    {/* ==========================
            Notifications
            Quick Actions
            Career Goal
    ========================== */}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* ==========================
                Notifications
        ========================== */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Notifications

                    </h2>

                    <p className="text-sm text-gray-500 mt-1">

                        Latest updates from your organization.

                    </p>

                </div>

                <Bell
                    className="text-orange-500"
                    size={30}
                />

            </div>

            <div className="space-y-4">

                {notifications.map((notification, index) => (

                    <div
                        key={index}
                        className="flex gap-3 p-4 rounded-xl border border-gray-100 hover:bg-orange-50 transition"
                    >

                        <div className="w-3 h-3 rounded-full bg-orange-500 mt-2"/>

                        <p className="text-gray-700">

                            {notification}

                        </p>

                    </div>

                ))}

            </div>

        </div>

        {/* ==========================
                Quick Actions
        ========================== */}

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

                Quick Actions

            </h2>

            <div className="grid grid-cols-2 gap-4">

                <button className="rounded-xl border border-indigo-200 p-5 hover:bg-indigo-50 transition">

                    <BookOpen
                        className="text-indigo-600 mx-auto mb-3"
                        size={28}
                    />

                    <p className="font-semibold">

                        Learning Path

                    </p>

                </button>

                <button className="rounded-xl border border-green-200 p-5 hover:bg-green-50 transition">

                    <ClipboardCheck
                        className="text-green-600 mx-auto mb-3"
                        size={28}
                    />

                    <p className="font-semibold">

                        Assessments

                    </p>

                </button>

                <button
                    disabled
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5 cursor-not-allowed opacity-70"
                >

                    <Brain
                        className="text-gray-500 mx-auto mb-3"
                        size={28}
                    />

                    <p className="font-semibold">

                        AI Recommendation

                    </p>

                    <p className="text-xs text-gray-500 mt-1">

                        Coming Soon

                    </p>

                </button>

                <button
                    disabled
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5 cursor-not-allowed opacity-70"
                >

                    <Target
                        className="text-gray-500 mx-auto mb-3"
                        size={28}
                    />

                    <p className="font-semibold">

                        Request Training

                    </p>

                    <p className="text-xs text-gray-500 mt-1">

                        Coming Soon

                    </p>

                </button>

            </div>

        </div>

        {/* ==========================
                Career Goal
        ========================== */}

        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 rounded-2xl shadow-xl text-white p-8">

            <h2 className="text-3xl font-bold">

                Keep Growing 🚀

            </h2>

            <p className="text-indigo-100 mt-5 leading-relaxed">

                You're making steady progress toward becoming an
                expert Backend Developer.

                Continue learning consistently and complete the
                recommended assessments to strengthen your competency.

            </p>

            <div className="mt-8">

                <div className="flex justify-between text-sm">

                    <span>

                        Career Goal Progress

                    </span>

                    <span>

                        72%

                    </span>

                </div>

                <div className="w-full h-3 bg-white/20 rounded-full mt-2 overflow-hidden">

                    <div
                        className="bg-white h-full rounded-full"
                        style={{ width: "72%" }}
                    />

                </div>

            </div>

            <button className="mt-8 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">

                Continue Learning

            </button>

        </div>

    </div>

</div>

);
}