import React from "react";
import {
  ArrowRight,
  TrendingUp,
  Target,
  AlertTriangle,
} from "lucide-react";

const getSeverityColor = (gapScore) => {
  if (gapScore >= 3)
    return {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-600",
      badge: "Critical",
    };

  if (gapScore >= 2)
    return {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-600",
      badge: "High",
    };

  if (gapScore >= 1)
    return {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-600",
      badge: "Medium",
    };

  return {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
    badge: "Low",
  };
};

const SkillGapCard = ({ gap, onStart }) => {
  const severity = getSeverityColor(gap.gapScore);

  return (
    <div
      className={`rounded-2xl border ${severity.border} ${severity.bg} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {gap.skillName}
          </h3>

          <p className="text-gray-500 mt-1">
            Skill Gap Assessment
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${severity.bg} ${severity.text}`}
        >
          {severity.badge}
        </span>
      </div>

      {/* Gap Info */}

      <div className="space-y-4 mt-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-500">
            <TrendingUp size={18} />
            Current Level
          </div>

          <span className="font-semibold">
            {gap.currentLevel}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-500">
            <Target size={18} />
            Required Level
          </div>

          <span className="font-semibold">
            {gap.requiredLevel}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-gray-500">
            <AlertTriangle
              size={18}
              className={severity.text}
            />
            Gap Score
          </div>

          <span
            className={`font-bold text-lg ${severity.text}`}
          >
            {gap.gapScore}
          </span>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            style={{
              width: `${Math.min(
                gap.gapScore * 25,
                100
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Button */}

      <button
        onClick={onStart}
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl flex justify-center items-center gap-2 font-medium"
      >
        Start Assessment
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default SkillGapCard;