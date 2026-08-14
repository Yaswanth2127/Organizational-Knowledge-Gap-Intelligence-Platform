import React, { useEffect, useState } from "react";

import SkillSearchSelect
    from "../knowledge/SkillSearchSelect";


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
    });


    // =========================================================
    // INITIAL DATA
    // =========================================================

    useEffect(() => {

        if (initialData) {

            setFormData({
                mentorId:
                    initialData.mentorId || "",

                menteeId:
                    initialData.menteeId || "",

                skillId:
                    initialData.skillId || "",
            });

        } else {

            setFormData({
                mentorId: "",
                menteeId: "",
                skillId: "",
            });

        }

    }, [initialData]);


    // =========================================================
    // CHANGE HANDLER
    // =========================================================

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


    // =========================================================
    // SUBMIT
    // =========================================================

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


        if (
            String(formData.mentorId) ===
            String(formData.menteeId)
        ) {

            alert(
                "Mentor and mentee cannot be the same."
            );

            return;
        }


        /*
         * IMPORTANT:
         *
         * Status is intentionally NOT sent here.
         *
         * New matches are created as PENDING
         * by the backend.
         *
         * Status changes happen through:
         *
         * /accept
         * /complete
         * /cancel
         */

        onSubmit({

            mentorId:
                Number(formData.mentorId),

            menteeId:
                Number(formData.menteeId),

            skillId:
                Number(formData.skillId),

        });
    };


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >


            {/* =================================================
                MENTOR
            ================================================= */}

            <div>

                <label className="
                    mb-1
                    block
                    text-sm
                    font-medium
                    text-gray-700
                ">
                    Mentor
                </label>


                <select
                    name="mentorId"
                    value={formData.mentorId}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-3
                        py-2.5
                        outline-none
                        transition
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-100
                        disabled:cursor-not-allowed
                        disabled:bg-gray-100
                    "
                >

                    <option value="">
                        Select Mentor
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


            {/* =================================================
                MENTEE
            ================================================= */}

            <div>

                <label className="
                    mb-1
                    block
                    text-sm
                    font-medium
                    text-gray-700
                ">
                    Mentee
                </label>


                <select
                    name="menteeId"
                    value={formData.menteeId}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-3
                        py-2.5
                        outline-none
                        transition
                        focus:border-indigo-500
                        focus:ring-2
                        focus:ring-indigo-100
                        disabled:cursor-not-allowed
                        disabled:bg-gray-100
                    "
                >

                    <option value="">
                        Select Mentee
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


            {/* =================================================
                SKILL
            ================================================= */}

            <div>

                <label className="
                    mb-1
                    block
                    text-sm
                    font-medium
                    text-gray-700
                ">
                    Skill
                </label>


                <SkillSearchSelect
                    skills={skills}
                    value={formData.skillId}
                    disabled={loading}
                    onChange={(value) =>
                        setFormData((prev) => ({
                            ...prev,
                            skillId: value,
                        }))
                    }
                    placeholder="Search and select a skill..."
                />

            </div>


            {/* =================================================
                STATUS INFORMATION
            ================================================= */}

            <div className="
                rounded-lg
                border
                border-yellow-100
                bg-yellow-50
                px-4
                py-3
            ">

                <p className="
                    text-xs
                    leading-5
                    text-yellow-700
                ">

                    {initialData ? (
                        <>
                            The mentorship status is managed
                            separately using the mentorship
                            lifecycle actions. Editing this
                            match will not change its status.
                        </>
                    ) : (
                        <>
                            New mentorship matches are created
                            with <strong>Pending</strong> status.
                            The mentor can accept the match
                            after it is created.
                        </>
                    )}

                </p>

            </div>


            {/* =================================================
                BUTTONS
            ================================================= */}

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
                        font-semibold
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
                            ? "Update Match"
                            : "Create Match"}

                </button>

            </div>

        </form>
    );
};


export default MentorshipMatchForm;