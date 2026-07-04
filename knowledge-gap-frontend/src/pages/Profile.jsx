import React, { useState } from 'react';
import { User, Mail, Building, Briefcase, Award, CheckCircle, Edit2 } from 'lucide-react';

export default function Profile() {
    // Milestone 1 ke mandatory fields aur static core skills map
    const [userProfile] = useState({
        fullName: "Krishna Vishwakarma",
        email: "krishna@organization.com",
        department: "Engineering",
        role: "Full Stack Developer",
        joinedDate: "July 2026"
    });

    const [skills] = useState([
        { name: "React.js / Frontend Architecture", level: "Advanced", percentage: 80 },
        { name: "Spring Boot Microservices", level: "Intermediate", percentage: 60 },
        { name: "PostgreSQL Database Design", level: "Advanced", percentage: 75 },
        { name: "Tailwind CSS & Core UI", level: "Expert", percentage: 95 }
    ]);

    // Proficiency levels color badging utility
    const getLevelBadgeColor = (level) => {
        switch (level) {
            case 'Expert': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'Advanced': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'Intermediate': return 'bg-amber-50 text-amber-700 border-amber-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6 font-sans max-w-4xl mx-auto p-2 sm:p-4">
            {/* Main Header Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-md shadow-indigo-100">
                        {userProfile.fullName.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{userProfile.fullName}</h1>
                        <p className="text-indigo-600 font-semibold text-sm flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                            <Briefcase size={14} /> {userProfile.role}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Member since {userProfile.joinedDate}</p>
                    </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl transition shadow-sm">
                    <Edit2 size={14} /> Edit Profile
                </button>
            </div>

            {/* Profile Content Layout Split */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Left Side: Identity Info Details */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 h-fit">
                    <h3 className="font-bold text-gray-900 text-sm border-b border-gray-50 pb-2">Meta Credentials</h3>

                    <div className="space-y-3.5">
                        <div className="flex items-start gap-3">
                            <Mail className="text-gray-400 shrink-0 mt-0.5" size={16} />
                            <div>
                                <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider">Corporate Email</span>
                                <span className="text-sm font-semibold text-gray-700 break-all">{userProfile.email}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Building className="text-gray-400 shrink-0 mt-0.5" size={16} />
                            <div>
                                <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider">Business Unit</span>
                                <span className="text-sm font-semibold text-gray-700">{userProfile.department}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                            <div>
                                <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider">Account Status</span>
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block mt-0.5">Verified Identity</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Skill Inventory Aggregation */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-5 border-b border-gray-50 pb-3">
                        <Award className="text-indigo-600" size={20} />
                        <h3 className="font-bold text-gray-900">Active Skill Inventory</h3>
                    </div>

                    <div className="space-y-5">
                        {skills.map((skill, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-gray-800">{skill.name}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 border rounded-md ${getLevelBadgeColor(skill.level)}`}>
                                        {skill.level}
                                    </span>
                                </div>

                                {/* Progress Bar Track UI */}
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${skill.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}