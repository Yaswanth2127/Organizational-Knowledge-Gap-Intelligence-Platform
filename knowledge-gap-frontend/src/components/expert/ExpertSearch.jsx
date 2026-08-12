import React from "react";
import { Search, X } from "lucide-react";

const ExpertSearch = ({
    value,
    onChange,
    placeholder = "Search experts by name, email or skill...",
}) => {
    const handleClear = () => {
        onChange("");
    };

    return (
        <div className="relative w-full">

            <Search
                size={20}
                className="absolute left-4 top-1/2
                           -translate-y-1/2
                           text-gray-400"
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-11 pr-11 py-3
                           border border-gray-300
                           rounded-xl
                           bg-white
                           text-gray-800
                           placeholder-gray-400
                           focus:outline-none
                           focus:ring-2
                           focus:ring-indigo-500
                           focus:border-indigo-500"
            />

            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2
                               -translate-y-1/2
                               p-1 rounded-full
                               text-gray-400
                               hover:text-gray-600
                               hover:bg-gray-100"
                    aria-label="Clear search"
                >
                    <X size={18} />
                </button>
            )}

        </div>
    );
};

export default ExpertSearch;