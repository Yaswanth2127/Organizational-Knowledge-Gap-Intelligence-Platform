import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import notificationService from "../../services/notificationService";

import NotificationStats from "../../components/notifications/NotificationStats";
import NotificationFilters from "../../components/notifications/NotificationFilters";
import NotificationCard from "../../components/notifications/NotificationCard";
import NotificationEmpty from "../../components/notifications/NotificationEmpty";
import MarkAllButton from "../../components/notifications/MarkAllButton";
import NotificationSkeleton from "../../components/notifications/NotificationSkeleton";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const response =
                await notificationService.getMyNotifications();

            setNotifications(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const filteredNotifications = useMemo(() => {

        return notifications.filter(notification => {

            const matchesSearch =

                notification.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                notification.message
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =

                statusFilter === "ALL"

                ||

                notification.status === statusFilter;
            
            const matchesType =
    typeFilter === "ALL" ||
    notification.type === typeFilter;

return matchesSearch && matchesStatus && matchesType;

            return matchesSearch && matchesStatus&& matchesType;

        });

    }, [notifications, search, statusFilter, typeFilter]);

    if (loading) {

        return <NotificationSkeleton />;

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                    <h1 className="text-3xl font-bold">

                        Notifications

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Stay updated with the latest activities,
                        assessments, learning paths, peer reviews,
                        and system announcements.

                    </p>

                </div>

                <MarkAllButton
                    onSuccess={loadNotifications}
                />

            </div>

            <NotificationStats
                notifications={notifications}
            />

           <NotificationFilters
    search={search}
    setSearch={setSearch}
    statusFilter={statusFilter}
    setStatusFilter={setStatusFilter}
    typeFilter={typeFilter}
    setTypeFilter={setTypeFilter}
/>

            {

                filteredNotifications.length === 0

                    ?

                    <NotificationEmpty />

                    :

                    <div className="space-y-5">

                        {

                            filteredNotifications.map(notification => (

                                <NotificationCard

                                    key={notification.id}

                                    notification={notification}

                                    onUpdated={loadNotifications}

                                />

                            ))

                        }

                    </div>

            }

        </div>

    );

};

export default Notifications;