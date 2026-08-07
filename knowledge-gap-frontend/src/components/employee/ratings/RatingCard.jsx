import React from "react";
import {
    User,
    Briefcase,
    Star,
    Users,
    ShieldCheck,
    Trophy,
    CalendarDays,
    CheckCircle2,
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

const RatingCard = ({
    review,
    onReview,
}) => {

    const alreadyReviewed = review.peerRating != null;

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">

            <div className="p-6">

                {/* ===================================
                            Header
                =================================== */}

                <div className="flex justify-between items-start">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">

                                <User
                                    size={24}
                                    className="text-indigo-600"
                                />

                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">

                                    {review.userName}

                                </h2>

                                <p className="text-gray-500">

                                    {review.skillName}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ===================================
                            Ratings
                =================================== */}

                <div className="grid grid-cols-2 gap-4 mt-6">

                    <RatingBadge
                        title="Self Rating"
                        value={review.selfRating}
                        color="bg-blue-50 text-blue-700"
                    />

                    <RatingBadge
                        title="Peer Rating"
                        value={review.peerRating}
                        color="bg-green-50 text-green-700"
                    />

                    <RatingBadge
                        title="Manager Rating"
                        value={review.managerRating}
                        color="bg-yellow-50 text-yellow-700"
                    />

                    <RatingBadge
                        title="Final Rating"
                        value={review.finalRating}
                        color="bg-purple-50 text-purple-700"
                    />

                </div>

                {/* ===================================
                        Assessment Date
                =================================== */}

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

                                review.lastAssessedAt

                                    ?

                                    new Date(
                                        review.lastAssessedAt
                                    ).toLocaleDateString()

                                    :

                                    "Never"

                            }

                        </p>

                    </div>

                </div>

                {/* ===================================
                            Footer
                =================================== */}

                <div className="mt-6 border-t pt-5">

                    {

                        alreadyReviewed ?

                            (

                                <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 text-green-700 py-3 font-semibold">

                                    <CheckCircle2 size={20} />

                                    Review Submitted

                                </div>

                            )

                            :

                            (

                                <button

                                    onClick={() => onReview(review)}

                                    className="
                                        w-full
                                        bg-indigo-600
                                        hover:bg-indigo-700
                                        text-white
                                        rounded-xl
                                        py-3
                                        font-semibold
                                        transition
                                    "

                                >

                                    Give Peer Rating

                                </button>

                            )

                    }

                </div>

            </div>

        </div>

    );

};

export default RatingCard;