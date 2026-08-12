import React, { useEffect, useMemo, useState } from "react";

import {
    Search,
    ShieldCheck,
    Users,
    Loader2,
    UserRound,
    Filter,
    RotateCcw,
} from "lucide-react";

import api from "../../services/api";
import roleService from "../../services/roleService";

import UserRoleRow from "../../components/admin/role-assignment/UserRoleRow";
import AssignRolesModal from "../../components/admin/role-assignment/AssignRolesModal";

export default function RoleAssignment() {

    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    /*
     * Used only for the Assign Roles modal.
     * The main table uses user.roles directly.
     */
    const [userRoles, setUserRoles] = useState({});

    const [search, setSearch] = useState("");

    const [departmentFilter, setDepartmentFilter] =
        useState("ALL");

    const [roleFilter, setRoleFilter] =
        useState("ALL");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedUser, setSelectedUser] =
        useState(null);


    // =========================================================
    // LOAD USERS + ROLES
    // =========================================================

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                usersResponse,
                rolesResponse,
            ] = await Promise.all([

                api.get("/api/users"),

                roleService.getAllRoles(),

            ]);

            console.log(
                "Users from backend:",
                usersResponse.data
            );

            setUsers(usersResponse.data || []);

            setRoles(rolesResponse.data || []);

        } catch (err) {

            console.error(
                "Failed to load role assignment page:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load role assignment data."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================================
    // DEPARTMENTS
    // =========================================================

    const departments = useMemo(() => {

        return [
            ...new Set(
                users
                    .map(
                        (user) =>
                            user.departmentName
                    )
                    .filter(Boolean)
            ),
        ].sort();

    }, [users]);


    // =========================================================
    // LOAD USER ROLES FOR MODAL
    // =========================================================

    const loadUserRoles = async (userId) => {

        try {

            const response =
                await roleService.getUserRoles(userId);

            setUserRoles((current) => ({
                ...current,
                [userId]: response.data || [],
            }));

        } catch (err) {

            console.error(
                "Failed to load user roles:",
                err
            );

        }
    };


    // =========================================================
    // OPEN ASSIGN ROLE MODAL
    // =========================================================

    const handleAssignRoles = async (user) => {

        setSelectedUser(user);

        /*
         * Fetch actual Role objects with IDs
         * for the modal.
         */
        if (!userRoles[user.id]) {

            await loadUserRoles(user.id);

        }

    };


    // =========================================================
    // AFTER ROLES ARE SAVED
    // =========================================================

    const handleSaved = (
        userId,
        updatedRoles
    ) => {

        /*
         * Update modal cache.
         */
        setUserRoles((current) => ({
            ...current,
            [userId]: updatedRoles,
        }));


        /*
         * IMPORTANT:
         *
         * Also update the user in the main table.
         *
         * Otherwise the table would continue
         * showing the old roles until refresh.
         */
        setUsers((currentUsers) =>
            currentUsers.map((user) => {

                if (user.id !== userId) {
                    return user;
                }

                return {
                    ...user,
                    roles: updatedRoles.map(
                        (role) => role.name
                    ),
                };

            })
        );


        setSelectedUser(null);

    };


    // =========================================================
    // FILTER USERS
    // =========================================================

    const filteredUsers = useMemo(() => {

        const query =
            search.trim().toLowerCase();


        return users.filter((user) => {

            // -------------------------
            // Search
            // -------------------------

            const matchesSearch =
                !query ||

                user.fullName
                    ?.toLowerCase()
                    .includes(query) ||

                user.email
                    ?.toLowerCase()
                    .includes(query) ||

                user.departmentName
                    ?.toLowerCase()
                    .includes(query) ||

                user.jobRoleName
                    ?.toLowerCase()
                    .includes(query);


            // -------------------------
            // Department
            // -------------------------

            const matchesDepartment =
                departmentFilter === "ALL" ||

                user.departmentName ===
                    departmentFilter;


            // -------------------------
            // Role
            // -------------------------

            const matchesRole =
                roleFilter === "ALL" ||

                (user.roles || []).includes(
                    roleFilter
                );


            // -------------------------
            // Status
            // -------------------------

            const matchesStatus =
                statusFilter === "ALL" ||

                (
                    statusFilter === "ACTIVE" &&
                    user.isActive === true
                ) ||

                (
                    statusFilter === "INACTIVE" &&
                    user.isActive === false
                );


            return (
                matchesSearch &&
                matchesDepartment &&
                matchesRole &&
                matchesStatus
            );

        });

    }, [
        users,
        search,
        departmentFilter,
        roleFilter,
        statusFilter,
    ]);


    // =========================================================
    // CLEAR FILTERS
    // =========================================================

    const clearFilters = () => {

        setSearch("");

        setDepartmentFilter("ALL");

        setRoleFilter("ALL");

        setStatusFilter("ALL");

    };


    const hasFilters =
        search.trim() !== "" ||
        departmentFilter !== "ALL" ||
        roleFilter !== "ALL" ||
        statusFilter !== "ALL";


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="space-y-6">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
            ">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-indigo-50
                            flex
                            items-center
                            justify-center
                        ">

                            <ShieldCheck
                                size={21}
                                className="text-indigo-600"
                            />

                        </div>


                        <div>

                            <h1 className="
                                text-2xl
                                font-bold
                                text-gray-900
                            ">
                                Role Assignment
                            </h1>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                Assign and update employee roles and platform access.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Employee count */}

                <div className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-white
                    border
                    border-gray-100
                    shadow-sm
                ">

                    <Users
                        size={17}
                        className="text-indigo-500"
                    />

                    <span className="
                        text-sm
                        font-semibold
                        text-gray-700
                    ">
                        {users.length}
                    </span>

                    <span className="
                        text-xs
                        text-gray-400
                    ">
                        Employees
                    </span>

                </div>

            </div>


            {/* ================================================= */}
            {/* WARNING / INFORMATION */}
            {/* ================================================= */}

            <div className="
                bg-indigo-50
                border
                border-indigo-100
                rounded-2xl
                p-4
            ">

                <div className="flex gap-3">

                    <ShieldCheck
                        size={19}
                        className="
                            text-indigo-600
                            flex-shrink-0
                            mt-0.5
                        "
                    />

                    <div>

                        <p className="
                            text-sm
                            font-semibold
                            text-indigo-900
                        ">
                            Assign roles carefully
                        </p>

                        <p className="
                            text-xs
                            text-indigo-700
                            mt-1
                            leading-5
                        ">
                            Roles determine which areas of OKGIP an employee can access.
                            Only assign administrative roles when the employee requires that level of access.
                        </p>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* FILTER PANEL */}
            {/* ================================================= */}

            <div className="
                bg-white
                border
                border-gray-100
                rounded-2xl
                p-4
                shadow-sm
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-4
                ">

                    <div className="
                        flex
                        items-center
                        gap-2
                    ">

                        <Filter
                            size={16}
                            className="text-gray-500"
                        />

                        <h2 className="
                            text-sm
                            font-semibold
                            text-gray-800
                        ">
                            Find Employees
                        </h2>

                    </div>


                    {hasFilters && (

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                font-medium
                                text-gray-500
                                hover:text-indigo-600
                            "
                        >

                            <RotateCcw size={13} />

                            Clear filters

                        </button>

                    )}

                </div>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-3
                ">


                    {/* Search */}

                    <div className="
                        relative
                        xl:col-span-1
                    ">

                        <Search
                            size={17}
                            className="
                                absolute
                                left-3.5
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            "
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="
                                Name, email, department or job role...
                            "
                            className="
                                w-full
                                pl-10
                                pr-4
                                py-2.5
                                rounded-xl
                                border
                                border-gray-200
                                focus:border-indigo-400
                                focus:ring-2
                                focus:ring-indigo-100
                                outline-none
                                text-sm
                            "
                        />

                    </div>


                    {/* Department */}

                    <select
                        value={departmentFilter}
                        onChange={(e) =>
                            setDepartmentFilter(
                                e.target.value
                            )
                        }
                        className="
                            px-3
                            py-2.5
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            text-sm
                            text-gray-700
                            outline-none
                            focus:border-indigo-400
                            focus:ring-2
                            focus:ring-indigo-100
                        "
                    >

                        <option value="ALL">
                            All Departments
                        </option>

                        {departments.map(
                            (department) => (

                                <option
                                    key={department}
                                    value={department}
                                >
                                    {department}
                                </option>

                            )
                        )}

                    </select>


                    {/* Role */}

                    <select
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(
                                e.target.value
                            )
                        }
                        className="
                            px-3
                            py-2.5
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            text-sm
                            text-gray-700
                            outline-none
                            focus:border-indigo-400
                            focus:ring-2
                            focus:ring-indigo-100
                        "
                    >

                        <option value="ALL">
                            All Roles
                        </option>

                        {roles.map((role) => (

                            <option
                                key={role.id}
                                value={role.name}
                            >
                                {role.name}
                            </option>

                        ))}

                    </select>


                    {/* Status */}

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                        className="
                            px-3
                            py-2.5
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            text-sm
                            text-gray-700
                            outline-none
                            focus:border-indigo-400
                            focus:ring-2
                            focus:ring-indigo-100
                        "
                    >

                        <option value="ALL">
                            All Status
                        </option>

                        <option value="ACTIVE">
                            Active
                        </option>

                        <option value="INACTIVE">
                            Inactive
                        </option>

                    </select>

                </div>


                {/* Result count */}

                <div className="mt-3">

                    <p className="
                        text-xs
                        text-gray-400
                    ">

                        Showing{" "}

                        <span className="
                            font-semibold
                            text-gray-600
                        ">
                            {filteredUsers.length}
                        </span>

                        {" "}of{" "}

                        <span className="
                            font-semibold
                            text-gray-600
                        ">
                            {users.length}
                        </span>

                        {" "}employees

                    </p>

                </div>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

                <div className="
                    bg-red-50
                    border
                    border-red-200
                    rounded-xl
                    p-4
                    text-sm
                    text-red-700
                ">
                    {error}
                </div>

            )}


            {/* ================================================= */}
            {/* LOADING */}
            {/* ================================================= */}

            {loading ? (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    py-16
                    flex
                    flex-col
                    items-center
                    justify-center
                ">

                    <Loader2
                        size={30}
                        className="
                            animate-spin
                            text-indigo-600
                        "
                    />

                    <p className="
                        text-sm
                        text-gray-500
                        mt-3
                    ">
                        Loading employees...
                    </p>

                </div>

            ) : filteredUsers.length === 0 ? (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    py-16
                    flex
                    flex-col
                    items-center
                    justify-center
                ">

                    <div className="
                        w-12
                        h-12
                        rounded-xl
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                    ">

                        <UserRound
                            size={22}
                            className="text-gray-400"
                        />

                    </div>

                    <h3 className="
                        text-sm
                        font-bold
                        text-gray-800
                        mt-4
                    ">
                        No employees found
                    </h3>

                    <p className="
                        text-xs
                        text-gray-500
                        mt-1
                    ">
                        Try changing the search or filters.
                    </p>

                </div>

            ) : (

                <div className="space-y-3">

                    {filteredUsers.map((user) => (

                        <UserRoleRow
                            key={user.id}
                            user={user}

                            /*
                             * IMPORTANT FIX:
                             *
                             * Use roles returned by
                             * /api/users directly.
                             */
                            roles={(user.roles || []).map(
                                (roleName) => ({
                                    id: roleName,
                                    name: roleName,
                                })
                            )}

                            onAssignRoles={
                                handleAssignRoles
                            }
                        />

                    ))}

                </div>

            )}


            {/* ================================================= */}
            {/* ASSIGN ROLE MODAL */}
            {/* ================================================= */}

            {selectedUser && (

                <AssignRolesModal
                    user={selectedUser}
                    roles={roles}

                    onClose={() =>
                        setSelectedUser(null)
                    }

                    onSaved={handleSaved}
                />

            )}

        </div>
    );
}