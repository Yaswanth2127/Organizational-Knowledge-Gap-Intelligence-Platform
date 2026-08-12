import React, { useEffect, useState } from "react";

const KnowledgeSessionForm = ({
    initialData = null,
    users = [],
    skills = [],
    onSubmit,
    onCancel,
    loading = false,
}) => {

    const [formData, setFormData] = useState({
        hostId: "",
        title: "",
        topicSkillId: "",
        scheduledAt: "",
        locationLink: "",
    });

    useEffect(() => {

        if (initialData) {

            setFormData({
                hostId: initialData.hostId || "",
                title: initialData.title || "",
                topicSkillId: initialData.topicSkillId || "",
                scheduledAt: initialData.scheduledAt
                    ? initialData.scheduledAt.slice(0, 16)
                    : "",
                locationLink: initialData.locationLink || "",
            });

        } else {

            setFormData({
                hostId: "",
                title: "",
                topicSkillId: "",
                scheduledAt: "",
                locationLink: "",
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

        if (!formData.hostId) {
            alert("Please select a host.");
            return;
        }

        if (!formData.title.trim()) {
            alert("Please enter session title.");
            return;
        }

        if (!formData.topicSkillId) {
            alert("Please select a skill.");
            return;
        }

        if (!formData.scheduledAt) {
            alert("Please select scheduled date and time.");
            return;
        }

        onSubmit({
            hostId: Number(formData.hostId),
            title: formData.title.trim(),
            topicSkillId: Number(formData.topicSkillId),
            scheduledAt: formData.scheduledAt,
            locationLink: formData.locationLink.trim(),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            {/* Host */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Host
                </label>

                <select
                    name="hostId"
                    value={formData.hostId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">
                        Select Host
                    </option>

                    {users.map((user) => (
                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.fullName ||
                                user.name ||
                                user.email ||
                                `User #${user.id}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Title */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Session Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter session title"
                    maxLength={200}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            {/* Skill */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Topic Skill
                </label>

                <select
                    name="topicSkillId"
                    value={formData.topicSkillId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">
                        Select Skill
                    </option>

                    {skills.map((skill) => (
                        <option
                            key={skill.id}
                            value={skill.id}
                        >
                            {skill.name || `Skill #${skill.id}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Scheduled At */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Scheduled Date & Time
                </label>

                <input
                    type="datetime-local"
                    name="scheduledAt"
                    value={formData.scheduledAt}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
            </div>

            {/* Location */}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Meeting / Location Link
                </label>

                <input
                    type="url"
                    name="locationLink"
                    value={formData.locationLink}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/..."
                    maxLength={500}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
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
                            ? "Update Session"
                            : "Create Session"}
                </button>

            </div>

        </form>
    );
};

export default KnowledgeSessionForm;