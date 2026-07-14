import React from "react";
import {
    Activity,
    CheckCircle2,
    Award,
    BookOpen,
    ClipboardCheck,
    Calendar
} from "lucide-react";

export default function RecentActivity({ activities }) {

    const getActivityIcon = (title) => {

        const text = title.toLowerCase();

        if (text.includes("assessment")) {
            return {
                icon: ClipboardCheck,
                color: "text-green-600 bg-green-100"
            };
        }

        if (text.includes("skill")) {
            return {
                icon: Award,
                color: "text-indigo-600 bg-indigo-100"
            };
        }

        if (
            text.includes("learning") ||
            text.includes("course")
        ) {
            return {
                icon: BookOpen,
                color: "text-orange-600 bg-orange-100"
            };
        }

        return {
            icon: CheckCircle2,
            color: "text-purple-600 bg-purple-100"
        };

    };

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8">

            {/* ===========================
                    Header
            =========================== */}

            <div className="flex justify-between items-center p-8 border-b">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Recent Activity

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Your latest learning and competency updates.

                    </p>

                </div>

                <Activity
                    size={36}
                    className="text-indigo-600"
                />

            </div>

            {/* ===========================
                    Timeline
            =========================== */}

            <div className="p-8">

                <div className="relative border-l-2 border-indigo-200 ml-6">

                    {

                        activities.map((activity, index) => {

                            const data =
                                getActivityIcon(activity.title);

                            const Icon = data.icon;

                            return (

                                <div
                                    key={index}
                                    className="relative mb-10 ml-8"
                                >

                                    {/* Timeline Dot */}

                                    <div

                                        className={`
                                            absolute
                                            -left-14
                                            w-10
                                            h-10
                                            rounded-full
                                            flex
                                            items-center
                                            justify-center
                                            ${data.color}
                                        `}

                                    >

                                        <Icon size={18} />

                                    </div>

                                    <div className="bg-gray-50 border rounded-2xl p-5 hover:shadow-md transition">

                                        <div className="flex justify-between flex-wrap gap-3">

                                            <h3 className="font-semibold text-lg text-gray-800">

                                                {activity.title}

                                            </h3>

                                            <div className="flex items-center gap-2 text-gray-500">

                                                <Calendar size={16} />

                                                {activity.time}

                                            </div>

                                        </div>

                                        <p className="text-gray-500 mt-3">

                                            Your activity has been successfully
                                            recorded and contributes toward your
                                            competency progress.

                                        </p>

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

            {/* ===========================
                    Footer
            =========================== */}

            <div className="bg-indigo-50 rounded-b-3xl border-t px-8 py-6">

                <p className="text-gray-700">

                    Your recent activities help track your learning
                    journey and provide insights into your competency
                    development over time.

                </p>

            </div>

        </div>

    );

}