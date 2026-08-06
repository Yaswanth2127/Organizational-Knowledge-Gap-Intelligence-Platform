import React from "react";
import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

const DeleteCertificationModal = ({
  open,
  certification,
  loading = false,
  onClose,
  onConfirm,
}) => {

  if (!open || !certification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">

              <AlertTriangle
                size={24}
                className="text-red-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold">
                Delete Certification
              </h2>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-gray-700">

            Are you sure you want to delete

            <span className="font-semibold">
              {" "}
              "{certification.name}"
            </span>

            ?

          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-6">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteCertificationModal;