import React, { useEffect, useState } from "react";
import {
    User,
    Mail,
    Building2,
    Briefcase,
    Phone,
    ShieldCheck,
    Calendar,
    Loader2
} from "lucide-react";

import api from "../services/api";

export default function EmployeeDashboard() {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [error, setError] = useState("");

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

        }
        catch (err) {

            console.error(err);

            setError("Unable to load employee details.");

        }
        finally {

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

    <div className="flex justify-between items-center mb-8">

        <div>

            <h1 className="text-4xl font-bold text-gray-800">

                Employee Dashboard

            </h1>

            <p className="text-gray-500 mt-2">

                View your profile, account information and personal details.

            </p>

        </div>

        <div className="text-right">

            <p className="text-gray-500 text-sm">

                Welcome Back

            </p>

            <h3 className="font-semibold text-gray-800 mt-1">

                {displayValue(user?.fullName)}

            </h3>

        </div>

    </div>

    {error && (

        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">

            {error}

        </div>

    )}
    {/* ==========================
        Welcome Card
========================== */}

<div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl p-8 text-white shadow-xl">

    <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex items-center gap-5">

            <div className="w-24 h-24 rounded-full bg-white text-indigo-700 flex items-center justify-center text-4xl font-bold shadow-lg">

                {displayValue(user?.fullName)?.charAt(0)}

            </div>

            <div>

                <h2 className="text-3xl font-bold">

                    Welcome, {displayValue(user?.fullName)}

                </h2>

                <p className="mt-2 text-indigo-100">

                    Manage your profile and keep your personal information updated.

                </p>

            </div>

        </div>

        <div>

            <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">

                View Profile

            </button>

        </div>

    </div>

</div>

{/* ==========================
        Profile Summary
========================== */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <User className="text-indigo-600 mb-4" size={30}/>

        <p className="text-sm text-gray-500">

            Full Name

        </p>

        <h3 className="text-lg font-bold text-gray-800 mt-2">

            {displayValue(user?.fullName)}

        </h3>

    </div>

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <Mail className="text-green-600 mb-4" size={30}/>

        <p className="text-sm text-gray-500">

            Email

        </p>

        <h3 className="text-lg font-bold text-gray-800 mt-2 break-all">

            {displayValue(user?.email)}

        </h3>

    </div>

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <Building2 className="text-orange-600 mb-4" size={30}/>

        <p className="text-sm text-gray-500">

            Department

        </p>

        <h3 className="text-lg font-bold text-gray-800 mt-2">

            {displayValue(user?.departmentName, "Not Assigned")}

        </h3>

    </div>

    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

        <Briefcase className="text-purple-600 mb-4" size={30}/>

        <p className="text-sm text-gray-500">

            Job Role

        </p>

        <h3 className="text-lg font-bold text-gray-800 mt-2">

            {displayValue(user?.jobRoleName, "Not Assigned")}

        </h3>

    </div>

</div>

{/* ==========================
        Account Overview
========================== */}

<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

    <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-800">

            Account Overview

        </h2>

        <p className="text-sm text-gray-500 mt-1">

            Current account information.

        </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-green-50 border border-green-100 rounded-xl p-5">

            <ShieldCheck
                className="text-green-600 mb-3"
                size={28}
            />

            <p className="text-sm text-gray-500">

                Account Status

            </p>

            <h3 className="text-xl font-bold text-green-700 mt-2">

                {user?.isActive ? "Active" : "Inactive"}

            </h3>

        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">

            <Mail
                className="text-indigo-600 mb-3"
                size={28}
            />

            <p className="text-sm text-gray-500">

                Email Verification

            </p>

            <h3 className="text-xl font-bold text-indigo-700 mt-2">

                {user?.emailVerified ? "Verified" : "Pending"}

            </h3>

        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">

            <Phone
                className="text-orange-600 mb-3"
                size={28}
            />

            <p className="text-sm text-gray-500">

                Phone Number

            </p>

            <h3 className="text-lg font-bold text-orange-700 mt-2">

                {displayValue(user?.phoneNumber, "Not Added")}

            </h3>

        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">

            <Calendar
                className="text-purple-600 mb-3"
                size={28}
            />

            <p className="text-sm text-gray-500">

                Joined

            </p>

            <h3 className="text-lg font-bold text-purple-700 mt-2">

                {displayValue(user?.createdAt, "Not Available")}

            </h3>

        </div>

    </div>

</div>
{/* ==========================
        Personal Information
========================== */}

<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

    <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-800">

            Personal Information

        </h2>

        <p className="text-sm text-gray-500 mt-1">

            Your profile information available in the organization.

        </p>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="space-y-5">

            <div>

                <p className="text-sm text-gray-500">

                    Full Name

                </p>

                <h4 className="font-semibold text-gray-800 mt-1">

                    {displayValue(user?.fullName)}

                </h4>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Email Address

                </p>

                <h4 className="font-semibold text-gray-800 mt-1">

                    {displayValue(user?.email)}

                </h4>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Phone Number

                </p>

                <h4 className="font-semibold text-gray-800 mt-1">

                    {displayValue(user?.phoneNumber, "Not Added")}

                </h4>

            </div>

        </div>

        <div className="space-y-5">

            <div>

                <p className="text-sm text-gray-500">

                    Department

                </p>

                <h4 className="font-semibold text-gray-800 mt-1">

                    {displayValue(user?.departmentName, "Not Assigned")}

                </h4>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Job Role

                </p>

                <h4 className="font-semibold text-gray-800 mt-1">

                    {displayValue(user?.jobRoleName, "Not Assigned")}

                </h4>

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    Manager

                </p>

                <h4 className="font-semibold text-gray-800 mt-1">

                    {displayValue(user?.managerName, "Not Assigned")}

                </h4>

            </div>

        </div>

    </div>

</div>


{/* ==========================
        Quick Actions
========================== */}

<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">

        Quick Actions

    </h2>

    <div className="grid md:grid-cols-2 gap-5">

        <button className="border border-indigo-200 rounded-xl p-5 hover:bg-indigo-50 transition text-left">

            <User
                className="text-indigo-600 mb-3"
                size={28}
            />

            <h3 className="font-semibold text-gray-800">

                Edit Profile

            </h3>

            <p className="text-sm text-gray-500 mt-1">

                Update your profile information.

            </p>

        </button>

        <button className="border border-green-200 rounded-xl p-5 hover:bg-green-50 transition text-left">

            <Mail
                className="text-green-600 mb-3"
                size={28}
            />

            <h3 className="font-semibold text-gray-800">

                Verify Email

            </h3>

            <p className="text-sm text-gray-500 mt-1">

                Manage your email verification status.

            </p>

        </button>

    </div>

</div>


{/* ==========================
        Coming Soon
========================== */}

<div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl shadow-lg p-8 mt-8 text-white">

    <h2 className="text-2xl font-bold">

        More Features Coming Soon 🚀

    </h2>

    <p className="mt-3 text-indigo-100">

        Your dashboard will soon include personal skills,
        certifications, assessments, competency progress,
        learning recommendations, and profile completion tracking.

    </p>

</div>

</div>

);

}