

import React, { useEffect, useMemo, useState } from "react";
import { Award, BadgeCheck, Clock3, Loader2, Search } from "lucide-react";
import {
    getMyCertifications,
    getSkills,
    addMyCertification,
    deleteMyCertification,
    updateMyCertification,
} from "../../services/certificationService";
import CertificationModal from "../../components/employee/certifications/CertificationModal";
import CertificationCard from "../../components/employee/certifications/CertificationCard";
import CertificationStats from "../../components/employee/certifications/CertificationStats";
import CertificationFilters from "../../components/employee/certifications/CertificationFilters";
import DeleteCertificationModal
    from "../../components/employee/certifications/DeleteCertificationModal";

const EmployeeCertifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [skillFilter, setSkillFilter] = useState("");
    const [editingCertification, setEditingCertification] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedCertification, setSelectedCertification] =
        useState(null);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        console.log("Editing Certification:", editingCertification);
    }, [editingCertification]);
    const loadData = async () => {
        try {

            setLoading(true);

            const [certifications, skills] =
                await Promise.all([
                    getMyCertifications(),
                    getSkills(),
                ]);

            setCertifications(certifications);
            setSkills(skills);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    };
    const filtered = useMemo(() => {
        return certifications.filter((c) => {
            const name =
                (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
                (c.issuer || "").toLowerCase().includes(search.toLowerCase());

            const skill =
                !skillFilter || String(c.skillId) === String(skillFilter);

            return name && skill;
        });
    }, [certifications, search, skillFilter]);

    const stats = useMemo(() => {
        const today = new Date();

        let active = 0;
        let expired = 0;
        let expiringSoon = 0;

        certifications.forEach((c) => {
            if (!c.expiryDate) {
                active++;
                return;
            }

            const expiry = new Date(c.expiryDate);
            const diff = Math.ceil(
                (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (diff < 0) expired++;
            else if (diff <= 30) expiringSoon++;
            else active++;
        });

        return {
            total: certifications.length,
            active,
            expired,
            expiringSoon,
        };
    }, [certifications]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                    <h1 className="text-3xl font-bold">
                        My Certifications
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Upload, manage and track your professional certifications.
                    </p>

                </div>

                <button
                    onClick={() => {
                        setEditingCertification(null);
                        setModalOpen(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                    + Add Certification
                </button>
                <CertificationModal
                    open={modalOpen}
                    skills={skills}
                    loading={submitting}
                    initialValues={editingCertification}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingCertification(null);
                    }}
                    onSubmit={async (payload) => {

                        try {

                            setSubmitting(true);

                            if (editingCertification) {

                                await updateMyCertification(
                                    editingCertification.id,
                                    payload
                                );

                            } else {

                                await addMyCertification(payload);

                            }

                            await loadData();

                            setModalOpen(false);
                            setEditingCertification(null);

                        } finally {

                            setSubmitting(false);

                        }

                    }}
                />

            </div>
            <CertificationStats stats={stats} />

            <CertificationFilters
                search={search}
                setSearch={setSearch}
                skillFilter={skillFilter}
                setSkillFilter={setSkillFilter}
                skills={skills}
            />
            {filtered.length === 0 ? (
                <div className="rounded-xl border bg-white p-12 text-center shadow">
                    <Award className="mx-auto mb-4 h-14 w-14 text-indigo-500" />
                    <h3 className="text-xl font-semibold">No Certifications</h3>
                    <p className="mt-2 text-gray-500">
                        Add your first certification to get started.
                    </p>
                </div>
                
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {filtered.map((cert) => (

                        <CertificationCard
                            key={cert.id}
                            certification={cert}
                            onDelete={(certification) => {

                                setSelectedCertification(certification);

                                setDeleteModalOpen(true);

                            }}
                            onEdit={(certification) => {

                                setEditingCertification(certification);

                                setModalOpen(true);

                            }}
                        />

                    ))}

                </div>
            )}
            <DeleteCertificationModal
                open={deleteModalOpen}
                certification={selectedCertification}
                loading={submitting}
                onClose={() => {

                    setDeleteModalOpen(false);
                    setSelectedCertification(null);

                }}
                onConfirm={async () => {

                    try {

                        setSubmitting(true);

                        await deleteMyCertification(
                            selectedCertification.id
                        );

                        await loadData();

                    } finally {

                        setSubmitting(false);
                        setDeleteModalOpen(false);
                        setSelectedCertification(null);

                    }

                }}
            />

        </div>
    );
};


export default EmployeeCertifications;