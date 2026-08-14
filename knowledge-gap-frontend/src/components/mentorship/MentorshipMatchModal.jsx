import React from "react";
import MentorshipMatchForm from "./MentorshipMatchForm";

const MentorshipMatchModal = ({
    isOpen,
    onClose,
    onSubmit,
    editingMatch = null,
    users = [],
    skills = [],
    loading = false,
}) => {

    if (!isOpen) {
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
                flex
                max-h-[90vh]
                w-full
                max-w-lg
                flex-col
                overflow-hidden
                rounded-xl
                bg-white
                shadow-2xl
            ">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="
                    flex
                    flex-shrink-0
                    items-center
                    justify-between
                    border-b
                    border-gray-200
                    px-6
                    py-5
                ">

                    <div>

                        <h2 className="
                            text-xl
                            font-semibold
                            text-gray-800
                        ">
                            {editingMatch
                                ? "Update Mentorship Match"
                                : "Create Mentorship Match"}
                        </h2>


                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            {editingMatch
                                ? "Update the mentor, mentee, or skill for this mentorship."
                                : "Connect a mentor and mentee based on a skill."}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close"
                        className="
                            flex
                            h-9
                            w-9
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-2xl
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        ×
                    </button>

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <div className="
                    overflow-y-auto
                    px-6
                    py-6
                ">

                    <MentorshipMatchForm
                        initialData={editingMatch}
                        users={users}
                        skills={skills}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                        loading={loading}
                    />

                </div>

            </div>

        </div>
    );
};


export default MentorshipMatchModal;