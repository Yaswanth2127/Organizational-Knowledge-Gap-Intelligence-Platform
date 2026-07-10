import React from "react";
import {
    BarChart3,
    TrendingUp,
    Award,
    ClipboardCheck,
    GraduationCap,
    BookOpen
} from "lucide-react";

export default function CompetencyProgress({ competency }) {

    const metrics = [
        {
            title: "Technical Skills",
            value: competency.technical,
            icon: Award,
            color: "bg-indigo-600"
        },
        {
            title: "Assessments",
            value: competency.assessments,
            icon: ClipboardCheck,
            color: "bg-green-600"
        },
        {
            title: "Certifications",
            value: competency.certifications,
            icon: GraduationCap,
            color: "bg-purple-600"
        },
        {
            title: "Learning Progress",
            value: competency.learning,
            icon: BookOpen,
            color: "bg-orange-600"
        }
    ];

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8 p-8">

            {/* Header */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Competency Progress

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Overall progress toward your assigned competency framework.

                    </p>

                </div>

                <BarChart3
                    size={36}
                    className="text-indigo-600"
                />

            </div>

            {/* Overall Score */}

            <div className="text-center">

                <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-indigo-50">

                    <div>

                        <h1 className="text-6xl font-bold text-indigo-600">

                            {competency.score}%

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Overall

                        </p>

                    </div>

                </div>

            </div>

            {/* Progress Bar */}

            <div className="mt-10">

                <div className="flex justify-between mb-2">

                    <span className="text-gray-600">

                        Competency Score

                    </span>

                    <span className="font-semibold">

                        {competency.score}%

                    </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                    <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{
                            width: `${competency.score}%`
                        }}
                    />

                </div>

            </div>

            {/* Breakdown */}

            <div className="grid md:grid-cols-2 gap-6 mt-10">

                {

                    metrics.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={index}
                                className="border rounded-2xl p-5 hover:shadow-md transition"
                            >

                                <div className="flex justify-between items-center">

                                    <div>

                                        <p className="text-gray-500">

                                            {item.title}

                                        </p>

                                        <h2 className="text-3xl font-bold text-gray-800 mt-2">

                                            {item.value}%

                                        </h2>

                                    </div>

                                    <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center`}>

                                        <Icon
                                            className="text-white"
                                            size={26}
                                        />

                                    </div>

                                </div>

                                <div className="mt-6">

                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                                        <div
                                            className={`${item.color} h-full rounded-full`}
                                            style={{
                                                width: `${item.value}%`
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            {/* Summary */}

            <div className="mt-10 rounded-2xl bg-indigo-50 border border-indigo-100 p-6">

                <div className="flex items-start gap-4">

                    <TrendingUp
                        size={28}
                        className="text-indigo-600 mt-1"
                    />

                    <div>

                        <h3 className="font-bold text-lg text-gray-800">

                            Performance Summary

                        </h3>

                        <p className="text-gray-600 mt-2 leading-relaxed">

                            Your current competency score is
                            <strong> {competency.score}%</strong>.
                            Continue completing assessments,
                            improving your technical skills,
                            and earning certifications to
                            increase your overall competency.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}