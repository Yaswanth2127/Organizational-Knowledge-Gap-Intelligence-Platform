import React, { useEffect, useState } from "react";
import {
    Bell,
    BookOpen,
    ClipboardCheck,
    Award,
    AlertTriangle,
    GraduationCap,
    CheckCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import notificationService from "../../services/notificationService";

const NotificationDropdown = ({ open,
    onClose,
    onUpdated,
}) => {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open) {

            loadNotifications();

        }

    }, [open]);

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const response =
                await notificationService.getMyNotifications();

            setNotifications(
                response.data.slice(0, 5)
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const getIcon = (type) => {

        switch (type) {

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

    const markAsRead = async (id) => {

        try {

            await notificationService.markAsRead(id);

            await loadNotifications();

            if (onUpdated) {

                onUpdated();

            }

        } catch (error) {

            console.error(error);

        }

    };
    const markAllAsRead = async () => {

        try {

            await notificationService.markAllAsRead();

            await loadNotifications();

            if (onUpdated) {

                onUpdated();

            }

        } catch (error) {

            console.error(error);

        }

    };

    if (!open) return null;

    return (

        <div
            className="
                absolute
                right-0
                mt-3
                w-[430px]
                bg-white
                rounded-2xl
                shadow-2xl
                border
                border-gray-200
                overflow-hidden
                z-50
            "
        >

            {/* Header */}

            <div className="flex items-center justify-between p-5 border-b">

                <div>

                    <h2 className="font-bold text-lg">

                        Notifications

                    </h2>

                    <p className="text-sm text-gray-500">

                        Recent Updates

                    </p>

                </div>

                <button
                    onClick={markAllAsRead}
                    className="
                        text-indigo-600
                        hover:text-indigo-700
                        text-sm
                        font-medium
                        flex
                        items-center
                        gap-1
                    "
                >

                    <CheckCheck size={16} />

                    Mark All

                </button>

            </div>

            {/* Notifications */}

            <div className="max-h-96 overflow-y-auto">

                {

                    loading

                        ?

                        <div className="p-6 text-center text-gray-500">

                            Loading...

                        </div>

                        :

                        notifications.length === 0

                            ?

                            <div className="p-8 text-center text-gray-500">

                                No Notifications

                            </div>

                            :

                            notifications.map(notification => {

                                const Icon = getIcon(notification.type);

                                return (

                                    <div

                                        key={notification.id}

                                        className={`
                                            p-4
                                            border-b
                                            cursor-pointer
                                            hover:bg-gray-50
                                            transition

                                            ${notification.status === "PENDING"

                                                ?

                                                "bg-indigo-50"

                                                :

                                                ""
                                            }
                                        `}

                                        onClick={async () => {

                                            if (notification.status === "PENDING") {

                                                await markAsRead(notification.id);

                                            }

                                            onClose();

                                        }}

                                    >

                                        <div className="flex gap-3">

                                            <div
                                                className="
                                                    w-11
                                                    h-11
                                                    rounded-xl
                                                    bg-indigo-100
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                <Icon
                                                    size={20}
                                                    className="text-indigo-600"
                                                />

                                            </div>

                                            <div className="flex-1">

                                                <div className="flex justify-between">

                                                    <h3 className="font-semibold text-gray-800">

                                                        {notification.title}

                                                    </h3>

                                                    {

                                                        notification.status ===
                                                        "PENDING"

                                                        &&

                                                        <span
                                                            className="
                                                                w-2.5
                                                                h-2.5
                                                                rounded-full
                                                                bg-indigo-600
                                                                mt-2
                                                            "
                                                        />

                                                    }

                                                </div>

                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">

                                                    {notification.message}

                                                </p>

                                                <p className="text-xs text-gray-400 mt-2">

                                                    {

                                                        new Date(
                                                            notification.createdAt
                                                        ).toLocaleString()

                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })

                }

            </div>

            {/* Footer */}

            <div className="p-4 border-t bg-gray-50">

                <button

                    onClick={() => {

                        navigate("/notifications");

                        onClose();

                    }}

                    className="
                        w-full
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        py-2.5
                        rounded-xl
                        transition
                        font-medium
                    "

                >

                    View All Notifications

                </button>

            </div>

        </div>

    );

};

export default NotificationDropdown;