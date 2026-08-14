import React from "react";
import {
    X,
    Brain,
    CalendarDays,
    Clock3,
    Handshake,
} from "lucide-react";

const MentorshipMatchDetailsModal = ({
    match,
    onClose,
}) => {

    if (!match) {
        return null;
    }


    // =========================================================
    // STATUS STYLE
    // =========================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "ACTIVE":
                return "bg-green-100 text-green-700";

            case "COMPLETED":
                return "bg-blue-100 text-blue-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            case "PENDING":
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };


    // =========================================================
    // DATE FORMAT
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleString(
            undefined,
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        );
    };


    // =========================================================
    // RENDER
    // =========================================================

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
                max-w-xl
                max-h-[90vh]
                overflow-y-auto
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-2xl
            ">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-gray-100
                    px-6
                    py-5
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
                            rounded-xl
                            bg-indigo-50
                            text-indigo-600
                        ">
                            <Handshake size={20} />
                        </div>


                        <div>

                            <p className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                                text-indigo-600
                            ">
                                Mentorship
                            </p>


                            <h2 className="
                                text-lg
                                font-bold
                                text-gray-900
                            ">
                                Match Details
                            </h2>

                        </div>

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


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="
                    space-y-5
                    px-6
                    py-6
                ">


                    {/* =================================================
                        MENTOR / MENTEE
                    ================================================= */}

                    <div className="
                        grid
                        grid-cols-1
                        gap-4
                        md:grid-cols-2
                    ">

                        <PersonCard
                            label="Mentor"
                            name={
                                match.mentorName ||
                                "Unknown"
                            }
                            id={match.mentorId}
                            type="mentor"
                        />


                        <PersonCard
                            label="Mentee"
                            name={
                                match.menteeName ||
                                "Unknown"
                            }
                            id={match.menteeId}
                            type="mentee"
                        />

                    </div>


                    {/* =================================================
                        SKILL
                    ================================================= */}

                    <DetailRow
                        icon={Brain}
                        label="Skill"
                        value={
                            match.skillName ||
                            "Unknown"
                        }
                    />


                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <div className="
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-gray-200
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
                                bg-indigo-50
                                text-indigo-600
                            ">
                                <Handshake size={17} />
                            </div>


                            <div>

                                <p className="
                                    text-xs
                                    font-medium
                                    text-gray-500
                                ">
                                    Match Status
                                </p>


                                <p className="
                                    mt-0.5
                                    text-sm
                                    font-semibold
                                    text-gray-800
                                ">
                                    Current Status
                                </p>

                            </div>

                        </div>


                        <span className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${getStatusStyle(match.status)}
                        `}>
                            {match.status || "PENDING"}
                        </span>

                    </div>


                    {/* =================================================
                        MATCHED AT
                    ================================================= */}

                    <DetailRow
                        icon={CalendarDays}
                        label="Matched At"
                        value={formatDate(match.matchedAt)}
                    />


                    {/* =================================================
                        ENDED AT
                    ================================================= */}

                    {(match.status === "COMPLETED" ||
                        match.status === "CANCELLED") && (

                        <DetailRow
                            icon={Clock3}
                            label="Ended At"
                            value={formatDate(match.endedAt)}
                        />

                    )}


                    {/* =================================================
                        CREATED AT
                    ================================================= */}

                    <DetailRow
                        icon={CalendarDays}
                        label="Created At"
                        value={formatDate(match.createdAt)}
                    />


                    {/* =================================================
                        UPDATED AT
                    ================================================= */}

                    <DetailRow
                        icon={Clock3}
                        label="Last Updated"
                        value={formatDate(match.updatedAt)}
                    />


                    {/* =================================================
                        MATCH ID
                    ================================================= */}

                    <DetailRow
                        icon={Handshake}
                        label="Match ID"
                        value={
                            match.id
                                ? `#${match.id}`
                                : "-"
                        }
                    />

                </div>


                {/* =================================================
                    FOOTER
                ================================================= */}

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


// =============================================================
// PERSON CARD
// =============================================================

const PersonCard = ({
    label,
    name,
    id,
    type,
}) => {

    const isMentor =
        type === "mentor";


    return (
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

                <div className={`
                    flex
                    h-10
                    w-10
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    font-semibold
                    ${
                        isMentor
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                    }
                `}>
                    {name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
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
                        {name}
                    </p>


                    <p className="
                        mt-0.5
                        text-xs
                        text-gray-400
                    ">
                        ID: {id ?? "-"}
                    </p>

                </div>

            </div>

        </div>
    );
};


// =============================================================
// DETAIL ROW
// =============================================================

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


export default MentorshipMatchDetailsModal;