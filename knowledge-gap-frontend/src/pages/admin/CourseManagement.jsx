

import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Plus,
    Search,
    BookOpen,
    Layers3,
    CheckCircle2,
    XCircle,
    X,
    AlertCircle,
} from "lucide-react";

import {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
} from "../../services/courseService";

import { getAllSkills } from "../../services/skillService";

import CourseCard from "../../components/course/CourseCard";
import CourseFormModal from "../../components/course/CourseFormModal";
import CourseDetailsModal from "../../components/course/CourseDetailsModal";

import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

const emptyForm = {
    title: "",
    description: "",
    skillId: "",
    source: "INTERNAL",
    provider: "",
    externalUrl: "",
    durationHours: "",
    difficulty: "BEGINNER",
    thumbnailUrl: "",
    isActive: true,
};

export default function CourseManagement() {

    // =====================================================
    // DATA
    // =====================================================

    const [courses, setCourses] = useState([]);
    const [skills, setSkills] = useState([]);

    // =====================================================
    // UI STATE
    // =====================================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [sourceFilter, setSourceFilter] = useState("ALL");
    const [difficultyFilter, setDifficultyFilter] = useState("ALL");

    const [formOpen, setFormOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // =====================================================
    // SELECTED DATA
    // =====================================================

    const [editingId, setEditingId] = useState(null);

    const [selectedCourse, setSelectedCourse] =
        useState(null);

    const [courseToDelete, setCourseToDelete] =
        useState(null);

    // =====================================================
    // FORM
    // =====================================================

    const [form, setForm] = useState({
        ...emptyForm,
    });

    // =====================================================
    // LOAD DATA
    // =====================================================

    const fetchAll = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                courseList,
                skillList,
            ] = await Promise.all([
                getAllCourses(),
                getAllSkills(),
            ]);

            setCourses(courseList || []);
            setSkills(skillList || []);

        } catch (err) {

            console.error(
                "Failed to load courses:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load courses."
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    // =====================================================
    // HELPERS
    // =====================================================

    const skillName = (id) => {

        const skill = skills.find(
            (item) =>
                String(item.id) === String(id)
        );

        return skill?.name || "-";
    };

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredCourses = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return courses.filter((course) => {

            const title =
                course.title?.toLowerCase() || "";

            const description =
                course.description?.toLowerCase() || "";

            const provider =
                course.provider?.toLowerCase() || "";

            const skill =
                skillName(course.skillId).toLowerCase();

            const matchesSearch =
                !keyword ||
                title.includes(keyword) ||
                description.includes(keyword) ||
                provider.includes(keyword) ||
                skill.includes(keyword);

            const matchesSource =
                sourceFilter === "ALL" ||
                course.source === sourceFilter;

            const matchesDifficulty =
                difficultyFilter === "ALL" ||
                course.difficulty === difficultyFilter;

            return (
                matchesSearch &&
                matchesSource &&
                matchesDifficulty
            );
        });
    }, [
        courses,
        skills,
        search,
        sourceFilter,
        difficultyFilter,
    ]);
    // =====================================================
    // SUMMARY
    // =====================================================

    const totalCourses = courses.length;

    const activeCourses =
        courses.filter(
            (course) => course.isActive
        ).length;

    const inactiveCourses =
        totalCourses -
        activeCourses;

    const skillsCovered =
        new Set(
            courses
                .map(
                    (course) =>
                        course.skillId
                )
                .filter(Boolean)
        ).size;

    // =====================================================
    // ADD
    // =====================================================

    const openAddModal = () => {

        setEditingId(null);

        setForm({
            ...emptyForm,
        });

        setError("");

        setFormOpen(true);
    };

    // =====================================================
    // EDIT
    // =====================================================

    const openEditModal = (course) => {

        setEditingId(course.id);

        setForm({
            title:
                course.title || "",

            description:
                course.description || "",

            skillId:
                course.skillId || "",

            source:
                course.source || "INTERNAL",

            provider:
                course.provider || "",

            externalUrl:
                course.externalUrl || "",

            durationHours:
                course.durationHours || "",

            difficulty:
                course.difficulty ||
                "BEGINNER",

            thumbnailUrl:
                course.thumbnailUrl || "",

            isActive:
                course.isActive ?? true,
        });

        setError("");

        setFormOpen(true);
    };

    // =====================================================
    // CLOSE FORM
    // =====================================================

    const closeForm = () => {

        setFormOpen(false);
        setEditingId(null);

        setForm({
            ...emptyForm,
        });
    };

    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm(
            (previous) => ({
                ...previous,
                [name]:
                    type === "checkbox"
                        ? checked
                        : value,
            })
        );
    };

    // =====================================================
    // SKILL CHANGE
    // =====================================================

    const handleSkillChange = (skillId) => {

        setForm(
            (previous) => ({
                ...previous,
                skillId,
            })
        );
    };

    // =====================================================
    // SAVE
    // =====================================================

    const handleSave = async (event) => {

        event.preventDefault();

        if (
            !form.title.trim() ||
            !form.skillId
        ) {

            setError(
                "Course title and skill are required."
            );

            return;
        }

        try {

            setSaving(true);
            setError("");

            const payload = {

                title:
                    form.title.trim(),

                description:
                    form.description.trim(),

                skillId:
                    Number(form.skillId),

                source:
                    form.source,

                provider:
                    form.provider.trim(),

                externalUrl:
                    form.externalUrl.trim(),

                durationHours:
                    form.durationHours
                        ? Number(
                            form.durationHours
                        )
                        : null,

                difficulty:
                    form.difficulty,

                thumbnailUrl:
                    form.thumbnailUrl.trim(),

                isActive:
                    form.isActive,
            };

            if (editingId) {

                await updateCourse(
                    editingId,
                    payload
                );

            } else {

                await createCourse(
                    payload
                );

            }

            closeForm();

            await fetchAll();

        } catch (err) {

            console.error(
                "Failed to save course:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to save course."
            );

        } finally {

            setSaving(false);

        }
    };

    // =====================================================
    // VIEW
    // =====================================================

    const openDetails = (course) => {

        setSelectedCourse(course);
        setDetailsOpen(true);
    };

    const closeDetails = () => {

        setSelectedCourse(null);
        setDetailsOpen(false);
    };

    // =====================================================
    // DELETE
    // =====================================================

    const openDeleteModal = (course) => {

        setCourseToDelete(course);
        setDeleteOpen(true);
    };

    const closeDeleteModal = () => {

        setCourseToDelete(null);
        setDeleteOpen(false);
    };

    const confirmDelete = async () => {

        if (!courseToDelete) {
            return;
        }

        try {

            setSaving(true);
            setError("");

            await deleteCourse(
                courseToDelete.id
            );

            closeDeleteModal();

            await fetchAll();

        } catch (err) {

            console.error(
                "Failed to delete course:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to delete course."
            );

        } finally {

            setSaving(false);

        }
    };

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div className="space-y-6">

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">

                        <BookOpen
                            size={22}
                            className="text-indigo-600"
                        />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Course Management
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage the organization's learning catalog.
                        </p>

                    </div>

                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-sm"
                >
                    <Plus size={17} />
                    Add Course
                </button>

            </div>

            {/* ERROR */}

            {error && (

                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">

                    <AlertCircle size={18} />

                    <span className="flex-1">
                        {error}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                    >
                        <X size={17} />
                    </button>

                </div>

            )}

            {/* SUMMARY */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Total Courses
                    </p>

                    <div className="flex items-center justify-between mt-2">

                        <p className="text-2xl font-bold text-gray-900">
                            {totalCourses}
                        </p>

                        <BookOpen
                            size={19}
                            className="text-indigo-500"
                        />

                    </div>

                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Active
                    </p>

                    <div className="flex items-center justify-between mt-2">

                        <p className="text-2xl font-bold text-green-600">
                            {activeCourses}
                        </p>

                        <CheckCircle2
                            size={19}
                            className="text-green-500"
                        />

                    </div>

                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Inactive
                    </p>

                    <div className="flex items-center justify-between mt-2">

                        <p className="text-2xl font-bold text-gray-600">
                            {inactiveCourses}
                        </p>

                        <XCircle
                            size={19}
                            className="text-gray-400"
                        />

                    </div>

                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Skills Covered
                    </p>

                    <div className="flex items-center justify-between mt-2">

                        <p className="text-2xl font-bold text-indigo-600">
                            {skillsCovered}
                        </p>

                        <Layers3
                            size={19}
                            className="text-indigo-500"
                        />

                    </div>

                </div>

            </div>

            {/* SEARCH */}

            {/* SEARCH & FILTERS */}

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3">

                    {/* Search */}

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search courses, skills, providers..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />

                    </div>

                    {/* Source */}

                    <select
                        value={sourceFilter}
                        onChange={(event) =>
                            setSourceFilter(event.target.value)
                        }
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[170px]"
                    >

                        <option value="ALL">
                            All Sources
                        </option>

                        <option value="INTERNAL">
                            Internal
                        </option>

                        <option value="COURSERA">
                            Coursera
                        </option>

                        <option value="UDEMY">
                            Udemy
                        </option>

                        <option value="LINKEDIN_LEARNING">
                            LinkedIn Learning
                        </option>

                        <option value="OTHER">
                            Other
                        </option>

                    </select>

                    {/* Difficulty */}

                    <select
                        value={difficultyFilter}
                        onChange={(event) =>
                            setDifficultyFilter(event.target.value)
                        }
                        className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[150px]"
                    >

                        <option value="ALL">
                            All Levels
                        </option>

                        <option value="BEGINNER">
                            Beginner
                        </option>

                        <option value="INTERMEDIATE">
                            Intermediate
                        </option>

                        <option value="ADVANCED">
                            Advanced
                        </option>

                    </select>

                </div>

                {/* Results */}

                <div className="flex items-center justify-between mt-3 px-1">

                    <p className="text-xs text-gray-400">

                        Showing{" "}

                        <span className="font-semibold text-gray-600">
                            {filteredCourses.length}
                        </span>{" "}

                        of{" "}

                        <span className="font-semibold text-gray-600">
                            {courses.length}
                        </span>{" "}
                        courses

                    </p>

                    {(search ||
                        sourceFilter !== "ALL" ||
                        difficultyFilter !== "ALL") && (

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setSourceFilter("ALL");
                                    setDifficultyFilter("ALL");
                                }}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                            >
                                Clear Filters
                            </button>

                        )}

                </div>

            </div>

            {/* CONTENT */}

            {loading ? (

                <div className="bg-white border border-gray-100 rounded-2xl p-14 text-center">

                    <BookOpen
                        size={28}
                        className="mx-auto text-indigo-500 animate-pulse"
                    />

                    <p className="text-sm text-gray-500 mt-3">
                        Loading courses...
                    </p>

                </div>

            ) : filteredCourses.length === 0 ? (

                <div className="bg-white border border-gray-100 rounded-2xl p-14 text-center">

                    <div className="w-14 h-14 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center">

                        <BookOpen
                            size={25}
                            className="text-gray-400"
                        />

                    </div>

                    <h3 className="text-base font-semibold text-gray-800 mt-4">
                        No courses found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {search
                            ? "Try a different search term."
                            : "Add your first course to get started."}
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {filteredCourses.map(
                        (course) => (

                            <CourseCard
                                key={course.id}
                                course={course}
                                skillName={
                                    skillName
                                }
                                onView={
                                    openDetails
                                }
                                onEdit={
                                    openEditModal
                                }
                                onDelete={
                                    openDeleteModal
                                }
                            />

                        )
                    )}

                </div>

            )}

            {/* FORM */}

            <CourseFormModal
                open={formOpen}
                editingId={editingId}
                form={form}
                skills={skills}
                saving={saving}
                onChange={handleChange}
                onSkillChange={
                    handleSkillChange
                }
                onSubmit={handleSave}
                onClose={closeForm}
            />

            {/* DETAILS */}

            {detailsOpen && (

                <CourseDetailsModal
                    course={selectedCourse}
                    skillName={skillName}
                    onClose={closeDetails}
                />

            )}

            {/* DELETE */}

            <ConfirmDeleteModal
                open={deleteOpen}
                title="Delete Course"
                itemName={
                    courseToDelete?.title
                }
                message="This course will be permanently removed from the course catalog. Existing learning paths or recommendations referencing it may also be affected."
                loading={saving}
                onCancel={
                    closeDeleteModal
                }
                onConfirm={
                    confirmDelete
                }
            />

        </div>
    );
}