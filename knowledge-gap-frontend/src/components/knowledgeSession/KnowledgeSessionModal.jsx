import React from "react";
import KnowledgeSessionForm from "./KnowledgeSessionForm";

const KnowledgeSessionModal = ({
    isOpen,
    onClose,
    onSubmit,
    editingSession,
    users = [],
    skills = [],
    loading = false,
}) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {editingSession
                                ? "Update Knowledge Session"
                                : "Create Knowledge Session"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Schedule a knowledge-sharing session.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>

                {/* Form */}
                <div className="px-6 py-6">

                    <KnowledgeSessionForm
                        initialData={editingSession}
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

export default KnowledgeSessionModal;