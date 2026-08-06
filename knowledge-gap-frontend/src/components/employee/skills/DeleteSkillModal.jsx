import React from "react";
import {
    AlertTriangle,
    Trash2,
    X,
} from "lucide-react";

const DeleteSkillModal = ({
    open,
    skill,
    loading = false,
    onClose,
    onConfirm,
}) => {

    if (!open || !skill) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4">

                {/* =====================================
                            Header
                ====================================== */}

                <div className="flex items-center justify-between p-6 border-b">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">

                            <AlertTriangle
                                size={24}
                                className="text-red-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold">

                                Delete Skill

                            </h2>

                            <p className="text-sm text-gray-500">

                                This action cannot be undone.

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* =====================================
                            Body
                ====================================== */}

                <div className="p-6">

                    <p className="text-gray-700">

                        Are you sure you want to remove

                        <span className="font-semibold">

                            {" "}

                            {skill.skillName}

                        </span>

                        {" "}from your profile?

                    </p>

                    <div className="mt-5 rounded-xl bg-red-50 border border-red-200 p-4">

                        <p className="text-sm text-red-700">

                            Removing this skill may affect your competency score,
                            assessments, and recommendations.

                        </p>

                    </div>

                </div>

                {/* =====================================
                            Footer
                ====================================== */}

                <div className="flex justify-end gap-3 border-t p-6">

                    <button

                        onClick={onClose}

                        disabled={loading}

                        className="
                            px-5
                            py-2.5
                            rounded-xl
                            border
                            border-gray-300
                            hover:bg-gray-100
                            transition
                        "

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onConfirm}

                        disabled={loading}

                        className="
                            flex
                            items-center
                            gap-2
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            transition
                        "

                    >

                        <Trash2 size={18} />

                        {

                            loading

                                ?

                                "Deleting..."

                                :

                                "Delete Skill"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteSkillModal;