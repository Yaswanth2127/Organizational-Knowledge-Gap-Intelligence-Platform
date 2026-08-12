import React from "react";
import {
    Award,
    Eye,
    Mail,
    Star,
    User,
} from "lucide-react";

const ExpertCard = ({ expert, onView }) => {
    const expertiseLevel = expert.expertiseLevel || "N/A";

    const getLevelStyle = (level) => {
        switch (level) {
            case "EXPERT":
                return "bg-green-100 text-green-700";

            case "ADVANCED":
                return "bg-blue-100 text-blue-700";

            case "INTERMEDIATE":
                return "bg-yellow-100 text-yellow-700";

            case "BEGINNER":
                return "bg-gray-100 text-gray-700";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="bg-white border border-gray-200
                        rounded-2xl p-6
                        shadow-sm
                        hover:shadow-md
                        transition-shadow">

            {/* PROFILE HEADER */}
            <div className="flex items-start gap-4">

                <div className="w-14 h-14
                                rounded-full
                                bg-indigo-100
                                flex items-center
                                justify-center
                                flex-shrink-0">

                    <User
                        size={28}
                        className="text-indigo-600"
                    />

                </div>

                <div className="min-w-0 flex-1">

                    <h3 className="text-lg font-semibold
                                   text-gray-900
                                   truncate">
                        {expert.employeeName}
                    </h3>

                    <div className="flex items-center
                                    gap-2 mt-1
                                    text-sm text-gray-500">

                        <Mail size={15} />

                        <span className="truncate">
                            {expert.employeeEmail}
                        </span>

                    </div>

                </div>

            </div>

            {/* SKILL */}
            <div className="mt-6">

                <div className="flex items-center gap-2
                                text-sm text-gray-500">

                    <Award
                        size={17}
                        className="text-indigo-500"
                    />

                    <span>Expertise</span>

                </div>

                <p className="text-lg font-semibold
                              text-gray-800 mt-1">
                    {expert.skillName}
                </p>

            </div>

            {/* LEVEL + ENDORSEMENTS */}
            <div className="flex items-center
                            justify-between
                            mt-5">

                <span
                    className={`px-3 py-1 rounded-full
                                text-sm font-semibold
                                ${getLevelStyle(expertiseLevel)}`}
                >
                    {expertiseLevel}
                </span>

                <div className="flex items-center
                                gap-1.5
                                text-sm text-gray-600">

                    <Star
                        size={17}
                        className="text-yellow-500"
                        fill="currentColor"
                    />

                    <span>
                        {expert.endorsementCount ?? 0}
                    </span>

                    <span className="text-gray-400">
                        endorsements
                    </span>

                </div>

            </div>

            {/* ACTION */}
            <button
                type="button"
                onClick={() => onView(expert)}
                className="w-full mt-6
                           flex items-center
                           justify-center gap-2
                           px-4 py-2.5
                           rounded-xl
                           bg-indigo-600
                           text-white
                           font-medium
                           hover:bg-indigo-700
                           transition-colors"
            >
                <Eye size={18} />
                View Expertise
            </button>

        </div>
    );
};

export default ExpertCard;