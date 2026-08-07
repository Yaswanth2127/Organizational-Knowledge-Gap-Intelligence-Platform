import React from "react";
import {
    Bell,
    MailOpen,
    Mail,
} from "lucide-react";

const NotificationStats = ({ notifications }) => {

    const totalNotifications = notifications.length;

    const unreadNotifications = notifications.filter(
        notification => notification.status === "PENDING"
    ).length;

    const readNotifications = notifications.filter(
        notification => notification.status === "READ"
    ).length;

    const stats = [

        {
            title: "Total Notifications",
            value: totalNotifications,
            subtitle: "All Notifications",
            icon: Bell,
            bg: "bg-indigo-600",
            light: "bg-indigo-50"
        },

        {
            title: "Unread",
            value: unreadNotifications,
            subtitle: "Pending to Read",
            icon: Mail,
            bg: "bg-orange-600",
            light: "bg-orange-50"
        },

        {
            title: "Read",
            value: readNotifications,
            subtitle: "Already Viewed",
            icon: MailOpen,
            bg: "bg-green-600",
            light: "bg-green-50"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {

                stats.map((stat, index) => {

                    const Icon = stat.icon;

                    return (

                        <div
                            key={index}
                            className="
                                bg-white
                                rounded-2xl
                                shadow-sm
                                border
                                border-gray-100
                                p-6
                                hover:shadow-lg
                                transition-all
                            "
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <p className="text-sm text-gray-500">

                                        {stat.title}

                                    </p>

                                    <h2 className="text-4xl font-bold text-gray-800 mt-3">

                                        {stat.value}

                                    </h2>

                                    <p className="text-sm text-gray-400 mt-2">

                                        {stat.subtitle}

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
                                        ${stat.light}
                                    `}
                                >

                                    <Icon
                                        size={30}
                                        className={stat.bg.replace("bg", "text")}
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

};

export default NotificationStats;