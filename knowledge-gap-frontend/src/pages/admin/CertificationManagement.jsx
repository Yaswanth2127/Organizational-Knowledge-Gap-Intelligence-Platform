import React, { useEffect, useMemo, useState } from "react";
import {
    Search,
    Award,
    ExternalLink,
    CalendarDays,
    User,
    X,
    AlertCircle,
    CheckCircle2,
    Clock3,
    ShieldCheck,
    ChevronRight,
} from "lucide-react";

import { getAllCertifications } from "../../services/certificationService";
import { getAllUsers } from "../../services/userService";
import { getAllSkills } from "../../services/skillService";

export default function CertificationManagement() {
    const [certifications, setCertifications] = useState([]);
    const [users, setUsers] = useState([]);
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [selectedCertification, setSelectedCertification] =
        useState(null);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            setLoading(true);
            setError("");

            const [certs, usersData, skillsData] =
                await Promise.all([
                    getAllCertifications(),
                    getAllUsers(),
                    getAllSkills(),
                ]);

            setCertifications(
                Array.isArray(certs) ? certs : []
            );

            setUsers(
                Array.isArray(usersData) ? usersData : []
            );

            setSkills(
                Array.isArray(skillsData) ? skillsData : []
            );
        } catch (err) {
            console.error(
                "Failed to load certifications:",
                err
            );

            setError(
                err.response?.data?.message ||
                    "Failed to load certifications."
            );
        } finally {
            setLoading(false);
        }
    };

    const userName = (id) =>
        users.find((u) => u.id === id)?.fullName ||
        "Unknown Employee";

    const userEmail = (id) =>
        users.find((u) => u.id === id)?.email || "";

    const skillName = (id) =>
        skills.find((s) => s.id === id)?.name ||
        "Unknown Skill";

    const getCertificationStatus = (cert) => {
        if (!cert.expiryDate) {
            return "NO_EXPIRY";
        }

        const expiry = new Date(cert.expiryDate);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return expiry < today ? "EXPIRED" : "ACTIVE";
    };

    const filteredCertifications = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return certifications.filter((cert) => {
            const name =
                cert.name?.toLowerCase() || "";

            const employee =
                userName(cert.userId).toLowerCase();

            const email =
                userEmail(cert.userId).toLowerCase();

            const skill =
                skillName(cert.skillId).toLowerCase();

            const issuer =
                cert.issuer?.toLowerCase() || "";

            const matchesSearch =
                !query ||
                name.includes(query) ||
                employee.includes(query) ||
                email.includes(query) ||
                skill.includes(query) ||
                issuer.includes(query);

            const status =
                getCertificationStatus(cert);

            const matchesStatus =
                statusFilter === "ALL" ||
                status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [
        certifications,
        users,
        skills,
        searchTerm,
        statusFilter,
    ]);

    const summary = useMemo(() => {
        const total = certifications.length;

        const active = certifications.filter(
            (cert) =>
                getCertificationStatus(cert) ===
                "ACTIVE"
        ).length;

        const expired = certifications.filter(
            (cert) =>
                getCertificationStatus(cert) ===
                "EXPIRED"
        ).length;

        const noExpiry = certifications.filter(
            (cert) =>
                getCertificationStatus(cert) ===
                "NO_EXPIRY"
        ).length;

        return {
            total,
            active,
            expired,
            noExpiry,
        };
    }, [certifications]);

    const getInitials = (name) => {
        if (!name) return "U";

        return name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    return (
        <div className="space-y-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Award
                            size={22}
                            className="text-indigo-600"
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Certifications
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Monitor employee certifications,
                            credentials, and expiry status.
                        </p>
                    </div>

                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-100 px-3 py-2 rounded-xl shadow-sm">
                    <ShieldCheck
                        size={15}
                        className="text-indigo-500"
                    />

                    Admin View
                </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">

                    <AlertCircle size={18} />

                    <span className="flex-1">
                        {error}
                    </span>

                    <button
                        onClick={() => setError("")}
                        className="hover:text-red-900"
                    >
                        <X size={17} />
                    </button>

                </div>
            )}

            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                {/* TOTAL */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Total
                            </p>

                            <p className="text-2xl font-bold text-gray-900 mt-2">
                                {summary.total}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                All certifications
                            </p>
                        </div>

                        <div className="p-2.5 bg-indigo-50 rounded-xl">
                            <Award
                                size={18}
                                className="text-indigo-600"
                            />
                        </div>

                    </div>

                </div>

                {/* ACTIVE */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Active
                            </p>

                            <p className="text-2xl font-bold text-green-700 mt-2">
                                {summary.active}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Currently valid
                            </p>
                        </div>

                        <div className="p-2.5 bg-green-50 rounded-xl">
                            <CheckCircle2
                                size={18}
                                className="text-green-600"
                            />
                        </div>

                    </div>

                </div>

                {/* EXPIRED */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Expired
                            </p>

                            <p className="text-2xl font-bold text-red-700 mt-2">
                                {summary.expired}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Require attention
                            </p>
                        </div>

                        <div className="p-2.5 bg-red-50 rounded-xl">
                            <Clock3
                                size={18}
                                className="text-red-600"
                            />
                        </div>

                    </div>

                </div>

                {/* NO EXPIRY */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                No Expiry
                            </p>

                            <p className="text-2xl font-bold text-blue-700 mt-2">
                                {summary.noExpiry}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Permanent credentials
                            </p>
                        </div>

                        <div className="p-2.5 bg-blue-50 rounded-xl">
                            <ShieldCheck
                                size={18}
                                className="text-blue-600"
                            />
                        </div>

                    </div>

                </div>

            </div>

            {/* =================================================
                SEARCH / FILTER
            ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

                <div className="flex flex-col lg:flex-row gap-3">

                    {/* SEARCH */}

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }
                            placeholder="Search employee, certification, skill or issuer..."
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 bg-gray-50/50 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />

                    </div>

                    {/* STATUS FILTER */}

                    <div className="flex items-center gap-2">

                        {[
                            ["ALL", "All"],
                            ["ACTIVE", "Active"],
                            ["EXPIRED", "Expired"],
                            ["NO_EXPIRY", "No Expiry"],
                        ].map(([value, label]) => (
                            <button
                                key={value}
                                onClick={() =>
                                    setStatusFilter(value)
                                }
                                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                                    statusFilter === value
                                        ? "bg-indigo-600 text-white shadow-sm"
                                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                {label}
                            </button>
                        ))}

                    </div>

                </div>

                <div className="flex items-center justify-between mt-3 px-1">

                    <p className="text-xs text-gray-400">
                        Showing{" "}
                        <span className="font-semibold text-gray-600">
                            {filteredCertifications.length}
                        </span>{" "}
                        certification
                        {filteredCertifications.length !==
                        1
                            ? "s"
                            : ""}
                    </p>

                    {(searchTerm ||
                        statusFilter !== "ALL") && (
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setStatusFilter("ALL");
                            }}
                            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                        >
                            Clear filters
                        </button>
                    )}

                </div>

            </div>

            {/* =================================================
                TABLE
            ================================================= */}

            {loading ? (

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">

                    <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 flex items-center justify-center">
                        <Award
                            size={20}
                            className="text-indigo-600 animate-pulse"
                        />
                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                        Loading certifications...
                    </p>

                </div>

            ) : filteredCertifications.length === 0 ? (

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">

                    <div className="w-14 h-14 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center">
                        <Search
                            size={25}
                            className="text-gray-400"
                        />
                    </div>

                    <h3 className="text-base font-semibold text-gray-800 mt-4">
                        No certifications found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Try changing your search or filter.
                    </p>

                </div>

            ) : (

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    {/* TABLE HEADER */}

                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Employee Credentials
                            </h3>

                            <p className="text-xs text-gray-400 mt-1">
                                View certification records submitted
                                by employees.
                            </p>
                        </div>

                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
                            {filteredCertifications.length} records
                        </span>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[950px] text-sm">

                            <thead className="bg-gray-50/80 border-b border-gray-100">

                                <tr>

                                    <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                        Certification
                                    </th>

                                    <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                        Employee
                                    </th>

                                    <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                        Skill
                                    </th>

                                    <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                        Issuer
                                    </th>

                                    <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                        Validity
                                    </th>

                                    <th className="text-right px-5 py-3 font-semibold text-gray-500">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredCertifications.map(
                                    (cert) => {

                                        const status =
                                            getCertificationStatus(
                                                cert
                                            );

                                        return (
                                            <tr
                                                key={cert.id}
                                                className="border-b border-gray-50 last:border-0 hover:bg-indigo-50/20 transition"
                                            >

                                                {/* CERTIFICATION */}

                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                                            <Award
                                                                size={17}
                                                                className="text-indigo-600"
                                                            />
                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="font-semibold text-gray-800 truncate max-w-[220px]">
                                                                {
                                                                    cert.name
                                                                }
                                                            </p>

                                                            <p className="text-xs text-gray-400 mt-0.5">
                                                                Credential #
                                                                {
                                                                    cert.id
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* EMPLOYEE */}

                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                                            {getInitials(
                                                                userName(
                                                                    cert.userId
                                                                )
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="font-medium text-gray-800 truncate max-w-[180px]">
                                                                {userName(
                                                                    cert.userId
                                                                )}
                                                            </p>

                                                            <p className="text-xs text-gray-400 truncate max-w-[180px]">
                                                                {userEmail(
                                                                    cert.userId
                                                                )}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* SKILL */}

                                                <td className="px-5 py-4">

                                                    <span className="inline-flex px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">
                                                        {skillName(
                                                            cert.skillId
                                                        )}
                                                    </span>

                                                </td>

                                                {/* ISSUER */}

                                                <td className="px-5 py-4 text-gray-600">
                                                    {cert.issuer ||
                                                        "-"}
                                                </td>

                                                {/* VALIDITY */}

                                                <td className="px-5 py-4">

                                                    {status ===
                                                    "ACTIVE" ? (
                                                        <div>
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                                Active
                                                            </span>

                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Expires{" "}
                                                                {
                                                                    cert.expiryDate
                                                                }
                                                            </p>
                                                        </div>
                                                    ) : status ===
                                                      "EXPIRED" ? (
                                                        <div>
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                                                Expired
                                                            </span>

                                                            <p className="text-xs text-gray-400 mt-1">
                                                                {
                                                                    cert.expiryDate
                                                                }
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                                                            <ShieldCheck
                                                                size={
                                                                    12
                                                                }
                                                            />
                                                            No Expiry
                                                        </span>
                                                    )}

                                                </td>

                                                {/* ACTION */}

                                                <td className="px-5 py-4 text-right">

                                                    <button
                                                        onClick={() =>
                                                            setSelectedCertification(
                                                                cert
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
                                                    >
                                                        View
                                                        <ChevronRight
                                                            size={
                                                                14
                                                            }
                                                        />
                                                    </button>

                                                </td>

                                            </tr>
                                        );
                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
            )}

            {/* =================================================
                DETAILS MODAL
            ================================================= */}

            {selectedCertification && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

                        {/* MODAL HEADER */}

                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
                                    <Award
                                        size={20}
                                        className="text-indigo-600"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Certification Details
                                    </h2>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Read-only admin view
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={() =>
                                    setSelectedCertification(
                                        null
                                    )
                                }
                                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="p-6">

                            {/* TITLE */}

                            <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl">

                                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                                    Certification
                                </p>

                                <h3 className="text-lg font-bold text-gray-900 mt-1">
                                    {
                                        selectedCertification.name
                                    }
                                </h3>

                                {selectedCertification.issuer && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Issued by{" "}
                                        {
                                            selectedCertification.issuer
                                        }
                                    </p>
                                )}

                            </div>

                            {/* DETAILS */}

                            <div className="grid grid-cols-2 gap-5 mt-6">

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Employee
                                    </p>

                                    <p className="text-sm font-semibold text-gray-800 mt-1">
                                        {userName(
                                            selectedCertification.userId
                                        )}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {userEmail(
                                            selectedCertification.userId
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Related Skill
                                    </p>

                                    <p className="text-sm font-semibold text-gray-800 mt-1">
                                        {skillName(
                                            selectedCertification.skillId
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Issue Date
                                    </p>

                                    <div className="flex items-center gap-1.5 mt-1">
                                        <CalendarDays
                                            size={14}
                                            className="text-gray-400"
                                        />

                                        <p className="text-sm font-semibold text-gray-800">
                                            {
                                                selectedCertification.issueDate ||
                                                "-"
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Expiry Date
                                    </p>

                                    <div className="flex items-center gap-1.5 mt-1">

                                        <CalendarDays
                                            size={14}
                                            className="text-gray-400"
                                        />

                                        <p className="text-sm font-semibold text-gray-800">
                                            {
                                                selectedCertification.expiryDate ||
                                                "No expiry"
                                            }
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* CREDENTIAL */}

                            {selectedCertification.credentialUrl && (
                                <div className="mt-6">

                                    <a
                                        href={
                                            selectedCertification.credentialUrl
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition"
                                    >
                                        <ExternalLink
                                            size={16}
                                        />
                                        View Credential
                                    </a>

                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}