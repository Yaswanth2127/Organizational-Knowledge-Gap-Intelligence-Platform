import React from "react";
import { BellOff } from "lucide-react";

const NotificationEmpty = () => {

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-dashed
                border-gray-300
                shadow-sm
                py-16
                px-8
                flex
                flex-col
                items-center
                justify-center
                text-center
            "
        >

            <div
                className="
                    w-24
                    h-24
                    rounded-full
                    bg-indigo-50
                    flex
                    items-center
                    justify-center
                    mb-6
                "
            >

                <BellOff
                    size={42}
                    className="text-indigo-600"
                />

            </div>

            <h2 className="text-2xl font-bold text-gray-800">

                No Notifications

            </h2>

            <p className="text-gray-500 mt-3 max-w-md">

                You're all caught up! New notifications about
                assessments, learning paths, peer reviews,
                certifications, and other activities will
                appear here.

            </p>

        </div>

    );

};

export default NotificationEmpty;