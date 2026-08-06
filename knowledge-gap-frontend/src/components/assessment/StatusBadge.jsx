import React from "react";
import {
  Clock3,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },

  PASSED: {
    label: "Passed",
    icon: CheckCircle2,
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
  },

  FAILED: {
    label: "Failed",
    icon: XCircle,
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  },

  APPROVED: {
    label: "Approved",
    icon: ShieldCheck,
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },

  REJECTED: {
    label: "Rejected",
    icon: ShieldX,
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  },
};

const StatusBadge = ({ status }) => {
  const config =
    statusConfig[status] ?? statusConfig.PENDING;

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        text-sm
        font-medium
        border
        ${config.bg}
        ${config.text}
        ${config.border}
      `}
    >
      <Icon size={15} />
      {config.label}
    </span>
  );
};

export default StatusBadge;