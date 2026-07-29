import React, { useEffect, useState } from "react";
import {
    Users,
    Building2,
    Briefcase,
    Brain,
    Award,
    ClipboardList,
    Loader2,
    UserPlus,
    BadgeCheck,
    CalendarClock
} from "lucide-react";

import {
    getUsers,
    getDepartments,
    getJobRoles,
    getSkills,
    getCertifications,
    getCompetencyFrameworks
} from "../../services/dashboardService";

export default function HRDashboard() {

    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [jobRoles, setJobRoles] = useState([]);
    const [skills, setSkills] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [frameworks, setFrameworks] = useState([]);

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

    const StatCard = ({
        title,
        value,
        icon,
        bgColor,
        textColor
    }) => (

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

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

    const loadDashboard = async () => {

        try {

            const [

                usersRes,
                departmentsRes,
                jobRolesRes,
                skillsRes,
                certificationsRes,
                frameworksRes

            ] = await Promise.all([

                getUsers(),
                getDepartments(),
                getJobRoles(),
                getSkills(),
                getCertifications(),
                getCompetencyFrameworks()

            ]);

            setUsers(usersRes.data);

            setDepartments(departmentsRes.data);

            setJobRoles(jobRolesRes.data);

            setSkills(skillsRes.data);

            setCertifications(certificationsRes.data);

            setFrameworks(frameworksRes.data);

        }
        catch (err) {

            console.error(err);

            setError("Unable to load HR dashboard.");

        }
        finally {

            setLoading(false);

        }

    };

    /* ==========================
            Calculations
       ========================== */

    const activeEmployees =
        users.filter(user => user.isActive).length;

    const inactiveEmployees =
        users.filter(user => !user.isActive).length;

    const verifiedEmployees =
        users.filter(user => user.emailVerified).length;

    const pendingVerification =
        users.filter(user => !user.emailVerified).length;

    const employeesWithoutDepartment =
        users.filter(user => !user.departmentName).length;

    const employeesWithoutJobRole =
        users.filter(user => !user.jobRoleName).length;

    const employeesWithProfileImage =
        users.filter(user => user.profileImageUrl).length;

    const profileCompletion =
        users.length === 0
            ? 0
            : Math.round(
                (employeesWithProfileImage / users.length) * 100
            );

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

    {/* Header */}

    <div className="flex items-center justify-between mb-8">

        <div>

            <h1 className="text-4xl font-bold text-gray-800">

                HR Dashboard

            </h1>

            <p className="text-gray-500 mt-2">

                Manage employees, certifications and workforce information.

            </p>

        </div>

        <div className="text-right">

            <p className="text-gray-500 text-sm">

                Human Resources Portal

            </p>

            <h3 className="font-semibold text-gray-800 mt-1">

                Employee Management Center

            </h3>

        </div>

    </div>

    {error && (

        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">

            {error}

        </div>

    )}
    {/* ==========================
        Statistics Cards
========================== */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
            title="Employees"
            value={users.length}
            textColor="text-indigo-600"
            bgColor="bg-indigo-100"
            icon={<Users className="text-indigo-600" size={30} />}
        />

        <StatCard
            title="Departments"
            value={departments.length}
            textColor="text-green-600"
            bgColor="bg-green-100"
            icon={<Building2 className="text-green-600" size={30} />}
        />

        <StatCard
            title="Job Roles"
            value={jobRoles.length}
            textColor="text-orange-600"
            bgColor="bg-orange-100"
            icon={<Briefcase className="text-orange-600" size={30} />}
        />

        <StatCard
            title="Skills"
            value={skills.length}
            textColor="text-purple-600"
            bgColor="bg-purple-100"
            icon={<Brain className="text-purple-600" size={30} />}
        />

        <StatCard
            title="Certifications"
            value={certifications.length}
            textColor="text-cyan-600"
            bgColor="bg-cyan-100"
            icon={<Award className="text-cyan-600" size={30} />}
        />

        <StatCard
            title="Competency Frameworks"
            value={frameworks.length}
            textColor="text-pink-600"
            bgColor="bg-pink-100"
            icon={<ClipboardList className="text-pink-600" size={30} />}
        />

    </div>

    {/* ==========================
        Employee Overview
    ========================== */}

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

        <div className="mb-6">

            <h2 className="text-2xl font-bold text-gray-800">

                Employee Overview

            </h2>

            <p className="text-sm text-gray-500 mt-1">

                Current employee status across the organization.

            </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-5">

                <p className="text-sm text-gray-600">

                    Active Employees

                </p>

                <h3 className="text-3xl font-bold text-emerald-600 mt-2">

                    {activeEmployees}

                </h3>

            </div>

            <div className="bg-red-50 rounded-xl border border-red-100 p-5">

                <p className="text-sm text-gray-600">

                    Inactive Employees

                </p>

                <h3 className="text-3xl font-bold text-red-600 mt-2">

                    {inactiveEmployees}

                </h3>

            </div>

            <div className="bg-indigo-50 rounded-xl border border-indigo-100 p-5">

                <p className="text-sm text-gray-600">

                    Verified Emails

                </p>

                <h3 className="text-3xl font-bold text-indigo-600 mt-2">

                    {verifiedEmployees}

                </h3>

            </div>

            <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-5">

                <p className="text-sm text-gray-600">

                    Pending Verification

                </p>

                <h3 className="text-3xl font-bold text-yellow-600 mt-2">

                    {pendingVerification}

                </h3>

            </div>

        </div>

    </div>

    {/* ==========================
        Workforce Insights
    ========================== */}

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

        <div className="mb-6">

            <h2 className="text-2xl font-bold text-gray-800">

                Workforce Insights

            </h2>

            <p className="text-sm text-gray-500 mt-1">

                Identify missing employee information and profile completion.

            </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="rounded-xl border border-red-100 bg-red-50 p-5">

                <p className="text-sm text-gray-600">

                    No Department

                </p>

                <h3 className="text-3xl font-bold text-red-600 mt-2">

                    {employeesWithoutDepartment}

                </h3>

            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">

                <p className="text-sm text-gray-600">

                    No Job Role

                </p>

                <h3 className="text-3xl font-bold text-orange-600 mt-2">

                    {employeesWithoutJobRole}

                </h3>

            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                <p className="text-sm text-gray-600">

                    Profile Images

                </p>

                <h3 className="text-3xl font-bold text-blue-600 mt-2">

                    {employeesWithProfileImage}

                </h3>

            </div>

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

    {/* ==========================
        Certification Overview
    ========================== */}

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

        <div className="flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-bold text-gray-800">

                    Certification Overview

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                    Overall certification statistics.

                </p>

            </div>

            <Award
                className="text-cyan-600"
                size={34}
            />

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">

            <div className="bg-cyan-50 rounded-xl p-5">

                <p className="text-gray-500">

                    Total Certifications

                </p>

                <h3 className="text-3xl font-bold text-cyan-600 mt-2">

                    {certifications.length}

                </h3>

            </div>

            <div className="bg-indigo-50 rounded-xl p-5">

                <p className="text-gray-500">

                    Competency Frameworks

                </p>

                <h3 className="text-3xl font-bold text-indigo-600 mt-2">

                    {frameworks.length}

                </h3>

            </div>

            <div className="bg-green-50 rounded-xl p-5">

                <p className="text-gray-500">

                    Skill Repository

                </p>

                <h3 className="text-3xl font-bold text-green-600 mt-2">

                    {skills.length}

                </h3>

            </div>

        </div>

    </div>
    {/* ==========================
      Recent Employees
========================== */}

<div className="grid lg:grid-cols-3 gap-6 mt-8">

    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg">

        <div className="border-b px-6 py-4">

            <h2 className="text-xl font-bold text-gray-800">

                Recent Employees

            </h2>

        </div>

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>

                    <tr className="bg-gray-50">

                        <th className="text-left px-5 py-3">
                            Employee
                        </th>

                        <th className="text-left px-5 py-3">
                            Department
                        </th>

                        <th className="text-left px-5 py-3">
                            Job Role
                        </th>

                        <th className="text-left px-5 py-3">
                            Status
                        </th>

                        <th className="text-left px-5 py-3">
                            Verification
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.slice(0, 7).map((user) => (

                        <tr
                            key={user.id}
                            className="border-b hover:bg-gray-50 transition"
                        >

                            <td className="px-5 py-2">

                                <div className="flex items-center gap-2">

                                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">

                                        {user.fullName?.charAt(0)}

                                    </div>

                                    <div>

                                        <p className="font-medium text-gray-800">

                                            {user.fullName}

                                        </p>

                                        <p className="text-xs text-gray-500">

                                            {user.email}

                                        </p>

                                    </div>

                                </div>

                            </td>

                            <td className="px-5 py-2 text-gray-700">

                                {displayValue(user.departmentName, "Not Assigned")}

                            </td>

                            <td className="px-5 py-2 text-gray-700">

                                {displayValue(user.jobRoleName, "Not Assigned")}

                            </td>

                            <td className="px-5 py-2">

                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        user.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >

                                    {user.isActive ? "Active" : "Inactive"}

                                </span>

                            </td>

                            <td className="px-5 py-2">

                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
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

    {/* ==========================
            HR Quick Actions
    ========================== */}

    <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-6">

            HR Quick Actions

        </h2>

        <div className="space-y-4">

            <button className="w-full flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 transition">

                <div className="bg-indigo-100 p-3 rounded-xl">

                    <UserPlus className="text-indigo-600" size={20} />

                </div>

                <div className="text-left">

                    <h3 className="font-semibold">

                        Add Employee

                    </h3>

                    <p className="text-sm text-gray-500">

                        Register a new employee.

                    </p>

                </div>

            </button>

            <button className="w-full flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-green-50 transition">

                <div className="bg-green-100 p-3 rounded-xl">

                    <Award className="text-green-600" size={20} />

                </div>

                <div className="text-left">

                    <h3 className="font-semibold">

                        Assign Certification

                    </h3>

                    <p className="text-sm text-gray-500">

                        Assign certifications to employees.

                    </p>

                </div>

            </button>

            <button className="w-full flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-orange-50 transition">

                <div className="bg-orange-100 p-3 rounded-xl">

                    <Brain className="text-orange-600" size={20} />

                </div>

                <div className="text-left">

                    <h3 className="font-semibold">

                        Assign Skills

                    </h3>

                    <p className="text-sm text-gray-500">

                        Update employee skill inventory.

                    </p>

                </div>

            </button>

            <button className="w-full flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-purple-50 transition">

                <div className="bg-purple-100 p-3 rounded-xl">

                    <CalendarClock className="text-purple-600" size={20} />

                </div>

                <div className="text-left">

                    <h3 className="font-semibold">

                        Schedule Assessment

                    </h3>

                    <p className="text-sm text-gray-500">

                        Create employee assessments.

                    </p>

                </div>

            </button>

        </div>

    </div>

</div>

{/* ==========================
        Recent HR Activities
========================== */}

<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">

        Recent HR Activities

    </h2>

    <div className="space-y-5">

        <div className="flex gap-4">

            <div className="w-3 h-3 rounded-full bg-green-500 mt-2"></div>

            <div>

                <h4 className="font-semibold">

                    Employee Added

                </h4>

                <p className="text-gray-500 text-sm">

                    New employee profile has been created.

                </p>

            </div>

        </div>

        <div className="flex gap-4">

            <div className="w-3 h-3 rounded-full bg-indigo-500 mt-2"></div>

            <div>

                <h4 className="font-semibold">

                    Certification Assigned

                </h4>

                <p className="text-gray-500 text-sm">

                    AWS Certification assigned to an employee.

                </p>

            </div>

        </div>

        <div className="flex gap-4">

            <div className="w-3 h-3 rounded-full bg-orange-500 mt-2"></div>

            <div>

                <h4 className="font-semibold">

                    Skills Updated

                </h4>

                <p className="text-gray-500 text-sm">

                    Employee skill inventory has been updated.

                </p>

            </div>

        </div>

        <div className="flex gap-4">

            <div className="w-3 h-3 rounded-full bg-pink-500 mt-2"></div>

            <div>

                <h4 className="font-semibold">

                    Assessment Scheduled

                </h4>

                <p className="text-gray-500 text-sm">

                    Quarterly assessment has been scheduled.

                </p>

            </div>

        </div>

    </div>

</div>

</div>

);

}