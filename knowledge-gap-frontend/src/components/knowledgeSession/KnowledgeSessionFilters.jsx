import React from "react";
import { Search } from "lucide-react";

import SkillSearchSelect from "../knowledge/SkillSearchSelect";
// Change this import path if your SkillSearchSelect is in a different folder.


const DEFAULT_FILTERS = {
    hostSearch: "",
    skillId: "",
    date: "",
    status: "",
};


const KnowledgeSessionFilters = ({
    filters = DEFAULT_FILTERS,
    onChange = () => {},
    onReset = () => {},
    skills = [],
}) => {

    const safeFilters = {
        ...DEFAULT_FILTERS,
        ...(filters || {}),
    };


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
                xl:grid-cols-4
            ">

                {/* Host Search */}

                <div>

                    <label className="
                        mb-1
                        block
                        text-sm
                        font-medium
                        text-gray-700
                    ">
                        Host
                    </label>

                    <div className="relative">

                        <Search
                            size={17}
                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            "
                        />

                        <input
                            type="text"
                            value={safeFilters.hostSearch}
                            onChange={(e) =>
                                onChange(
                                    "hostSearch",
                                    e.target.value
                                )
                            }
                            placeholder="Search host..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                py-3
                                pl-10
                                pr-3
                                text-sm
                                outline-none
                                transition
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                            "
                        />

                    </div>

                </div>


                {/* Skill */}

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
                        placeholder="Search and select a skill..."
                    />

                </div>


                {/* Date */}

                <div>

                    <label className="
                        mb-1
                        block
                        text-sm
                        font-medium
                        text-gray-700
                    ">
                        Date
                    </label>

                    <input
                        type="date"
                        value={safeFilters.date}
                        onChange={(e) =>
                            onChange(
                                "date",
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-3
                            py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-indigo-500
                            focus:ring-2
                            focus:ring-indigo-100
                        "
                    />

                </div>


                {/* Status */}

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
                            rounded-xl
                            border
                            border-gray-300
                            px-3
                            py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-indigo-500
                            focus:ring-2
                            focus:ring-indigo-100
                        "
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


            {/* Reset */}

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


export default KnowledgeSessionFilters;