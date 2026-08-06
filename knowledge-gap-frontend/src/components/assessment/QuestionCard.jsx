import React from "react";
import { CheckCircle2 } from "lucide-react";

const options = [
  { key: "A", field: "optionA" },
  { key: "B", field: "optionB" },
  { key: "C", field: "optionC" },
  { key: "D", field: "optionD" },
];

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <p className="text-sm text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </p>

          <h2 className="text-xl font-semibold mt-2 text-gray-900">
            {question.question}
          </h2>

        </div>

      </div>

      {/* Options */}

      <div className="space-y-4 mt-8">

        {options.map((option) => {
          const selected = selectedAnswer === option.key;

          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onAnswerSelect(option.key)}
              className={`
                w-full
                rounded-xl
                border-2
                transition-all
                p-5
                flex
                justify-between
                items-center
                text-left

                ${
                  selected
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center gap-4">

                <div
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-bold

                    ${
                      selected
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {option.key}
                </div>

                <span className="text-gray-800 font-medium">
                  {question[option.field]}
                </span>

              </div>

              {selected && (
                <CheckCircle2
                  size={22}
                  className="text-indigo-600"
                />
              )}
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default QuestionCard;