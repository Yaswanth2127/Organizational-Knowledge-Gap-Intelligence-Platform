import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  Upload,
  Loader2,
} from "lucide-react";

const emptyForm = {
  name: "",
  issuer: "",
  skillId: "",
  credentialUrl: "",
  issueDate: "",
  expiryDate: "",
};

const CertificationModal = ({
  open,
  onClose,
  skills = [],
  initialValues = null,
  loading = false,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(emptyForm);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!open) return;

    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        issuer: initialValues.issuer || "",
        skillId: initialValues.skillId || "",
        credentialUrl: initialValues.credentialUrl || "",
        issueDate: initialValues.issueDate || "",
        expiryDate: initialValues.expiryDate || "",
      });
    } else {
      setFormData(emptyForm);
    }

    setFile(null);
  }, [open, initialValues]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append(
      "data",
      new Blob([JSON.stringify(formData)], {
        type: "application/json",
      })
    );

    if (file) {
      payload.append("file", file);
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">

            {initialValues
              ? "Edit Certification"
              : "Add Certification"}

          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <form
          onSubmit={submit}
          className="p-6 space-y-6"
        >

          <div className="grid gap-5 md:grid-cols-2">

            <input
              name="name"
              placeholder="Certification Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-xl border px-4 py-3"
            />

            <input
              name="issuer"
              placeholder="Issuer"
              value={formData.issuer}
              onChange={handleChange}
              required
              className="rounded-xl border px-4 py-3"
            />

            <select
              name="skillId"
              value={formData.skillId}
              onChange={handleChange}
              required
              className="rounded-xl border px-4 py-3"
            >
              <option value="">
                Select Skill
              </option>

              {skills.map((skill) => (
                <option
                  key={skill.id}
                  value={skill.id}
                >
                  {skill.name}
                </option>
              ))}
            </select>

            <input
              name="credentialUrl"
              placeholder="Credential URL"
              value={formData.credentialUrl}
              onChange={handleChange}
              className="rounded-xl border px-4 py-3"
            />

            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
              className="rounded-xl border px-4 py-3"
            />

            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="rounded-xl border px-4 py-3"
            />

          </div>

          <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer hover:bg-gray-50">

            <Upload size={18} />

            <span>

              {file
                ? file.name
                : "Upload Certificate"}

            </span>

            <input
              hidden
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />

          </label>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >

              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save size={18} />
              )}

              {initialValues
                ? "Update"
                : "Save"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CertificationModal;