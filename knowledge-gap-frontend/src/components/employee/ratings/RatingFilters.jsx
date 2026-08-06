import React from "react";
import { Search, Filter } from "lucide-react";

const RatingFilters = ({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
}) => {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Header */}

            <div className="flex items-center gap-2 mb-5">

                <Filter
                    size={20}
                    className="text-indigo-600"
                />

                <h2 className="text-lg font-semibold text-gray-800">

                    Search & Filter

                </h2>

            </div>

            {/* Filters */}

            <div className="flex flex-col lg:flex-row gap-4">

                {/* Search */}

                <div className="relative flex-1">

                    <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search employee or skill..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            py-3
                            pl-12
                            pr-4
                            text-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            transition
                        "
                    />

                </div>

                {/* Status */}

                <div className="lg:w-64">

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-3
                            text-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            transition
                        "
                    >

                        <option value="">
                            All Reviews
                        </option>

                        <option value="PENDING">
                            Pending Reviews
                        </option>

                        <option value="REVIEWED">
                            Reviewed
                        </option>

                    </select>

                </div>

            </div>

        </div>

    );

};

export default RatingFilters;