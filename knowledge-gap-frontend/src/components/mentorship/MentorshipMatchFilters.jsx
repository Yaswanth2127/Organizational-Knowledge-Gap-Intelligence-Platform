import React from "react";

import SkillSearchSelect
    from "../knowledge/SkillSearchSelect";


const DEFAULT_FILTERS = {
    mentorId: "",
    menteeId: "",
    skillId: "",
    status: "",
};


const MentorshipMatchFilters = ({
    filters = DEFAULT_FILTERS,
    onChange = () => {},
    onReset = () => {},
    users = [],
    skills = [],
}) => {

    // Prevent crashes if invalid values are passed
    const safeFilters = {
        ...DEFAULT_FILTERS,
        ...(filters || {}),
    };

    const safeUsers =
        Array.isArray(users)
            ? users
            : [];

    const safeSkills =
        Array.isArray(skills)
            ? skills
            : [];


    return (
        <div className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
        ">

            <div className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
                lg:grid-cols-4
            ">


                {/* =================================================
                    MENTOR
                ================================================= */}

                <div>

                    <label className="
                        mb-1
                        block
                        text-sm
                        font-medium
                        text-gray-700
                    ">
                        Mentor
                    </label>


                    <select
                        value={safeFilters.mentorId}
                        onChange={(e) =>
                            onChange(
                                "mentorId",
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-3
                            py-2.5
                            text-sm
                            outline-none
                            focus:border-indigo-500
                            focus:ring-1
                            focus:ring-indigo-500
                        "
                    >

                        <option value="">
                            All Mentors
                        </option>


                        {safeUsers.map((user) => (

                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.fullName ||
                                    user.name ||
                                    user.email ||
                                    `User #${user.id}`}
                            </option>

                        ))}

                    </select>

                </div>


                {/* =================================================
                    MENTEE
                ================================================= */}

                <div>

                    <label className="
                        mb-1
                        block
                        text-sm
                        font-medium
                        text-gray-700
                    ">
                        Mentee
                    </label>


                    <select
                        value={safeFilters.menteeId}
                        onChange={(e) =>
                            onChange(
                                "menteeId",
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-3
                            py-2.5
                            text-sm
                            outline-none
                            focus:border-indigo-500
                            focus:ring-1
                            focus:ring-indigo-500
                        "
                    >

                        <option value="">
                            All Mentees
                        </option>


                        {safeUsers.map((user) => (

                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.fullName ||
                                    user.name ||
                                    user.email ||
                                    `User #${user.id}`}
                            </option>

                        ))}

                    </select>

                </div>


                {/* =================================================
                    SKILL
                ================================================= */}

                <div>

                    <label className="
                        mb-1
                        block
                        text-sm
                        font-medium
                        text-gray-700
                    ">
                        Skill
                    </label>


                    <SkillSearchSelect
                        skills={safeSkills}
                        value={safeFilters.skillId}
                        onChange={(value) =>
                            onChange(
                                "skillId",
                                value
                            )
                        }
                        placeholder="Search and select skill..."
                    />

                </div>


                {/* =================================================
                    STATUS
                ================================================= */}

                <div>

                    <label className="
                        mb-1
                        block
                        text-sm
                        font-medium
                        text-gray-700
                    ">
                        Status
                    </label>


                    <select
                        value={safeFilters.status}
                        onChange={(e) =>
                            onChange(
                                "status",
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-3
                            py-2.5
                            text-sm
                            outline-none
                            focus:border-indigo-500
                            focus:ring-1
                            focus:ring-indigo-500
                        "
                    >

                        <option value="">
                            All Statuses
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="ACTIVE">
                            Active
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


            {/* =================================================
                RESET
            ================================================= */}

            <div className="
                mt-4
                flex
                justify-end
            ">

                <button
                    type="button"
                    onClick={onReset}
                    className="
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-600
                        transition
                        hover:bg-gray-100
                    "
                >
                    Reset Filters
                </button>

            </div>

        </div>
    );
};


export default MentorshipMatchFilters;