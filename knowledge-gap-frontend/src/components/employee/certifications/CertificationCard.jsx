import React from "react";
import {
  Award,
  CalendarDays,
  ExternalLink,
  Download,
  Pencil,
  Trash2,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";

const CertificationCard = ({
  certification,
  onEdit,
  onDelete,
}) => {

  const today = new Date();

  const expiry = certification.expiryDate
    ? new Date(certification.expiryDate)
    : null;

  let status = "Active";
  let badgeClass = "bg-green-100 text-green-700";

  if (expiry) {

    const days = Math.ceil(
      (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    if (days < 0) {
      status = "Expired";
      badgeClass = "bg-red-100 text-red-700";
    } else if (days <= 30) {
      status = "Expiring Soon";
      badgeClass = "bg-yellow-100 text-yellow-700";
    }

  }

  return (

    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="p-6">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div className="flex gap-4">

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

              <Award
                className="text-indigo-600"
                size={28}
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-900">

                {certification.name}

              </h2>

              <p className="text-gray-500 mt-1">

                {certification.issuer}

              </p>

            </div>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {status}
          </span>

        </div>

        {/* Details */}

        <div className="grid md:grid-cols-3 gap-5 mt-8">

          <div>

            <p className="text-xs uppercase text-gray-400">

              Skill

            </p>

            <p className="font-semibold text-gray-800 mt-1">

              {certification.skillName}

            </p>

          </div>

          <div>

            <p className="text-xs uppercase text-gray-400">

              Issue Date

            </p>

            <p className="font-semibold text-gray-800 mt-1">

              {certification.issueDate || "--"}

            </p>

          </div>

          <div>

            <p className="text-xs uppercase text-gray-400">

              Expiry Date

            </p>

            <p className="font-semibold text-gray-800 mt-1">

              {certification.expiryDate || "--"}

            </p>

          </div>

        </div>

        {/* Links */}

        {(certification.credentialUrl ||
          certification.fileUrl) && (

          <div className="flex flex-wrap gap-3 mt-6">

            {certification.credentialUrl && (

              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              >

                <ExternalLink size={16} />

                Credential

              </a>

            )}

            {certification.fileUrl && (

              <a
                href={certification.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              >

                <Download size={16} />

                Download

              </a>

            )}

          </div>

        )}

        {/* Actions */}

        <div className="flex justify-end gap-3 mt-8 pt-5 border-t">

          <button
            onClick={() => onEdit(certification)}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >

            <Pencil size={16} />

            Edit

          </button>

          <button
            onClick={() => onDelete(certification)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >

            <Trash2 size={16} />

            Delete

          </button>

        </div>

      </div>

    </div>

  );

};

export default CertificationCard;