import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Search,
    AlertTriangle,
    User,
    Mail,
    X,
    Loader2,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    Activity,
    Target,
    TrendingUp,
    ChevronRight,
} from "lucide-react";

import { getSkillGapForUser } from "../../services/skillGapService";
import { getAllUsers } from "../../services/userService";

const SEVERITY_STYLES = {
    CRITICAL: {
        badge: "bg-red-50 text-red-700 border-red-100",
        dot: "bg-red-500",
    },
    HIGH: {
        badge: "bg-orange-50 text-orange-700 border-orange-100",
        dot: "bg-orange-500",
    },
    MEDIUM: {
        badge: "bg-yellow-50 text-yellow-700 border-yellow-100",
        dot: "bg-yellow-500",
    },
    LOW: {
        badge: "bg-green-50 text-green-700 border-green-100",
        dot: "bg-green-500",
    },
};

const STATUS_STYLES = {
    OPEN: "bg-red-50 text-red-700",
    IN_PROGRESS: "bg-blue-50 text-blue-700",
    RESOLVED: "bg-green-50 text-green-700",
};

export default function SkillGapManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [results, setResults] = useState([]);

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);

    const [error, setError] = useState("");
    const [hasAnalyzed, setHasAnalyzed] = useState(false);

    const [severityFilter, setSeverityFilter] = useState("ALL");

    const searchRef = useRef(null);

    // =========================================================
    // LOAD USERS
    // =========================================================

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoadingUsers(true);
                setError("");

                const data = await getAllUsers();

                setUsers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load users:", err);

                setError(
                    err.response?.data?.message ||
                    "Failed to load employees."
                );
            } finally {
                setLoadingUsers(false);
            }
        };

        loadUsers();
    }, []);

    // =========================================================
    // CLOSE SEARCH WHEN CLICKING OUTSIDE
    // =========================================================

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // =========================================================
    // FILTER USERS
    // =========================================================

    const filteredUsers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return users.slice(0, 8);
        }

        return users
            .filter((user) => {
                const name =
                    user.fullName?.toLowerCase() || "";

                const email =
                    user.email?.toLowerCase() || "";

                return (
                    name.includes(query) ||
                    email.includes(query)
                );
            })
            .slice(0, 8);
    }, [users, searchTerm]);

    // =========================================================
    // SELECT USER
    // =========================================================

    const handleSelectUser = (user) => {
        setSelectedUser(user);

        setSearchTerm("");
        setShowSuggestions(false);

        setResults([]);
        setHasAnalyzed(false);
        setSeverityFilter("ALL");
        setError("");
    };

    // =========================================================
    // CLEAR USER
    // =========================================================

    const handleClearUser = () => {
        setSelectedUser(null);
        setSearchTerm("");

        setResults([]);
        setHasAnalyzed(false);
        setSeverityFilter("ALL");
        setError("");
    };

    // =========================================================
    // ANALYZE
    // =========================================================

    const handleAnalyze = async () => {
        if (!selectedUser?.id) return;

        setAnalyzing(true);
        setError("");
        setResults([]);
        setHasAnalyzed(false);
        setSeverityFilter("ALL");

        try {
            const data = await getSkillGapForUser(
                selectedUser.id
            );

            const skillGaps = Array.isArray(data)
                ? data
                : [];

            setResults(skillGaps);
            setHasAnalyzed(true);
        } catch (err) {
            console.error(
                "Skill gap analysis failed:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Skill gap analysis failed. Please try again."
            );
        } finally {
            setAnalyzing(false);
        }
    };

    // =========================================================
    // SUMMARY
    // =========================================================

    const summary = useMemo(() => {
        const total = results.length;

        const critical = results.filter(
            (item) => item.severity === "CRITICAL"
        ).length;

        const high = results.filter(
            (item) => item.severity === "HIGH"
        ).length;

        const medium = results.filter(
            (item) => item.severity === "MEDIUM"
        ).length;

        const low = results.filter(
            (item) => item.severity === "LOW"
        ).length;

        const resolved = results.filter(
            (item) => item.status === "RESOLVED"
        ).length;

        const open = results.filter(
            (item) =>
                item.status === "OPEN" ||
                item.status === "IN_PROGRESS"
        ).length;

        const averageGap =
            total > 0
                ? (
                    results.reduce(
                        (sum, item) =>
                            sum +
                            Number(item.gapScore || 0),
                        0
                    ) / total
                ).toFixed(2)
                : "0.00";

        return {
            total,
            critical,
            high,
            medium,
            low,
            resolved,
            open,
            averageGap,
        };
    }, [results]);

    // =========================================================
    // FILTER RESULTS
    // =========================================================

    const filteredResults = useMemo(() => {
        if (severityFilter === "ALL") {
            return results;
        }

        return results.filter(
            (item) =>
                item.severity === severityFilter
        );
    }, [results, severityFilter]);

    // =========================================================
    // INITIALS
    // =========================================================

    const getInitials = (name) => {
        if (!name) return "U";

        return name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div className="space-y-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Activity
                            size={22}
                            className="text-indigo-600"
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Skill Gap Analysis
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Identify employee skill gaps against
                            competency requirements.
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
                EMPLOYEE SEARCH
            ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="flex flex-col lg:flex-row lg:items-end gap-4">

                    {/* SEARCH */}

                    <div
                        ref={searchRef}
                        className="flex-1 relative"
                    >

                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                            Employee
                        </label>

                        {!selectedUser ? (
                            <>
                                <div className="relative">

                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(
                                                e.target.value
                                            );
                                            setShowSuggestions(
                                                true
                                            );
                                        }}
                                        onFocus={() =>
                                            setShowSuggestions(
                                                true
                                            )
                                        }
                                        placeholder={
                                            loadingUsers
                                                ? "Loading employees..."
                                                : "Search employee by name or email..."
                                        }
                                        disabled={loadingUsers}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-gray-50"
                                    />

                                </div>

                                {/* SEARCH SUGGESTIONS */}

                                {showSuggestions &&
                                    !loadingUsers && (
                                        <div className="absolute z-30 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">

                                            {filteredUsers.length ===
                                                0 ? (
                                                <div className="px-5 py-8 text-center">

                                                    <User
                                                        size={24}
                                                        className="mx-auto text-gray-300 mb-2"
                                                    />

                                                    <p className="text-sm font-semibold text-gray-600">
                                                        No employees found
                                                    </p>

                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Try another name
                                                        or email.
                                                    </p>

                                                </div>
                                            ) : (
                                                <div className="max-h-72 overflow-y-auto">

                                                    {filteredUsers.map(
                                                        (user) => (
                                                            <button
                                                                key={
                                                                    user.id
                                                                }
                                                                type="button"
                                                                onClick={() =>
                                                                    handleSelectUser(
                                                                        user
                                                                    )
                                                                }
                                                                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-indigo-50/70 transition border-b border-gray-50 last:border-0"
                                                            >

                                                                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                    {getInitials(
                                                                        user.fullName
                                                                    )}
                                                                </div>

                                                                <div className="min-w-0 flex-1">

                                                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                                                        {user.fullName ||
                                                                            "Unnamed User"}
                                                                    </p>

                                                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </p>

                                                                </div>

                                                                <ChevronRight
                                                                    size={
                                                                        16
                                                                    }
                                                                    className="text-gray-300"
                                                                />

                                                            </button>
                                                        )
                                                    )}

                                                </div>
                                            )}

                                        </div>
                                    )}
                            </>
                        ) : (
                            /* SELECTED EMPLOYEE */

                            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border border-indigo-200 bg-indigo-50/50 rounded-xl">

                                <div className="flex items-center gap-3 min-w-0">

                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {getInitials(
                                            selectedUser.fullName
                                        )}
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-sm font-semibold text-gray-800 truncate">
                                            {
                                                selectedUser.fullName
                                            }
                                        </p>

                                        <p className="text-xs text-gray-500 truncate">
                                            {
                                                selectedUser.email
                                            }
                                        </p>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        handleClearUser
                                    }
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white transition"
                                    title="Change employee"
                                >
                                    <X size={17} />
                                </button>

                            </div>
                        )}

                    </div>

                    {/* ANALYZE BUTTON */}

                    <button
                        onClick={handleAnalyze}
                        disabled={
                            !selectedUser ||
                            analyzing
                        }
                        className="lg:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                        {analyzing ? (
                            <>
                                <Loader2
                                    size={17}
                                    className="animate-spin"
                                />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Search size={17} />
                                Analyze Skills
                            </>
                        )}

                    </button>

                </div>

                {!selectedUser &&
                    !loadingUsers && (
                        <p className="text-xs text-gray-400 mt-3">
                            Search for an employee and select
                            them to begin the analysis.
                        </p>
                    )}

            </div>

            {/* =================================================
                SELECTED EMPLOYEE
            ================================================= */}

            {selectedUser && hasAnalyzed && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold">
                                {getInitials(
                                    selectedUser.fullName
                                )}
                            </div>

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Analysis Results
                                </p>

                                <h2 className="text-lg font-bold text-gray-900 mt-0.5">
                                    {selectedUser.fullName}
                                </h2>

                                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                                    <Mail size={13} />
                                    {
                                        selectedUser.email
                                    }
                                </div>

                            </div>

                        </div>

                        <button
                            onClick={
                                handleAnalyze
                            }
                            disabled={analyzing}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition disabled:opacity-50"
                        >
                            <RefreshCw
                                size={15}
                                className={
                                    analyzing
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Run Again
                        </button>

                    </div>

                </div>
            )}

            {/* =================================================
                SUMMARY
            ================================================= */}

            {hasAnalyzed && (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

                    {/* TOTAL */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Total Gaps
                                </p>

                                <p className="text-2xl font-bold text-gray-900 mt-2">
                                    {summary.total}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Identified skills
                                </p>

                            </div>

                            <div className="p-2.5 bg-indigo-50 rounded-xl">
                                <Target
                                    size={18}
                                    className="text-indigo-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* CRITICAL */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                                    Critical
                                </p>

                                <p className="text-2xl font-bold text-red-700 mt-2">
                                    {summary.critical}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Immediate attention
                                </p>

                            </div>

                            <div className="p-2.5 bg-red-50 rounded-xl">
                                <AlertTriangle
                                    size={18}
                                    className="text-red-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* HIGH */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                                    High
                                </p>

                                <p className="text-2xl font-bold text-orange-700 mt-2">
                                    {summary.high}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Needs attention
                                </p>

                            </div>

                            <div className="p-2.5 bg-orange-50 rounded-xl">
                                <TrendingUp
                                    size={18}
                                    className="text-orange-600"
                                />
                            </div>

                        </div>

                    </div>

                    {/* RESOLVED */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                                    Resolved
                                </p>

                                <p className="text-2xl font-bold text-green-700 mt-2">
                                    {summary.resolved}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Completed gaps
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

                    {/* AVG SCORE */}

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Avg. Gap Score
                                </p>

                                <p className="text-2xl font-bold text-indigo-600 mt-2">
                                    {
                                        summary.averageGap
                                    }
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Across all gaps
                                </p>

                            </div>

                            <div className="p-2.5 bg-indigo-50 rounded-xl">
                                <Activity
                                    size={18}
                                    className="text-indigo-600"
                                />
                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* =================================================
                FILTERS
            ================================================= */}

            {hasAnalyzed &&
                results.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div>

                                <h3 className="font-semibold text-gray-900">
                                    Skill Gap Details
                                </h3>

                                <p className="text-xs text-gray-400 mt-1">
                                    Filter gaps by severity to
                                    prioritize employee development.
                                </p>

                            </div>

                            <div className="flex items-center gap-2 flex-wrap">

                                {[
                                    ["ALL", "All"],
                                    [
                                        "CRITICAL",
                                        "Critical",
                                    ],
                                    ["HIGH", "High"],
                                    [
                                        "MEDIUM",
                                        "Medium",
                                    ],
                                    ["LOW", "Low"],
                                ].map(
                                    ([
                                        value,
                                        label,
                                    ]) => (
                                        <button
                                            key={
                                                value
                                            }
                                            onClick={() =>
                                                setSeverityFilter(
                                                    value
                                                )
                                            }
                                            className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${severityFilter ===
                                                    value
                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    )
                                )}

                            </div>

                        </div>

                    </div>
                )}

            {/* =================================================
                NO GAPS
            ================================================= */}

            {hasAnalyzed &&
                results.length === 0 && (
                    <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-12 text-center">

                        <div className="w-14 h-14 mx-auto bg-green-50 rounded-2xl flex items-center justify-center">
                            <CheckCircle2
                                size={28}
                                className="text-green-600"
                            />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mt-4">
                            No Skill Gaps Found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                            {selectedUser?.fullName} currently
                            meets the required skill levels defined
                            by their competency framework.
                        </p>

                    </div>
                )}

            {/* =================================================
                RESULTS TABLE
            ================================================= */}

            {hasAnalyzed &&
                results.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">

                            <div>

                                <h3 className="font-semibold text-gray-900">
                                    Employee Skill Gaps
                                </h3>

                                <p className="text-xs text-gray-400 mt-1">
                                    Competencies requiring
                                    improvement or attention.
                                </p>

                            </div>

                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600">
                                {
                                    filteredResults.length
                                }{" "}
                                {filteredResults.length ===
                                    1
                                    ? "gap"
                                    : "gaps"}
                            </span>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[900px] text-sm">

                                <thead className="bg-gray-50/80 border-b border-gray-100">

                                    <tr>

                                        <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                            Skill
                                        </th>

                                        <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                            Required Level
                                        </th>

                                        <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                            Current Level
                                        </th>

                                        <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                            Gap Score
                                        </th>

                                        <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                            Severity
                                        </th>

                                        <th className="text-left px-5 py-3 font-semibold text-gray-500">
                                            Status
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredResults.length ===
                                        0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-5 py-12 text-center"
                                            >
                                                <div className="w-11 h-11 mx-auto bg-gray-50 rounded-xl flex items-center justify-center">
                                                    <Search
                                                        size={
                                                            20
                                                        }
                                                        className="text-gray-400"
                                                    />
                                                </div>

                                                <p className="text-sm font-semibold text-gray-600 mt-3">
                                                    No matching gaps
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    Try selecting a
                                                    different severity
                                                    filter.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredResults.map(
                                            (r) => {
                                                const severity =
                                                    SEVERITY_STYLES[
                                                    r.severity
                                                    ] ||
                                                    {
                                                        badge: "bg-gray-50 text-gray-600 border-gray-100",
                                                        dot: "bg-gray-400",
                                                    };

                                                return (
                                                    <tr
                                                        key={
                                                            r.skillGapId
                                                        }
                                                        className="border-b border-gray-50 last:border-0 hover:bg-indigo-50/20 transition"
                                                    >

                                                        {/* SKILL */}

                                                        <td className="px-5 py-4">

                                                            <div className="flex items-center gap-3">

                                                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                                                    <AlertTriangle
                                                                        size={
                                                                            17
                                                                        }
                                                                        className="text-indigo-600"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <p className="font-semibold text-gray-800">
                                                                        {
                                                                            r.skillName
                                                                        }
                                                                    </p>

                                                                    <p className="text-xs text-gray-400 mt-0.5">
                                                                        Skill
                                                                        competency
                                                                    </p>
                                                                </div>

                                                            </div>

                                                        </td>

                                                        {/* REQUIRED */}

                                                        <td className="px-5 py-4">

                                                            <span className="inline-flex px-2.5 py-1 rounded-lg bg-gray-50 text-gray-700 text-xs font-medium">
                                                                {
                                                                    r.requiredLevel
                                                                }
                                                            </span>

                                                        </td>

                                                        {/* CURRENT */}

                                                        <td className="px-5 py-4">

                                                            <span className="inline-flex px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-medium">
                                                                {
                                                                    r.currentLevel
                                                                }
                                                            </span>

                                                        </td>

                                                        {/* GAP SCORE */}

                                                        <td className="px-5 py-4">

                                                            <div className="flex items-center gap-2">

                                                                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-indigo-500 rounded-full transition-all"
                                                                        style={{
                                                                            width: `${Math.min(
                                                                                (Number(r.gapScore || 0) / 5) * 100,
                                                                                100
                                                                            )}%`,
                                                                        }}
                                                                    />
                                                                </div>

                                                                <span className="font-semibold text-gray-800 whitespace-nowrap">
                                                                    {r.gapScore} / 5
                                                                </span>

                                                            </div>

                                                        </td>

                                                        {/* SEVERITY */}

                                                        <td className="px-5 py-4">

                                                            <span
                                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${severity.badge}`}
                                                            >
                                                                <span
                                                                    className={`w-1.5 h-1.5 rounded-full ${severity.dot}`}
                                                                />

                                                                {
                                                                    r.severity
                                                                }
                                                            </span>

                                                        </td>

                                                        {/* STATUS */}

                                                        <td className="px-5 py-4">

                                                            <span
                                                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[
                                                                    r.status
                                                                    ] ||
                                                                    "bg-gray-100 text-gray-600"
                                                                    }`}
                                                            >
                                                                {
                                                                    r.status
                                                                }
                                                            </span>

                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>
                )}

            {/* =================================================
                INITIAL STATE
            ================================================= */}

            {!hasAnalyzed &&
                !analyzing &&
                selectedUser === null && (
                    <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center">

                        <div className="w-14 h-14 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center">
                            <Search
                                size={26}
                                className="text-indigo-500"
                            />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mt-4">
                            Select an employee to begin
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                            Search for an employee above and run
                            an analysis to identify their skill
                            gaps and development priorities.
                        </p>

                    </div>
                )}

            {/* =================================================
                ANALYZING STATE
            ================================================= */}

            {analyzing && (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">

                    <div className="w-12 h-12 mx-auto bg-indigo-50 rounded-xl flex items-center justify-center">

                        <Loader2
                            size={25}
                            className="text-indigo-600 animate-spin"
                        />

                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mt-4">
                        Analyzing skills...
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                        Comparing the employee's current skills
                        with the required competency levels.
                    </p>

                </div>
            )}

        </div>
    );
}