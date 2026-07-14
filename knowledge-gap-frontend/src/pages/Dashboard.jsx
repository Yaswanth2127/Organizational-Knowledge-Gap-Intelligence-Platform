

import React from "react";
import AdminDashboard from "./AdminDashboard";
import HRDashboard from "./HRDashboard";
import EmployeeDashboard from "./EmployeeDashboard";

export default function Dashboard() {

    const role = localStorage.getItem("role");

    switch (role) {

        case "SYS_ADMIN":
            return <AdminDashboard />;

        case "HR_SPECIALIST":
            return <HRDashboard />;

        case "EMPLOYEE":
            return <EmployeeDashboard />;

        default:
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white shadow-lg rounded-xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-red-600">
                            Unauthorized
                        </h2>

                        <p className="mt-2 text-gray-600">
                            You don't have permission to access this dashboard.
                        </p>
                    </div>
                </div>
            );
    }
}