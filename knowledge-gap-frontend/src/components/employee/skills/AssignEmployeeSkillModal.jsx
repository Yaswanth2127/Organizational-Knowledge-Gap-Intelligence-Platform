import React, { useEffect, useState } from "react";
import { X, User, Brain, TrendingUp, Info } from "lucide-react";

const proficiencyLevels = [
    "UNAWARE",
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
    "EXPERT",
];

const AssignEmployeeSkillModal = ({
    open,
    onClose,
    onAssign,
    employees=[],
    skills=[],
    loading = false,
}) => {

    const [formData, setFormData] = useState({
        userId: "",
        skillId: "",
        initialLevel: "BEGINNER",
    });

    useEffect(() => {
        if (open) {
            setFormData({
                userId: "",
                skillId: "",
                initialLevel: "BEGINNER",
            });
        }
    }, [open]);

    if (!open) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {

        if (!formData.userId || !formData.skillId) {
            alert("Please select both employee and skill.");
            return;
        }

        onAssign(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Assign Employee Skill
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Assign a skill with an initial proficiency level.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition"
                    >
                        <X size={24} />
                    </button>

                </div>

                {/* Body */}

                <div className="p-6 space-y-6">

                    {/* Employee */}

                    <div>

                        <label className="flex items-center gap-2 text-sm font-semibold mb-2">

                            <User size={18} />

                            Employee

                        </label>

                        <select
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                        >

                            <option value="">
                                Select Employee
                            </option>

                            {employees.map((employee) => (

                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.fullName}
                                    {employee.jobRole
                                        ? ` (${employee.jobRole.name})`
                                        : ""}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Skill */}

                    <div>

                        <label className="flex items-center gap-2 text-sm font-semibold mb-2">

                            <Brain size={18} />

                            Skill

                        </label>

                        <select
                            name="skillId"
                            value={formData.skillId}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
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

                    </div>

                    {/* Initial Proficiency */}

                    <div>

                        <label className="flex items-center gap-2 text-sm font-semibold mb-2">

                            <TrendingUp size={18} />

                            Initial Proficiency

                        </label>

                        <select
                            name="initialLevel"
                            value={formData.initialLevel}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                        >

                            {proficiencyLevels.map(level => (

                                <option
                                    key={level}
                                    value={level}
                                >
                                    {level}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Information */}

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

                        <div className="flex items-start gap-3">

                            <Info
                                size={20}
                                className="text-blue-600 mt-1"
                            />

                            <div>

                                <h3 className="font-semibold text-blue-700">

                                    Initial Assignment

                                </h3>

                                <p className="text-sm text-blue-600 mt-1">

                                    The selected proficiency represents the
                                    employee's initial skill level.

                                </p>

                                <p className="text-sm text-blue-600 mt-1">

                                    Self, Peer, Manager and Final ratings will
                                    be updated later through assessments and
                                    performance reviews.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t px-6 py-4 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-60"
                    >
                        {loading
                            ? "Assigning..."
                            : "Assign Skill"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AssignEmployeeSkillModal;