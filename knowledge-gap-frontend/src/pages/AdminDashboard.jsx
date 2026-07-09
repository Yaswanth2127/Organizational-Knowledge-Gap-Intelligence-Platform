
import React, { useEffect, useState } from "react";
import {
    Users,
    Building2,
    Briefcase,
    Brain,
    UserPlus,
    Building,
    PlusCircle,
    Loader2,
    Award,
    ClipboardList
} from "lucide-react";

import {
    getRecentUsers,
    getUsers,
    getDepartments,
    getJobRoles,
    getSkills
} from "../services/dashboardService";

export default function AdminDashboard() {

    const [loading, setLoading] = useState(true);

    const [recentUsers, setRecentUsers] = useState([]);  
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [jobRoles, setJobRoles] = useState([]);
    const [skills, setSkills] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [frameworks, setFrameworks] = useState([]);

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
    const StatCard = ({
            title,
            value,
            icon,
            bgColor,
            textColor
        }) => (

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-sm font-medium text-gray-500">
                            {title}
                        </p>

                        <h2 className={`text-4xl font-bold mt-2 ${textColor}`}>
                            {value}
                        </h2>

                    </div>

                    <div className={`${bgColor} p-4 rounded-2xl`}>

                        {icon}

                    </div>

                </div>

            </div>

        );

    useEffect(() => {
        loadDashboard();
    }, []);

    const activeUsers = users.filter(user => user.isActive).length;

    const inactiveUsers = users.filter(user => !user.isActive).length;

    const verifiedUsers = users.filter(user => user.emailVerified).length;

    const pendingVerification = users.filter(user => !user.emailVerified).length;


    const usersWithoutDepartment = users.filter(
        user => !user.departmentName
    ).length;

    const usersWithoutJobRole = users.filter(
        user => !user.jobRoleName
    ).length;

    const usersWithProfileImage = users.filter(
        user => user.profileImageUrl
    ).length;

    const profileCompletion = users.length === 0
        ? 0
        : Math.round((usersWithProfileImage / users.length) * 100);

    const recentActivities = [
        {
            title: "New employee registered",
            description: "Yaswanth joined the organization.",
            color: "bg-green-500"
        },
        {
            title: "Skill Added",
            description: "Spring Boot was added to the Skill Inventory.",
            color: "bg-indigo-500"
        },
        {
            title: "Department Created",
            description: "Research & Development department created.",
            color: "bg-orange-500"
        },
        {
            title: "Certification Added",
            description: "AWS Certified Developer certification created.",
            color: "bg-cyan-500"
        },
        {
            title: "Competency Framework Updated",
            description: "Backend Developer framework updated.",
            color: "bg-pink-500"
        }
    ];

    const loadDashboard = async () => {

        try {

            const [
                usersRes,
                recentUsersRes,
                departmentsRes,
                jobRolesRes,
                skillsRes
            ] = await Promise.all([

                getUsers(),
                getRecentUsers(),
                
                getDepartments(),
                getJobRoles(),
                getSkills()

            ]);

        
            setRecentUsers(recentUsersRes);
            setUsers(usersRes.data);

            setDepartments(departmentsRes.data);

            setJobRoles(jobRolesRes.data);

            setSkills(skillsRes.data);

        }
        catch (error) {

            console.error(error);

            alert("Unable to load dashboard.");

        }
        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                <Loader2
                    size={45}
                    className="animate-spin text-indigo-600"
                />

            </div>

        );

    }

