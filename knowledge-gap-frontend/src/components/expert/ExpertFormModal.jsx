import React, { useEffect, useState } from "react";
import { Loader2, Save, X } from "lucide-react";
import SkillSearchSelect from "../knowledge/SkillSearchSelect";
import expertDirectoryApi from "../../services/expertDirectoryApi";

const ExpertFormModal = ({
    open,
    onClose,
    skills,
    expert = null,
    onSuccess,
}) => {
    const [skillId, setSkillId] = useState("");
    const [expertiseLevel, setExpertiseLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isEditMode = Boolean(expert);

    useEffect(() => {
        if (!open) {
            return;
        }

        setError("");

        if (expert) {
            setSkillId(String(expert.skillId));
            setExpertiseLevel(expert.expertiseLevel || "");
        } else {
            setSkillId("");
            setExpertiseLevel("");
        }
    }, [open, expert]);

    if (!open) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!skillId) {
            setError("Please select a skill.");
            return;
        }

        if (!expertiseLevel) {
            setError("Please select your expertise level.");
            return;
        }

        const data = {
            skillId: Number(skillId),
            expertiseLevel,
        };

        try {
            setLoading(true);

            if (isEditMode) {
                await expertDirectoryApi.updateExpert(
                    expert.id,
                    data
                );
            } else {
                await expertDirectoryApi.addExpert(data);
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            console.error(
                "Failed to save expertise:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Failed to save expertise."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setError("");
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50
                       bg-black/50
                       flex items-center
                       justify-center
                       p-4"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-lg
                           bg-white
                           rounded-2xl
                           shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center
                                justify-between
                                px-6 py-5
                                border-b"
                >
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {isEditMode
                                ? "Update My Expertise"
                                : "Add My Expertise"}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {isEditMode
                                ? "Update your skill expertise."
                                : "Add a skill you have expertise in."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={loading}
                        className="p-2 rounded-lg
                                   text-gray-500
                                   hover:bg-gray-100
                                   disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >
                    {/* Error */}
                    {error && (
                        <div className="p-3
                                        rounded-lg
                                        bg-red-50
                                        border border-red-200
                                        text-red-700
                                        text-sm">
                            {error}
                        </div>
                    )}

                    {/* Skill */}
                    <div>
                        <label className="block
                                          text-sm
                                          font-medium
                                          text-gray-700
                                          mb-2">
                            Skill
                        </label>

                        <SkillSearchSelect
                            skills={skills}
                            value={skillId}
                            onChange={setSkillId}
                            placeholder="Search and select a skill..."
                        />
                    </div>

                    {/* Expertise Level */}
                    <div>
                        <label className="block
                                          text-sm
                                          font-medium
                                          text-gray-700
                                          mb-2">
                            Expertise Level
                        </label>

                        <select
                            value={expertiseLevel}
                            onChange={(e) =>
                                setExpertiseLevel(e.target.value)
                            }
                            className="w-full
                                       px-4 py-3
                                       border border-gray-300
                                       rounded-xl
                                       bg-white
                                       text-gray-700
                                       focus:outline-none
                                       focus:ring-2
                                       focus:ring-indigo-500
                                       focus:border-indigo-500"
                        >
                            <option value="">
                                Select expertise level
                            </option>

                            <option value="BEGINNER">
                                Beginner
                            </option>

                            <option value="INTERMEDIATE">
                                Intermediate
                            </option>

                            <option value="ADVANCED">
                                Advanced
                            </option>

                            <option value="EXPERT">
                                Expert
                            </option>
                        </select>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end
                                    gap-3
                                    pt-2">

                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="px-5 py-2.5
                                       rounded-xl
                                       border border-gray-300
                                       text-gray-700
                                       hover:bg-gray-50
                                       disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5
                                       rounded-xl
                                       bg-indigo-600
                                       text-white
                                       flex items-center
                                       gap-2
                                       hover:bg-indigo-700
                                       disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {isEditMode
                                        ? "Update Expertise"
                                        : "Add Expertise"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpertFormModal;