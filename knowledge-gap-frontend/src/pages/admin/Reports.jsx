import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Download,
    FileText,
    Loader2,
    Search,
    RefreshCw,
} from "lucide-react";

import {
    getAnalyticsData,
    getSkillGapsForUsers,
} from "../../services/analyticsApi";


/*
|--------------------------------------------------------------------------
| REPORT CONFIGURATION
|--------------------------------------------------------------------------
*/

const REPORTS = {

    employees: {

        title: "Employee Report",

        columns: [
            ["fullName", "Employee"],
            ["email", "Email"],
            ["departmentName", "Department"],
            ["jobRoleName", "Job Role"],
            ["isActive", "Active"],
        ],

    },


    assessments: {

        title: "Assessment Report",

        columns: [
            ["userName", "Employee"],
            ["skillName", "Skill"],
            ["title", "Assessment"],
            ["score", "Score"],
            ["passed", "Passed"],
            ["status", "Status"],
            ["assessedAt", "Assessed At"],
        ],

    },


    mentorship: {

        title: "Mentorship Report",

        columns: [
            ["mentorName", "Mentor"],
            ["menteeName", "Mentee"],
            ["skillName", "Skill"],
            ["status", "Status"],
            ["matchedAt", "Matched At"],
        ],

    },


    sessions: {

        title: "Knowledge Session Report",

        columns: [
            ["hostName", "Host"],
            ["title", "Session"],
            ["skillName", "Skill"],
            ["scheduledAt", "Scheduled At"],
            ["status", "Status"],
            ["locationLink", "Location"],
        ],

    },


    certifications: {

        title: "Certification Report",

        columns: [
            ["userName", "Employee"],
            ["name", "Certification"],
            ["issuer", "Issuer"],
            ["skillName", "Skill"],
            ["issueDate", "Issue Date"],
            ["expiryDate", "Expiry Date"],
        ],

    },


    skillGaps: {

        title: "Skill Gap Report",

        columns: [
            ["employeeName", "Employee"],
            ["skillName", "Skill"],
            ["currentLevel", "Current Level"],
            ["requiredLevel", "Required Level"],
            ["gapScore", "Gap Score"],
            ["severity", "Severity"],
            ["status", "Status"],
        ],

    },

};


/*
|--------------------------------------------------------------------------
| SAFE VALUE
|--------------------------------------------------------------------------
*/

const getValue = (
    row,
    key
) => {

    const value = row?.[key];


    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    if (
        typeof value === "boolean"
    ) {

        return value
            ? "Yes"
            : "No";

    }


    if (
        typeof value === "object"
    ) {

        if (value?.name) {
            return String(value.name);
        }

        return JSON.stringify(value);
    }


    return String(value);
};


/*
|--------------------------------------------------------------------------
| CSV EXPORT
|--------------------------------------------------------------------------
*/

const downloadCsv = (
    title,
    columns,
    rows
) => {

    const escape = (
        value
    ) => {

        return `"${String(
            value ?? ""
        ).replaceAll(
            '"',
            '""'
        )}"`;

    };


    const csv = [

        columns
            .map(
                ([, label]) =>
                    escape(label)
            )
            .join(","),

        ...rows.map(
            (row) =>
                columns
                    .map(
                        ([key]) =>
                            escape(
                                getValue(
                                    row,
                                    key
                                )
                            )
                    )
                    .join(",")
        ),

    ].join("\n");


    const blob = new Blob(
        [csv],
        {
            type:
                "text/csv;charset=utf-8;",
        }
    );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        `${title
            .toLowerCase()
            .replaceAll(
                " ",
                "-"
            )}.csv`;


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);
};


/*
|--------------------------------------------------------------------------
| REPORTS
|--------------------------------------------------------------------------
*/

