import React, { useState } from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

const DeleteExpertModal = ({
    open,
    expert,
    onClose,
    onConfirm,
}) => {
    const [loading, setLoading] = useState(false);

    if (!open || !expert) {
        return null;
    }

    const handleDelete = async () => {
        try {
            setLoading(true);
            await onConfirm(expert);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50
                       flex items-center justify-center
                       bg-black/50 px-4"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-md
                           bg-white rounded-2xl
                           shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center
                                justify-between
                                px-6 py-5
                                border-b border-gray-200">

                    <div className="flex items-center gap-3">

                        <div className="p-2.5
                                        rounded-xl
                                        bg-red-100">

                            <AlertTriangle
                                size={22}
                                className="text-red-600"
                            />

                        </div>

                        <h2 className="text-lg
                                       font-semibold
                                       text-gray-900">
                            Delete Expertise
                        </h2>

                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2
                                   rounded-lg
                                   text-gray-400
                                   hover:bg-gray-100
                                   hover:text-gray-600
                                   disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Content */}
                <div className="px-6 py-6">

                    <p className="text-gray-700">
                        Are you sure you want to remove
                        your expertise in{" "}
                        <span className="font-semibold text-gray-900">
                            {expert.skillName}
                        </span>
                        ?
                    </p>

                    <p className="text-sm
                                  text-gray-500
                                  mt-2">
                        This will remove this skill from your
                        expert profile and it will no longer
                        appear under your expertise.
                    </p>

                </div>

                {/* Footer */}
                <div className="flex justify-end
                                gap-3
                                px-6 py-4
                                border-t border-gray-200">

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className="px-4 py-2.5
                                   rounded-lg
                                   border border-gray-300
                                   text-gray-700
                                   text-sm
                                   font-medium
                                   hover:bg-gray-50
                                   disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="inline-flex
                                   items-center
                                   gap-2
                                   px-4 py-2.5
                                   rounded-lg
                                   bg-red-600
                                   text-white
                                   text-sm
                                   font-medium
                                   hover:bg-red-700
                                   disabled:opacity-50"
                    >

                        {loading ? (
                            <>
                                <Loader2
                                    size={17}
                                    className="animate-spin"
                                />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={17} />
                                Delete
                            </>
                        )}

                    </button>

                </div>

            </div>
        </div>
    );
};

export default DeleteExpertModal;