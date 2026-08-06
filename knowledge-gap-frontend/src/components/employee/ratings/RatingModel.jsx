import React, { useEffect, useState } from "react";
import {
    X,
    Save,
    Loader2,
    Users,
} from "lucide-react";

const emptyForm = {
    peerRating: "",
};

const RatingModal = ({
    open,
    review,
    loading = false,
    onClose,
    onSubmit,
}) => {

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {

        if (open) {

            setFormData(emptyForm);

        }

    }, [open]);

    if (!open || !review) return null;

    const handleChange = (e) => {

        setFormData((prev) => ({

            ...prev,

            [e.target.name]: e.target.value,

        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4">

                {/* ======================================
                            Header
                ======================================= */}

                <div className="flex items-center justify-between border-b p-6">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">

                            <Users
                                size={24}
                                className="text-indigo-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">

                                Peer Review

                            </h2>

                            <p className="text-sm text-gray-500">

                                Submit your review for this employee.

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="p-2 rounded-xl hover:bg-gray-100"

                    >

                        <X size={20} />

                    </button>

                </div>

                {/* ======================================
                            Body
                ======================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >

                    <div className="grid gap-5">

                        <div>

                            <label className="text-sm font-medium text-gray-500">

                                Employee

                            </label>

                            <p className="mt-1 text-lg font-semibold">

                                {review.employeeName}

                            </p>

                        </div>

                        <div>

                            <label className="text-sm font-medium text-gray-500">

                                Skill

                            </label>

                            <p className="mt-1 text-lg font-semibold">

                                {review.skillName}

                            </p>

                        </div>

                        <div>

                            <label className="text-sm font-medium text-gray-500">

                                Self Rating

                            </label>

                            <p className="mt-1 font-semibold text-indigo-600">

                                {review.selfRating ?? "Not Rated"}

                            </p>

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">

                                Peer Rating

                            </label>

                            <select

                                name="peerRating"

                                value={formData.peerRating}

                                onChange={handleChange}

                                required

                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    px-4
                                    py-3
                                    focus:ring-2
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    outline-none
                                "

                            >

                                <option value="">

                                    Select Rating

                                </option>

                                <option value="BEGINNER">

                                    Beginner

                                </option>

                                <option value="INTERMEDIATE">

                                    Intermediate

                                </option>

                                <option value="ADVANCED">

                                    Advanced

                                </option>

                                <option value="EXPERT">

                                    Expert

                                </option>

                            </select>

                        </div>

                    </div>

                    {/* ======================================
                                Footer
                    ======================================= */}

                    <div className="flex justify-end gap-3 border-t pt-6">

                        <button

                            type="button"

                            onClick={onClose}

                            disabled={loading}

                            className="
                                px-6
                                py-3
                                rounded-xl
                                border
                                border-gray-300
                                hover:bg-gray-100
                                transition
                            "

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            disabled={loading}

                            className="
                                flex
                                items-center
                                gap-2
                                bg-indigo-600
                                hover:bg-indigo-700
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                transition
                            "

                        >

                            {

                                loading

                                    ?

                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    :

                                    <Save size={18} />

                            }

                            {

                                loading

                                    ?

                                    "Submitting..."

                                    :

                                    "Submit Review"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default RatingModal;