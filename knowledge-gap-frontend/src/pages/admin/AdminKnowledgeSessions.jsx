import React, { useEffect, useState } from "react";
import {
    CalendarDays,
    RefreshCw,
} from "lucide-react";

import knowledgeSessionApi from "../../services/knowledgeSessionApi";
import { getAllSkills } from "../../services/skillService";

import KnowledgeSessionFilters from "../../components/knowledgeSession/KnowledgeSessionFilters";
import KnowledgeSessionModal from "../../components/knowledgeSession/KnowledgeSessionModal";
import AdminKnowledgeSessionTable from "../../components/knowledgeSession/AdminKnowledgeSessionTable";
import AdminKnowledgeSessionViewModal
    from "../../components/knowledgeSession/AdminKnowledgeSessionViewModal";
const AdminKnowledgeSessions = () => {

    const [sessions, setSessions] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]);

    const [skills, setSkills] = useState([]);
    const [users, setUsers] = useState([]);

    const [filters, setFilters] = useState({
        hostId: "",
        skillId: "",
        date: "",
        status: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSession, setEditingSession] = useState(null);
    const [saving, setSaving] = useState(false);
    const [viewingSession, setViewingSession] = useState(null);


    /* =========================
       Load sessions
       ========================= */

    const loadSessions = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await knowledgeSessionApi.getAllSessions();

            const data = Array.isArray(response.data)
                ? response.data
                : [];

            setSessions(data);

        } catch (error) {

            console.error(
                "Failed to load knowledge sessions:",
                error
            );

            setError(
                "Failed to load knowledge sessions."
            );

        } finally {

            setLoading(false);

        }
    };


    /* =========================
       Load skills
       ========================= */

    const loadSkills = async () => {

        try {

            const data = await getAllSkills();

            setSkills(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load skills:",
                error
            );

        }
    };


    /* =========================
       Load users
       ========================= */

    const loadUsers = async () => {

        /*
         * Use your existing users API here.
         *
         * Replace this with the service you already
         * use for fetching users in the admin dashboard.
         */

        try {

            // Example:
            // const response = await getAllUsers();
            // setUsers(response.data);

        } catch (error) {

            console.error(
                "Failed to load users:",
                error
            );

        }
    };


    useEffect(() => {

        loadSessions();
        loadSkills();
        loadUsers();

    }, []);


    /* =========================
       Apply filters
       ========================= */

    useEffect(() => {

        let result = [...sessions];


        // Host filter

        if (filters.hostId) {

            result = result.filter(
                (session) =>
                    String(session.hostId) ===
                    String(filters.hostId)
            );

        }


        // Skill filter

        if (filters.skillId) {

            result = result.filter(
                (session) =>
                    String(session.topicSkillId) ===
                    String(filters.skillId)
            );

        }


        // Status filter

        if (filters.status) {

            result = result.filter(
                (session) =>
                    session.status ===
                    filters.status
            );

        }


        // Date filter

        if (filters.date) {

            result = result.filter(
                (session) => {

                    if (!session.scheduledAt) {
                        return false;
                    }

                    const sessionDate =
                        new Date(
                            session.scheduledAt
                        )
                            .toISOString()
                            .split("T")[0];

                    return (
                        sessionDate ===
                        filters.date
                    );
                }
            );

        }


        setFilteredSessions(result);

    }, [sessions, filters]);

    const handleView = (session) => {
    setViewingSession(session);
};

    /* =========================
       Filter change
       ========================= */

    const handleFilterChange = (
        name,
        value
    ) => {

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    /* =========================
       Reset filters
       ========================= */

    const handleResetFilters = () => {

        setFilters({
            hostId: "",
            skillId: "",
            date: "",
            status: "",
        });

    };


    /* =========================
       View
       ========================= */



    /* =========================
       Edit
       ========================= */

    const handleEdit = (session) => {

        setEditingSession(session);
        setIsModalOpen(true);

    };


    /* =========================
       Save / Update
       ========================= */

    const handleSubmit = async (data) => {

        try {

            setSaving(true);

            if (editingSession) {

                await knowledgeSessionApi.updateSession(
                    editingSession.id,
                    data
                );

            }

            setIsModalOpen(false);
            setEditingSession(null);

            await loadSessions();

        } catch (error) {

            console.error(
                "Failed to update session:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Failed to update knowledge session."
            );

        } finally {

            setSaving(false);

        }
    };


    /* =========================
       Delete
       ========================= */

    const handleDelete = async (session) => {

        const confirmed =
            window.confirm(
                `Are you sure you want to delete "${session.title}"?`
            );

        if (!confirmed) {
            return;
        }


        try {

            await knowledgeSessionApi.deleteSession(
                session.id
            );

            await loadSessions();

        } catch (error) {

            console.error(
                "Failed to delete session:",
                error
            );

            alert(
                error?.response?.data?.message ||
                "Failed to delete knowledge session."
            );

        }
    };


    return (

        <div className="
            space-y-6
            p-6
        ">

            {/* Header */}

            <div className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                <div>

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
                            bg-indigo-100
                            text-indigo-600
                        ">
                            <CalendarDays size={23} />
                        </div>

                        <div>

                            <h1 className="
                                text-2xl
                                font-bold
                                text-gray-800
                            ">
                                Knowledge Sessions
                            </h1>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-500
                            ">
                                Monitor and manage
                                organization knowledge sessions.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Refresh */}

                <button
                    type="button"
                    onClick={loadSessions}
                    disabled={loading}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

                    <RefreshCw
                        size={16}
                        className={
                            loading
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh

                </button>

            </div>


            {/* Error */}

            {error && (

                <div className="
                    rounded-lg
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700
                ">
                    {error}
                </div>

            )}


            {/* Filters */}

            <KnowledgeSessionFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                users={users}
                skills={skills}
            />


            {/* Count */}

            <div className="
                flex
                items-center
                justify-between
            ">

                <p className="
                    text-sm
                    text-gray-500
                ">

                    Showing{" "}
                    <span className="
                        font-semibold
                        text-gray-800
                    ">
                        {filteredSessions.length}
                    </span>{" "}
                    session
                    {filteredSessions.length !== 1
                        ? "s"
                        : ""}

                </p>

            </div>


            {/* Table */}

            {loading ? (

                <div className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-12
                    text-center
                    shadow-sm
                ">

                    <RefreshCw
                        size={28}
                        className="
                            mx-auto
                            animate-spin
                            text-indigo-500
                        "
                    />

                    <p className="
                        mt-3
                        text-sm
                        text-gray-500
                    ">
                        Loading knowledge sessions...
                    </p>

                </div>

            ) : (

                <AdminKnowledgeSessionTable
    sessions={filteredSessions}
    onView={handleView}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>

            )}


            {/* Edit Modal */}

            <KnowledgeSessionModal
                isOpen={isModalOpen}
                onClose={() => {

                    if (!saving) {

                        setIsModalOpen(false);
                        setEditingSession(null);

                    }

                }}
                onSubmit={handleSubmit}
                editingSession={editingSession}
                skills={skills}
                loading={saving}
            />
            <AdminKnowledgeSessionViewModal
    isOpen={Boolean(viewingSession)}
    session={viewingSession}
    onClose={() => setViewingSession(null)}
/>

        </div>

    );
};

export default AdminKnowledgeSessions;