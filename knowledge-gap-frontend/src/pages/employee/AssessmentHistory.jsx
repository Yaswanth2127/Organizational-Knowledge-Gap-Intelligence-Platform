import React, { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Loader2,
  Search,
  CalendarDays,
  Trophy,
  UserCheck,
  MessageSquare,
} from "lucide-react";

import assessmentService from "../../services/assessmentService";
import StatusBadge from "../../components/assessment/StatusBadge";

const AssessmentHistory = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const response =
        await assessmentService.getAssessmentHistory();

      setAssessments(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return assessments.filter((assessment) => {
      const matchesSearch =
        assessment.skillName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        assessment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [assessments, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
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
          <ClipboardList className="text-indigo-600" />
          Assessment History
        </h1>

        <p className="text-gray-500 mt-2">
          View all your completed assessments.
        </p>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-2xl border p-5">

        <div className="grid md:grid-cols-2 gap-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              className="w-full pl-11 pr-4 py-3 border rounded-xl"
              placeholder="Search by skill..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <select
            className="border rounded-xl px-4"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="ALL">All</option>
            <option value="PASSED">Passed</option>
            <option value="FAILED">Failed</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

        </div>

      </div>

      {/* Timeline */}

      <div className="space-y-5">

        {filtered.length === 0 ? (

          <div className="bg-white rounded-2xl border p-12 text-center text-gray-500">

            No assessments found.

          </div>

        ) : (

          filtered.map((assessment) => (

            <div
              key={assessment.id}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-bold">

                    {assessment.skillName}

                  </h2>

                  <p className="text-gray-500 mt-1">

                    {assessment.title}

                  </p>

                </div>

                <StatusBadge
                  status={assessment.status}
                />

              </div>

              <div className="grid lg:grid-cols-4 gap-6 mt-6">

                <div className="flex gap-3">

                  <Trophy
                    className="text-indigo-600"
                  />

                  <div>

                    <p className="text-xs text-gray-500">

                      SCORE

                    </p>

                    <p className="font-semibold">

                      {assessment.score}%

                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <CalendarDays
                    className="text-green-600"
                  />

                  <div>

                    <p className="text-xs text-gray-500">

                      DATE

                    </p>

                    <p className="font-semibold">

                      {new Date(
                        assessment.assessedAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <UserCheck
                    className="text-blue-600"
                  />

                  <div>

                    <p className="text-xs text-gray-500">

                      APPROVED BY

                    </p>

                    <p className="font-semibold">

                      {assessment.approvedByName ??
                        "--"}

                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <MessageSquare
                    className="text-orange-600"
                  />

                  <div>

                    <p className="text-xs text-gray-500">

                      REMARKS

                    </p>

                    <p className="font-semibold">

                      {assessment.remarks ??
                        "--"}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default AssessmentHistory;