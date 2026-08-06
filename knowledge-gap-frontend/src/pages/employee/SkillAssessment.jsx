import React, { useEffect, useMemo, useState } from "react";
import {
    ClipboardCheck,
    Search,
    Plus,
    Filter,
    Loader2,
} from "lucide-react";

import assessmentService from "../../services/assessmentService";
import { getMySkillGap } from "../../services/skillGapService";

import AssessmentSummary from "../../components/assessment/AssessmentSummary";
import AssessmentCard from "../../components/assessment/AssessmentCard";
import SkillGapCard from "../../components/assessment/SkillGapCard";
import AssessmentFilters from "../../components/assessment/AssessmentFilters";
import CreateAssessmentModal from "../../components/assessment/CreateAssessmentModal";

const SkillAssessment = () => {
    const [assessments, setAssessments] = useState([]);
    const [skillGaps, setSkillGaps] = useState([]);

    const [loading, setLoading] = useState(true);
    const [creatingAssessment, setCreatingAssessment] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [sortBy, setSortBy] = useState("NEWEST");

    

    useEffect(() => {
        loadData();
    }, []);
    

    const loadData = async () => {
        try {
            setLoading(true);

           const [assessmentRes, gapRes] = await Promise.all([
    assessmentService.getMyAssessments(),
    getMySkillGap()
]);

setAssessments(assessmentRes.data || []);
setSkillGaps(gapRes || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredAssessments = useMemo(() => {
        let filtered = assessments.filter((assessment) => {
            const matchesSearch = assessment.skillName
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "ALL" ||
                assessment.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        switch (sortBy) {
            case "NEWEST":
                filtered.sort(
                    (a, b) =>
                        new Date(b.assessedAt) -
                        new Date(a.assessedAt)
                );
                break;

            case "OLDEST":
                filtered.sort(
                    (a, b) =>
                        new Date(a.assessedAt) -
                        new Date(b.assessedAt)
                );
                break;

            case "SCORE_HIGH":
                filtered.sort(
                    (a, b) =>
                        (b.score || 0) -
                        (a.score || 0)
                );
                break;

            case "SCORE_LOW":
                filtered.sort(
                    (a, b) =>
                        (a.score || 0) -
                        (b.score || 0)
                );
                break;

            default:
                break;
        }

        return filtered;
    }, [assessments, search, statusFilter, sortBy]);

    const availableSkillGaps = useMemo(() => {
        return skillGaps.filter((gap) => {
            const pendingAssessment = assessments.find(
                (assessment) =>
                    assessment.skillId === gap.skillId &&
                    assessment.status === "PENDING"
            );

            return !pendingAssessment;
        });
    }, [skillGaps, assessments]);

    const summary = useMemo(() => {
        return {
            total: assessments.length,
            pending: assessments.filter((a) => a.status === "PENDING").length,
            passed: assessments.filter((a) => a.status === "PASSED").length,
            approved: assessments.filter((a) => a.status === "APPROVED").length,
            failed: assessments.filter((a) => a.status === "FAILED").length,
        };
    }, [assessments]);

    const handleCreateAssessment = async (skillId) => {
        try {
            setCreatingAssessment(true);

            await assessmentService.createAssessment(skillId);

            setShowCreateModal(false);

            await loadData();
        } catch (err) {
            console.error(err);

            alert(
                err?.response?.data?.message ??
                "Unable to create assessment."
            );
        } finally {
            setCreatingAssessment(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <ClipboardCheck className="text-indigo-600" />
                        Skill Assessments
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Validate your knowledge and improve your competency level.
                    </p>

                </div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition shadow"
                >
                    <Plus size={18} />
                    Start Assessment
                </button>
            </div>

            {/* Summary */}

            <AssessmentSummary summary={summary} />

            {/* Filters */}

            <AssessmentFilters
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {/* Loading */}

            {loading && (
                <div className="flex justify-center py-20">
                    <Loader2
                        className="animate-spin text-indigo-600"
                        size={40}
                    />
                </div>
            )}

            {/* Assessments */}

            {!loading && (
                <>
                    <section className="space-y-4">

                        <div className="flex items-center justify-between">

                            <h2 className="font-semibold text-xl text-gray-800">
                                My Assessments
                            </h2>

                            <span className="text-sm text-gray-500">
                                {filteredAssessments.length} Assessments
                            </span>

                        </div>

                        {filteredAssessments.length === 0 ? (
                            <div className="bg-white rounded-2xl border p-10 text-center text-gray-500">
                                No assessments found.
                            </div>
                        ) : (
                            <div className="grid gap-5">
                                {filteredAssessments.map((assessment) => (
    <AssessmentCard
        key={assessment.id}
        assessment={assessment}
    />
))}
                            </div>
                        )}

                    </section>

                    {/* Skill Gaps */}

                    <section className="space-y-4">

                        <h2 className="text-xl font-semibold text-gray-800">
                            Skills Ready for Assessment
                        </h2>

                        {availableSkillGaps.length === 0 ? (
                            <div className="bg-white border rounded-2xl p-10 text-center text-gray-500">
                                No skill gaps available for assessment.
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                                {availableSkillGaps.map((gap) => (
    <SkillGapCard
        key={gap.skillId}   // or gap.id
        gap={gap}
        onStart={() => handleCreateAssessment(gap.skillId)}
    />
))}

                            </div>
                        )}

                    </section>
                </>
            )}

            <CreateAssessmentModal
                open={showCreateModal}
                loading={creatingAssessment}
                skillGaps={availableSkillGaps}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateAssessment}
            />
        </div>
    );
};

export default SkillAssessment;