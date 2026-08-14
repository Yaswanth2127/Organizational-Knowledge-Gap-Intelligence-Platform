import React from "react";

const MentorshipMatchTable = ({
    matches = [],
    currentUserId,
    onView,
    onAccept,
    onComplete,
    onCancel,
    actionLoading = false,
}) => {

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


    if (matches.length === 0) {

        return (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">

                <div className="mb-3 text-4xl">
                    🤝
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                    No mentorship matches found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    You currently don't have any mentorship matches.
                </p>

            </div>
        );
    }


    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                #
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Mentor
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Mentee
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Skill
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Status
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Matched At
                            </th>

                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody className="divide-y divide-gray-100">

                        {matches.map((match, index) => {

                            /*
                             * Determine whether the logged-in user
                             * is the mentor or mentee.
                             */

                            const isMentor =
                                Number(match.mentorId) ===
                                Number(currentUserId);

                            const isMentee =
                                Number(match.menteeId) ===
                                Number(currentUserId);


                            return (

                                <tr
                                    key={match.id}
                                    className="hover:bg-gray-50"
                                >

                                    {/* Number */}
                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {index + 1}
                                    </td>


                                    {/* Mentor */}
                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-blue-100
                                                font-semibold
                                                text-blue-700
                                            ">
                                                {match.mentorName
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "M"}
                                            </div>


                                            <div>

                                                <p className="text-sm font-medium text-gray-800">
                                                    {match.mentorName || "Unknown"}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    ID: {match.mentorId}
                                                </p>

                                                {isMentor && (
                                                    <span className="text-xs font-medium text-blue-600">
                                                        You
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                    </td>


                                    {/* Mentee */}
                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-purple-100
                                                font-semibold
                                                text-purple-700
                                            ">
                                                {match.menteeName
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "M"}
                                            </div>


                                            <div>

                                                <p className="text-sm font-medium text-gray-800">
                                                    {match.menteeName || "Unknown"}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    ID: {match.menteeId}
                                                </p>

                                                {isMentee && (
                                                    <span className="text-xs font-medium text-purple-600">
                                                        You
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                    </td>


                                    {/* Skill */}
                                    <td className="px-5 py-4">

                                        <span className="
                                            rounded-md
                                            bg-gray-100
                                            px-3
                                            py-1.5
                                            text-sm
                                            text-gray-700
                                        ">
                                            {match.skillName || "Unknown"}
                                        </span>

                                    </td>


                                    {/* Status */}
                                    <td className="px-5 py-4">

                                        <span
                                            className={`
                                                rounded-full
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold
                                                ${getStatusStyle(match.status)}
                                            `}
                                        >
                                            {match.status || "PENDING"}
                                        </span>

                                    </td>


                                    {/* Matched At */}
                                    <td className="px-5 py-4 text-sm text-gray-600">

                                        {match.matchedAt
                                            ? new Date(
                                                match.matchedAt
                                            ).toLocaleDateString()
                                            : "-"}

                                    </td>


                                    {/* Actions */}
                                    <td className="px-5 py-4">

                                        <div className="
                                            flex
                                            flex-wrap
                                            justify-end
                                            gap-2
                                        ">

                                            {/* VIEW */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onView?.(match)
                                                }
                                                className="
                                                    rounded-lg
                                                    border
                                                    border-gray-200
                                                    px-3
                                                    py-1.5
                                                    text-sm
                                                    text-gray-600
                                                    hover:bg-gray-100
                                                "
                                            >
                                                View
                                            </button>


                                            {/* =================================
                                                PENDING
                                            ================================= */}

                                            {match.status === "PENDING" && (

                                                <>

                                                    {isMentor && (
                                                        <button
                                                            type="button"
                                                            disabled={actionLoading}
                                                            onClick={() =>
                                                                onAccept?.(match)
                                                            }
                                                            className="
                                                                rounded-lg
                                                                border
                                                                border-green-200
                                                                px-3
                                                                py-1.5
                                                                text-sm
                                                                text-green-600
                                                                hover:bg-green-50
                                                                disabled:cursor-not-allowed
                                                                disabled:opacity-50
                                                            "
                                                        >
                                                            Accept
                                                        </button>
                                                    )}


                                                    {(isMentor || isMentee) && (
                                                        <button
                                                            type="button"
                                                            disabled={actionLoading}
                                                            onClick={() =>
                                                                onCancel?.(match)
                                                            }
                                                            className="
                                                                rounded-lg
                                                                border
                                                                border-red-200
                                                                px-3
                                                                py-1.5
                                                                text-sm
                                                                text-red-600
                                                                hover:bg-red-50
                                                                disabled:cursor-not-allowed
                                                                disabled:opacity-50
                                                            "
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}

                                                </>

                                            )}


                                            {/* =================================
                                                ACTIVE
                                            ================================= */}

                                            {match.status === "ACTIVE" &&
                                                (isMentor || isMentee) && (

                                                    <>

                                                        <button
                                                            type="button"
                                                            disabled={actionLoading}
                                                            onClick={() =>
                                                                onComplete?.(match)
                                                            }
                                                            className="
                                                                rounded-lg
                                                                border
                                                                border-blue-200
                                                                px-3
                                                                py-1.5
                                                                text-sm
                                                                text-blue-600
                                                                hover:bg-blue-50
                                                                disabled:cursor-not-allowed
                                                                disabled:opacity-50
                                                            "
                                                        >
                                                            Complete
                                                        </button>


                                                        <button
                                                            type="button"
                                                            disabled={actionLoading}
                                                            onClick={() =>
                                                                onCancel?.(match)
                                                            }
                                                            className="
                                                                rounded-lg
                                                                border
                                                                border-red-200
                                                                px-3
                                                                py-1.5
                                                                text-sm
                                                                text-red-600
                                                                hover:bg-red-50
                                                                disabled:cursor-not-allowed
                                                                disabled:opacity-50
                                                            "
                                                        >
                                                            Cancel
                                                        </button>

                                                    </>

                                                )}


                                            {/* =================================
                                                COMPLETED
                                            ================================= */}

                                            {match.status === "COMPLETED" && (

                                                <span className="
                                                    px-2
                                                    py-1.5
                                                    text-xs
                                                    text-gray-400
                                                ">
                                                    View only
                                                </span>

                                            )}


                                            {/* =================================
                                                CANCELLED
                                            ================================= */}

                                            {match.status === "CANCELLED" && (

                                                <span className="
                                                    px-2
                                                    py-1.5
                                                    text-xs
                                                    text-gray-400
                                                ">
                                                    View only
                                                </span>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            );
                        })}

                    </tbody>

                </table>

            </div>

        </div>
    );
};


export default MentorshipMatchTable;