import React from "react";
import {
    ClipboardCheck,
    CalendarDays,
    Clock,
    ArrowRight
} from "lucide-react";

export default function UpcomingAssessments({ assessments }) {

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8">

            {/* ==========================================
                        Header
            ========================================== */}

            <div className="flex justify-between items-center p-8 border-b">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Upcoming Assessments

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Complete your assigned assessments before the due date.

                    </p>

                </div>

                <ClipboardCheck
                    size={36}
                    className="text-green-600"
                />

            </div>

            {/* ==========================================
                        Assessment Cards
            ========================================== */}

            <div className="p-8 space-y-5">

                {

                    assessments.map((assessment, index) => (

                        <div

                            key={index}

                            className="
                                border
                                rounded-2xl
                                p-6
                                hover:shadow-lg
                                transition
                                flex
                                flex-col
                                lg:flex-row
                                justify-between
                                lg:items-center
                                gap-6
                            "

                        >

                            <div>

                                <h3 className="text-xl font-bold text-gray-800">

                                    {assessment.title}

                                </h3>

                                <div className="flex flex-wrap gap-6 mt-4">

                                    <div className="flex items-center gap-2 text-gray-500">

                                        <CalendarDays size={18} />

                                        {assessment.date}

                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500">

                                        <Clock size={18} />

                                        60 Minutes

                                    </div>

                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">

                                    {assessment.status}

                                </span>

                                <button

                                    className="
                                        bg-indigo-600
                                        hover:bg-indigo-700
                                        text-white
                                        px-6
                                        py-3
                                        rounded-xl
                                        flex
                                        items-center
                                        gap-2
                                        transition
                                    "

                                >

                                    Start

                                    <ArrowRight size={18} />

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* ==========================================
                        Footer
            ========================================== */}

            <div className="bg-green-50 border-t rounded-b-3xl px-8 py-6">

                <p className="text-gray-700">

                    Completing assessments helps improve your competency score
                    and validates your proficiency level within your assigned role.

                </p>

            </div>

        </div>

    );

}