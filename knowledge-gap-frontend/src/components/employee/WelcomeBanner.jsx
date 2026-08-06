import React from "react";
import { User, Edit, TrendingUp, Building2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomeBanner({
    user,
    displayValue,
    profileCompletion,
    competencyScore
}) {

    const navigate = useNavigate();
    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
                ? "Good Afternoon"
                : "Good Evening";

    return (

        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-6 lg:p-7 flex flex-col lg:flex-row justify-between items-center gap-6">

                {/* ======================================
                        LEFT SECTION
                ======================================= */}

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1">

                    {/* Profile Image */}

                    <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden">

                        {user?.profileImageUrl ? (

                            <img
                                src={user.profileImageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />

                        ) : (

                            <span  className="text-3xl font-bold text-indigo-600">

                                {displayValue(user?.fullName).charAt(0)}

                            </span>

                        )}

                    </div>

                    {/* User Information */}

                    <div className="text-center md:text-left">

                        <p className="text-indigo-100 text-sm font-semibold uppercase tracking-wide">
                            {greeting}, Welcome 👋
                        </p>

                        <h1 className="text-3xl lg:text-4xl font-bold text-white mt-1">

                            {displayValue(user?.fullName)}

                        </h1>

                        <div className="mt-3 flex flex-col gap-2 text-sm">

                            <div className="flex items-center gap-2 text-indigo-100">

                                <User size={17} />

                                {displayValue(user?.jobRoleName)}

                            </div>



                            <div className="flex items-center gap-2 text-indigo-100">

                                <Mail size={17} />

                                {displayValue(user?.email)}

                            </div>

                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">

                            <span className="bg-white/20 px-3 py-1.5 rounded-full text-xs text-white">

                                {displayValue(
                                    user?.departmentName,
                                    "Department Not Assigned"
                                )}

                            </span>

                            <span className="bg-white/20 px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-2">

                                <TrendingUp size={16} />

                                Competency {competencyScore}%

                            </span>

                        </div>

                        <p className="text-indigo-100 text-sm mt-4 max-w-lg leading-6">

                            Continue improving your technical skills,
                            complete assessments, earn certifications,
                            and reduce your competency gaps through
                            personalized learning recommendations.

                        </p>

                        <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">

                            <button
                                onClick={() => navigate("/profile")}
                                className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition flex items-center gap-2"
                            >

                                <User size={18} />

                                View Profile

                            </button>

                            <button
                                onClick={() => navigate("/edit-profile")}
                                className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center gap-2"
                            >

                                <Edit size={18} />

                                Edit Profile

                            </button>

                        </div>

                    </div>

                </div>

                {/* ======================================
                        RIGHT SECTION
                ======================================= */}

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 w-full lg:w-72">

                    <p className="text-indigo-100 text-sm">

                        Profile Completion

                    </p>

                    <h2 className="text-5xl font-bold text-white mt-3">

                        {profileCompletion}%

                    </h2>

                    <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">

                        <div
                            className="bg-white h-full rounded-full"
                            style={{
                                width: `${profileCompletion}%`
                            }}
                        />

                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">

                        <div className="bg-white/10 rounded-xl p-3">
                            <p className="text-xs text-indigo-200">Employee ID</p>
                            <h3 className="text-white font-bold mt-1">{user?.id}</h3>
                        </div>

                        <div className="bg-white/10 rounded-xl p-3">
                            <p className="text-xs text-indigo-200">Department</p>
                            <h3 className="text-white font-bold mt-1">
                                {displayValue(user?.departmentName)}
                            </h3>
                        </div>

                        <div className="bg-white/10 rounded-xl p-3">
                            <p className="text-xs text-indigo-200">Role</p>
                            <h3 className="text-white font-bold mt-1">
                                {displayValue(user?.jobRoleName)}
                            </h3>
                        </div>

                        <div className="bg-white/10 rounded-xl p-3">
                            <p className="text-xs text-indigo-200">Competency</p>
                            <h3 className="text-white font-bold mt-1">
                                {competencyScore}%
                            </h3>
                        </div>

                    </div>

                    <button
                        onClick={() => navigate("/profile")}
                       className="mt-6 w-full bg-white text-indigo-700 hover:bg-gray-100 rounded-xl py-2.5 font-semibold transition"
                    >

                        Complete Profile

                    </button>

                </div>

            </div>

        </div>

    );

}