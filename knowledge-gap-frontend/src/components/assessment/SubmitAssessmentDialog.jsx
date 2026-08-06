import React from "react";
import {
  AlertTriangle,
  Loader2,
} from "lucide-react";

const SubmitAssessmentDialog = ({
  open,
  answeredQuestions,
  totalQuestions,
  submitting = false,
  onCancel,
  onConfirm,
}) => {

  if (!open) return null;

  const allAnswered =
    answeredQuestions === totalQuestions;

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={submitting ? undefined : onCancel}
      />

      {/* Dialog */}

      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">

          {/* Header */}

          <div className="p-8 text-center">

            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">

              <AlertTriangle
                size={40}
                className="text-yellow-600"
              />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              Submit Assessment?
            </h2>

            <p className="text-gray-500 mt-3">
              Once submitted, you won't be able to
              modify your answers.
            </p>

          </div>

          {/* Progress */}

          <div className="px-8">

            <div className="rounded-xl bg-gray-100 p-4">

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Answered Questions
                </span>

                <span className="font-semibold">
                  {answeredQuestions} / {totalQuestions}
                </span>

              </div>

            </div>

            {!allAnswered && (
              <div className="mt-5 rounded-xl bg-red-50 border border-red-200 p-4">

                <p className="text-sm text-red-700">
                  Please answer all questions before
                  submitting.
                </p>

              </div>
            )}

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 p-8">

            <button
              onClick={onCancel}
              disabled={submitting}
              className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              disabled={!allAnswered || submitting}
              onClick={onConfirm}
              className={`
                px-6
                py-3
                rounded-xl
                flex
                items-center
                gap-2
                text-white

                ${
                  allAnswered
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              {submitting ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Submitting...
                </>
              ) : (
                "Submit Assessment"
              )}
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default SubmitAssessmentDialog;