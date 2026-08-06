import React, { useState } from "react";
import {
  X,
  Sparkles,
  Loader2,
  AlertTriangle,
  Target,
} from "lucide-react";

const CreateAssessmentModal = ({
  open,
  onClose,
  skillGaps = [],
  onCreate,
  loading,
}) => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  if (!open) return null;

  const handleCreate = () => {
    if (!selectedSkill) return;

    onCreate(selectedSkill.skillId);
  };

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed inset-0 flex justify-center items-center z-50 p-5">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">

          {/* Header */}

          <div className="flex justify-between items-center px-8 py-6 border-b">

            <div>

              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Sparkles className="text-indigo-600" />
                Start Skill Assessment
              </h2>

              <p className="text-gray-500 mt-1">
                Select one of your current skill gaps.
              </p>

            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex justify-center items-center"
            >
              <X />
            </button>

          </div>

          {/* Body */}

          <div className="p-8 overflow-y-auto max-h-[500px]">

            {skillGaps.length === 0 ? (
              <div className="text-center py-16">

                <AlertTriangle
                  className="mx-auto text-yellow-500"
                  size={50}
                />

                <h3 className="text-xl font-semibold mt-5">
                  No Skill Gaps Available
                </h3>

                <p className="text-gray-500 mt-2">
                  You currently don't have any skill gaps
                  available for assessment.
                </p>

              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">

                {skillGaps.map((gap) => {
                  const selected =
                    selectedSkill?.skillId === gap.skillId;

                  return (
                    <div
                      key={gap.skillId}
                      onClick={() => setSelectedSkill(gap)}
                      className={`
                        cursor-pointer
                        rounded-2xl
                        border-2
                        transition-all
                        p-6
                        hover:shadow-lg

                        ${
                          selected
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="font-bold text-lg">
                            {gap.skillName}
                          </h3>

                          <p className="text-gray-500">
                            Gap Score : {gap.gapScore}
                          </p>

                        </div>

                        <Target className="text-indigo-600" />

                      </div>

                      <div className="mt-5 space-y-3">

                        <div className="flex justify-between">

                          <span className="text-gray-500">
                            Current
                          </span>

                          <span className="font-semibold">
                            {gap.currentLevel}
                          </span>

                        </div>

                        <div className="flex justify-between">

                          <span className="text-gray-500">
                            Required
                          </span>

                          <span className="font-semibold">
                            {gap.requiredLevel}
                          </span>

                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Footer */}

          <div className="border-t px-8 py-5 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              disabled={!selectedSkill || loading}
              onClick={handleCreate}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Assessment
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default CreateAssessmentModal;