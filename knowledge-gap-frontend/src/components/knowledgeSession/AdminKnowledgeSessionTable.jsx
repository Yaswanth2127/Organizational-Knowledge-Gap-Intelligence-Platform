import React from "react";
import {
    Eye,
    Pencil,
    Trash2,
    CalendarDays,
} from "lucide-react";

const AdminKnowledgeSessionTable = ({
    sessions = [],
    onEdit,
    onDelete,
    onView,
}) => {

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


    if (sessions.length === 0) {

        return (
            <div className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-10
                text-center
                shadow-sm
            ">

                <div className="
                    mx-auto
                    mb-3
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                ">
                    <CalendarDays size={24} />
                </div>

                <h3 className="
                    text-lg
                    font-semibold
                    text-gray-800
                ">
                    No knowledge sessions found
                </h3>

                <p className="
                    mt-1
                    text-sm
                    text-gray-500
                ">
                    No sessions match the selected filters.
                </p>

            </div>
        );
    }


    return (
        <div className="
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-sm
        ">

            <div className="overflow-x-auto">

                <table className="
                    min-w-full
                    divide-y
                    divide-gray-200
                ">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="
                                px-5
                                py-4
                                text-left
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">
                                #
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-left
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">
                                Session
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-left
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">
                                Host
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-left
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">
                                Skill
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-left
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">
                                Start
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-left
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">
                                End
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-left
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">
                                Status
                            </th>

                            <th className="
                                px-5
                                py-4
                                text-right
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody className="
                        divide-y
                        divide-gray-100
                    ">

                        {sessions.map(
                            (session, index) => {

                                /*
                                 * Admin can manage scheduled
                                 * and ongoing sessions.
                                 *
                                 * Completed and cancelled
                                 * sessions are view-only.
                                 */

                                const canManage =
                                    session.status === "SCHEDULED" ||
                                    session.status === "ONGOING";


                                return (
                                    <tr
                                        key={session.id}
                                        className="
                                            transition
                                            hover:bg-gray-50
                                        "
                                    >

                                        {/* # */}

                                        <td className="
                                            whitespace-nowrap
                                            px-5
                                            py-4
                                            text-sm
                                            text-gray-500
                                        ">
                                            {index + 1}
                                        </td>


                                        {/* Session */}

                                        <td className="
                                            min-w-[220px]
                                            px-5
                                            py-4
                                        ">

                                            <p className="
                                                font-semibold
                                                text-gray-800
                                            ">
                                                {session.title ||
                                                    "Untitled Session"}
                                            </p>

                                            <p className="
                                                mt-0.5
                                                text-xs
                                                text-gray-400
                                            ">
                                                Session ID: {session.id}
                                            </p>

                                        </td>


                                        {/* Host */}

                                        <td className="
                                            whitespace-nowrap
                                            px-5
                                            py-4
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
                                                    flex-shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-blue-100
                                                    font-semibold
                                                    text-blue-700
                                                ">
                                                    {session.hostName
                                                        ?.charAt(0)
                                                        ?.toUpperCase() ||
                                                        "H"}
                                                </div>

                                                <div>

                                                    <p className="
                                                        text-sm
                                                        font-medium
                                                        text-gray-800
                                                    ">
                                                        {session.hostName ||
                                                            "Unknown"}
                                                    </p>

                                                    <p className="
                                                        text-xs
                                                        text-gray-400
                                                    ">
                                                        ID: {session.hostId}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Skill */}

                                        <td className="
                                            whitespace-nowrap
                                            px-5
                                            py-4
                                        ">

                                            <span className="
                                                inline-flex
                                                rounded-md
                                                bg-indigo-50
                                                px-3
                                                py-1.5
                                                text-sm
                                                font-medium
                                                text-indigo-700
                                            ">
                                                {session.skillName ||
                                                    "Unknown"}
                                            </span>

                                        </td>


                                        {/* Start */}

                                        <td className="
                                            whitespace-nowrap
                                            px-5
                                            py-4
                                            text-sm
                                            text-gray-600
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                            ">

                                                <CalendarDays
                                                    size={15}
                                                    className="text-gray-400"
                                                />

                                                {formatDateTime(
                                                    session.scheduledAt
                                                )}

                                            </div>

                                        </td>


                                        {/* End */}

                                        <td className="
                                            whitespace-nowrap
                                            px-5
                                            py-4
                                            text-sm
                                            text-gray-600
                                        ">
                                            {formatDateTime(
                                                session.endedAt
                                            )}
                                        </td>


                                        {/* Status */}

                                        <td className="
                                            whitespace-nowrap
                                            px-5
                                            py-4
                                        ">

                                            <span
                                                className={`
                                                    inline-flex
                                                    rounded-full
                                                    px-3
                                                    py-1
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

                                        </td>


                                        {/* Actions */}

                                        <td className="
                                            whitespace-nowrap
                                            px-5
                                            py-4
                                        ">

                                            <div className="
                                                flex
                                                justify-end
                                                gap-1.5
                                            ">

                                                {/* View - always */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onView?.(
                                                            session
                                                        )
                                                    }
                                                    title="View session"
                                                    className="
                                                        inline-flex
                                                        h-9
                                                        w-9
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        border
                                                        border-gray-200
                                                        text-gray-600
                                                        transition
                                                        hover:bg-gray-100
                                                    "
                                                >
                                                    <Eye size={16} />
                                                </button>


                                                {/* Edit */}

                                                {canManage && (

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onEdit?.(
                                                                session
                                                            )
                                                        }
                                                        title="Edit session"
                                                        className="
                                                            inline-flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            border-blue-200
                                                            text-blue-600
                                                            transition
                                                            hover:bg-blue-50
                                                        "
                                                    >
                                                        <Pencil
                                                            size={16}
                                                        />
                                                    </button>

                                                )}


                                                {/* Delete */}

                                                {canManage && (

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onDelete?.(
                                                                session
                                                            )
                                                        }
                                                        title="Delete session"
                                                        className="
                                                            inline-flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            border-red-200
                                                            text-red-600
                                                            transition
                                                            hover:bg-red-50
                                                        "
                                                    >
                                                        <Trash2
                                                            size={16}
                                                        />
                                                    </button>

                                                )}

                                            </div>

                                        </td>

                                    </tr>
                                );
                            }
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminKnowledgeSessionTable;