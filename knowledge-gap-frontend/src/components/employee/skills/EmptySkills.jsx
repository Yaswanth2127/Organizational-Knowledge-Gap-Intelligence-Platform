import React from "react";
import {
    Award,
    PlusCircle,
} from "lucide-react";

const EmptySkills = ({ onAdd }) => {

    return (

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm">

            <div className="py-20 px-8 flex flex-col items-center text-center">

                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">

                    <Award
                        size={50}
                        className="text-indigo-600"
                    />

                </div>

                <h2 className="mt-8 text-2xl font-bold text-gray-800">

                    No Skills Added

                </h2>

                <p className="mt-3 text-gray-500 max-w-md leading-relaxed">

                    Start building your professional profile by adding your
                    technical skills. Your skills help generate competency
                    analysis, assessments, learning paths, and AI
                    recommendations.

                </p>

                <button

                    onClick={onAdd}

                    className="
                        mt-8
                        flex
                        items-center
                        gap-2
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        transition
                    "

                >

                    <PlusCircle size={20} />

                    Add Your First Skill

                </button>

            </div>

        </div>

    );

};

export default EmptySkills;