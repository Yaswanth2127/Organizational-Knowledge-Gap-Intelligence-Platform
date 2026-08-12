import React from "react";

const DEFAULT_FILTERS = {
    hostId: "",
    skillId: "",
    status: "",
};

const KnowledgeSessionFilters = ({
    filters = DEFAULT_FILTERS,
    onChange = () => {},
    onReset = () => {},
    users = [],
    skills = [],
}) => {

    const safeFilters = {
        ...DEFAULT_FILTERS,
        ...(filters || {}),
    };

    const safeUsers = Array.isArray(users) ? users : [];
    const safeSkills = Array.isArray(skills) ? skills : [];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Host */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Host
                    </label>

                    <select
                        value={safeFilters.hostId}
                        onChange={(e) =>
                            onChange("hostId", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">
                            All Hosts
                        </option>

                        {safeUsers.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.fullName ||
                                    user.name ||
                                    user.email ||
                                    `User #${user.id}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Skill */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Skill
                    </label>

                    <select
                        value={safeFilters.skillId}
                        onChange={(e) =>
                            onChange("skillId", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">
                            All Skills
                        </option>

                        {safeSkills.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name || `Skill #${skill.id}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Status
                    </label>

                    <select
                        value={safeFilters.status}
                        onChange={(e) =>
                            onChange("status", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">
                            All Statuses
                        </option>

                        <option value="SCHEDULED">
                            Scheduled
                        </option>

                        <option value="ONGOING">
                            Ongoing
                        </option>

                        <option value="COMPLETED">
                            Completed
                        </option>

                        <option value="CANCELLED">
                            Cancelled
                        </option>
                    </select>
                </div>

            </div>

            <div className="mt-4 flex justify-end">

                <button
                    type="button"
                    onClick={onReset}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                    Reset Filters
                </button>

            </div>

        </div>
    );
};

export default KnowledgeSessionFilters;