import React, { useEffect, useState } from "react";
import SkillSearchSelect from "../knowledge/SkillSearchSelect";

const KnowledgeSessionForm = ({
    initialData = null,
    skills = [],
    onSubmit,
    onCancel,
    loading = false,
}) => {

    const [formData, setFormData] = useState({
        title: "",
        topicSkillId: "",
        scheduledAt: "",
        endedAt: "",
        locationLink: "",
    });


    useEffect(() => {

        if (initialData) {

            setFormData({
                title: initialData.title || "",

                topicSkillId:
                    initialData.topicSkillId || "",

                scheduledAt:
                    initialData.scheduledAt
                        ? initialData.scheduledAt.slice(0, 16)
                        : "",

                endedAt:
                    initialData.endedAt
                        ? initialData.endedAt.slice(0, 16)
                        : "",

                locationLink:
                    initialData.locationLink || "",
            });

        } else {

            setFormData({
                title: "",
                topicSkillId: "",
                scheduledAt: "",
                endedAt: "",
                locationLink: "",
            });

        }

    }, [initialData]);


    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    const handleSkillChange = (skillId) => {

        setFormData((prev) => ({
            ...prev,
            topicSkillId: skillId,
        }));

    };


    const handleSubmit = (e) => {

        e.preventDefault();


        if (!formData.title.trim()) {

            alert("Please enter session title.");
            return;

        }


        if (!formData.topicSkillId) {

            alert("Please select a skill.");
            return;

        }


        if (!formData.scheduledAt) {

            alert(
                "Please select scheduled date and time."
            );

            return;

        }


        if (!formData.endedAt) {

            alert(
                "Please select session end date and time."
            );

            return;

        }


        const startTime =
            new Date(formData.scheduledAt);

        const endTime =
            new Date(formData.endedAt);


        if (endTime <= startTime) {

            alert(
                "Session end time must be after start time."
            );

            return;

        }


        /*
         * Host is NOT sent from frontend.
         *
         * Backend automatically gets
         * the logged-in user as the host.
         */

        onSubmit({

            title:
                formData.title.trim(),

            topicSkillId:
                Number(formData.topicSkillId),

            scheduledAt:
                formData.scheduledAt,

            endedAt:
                formData.endedAt,

            locationLink:
                formData.locationLink.trim(),

        });

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            {/* Host Information */}

            <div className="
                rounded-lg
                border
                border-indigo-100
                bg-indigo-50
                px-4
                py-3
            ">

                <p className="
                    text-xs
                    font-medium
                    text-indigo-600
                ">
                    Session Host
                </p>

                <p className="
                    mt-1
                    text-sm
                    font-semibold
                    text-indigo-900
                ">
                    You
                </p>

                <p className="
                    mt-0.5
                    text-xs
                    text-indigo-600
                ">
                    You will automatically be assigned
                    as the host of this session.
                </p>

            </div>


            {/* Title */}

            <div>

                <label className="
                    mb-1
                    block
                    text-sm
                    font-medium
                    text-gray-700
                ">
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
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        px-3
                        py-2.5
                        outline-none
                        transition
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-100
                    "
                />

            </div>


            {/* Skill */}

            <div>

                <label className="
                    mb-1
                    block
                    text-sm
                    font-medium
                    text-gray-700
                ">
                    Topic Skill
                </label>

                <SkillSearchSelect
                    skills={skills}
                    value={formData.topicSkillId}
                    onChange={handleSkillChange}
                    disabled={loading}
                    placeholder="Search and select a skill..."
                />

            </div>


            {/* Scheduled At */}

            <div>

                <label className="
                    mb-1
                    block
                    text-sm
                    font-medium
                    text-gray-700
                ">
                    Start Date & Time
                </label>

                <input
                    type="datetime-local"
                    name="scheduledAt"
                    value={formData.scheduledAt}
                    onChange={handleChange}
                    required
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        px-3
                        py-2.5
                        outline-none
                        transition
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-100
                    "
                />

            </div>


            {/* Ended At */}

            <div>

                <label className="
                    mb-1
                    block
                    text-sm
                    font-medium
                    text-gray-700
                ">
                    End Date & Time
                </label>

                <input
                    type="datetime-local"
                    name="endedAt"
                    value={formData.endedAt}
                    onChange={handleChange}
                    required
                    min={formData.scheduledAt || undefined}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        px-3
                        py-2.5
                        outline-none
                        transition
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-100
                    "
                />

                <p className="
                    mt-1
                    text-xs
                    text-gray-500
                ">
                    The session will automatically be marked
                    as completed after this time.
                </p>

            </div>


            {/* Location */}

            <div>

                <label className="
                    mb-1
                    block
                    text-sm
                    font-medium
                    text-gray-700
                ">
                    Meeting / Location Link
                </label>

                <input
                    type="url"
                    name="locationLink"
                    value={formData.locationLink}
                    onChange={handleChange}
                    placeholder="https://meet.google.com/..."
                    maxLength={500}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        px-3
                        py-2.5
                        outline-none
                        transition
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-100
                    "
                />

            </div>


            {/* Buttons */}

            <div className="
                flex
                justify-end
                gap-3
                border-t
                pt-5
            ">

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        rounded-lg
                        border
                        border-gray-300
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-100
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    Cancel
                </button>


                <button
                    type="submit"
                    disabled={loading}
                    className="
                        rounded-lg
                        bg-indigo-600
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-indigo-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
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