import React, { useEffect, useRef, useState } from "react";
import { Bell, LogOut } from "lucide-react";

import notificationService from "../../services/notificationService";
import NotificationDropdown from "../notifications/NotificationDropdown";
import DashboardSwitcher from "./DashboardSwitcher";

const Header = () => {

    const [notificationOpen, setNotificationOpen] = useState(false);

    const [unreadCount, setUnreadCount] = useState(0);

    const dropdownRef = useRef(null);

    useEffect(() => {

        loadUnreadCount();

    }, []);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {

                setNotificationOpen(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const loadUnreadCount = async () => {

        try {

            const response =
                await notificationService.getUnreadCount();

            setUnreadCount(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("fullName");

        window.location.href = "/login";

    };

    return (

        <header
            className="
                sticky
                top-0
                z-40
                h-16
                bg-slate-950
                border-b
                border-slate-800
                px-6
                flex
                items-center
                justify-between
            "
        >

            {/* Logo */}

            <div className="flex items-center gap-6">

                {/* Logo */}

                <div className="flex items-center gap-2">

                    <h1 className="text-white font-bold">
                        KnowledgeGap
                        <span className="text-indigo-400">
                            {" "}Intelligence
                        </span>
                    </h1>

                </div>


                {/* Dashboard Switcher */}

                <DashboardSwitcher />

            </div>

            {/* Right */}

            <div className="flex items-center gap-4">

                {/* Notification */}

                <div
                    ref={dropdownRef}
                    className="relative"
                >

                    <button

                        onClick={() =>
                            setNotificationOpen(prev => !prev)
                        }

                        className="
                            relative
                            p-2
                            rounded-full
                            text-gray-300
                            hover:text-white
                            hover:bg-slate-800
                            transition
                        "

                    >

                        <Bell size={20} />

                        {

                            unreadCount > 0 && (

                                <span
                                    className="
                                        absolute
                                        -top-1
                                        -right-1
                                        min-w-[18px]
                                        h-[18px]
                                        rounded-full
                                        bg-red-500
                                        text-white
                                        text-[10px]
                                        font-bold
                                        flex
                                        items-center
                                        justify-center
                                        px-1
                                    "
                                >

                                    {

                                        unreadCount > 99

                                            ? "99+"

                                            : unreadCount

                                    }

                                </span>

                            )

                        }

                    </button>

                    <NotificationDropdown

                        open={notificationOpen}

                        onClose={() =>
                            setNotificationOpen(false)
                        }

                        onUpdated={loadUnreadCount}

                    />

                </div>

                {/* Logout */}

                <button

                    onClick={handleLogout}

                    className="
                        flex
                        items-center
                        gap-2
                        bg-slate-800
                        hover:bg-slate-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        transition
                    "

                >

                    <LogOut size={16} />

                    <span className="hidden sm:inline">

                        Logout

                    </span>

                </button>

            </div>

        </header>

    );

};

export default Header;