import React from "react";
import {
    Users,
    CheckCircle2,
    Clock3,
} from "lucide-react";

const RatingStats = ({ statistics }) => {

    const cards = [

        {
            title: "Total Reviews",
            value: statistics?.total ?? 0,
            icon: Users,
            color: "bg-indigo-100 text-indigo-600",
        },

        {
            title: "Completed",
            value: statistics?.completed ?? 0,
            icon: CheckCircle2,
            color: "bg-green-100 text-green-600",
        },

        {
            title: "Pending",
            value: statistics?.pending ?? 0,
            icon: Clock3,
            color: "bg-yellow-100 text-yellow-600",
        },

    ];

    return (

        <div className="grid gap-5 md:grid-cols-3">

            {

                cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
                            className="
                                bg-white
                                rounded-2xl
                                border
                                border-gray-200
                                shadow-sm
                                hover:shadow-md
                                transition
                                p-6
                            "
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">

                                        {card.title}

                                    </p>

                                    <h2 className="mt-3 text-3xl font-bold text-gray-900">

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

export default RatingStats;