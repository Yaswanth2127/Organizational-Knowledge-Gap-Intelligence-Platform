import React from "react";
import {
    X,
    CalendarDays,
    UserRound,
    Brain,
    Video,
    Clock,
    ExternalLink,
} from "lucide-react";

const KnowledgeSessionDetailsModal = ({
    session,
    onClose,
}) => {

    if (!session) {
        return null;
    }

    const formatDateTime = (date) => {

        if (!date) {
            return "Not scheduled";
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
                w-full
                max-w-lg
                overflow-hidden
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
                    border-gray-100
                    px-6
                    py-5
                ">

                    <div>

                        <p className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-indigo-600
                        ">
                            Knowledge Session
                        </p>

                        <h2 className="
                            mt-1
                            text-xl
                            font-bold
                            text-gray-900
                        ">
                            {session.title ||
                                "Untitled Session"}
                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
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

                <div className="space-y-4 px-6 py-6">

                    {/* Status */}

                    <div className="
                        flex
                        items-center
                        justify-between
                    ">

                        <span className="
                            text-sm
                            font-medium
                            text-gray-500
                        ">
                            Status
                        </span>

                        <span className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${getStatusStyle(
                                session.status
                            )}
                        `}>
                            {session.status ||
                                "SCHEDULED"}
                        </span>

                    </div>


                    {/* Host */}

                    <DetailRow
                        icon={UserRound}
                        label="Host"
                        value={
                            session.hostName ||
                            "Unknown"
                        }
                    />


                    {/* Skill */}

                    <DetailRow
                        icon={Brain}
                        label="Skill"
                        value={
                            session.skillName ||
                            "Unknown"
                        }
                    />


                    {/* Date */}

                    <DetailRow
                        icon={CalendarDays}
                        label="Scheduled At"
                        value={
                            formatDateTime(
                                session.scheduledAt
                            )
                        }
                    />


                    {/* Session ID */}

                    <DetailRow
                        icon={Clock}
                        label="Session ID"
                        value={
                            session.id
                                ? `#${session.id}`
                                : "-"
                        }
                    />


                    {/* Meeting link */}

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
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                bg-green-50
                                text-green-600
                            ">
                                <Video size={18} />
                            </div>

                            <div className="min-w-0">

                                <p className="
                                    text-xs
                                    font-semibold
                                    text-gray-500
                                ">
                                    Meeting / Location
                                </p>

                                {session.locationLink ? (

                                    <a
                                        href={
                                            session.locationLink
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            mt-1
                                            flex
                                            items-center
                                            gap-1
                                            text-sm
                                            font-medium
                                            text-indigo-600
                                            hover:underline
                                        "
                                    >
                                        Open Meeting
                                        <ExternalLink
                                            size={14}
                                        />
                                    </a>

                                ) : (

                                    <p className="
                                        mt-1
                                        text-sm
                                        text-gray-500
                                    ">
                                        No meeting link provided
                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                </div>


                {/* Footer */}

                <div className="
                    flex
                    justify-end
                    border-t
                    border-gray-100
                    px-6
                    py-4
                ">

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            rounded-lg
                            border
                            border-gray-200
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-50
                        "
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
};


const DetailRow = ({
    icon: Icon,
    label,
    value,
}) => {

    return (

        <div className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-gray-200
            p-4
        ">

            <div className="
                flex
                h-9
                w-9
                flex-shrink-0
                items-center
                justify-center
                rounded-lg
                bg-indigo-50
                text-indigo-600
            ">
                <Icon size={17} />
            </div>

            <div className="min-w-0">

                <p className="
                    text-xs
                    font-medium
                    text-gray-500
                ">
                    {label}
                </p>

                <p className="
                    mt-0.5
                    truncate
                    text-sm
                    font-semibold
                    text-gray-800
                ">
                    {value}
                </p>

            </div>

        </div>
    );
};


export default KnowledgeSessionDetailsModal;