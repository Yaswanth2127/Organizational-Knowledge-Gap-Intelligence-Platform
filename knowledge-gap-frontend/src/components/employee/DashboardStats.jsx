import React from "react";
import {
    Award,
    ClipboardCheck,
    GraduationCap,
    TrendingUp
} from "lucide-react";

export default function DashboardStats({ stats }) {

    const cards = [

        {
            title: "My Skills",
            value: stats.totalSkills,
            subtitle: "Technical Skills",
            icon: Award,
            bg: "bg-indigo-600",
            light: "bg-indigo-50"
        },

        {
            title: "Assessments",
            value: stats.assessments,
            subtitle: "Completed",
            icon: ClipboardCheck,
            bg: "bg-green-600",
            light: "bg-green-50"
        },

        {
            title: "Certifications",
            value: stats.certifications,
            subtitle: "Earned",
            icon: GraduationCap,
            bg: "bg-purple-600",
            light: "bg-purple-50"
        },

        {
            title: "Competency",
            value: `${stats.competencyScore}%`,
            subtitle: "Overall Score",
            icon: TrendingUp,
            bg: "bg-orange-600",
            light: "bg-orange-50"
        }

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            {

                cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <div

                            key={index}

                            className="
                                group
                                bg-white
                                rounded-3xl
                                border
                                border-gray-100
                                shadow-md
                                hover:shadow-xl
                                transition-all
                                duration-300
                                overflow-hidden
                            "

                        >

                            {/* Top Color Strip */}

                            <div className={`h-2 ${card.bg}`} />

                            <div className="p-6">

                                <div className="flex justify-between items-start">

                                    <div>

                                        <p className="text-gray-500 text-sm">

                                            {card.title}

                                        </p>

                                        <h2 className="text-4xl font-bold text-gray-800 mt-3">

                                            {card.value}

                                        </h2>

                                        <p className="text-sm text-gray-400 mt-2">

                                            {card.subtitle}

                                        </p>

                                    </div>

                                    <div

                                        className={`
                                            w-16
                                            h-16
                                            rounded-2xl
                                            flex
                                            items-center
                                            justify-center
                                            ${card.light}
                                            group-hover:scale-110
                                            transition
                                        `}

                                    >

                                        <Icon

                                            size={30}

                                            className={`
                                                ${card.bg.replace("bg", "text")}
                                            `}

                                        />

                                    </div>

                                </div>

                                {/* Bottom Progress */}

                                <div className="mt-8">

                                    <div className="flex justify-between text-xs text-gray-400">

                                        <span>

                                            Progress

                                        </span>

                                        <span>

                                            Excellent

                                        </span>

                                    </div>

                                    <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">

                                        <div

                                            className={`h-full ${card.bg} rounded-full`}

                                            style={{

                                                width:

                                                    index === 0
                                                        ? "85%"
                                                        : index === 1
                                                        ? "72%"
                                                        : index === 2
                                                        ? "60%"
                                                        : `${stats.competencyScore}%`

                                            }}

                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}