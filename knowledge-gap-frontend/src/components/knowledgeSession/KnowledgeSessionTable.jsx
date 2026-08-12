import React from "react";

const KnowledgeSessionTable = ({
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

        return new Date(date).toLocaleString();
    };

    if (sessions.length === 0) {

        return (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">

                <div className="mb-3 text-4xl">
                    📚
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                    No knowledge sessions found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Create a knowledge session to see it here.
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
                                Session
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Host
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Skill
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Scheduled At
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Status
                            </th>

                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {sessions.map((session, index) => (

                            <tr
                                key={session.id}
                                className="hover:bg-gray-50"
                            >

                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {index + 1}
                                </td>

                                {/* Session */}
                                <td className="px-5 py-4">

                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {session.title || "Untitled Session"}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            ID: {session.id}
                                        </p>
                                    </div>

                                </td>

                                {/* Host */}
                                <td className="px-5 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                                            {session.hostName
                                                ?.charAt(0)
                                                ?.toUpperCase() || "H"}
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                {session.hostName || "Unknown"}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                ID: {session.hostId}
                                            </p>
                                        </div>

                                    </div>

                                </td>

                                {/* Skill */}
                                <td className="px-5 py-4">

                                    <span className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
                                        {session.skillName || "Unknown"}
                                    </span>

                                </td>

                                {/* Date */}
                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {formatDateTime(session.scheduledAt)}
                                </td>

                                {/* Status */}
                                <td className="px-5 py-4">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                            session.status
                                        )}`}
                                    >
                                        {session.status || "SCHEDULED"}
                                    </span>

                                </td>

                                {/* Actions */}
                                <td className="px-5 py-4">

                                    <div className="flex justify-end gap-2">

                                        {session.locationLink && (
                                            <a
                                                href={session.locationLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-lg border border-green-200 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50"
                                            >
                                                Join
                                            </a>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => onView?.(session)}
                                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                                        >
                                            View
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onEdit?.(session)}
                                            className="rounded-lg border border-blue-200 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDelete?.(session)}
                                            className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default KnowledgeSessionTable;