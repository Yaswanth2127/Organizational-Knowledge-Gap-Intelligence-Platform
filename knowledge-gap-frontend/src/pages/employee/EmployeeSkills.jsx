import React, { useEffect, useMemo, useState } from "react";
import { Loader2, Plus } from "lucide-react";

import employeeSkillService from "../../services/employeeSkillService";
import { getAllSkills } from "../../services/skillService";

import SkillStats from "../../components/employee/skills/SkillStats";
import SkillFilters from "../../components/employee/skills/SkillFilters";
import SkillCard from "../../components/employee/skills/SkillCard";
import SkillModal from "../../components/employee/skills/SkillModal";
import DeleteSkillModal from "../../components/employee/skills/DeleteSkillModal";
import EmptySkills from "../../components/employee/skills/EmptySkills";

const EmployeeSkills = () => {

    const [skills, setSkills] = useState([]);

    const [statistics, setStatistics] = useState(null);

    const [availableSkills, setAvailableSkills] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [search, setSearch] = useState("");

    const [ratingFilter, setRatingFilter] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const [editingSkill, setEditingSkill] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedSkill, setSelectedSkill] = useState(null);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            setLoading(true);

            const [

                skillsRes,

                statisticsRes,

                availableSkillsRes

            ] = await Promise.all([

                employeeSkillService.getMySkills(),

                employeeSkillService.getStatistics(),

                getAllSkills()

            ]);

            setSkills(skillsRes.data);

            setStatistics(statisticsRes.data);

            setAvailableSkills(availableSkillsRes);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredSkills = useMemo(() => {

        return skills.filter((skill) => {

            const matchesSearch = skill.skillName
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesRating =

                !ratingFilter ||

                skill.finalRating === ratingFilter ||

                skill.selfRating === ratingFilter;

            return matchesSearch && matchesRating;

        });

    }, [skills, search, ratingFilter]);

    if (loading) {

        return (

            <div className="flex justify-center items-center py-32">

                <Loader2
                    size={45}
                    className="animate-spin text-indigo-600"
                />

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* ======================================
                        Header
            ======================================= */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                    <h1 className="text-3xl font-bold">

                        My Skills

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage your technical skills and self assessments.

                    </p>

                </div>

                <button

                    onClick={() => {

                        setEditingSkill(null);

                        setModalOpen(true);

                    }}

                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"

                >

                    <Plus size={20} />

                    Add Skill

                </button>

            </div>

            {/* ======================================
                        Statistics
            ======================================= */}

            <SkillStats
                statistics={statistics}
            />

            {/* ======================================
                        Filters
            ======================================= */}

            <SkillFilters

                search={search}

                setSearch={setSearch}

                ratingFilter={ratingFilter}

                setRatingFilter={setRatingFilter}

            />

            {/* ======================================
                        Skills
            ======================================= */}

            {

                filteredSkills.length === 0 ?

                (

                    <EmptySkills

                        onAdd={() => {

                            setEditingSkill(null);

                            setModalOpen(true);

                        }}

                    />

                )

                :

                (

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {

                            filteredSkills.map((skill) => (

                                <SkillCard

                                    key={skill.id}

                                    skill={skill}

                                    onEdit={(selectedSkill) => {

                                        setEditingSkill(selectedSkill);

                                        setModalOpen(true);

                                    }}

                                    onDelete={(selectedSkill) => {

                                        setSelectedSkill(selectedSkill);

                                        setDeleteModalOpen(true);

                                    }}

                                />

                            ))

                        }

                    </div>

                )

            }            {/* ======================================
                        Skill Modal
            ======================================= */}

            <SkillModal
                open={modalOpen}
                skills={availableSkills}
                loading={submitting}
                initialValues={editingSkill}
                onClose={() => {

                    setModalOpen(false);

                    setEditingSkill(null);

                }}
                onSubmit={async (payload) => {

                    try {

                        setSubmitting(true);

                        if (editingSkill) {

                            await employeeSkillService.updateSkill(
                                editingSkill.id,
                                payload
                            );

                        } else {

                            await employeeSkillService.addSkill(
                                payload
                            );

                        }

                        await loadData();

                        setModalOpen(false);

                        setEditingSkill(null);

                    } catch (error) {

                        console.error(error);

                    } finally {

                        setSubmitting(false);

                    }

                }}
            />

            {/* ======================================
                    Delete Skill Modal
            ======================================= */}

            <DeleteSkillModal
                open={deleteModalOpen}
                skill={selectedSkill}
                loading={submitting}
                onClose={() => {

                    setDeleteModalOpen(false);

                    setSelectedSkill(null);

                }}
                onConfirm={async () => {

                    try {

                        setSubmitting(true);

                        await employeeSkillService.deleteSkill(
                            selectedSkill.id
                        );

                       

                        setDeleteModalOpen(false);

                        setSelectedSkill(null);
                         await loadData();

                    } catch (error) {

                        console.error(error);

                    } finally {

                        setSubmitting(false);

                    }

                }}
            />

        </div>

    );

};

export default EmployeeSkills;