return (

<div className="min-h-screen bg-gray-100 p-6">

    {/* Header */}

    <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">

            Welcome Back 👋

        </h1>

        <p className="text-gray-500 mt-2">

            Here's what's happening in your organization today.

        </p>

    </div>


    {/* Statistics Cards */}

    

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <StatCard
                title="Users"
                value={users.length}
                bgColor="bg-indigo-100"
                textColor="text-indigo-600"
                icon={<Users className="text-indigo-600" size={30}/>}
            />

            <StatCard
                title="Departments"
                value={departments.length}
                bgColor="bg-green-100"
                textColor="text-green-600"
                icon={<Building2 className="text-green-600" size={30}/>}
            />

            <StatCard
                title="Job Roles"
                value={jobRoles.length}
                bgColor="bg-orange-100"
                textColor="text-orange-600"
                icon={<Briefcase className="text-orange-600" size={30}/>}
            />

            <StatCard
                title="Skills"
                value={skills.length}
                bgColor="bg-purple-100"
                textColor="text-purple-600"
                icon={<Brain className="text-purple-600" size={30}/>}
            />

            <StatCard
                title="Certifications"
                value={certifications.length}
                bgColor="bg-cyan-100"
                textColor="text-cyan-600"
                icon={<Award className="text-cyan-600" size={30}/>}
            />

            <StatCard
                title="Competency Frameworks"
                value={frameworks.length}
                bgColor="bg-pink-100"
                textColor="text-pink-600"
                icon={<ClipboardList className="text-pink-600" size={30}/>}
            />

        </div>
        {/* Organization Overview */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Organization Overview

                    </h2>

                    <p className="text-gray-500 text-sm mt-1">

                        Overall organizational statistics and employee status.

                    </p>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">

                    <p className="text-sm text-gray-600">

                        Active Users

                    </p>

                    <h3 className="text-3xl font-bold text-emerald-600 mt-2">

                        {activeUsers}

                    </h3>

                </div>

                <div className="bg-red-50 rounded-xl p-5 border border-red-100">

                    <p className="text-sm text-gray-600">

                        Inactive Users

                    </p>

                    <h3 className="text-3xl font-bold text-red-600 mt-2">

                        {inactiveUsers}

                    </h3>

                </div>

                <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">

                    <p className="text-sm text-gray-600">

                        Verified Emails

                    </p>

                    <h3 className="text-3xl font-bold text-indigo-600 mt-2">

                        {verifiedUsers}

                    </h3>

                </div>

                <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-100">

                    <p className="text-sm text-gray-600">

                        Pending Verification

                    </p>

                    <h3 className="text-3xl font-bold text-yellow-600 mt-2">

                        {pendingVerification}

                    </h3>

                </div>

            </div>

        </div>
        {/* Platform Insights */}

<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

    <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-800">

            Platform Insights

        </h2>

        <p className="text-sm text-gray-500 mt-1">

            Quick insights into organizational data quality and completeness.

        </p>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Missing Departments */}

        <div className="rounded-xl border border-red-100 bg-red-50 p-5">

            <p className="text-sm text-gray-600">

                Users without Department

            </p>

            <h3 className="text-3xl font-bold text-red-600 mt-2">

                {usersWithoutDepartment}

            </h3>

        </div>
        

        {/* Missing Job Roles */}

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">

                <p className="text-sm text-gray-600">

                    Users without Job Role

                </p>

                <h3 className="text-3xl font-bold text-orange-600 mt-2">

                    {usersWithoutJobRole}

                </h3>

            </div>

            {/* Profile Images */}

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                <p className="text-sm text-gray-600">

                    Profile Images Added

                </p>

                <h3 className="text-3xl font-bold text-blue-600 mt-2">

                    {usersWithProfileImage}

                </h3>

            </div>

            {/* Profile Completion */}

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">

                <p className="text-sm text-gray-600">

                    Profile Completion

                </p>

                <h3 className="text-3xl font-bold text-emerald-600 mt-2">

                    {profileCompletion}%

                </h3>

            </div>

        </div>

    </div>
    {/* Recent Activity */}

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

        <div className="mb-6">

            <h2 className="text-2xl font-bold text-gray-800">

                Recent Activity

            </h2>

            <p className="text-sm text-gray-500 mt-1">

                Latest activities performed in the platform.

            </p>

        </div>

        <div className="space-y-5">

            {recentActivities.map((activity, index) => (

                <div
                    key={index}
                    className="flex items-start gap-4"
                >

                    <div className={`w-3 h-3 rounded-full mt-2 ${activity.color}`}></div>

                    <div className="flex-1">

                        <h3 className="font-semibold text-gray-800">

                            {activity.title}

                        </h3>

                        <p className="text-sm text-gray-500 mt-1">

                            {activity.description}

                        </p>

                    </div>

                </div>

            ))}

        </div>

    </div>

    {/* Recent Users */}

    <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg">

            <div className="border-b px-6 py-4">

                <h2 className="text-xl font-bold text-gray-800">

                    Recent Users

                </h2>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-50">

                            <th className="text-left px-5 py-2">User</th>

                            <th className="text-left px-5 py-2">Department</th>

                            <th className="text-left px-5 py-2">Job Role</th>

                            <th className="text-left px-5 py-2">Status</th>

                            <th className="text-left px-5 py-2">Verification</th>

                        </tr>

                    </thead>

                    <tbody>

                        {recentUsers.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b hover:bg-indigo-50 transition"
                            >

                                {/* User */}

                                <td className="px-5 py-2">

                                    <div className="flex items-center gap-2.5">

                                        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">

                                            {user.fullName?.charAt(0).toUpperCase()}

                                        </div>

                                        <div>

                                            <p className="font-semibold text-gray-800">

                                                {user.fullName}

                                            </p>

                                            <p className="text-[11px] text-gray-500">

                                                {user.email}

                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Department */}

                                <td className="px-5 py-2 text-gray-700 font-medium">
                                    {displayValue(user.departmentName, "Not Assigned")}
                                </td>

                                {/* Job Role */}

                                
                                
                                <td className="px-5 py-2 text-gray-700">
                                    {displayValue(user.jobRoleName, "Not Assigned")}
                                </td>

                                {/* Status */}

                                <td className="px-5 py-2">

                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium font-semibold ${
                                            user.isActive
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >

                                        {user.isActive ? "Active" : "Inactive"}

                                    </span>

                                </td>

                                {/* Verification */}

                                <td className="px-5 py-2">

                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium font-semibold ${
                                            user.emailVerified
                                                ? "bg-indigo-100 text-indigo-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >

                                        {user.emailVerified ? "Verified" : "Pending"}

                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>


        {/* Quick Actions */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">

                Quick Actions

            </h2>

            <div className="space-y-4">

                <button className="w-full flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 hover:border-indigo-300 transition">

                    <div className="bg-indigo-100 p-3 rounded-xl">

                        <UserPlus className="text-indigo-600" size={22} />

                    </div>

                    <div className="text-left">

                        <h3 className="font-semibold text-gray-800">

                            Add User

                        </h3>

                        <p className="text-sm text-gray-500">

                            Register a new employee into the platform.

                        </p>

                    </div>

                </button>


                <button className="w-full flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-green-50 hover:border-green-300 transition">

                    <div className="bg-green-100 p-3 rounded-xl">

                        <Building className="text-green-600" size={22} />

                    </div>

                    <div className="text-left">

                        <h3 className="font-semibold text-gray-800">

                            Add Department

                        </h3>

                        <p className="text-sm text-gray-500">

                            Create a new department for employees.

                        </p>

                    </div>

                </button>


                <button className="w-full flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-purple-50 hover:border-purple-300 transition">

                    <div className="bg-purple-100 p-3 rounded-xl">

                        <PlusCircle className="text-purple-600" size={22} />

                    </div>

                    <div className="text-left">

                        <h3 className="font-semibold text-gray-800">

                            Add Skill

                        </h3>

                        <p className="text-sm text-gray-500">

                            Add a new technical or soft skill.

                        </p>

                    </div>

                </button>


                <button className="w-full flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-orange-50 hover:border-orange-300 transition">

                    <div className="bg-orange-100 p-3 rounded-xl">

                        <Briefcase className="text-orange-600" size={22} />

                    </div>

                    <div className="text-left">

                        <h3 className="font-semibold text-gray-800">

                            Add Job Role

                        </h3>

                        <p className="text-sm text-gray-500">

                            Create a new job role in your organization.

                        </p>

                    </div>

                </button>

            </div>

        </div>

    </div>

</div>

);

}