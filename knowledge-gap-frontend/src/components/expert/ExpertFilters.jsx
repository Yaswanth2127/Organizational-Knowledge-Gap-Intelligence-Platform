import React from "react";
import { Filter, X } from "lucide-react";

const ExpertFilters = ({
    level,
    onLevelChange,
}) => {
    const levels = [
        "ALL",
        "BEGINNER",
        "INTERMEDIATE",
        "ADVANCED",
        "EXPERT",
    ];

    const clearFilters = () => {
        onLevelChange("ALL");
    };

    const hasFilter = level !== "ALL";

    return (
        <div className="flex flex-col sm:flex-row gap-3">

            {/* Expertise Level */}
            <div className="flex items-center gap-2">

                <Filter
                    size={18}
                    className="text-gray-500"
                />

                <select
                    value={level}
                    onChange={(e) =>
                        onLevelChange(e.target.value)
                    }
                    className="px-4 py-3
                               border border-gray-300
                               rounded-xl
                               bg-white
                               text-gray-700
                               focus:outline-none
                               focus:ring-2
                               focus:ring-indigo-500"
                >
                    {levels.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item === "ALL"
                                ? "All Expertise Levels"
                                : item}
                        </option>
                    ))}
                </select>

            </div>

            {/* Clear */}
            {hasFilter && (
                <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center
                               justify-center gap-2
                               px-4 py-3
                               rounded-xl
                               border border-gray-300
                               text-gray-600
                               hover:bg-gray-50"
                >
                    <X size={17} />
                    Clear
                </button>
            )}

        </div>
    );
};

export default ExpertFilters;