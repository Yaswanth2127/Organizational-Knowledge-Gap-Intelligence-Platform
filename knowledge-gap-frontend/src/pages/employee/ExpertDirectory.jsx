import React, { useEffect, useMemo, useState } from "react";
import {
    Award,
    Loader2,
    Plus,
    Trash2,
    Pencil,
    Users,
} from "lucide-react";

import expertDirectoryApi from "../../services/expertDirectoryApi";
import { getAllSkills } from "../../services/skillService";

import ExpertCard from "../../components/expert/ExpertCard";
import ExpertSearch from "../../components/expert/ExpertSearch";
import ExpertFilters from "../../components/expert/ExpertFilters";
import ExpertDetailsModal from "../../components/expert/ExpertDetailsModal";
import ExpertFormModal from "../../components/expert/ExpertFormModal";
import EmptyExperts from "../../components/expert/EmptyExperts";
import SkillSearchSelect from "../../components/knowledge/SkillSearchSelect";
import DeleteExpertModal from "../../components/expert/DeleteExpertModal";

const ExpertDirectory = () => {
    const [activeTab, setActiveTab] = useState("my");

    const [experts, setExperts] = useState([]);
    const [myExperts, setMyExperts] = useState([]);
    const [skills, setSkills] = useState([]);

    const [search, setSearch] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("");
    const [level, setLevel] = useState("ALL");

    const [selectedExpert, setSelectedExpert] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [editingExpert, setEditingExpert] = useState(null);

    const [loading, setLoading] = useState(true);
    const [skillsLoading, setSkillsLoading] = useState(true);
    const [error, setError] = useState("");

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [expertToDelete, setExpertToDelete] = useState(null);

    const loadExperts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await expertDirectoryApi.getAllExperts();
            setExperts(response.data || []);
        } catch (err) {
            console.error("Failed to load experts:", err);
            setError(
                err.response?.data?.message ||
                "Failed to load expert directory."
            );
        } finally {
            setLoading(false);
        }
    };

    const loadMyExpertise = async () => {
        try {
            const response = await expertDirectoryApi.getMyExpertise();
            setMyExperts(response.data || []);
        } catch (err) {
            console.error("Failed to load my expertise:", err);
        }
    };

    const loadSkills = async () => {
        try {
            setSkillsLoading(true);
            const data = await getAllSkills();
            setSkills(data || []);
        } catch (err) {
            console.error("Failed to load skills:", err);
        } finally {
            setSkillsLoading(false);
        }
    };

    useEffect(() => {
        loadExperts();
        loadMyExpertise();
        loadSkills();
    }, []);

    const filteredExperts = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return experts.filter((expert) => {
            const matchesSearch =
                !keyword ||
                expert.employeeName?.toLowerCase().includes(keyword) ||
                expert.employeeEmail?.toLowerCase().includes(keyword) ||
                expert.skillName?.toLowerCase().includes(keyword);

            const matchesSkill =
                !selectedSkill ||
                String(expert.skillId) === String(selectedSkill);

            const matchesLevel =
                level === "ALL" ||
                expert.expertiseLevel === level;

            return matchesSearch && matchesSkill && matchesLevel;
        });
    }, [experts, search, selectedSkill, level]);

    const clearFilters = () => {
        setSearch("");
        setSelectedSkill("");
        setLevel("ALL");
    };

    const hasFilters =
        search.trim() !== "" ||
        selectedSkill !== "" ||
        level !== "ALL";

    const handleViewExpert = (expert) => {
        setSelectedExpert(expert);
        setDetailsOpen(true);
    };

    const closeDetails = () => {
        setSelectedExpert(null);
        setDetailsOpen(false);
    };

    const handleAddExpert = () => {
        setEditingExpert(null);
        setFormOpen(true);
    };

    const handleEditExpert = (expert) => {
        setEditingExpert(expert);
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setEditingExpert(null);
    };

    const handleFormSuccess = async () => {
        await Promise.all([
            loadExperts(),
            loadMyExpertise(),
        ]);
    };

    const handleDeleteExpert = (expert) => {
        setExpertToDelete(expert);
        setDeleteModalOpen(true);
    };
    const confirmDeleteExpert = async (expert) => {
        try {
            setError("");

            await expertDirectoryApi.deleteExpert(expert.id);

            await Promise.all([
                loadExperts(),
                loadMyExpertise(),
            ]);

            setDeleteModalOpen(false);
            setExpertToDelete(null);

        } catch (err) {
            console.error("Failed to delete expert:", err);

            setError(
                err.response?.data?.message ||
                "Failed to delete expertise."
            );

            throw err;
        }
    };

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2
                    size={36}
                    className="animate-spin text-indigo-600"
                />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-5">

            {/* Header */}
            <div className="flex flex-col sm:flex-row
                            sm:items-center sm:justify-between gap-4">

                <div className="flex items-center gap-4">

                    <div className="p-3 bg-indigo-100 rounded-xl">
                        <Users
                            size={28}
                            className="text-indigo-600"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Expertise
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage your expertise and discover employees
                            with valuable skills.
                        </p>
                    </div>

                </div>

                {activeTab === "my" && (
                    <button
                        type="button"
                        onClick={handleAddExpert}
                        className="inline-flex items-center justify-center
                                   gap-2 px-4 py-2.5 rounded-lg
                                   bg-indigo-600 text-white text-sm font-medium
                                   hover:bg-indigo-700"
                    >
                        <Plus size={17} />
                        Add Expertise
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex gap-6">
                    <button
                        type="button"
                        onClick={() => setActiveTab("my")}
                        className={`pb-3 px-1 text-sm font-semibold border-b-2
                            ${activeTab === "my"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        My Expertise
                        <span className="ml-2 text-xs">
                            ({myExperts.length})
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("directory")}
                        className={`pb-3 px-1 text-sm font-semibold border-b-2
                            ${activeTab === "directory"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Expert Directory
                        <span className="ml-2 text-xs">
                            ({experts.length})
                        </span>
                    </button>
                </div>
            </div>

            {error && (
                <div className="px-4 py-3 rounded-lg
                                bg-red-50 border border-red-200
                                text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* My Expertise */}
            {activeTab === "my" && (
                <section className="space-y-4">

                    {myExperts.length === 0 ? (
                        <div className="bg-white border border-gray-200
                                        rounded-xl p-8 text-center">

                            <Award
                                size={34}
                                className="mx-auto text-gray-400"
                            />

                            <h2 className="mt-3 text-lg font-semibold text-gray-800">
                                No expertise added yet
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Add your skills so other employees can find you.
                            </p>

                            <button
                                type="button"
                                onClick={handleAddExpert}
                                className="mt-4 inline-flex items-center gap-2
                                           px-4 py-2.5 rounded-lg
                                           bg-indigo-600 text-white text-sm
                                           hover:bg-indigo-700"
                            >
                                <Plus size={17} />
                                Add Expertise
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2
                                        lg:grid-cols-3 gap-4">

                            {myExperts.map((expert) => (
                                <div key={expert.id}>
                                    <ExpertCard
                                        expert={expert}
                                        onView={() =>
                                            handleViewExpert(expert)
                                        }
                                    />

                                    <div className="flex gap-2 mt-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEditExpert(expert)
                                            }
                                            className="flex-1 inline-flex
                                                       items-center justify-center
                                                       gap-1.5 px-3 py-2
                                                       rounded-lg border
                                                       border-gray-300
                                                       text-sm text-gray-700
                                                       hover:bg-gray-50"
                                        >
                                            <Pencil size={15} />
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteExpert(expert)
                                            }
                                            className="flex-1 inline-flex
                                                       items-center justify-center
                                                       gap-1.5 px-3 py-2
                                                       rounded-lg border
                                                       border-red-200
                                                       text-sm text-red-600
                                                       hover:bg-red-50"
                                        >
                                            <Trash2 size={15} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Expert Directory */}
            {activeTab === "directory" && (
                <section className="space-y-4">

                    {/* Compact filters */}
                    <div className="bg-white border border-gray-200
                                    rounded-xl p-4">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                            <div className="md:col-span-1">
                                <ExpertSearch
                                    value={search}
                                    onChange={setSearch}
                                    placeholder="Search experts..."
                                />
                            </div>

                            <div>
                                {skillsLoading ? (
                                    <div className="h-11 flex items-center
                                                    gap-2 px-3
                                                    border border-gray-200
                                                    rounded-lg
                                                    text-sm text-gray-500">
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                        Loading skills...
                                    </div>
                                ) : (
                                    <SkillSearchSelect
                                        skills={skills}
                                        value={selectedSkill}
                                        onChange={setSelectedSkill}
                                        placeholder="Filter by skill"
                                    />
                                )}
                            </div>

                            <div>
                                <ExpertFilters
                                    level={level}
                                    onLevelChange={setLevel}
                                />
                            </div>
                        </div>

                        {hasFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-3 text-xs font-medium
                                           text-indigo-600 hover:text-indigo-800"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Result heading */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Available Experts
                            </h2>

                            <p className="text-xs text-gray-500 mt-0.5">
                                {filteredExperts.length} expert
                                {filteredExperts.length !== 1 ? "s" : ""} found
                            </p>
                        </div>
                    </div>

                    {filteredExperts.length === 0 ? (
                        <EmptyExperts
                            hasFilters={hasFilters}
                            onClearFilters={clearFilters}
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2
                                        lg:grid-cols-3 gap-4">

                            {filteredExperts.map((expert) => (
                                <ExpertCard
                                    key={expert.id}
                                    expert={expert}
                                    onView={() =>
                                        handleViewExpert(expert)
                                    }
                                />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Details */}
            <ExpertDetailsModal
                expert={selectedExpert}
                open={detailsOpen}
                onClose={closeDetails}
            />
            <DeleteExpertModal
                open={deleteModalOpen}
                expert={expertToDelete}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setExpertToDelete(null);
                }}
                onConfirm={confirmDeleteExpert}
            />

            {/* Add / Edit */}
            <ExpertFormModal
                open={formOpen}
                onClose={closeForm}
                skills={skills}
                expert={editingExpert}
                onSuccess={handleFormSuccess}
            />
        </div>
    );
};

export default ExpertDirectory;