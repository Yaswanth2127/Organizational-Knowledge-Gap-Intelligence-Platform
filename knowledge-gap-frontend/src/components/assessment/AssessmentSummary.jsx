import React from "react";
import {
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const cards = [
  {
    key: "total",
    title: "Total Assessments",
    icon: ClipboardCheck,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    key: "pending",
    title: "Pending",
    icon: Clock3,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    key: "passed",
    title: "Passed",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600",
  },
  {
    key: "approved",
    title: "Approved",
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-600",
  },
  {
    key: "failed",
    title: "Failed",
    icon: XCircle,
    color: "bg-red-50 text-red-600",
  },
];

const AssessmentSummary = ({ summary }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={22} />
              </div>

              <span className="text-3xl font-bold text-gray-900">
                {summary?.[card.key] ?? 0}
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssessmentSummary;