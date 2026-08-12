import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";

const SkillSearchSelect = ({
    skills = [],
    value,
    onChange,
    disabled = false,
    placeholder = "Search and select a skill...",
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef(null);

    const selectedSkill = skills.find(
        (skill) => String(skill.id) === String(value)
    );

    const filteredSkills = skills.filter((skill) =>
        skill.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleSelect = (skill) => {
        onChange(skill.id);
        setSearch("");
        setOpen(false);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange("");
        setSearch("");
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full"
        >
            {/* Selected skill / search trigger */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between
                           px-4 py-3 border border-gray-300 rounded-xl
                           bg-white text-left
                           focus:outline-none focus:ring-2
                           focus:ring-indigo-500
                           disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
                <span
                    className={
                        selectedSkill
                            ? "text-gray-800"
                            : "text-gray-400"
                    }
                >
                    {selectedSkill
                        ? selectedSkill.name
                        : placeholder}
                </span>

                <div className="flex items-center gap-2">

                    {selectedSkill && (
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={handleClear}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={17} />
                        </span>
                    )}

                    <ChevronDown
                        size={18}
                        className="text-gray-400"
                    />

                </div>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full bg-white
                                border border-gray-200 rounded-xl
                                shadow-xl overflow-hidden">

                    {/* Search */}
                    <div className="p-3 border-b">
                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-1/2
                                           -translate-y-1/2
                                           text-gray-400"
                            />

                            <input
                                type="text"
                                autoFocus
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search skills..."
                                className="w-full pl-10 pr-3 py-2.5
                                           border border-gray-300
                                           rounded-lg
                                           focus:outline-none
                                           focus:ring-2
                                           focus:ring-indigo-500"
                            />

                        </div>
                    </div>

                    {/* Skills */}
                    <div className="max-h-60 overflow-y-auto">

                        {filteredSkills.length === 0 ? (
                            <div className="px-4 py-8 text-center">

                                <p className="text-sm text-gray-500">
                                    No skills found
                                </p>

                            </div>
                        ) : (
                            filteredSkills.map((skill) => {

                                const isSelected =
                                    String(skill.id) ===
                                    String(value);

                                return (
                                    <button
                                        key={skill.id}
                                        type="button"
                                        onClick={() =>
                                            handleSelect(skill)
                                        }
                                        className="w-full flex items-center
                                                   justify-between px-4 py-3
                                                   text-left hover:bg-indigo-50
                                                   transition"
                                    >
                                        <span
                                            className={
                                                isSelected
                                                    ? "font-semibold text-indigo-700"
                                                    : "text-gray-700"
                                            }
                                        >
                                            {skill.name}
                                        </span>

                                        {isSelected && (
                                            <Check
                                                size={18}
                                                className="text-indigo-600"
                                            />
                                        )}
                                    </button>
                                );
                            })
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillSearchSelect;