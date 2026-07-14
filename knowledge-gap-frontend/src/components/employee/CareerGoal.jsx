import React from "react";
import {
    Briefcase,
    TrendingUp,
    ArrowRight,
    Trophy,
    Target,
    CheckCircle2
} from "lucide-react";

export default function CareerGoal() {

    const milestones = [

        {
            title: "Complete Docker Fundamentals",
            completed: true
        },

        {
            title: "Earn AWS Cloud Certification",
            completed: false
        },

        {
            title: "Complete Spring Boot Assessment",
            completed: true
        },

        {
            title: "Reach 85% Competency Score",
            completed: false
        }

    ];

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8 overflow-hidden">

            {/* ============================
                    Header
            ============================ */}

            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 p-8 text-white">

                <div className="flex justify-between items-center">

                    <div>

                        <h2 className="text-3xl font-bold">

                            Career Goal

                        </h2>

                        <p className="text-indigo-100 mt-3">

                            Track your progress towards your next career milestone.

                        </p>

                    </div>

                    <Briefcase
                        size={40}
                    />

                </div>

            </div>

            {/* ============================
                    Career Path
            ============================ */}

            <div className="grid lg:grid-cols-3 gap-8 p-8">

                {/* Current Role */}

                <div className="bg-gray-50 rounded-2xl p-6 text-center">

                    <Briefcase
                        className="mx-auto text-indigo-600"
                        size={36}
                    />

                    <p className="text-gray-500 mt-4">

                        Current Role

                    </p>

                    <h3 className="text-2xl font-bold mt-2">

                        Backend Developer

                    </h3>

                </div>

                {/* Arrow */}

                <div className="flex items-center justify-center">

                    <ArrowRight
                        size={48}
                        className="text-indigo-600"
                    />

                </div>

                {/* Target */}

                <div className="bg-indigo-50 rounded-2xl p-6 text-center">

                    <Target
                        className="mx-auto text-indigo-600"
                        size={36}
                    />

                    <p className="text-gray-500 mt-4">

                        Target Role

                    </p>

                    <h3 className="text-2xl font-bold mt-2">

                        Senior Backend Developer

                    </h3>

                </div>

            </div>

            {/* ============================
                    Progress
            ============================ */}

            <div className="px-8">

                <div className="flex justify-between">

                    <span className="font-semibold">

                        Career Progress

                    </span>

                    <span className="font-bold text-indigo-600">

                        72%

                    </span>

                </div>

                <div className="mt-3 h-4 bg-gray-200 rounded-full overflow-hidden">

                    <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{
                            width: "72%"
                        }}
                    />

                </div>

            </div>

            {/* ============================
                    Milestones
            ============================ */}

            <div className="p-8">

                <div className="flex items-center gap-3 mb-6">

                    <Trophy
                        size={28}
                        className="text-yellow-500"
                    />

                    <h2 className="text-2xl font-bold">

                        Next Milestones

                    </h2>

                </div>

                <div className="space-y-5">

                    {

                        milestones.map((item,index)=>(

                            <div

                                key={index}

                                className="flex justify-between items-center border rounded-xl p-5"

                            >

                                <div className="flex items-center gap-4">

                                    {

                                        item.completed

                                        ?

                                        <CheckCircle2
                                            className="text-green-600"
                                        />

                                        :

                                        <Target
                                            className="text-orange-500"
                                        />

                                    }

                                    <span className="font-medium">

                                        {item.title}

                                    </span>

                                </div>

                                {

                                    item.completed

                                    ?

                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                        Completed

                                    </span>

                                    :

                                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">

                                        Pending

                                    </span>

                                }

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* ============================
                    Footer
            ============================ */}

            <div className="bg-green-50 border-t px-8 py-6">

                <div className="flex items-start gap-4">

                    <TrendingUp
                        className="text-green-600 mt-1"
                        size={26}
                    />

                    <div>

                        <h3 className="font-bold">

                            Career Recommendation

                        </h3>

                        <p className="text-gray-600 mt-2">

                            Complete your pending milestones to improve your competency score,
                            qualify for advanced roles, and become eligible for future
                            promotions within the organization.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}