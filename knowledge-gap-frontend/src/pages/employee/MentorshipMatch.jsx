import React, { useEffect, useMemo, useState } from "react";
import {
    Handshake,
    Loader2,
    UserRound,
} from "lucide-react";

import mentorshipMatchApi from "../../services/mentorshipMatchApi";
import { getAllSkills } from "../../services/skillService";

import MentorshipMatchFilters
    from "../../components/mentorship/MentorshipMatchFilters";

import MentorshipMatchTable
    from "../../components/mentorship/MentorshipMatchTable";

import MentorshipMatchDetailsModal
    from "../../components/mentorship/MentorshipMatchDetailsModal";


const DEFAULT_FILTERS = {
    mentorId: "",
    menteeId: "",
    skillId: "",
    status: "",
};


const MentorshipMatch = () => {

    const [matches, setMatches] = useState([]);
    const [skills, setSkills] = useState([]);

    const [filters, setFilters] = useState(
        DEFAULT_FILTERS
    );

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [viewingMatch, setViewingMatch] = useState(null);


    /*
     * Get current logged-in user's ID.
     */
    const currentUserId = Number(
        localStorage.getItem("userId")
    );


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {
        loadPageData();
    }, []);


    const loadPageData = async () => {

        try {

            setLoading(true);
            setError("");

            if (!currentUserId) {

                setError(
                    "Unable to identify the logged-in user."
                );

                return;
            }


            /*
             * Skills are needed for the filter.
             */
            const skillsResponse =
                await getAllSkills();


            setSkills(
                Array.isArray(skillsResponse)
                    ? skillsResponse
                    : []
            );


            /*
             * Load only this user's mentorships.
             */
            await loadMyMatches(
                currentUserId
            );


        } catch (err) {

            console.error(
                "Failed to load mentorship page:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load mentorship information."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================================
    // LOAD MY MENTORSHIPS
    // =========================================================

    const loadMyMatches = async (userId) => {

        const [
            mentorResponse,
            menteeResponse,
        ] = await Promise.all([

            mentorshipMatchApi
                .getMatchesByMentor(userId),

            mentorshipMatchApi
                .getMatchesByMentee(userId),

        ]);


        const mentorMatches =
            Array.isArray(mentorResponse.data)
                ? mentorResponse.data
                : [];


        const menteeMatches =
            Array.isArray(menteeResponse.data)
                ? menteeResponse.data
                : [];


        /*
         * A user can be both mentor and mentee.
         *
         * Remove duplicate match IDs.
         */
        const uniqueMatches = Array.from(
            new Map(
                [
                    ...mentorMatches,
                    ...menteeMatches,
                ].map((match) => [
                    match.id,
                    match,
                ])
            ).values()
        );


        setMatches(uniqueMatches);
    };


    // =========================================================
    // FILTERS
    // =========================================================

    const handleFilterChange = (
        name,
        value
    ) => {

        setFilters((current) => ({
            ...current,
            [name]: value,
        }));

    };


    const handleResetFilters = () => {

        setFilters(
            DEFAULT_FILTERS
        );

    };


    const filteredMatches = useMemo(() => {

        return matches.filter((match) => {

            if (
                filters.mentorId &&
                String(match.mentorId) !==
                String(filters.mentorId)
            ) {
                return false;
            }


            if (
                filters.menteeId &&
                String(match.menteeId) !==
                String(filters.menteeId)
            ) {
                return false;
            }


            if (
                filters.skillId &&
                String(match.skillId) !==
                String(filters.skillId)
            ) {
                return false;
            }


            if (
                filters.status &&
                match.status !==
                filters.status
            ) {
                return false;
            }


            return true;

        });

    }, [matches, filters]);


    // =========================================================
    // VIEW
    // =========================================================

    const handleView = (match) => {

        setViewingMatch(match);

    };


    // =========================================================
    // ACCEPT
    // =========================================================

    const handleAccept = async (match) => {

        try {

            setActionLoading(true);
            setError("");
            setSuccess("");


            await mentorshipMatchApi
                .acceptMatch(match.id);


            setSuccess(
                "Mentorship accepted successfully."
            );


            await loadMyMatches(
                currentUserId
            );


        } catch (err) {

            console.error(
                "Failed to accept mentorship:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to accept mentorship."
            );

        } finally {

            setActionLoading(false);

        }
    };


    // =========================================================
    // COMPLETE
    // =========================================================

    const handleComplete = async (match) => {

        try {

            setActionLoading(true);
            setError("");
            setSuccess("");


            await mentorshipMatchApi
                .completeMatch(match.id);


            setSuccess(
                "Mentorship completed successfully."
            );


            await loadMyMatches(
                currentUserId
            );


        } catch (err) {

            console.error(
                "Failed to complete mentorship:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to complete mentorship."
            );

        } finally {

            setActionLoading(false);

        }
    };


    // =========================================================
    // CANCEL
    // =========================================================

    const handleCancel = async (match) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this mentorship?"
        );


        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(true);
            setError("");
            setSuccess("");


            await mentorshipMatchApi
                .cancelMatch(match.id);


            setSuccess(
                "Mentorship cancelled successfully."
            );


            await loadMyMatches(
                currentUserId
            );


        } catch (err) {

            console.error(
                "Failed to cancel mentorship:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to cancel mentorship."
            );

        } finally {

            setActionLoading(false);

        }
    };


    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div className="space-y-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-50
                        text-indigo-600
                    ">

                        <Handshake size={21} />

                    </div>


                    <div>

                        <h1 className="
                            text-2xl
                            font-bold
                            text-gray-900
                        ">
                            My Mentorship
                        </h1>


                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            View and manage your mentorship
                            relationships.
                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (

                <div className="
                    rounded-xl
                    border
                    border-green-200
                    bg-green-50
                    p-4
                    text-sm
                    text-green-700
                ">
                    {success}
                </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    p-4
                    text-sm
                    text-red-700
                ">
                    {error}
                </div>

            )}


            {/* =================================================
                FILTERS
            ================================================= */}

            <MentorshipMatchFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                users={[]}
                skills={skills}
            />


            {/* =================================================
                CONTENT
            ================================================= */}

            {loading ? (

                <div className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    py-16
                ">

                    <Loader2
                        size={30}
                        className="
                            animate-spin
                            text-indigo-600
                        "
                    />


                    <p className="
                        mt-3
                        text-sm
                        text-gray-500
                    ">
                        Loading your mentorship matches...
                    </p>

                </div>

            ) : filteredMatches.length === 0 ? (

                <div className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    py-16
                ">

                    <div className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-gray-100
                    ">

                        <UserRound
                            size={22}
                            className="text-gray-400"
                        />

                    </div>


                    <h3 className="
                        mt-4
                        text-sm
                        font-bold
                        text-gray-800
                    ">
                        No mentorship matches found
                    </h3>


                    <p className="
                        mt-1
                        text-xs
                        text-gray-500
                    ">
                        You currently don't have any
                        mentorship matches.
                    </p>

                </div>

            ) : (

                <MentorshipMatchTable
                    matches={filteredMatches}
                    currentUserId={currentUserId}
                    onView={handleView}
                    onAccept={handleAccept}
                    onComplete={handleComplete}
                    onCancel={handleCancel}
                    actionLoading={actionLoading}
                />

            )}


            {/* =================================================
                VIEW DETAILS
            ================================================= */}

            <MentorshipMatchDetailsModal
                match={viewingMatch}
                onClose={() =>
                    setViewingMatch(null)
                }
            />

        </div>
    );
};


export default MentorshipMatch;