import React from "react";
import {
    Code2,
    User,
    Users,
    ShieldCheck,
    Star,
    CalendarDays,
    Pencil,
    Trash2,
} from "lucide-react";

const RatingBadge = ({ title, value, color }) => (

    <div className={`rounded-xl p-3 ${color}`}>

        <p className="text-xs font-medium opacity-80">

            {title}

        </p>

        <p className="mt-1 font-semibold">

            {value || "Not Rated"}

        </p>

    </div>

);

const SkillCard = ({
    skill,
    onEdit,
    onDelete,
}) => {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">

            <div className="p-6">

                {/* ==========================
                        Header
                ========================== */}

                <div className="flex justify-between items-start">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

                                <Code2
                                    size={24}
                                    className="text-indigo-600"
                                />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">

                                    {skill.skillName}

                                </h2>

                                <p className="text-gray-500 text-sm">

                                    Employee Skill

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ==========================
                        Ratings
                ========================== */}

                <div className="grid grid-cols-2 gap-4 mt-6">

                    <RatingBadge
                        title="Self Rating"
                        value={skill.selfRating}
                        color="bg-blue-50 text-blue-700"
                    />

                    <RatingBadge
                        title="Peer Rating"
                        value={skill.peerRating}
                        color="bg-green-50 text-green-700"
                    />

                    <RatingBadge
                        title="Manager Rating"
                        value={skill.managerRating}
                        color="bg-yellow-50 text-yellow-700"
                    />

                    <RatingBadge
                        title="Final Rating"
                        value={skill.finalRating}
                        color="bg-purple-50 text-purple-700"
                    />

                </div>

                {/* ==========================
                        Assessment Date
                ========================== */}

                <div className="flex items-center gap-3 mt-6 border-t pt-5">

                    <CalendarDays
                        size={18}
                        className="text-indigo-600"
                    />

                    <div>

                        <p className="text-xs text-gray-500">

                            Last Assessed

                        </p>

                        <p className="font-medium text-gray-800">

                            {

                                skill.lastAssessedAt

                                    ?

                                    new Date(
                                        skill.lastAssessedAt
                                    ).toLocaleDateString()

                                    :

                                    "Never"

                            }

                        </p>

                    </div>

                </div>

                {/* ==========================
                        Actions
                ========================== */}

                <div className="flex justify-end gap-3 mt-6 border-t pt-5">

                    <button

                        onClick={() => onEdit(skill)}

                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-gray-300
                            px-4
                            py-2
                            hover:bg-gray-100
                            transition
                        "

                    >

                        <Pencil size={16} />

                        Edit

                    </button>

                    <button

                        onClick={() => onDelete(skill)}

                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-red-600
                            px-4
                            py-2
                            text-white
                            hover:bg-red-700
                            transition
                        "

                    >

                        <Trash2 size={16} />

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

};

export default SkillCard;