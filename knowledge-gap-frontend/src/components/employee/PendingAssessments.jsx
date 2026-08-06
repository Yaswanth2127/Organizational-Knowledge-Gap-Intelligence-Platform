import React from "react";
import {
  ClipboardCheck,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PendingAssessments({ assessments = [] }) {
  const navigate = useNavigate();

  const pendingAssessments = assessments.filter(
    (assessment) => assessment.status === "PENDING"
  );

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8">

      <div className="flex justify-between items-center p-8 border-b">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Pending Assessments
          </h2>

          <p className="text-gray-500 mt-2">
            Complete your pending assessments.
          </p>
        </div>

        <ClipboardCheck
          size={36}
          className="text-indigo-600"
        />

      </div>

      <div className="p-8">

        {pendingAssessments.length === 0 ? (

          <div className="text-center py-10">

            <ClipboardCheck
              size={50}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 text-lg font-semibold">
              No Pending Assessments
            </h3>

            <p className="text-gray-500 mt-2">
              Generate an assessment from your skill gaps below.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {pendingAssessments.map((assessment) => (

              <div
                key={assessment.id}
                className="border rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition"
              >

                <div>

                  <h3 className="text-lg font-bold">
                    {assessment.skillName}
                  </h3>

                  <div className="flex items-center gap-2 mt-3 text-gray-500">

                    <Clock size={18} />

                    Pending Assessment

                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(`/assessment/take/${assessment.id}`)
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  Take Assessment
                  <ArrowRight size={18} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}