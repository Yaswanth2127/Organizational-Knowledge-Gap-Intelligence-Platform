import React, { useEffect, useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock3,
  ShieldCheck,
  Percent,
  Trophy,
  Loader2,
} from "lucide-react";
import assessmentService from "../../services/assessmentService";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={26} className="text-white" />
      </div>
    </div>
  </div>
);

const AssessmentStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);

      const response =
        await assessmentService.getStatistics();

      setStats(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2
          className="animate-spin text-indigo-600"
          size={40}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ClipboardCheck className="text-indigo-600" />
          Assessment Statistics
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of employee assessment performance.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Assessments"
          value={stats.totalAssessments}
          icon={ClipboardCheck}
          color="bg-indigo-600"
        />

        <StatCard
          title="Passed"
          value={stats.passedAssessments}
          icon={CheckCircle2}
          color="bg-green-600"
        />

        <StatCard
          title="Failed"
          value={stats.failedAssessments}
          icon={XCircle}
          color="bg-red-600"
        />

        <StatCard
          title="Pending"
          value={stats.pendingAssessments}
          icon={Clock3}
          color="bg-yellow-500"
        />

        <StatCard
          title="Approved"
          value={stats.approvedAssessments}
          icon={ShieldCheck}
          color="bg-blue-600"
        />

        <StatCard
          title="Rejected"
          value={stats.rejectedAssessments}
          icon={XCircle}
          color="bg-gray-600"
        />

        <StatCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          icon={Trophy}
          color="bg-purple-600"
        />

        <StatCard
          title="Pass Rate"
          value={`${stats.passRate}%`}
          icon={Percent}
          color="bg-emerald-600"
        />

      </div>

      {/* Summary */}

      <div className="bg-white rounded-2xl border shadow-sm p-8">

        <h2 className="text-xl font-semibold">
          Assessment Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-8">

          <div>

            <div className="flex justify-between mb-4">
              <span>Total Assessments</span>
              <span className="font-bold">
                {stats.totalAssessments}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Passed</span>
              <span className="font-bold text-green-600">
                {stats.passedAssessments}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Failed</span>
              <span className="font-bold text-red-600">
                {stats.failedAssessments}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pending Approval</span>
              <span className="font-bold text-yellow-600">
                {   stats.pendingAssessments}
              </span>
            </div>

          </div>

          <div>

            <div className="flex justify-between mb-4">
              <span>Approved</span>
              <span className="font-bold text-blue-600">
                {stats.approvedAssessments}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Rejected</span>
              <span className="font-bold text-gray-700">
                {stats.rejectedAssessments}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Average Score</span>
              <span className="font-bold">
                {stats.averageScore}%
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pass Percentage</span>
              <span className="font-bold text-indigo-600">
                {stats.passRate}%
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AssessmentStatistics;