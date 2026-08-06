import React from "react";
import {
    Award,
    TrendingUp,
    Star,
    Medal,
    Trophy,
} from "lucide-react";

const SkillStats = ({ statistics }) => {

    const cards = [

        {
            title: "Total Skills",
            value: statistics?.totalSkills ?? 0,
            icon: Award,
            color: "bg-indigo-100 text-indigo-600",
        },

        {
            title: "Beginner",
            value: statistics?.beginner ?? 0,
            icon: TrendingUp,
            color: "bg-red-100 text-red-600",
        },

        {
            title: "Intermediate",
            value: statistics?.intermediate ?? 0,
            icon: Star,
            color: "bg-yellow-100 text-yellow-600",
        },

        {
            title: "Advanced",
            value: statistics?.advanced ?? 0,
            icon: Medal,
            color: "bg-blue-100 text-blue-600",
        },

        {
            title: "Expert",
            value: statistics?.expert ?? 0,
            icon: Trophy,
            color: "bg-green-100 text-green-600",
        },

    ];

    return (

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

            {

                cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        {card.title}

                                    </p>

                                    <h2 className="text-3xl font-bold mt-3">

                                        {card.value}

                                    </h2>

                                </div>

                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}
                                >

                                    <Icon size={28} />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

};

export default SkillStats;