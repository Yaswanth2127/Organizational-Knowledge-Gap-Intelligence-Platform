import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import employeeSkillService from "../../services/employeeSkillService";

import RatingStats from "../../components/employee/ratings/RatingStats";
import RatingFilters from "../../components/employee/ratings/RatingFilters";
import RatingCard from "../../components/employee/ratings/RatingCard";
import RatingModal from "../../components/employee/ratings/RatingModel";
import EmptyRatings from "../../components/employee/ratings/EmptyRatings";

const EmployeeRatings = () => {

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const [selectedReview, setSelectedReview] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            setLoading(true);

            const response =
                await employeeSkillService.getEligiblePeerReviews();

            setReviews(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredReviews = useMemo(() => {

        return reviews.filter((review) => {

            const matchesSearch =

                review.employeeName
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                review.skillName
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const reviewed =
                review.peerRating != null;

            const matchesStatus =

                !statusFilter ||

                (statusFilter === "PENDING" && !reviewed) ||

                (statusFilter === "REVIEWED" && reviewed);

            return matchesSearch && matchesStatus;

        });

    }, [reviews, search, statusFilter]);

    const statistics = useMemo(() => {

        const total = reviews.length;

        const completed =
            reviews.filter(
                review => review.peerRating != null
            ).length;

        return {

            total,

            completed,

            pending: total - completed,

        };

    }, [reviews]);

    if (loading) {

        return (

            <div className="flex justify-center py-32">

                <Loader2
                    className="animate-spin text-indigo-600"
                    size={45}
                />

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold">

                    Peer Ratings

                </h1>

                <p className="text-gray-500 mt-2">

                    Review your teammates' skills and submit peer ratings.

                </p>

            </div>

            <RatingStats
                statistics={statistics}
            />

            <RatingFilters
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {

                filteredReviews.length === 0 ?

                    <EmptyRatings />

                    :

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {

                            filteredReviews.map((review) => (

                                <RatingCard

                                    key={review.id}

                                    review={review}

                                    onReview={(selectedReview) => {

                                        setSelectedReview(selectedReview);

                                        setModalOpen(true);

                                    }}

                                />

                            ))

                        }

                    </div>

            }

            <RatingModal

                open={modalOpen}

                review={selectedReview}

                loading={submitting}

                onClose={() => {

                    setModalOpen(false);

                    setSelectedReview(null);

                }}

                onSubmit={async (payload) => {

                    try {

                        setSubmitting(true);

                        await employeeSkillService.submitPeerReview(

                            selectedReview.id,

                            payload

                        );

                        await loadData();

                        setModalOpen(false);

                        setSelectedReview(null);

                    }

                    catch (error) {

                        console.error(error);

                    }

                    finally {

                        setSubmitting(false);

                    }

                }}

            />

        </div>

    );

};

export default EmployeeRatings;