import React, { useEffect, useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

const ArticleDeleteModal = ({
    open,
    article,
    isAdminDelete = false,
    loading = false,
    onClose,
    onConfirm,
}) => {
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (open) {
            setReason("");
        }
    }, [open]);

    if (!open || !article) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isAdminDelete && !reason.trim()) {
            return;
        }

        onConfirm(
            isAdminDelete
                ? reason.trim()
                : null
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle
                                size={22}
                                className="text-red-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {isAdminDelete
                                    ? "Delete Article"
                                    : "Delete Your Article"}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                This action cannot be undone.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                    >
                        <X size={21} />
                    </button>

                </div>

                {/* Body */}
                <form onSubmit={handleSubmit}>

                    <div className="p-6 space-y-5">

                        {/* Article */}
                        <div className="bg-gray-50 rounded-xl p-4">

                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                Article
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {article.title}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                By {article.authorName || "Unknown Author"}
                            </p>

                        </div>

                        {/* Admin / HR reason */}
                        {isAdminDelete ? (
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Reason for deletion *
                                </label>

                                <textarea
                                    value={reason}
                                    onChange={(e) =>
                                        setReason(e.target.value)
                                    }
                                    disabled={loading}
                                    required
                                    rows={5}
                                    maxLength={500}
                                    placeholder="Explain why this article is being removed..."
                                    className="w-full px-4 py-3 border border-gray-300
                                               rounded-xl resize-none
                                               focus:outline-none
                                               focus:ring-2 focus:ring-red-500
                                               disabled:bg-gray-100"
                                />

                                <div className="flex justify-end mt-1">
                                    <span className="text-xs text-gray-400">
                                        {reason.length}/500
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 mt-2">
                                    The article author will receive a notification
                                    containing this reason.
                                </p>

                            </div>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Are you sure you want to delete this article?
                                You will not be able to recover it after deletion.
                            </p>
                        )}

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t px-6 py-4">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-5 py-2.5 rounded-xl border
                                       border-gray-300 text-gray-700
                                       hover:bg-gray-100
                                       disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                (isAdminDelete && !reason.trim())
                            }
                            className="flex items-center gap-2 px-5 py-2.5
                                       rounded-xl bg-red-600 text-white
                                       font-semibold hover:bg-red-700
                                       disabled:opacity-50"
                        >
                            <Trash2 size={17} />

                            {loading
                                ? "Deleting..."
                                : "Delete Article"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default ArticleDeleteModal;