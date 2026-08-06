import React from "react";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  ClipboardCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssessmentResultModal = ({
  open,
  result,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!open || !result) return null;

  const passed = result.passed;

  return (
    <>
      {/* Overlay */}

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* Modal */}

      <div className="fixed inset-0 flex justify-center items-center z-50 p-5">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">

          {/* Header */}

          <div className="p-8 text-center">

            <div
              className={`
                w-24
                h-24
                rounded-full
                mx-auto
                flex
                items-center
                justify-center

                ${
                  passed
                    ? "bg-green-100"
                    : "bg-red-100"
                }
              `}
            >
              {passed ? (
                <CheckCircle2
                  size={55}
                  className="text-green-600"
                />
              ) : (
                <XCircle
                  size={55}
                  className="text-red-600"
                />
              )}
            </div>

            <h2 className="text-3xl font-bold mt-6">

              {passed
                ? "Assessment Passed!"
                : "Assessment Failed"}

            </h2>

            <p className="text-gray-500 mt-3">

              {passed
                ? "Your assessment has been submitted for manager approval."
                : "Don't worry. You can improve and try again."}

            </p>

          </div>

          {/* Score */}

          <div className="px-8">

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-xl bg-indigo-50 p-5 text-center">

                <Trophy
                  className="mx-auto text-indigo-600"
                  size={30}
                />

                <p className="text-gray-500 mt-3">
                  Score
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {result.score}%
                </h2>

              </div>

              <div className="rounded-xl bg-green-50 p-5 text-center">

                <ClipboardCheck
                  className="mx-auto text-green-600"
                  size={30}
                />

                <p className="text-gray-500 mt-3">
                  Passing Score
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {result.passingScore}%
                </h2>

              </div>

            </div>

            {passed && (
              <div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-5">

                <h3 className="font-semibold text-yellow-700">

                  Waiting for Approval

                </h3>

                <p className="text-sm text-yellow-600 mt-2">

                  Your manager will review this assessment.
                  Once approved, your skill level and
                  learning recommendations will be updated.

                </p>

              </div>
            )}

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 p-8">

            <button
              onClick={() => {
                onClose();
                navigate("/assessment/history");
              }}
              className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
            >
              View History
            </button>

            <button
              onClick={() => {
                onClose();
                navigate("/assessment");
              }}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default AssessmentResultModal;