import React, { useEffect, useMemo, useState } from "react";

import MentorshipMatchFilters from "../../components/mentorship/MentorshipMatchFilters";
import MentorshipMatchTable from "../../components/mentorship/MentorshipMatchTable";
import MentorshipMatchModal from "../../components/mentorship/MentorshipMatchModal";

import mentorshipMatchApi from "../../services/mentorshipMatchApi";

const DEFAULT_FILTERS = {
    mentorId: "",
    menteeId: "",
    skillId: "",
    status: "",
};

const MentorshipMatches = () => {
    const [matches, setMatches] = useState([]);
    const [users, setUsers] = useState([]);
    const [skills, setSkills] = useState([]);

    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMatch, setEditingMatch] = useState(null);

    const [error, setError] = useState("");

    // =========================================================
    // LOAD USERS AND SKILLS
    // =========================================================

    useEffect(() => {
        loadUsers();
        loadSkills();
        loadMatches();
    }, []);

    const loadUsers = async () => {
        try {
            /*
             * Change this endpoint only if your existing
             * User API uses a different URL.
             */
            const response = await fetch(
                "http://localhost:8080/api/users"
            );

            if (!response.ok) {
                throw new Error("Failed to load users");
            }

            const data = await response.json();

            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error loading users:", err);

            /*
             * Keep page working even if users API is unavailable.
             */
            setUsers([]);
        }
    };

    const loadSkills = async () => {
        try {
            /*
             * Change this endpoint only if your existing
             * Skill API uses a different URL.
             */
            const response = await fetch(
                "http://localhost:8080/api/skills"
            );

            if (!response.ok) {
                throw new Error("Failed to load skills");
            }

            const data = await response.json();

            setSkills(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error loading skills:", err);

            setSkills([]);
        }
    };

    // =========================================================
    // LOAD MATCHES
    // =========================================================

    const loadMatches = async () => {
        setPageLoading(true);
        setError("");

        try {
            /*
             * Backend does not have GET /api/mentorship-matches.
             *
             * So initially we load matches through the status
             * endpoint using PENDING.
             *
             * Later filters can load the appropriate endpoint.
             */
            const response =
                await mentorshipMatchApi.getMatchesByStatus("PENDING");

            const data = response?.data;

            setMatches(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error loading mentorship matches:", err);

            setMatches([]);

            setError(
                err?.response?.data?.message ||
                "Unable to load mentorship matches."
            );
        } finally {
            setPageLoading(false);
        }
    };

    // =========================================================
    // FILTER CHANGE
    // =========================================================

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================================================
    // RESET FILTERS
    // =========================================================

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS);
        loadMatches();
    };

    // =========================================================
    // APPLY FILTERS
    // =========================================================

    const applyFilters = async () => {
        setPageLoading(true);
        setError("");

        try {
            let response;

            if (filters.mentorId) {
                response =
                    await mentorshipMatchApi.getMatchesByMentor(
                        filters.mentorId
                    );
            } else if (filters.menteeId) {
                response =
                    await mentorshipMatchApi.getMatchesByMentee(
                        filters.menteeId
                    );
            } else if (filters.skillId) {
                response =
                    await mentorshipMatchApi.getMatchesBySkill(
                        filters.skillId
                    );
            } else if (filters.status) {
                response =
                    await mentorshipMatchApi.getMatchesByStatus(
                        filters.status
                    );
            } else {
                await loadMatches();
                return;
            }

            const data = response?.data;

            setMatches(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error applying filters:", err);

            setMatches([]);

            setError(
                err?.response?.data?.message ||
                "Unable to apply filters."
            );
        } finally {
            setPageLoading(false);
        }
    };

    // =========================================================
    // CREATE
    // =========================================================

    const handleCreate = () => {
        setEditingMatch(null);
        setIsModalOpen(true);
        setError("");
    };

    // =========================================================
    // EDIT
    // =========================================================

    const handleEdit = (match) => {
        setEditingMatch(match);
        setIsModalOpen(true);
        setError("");
    };

    // =========================================================
    // CLOSE MODAL
    // =========================================================

    const handleCloseModal = () => {
        if (loading) {
            return;
        }

        setIsModalOpen(false);
        setEditingMatch(null);
    };

    // =========================================================
    // CREATE / UPDATE SUBMIT
    // =========================================================

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError("");

        try {
            if (editingMatch) {
                await mentorshipMatchApi.updateMatch(
                    editingMatch.id,
                    formData
                );
            } else {
                await mentorshipMatchApi.createMatch(formData);
            }

            setIsModalOpen(false);
            setEditingMatch(null);

            await loadMatches();
        } catch (err) {
            console.error("Error saving mentorship match:", err);

            setError(
                err?.response?.data?.message ||
                err?.response?.data ||
                "Unable to save mentorship match."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = async (match) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the mentorship match between ${match?.mentorName || "mentor"} and ${match?.menteeName || "mentee"}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setPageLoading(true);
            setError("");

            await mentorshipMatchApi.deleteMatch(match.id);

            await loadMatches();
        } catch (err) {
            console.error("Error deleting mentorship match:", err);

            setError(
                err?.response?.data?.message ||
                "Unable to delete mentorship match."
            );
        } finally {
            setPageLoading(false);
        }
    };

    // =========================================================
    // VIEW
    // =========================================================

    const handleView = (match) => {
        if (!match) {
            return;
        }

        const details = `
Mentorship Match

ID: ${match.id}
Mentor: ${match.mentorName || "-"}
Mentee: ${match.menteeName || "-"}
Skill: ${match.skillName || "-"}
Status: ${match.status || "-"}
Matched At: ${
            match.matchedAt
                ? new Date(match.matchedAt).toLocaleString()
                : "-"
        }
        `;

        window.alert(details);
    };

    // =========================================================
    // FILTERED MATCHES
    // =========================================================

    const displayedMatches = useMemo(() => {
        if (!Array.isArray(matches)) {
            return [];
        }

        return matches.filter((match) => {
            if (
                filters.mentorId &&
                String(match.mentorId) !== String(filters.mentorId)
            ) {
                return false;
            }

            if (
                filters.menteeId &&
                String(match.menteeId) !== String(filters.menteeId)
            ) {
                return false;
            }

            if (
                filters.skillId &&
                String(match.skillId) !== String(filters.skillId)
            ) {
                return false;
            }

            if (
                filters.status &&
                match.status !== filters.status
            ) {
                return false;
            }

            return true;
        });
    }, [matches, filters]);

    // =========================================================
    // UI
    // =========================================================

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Mentorship Matches
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage mentor and mentee relationships based on skills.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    + Create Match
                </button>

            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {typeof error === "string"
                        ? error
                        : "Something went wrong."}
                </div>
            )}

            {/* Filters */}
            <div className="mb-6">

                <MentorshipMatchFilters
                    filters={filters}
                    onChange={handleFilterChange}
                    onReset={handleResetFilters}
                    users={Array.isArray(users) ? users : []}
                    skills={Array.isArray(skills) ? skills : []}
                />

                <div className="mt-3 flex justify-end">
                    <button
                        type="button"
                        onClick={applyFilters}
                        disabled={pageLoading}
                        className="rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Apply Filters
                    </button>
                </div>

            </div>

            {/* Count */}
            <div className="mb-4 flex items-center justify-between">

                <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-800">
                        {displayedMatches.length}
                    </span>{" "}
                    mentorship match
                    {displayedMatches.length !== 1 ? "es" : ""}
                </p>

            </div>

            {/* Loading */}
            {pageLoading ? (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">

                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                    <p className="text-sm text-gray-500">
                        Loading mentorship matches...
                    </p>

                </div>
            ) : (
                <MentorshipMatchTable
                    matches={displayedMatches}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />
            )}

            {/* Modal */}
            <MentorshipMatchModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                editingMatch={editingMatch}
                users={Array.isArray(users) ? users : []}
                skills={Array.isArray(skills) ? skills : []}
                loading={loading}
            />

        </div>
    );
};

export default MentorshipMatches;