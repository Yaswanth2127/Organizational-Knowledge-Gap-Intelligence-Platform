import React from "react";
import {
    BookOpen,
    ArrowRight,
    Clock,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";

export default function LearningRecommendations({ recommendations }) {

    const getPriorityStyle = (priority) => {

        switch (priority) {

            case "High":
                return {
                    badge: "bg-red-100 text-red-700",
                    icon: AlertTriangle
                };

            case "Medium":
                return {
                    badge: "bg-yellow-100 text-yellow-700",
                    icon: Clock
                };

            default:
                return {
                    badge: "bg-green-100 text-green-700",
                    icon: CheckCircle2
                };

        }

    };

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8">

            {/* ==========================================
                    Header
            ========================================== */}

            <div className="flex justify-between items-center p-8 border-b">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Learning Recommendations

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Personalized recommendations based on your competency gaps.

                    </p>

                </div>

                <BookOpen
                    size={36}
                    className="text-indigo-600"
                />

            </div>

            {/* ==========================================
                    Recommendation Cards
            ========================================== */}

            <div className="grid lg:grid-cols-3 gap-6 p-8">

                {

                    recommendations.map((course, index) => {

                        const PriorityIcon =
                            getPriorityStyle(course.priority).icon;

                        const badge =
                            getPriorityStyle(course.priority).badge;

                        return (

                            <div
                                key={index}
                                className="border rounded-2xl p-6 hover:shadow-lg transition duration-300"
                            >

                                <div className="flex justify-between items-start">

                                    <BookOpen
                                        size={32}
                                        className="text-indigo-600"
                                    />

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${badge}`}
                                    >

                                        <PriorityIcon
                                            size={14}
                                            className="inline mr-1"
                                        />

                                        {course.priority}

                                    </span>

                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mt-6">

                                    {course.title}

                                </h3>

                                <p className="text-gray-600 mt-4 leading-relaxed">

                                    {course.reason}

                                </p>

                                <div className="flex justify-between mt-6">

                                    <span className="text-gray-500">

                                        Duration

                                    </span>

                                    <span className="font-semibold">

                                        {course.duration}

                                    </span>

                                </div>

                                <button
                                    className="
                                        mt-8
                                        w-full
                                        bg-indigo-600
                                        hover:bg-indigo-700
                                        text-white
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        transition
                                    "
                                >

                                    Start Learning

                                    <ArrowRight size={18} />

                                </button>

                            </div>

                        );

                    })

                }

            </div>

            {/* ==========================================
                    Bottom Summary
            ========================================== */}

            <div className="bg-indigo-50 border-t px-8 py-6 rounded-b-3xl">

                <p className="text-gray-700">

                    <span className="font-semibold">

                        Recommendation Engine:

                    </span>

                    {" "}
                    These recommendations are generated by comparing your
                    current skills with your assigned competency framework.
                    Completing them will improve your competency score and
                    prepare you for future career growth.

                </p>

            </div>

        </div>

    );

}