import React from "react";
import {
    AlertTriangle,
    Trash2,
    X,
} from "lucide-react";

const DeleteKnowledgeSessionModal = ({
    session,
    onClose,
    onConfirm,
    loading = false,
}) => {

    if (!session) {
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
                        Delete Knowledge Session?
                    </h2>

                    <p className="
                        mt-2
                        text-sm
                        leading-6
                        text-gray-500
                    ">
                        You are about to delete:
                    </p>


                    <div className="
                        mt-3
                        rounded-xl
                        border
                        border-red-100
                        bg-red-50
                        p-4
                    ">

                        <p className="
                            font-semibold
                            text-red-900
                        ">
                            {session.title ||
                                "Untitled Session"}
                        </p>

                        <p className="
                            mt-1
                            text-xs
                            text-red-700
                        ">
                            Hosted by{" "}
                            {session.hostName ||
                                "Unknown"}
                        </p>

                    </div>


                    <p className="
                        mt-4
                        text-sm
                        text-gray-500
                    ">
                        This action cannot be undone.
                        The session will be permanently
                        removed.
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
                            : "Delete Session"}

                    </button>

                </div>

            </div>

        </div>
    );
};


export default DeleteKnowledgeSessionModal;