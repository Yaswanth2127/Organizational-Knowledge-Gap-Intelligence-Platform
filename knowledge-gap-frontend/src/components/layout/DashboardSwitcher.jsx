import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    Check,
    ChevronDown,
} from "lucide-react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import {
    WORKSPACE_CONFIG,
} from "../../config/workspaceConfig";


const DashboardSwitcher = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const dropdownRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);


    /*
     * Get all assigned roles.
     */

    const userRoles = useMemo(() => {

        const storedRoles =
            localStorage.getItem("roles");

        if (storedRoles) {

            try {

                const parsedRoles =
                    JSON.parse(storedRoles);

                if (Array.isArray(parsedRoles)) {
                    return parsedRoles;
                }

            } catch (error) {

                console.warn(
                    "Unable to parse roles:",
                    error
                );

            }
        }


        const role =
            localStorage.getItem("role");

        return role ? [role] : [];

    }, []);


    /*
     * Determine available workspaces.
     */

    const availableWorkspaces = useMemo(() => {

        const workspaces = [];

        /*
         * Employee is the base workspace.
         */

        if (
            userRoles.includes("EMPLOYEE") ||
            userRoles.length > 0
        ) {
            workspaces.push(
                WORKSPACE_CONFIG.EMPLOYEE
            );
        }


        if (
            userRoles.includes("MANAGER")
        ) {
            workspaces.push(
                WORKSPACE_CONFIG.MANAGER
            );
        }


        if (
            userRoles.includes("HR_SPECIALIST")
        ) {
            workspaces.push(
                WORKSPACE_CONFIG.HR
            );
        }


        if (
            userRoles.includes("DEPARTMENT_HEAD")
        ) {
            workspaces.push(
                WORKSPACE_CONFIG.DEPARTMENT_HEAD
            );
        }


        if (
            userRoles.includes("LND_ADMIN")
        ) {
            workspaces.push(
                WORKSPACE_CONFIG.LND
            );
        }


        if (
            userRoles.includes("SYS_ADMIN")
        ) {
            workspaces.push(
                WORKSPACE_CONFIG.ADMIN
            );
        }


        return workspaces;

    }, [userRoles]);


    /*
     * Determine current workspace.
     *
     * First use localStorage because this is
     * important for common pages such as
     * /profile and /notifications.
     */

    const storedWorkspace =
        localStorage.getItem(
            "currentWorkspace"
        );


    const getWorkspaceFromPath = () => {
    const path = location.pathname;

    // Employee workspace
    if (
        path === "/employee/dashboard" ||
        path.startsWith("/employee/")
    ) {
        return "EMPLOYEE";
    }

    // Manager workspace
    if (
        path === "/manager/dashboard" ||
        path.startsWith("/manager/")
    ) {
        return "MANAGER";
    }

    // HR workspace
    if (
        path === "/hr/dashboard" ||
        path.startsWith("/hr/")
    ) {
        return "HR";
    }

    // Department Head workspace
    if (
        path === "/department-head/dashboard" ||
        path.startsWith("/department-head/")
    ) {
        return "DEPARTMENT_HEAD";
    }

    // L&D workspace
    if (
        path === "/lnd/dashboard" ||
        path.startsWith("/lnd/")
    ) {
        return "LND";
    }

    // Admin workspace
    if (
        path === "/admin/dashboard" ||
        path.startsWith("/admin/")
    ) {
        return "ADMIN";
    }

    return null;
};


    const pathWorkspace =
        getWorkspaceFromPath();


    /*
     * If we're on a dashboard page,
     * synchronize currentWorkspace with URL.
     */

    useEffect(() => {

        if (pathWorkspace) {

            localStorage.setItem(
                "currentWorkspace",
                pathWorkspace
            );

        }

    }, [pathWorkspace]);


    const currentWorkspaceId =
        pathWorkspace ||
        storedWorkspace ||
        "EMPLOYEE";


    const currentWorkspace =
        availableWorkspaces.find(
            (workspace) =>
                workspace.id ===
                currentWorkspaceId
        ) ||
        availableWorkspaces[0];


    /*
     * Close dropdown when clicking outside.
     */

    useEffect(() => {

        const handleOutsideClick =
            (event) => {

                if (
                    dropdownRef.current &&
                    !dropdownRef.current.contains(
                        event.target
                    )
                ) {
                    setIsOpen(false);
                }

            };


        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);


    /*
     * Dashboard selection.
     */

    const handleWorkspaceChange =
        (workspace) => {

            localStorage.setItem(
                "currentWorkspace",
                workspace.id
            );

            setIsOpen(false);

            navigate(workspace.path);

        };


    if (!currentWorkspace) {
        return null;
    }


    const CurrentIcon =
        currentWorkspace.icon;


    /*
     * Employee only:
     * show simple label instead of useless
     * dropdown.
     */

    if (
        availableWorkspaces.length === 1
    ) {

        return (

            <div
                className="
                    flex
                    items-center
                    gap-2
                    px-3.5
                    py-2
                    rounded-lg
                    bg-white/10
                    border
                    border-white/10
                    text-white
                "
            >

                <CurrentIcon size={16} />

                <span
                    className="
                        text-sm
                        font-medium
                    "
                >
                    {currentWorkspace.label}
                </span>

            </div>

        );

    }


    return (

        <div
            ref={dropdownRef}
            className="relative"
        >

            {/* Current workspace */}

            <button
                type="button"
                onClick={() =>
                    setIsOpen(
                        (previous) =>
                            !previous
                    )
                }
                className="
                    flex
                    items-center
                    gap-2
                    min-w-[210px]
                    px-3.5
                    py-2
                    rounded-lg
                    bg-white/10
                    hover:bg-white/[0.15]
                    border
                    border-white/10
                    text-white
                    transition
                "
            >

                <CurrentIcon size={16} />

                <span
                    className="
                        flex-1
                        text-left
                        text-sm
                        font-medium
                        truncate
                    "
                >
                    {currentWorkspace.label}
                </span>

                <ChevronDown
                    size={15}
                    className={`
                        transition-transform
                        ${
                            isOpen
                                ? "rotate-180"
                                : ""
                        }
                    `}
                />

            </button>


            {/* Dropdown */}

            {isOpen && (

                <div
                    className="
                        absolute
                        top-full
                        left-0
                        mt-2
                        w-[310px]
                        bg-white
                        rounded-xl
                        border
                        border-gray-200
                        shadow-2xl
                        overflow-hidden
                        z-[100]
                    "
                >

                    <div
                        className="
                            px-4
                            py-3
                            border-b
                            border-gray-100
                        "
                    >

                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-gray-400
                            "
                        >
                            Switch Dashboard
                        </p>

                        <p
                            className="
                                text-xs
                                text-gray-500
                                mt-1
                            "
                        >
                            Select a workspace you
                            have access to.
                        </p>

                    </div>


                    <div className="p-2">

                        {availableWorkspaces.map(
                            (workspace) => {

                                const Icon =
                                    workspace.icon;

                                const isActive =
                                    currentWorkspace.id ===
                                    workspace.id;


                                return (

                                    <button
                                        key={
                                            workspace.id
                                        }
                                        type="button"
                                        onClick={() =>
                                            handleWorkspaceChange(
                                                workspace
                                            )
                                        }
                                        className={`
                                            w-full
                                            flex
                                            items-center
                                            gap-3
                                            p-3
                                            rounded-lg
                                            text-left
                                            transition
                                            ${
                                                isActive
                                                    ? "bg-indigo-50"
                                                    : "hover:bg-gray-50"
                                            }
                                        `}
                                    >

                                        <div
                                            className={`
                                                w-9
                                                h-9
                                                rounded-lg
                                                flex
                                                items-center
                                                justify-center
                                                flex-shrink-0
                                                ${workspace.iconClass}
                                            `}
                                        >

                                            <Icon
                                                size={17}
                                            />

                                        </div>


                                        <div
                                            className="
                                                flex-1
                                                min-w-0
                                            "
                                        >

                                            <p
                                                className={`
                                                    text-sm
                                                    font-semibold
                                                    ${
                                                        isActive
                                                            ? "text-indigo-700"
                                                            : "text-gray-800"
                                                    }
                                                `}
                                            >
                                                {
                                                    workspace.label
                                                }
                                            </p>

                                            <p
                                                className="
                                                    text-[11px]
                                                    text-gray-500
                                                    mt-0.5
                                                "
                                            >
                                                {
                                                    workspace.description
                                                }
                                            </p>

                                        </div>


                                        {isActive && (

                                            <Check
                                                size={17}
                                                className="
                                                    text-indigo-600
                                                    flex-shrink-0
                                                "
                                            />

                                        )}

                                    </button>

                                );

                            }
                        )}

                    </div>

                </div>

            )}

        </div>

    );

};


export default DashboardSwitcher;