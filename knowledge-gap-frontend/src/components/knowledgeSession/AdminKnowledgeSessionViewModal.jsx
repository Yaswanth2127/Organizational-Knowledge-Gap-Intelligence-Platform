import React from "react";
import {
    CalendarDays,
    Clock,
    ExternalLink,
    User,
    BookOpen,
    X,
} from "lucide-react";

const AdminKnowledgeSessionViewModal = ({
    isOpen,
    onClose,
    session,
}) => {

    if (!isOpen || !session) {
        return null;
    }

    const formatDateTime = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString(
            undefined,
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        );
    };


    const getStatusStyle = (status) => {

        switch (status) {

            case "SCHEDULED":
                return "bg-yellow-100 text-yellow-700";

            case "ONGOING":
                return "bg-green-100 text-green-700";

            case "COMPLETED":
                return "bg-blue-100 text-blue-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    return (

        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-4
        ">

            <div className="
                max-h-[90vh]
                w-full
                max-w-2xl
                overflow-y-auto
                rounded-2xl
                bg-white
                shadow-2xl
            ">

                {/* Header */}

                <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    px-6
                    py-5
                ">

                    <div>

                        <h2 className="
                            text-xl
                            font-semibold
                            text-gray-800
                        ">
                            Knowledge Session Details
                        </h2>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            View session information
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                        "
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* Content */}

                <div className="space-y-6 px-6 py-6">

                    {/* Title + Status */}

                    <div className="
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                    ">

                        <div>

                            <p className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-wide
                                text-gray-400
                            ">
                                Session
                            </p>

                            <h3 className="
                                mt-1
                                text-2xl
                                font-bold
                                text-gray-800
                            ">
                                {session.title ||
                                    "Untitled Session"}
                            </h3>

                            <p className="
                                mt-1
                                text-xs
                                text-gray-400
                            ">
                                Session ID: {session.id}
                            </p>

                        </div>


                        <span
                            className={`
                                inline-flex
                                w-fit
                                rounded-full
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                ${getStatusStyle(
                                    session.status
                                )}
                            `}
                        >
                            {session.status ||
                                "SCHEDULED"}
                        </span>

                    </div>


                    {/* Details */}

                    <div className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                    ">

                        {/* Host */}

                        <div className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            p-4
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-blue-100
                                    text-blue-600
                                ">
                                    <User size={19} />
                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        text-gray-500
                                    ">
                                        Host
                                    </p>

                                    <p className="
                                        font-semibold
                                        text-gray-800
                                    ">
                                        {session.hostName ||
                                            "Unknown"}
                                    </p>

                                </div>

                            </div>

                            <p className="
                                mt-2
                                text-xs
                                text-gray-400
                            ">
                                User ID: {session.hostId}
                            </p>

                        </div>


                        {/* Skill */}

                        <div className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            p-4
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-indigo-100
                                    text-indigo-600
                                ">
                                    <BookOpen size={19} />
                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        text-gray-500
                                    ">
                                        Topic Skill
                                    </p>

                                    <p className="
                                        font-semibold
                                        text-gray-800
                                    ">
                                        {session.skillName ||
                                            "Unknown"}
                                    </p>

                                </div>

                            </div>

                            <p className="
                                mt-2
                                text-xs
                                text-gray-400
                            ">
                                Skill ID: {session.topicSkillId}
                            </p>

                        </div>


                        {/* Start */}

                        <div className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            p-4
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-yellow-100
                                    text-yellow-600
                                ">
                                    <CalendarDays size={19} />
                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        text-gray-500
                                    ">
                                        Start Time
                                    </p>

                                    <p className="
                                        font-semibold
                                        text-gray-800
                                    ">
                                        {formatDateTime(
                                            session.scheduledAt
                                        )}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* End */}

                        <div className="
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            p-4
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-green-100
                                    text-green-600
                                ">
                                    <Clock size={19} />
                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        text-gray-500
                                    ">
                                        End Time
                                    </p>

                                    <p className="
                                        font-semibold
                                        text-gray-800
                                    ">
                                        {formatDateTime(
                                            session.endedAt
                                        )}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Meeting Link */}

                    {session.locationLink && (

                        <div className="
                            rounded-xl
                            border
                            border-green-200
                            bg-green-50
                            p-4
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            ">

                                <div>

                                    <p className="
                                        text-sm
                                        font-semibold
                                        text-gray-800
                                    ">
                                        Meeting / Location
                                    </p>

                                    <p className="
                                        mt-1
                                        break-all
                                        text-sm
                                        text-gray-500
                                    ">
                                        {session.locationLink}
                                    </p>

                                </div>


                                <a
                                    href={
                                        session.locationLink
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        inline-flex
                                        flex-shrink-0
                                        items-center
                                        gap-2
                                        rounded-lg
                                        bg-green-600
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-green-700
                                    "
                                >
                                    Open
                                    <ExternalLink
                                        size={15}
                                    />
                                </a>

                            </div>

                        </div>

                    )}


                    {/* Created / Updated */}

                    <div className="
                        grid
                        grid-cols-1
                        gap-3
                        border-t
                        pt-5
                        sm:grid-cols-2
                    ">

                        <div>

                            <p className="
                                text-xs
                                text-gray-400
                            ">
                                Created At
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-600
                            ">
                                {formatDateTime(
                                    session.createdAt
                                )}
                            </p>

                        </div>


                        <div>

                            <p className="
                                text-xs
                                text-gray-400
                            ">
                                Last Updated
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-600
                            ">
                                {formatDateTime(
                                    session.updatedAt
                                )}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Footer */}

                <div className="
                    flex
                    justify-end
                    border-t
                    px-6
                    py-4
                ">

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg
                            border
                            border-gray-300
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-100
                        "
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AdminKnowledgeSessionViewModal;