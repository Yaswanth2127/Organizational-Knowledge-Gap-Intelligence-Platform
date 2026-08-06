import React, { useEffect, useState } from "react";
import {
    Loader2,
    Save,
    X,
    PlusCircle,
    Pencil,
} from "lucide-react";

const emptyForm = {
    skillId: "",
    selfRating: "",
};

const SkillModal = ({
    open,
    skills = [],
    initialValues = null,
    loading = false,
    onSubmit,
    onClose,
}) => {

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {

        if (initialValues) {

            setFormData({

                skillId: initialValues.skillId,

                selfRating: initialValues.selfRating || "",

            });

        }

        else {

            setFormData(emptyForm);

        }

    }, [initialValues]);

    if (!open) return null;

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

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl mx-4">

                {/* ==========================
                        Header
                ========================== */}

                <div className="flex items-center justify-between border-b px-8 py-6">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">

                            {

                                initialValues

                                    ?

                                    <Pencil
                                        className="text-indigo-600"
                                        size={24}
                                    />

                                    :

                                    <PlusCircle
                                        className="text-indigo-600"
                                        size={24}
                                    />

                            }

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">

                                {

                                    initialValues

                                        ?

                                        "Edit Skill"

                                        :

                                        "Add Skill"

                                }

                            </h2>

                            <p className="text-gray-500 text-sm">

                                Update your technical skill profile.

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

                {/* ==========================
                        Form
                ========================== */}

                <form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-6"
                >

                    {/* Skill */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">

                            Skill

                        </label>

                        <select

                            name="skillId"

                            value={formData.skillId}

                            onChange={handleChange}

                            disabled={!!initialValues}

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

                                Select Skill

                            </option>

                            {

                                skills.map((skill) => (

                                    <option
                                        key={skill.id}
                                        value={skill.id}
                                    >

                                        {skill.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* Self Rating */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">

                            Self Rating

                        </label>

                        <select

                            name="selfRating"

                            value={formData.selfRating}

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

                    {/* Footer */}

                    <div className="flex justify-end gap-3 border-t pt-6">

                        <button

                            type="button"

                            onClick={onClose}

                            className="
                                px-6
                                py-3
                                rounded-xl
                                border
                                border-gray-300
                                hover:bg-gray-100
                            "

                        >

                            Cancel

                        </button>

                        <button

                            disabled={loading}

                            className="
                                bg-indigo-600
                                hover:bg-indigo-700
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                flex
                                items-center
                                gap-2
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

                                initialValues

                                    ?

                                    "Update Skill"

                                    :

                                    "Add Skill"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default SkillModal;