import React from "react";
import { Navigate } from "react-router-dom";

const DashboardRedirect = () => {
    const roles = JSON.parse(
        localStorage.getItem("roles") || "[]"
    );

    console.log("Logged-in user roles:", roles);

    // 1. System Admin
    if (roles.includes("SYS_ADMIN")) {
        return (
            <Navigate
                to="/admin/dashboard"
                replace
            />
        );
    }

    // 2. L&D Admin
    if (roles.includes("LND_ADMIN")) {
        return (
            <Navigate
                to="/lnd/dashboard"
                replace
            />
        );
    }

    // 3. Department Head
    if (roles.includes("DEPARTMENT_HEAD")) {
        return (
            <Navigate
                to="/department-head/dashboard"
                replace
            />
        );
    }

    // 4. HR Specialist
    if (roles.includes("HR_SPECIALIST")) {
        return (
            <Navigate
                to="/hr/dashboard"
                replace
            />
        );
    }

    // 5. Manager
    if (roles.includes("MANAGER")) {
        return (
            <Navigate
                to="/manager/dashboard"
                replace
            />
        );
    }

    // 6. Employee
    if (roles.includes("EMPLOYEE")) {
        return (
            <Navigate
                to="/employee/dashboard"
                replace
            />
        );
    }

    // No recognized role
    console.warn(
        "No valid dashboard role found:",
        roles
    );

    return (
        <Navigate
            to="/login"
            replace
        />
    );
};

export default DashboardRedirect;