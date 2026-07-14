import React from "react";
import {
    Bell,
    AlertTriangle,
    CheckCircle2,
    Info,
    Clock,
    ArrowRight
} from "lucide-react";

export default function Notifications({ notifications }) {

    const getNotificationStyle = (type) => {

        switch (type) {

            case "success":

                return {

                    icon: CheckCircle2,

                    border: "border-green-500",

                    bg: "bg-green-50",

                    iconColor: "text-green-600",

                    badge: "bg-green-100 text-green-700",

                    label: "Completed"

                };

            case "warning":

                return {

                    icon: AlertTriangle,

                    border: "border-orange-500",

                    bg: "bg-orange-50",

                    iconColor: "text-orange-600",

                    badge: "bg-orange-100 text-orange-700",

                    label: "Reminder"

                };

            default:

                return {

                    icon: Info,

                    border: "border-indigo-500",

                    bg: "bg-indigo-50",

                    iconColor: "text-indigo-600",

                    badge: "bg-indigo-100 text-indigo-700",

                    label: "Information"

                };

        }

    };

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8">

            {/* ==========================
                    Header
            ========================== */}

            <div className="flex justify-between items-center p-8 border-b">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Notifications

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Stay updated with important alerts,
                        reminders and competency updates.

                    </p>

                </div>

                <Bell

                    size={36}

                    className="text-indigo-600"

                />

            </div>

            {/* ==========================
                    Notification Cards
            ========================== */}

            <div className="p-8 space-y-5">

                {

                    notifications.map((item, index) => {

                        const style =
                            getNotificationStyle(item.type);

                        const Icon =
                            style.icon;

                        return (

                            <div

                                key={index}

                                className={`

                                    ${style.bg}

                                    ${style.border}

                                    border-l-4

                                    rounded-2xl

                                    p-6

                                    hover:shadow-md

                                    transition

                                `}

                            >

                                <div className="flex flex-col lg:flex-row justify-between gap-6">

                                    <div className="flex gap-4">

                                        <div

                                            className={`

                                                w-12

                                                h-12

                                                rounded-2xl

                                                bg-white

                                                flex

                                                items-center

                                                justify-center

                                            `}

                                        >

                                            <Icon

                                                size={22}

                                                className={style.iconColor}

                                            />

                                        </div>

                                        <div>

                                            <div className="flex gap-3 flex-wrap items-center">

                                                <h3 className="font-bold text-gray-800">

                                                    {item.message}

                                                </h3>

                                                <span

                                                    className={`

                                                        px-3

                                                        py-1

                                                        rounded-full

                                                        text-xs

                                                        font-semibold

                                                        ${style.badge}

                                                    `}

                                                >

                                                    {style.label}

                                                </span>

                                            </div>

                                            <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">

                                                <Clock size={15}/>

                                                Today

                                            </div>

                                        </div>

                                    </div>

                                    <button

                                        className="

                                            self-start

                                            bg-white

                                            hover:bg-gray-100

                                            border

                                            rounded-xl

                                            px-5

                                            py-3

                                            font-semibold

                                            flex

                                            items-center

                                            gap-2

                                            transition

                                        "

                                    >

                                        View

                                        <ArrowRight size={16}/>

                                    </button>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            {/* ==========================
                    Footer
            ========================== */}

            <div className="bg-gray-50 border-t rounded-b-3xl px-8 py-6">

                <div className="flex justify-between items-center flex-wrap gap-4">

                    <div>

                        <h3 className="font-semibold">

                            Notification Center

                        </h3>

                        <p className="text-gray-500 mt-1">

                            Keep track of assessments,
                            approvals, certifications and
                            competency updates.

                        </p>

                    </div>

                    <button

                        className="

                            bg-indigo-600

                            hover:bg-indigo-700

                            text-white

                            px-6

                            py-3

                            rounded-xl

                            transition

                            font-semibold

                        "

                    >

                        View All

                    </button>

                </div>

            </div>

        </div>

    );

}