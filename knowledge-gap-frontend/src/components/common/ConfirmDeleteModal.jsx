import React from "react";
import {
    AlertTriangle,
    Trash2,
    X,
} from "lucide-react";

export default function ConfirmDeleteModal({
    open,
    title = "Delete Item",
    itemName,
    message = "This action cannot be undone.",
    loading = false,
    onCancel,
    onConfirm,
}) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

                {/* HEADER */}

                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                            <Trash2
                                size={20}
                                className="text-red-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                {title}
                            </h2>

                            <p className="text-xs text-gray-400 mt-0.5">
                                Please confirm this action.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* BODY */}

                <div className="p-6">

                    <p className="text-sm text-gray-600 leading-6">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-gray-900">
                            {itemName || "this item"}
                        </span>
                        ?
                    </p>

                    <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">

                        <AlertTriangle
                            size={18}
                            className="text-red-500 mt-0.5 flex-shrink-0"
                        />

                        <p className="text-xs text-red-700 leading-5">
                            {message}
                        </p>

                    </div>

                </div>

                {/* FOOTER */}

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-semibold transition disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition disabled:opacity-60"
                    >
                        <Trash2 size={15} />

                        {loading
                            ? "Deleting..."
                            : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
}