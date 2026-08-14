import React, { useEffect, useMemo, useState } from "react";
import {
    BookOpen,
    Plus,
    RefreshCw,
    Search,
    Loader2,
    CalendarDays,
    PlayCircle,
    CheckCircle,
} from "lucide-react";

import knowledgeSessionApi from "../../services/knowledgeSessionApi";
import { getAllSkills } from "../../services/skillService";

import KnowledgeSessionFilters
    from "../../components/knowledgeSession/KnowledgeSessionFilters";

import KnowledgeSessionTable
    from "../../components/knowledgeSession/KnowledgeSessionTable";

import KnowledgeSessionModal
    from "../../components/knowledgeSession/KnowledgeSessionModal";

import KnowledgeSessionDetailsModal
    from "../../components/knowledgeSession/KnowledgeSessionDetailsModal";

import DeleteKnowledgeSessionModal
    from "../../components/knowledgeSession/DeleteKnowledgeSessionModal";


const DEFAULT_FILTERS = {
    hostSearch: "",
    skillId: "",
    date: "",
    status: "",
};


const KnowledgeSessions = () => {

    const [sessions, setSessions] = useState([]);

    const [skills, setSkills] = useState([]);

    const [filters, setFilters] =
        useState(DEFAULT_FILTERS);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [editingSession, setEditingSession] =
        useState(null);

    const [viewingSession, setViewingSession] =
        useState(null);

    const [deletingSession, setDeletingSession] =
        useState(null);

    const [currentUserId, setCurrentUserId] = useState(null);

        


    /*
     * Load all sessions and skills.
     */

    useEffect(() => {
        loadInitialData();
    }, []);


    const loadInitialData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                sessionsResponse,
                skillsData,
            ] = await Promise.all([
                knowledgeSessionApi.getAllSessions(),
                getAllSkills(),
            ]);

            setSessions(
                Array.isArray(sessionsResponse.data)
                    ? sessionsResponse.data
                    : []
            );

            setSkills(
                Array.isArray(skillsData)
                    ? skillsData
                    : []
            );

        } catch (err) {

            console.error(
                "Failed to load knowledge sessions:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load knowledge sessions."
            );

        } finally {

            setLoading(false);

        }
    };

useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
        setCurrentUserId(Number(userId));
    }
}, []);
    /*
     * Refresh.
     */

    const handleRefresh = async () => {

        setSuccess("");

        await loadInitialData();

    };


    /*
     * Create.
     */

    const handleCreate = () => {

        setSuccess("");

        setEditingSession(null);

        setIsModalOpen(true);

    };


    /*
     * Edit.
     */

    const handleEdit = (session) => {

        setSuccess("");

        setEditingSession(session);

        setIsModalOpen(true);

    };


    /*
     * Create / Update.
     */

    const handleSubmit = async (data) => {

        try {

            setSaving(true);
            setError("");
            setSuccess("");


            if (editingSession) {

                await knowledgeSessionApi.updateSession(
                    editingSession.id,
                    data
                );

                setSuccess(
                    "Knowledge session updated successfully."
                );

            } else {

                await knowledgeSessionApi.createSession(
                    data
                );

                setSuccess(
                    "Knowledge session created successfully."
                );

            }


            setIsModalOpen(false);

            setEditingSession(null);

            await loadInitialData();

        } catch (err) {

            console.error(
                "Failed to save knowledge session:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to save knowledge session."
            );

        } finally {

            setSaving(false);

        }
    };


    /*
     * Delete.
     */

    const handleDelete = (session) => {

        setDeletingSession(session);

    };


    const confirmDelete = async () => {

        if (!deletingSession) {
            return;
        }


        try {

            setSaving(true);
            setError("");
            setSuccess("");


            await knowledgeSessionApi.deleteSession(
                deletingSession.id
            );


            setSuccess(
                "Knowledge session deleted successfully."
            );


            setSessions((current) =>
                current.filter(
                    (item) =>
                        item.id !== deletingSession.id
                )
            );


            setDeletingSession(null);

        } catch (err) {

            console.error(
                "Failed to delete knowledge session:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to delete knowledge session."
            );

        } finally {

            setSaving(false);

        }
    };


    /*
     * View.
     */

    const handleView = (session) => {

        setViewingSession(session);

    };


    /*
     * Filter change.
     */

    const handleFilterChange = (
        name,
        value
    ) => {

        setFilters((current) => ({
            ...current,
            [name]: value,
        }));

    };


    /*
     * Reset filters.
     */

    const handleResetFilters = () => {

        setFilters(DEFAULT_FILTERS);

        setSearch("");

    };


    /*
     * Client-side filtering.
     */

    const filteredSessions = useMemo(() => {

        const query =
            search.trim().toLowerCase();


        return sessions.filter((session) => {

            /*
             * Host search
             */

            if (filters.hostSearch) {

                const hostQuery =
                    filters.hostSearch
                        .trim()
                        .toLowerCase();

                const hostName =
                    session.hostName
                        ?.toLowerCase() || "";

                if (!hostName.includes(hostQuery)) {
                    return false;
                }
            }


            /*
             * Skill filter
             */

            if (filters.skillId) {

                const sessionSkillId =
                    session.topicSkillId ??
                    session.skillId;

                if (
                    String(sessionSkillId) !==
                    String(filters.skillId)
                ) {
                    return false;
                }
            }


            /*
             * Date filter
             */

            if (filters.date) {

                if (!session.scheduledAt) {
                    return false;
                }

                const sessionDate =
                    new Date(
                        session.scheduledAt
                    )
                        .toISOString()
                        .split("T")[0];

                if (
                    sessionDate !==
                    filters.date
                ) {
                    return false;
                }
            }


            /*
             * Status filter
             */

            if (
                filters.status &&
                session.status !== filters.status
            ) {
                return false;
            }


            /*
             * General search
             */

            if (query) {

                const searchableText = [
                    session.title,
                    session.hostName,
                    session.skillName,
                    session.status,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                if (
                    !searchableText.includes(query)
                ) {
                    return false;
                }
            }


            return true;

        });

    }, [
        sessions,
        filters,
        search,
    ]);


    /*
     * Statistics.
     */

    const statistics = useMemo(() => {

        return {

            total: sessions.length,

            scheduled: sessions.filter(
                (session) =>
                    session.status ===
                    "SCHEDULED"
            ).length,

            ongoing: sessions.filter(
                (session) =>
                    session.status ===
                    "ONGOING"
            ).length,

            completed: sessions.filter(
                (session) =>
                    session.status ===
                    "COMPLETED"
            ).length,

        };

    }, [sessions]);


    return (

        <div className="space-y-6">


            {/* Page Header */}

            <div className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            ">

                <div>

                    <div className="flex items-center gap-3">

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
                            <BookOpen size={22} />
                        </div>


                        <div>

                            <h1 className="
                                text-2xl
                                font-bold
                                text-gray-900
                            ">
                                Knowledge Sessions
                            </h1>


                            <p className="
                                mt-1
                                text-sm
                                text-gray-500
                            ">
                                Learn from your colleagues
                                and share your knowledge.
                            </p>

                        </div>

                    </div>

                </div>


                <div className="
                    flex
                    items-center
                    gap-2
                ">

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={loading}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-gray-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-gray-700
                            shadow-sm
                            transition
                            hover:bg-gray-50
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


                    <button
                        type="button"
                        onClick={handleCreate}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-indigo-700
                        "
                    >

                        <Plus size={17} />

                        Create Session

                    </button>

                </div>

            </div>


            {/* Statistics */}

            <div className="
                grid
                grid-cols-2
                gap-4
                lg:grid-cols-4
            ">

                <StatCard
                    label="Total Sessions"
                    value={statistics.total}
                    icon={BookOpen}
                    iconClass="bg-indigo-50 text-indigo-600"
                />


                <StatCard
                    label="Scheduled"
                    value={statistics.scheduled}
                    icon={CalendarDays}
                    iconClass="bg-yellow-50 text-yellow-600"
                />


                <StatCard
                    label="Ongoing"
                    value={statistics.ongoing}
                    icon={PlayCircle}
                    iconClass="bg-green-50 text-green-600"
                />


                <StatCard
                    label="Completed"
                    value={statistics.completed}
                    icon={CheckCircle}
                    iconClass="bg-blue-50 text-blue-600"
                />

            </div>


            {/* Success */}

            {success && (

                <div className="
                    rounded-xl
                    border
                    border-green-200
                    bg-green-50
                    px-4
                    py-3
                    text-sm
                    text-green-700
                ">
                    {success}
                </div>

            )}


            {/* Error */}

            {error && (

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700
                ">

                    <span>
                        {error}
                    </span>


                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="
                            text-xs
                            font-semibold
                            underline
                        "
                    >
                        Dismiss
                    </button>

                </div>

            )}


            {/* Filters */}

            <KnowledgeSessionFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                skills={skills}
            />


            {/* General Search */}

            <div className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
            ">

                <div className="relative">

                    <Search
                        size={18}
                        className="
                            absolute
                            left-3.5
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
                    />


                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="
                            Search sessions by title,
                            host, skill or status...
                        "
                        className="
                            w-full
                            rounded-lg
                            border
                            border-gray-200
                            py-3
                            pl-11
                            pr-4
                            text-sm
                            outline-none
                            transition
                            focus:border-indigo-400
                            focus:ring-2
                            focus:ring-indigo-100
                        "
                    />

                </div>

            </div>


            {/* Results */}

            {loading ? (

                <div className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-20
                ">

                    <Loader2
                        size={32}
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
                        Loading knowledge sessions...
                    </p>

                </div>

            ) : (

                <KnowledgeSessionTable
                    sessions={filteredSessions}
                     currentUserId={currentUserId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />

            )}


            {/* Create / Update Modal */}

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


            {/* View */}

            {viewingSession && (

                <KnowledgeSessionDetailsModal
                    session={viewingSession}
                    onClose={() =>
                        setViewingSession(null)
                    }
                />

            )}


            {/* Delete */}

            {deletingSession && (

                <DeleteKnowledgeSessionModal
                    session={deletingSession}
                    onClose={() =>
                        setDeletingSession(null)
                    }
                    onConfirm={confirmDelete}
                    loading={saving}
                />

            )}

        </div>
    );
};


/*
 * Statistics card.
 */

const StatCard = ({
    label,
    value,
    icon: Icon,
    iconClass,
}) => {

    return (

        <div className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-4
            shadow-sm
        ">

            <div className="
                flex
                items-center
                justify-between
                gap-3
            ">

                <div>

                    <p className="
                        text-xs
                        font-medium
                        text-gray-500
                    ">
                        {label}
                    </p>


                    <p className="
                        mt-1
                        text-2xl
                        font-bold
                        text-gray-900
                    ">
                        {value}
                    </p>

                </div>


                <div className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    ${iconClass}
                `}>

                    <Icon size={18} />

                </div>

            </div>

        </div>

    );
};


export default KnowledgeSessions;