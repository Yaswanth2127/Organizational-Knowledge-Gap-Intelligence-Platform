import React, { useState } from "react";
import {
    Bell,
    BookOpen,
    ClipboardCheck,
    Award,
    AlertTriangle,
    GraduationCap,
    CheckCircle2,
    Clock,
} from "lucide-react";

import notificationService from "../../services/notificationService";

const NotificationCard = ({
    notification,
    onUpdated,
}) => {

    const [loading, setLoading] = useState(false);

    const getIcon = () => {

        switch (notification.type) {

            case "ASSESSMENT_ASSIGNED":
            case "ASSESSMENT_COMPLETED":
                return ClipboardCheck;

            case "LEARNING_PATH_GENERATED":
                return BookOpen;

            case "PEER_REVIEW_REQUEST":
                return Award;

            case "SKILL_GAP_DETECTED":
                return AlertTriangle;

            case "CERTIFICATION_EXPIRING":
                return GraduationCap;

            default:
                return Bell;
        }

    };

    const Icon = getIcon();

    const handleMarkAsRead = async () => {

        try {

            setLoading(true);

            await notificationService.markAsRead(
                notification.id
            );

            onUpdated();

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className={`
                bg-white
                rounded-2xl
                border
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
                p-6

                ${
                    notification.status === "PENDING"
                        ? "border-indigo-300 bg-indigo-50/30"
                        : "border-gray-100"
                }
            `}
        >

            <div className="flex justify-between gap-6">

                {/* Left */}

                <div className="flex gap-4 flex-1">

                    <div
                        className={`
                            w-14
                            h-14
                            rounded-2xl
                            flex
                            items-center
                            justify-center

                            ${
                                notification.status === "PENDING"
                                    ? "bg-indigo-100"
                                    : "bg-gray-100"
                            }
                        `}
                    >

                        <Icon
                            size={26}
                            className={
                                notification.status === "PENDING"
                                    ? "text-indigo-600"
                                    : "text-gray-500"
                            }
                        />

                    </div>

                    <div className="flex-1">

                        <div className="flex items-center gap-3 flex-wrap">

                            <h3 className="text-lg font-semibold text-gray-800">

                                {notification.title}

                            </h3>

                            {

                                notification.status === "PENDING"

                                    ?

                                    <span
                                        className="
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-orange-100
                                            text-orange-700
                                            text-xs
                                            font-semibold
                                        "
                                    >

                                        Unread

                                    </span>

                                    :

                                    <span
                                        className="
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-green-100
                                            text-green-700
                                            text-xs
                                            font-semibold
                                        "
                                    >

                                        Read

                                    </span>

                            }

                        </div>

                        <p className="text-gray-600 mt-3 leading-relaxed">

                            {notification.message}

                        </p>

                        <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">

                            <Clock size={15} />

                            {

                                new Date(
                                    notification.createdAt
                                ).toLocaleString()

                            }

                        </div>

                    </div>

                </div>

                {/* Right */}

                {

                    notification.status === "PENDING"

                    &&

                    <button

                        onClick={handleMarkAsRead}

                        disabled={loading}

                        className="
                            h-fit
                            flex
                            items-center
                            gap-2
                            bg-indigo-600
                            hover:bg-indigo-700
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            transition
                            disabled:opacity-60
                        "

                    >

                        <CheckCircle2 size={18} />

                        {

                            loading

                                ?

                                "Updating..."

                                :

                                "Mark as Read"

                        }

                    </button>

                }

            </div>

        </div>

    );

};

export default NotificationCard;