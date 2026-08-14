import React, { useEffect, useMemo, useState } from "react";
import {
    Handshake,
    Loader2,
    Plus,
} from "lucide-react";

import mentorshipMatchApi
    from "../../services/mentorshipMatchApi";

import { getAllSkills }
    from "../../services/skillService";

import { getAllUsers }
    from "../../services/userService";

import MentorshipMatchFilters
    from "../../components/mentorship/MentorshipMatchFilters";

import AdminMentorshipMatchTable
    from "../../components/mentorship/AdminMentorshipMatchTable";

import MentorshipMatchModal
    from "../../components/mentorship/MentorshipMatchModal";

import MentorshipMatchDetailsModal
    from "../../components/mentorship/MentorshipMatchDetailsModal";


const DEFAULT_FILTERS = {
    mentorId: "",
    menteeId: "",
    skillId: "",
    status: "",
};


const AdminMentorshipMatch = () => {

    // =========================================================
    // DATA
    // =========================================================

    const [matches, setMatches] = useState([]);
    const [users, setUsers] = useState([]);
    const [skills, setSkills] = useState([]);


    // =========================================================
    // FILTERS
    // =========================================================

    const [filters, setFilters] = useState(
        DEFAULT_FILTERS
    );


    // =========================================================
    // UI STATE
    // =========================================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================================================
    // MODALS
    // =========================================================

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [editingMatch, setEditingMatch] =
        useState(null);

    const [viewingMatch, setViewingMatch] =
        useState(null);


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


            const [
                matchesResponse,
                usersResponse,
                skillsResponse,
            ] = await Promise.all([

                mentorshipMatchApi
                    .getAllMatches(),

                getAllUsers(),

                getAllSkills(),

            ]);


            setMatches(
                Array.isArray(matchesResponse?.data)
                    ? matchesResponse.data
                    : []
            );


            setUsers(
                Array.isArray(usersResponse?.data)
                    ? usersResponse.data
                    : Array.isArray(usersResponse)
                        ? usersResponse
                        : []
            );


            setSkills(
                Array.isArray(skillsResponse?.data)
                    ? skillsResponse.data
                    : Array.isArray(skillsResponse)
                        ? skillsResponse
                        : []
            );


        } catch (err) {

            console.error(
                "Failed to load mentorship matches:",
                err
            );


            setError(
                err.response?.data?.message ||
                "Unable to load mentorship matches."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================================
    // FILTER CHANGE
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


    // =========================================================
    // RESET FILTERS
    // =========================================================

    const handleResetFilters = () => {

        setFilters(
            DEFAULT_FILTERS
        );

    };


    // =========================================================
    // FILTERED MATCHES
    // =========================================================

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

    }, [
        matches,
        filters,
    ]);


    // =========================================================
    // CREATE
    // =========================================================

    const handleCreate = () => {

        setEditingMatch(null);
        setError("");
        setSuccess("");

        setIsModalOpen(true);
    };


    // =========================================================
    // EDIT
    // =========================================================

    const handleEdit = (match) => {

        setEditingMatch(match);
        setError("");
        setSuccess("");

        setIsModalOpen(true);
    };


    // =========================================================
    // CLOSE FORM MODAL
    // =========================================================

    const handleCloseModal = () => {

        if (saving) {
            return;
        }

        setIsModalOpen(false);
        setEditingMatch(null);

    };


    // =========================================================
    // CREATE / UPDATE SUBMIT
    // =========================================================

    const handleSubmit = async (data) => {

        try {

            setSaving(true);
            setError("");
            setSuccess("");


            if (editingMatch) {

                await mentorshipMatchApi
                    .updateMatch(
                        editingMatch.id,
                        data
                    );


                setSuccess(
                    "Mentorship match updated successfully."
                );

            } else {

                await mentorshipMatchApi
                    .createMatch(data);


                setSuccess(
                    "Mentorship match created successfully."
                );
            }


            setIsModalOpen(false);
            setEditingMatch(null);


            await loadMatches();


        } catch (err) {

            console.error(
                "Failed to save mentorship match:",
                err
            );


            setError(
                err.response?.data?.message ||
                "Unable to save mentorship match."
            );

        } finally {

            setSaving(false);

        }
    };


    // =========================================================
    // LOAD MATCHES ONLY
    // =========================================================

    const loadMatches = async () => {

        try {

            const response =
                await mentorshipMatchApi
                    .getAllMatches();


            setMatches(
                Array.isArray(response?.data)
                    ? response.data
                    : []
            );

        } catch (err) {

            console.error(
                "Failed to refresh mentorship matches:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to refresh mentorship matches."
            );

        }
    };


    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async (match) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete the mentorship between ${match.mentorName || "this mentor"} and ${match.menteeName || "this mentee"}?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setSaving(true);
            setError("");
            setSuccess("");


            await mentorshipMatchApi
                .deleteMatch(match.id);


            setSuccess(
                "Mentorship match deleted successfully."
            );


            await loadMatches();


        } catch (err) {

            console.error(
                "Failed to delete mentorship match:",
                err
            );


            setError(
                err.response?.data?.message ||
                "Unable to delete mentorship match."
            );

        } finally {

            setSaving(false);

        }
    };


    // =========================================================
    // VIEW
    // =========================================================

    const handleView = (match) => {

        setViewingMatch(match);

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

                        <Handshake size={22} />

                    </div>


                    <div>

                        <h1 className="
                            text-2xl
                            font-bold
                            text-gray-900
                        ">
                            Mentorship Management
                        </h1>


                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Manage mentor and mentee
                            relationships across the organization.
                        </p>

                    </div>

                </div>


                {/* CREATE */}

                <button
                    type="button"
                    onClick={handleCreate}
                    disabled={saving}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-indigo-600
                        px-4
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

                    <Plus size={18} />

                    Create Mentorship

                </button>

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
                users={users}
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
                        Loading mentorship matches...
                    </p>

                </div>

            ) : (

                <AdminMentorshipMatchTable
                    matches={filteredMatches}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            )}


            {/* =================================================
                CREATE / EDIT MODAL
            ================================================= */}

            <MentorshipMatchModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                editingMatch={editingMatch}
                users={users}
                skills={skills}
                loading={saving}
            />


            {/* =================================================
                DETAILS MODAL
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


export default AdminMentorshipMatch;