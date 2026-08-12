import React from "react";
import { SearchX, Users } from "lucide-react";

const EmptyExperts = ({
    hasFilters = false,
    onClearFilters,
}) => {
    return (
        <div className="bg-white border border-gray-200
                        rounded-2xl p-12 text-center">

            <div className="flex justify-center">
                <div className="p-4 bg-gray-100 rounded-full">
                    {hasFilters ? (
                        <SearchX
                            size={36}
                            className="text-gray-400"
                        />
                    ) : (
                        <Users
                            size={36}
                            className="text-gray-400"
                        />
                    )}
                </div>
            </div>

            <h3 className="text-xl font-semibold
                           text-gray-800 mt-5">
                {hasFilters
                    ? "No experts found"
                    : "No experts available"}
            </h3>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                {hasFilters
                    ? "Try changing your search or filters to find matching experts."
                    : "There are currently no experts listed in the directory."}
            </p>

            {hasFilters && onClearFilters && (
                <button
                    type="button"
                    onClick={onClearFilters}
                    className="mt-5 px-5 py-2.5
                               rounded-lg
                               bg-indigo-600
                               text-white
                               hover:bg-indigo-700"
                >
                    Clear Filters
                </button>
            )}

        </div>
    );
};

export default EmptyExperts;