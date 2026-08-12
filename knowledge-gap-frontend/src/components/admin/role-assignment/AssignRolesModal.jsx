import React, { useEffect, useMemo, useState } from "react";
import {
    X,
    ShieldCheck,
    AlertTriangle,
    Loader2,
    Save,
} from "lucide-react";

import roleService from "../../../services/roleService";
import RoleCheckbox from "./RoleCheckbox";
import RoleBadge from "./RoleBadge";

export default function AssignRolesModal({
    user,
    roles,
    onClose,
    onSaved,
}) {

    const [selectedRoleIds, setSelectedRoleIds] = useState([]);
    const [currentRoles, setCurrentRoles] = useState([]);

    const [loadingRoles, setLoadingRoles] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [showAdminConfirmation, setShowAdminConfirmation] =
        useState(false);

    useEffect(() => {

        if (!user) {
            return;
        }

        loadUserRoles();

    }, [user]);

    const loadUserRoles = async () => {

        try {

            setLoadingRoles(true);
            setError("");

            const response =
                await roleService.getUserRoles(user.id);

            const userRoles = response.data || [];

            setCurrentRoles(userRoles);

            setSelectedRoleIds(
                userRoles.map((role) => role.id)
            );

        } catch (err) {

            console.error(
                "Failed to load user roles:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load the user's current roles."
            );

        } finally {

            setLoadingRoles(false);

        }
    };

    const toggleRole = (roleId) => {

        setSelectedRoleIds((current) => {

            if (current.includes(roleId)) {

                return current.filter(
                    (id) => id !== roleId
                );
            }

            return [...current, roleId];
        });
    };

    const selectedRoles = useMemo(() => {

        return roles.filter((role) =>
            selectedRoleIds.includes(role.id)
        );

    }, [roles, selectedRoleIds]);

    const hasSystemAdminRole = selectedRoles.some(
        (role) => role.name === "SYS_ADMIN"
    );

    const hadSystemAdminRole = currentRoles.some(
        (role) => role.name === "SYS_ADMIN"
    );

    const handleSaveClick = () => {

        setError("");

        if (selectedRoleIds.length === 0) {

            setError(
                "At least one role must be assigned."
            );

            return;
        }

        /*
         * Ask for an explicit confirmation when
         * SYS_ADMIN is being newly granted.
         */
        if (
            hasSystemAdminRole &&
            !hadSystemAdminRole
        ) {
            setShowAdminConfirmation(true);
            return;
        }

        saveRoles();
    };

    const saveRoles = async () => {

        try {

            setSaving(true);
            setError("");

            const response =
                await roleService.assignRoles(
                    user.id,
                    selectedRoleIds
                );

            setShowAdminConfirmation(false);

            onSaved(
                user.id,
                response.data || []
            );

        } catch (err) {

            console.error(
                "Failed to assign roles:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to update roles."
            );

        } finally {

            setSaving(false);

        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                onClick={saving ? undefined : onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100">

                    <div className="flex items-start justify-between gap-4">

                        <div className="flex items-start gap-3">

                            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <ShieldCheck
                                    size={21}
                                    className="text-indigo-600"
                                />
                            </div>

                            <div>

                                <h2 className="text-lg font-bold text-gray-900">
                                    Assign Roles
                                </h2>

                                <p className="text-xs text-gray-500 mt-1">
                                    Control this employee's access and responsibilities in OKGIP.
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                        >
                            <X size={19} />
                        </button>

                    </div>

                </div>

                {/* User information */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">

                    <div className="flex items-center justify-between gap-4">

                        <div>

                            <h3 className="text-sm font-bold text-gray-900">
                                {user.fullName}
                            </h3>

                            <p className="text-xs text-gray-500 mt-0.5">
                                {user.email}
                            </p>

                        </div>

                        <div className="hidden sm:block text-right">

                            <p className="text-[10px] uppercase tracking-wide font-semibold text-gray-400">
                                Current Roles
                            </p>

                            <div className="flex gap-1.5 mt-1 justify-end flex-wrap">

                                {currentRoles.length > 0 ? (
                                    currentRoles.map((role) => (
                                        <RoleBadge
                                            key={role.id}
                                            role={role.name}
                                        />
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400">
                                        None
                                    </span>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Content */}
                <div className="px-6 py-5 overflow-y-auto max-h-[55vh]">

                    {loadingRoles ? (

                        <div className="py-12 flex flex-col items-center justify-center">

                            <Loader2
                                size={28}
                                className="animate-spin text-indigo-600"
                            />

                            <p className="text-sm text-gray-500 mt-3">
                                Loading current roles...
                            </p>

                        </div>

                    ) : (

                        <>

                            <div className="mb-5">

                                <h3 className="text-sm font-bold text-gray-900">
                                    Select Roles
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    Select all roles that should be assigned to this employee.
                                </p>

                            </div>

                            <div className="space-y-3">

                                {roles
                                    .filter(
                                        (role) =>
                                            role.name !== "SYS_ADMIN"
                                    )
                                    .map((role) => (

                                        <RoleCheckbox
                                            key={role.id}
                                            role={role}
                                            checked={selectedRoleIds.includes(
                                                role.id
                                            )}
                                            onChange={
                                                toggleRole
                                            }
                                        />

                                    ))}

                            </div>

                            {/* System Admin */}
                            {roles.some(
                                (role) =>
                                    role.name === "SYS_ADMIN"
                            ) && (

                                <div className="mt-6">

                                    <div className="flex items-center gap-2 mb-3">

                                        <div className="h-px flex-1 bg-gray-200" />

                                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                                            Administrative Access
                                        </span>

                                        <div className="h-px flex-1 bg-gray-200" />

                                    </div>

                                    {roles
                                        .filter(
                                            (role) =>
                                                role.name ===
                                                "SYS_ADMIN"
                                        )
                                        .map((role) => (

                                            <RoleCheckbox
                                                key={role.id}
                                                role={role}
                                                checked={selectedRoleIds.includes(
                                                    role.id
                                                )}
                                                onChange={
                                                    toggleRole
                                                }
                                            />

                                        ))}

                                </div>
                            )}

                            {/* Warning */}
                            {hasSystemAdminRole && (

                                <div className="mt-5 flex gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50">

                                    <AlertTriangle
                                        size={18}
                                        className="text-amber-600 flex-shrink-0 mt-0.5"
                                    />

                                    <div>

                                        <p className="text-xs font-bold text-amber-800">
                                            System Administrator access selected
                                        </p>

                                        <p className="text-xs text-amber-700 mt-1 leading-5">
                                            This role provides high-level platform access, including user and role management. Only assign it when this access is required.
                                        </p>

                                    </div>

                                </div>
                            )}

                            {/* Error */}
                            {error && (

                                <div className="mt-5 p-3.5 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                        </>
                    )}

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">

                    <p className="text-xs text-gray-400 hidden sm:block">
                        {selectedRoleIds.length} role
                        {selectedRoleIds.length === 1
                            ? ""
                            : "s"} selected
                    </p>

                    <div className="flex items-center gap-2 ml-auto">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSaveClick}
                            disabled={
                                loadingRoles ||
                                saving
                            }
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition disabled:opacity-60"
                        >
                            {saving ? (
                                <>
                                    <Loader2
                                        size={15}
                                        className="animate-spin"
                                    />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={15} />
                                    Save Roles
                                </>
                            )}
                        </button>

                    </div>

                </div>

                {/* System Admin confirmation */}
                {showAdminConfirmation && (

                    <div className="absolute inset-0 bg-white flex items-center justify-center p-6">

                        <div className="max-w-md w-full">

                            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto">

                                <AlertTriangle
                                    size={27}
                                    className="text-amber-600"
                                />

                            </div>

                            <h3 className="text-lg font-bold text-gray-900 text-center mt-5">
                                Grant System Administrator access?
                            </h3>

                            <p className="text-sm text-gray-500 text-center mt-2 leading-6">
                                You are about to give{" "}
                                <strong className="text-gray-800">
                                    {user.fullName}
                                </strong>{" "}
                                system-level administrative access.
                            </p>

                            <div className="mt-5 p-4 rounded-xl bg-amber-50 border border-amber-200">

                                <p className="text-xs text-amber-800 leading-5">
                                    Only continue if this employee is authorized to manage users, roles and platform configuration.
                                </p>

                            </div>

                            <div className="flex gap-3 mt-6">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAdminConfirmation(false)
                                    }
                                    disabled={saving}
                                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                >
                                    Go Back
                                </button>

                                <button
                                    type="button"
                                    onClick={saveRoles}
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
                                >
                                    {saving ? (
                                        <Loader2
                                            size={15}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <ShieldCheck size={15} />
                                    )}

                                    Confirm Access
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}