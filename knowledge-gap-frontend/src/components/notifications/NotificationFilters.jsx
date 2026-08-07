import React from "react";
import {
    Search,
    Filter,
} from "lucide-react";

const NotificationFilters = ({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
}) => {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search notifications..."
                        className="
                            w-full
                            pl-10
                            pr-4
                            py-3
                            rounded-xl
                            border
                            border-gray-300
                            focus:ring-2
                            focus:ring-indigo-500
                            outline-none
                        "
                    />

                </div>

                {/* Status Filter */}

                <div className="relative">

                    <Filter
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="
                            w-full
                            pl-10
                            pr-4
                            py-3
                            rounded-xl
                            border
                            border-gray-300
                            focus:ring-2
                            focus:ring-indigo-500
                            outline-none
                        "
                    >

                        <option value="ALL">

                            All Status

                        </option>

                        <option value="PENDING">

                            Unread

                        </option>

                        <option value="READ">

                            Read

                        </option>

                    </select>

                </div>

                {/* Type Filter */}

                <div>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            border-gray-300
                            focus:ring-2
                            focus:ring-indigo-500
                            outline-none
                        "
                    >

                        <option value="ALL">

                            All Types

                        </option>

                        <option value="ASSESSMENT_ASSIGNED">

                            Assessment

                        </option>

                        <option value="LEARNING_PATH_GENERATED">

                            Learning Path

                        </option>

                        <option value="PEER_REVIEW_REQUEST">

                            Peer Review

                        </option>

                        <option value="SKILL_GAP_DETECTED">

                            Skill Gap

                        </option>

                        <option value="CERTIFICATION_EXPIRING">

                            Certification

                        </option>

                        <option value="GENERAL">

                            General

                        </option>

                    </select>

                </div>

            </div>

        </div>

    );

};

export default NotificationFilters;