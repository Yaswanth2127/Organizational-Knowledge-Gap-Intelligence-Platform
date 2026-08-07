import React, { useState } from "react";
import { CheckCheck } from "lucide-react";

import notificationService from "../../services/notificationService";

const MarkAllButton = ({ onSuccess }) => {

    const [loading, setLoading] = useState(false);

    const handleMarkAllAsRead = async () => {

        try {

            setLoading(true);

            await notificationService.markAllAsRead();

            if (onSuccess) {

                await onSuccess();

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <button

            onClick={handleMarkAllAsRead}

            disabled={loading}

            className="
                flex
                items-center
                gap-2
                bg-indigo-600
                hover:bg-indigo-700
                disabled:bg-indigo-400
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
                transition-all
                duration-200
                shadow-sm
            "

        >

            <CheckCheck size={18} />

            {

                loading

                    ?

                    "Marking..."

                    :

                    "Mark All as Read"

            }

        </button>

    );

};

export default MarkAllButton;