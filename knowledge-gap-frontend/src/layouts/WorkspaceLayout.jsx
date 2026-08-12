import React from "react";
import { useLocation } from "react-router-dom";

import EmployeeLayout from "./EmployeeLayout";
import AdminLayout from "./AdminLayout";


const WorkspaceLayout = ({ children }) => {

    const location = useLocation();


    /*
     * Determine workspace from URL.
     *
     * Dashboard pages have an obvious workspace.
     */

    if (
        location.pathname.startsWith(
            "/employee"
        )
    ) {

        return (
            <EmployeeLayout>
                {children}
            </EmployeeLayout>
        );

    }


    if (
        location.pathname.startsWith(
            "/hr"
        )
    ) {

        return (
            <AdminLayout>
                {children}
            </AdminLayout>
        );

    }


    if (
        location.pathname.startsWith(
            "/admin"
        )
    ) {

        return (
            <AdminLayout>
                {children}
            </AdminLayout>
        );

    }


    /*
     * Common pages such as:
     *
     * /profile
     * /notifications
     *
     * don't contain the workspace in their URL.
     *
     * Therefore use the workspace selected by
     * the user.
     */

    const currentWorkspace =
        localStorage.getItem(
            "currentWorkspace"
        );


    switch (currentWorkspace) {

        case "ADMIN":

            return (
                <AdminLayout>
                    {children}
                </AdminLayout>
            );


        case "HR":

            return (
                <AdminLayout>
                    {children}
                </AdminLayout>
            );


        case "EMPLOYEE":
        default:

            return (
                <EmployeeLayout>
                    {children}
                </EmployeeLayout>
            );

    }

};


export default WorkspaceLayout;