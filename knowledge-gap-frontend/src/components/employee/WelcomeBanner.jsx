import React from "react";
import { User, Edit, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomeBanner({
    user,
    displayValue,
    profileCompletion,
    competencyScore
}) {

    const navigate = useNavigate();

    return (

        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl shadow-xl overflow-hidden">

            <div className="p-8 lg:p-10 flex flex-col lg:flex-row justify-between items-center gap-10">

                {/* ======================================
                        LEFT SECTION
                ======================================= */}

                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1">

                    {/* Profile Image */}

                    <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center overflow-hidden">

                        {user?.profileImageUrl ? (

                            <img
                                src={user.profileImageUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />

                        ) : (

                            <span className="text-5xl font-bold text-indigo-600">

                                {displayValue(user?.fullName).charAt(0)}

                            </span>

                        )}

                    </div>

                    {/* User Information */}

                    <div className="text-center md:text-left">

                        <p className="text-indigo-100 font-semibold">

                            Welcome Back 👋

                        </p>

                        <h1 className="text-4xl font-bold text-white mt-2">

                            {displayValue(user?.fullName)}

                        </h1>

                        <p className="text-indigo-100 text-lg mt-2">

                            {displayValue(
                                user?.jobRoleName,
                                "Job Role Not Assigned"
                            )}

                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">

                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm text-white">

                                {displayValue(
                                    user?.departmentName,
                                    "Department Not Assigned"
                                )}

                            </span>

                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm text-white flex items-center gap-2">

                                <TrendingUp size={16} />

                                Competency {competencyScore}%

                            </span>

                        </div>

                        <p className="text-indigo-100 mt-6 max-w-xl leading-relaxed">

                            Continue improving your technical skills,
                            complete assessments, earn certifications,
                            and reduce your competency gaps through
                            personalized learning recommendations.

                        </p>

                        <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">

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

                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full lg:w-80">

                    <p className="text-indigo-100 text-sm">

                        Profile Completion

                    </p>

                    <h2 className="text-6xl font-bold text-white mt-4">

                        {profileCompletion}%

                    </h2>

                    <div className="w-full h-3 bg-white/20 rounded-full mt-6 overflow-hidden">

                        <div
                            className="bg-white h-full rounded-full"
                            style={{
                                width: `${profileCompletion}%`
                            }}
                        />

                    </div>

                    <div className="mt-8 space-y-3">

                        <div className="flex justify-between text-indigo-100">

                            <span>Email Verified</span>

                            <span>✔</span>

                        </div>

                        <div className="flex justify-between text-indigo-100">

                            <span>Profile Updated</span>

                            <span>✔</span>

                        </div>

                        <div className="flex justify-between text-indigo-100">

                            <span>Phone Number</span>

                            <span>

                                {user?.phoneNumber ? "✔" : "⚠"}

                            </span>

                        </div>

                    </div>

                    <button
                        onClick={() => navigate("/profile")}
                        className="mt-8 w-full bg-white text-indigo-700 hover:bg-gray-100 rounded-xl py-3 font-semibold transition"
                    >

                        Complete Profile

                    </button>

                </div>

            </div>

        </div>

    );

}