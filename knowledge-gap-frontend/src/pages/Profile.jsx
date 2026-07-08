
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import {
    Mail,
    Phone,
    Building2,
    Briefcase,
    User,
    ShieldCheck,
    Calendar,
    Edit2,
    Award,
    Loader2
} from "lucide-react";

export default function Profile() {

    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const roleNames = {
        SYS_ADMIN: "System Administrator",
        HR_SPECIALIST: "HR Specialist",
        EMPLOYEE: "Employee"
    };
    const role =
        roleNames[localStorage.getItem("role")] ||
        localStorage.getItem("role");

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

        const fetchProfile = async () => {

            try {

                const userId = localStorage.getItem("userId");

                const response = await api.get(`/api/users/${userId}`);

                setUserProfile(response.data);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <Loader2
                    className="animate-spin text-indigo-600"
                    size={45}
                />

            </div>

        );

    }

    return (

<div className="max-w-7xl mx-auto p-6 space-y-6">

    {/* ===========================
            PROFILE HEADER
    ============================ */}

    <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl shadow-xl overflow-hidden">

        <div className="p-8 flex flex-col lg:flex-row justify-between items-center">

            <div className="flex items-center gap-6">

                <div className="w-28 h-28 rounded-3xl overflow-hidden bg-white shadow-lg flex items-center justify-center">

                    {userProfile.profileImageUrl ? (

                        <img
                            src={userProfile.profileImageUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />

                    ) : (

                        <span className="text-5xl font-bold text-indigo-600">

                            {userProfile.fullName.charAt(0)}

                        </span>

                    )}

                </div>

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        {displayValue(userProfile.fullName)}

                    </h1>

                    <p className="text-indigo-100 mt-2">

                        {displayValue(userProfile.jobRoleName)}

                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">

            {/* Department */}

            <span className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-sm">

                {displayValue(userProfile.departmentName)}

            </span>

            {/* Role */}

            <span className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-sm">

                {role}

            </span>

            {/* Status */}

            <span
                className={`px-3 py-1 rounded-full text-sm ${
                    userProfile.isActive
                        ? "bg-green-500/20 text-green-100"
                        : "bg-red-500/20 text-red-100"
                }`}
            >

                {userProfile.isActive ? "Active" : "Inactive"}

            </span>

        </div>

                </div>

            </div>

            <div className="mt-6 lg:mt-0">

                <button

                    onClick={() => navigate("/edit-profile")}

                    className="flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"

                >

                    <Edit2 size={18} />

                    Edit Profile

                </button>

            </div>

        </div>

    </div>

    {/* ===========================
            PROFILE OVERVIEW
    ============================ */}

    <div className="grid lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <User
                className="text-indigo-600 mb-4"
                size={28}
            />

            <p className="text-sm text-gray-500">

                Full Name

            </p>

            <h3 className="font-bold text-gray-800 mt-2">

                {displayValue(userProfile.fullName)}

            </h3>

        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <Mail
                className="text-green-600 mb-4"
                size={28}
            />

            <p className="text-sm text-gray-500">

                Email Address

            </p>

            <h3 className="font-bold text-gray-800 mt-2 break-all">

                {displayValue(userProfile.email)}

            </h3>

        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <Building2
                className="text-orange-600 mb-4"
                size={28}
            />

            <p className="text-sm text-gray-500">

                Department

            </p>

            <h3 className="font-bold text-gray-800 mt-2">

                {displayValue(userProfile.departmentName)}

            </h3>

        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <Briefcase
                className="text-purple-600 mb-4"
                size={28}
            />

            <p className="text-sm text-gray-500">

                Job Role

            </p>

            <h3 className="font-bold text-gray-800 mt-2">

                {displayValue(userProfile.jobRoleName)}

            </h3>

        </div>

    </div>
    {/* ===========================
        ACCOUNT SUMMARY
=========================== */}

<div className="grid lg:grid-cols-2 gap-6">

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <div className="flex items-center gap-3 mb-6">

            <ShieldCheck
                className="text-indigo-600"
                size={24}
            />

            <h2 className="text-xl font-bold text-gray-800">

                Account Summary

            </h2>

        </div>

        <div className="grid grid-cols-2 gap-y-5">

            <div>

                <p className="text-sm text-gray-500">

                    Account Status

                </p>

                <h4 className="font-semibold mt-1">

                    {userProfile.isActive ? (

                        <span className="text-green-600">

                            ● Active

                        </span>

                    ) : (

                        <span className="text-red-600">

                            ● Inactive

                        </span>

                    )}

                </h4>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Email Verification

                </p>

                <h4 className="font-semibold mt-1">

                    {userProfile.emailVerified ? (

                        <span className="text-green-600">

                            Verified

                        </span>

                    ) : (

                        <span className="text-orange-600">

                            Pending

                        </span>

                    )}

                </h4>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Department

                </p>

                <h4 className="font-semibold mt-1">

                    {displayValue(userProfile.departmentName)}

                </h4>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Job Role

                </p>

                <h4 className="font-semibold mt-1">

                    {displayValue(userProfile.jobRoleName)}

                </h4>

            </div>

        </div>

    </div>



    {/* ===========================
        PROFESSIONAL INFORMATION
    =========================== */}

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <div className="flex items-center gap-3 mb-6">

            <Briefcase
                className="text-purple-600"
                size={24}
            />

            <h2 className="text-xl font-bold text-gray-800">

                Professional Information

            </h2>

        </div>

        <div className="space-y-5">

            <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">

                    Department

                </span>

                <span className="font-semibold">

                    {displayValue(userProfile.departmentName)}

                </span>

            </div>

            <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">

                    Job Role

                </span>

                <span className="font-semibold">

                    {displayValue(userProfile.jobRoleName)}

                </span>

            </div>

            <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">

                    Manager

                </span>

                <span className="font-semibold">

                    {displayValue(userProfile.managerName)}

                </span>

            </div>

            <div className="flex justify-between">

                <span className="text-gray-500">

                    Employee Status

                </span>

                <span className="font-semibold">

                    {userProfile.isActive ? "Active" : "Inactive"}

                </span>

            </div>

        </div>

    </div>

</div>



{/* ===========================
        CONTACT INFORMATION
=========================== */}

<div className="grid lg:grid-cols-2 gap-6 mt-6">

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <div className="flex items-center gap-3 mb-6">

            <Phone
                className="text-green-600"
                size={24}
            />

            <h2 className="text-xl font-bold text-gray-800">

                Contact Information

            </h2>

        </div>

        <div className="space-y-5">

            <div>

                <p className="text-sm text-gray-500">

                    Email Address

                </p>

                <p className="font-semibold mt-1 break-all">

                    {displayValue(userProfile.email)}

                </p>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Phone Number

                </p>

                <p className="font-semibold mt-1">

                    {displayValue(userProfile.phoneNumber)}

                </p>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Profile Image URL

                </p>

                <p className="font-semibold mt-1 break-all">

                    {displayValue(userProfile.profileImageUrl)}

                </p>

            </div>

        </div>

    </div>



    {/* ===========================
        ACCOUNT INFORMATION
    =========================== */}

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <div className="flex items-center gap-3 mb-6">

            <Calendar
                className="text-orange-600"
                size={24}
            />

            <h2 className="text-xl font-bold text-gray-800">

                Account Information

            </h2>

        </div>

        <div className="space-y-5">

            <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">

                    Created On

                </span>

                <span className="font-semibold">

                    {displayValue(

                        userProfile.createdAt
                            ? new Date(userProfile.createdAt).toLocaleDateString()
                            : null

                    )}

                </span>

            </div>

            <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">

                    Last Updated

                </span>

                <span className="font-semibold">

                    {displayValue(

                        userProfile.updatedAt
                            ? new Date(userProfile.updatedAt).toLocaleDateString()
                            : null

                    )}

                </span>

            </div>

            <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">

                    Email Verified

                </span>

                <span className="font-semibold">

                    {userProfile.emailVerified ? "Yes" : "No"}

                </span>

            </div>

            <div className="flex justify-between">

                <span className="text-gray-500">

                    Profile Status

                </span>

                <span className="font-semibold">

                    {userProfile.isActive ? "Active" : "Inactive"}

                </span>

            </div>

        </div>

    </div>

</div>
{/* ===========================
        SKILL INVENTORY
=========================== */}

<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-6">

    <div className="flex items-center gap-3 mb-6">

        <Award
            className="text-indigo-600"
            size={24}
        />

        <h2 className="text-xl font-bold text-gray-800">

            Skill Inventory

        </h2>

    </div>

    <div className="flex flex-col items-center justify-center py-12">

        <Award
            size={52}
            className="text-gray-300"
        />

        <h3 className="text-lg font-semibold text-gray-700 mt-4">

            No Skills Assigned

        </h3>

        <p className="text-gray-500 text-sm text-center mt-2 max-w-md">

            Your assigned technical and functional skills will appear here
            once they are added by your HR team.

        </p>

    </div>

</div>



{/* ===========================
        CERTIFICATIONS
=========================== */}

<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-6">

    <div className="flex items-center gap-3 mb-6">

        <ShieldCheck
            className="text-green-600"
            size={24}
        />

        <h2 className="text-xl font-bold text-gray-800">

            Certifications

        </h2>

    </div>

    <div className="flex flex-col items-center justify-center py-12">

        <ShieldCheck
            size={52}
            className="text-gray-300"
        />

        <h3 className="text-lg font-semibold text-gray-700 mt-4">

            No Certifications Available

        </h3>

        <p className="text-gray-500 text-sm text-center mt-2 max-w-md">

            Certifications assigned by HR will be displayed here.

        </p>

    </div>

</div>



{/* ===========================
        PROFILE COMPLETION
=========================== */}

<div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl shadow-xl p-8 mt-6 text-white">

    <div className="flex justify-between items-center">

        <div>

            <h2 className="text-2xl font-bold">

                Profile Completion

            </h2>

            <p className="text-indigo-100 mt-2">

                Keep your profile updated to help HR maintain accurate employee information.

            </p>

        </div>

        <div className="text-right">

            {(() => {

                let completed = 0;

                if (userProfile.fullName) completed++;
                if (userProfile.email) completed++;
                if (userProfile.phoneNumber) completed++;
                if (userProfile.departmentName) completed++;
                if (userProfile.jobRoleName) completed++;
                if (userProfile.profileImageUrl) completed++;

                const percentage = Math.round((completed / 6) * 100);

                return (

                    <>

                        <h1 className="text-5xl font-bold">

                            {percentage}%

                        </h1>

                        <p className="text-indigo-100 mt-1">

                            Completed

                        </p>

                    </>

                );

            })()}

        </div>

    </div>

</div>



{/* ===========================
        PROFILE TIPS
=========================== */}

<div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mt-6">

    <h2 className="text-xl font-bold text-blue-900">

        Profile Tips

    </h2>

    <ul className="mt-4 space-y-3 text-sm text-blue-800">

        <li>• Upload a professional profile picture.</li>

        <li>• Add your phone number for easier communication.</li>

        <li>• Keep your profile information up to date.</li>

        <li>• Contact HR if your department or job role is incorrect.</li>

    </ul>

</div>

</div>

);

}
