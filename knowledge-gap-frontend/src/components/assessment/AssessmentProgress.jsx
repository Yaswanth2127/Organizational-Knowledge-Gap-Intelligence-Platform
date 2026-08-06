import React from "react";
import {
    CheckCircle2,
    Circle,
    ClipboardCheck,
} from "lucide-react";

const AssessmentProgress = ({
    currentQuestion,
    totalQuestions,
    answers,
    questions,
    onQuestionSelect,
}) => {

    const answeredCount = Object.keys(answers).length;

    const progress =
        totalQuestions === 0
            ? 0
            : (answeredCount / totalQuestions) * 100;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Header */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                        <ClipboardCheck
                            className="text-indigo-600"
                            size={22}
                        />
                    </div>

                    <div>

                        <h2 className="text-lg font-bold text-gray-900">
                            Assessment Progress
                        </h2>

                        <p className="text-sm text-gray-500">
                            Question {currentQuestion + 1} of {totalQuestions}
                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <p className="text-sm text-gray-500">
                        Answered
                    </p>

                    <h3 className="text-2xl font-bold text-indigo-600">
                        {answeredCount}/{totalQuestions}
                    </h3>

                </div>

            </div>

            {/* Progress Bar */}

            <div className="mt-6">

                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                    <div
                        className="h-full bg-indigo-600 transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />

                </div>

            </div>

            {/* Question Indicators */}

            <div className="mt-8 flex flex-wrap justify-center gap-3">

                {Array.from({ length: totalQuestions }).map((_, index) => {

                    const answered =
                        questions[index] &&
                        answers[questions[index].id] !== undefined;

                    return (
                       <button
    key={index}
    type="button"
    onClick={() => onQuestionSelect(index)}
                            className={`
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                border-2
                transition

                ${index === currentQuestion
                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                    : answered
                                        ? "bg-green-100 border-green-500 text-green-700"
                                        : "bg-white border-gray-300 text-gray-500"
                                }
              `}
                        >
                            {answered ? (
                                <CheckCircle2 size={18} />
                            ) : (
                                <span className="font-semibold">
                                    {index + 1}
                                </span>
                            )}
                        </button>
                    );

                })}

            </div>

        </div>
    );
};

export default AssessmentProgress;