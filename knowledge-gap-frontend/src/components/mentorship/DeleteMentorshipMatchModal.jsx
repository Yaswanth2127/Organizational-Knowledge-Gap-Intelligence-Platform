import React from "react";
import {
    AlertTriangle,
    Trash2,
    X,
} from "lucide-react";

const DeleteMentorshipMatchModal = ({
    match,
    onClose,
    onConfirm,
    loading = false,
}) => {

    if (!match) {
        return null;
    }


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
                max-w-md
                rounded-2xl
                bg-white
                shadow-2xl
            ">

                {/* Header */}

                <div className="
                    flex
                    items-start
                    justify-between
                    px-6
                    pt-6
                ">

                    <div className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-red-50
                        text-red-600
                    ">
                        <AlertTriangle size={21} />
                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                            disabled:cursor-not-allowed
                        "
                    >
                        <X size={18} />
                    </button>

                </div>


                {/* Content */}

                <div className="px-6 py-5">

                    <h2 className="
                        text-lg
                        font-bold
                        text-gray-900
                    ">
                        Delete Mentorship Match?
                    </h2>

                    <p className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                    ">
                        You are about to remove this
                        mentor-mentee relationship.
                    </p>


                    {/* Match Preview */}

                    <div className="
                        mt-4
                        rounded-xl
                        border
                        border-red-100
                        bg-red-50
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
                                rounded-full
                                bg-blue-100
                                font-semibold
                                text-blue-700
                            ">
                                {match.mentorName
                                    ?.charAt(0)
                                    ?.toUpperCase() || "M"}
                            </div>

                            <div className="min-w-0">

                                <p className="
                                    text-xs
                                    font-medium
                                    text-red-700
                                ">
                                    Mentor
                                </p>

                                <p className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-red-900
                                ">
                                    {match.mentorName ||
                                        "Unknown"}
                                </p>

                            </div>

                            <span className="
                                px-1
                                text-sm
                                font-semibold
                                text-red-400
                            ">
                                →
                            </span>

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

                            <div className="min-w-0">

                                <p className="
                                    text-xs
                                    font-medium
                                    text-red-700
                                ">
                                    Mentee
                                </p>

                                <p className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-red-900
                                ">
                                    {match.menteeName ||
                                        "Unknown"}
                                </p>

                            </div>

                        </div>


                        <div className="
                            mt-3
                            border-t
                            border-red-100
                            pt-3
                        ">

                            <p className="
                                text-xs
                                text-red-700
                            ">
                                Skill
                            </p>

                            <p className="
                                mt-0.5
                                text-sm
                                font-semibold
                                text-red-900
                            ">
                                {match.skillName ||
                                    "Unknown"}
                            </p>

                        </div>

                    </div>


                    <p className="
                        mt-4
                        text-sm
                        text-gray-500
                    ">
                        This action cannot be undone.
                    </p>

                </div>


                {/* Footer */}

                <div className="
                    flex
                    justify-end
                    gap-3
                    border-t
                    border-gray-100
                    px-6
                    py-4
                ">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
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
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-red-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        <Trash2 size={16} />

                        {loading
                            ? "Deleting..."
                            : "Delete Match"}

                    </button>

                </div>

            </div>

        </div>
    );
};


export default DeleteMentorshipMatchModal;