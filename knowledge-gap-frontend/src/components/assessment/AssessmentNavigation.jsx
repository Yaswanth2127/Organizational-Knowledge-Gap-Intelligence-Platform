import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";

const AssessmentNavigation = ({
  currentQuestion,
  totalQuestions,
  answers,
  questions,
  onPrevious,
  onNext,
  onSubmit,
  submitting = false,
}) => {

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

 const answeredQuestions = questions.filter(
  (question) => answers[question.id] !== undefined
).length;

const allQuestionsAnswered =
  answeredQuestions === totalQuestions;

// ADD THESE TWO LINES HERE
const currentQuestionId = questions[currentQuestion]?.id;

const canMoveNext =
  currentQuestionId != null &&
  answers[currentQuestionId] !== undefined;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

      <div className="flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Previous */}

        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`
            flex items-center gap-2
            px-5 py-3
            rounded-xl
            transition

            ${
              isFirstQuestion
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }
          `}
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        {/* Status */}

        <div className="text-center">

          <p className="text-sm text-gray-500">
            Answered
          </p>

          <h2 className="font-bold text-lg text-indigo-600">
            {answeredQuestions} / {totalQuestions}
          </h2>

        </div>

        {/* Next / Submit */}

        {!isLastQuestion ? (
          <button
    onClick={onNext}
    disabled={!canMoveNext}
    className={`
        flex items-center gap-2
        px-5 py-3
        rounded-xl
        transition

        ${
            canMoveNext
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }
    `}
>
            Next
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!allQuestionsAnswered || submitting}
            className={`
              flex items-center gap-2
              px-6 py-3
              rounded-xl
              transition

              ${
                allQuestionsAnswered
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <Send size={18} />

            {submitting
              ? "Submitting..."
              : "Submit Assessment"}
          </button>
        )}

      </div>

      {!allQuestionsAnswered && isLastQuestion && (
        <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

          <p className="text-sm text-yellow-700">
            Please answer all questions before submitting
            your assessment.
          </p>

        </div>
      )}

    </div>
  );
};

export default AssessmentNavigation;