import React, { useEffect, useState } from "react";

const MentorshipMatchForm = ({
    initialData = null,
    users = [],
    skills = [],
    onSubmit,
    onCancel,
    loading = false,
}) => {

    const [formData, setFormData] = useState({
        mentorId: "",
        menteeId: "",
        skillId: "",
        status: "PENDING",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                mentorId: initialData.mentorId || "",
                menteeId: initialData.menteeId || "",
                skillId: initialData.skillId || "",
                status: initialData.status || "PENDING",
            });
        } else {
            setFormData({
                mentorId: "",
                menteeId: "",
                skillId: "",
                status: "PENDING",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.mentorId) {
            alert("Please select a mentor.");
            return;
        }

        if (!formData.menteeId) {
            alert("Please select a mentee.");
            return;
        }

        if (!formData.skillId) {
            alert("Please select a skill.");
            return;
        }

        if (formData.mentorId === formData.menteeId) {
            alert("Mentor and mentee cannot be the same.");
            return;
        }

        onSubmit({
            mentorId: Number(formData.mentorId),
            menteeId: Number(formData.menteeId),
            skillId: Number(formData.skillId),
            status: formData.status,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Mentor */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Mentor
                </label>

                <select
                    name="mentorId"
                    value={formData.mentorId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Select Mentor</option>

                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.fullName || user.name || user.email}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mentee */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Mentee
                </label>

                <select
                    name="menteeId"
                    value={formData.menteeId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Select Mentee</option>

                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.fullName || user.name || user.email}
                        </option>
                    ))}
                </select>
            </div>

            {/* Skill */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Skill
                </label>

                <select
                    name="skillId"
                    value={formData.skillId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Select Skill</option>

                    {skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                            {skill.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Status */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Status
                </label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="PENDING">Pending</option>
                    <option value="ACTIVE">Active</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t pt-5">

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Saving..."
                        : initialData
                            ? "Update Match"
                            : "Create Match"}
                </button>

            </div>

        </form>
    );
};

export default MentorshipMatchForm;