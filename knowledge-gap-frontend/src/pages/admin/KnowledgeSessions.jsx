import React, { useEffect, useMemo, useState } from "react";

import KnowledgeSessionFilters from "../../components/knowledgeSession/KnowledgeSessionFilters";
import KnowledgeSessionTable from "../../components/knowledgeSession/KnowledgeSessionTable";
import KnowledgeSessionModal from "../../components/knowledgeSession/KnowledgeSessionModal";

import knowledgeSessionApi from "../../services/knowledgeSessionApi";
import api from "../../services/api";

const DEFAULT_FILTERS = {
    hostId: "",
    skillId: "",
    status: "",
};

const KnowledgeSessions = () => {

    const [sessions, setSessions] = useState([]);
    const [users, setUsers] = useState([]);
    const [skills, setSkills] = useState([]);

    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSession, setEditingSession] = useState(null);

    const [viewingSession, setViewingSession] = useState(null);

    /*
     * ---------------------------------------------------------
     * Load Users
     * ---------------------------------------------------------
     */

    const loadUsers = async () => {

        try {

            /*
             * Change this endpoint only if your existing
             * UserController uses a different URL.
             */
            const response = await api.get("/api/users");

            const data = response.data;

            if (Array.isArray(data)) {
                setUsers(data);
            } else if (Array.isArray(data?.content)) {
                setUsers(data.content);
            } else {
                setUsers([]);
            }

        } catch (err) {

            console.error("Failed to load users:", err);

            setUsers([]);
        }
    };

    /*
     * ---------------------------------------------------------
     * Load Skills
     * ---------------------------------------------------------
     */

    const loadSkills = async () => {

        try {

            /*
             * Change this endpoint only if your existing
             * SkillController uses a different URL.
             */
            const response = await api.get("/api/skills");

            const data = response.data;

            if (Array.isArray(data)) {
                setSkills(data);
            } else if (Array.isArray(data?.content)) {
                setSkills(data.content);
            } else {
                setSkills([]);
            }

        } catch (err) {

            console.error("Failed to load skills:", err);

            setSkills([]);
        }
    };

    /*
     * ---------------------------------------------------------
     * Load All Sessions
     * ---------------------------------------------------------
     */

    const loadSessions = async () => {

        try {

            setLoading(true);
            setError("");

            /*
             * There is no GET /api/knowledge-sessions
             * endpoint in your current backend.
             *
             * Therefore we use the available filters.
             */

            let response;

            if (filters.hostId) {

                response =
                    await knowledgeSessionApi.getSessionsByHost(
                        filters.hostId
                    );

            } else if (filters.skillId) {

                response =
                    await knowledgeSessionApi.getSessionsBySkill(
                        filters.skillId
                    );

            } else if (filters.status) {

                response =
                    await knowledgeSessionApi.getSessionsByStatus(
                        filters.status
                    );

            } else {

                /*
                 * IMPORTANT:
                 * Your current backend does NOT have
                 *
                 * GET /api/knowledge-sessions
                 *
                 * So we cannot directly fetch all sessions.
                 *
                 * We temporarily fetch using SCHEDULED status.
                 *
                 * Later, I recommend adding getAllSessions()
                 * to the backend.
                 */

                response =
                    await knowledgeSessionApi.getSessionsByStatus(
                        "SCHEDULED"
                    );
            }

            const data = response?.data;

            setSessions(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "Failed to load knowledge sessions:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to load knowledge sessions."
            );

            setSessions([]);

        } finally {

            setLoading(false);
        }
    };

    /*
     * ---------------------------------------------------------
     * Initial Loading
     * ---------------------------------------------------------
     */

    useEffect(() => {

        loadUsers();
        loadSkills();

    }, []);

    /*
     * ---------------------------------------------------------
     * Reload Sessions When Filters Change
     * ---------------------------------------------------------
     */

    useEffect(() => {

        loadSessions();

    }, [
        filters.hostId,
        filters.skillId,
        filters.status,
    ]);

    /*
     * ---------------------------------------------------------
     * Filter Change
     * ---------------------------------------------------------
     */

    const handleFilterChange = (name, value) => {

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /*
     * ---------------------------------------------------------
     * Reset Filters
     * ---------------------------------------------------------
     */

    const handleResetFilters = () => {

        setFilters(DEFAULT_FILTERS);
    };

    /*
     * ---------------------------------------------------------
     * Open Create Modal
     * ---------------------------------------------------------
     */

    const handleCreate = () => {

        setEditingSession(null);
        setError("");
        setIsModalOpen(true);
    };

    /*
     * ---------------------------------------------------------
     * Open Edit Modal
     * ---------------------------------------------------------
     */

    const handleEdit = (session) => {

        setEditingSession(session);
        setError("");
        setIsModalOpen(true);
    };

    /*
     * ---------------------------------------------------------
     * Close Modal
     * ---------------------------------------------------------
     */

    const handleCloseModal = () => {

        if (formLoading) {
            return;
        }

        setIsModalOpen(false);
        setEditingSession(null);
    };

    /*
     * ---------------------------------------------------------
     * Create / Update Session
     * ---------------------------------------------------------
     */

    const handleSubmit = async (formData) => {

        try {

            setFormLoading(true);
            setError("");

            if (editingSession) {

                await knowledgeSessionApi.updateSession(
                    editingSession.id,
                    formData
                );

            } else {

                await knowledgeSessionApi.createSession(
                    formData
                );
            }

            setIsModalOpen(false);
            setEditingSession(null);

            await loadSessions();

        } catch (err) {

            console.error(
                "Failed to save knowledge session:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to save knowledge session."
            );

        } finally {

            setFormLoading(false);
        }
    };

    /*
     * ---------------------------------------------------------
     * Delete Session
     * ---------------------------------------------------------
     */

    const handleDelete = async (session) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${session.title}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            await knowledgeSessionApi.deleteSession(
                session.id
            );

            await loadSessions();

        } catch (err) {

            console.error(
                "Failed to delete knowledge session:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to delete knowledge session."
            );

            setLoading(false);
        }
    };

    /*
     * ---------------------------------------------------------
     * View Session
     * ---------------------------------------------------------
     */

    const handleView = (session) => {

        setViewingSession(session);
    };

    /*
     * ---------------------------------------------------------
     * Close View
     * ---------------------------------------------------------
     */

    const handleCloseView = () => {

        setViewingSession(null);
    };

    /*
     * ---------------------------------------------------------
     * Statistics
     * ---------------------------------------------------------
     */

    const statistics = useMemo(() => {

        const scheduled = sessions.filter(
            (session) =>
                session.status === "SCHEDULED"
        ).length;

        const ongoing = sessions.filter(
            (session) =>
                session.status === "ONGOING"
        ).length;

        const completed = sessions.filter(
            (session) =>
                session.status === "COMPLETED"
        ).length;

        const cancelled = sessions.filter(
            (session) =>
                session.status === "CANCELLED"
        ).length;

        return {
            total: sessions.length,
            scheduled,
            ongoing,
            completed,
            cancelled,
        };

    }, [sessions]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-7xl">

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            Knowledge Sessions
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage knowledge-sharing sessions and learning events.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={handleCreate}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        + Create Session
                    </button>

                </div>

                {/* ================================================= */}
                {/* ERROR */}
                {/* ================================================= */}

                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                        <div className="flex items-center justify-between gap-4">

                            <span>
                                {error}
                            </span>

                            <button
                                type="button"
                                onClick={() => setError("")}
                                className="font-semibold text-red-500 hover:text-red-700"
                            >
                                ×
                            </button>

                        </div>

                    </div>
                )}

                {/* ================================================= */}
                {/* STATISTICS */}
                {/* ================================================= */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                    {/* Total */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                        <p className="text-sm font-medium text-gray-500">
                            Total
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-800">
                            {statistics.total}
                        </p>

                    </div>

                    {/* Scheduled */}
                    <div className="rounded-xl border border-yellow-200 bg-white p-5 shadow-sm">

                        <p className="text-sm font-medium text-yellow-600">
                            Scheduled
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-800">
                            {statistics.scheduled}
                        </p>

                    </div>

                    {/* Ongoing */}
                    <div className="rounded-xl border border-green-200 bg-white p-5 shadow-sm">

                        <p className="text-sm font-medium text-green-600">
                            Ongoing
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-800">
                            {statistics.ongoing}
                        </p>

                    </div>

                    {/* Completed */}
                    <div className="rounded-xl border border-blue-200 bg-white p-5 shadow-sm">

                        <p className="text-sm font-medium text-blue-600">
                            Completed
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-800">
                            {statistics.completed}
                        </p>

                    </div>

                    {/* Cancelled */}
                    <div className="rounded-xl border border-red-200 bg-white p-5 shadow-sm">

                        <p className="text-sm font-medium text-red-600">
                            Cancelled
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-800">
                            {statistics.cancelled}
                        </p>

                    </div>

                </div>

                {/* ================================================= */}
                {/* FILTERS */}
                {/* ================================================= */}

                <div className="mb-6">

                    <KnowledgeSessionFilters
                        filters={filters}
                        onChange={handleFilterChange}
                        onReset={handleResetFilters}
                        users={users}
                        skills={skills}
                    />

                </div>

                {/* ================================================= */}
                {/* LOADING */}
                {/* ================================================= */}

                {loading ? (

                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">

                        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                        <p className="text-sm text-gray-500">
                            Loading knowledge sessions...
                        </p>

                    </div>

                ) : (

                    /* ================================================= */
                    /* TABLE */
                    /* ================================================= */

                    <KnowledgeSessionTable
                        sessions={sessions}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />

                )}

            </div>

            {/* ===================================================== */}
            {/* CREATE / UPDATE MODAL */}
            {/* ===================================================== */}

            <KnowledgeSessionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                editingSession={editingSession}
                users={users}
                skills={skills}
                loading={formLoading}
            />

            {/* ===================================================== */}
            {/* VIEW MODAL */}
            {/* ===================================================== */}

            {viewingSession && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-5">

                            <div>

                                <h2 className="text-xl font-semibold text-gray-800">
                                    Session Details
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Knowledge session information
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={handleCloseView}
                                className="text-2xl text-gray-400 hover:text-gray-700"
                            >
                                ×
                            </button>

                        </div>

                        {/* Details */}
                        <div className="space-y-5 px-6 py-6">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Session Title
                                </p>

                                <p className="mt-1 text-base font-semibold text-gray-800">
                                    {viewingSession.title}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Host
                                </p>

                                <p className="mt-1 text-sm text-gray-700">
                                    {viewingSession.hostName || "Unknown"}
                                </p>

                                <p className="text-xs text-gray-400">
                                    ID: {viewingSession.hostId}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Topic Skill
                                </p>

                                <p className="mt-1 text-sm text-gray-700">
                                    {viewingSession.skillName || "Unknown"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Scheduled At
                                </p>

                                <p className="mt-1 text-sm text-gray-700">
                                    {viewingSession.scheduledAt
                                        ? new Date(
                                            viewingSession.scheduledAt
                                        ).toLocaleString()
                                        : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Status
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-700">
                                    {viewingSession.status}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Meeting Link
                                </p>

                                {viewingSession.locationLink ? (

                                    <a
                                        href={viewingSession.locationLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-1 inline-block break-all text-sm text-blue-600 hover:underline"
                                    >
                                        {viewingSession.locationLink}
                                    </a>

                                ) : (

                                    <p className="mt-1 text-sm text-gray-500">
                                        No meeting link provided.
                                    </p>

                                )}

                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Created At
                                </p>

                                <p className="mt-1 text-sm text-gray-700">
                                    {viewingSession.createdAt
                                        ? new Date(
                                            viewingSession.createdAt
                                        ).toLocaleString()
                                        : "-"}
                                </p>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex justify-end border-t px-6 py-4">

                            <button
                                type="button"
                                onClick={handleCloseView}
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default KnowledgeSessions;