export default function Reports() {

    const [data, setData] =
        useState(null);

    const [skillGaps, setSkillGaps] =
        useState([]);

    const [reportType, setReportType] =
        useState("employees");

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");


    /*
    |--------------------------------------------------------------------------
    | LOAD
    |--------------------------------------------------------------------------
    */

    const load = async (
        refresh = false
    ) => {

        try {

            if (refresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }


            setError("");


            /*
             * Main analytics/report data.
             */

            const result =
                await getAnalyticsData();


            setData(result);


            /*
             * Skill gaps.
             */

            if (
                Array.isArray(
                    result.users
                ) &&
                result.users.length > 0
            ) {

                const gaps =
                    await getSkillGapsForUsers(
                        result.users
                    );


                setSkillGaps(
                    Array.isArray(gaps)
                        ? gaps
                        : []
                );

            } else {

                setSkillGaps([]);

            }

        } catch (err) {

            console.error(
                "Reports loading error:",
                err
            );


            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load reports."
            );

        } finally {

            setLoading(false);

            setRefreshing(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | INITIAL LOAD
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        load();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | REPORT ROWS
    |--------------------------------------------------------------------------
    */

    const reportRows =
        useMemo(() => {

            if (!data) {
                return [];
            }


            /*
             * Assessment details are not loaded here because the current
             * frontend snapshot does not establish an admin
             * /api/assessments/all endpoint.
             *
             * Assessment statistics are already available on Analytics.
             */

            const source = {

                employees:
                    Array.isArray(
                        data.users
                    )
                        ? data.users
                        : [],


                assessments: [],


                mentorship:
                    Array.isArray(
                        data.mentorshipMatches
                    )
                        ? data.mentorshipMatches
                        : [],


                sessions:
                    Array.isArray(
                        data.sessions
                    )
                        ? data.sessions
                        : [],


                certifications:
                    Array.isArray(
                        data.certifications
                    )
                        ? data.certifications
                        : [],


                skillGaps:
                    Array.isArray(
                        skillGaps
                    )
                        ? skillGaps
                        : [],

            };


            return (
                source[reportType] ||
                []
            );

        }, [
            data,
            reportType,
            skillGaps,
        ]);


    /*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

    const filteredRows =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            if (!query) {
                return reportRows;
            }


            return reportRows.filter(
                (row) =>
                    Object.values(
                        row || {}
                    ).some(
                        (value) =>
                            String(
                                value ?? ""
                            )
                                .toLowerCase()
                                .includes(
                                    query
                                )
                    )
            );

        }, [
            reportRows,
            search,
        ]);


    /*
    |--------------------------------------------------------------------------
    | CURRENT CONFIG
    |--------------------------------------------------------------------------
    */

    const config =
        REPORTS[reportType];


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center">

                <Loader2
                    className="animate-spin text-indigo-600"
                    size={42}
                />

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    if (error && !data) {

        return (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">

                <p className="font-semibold">
                    Unable to load reports.
                </p>

                <p className="mt-1 text-sm">
                    {error}
                </p>

                <button
                    onClick={() => load()}
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    Try Again
                </button>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (

        <div className="space-y-6">


            {/* =========================================================
                HEADER
            ========================================================== */}

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Reports
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Generate, search and export organizational reports.
                    </p>

                    {error && (

                        <p className="mt-2 text-sm text-orange-600">
                            Some optional report data could not be loaded.
                        </p>

                    )}

                </div>


                <div className="flex gap-2">


                    {/* REFRESH */}

                    <button
                        onClick={() => load(true)}
                        disabled={refreshing}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                    >

                        <RefreshCw
                            size={17}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>


                    {/* CSV */}

                    <button
                        onClick={() =>
                            downloadCsv(
                                config.title,
                                config.columns,
                                filteredRows
                            )
                        }
                        disabled={
                            filteredRows.length === 0
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        <Download size={17} />

                        Export CSV

                    </button>

                </div>

            </div>


            {/* =========================================================
                FILTERS
            ========================================================== */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


                    {/* REPORT TYPE */}

                    <div className="md:col-span-2">

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Report
                        </label>


                        <select
                            value={reportType}
                            onChange={(event) => {

                                setReportType(
                                    event.target.value
                                );

                                setSearch("");

                            }}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500"
                        >

                            {Object.entries(
                                REPORTS
                            ).map(
                                ([
                                    key,
                                    report,
                                ]) => (

                                    <option
                                        key={key}
                                        value={key}
                                    >
                                        {report.title}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* SEARCH */}

                    <div>

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Search
                        </label>


                        <div className="relative">

                            <Search
                                size={17}
                                className="absolute left-3 top-3 text-gray-400"
                            />


                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search report..."
                                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-indigo-500"
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================================================
                ASSESSMENT INFORMATION
            ========================================================== */}

            {reportType === "assessments" && (

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">

                    <p className="font-semibold text-amber-800">
                        Assessment detail report
                    </p>

                    <p className="mt-1 text-sm text-amber-700">

                        Detailed assessment records are not available
                        through the current admin API endpoint, so this
                        table will remain empty until an assessment-list
                        endpoint is exposed by the backend.

                    </p>

                    <p className="mt-2 text-sm text-amber-700">

                        The organization-level assessment statistics are
                        already displayed on the Analytics page.

                    </p>

                </div>

            )}


            {/* =========================================================
                REPORT TABLE
            ========================================================== */}

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">


                {/* TABLE HEADER */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">

                            <FileText size={20} />

                        </div>


                        <div>

                            <h2 className="font-semibold text-gray-800">
                                {config.title}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {filteredRows.length} records
                            </p>

                        </div>

                    </div>

                </div>


                {/* TABLE */}

                <div className="overflow-x-auto">

                    <table className="min-w-full text-left text-sm">


                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">

                            <tr>

                                {config.columns.map(
                                    ([key, label]) => (

                                        <th
                                            key={key}
                                            className="whitespace-nowrap px-5 py-4"
                                        >
                                            {label}
                                        </th>

                                    )
                                )}

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-gray-100">


                            {filteredRows.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={
                                            config
                                                .columns
                                                .length
                                        }
                                        className="px-5 py-12 text-center text-gray-500"
                                    >

                                        No records found.

                                    </td>

                                </tr>

                            ) : (

                                filteredRows.map(
                                    (
                                        row,
                                        index
                                    ) => (

                                        <tr
                                            key={
                                                row?.id ??
                                                index
                                            }
                                            className="hover:bg-gray-50"
                                        >

                                            {config.columns.map(
                                                ([key]) => (

                                                    <td
                                                        key={key}
                                                        className="whitespace-nowrap px-5 py-4 text-gray-700"
                                                    >

                                                        {getValue(
                                                            row,
                                                            key
                                                        ) || "-"}

                                                    </td>

                                                )
                                            )}

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


        </div>

    );

}