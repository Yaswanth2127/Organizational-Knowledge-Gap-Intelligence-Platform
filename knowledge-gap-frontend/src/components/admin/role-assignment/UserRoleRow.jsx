import React from "react";
import {
    ShieldCheck,
    UserRound,
    Building2,
    BriefcaseBusiness,
    CircleCheck,
    CircleX,
} from "lucide-react";

import RoleBadge from "./RoleBadge";

export default function UserRoleRow({
    user,
    roles = [],
    onAssignRoles,
}) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 hover:shadow-md transition-all">

            <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                {/* Employee */}
                <div className="flex items-center gap-3 lg:w-[240px] flex-shrink-0">

                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 overflow-hidden">

                        {user.profileImageUrl ? (
                            <img
                                src={user.profileImageUrl}
                                alt={user.fullName}
                                className="w-12 h-12 rounded-xl object-cover"
                            />
                        ) : (
                            <UserRound
                                size={20}
                                className="text-indigo-600"
                            />
                        )}

                    </div>

                    <div className="min-w-0">

                        <h3 className="font-semibold text-gray-900 truncate">
                            {user.fullName}
                        </h3>

                        <p className="text-xs text-gray-500 truncate mt-0.5">
                            {user.email}
                        </p>

                        <div className="flex items-center gap-1.5 mt-1">

                            {user.isActive ? (
                                <>
                                    <CircleCheck
                                        size={12}
                                        className="text-emerald-500"
                                    />

                                    <span className="text-[11px] text-emerald-600 font-medium">
                                        Active
                                    </span>
                                </>
                            ) : (
                                <>
                                    <CircleX
                                        size={12}
                                        className="text-gray-400"
                                    />

                                    <span className="text-[11px] text-gray-400 font-medium">
                                        Inactive
                                    </span>
                                </>
                            )}

                        </div>

                    </div>

                </div>


                {/* Department */}
                <div className="flex-1 min-w-[160px]">

                    <div className="flex items-center gap-2 mb-1">

                        <Building2
                            size={14}
                            className="text-gray-400"
                        />

                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                            Department
                        </p>

                    </div>

                    <p className="text-sm font-medium text-gray-700">
                        {user.departmentName || "Not assigned"}
                    </p>

                </div>


                {/* Job Role */}
                <div className="flex-1 min-w-[160px]">

                    <div className="flex items-center gap-2 mb-1">

                        <BriefcaseBusiness
                            size={14}
                            className="text-gray-400"
                        />

                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                            Job Role
                        </p>

                    </div>

                    <p className="text-sm font-medium text-gray-700">
                        {user.jobRoleName || "Not assigned"}
                    </p>

                </div>


                {/* Assigned Roles */}
                <div className="flex-1 min-w-[180px]">

                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">
                        Assigned Roles
                    </p>

                    {roles.length > 0 ? (

                        <div className="flex flex-wrap gap-1.5">

                            {roles.map((role) => (
                                <RoleBadge
                                    key={role.id || role.name}
                                    role={role.name}
                                />
                            ))}

                        </div>

                    ) : (

                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-400">
                            No roles assigned
                        </span>

                    )}

                </div>


                {/* Assign Button */}
                <div className="flex-shrink-0">

                    <button
                        type="button"
                        onClick={() => onAssignRoles(user)}
                        className="
                            w-full lg:w-auto
                            flex items-center justify-center gap-2
                            px-4 py-2.5
                            rounded-xl
                            bg-indigo-600
                            hover:bg-indigo-700
                            text-white
                            text-xs
                            font-semibold
                            transition
                            shadow-sm
                        "
                    >
                        <ShieldCheck size={15} />
                        Assign Roles
                    </button>

                </div>

            </div>

        </div>
    );
}