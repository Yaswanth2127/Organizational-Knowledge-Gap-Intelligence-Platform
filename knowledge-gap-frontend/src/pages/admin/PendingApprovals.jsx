import React, { useEffect, useState } from "react";
import {
  ClipboardCheck,
  Loader2,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";

import assessmentService from "../../services/assessmentService";
import StatusBadge from "../../components/assessment/StatusBadge";

const PendingApprovals = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [remarks, setRemarks] = useState({});

  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    loadPendingApprovals();
  }, []);

  const loadPendingApprovals = async () => {
    try {
      setLoading(true);

      const response =
        await assessmentService.getPendingApprovals();

      setAssessments(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (
    assessmentId,
    approved
  ) => {
    try {
      setProcessingId(assessmentId);

      await assessmentService.approveAssessment({
        assessmentId,
        approved,
        remarks: remarks[assessmentId] || "",
      });

      await loadPendingApprovals();
    } catch (err) {
      console.error(err);
      alert("Unable to update assessment.");
    } finally {
      setProcessingId(null);
    }
  };

  const filtered = assessments.filter((assessment) =>
    assessment.userName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center py-24">
        <Loader2
          className="animate-spin text-indigo-600"
          size={40}
        />
      </div>
    );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ClipboardCheck className="text-indigo-600" />
          Pending Approvals
        </h1>

        <p className="text-gray-500 mt-2">
          Review employee assessment results.
        </p>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border p-5">

        <div className="relative">

          <Search
            className="absolute left-4 top-4 text-gray-400"
            size={18}
          />

          <input
            className="w-full border rounded-xl pl-11 py-3"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* Cards */}

      <div className="space-y-5">

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center text-gray-500">
            No pending approvals.
          </div>
        ) : (
          filtered.map((assessment) => (
            <div
              key={assessment.id}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >
              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    {assessment.userName}
                  </h2>

                  <p className="text-gray-500">
                    {assessment.skillName}
                  </p>

                </div>

                <StatusBadge
                  status={assessment.status}
                />

              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-6">

                <div>

                  <p className="text-gray-500 text-sm">
                    Score
                  </p>

                  <h2 className="font-bold text-xl">
                    {assessment.score}%
                  </h2>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Passing Score
                  </p>

                  <h2 className="font-bold text-xl">
                    {assessment.passingScore}%
                  </h2>

                </div>

                <div>

                  <p className="text-gray-500 text-sm">
                    Date
                  </p>

                  <h2 className="font-semibold">
                    {new Date(
                      assessment.assessedAt
                    ).toLocaleDateString()}
                  </h2>

                </div>

              </div>

              <textarea
                className="w-full border rounded-xl mt-6 p-4"
                rows={3}
                placeholder="Remarks..."
                value={
                  remarks[assessment.id] || ""
                }
                onChange={(e) =>
                  setRemarks((prev) => ({
                    ...prev,
                    [assessment.id]:
                      e.target.value,
                  }))
                }
              />

              <div className="flex justify-end gap-3 mt-6">

                <button
                  disabled={
                    processingId === assessment.id
                  }
                  onClick={() =>
                    handleApproval(
                      assessment.id,
                      false
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <XCircle size={18} />
                  Reject
                </button>

                <button
                  disabled={
                    processingId === assessment.id
                  }
                  onClick={() =>
                    handleApproval(
                      assessment.id,
                      true
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  Approve
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default PendingApprovals;