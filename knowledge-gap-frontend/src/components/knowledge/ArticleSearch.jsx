import React from "react";
import { Search, X } from "lucide-react";

const ArticleSearch = ({
    value,
    onChange,
    placeholder = "Search articles...",
}) => {

    const handleClear = () => {
        onChange("");
    };

    return (
        <div className="relative w-full">
            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-11 pr-10 py-3 border border-gray-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           focus:border-indigo-500 text-gray-700"
            />

            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                               text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default ArticleSearch;