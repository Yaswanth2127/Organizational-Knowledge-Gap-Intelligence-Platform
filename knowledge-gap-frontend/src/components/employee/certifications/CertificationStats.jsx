import React from "react";
import {
  Award,
  BadgeCheck,
  Clock3,
  AlertTriangle,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-sm text-gray-500">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

      </div>

      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="text-white" size={26} />
      </div>

    </div>

  </div>
);

const CertificationStats = ({ stats }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total"
        value={stats.total}
        icon={Award}
        color="bg-indigo-600"
      />

      <StatCard
        title="Active"
        value={stats.active}
        icon={BadgeCheck}
        color="bg-green-600"
      />

      <StatCard
        title="Expiring Soon"
        value={stats.expiringSoon}
        icon={Clock3}
        color="bg-yellow-500"
      />

      <StatCard
        title="Expired"
        value={stats.expired}
        icon={AlertTriangle}
        color="bg-red-600"
      />

    </div>
  );
};

export default CertificationStats;