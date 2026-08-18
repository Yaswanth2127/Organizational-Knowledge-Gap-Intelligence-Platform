import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AlertTriangle,
    Award,
    BarChart3,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Loader2,
    Users,
    Handshake,
    RefreshCw,
} from "lucide-react";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    getAnalyticsData,
    getSkillGapsForUsers,
} from "../../services/analyticsApi";


/*
|--------------------------------------------------------------------------
| COLORS
|--------------------------------------------------------------------------
*/

const COLORS = [
    "#4f46e5",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
];


/*
|--------------------------------------------------------------------------
| STAT CARD
|--------------------------------------------------------------------------
*/

const StatCard = ({
    title,
    value,
    icon: Icon,
}) => {

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-800">
                        {value}
                    </p>

                </div>


                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">

                    <Icon size={24} />

                </div>

            </div>

        </div>
    );
};


/*
|--------------------------------------------------------------------------
| CHART CARD
|--------------------------------------------------------------------------
*/

const ChartCard = ({
    title,
    children,
}) => {

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-800">
                {title}
            </h2>

            <div className="h-80">

                {children}

            </div>

        </div>
    );
};


/*
|--------------------------------------------------------------------------
| ANALYTICS
|--------------------------------------------------------------------------
*/

export default function Analytics() {

    const [data, setData] = useState(null);

    const [skillGaps, setSkillGaps] = useState([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const [error, setError] = useState("");


    /*
    |--------------------------------------------------------------------------
    | LOAD DATA
    |--------------------------------------------------------------------------
    */

    const load = async (isRefresh = false) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");


            /*
             * Load main analytics data.
             */

            const result = await getAnalyticsData();

            setData(result);


            /*
             * Load skill gaps separately.
             */

            const gaps = await getSkillGapsForUsers(
                result.users
            );

            setSkillGaps(
                Array.isArray(gaps)
                    ? gaps
                    : []
            );

        } catch (err) {

            console.error(
                "Analytics loading error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load analytics."
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
    | EMPLOYEES BY DEPARTMENT
    |--------------------------------------------------------------------------
    */

    const departmentData = useMemo(() => {

        if (!data) {
            return [];
        }


        const users = Array.isArray(data.users)
            ? data.users
            : [];

        const departments = Array.isArray(data.departments)
            ? data.departments
            : [];


        return departments.map((department) => {

            const employeeCount = users.filter(
                (user) => {

                    return (
                        String(user.departmentId) ===
                        String(department.id)
                    )
                    ||
                    user.departmentName === department.name;
                }
            ).length;


            return {
                name: department.name || "Unknown",
                employees: employeeCount,
            };
        });

    }, [data]);


    /*
    |--------------------------------------------------------------------------
    | SKILL GAP SEVERITY
    |--------------------------------------------------------------------------
    */

    const gapSeverityData = useMemo(() => {

        const counts = {};


        skillGaps.forEach((gap) => {

            const severity =
                gap?.severity ||
                "NONE";


            counts[severity] =
                (counts[severity] || 0) + 1;
        });


        return Object.entries(counts).map(
            ([name, value]) => ({
                name,
                value,
            })
        );

    }, [skillGaps]);


    /*
    |--------------------------------------------------------------------------
    | KNOWLEDGE SESSION STATUS
    |--------------------------------------------------------------------------
    */

    const sessionData = useMemo(() => {

        if (!data) {
            return [];
        }


        const sessions = Array.isArray(data.sessions)
            ? data.sessions
            : [];


        const statuses = [
            "SCHEDULED",
            "ONGOING",
            "COMPLETED",
            "CANCELLED",
        ];


        return statuses.map((status) => ({

            name: status,

            count: sessions.filter(
                (session) =>
                    session?.status === status
            ).length,

        }));

    }, [data]);


    /*
    |--------------------------------------------------------------------------
    | MENTORSHIP STATUS
    |--------------------------------------------------------------------------
    */

    const mentorshipData = useMemo(() => {

        if (!data) {
            return [];
        }


        const matches =
            Array.isArray(data.mentorshipMatches)
                ? data.mentorshipMatches
                : [];


        const statuses = [
            "PENDING",
            "ACTIVE",
            "COMPLETED",
            "CANCELLED",
        ];


        return statuses.map((status) => ({

            name: status,

            count: matches.filter(
                (match) =>
                    match?.status === status
            ).length,

        }));

    }, [data]);


    /*
    |--------------------------------------------------------------------------
    | CERTIFICATIONS BY SKILL
    |--------------------------------------------------------------------------
    */

    const certificationData = useMemo(() => {

        if (!data) {
            return [];
        }


        const certifications =
            Array.isArray(data.certifications)
                ? data.certifications
                : [];


        const grouped = {};


        certifications.forEach((certification) => {

            const name =
                certification?.skillName ||
                certification?.skill?.name ||
                "Unassigned";


            grouped[name] =
                (grouped[name] || 0) + 1;

        });


        return Object.entries(grouped)

            .map(([name, count]) => ({
                name,
                count,
            }))

            .sort(
                (a, b) =>
                    b.count - a.count
            )

            .slice(0, 8);

    }, [data]);


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
                    Analytics could not be loaded.
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
    | SAFE DATA
    |--------------------------------------------------------------------------
    */

    const users =
        Array.isArray(data?.users)
            ? data.users
            : [];

    const skills =
        Array.isArray(data?.skills)
            ? data.skills
            : [];

    const certifications =
        Array.isArray(data?.certifications)
            ? data.certifications
            : [];

    const courses =
        Array.isArray(data?.courses)
            ? data.courses
            : [];

    const sessions =
        Array.isArray(data?.sessions)
            ? data.sessions
            : [];

    const mentorshipMatches =
        Array.isArray(data?.mentorshipMatches)
            ? data.mentorshipMatches
            : [];


    const stats =
        data?.assessmentStats &&
        typeof data.assessmentStats === "object"
            ? data.assessmentStats
            : {};


    /*
    |--------------------------------------------------------------------------
    | ASSESSMENT DATA
    |--------------------------------------------------------------------------
    */

    const assessmentData = [

        {
            name: "Pending",
            count: Number(
                stats.pendingAssessments || 0
            ),
        },

        {
            name: "Passed",
            count: Number(
                stats.passedAssessments || 0
            ),
        },

        {
            name: "Failed",
            count: Number(
                stats.failedAssessments || 0
            ),
        },

        {
            name: "Approved",
            count: Number(
                stats.approvedAssessments || 0
            ),
        },

        {
            name: "Rejected",
            count: Number(
                stats.rejectedAssessments || 0
            ),
        },

    ];


    /*
    |--------------------------------------------------------------------------
    | OPEN GAPS
    |--------------------------------------------------------------------------
    */

    const openSkillGaps =
        skillGaps.filter(
            (gap) =>
                gap?.status === "OPEN"
        ).length;


    /*
    |--------------------------------------------------------------------------
    | HIGH / CRITICAL GAPS
    |--------------------------------------------------------------------------
    */

    const highCriticalGaps =
        skillGaps.filter(
            (gap) =>
                ["HIGH", "CRITICAL"]
                    .includes(gap?.severity)
        ).length;


    /*
    |--------------------------------------------------------------------------
    | ACTIVE MENTORSHIPS
    |--------------------------------------------------------------------------
    */

    const activeMentorships =
        mentorshipMatches.filter(
            (match) =>
                match?.status === "ACTIVE"
        ).length;


    /*
    |--------------------------------------------------------------------------
    | PASS RATE
    |--------------------------------------------------------------------------
    */

    const passRate =
        Number(
            stats.passRate || 0
        );


    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (

        <div className="space-y-8">

            {/* =========================================================
                HEADER
            ========================================================== */}

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Analytics
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Organization-wide workforce, skill, assessment and learning insights.
                    </p>

                    {error && (
                        <p className="mt-2 text-sm text-orange-600">
                            Some optional analytics data could not be loaded.
                        </p>
                    )}

                </div>


                <button
                    onClick={() => load(true)}
                    disabled={refreshing}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
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

            </div>


            {/* =========================================================
                STAT CARDS
            ========================================================== */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Employees"
                    value={users.length}
                    icon={Users}
                />

                <StatCard
                    title="Skills"
                    value={skills.length}
                    icon={BarChart3}
                />

                <StatCard
                    title="Open Skill Gaps"
                    value={openSkillGaps}
                    icon={AlertTriangle}
                />

                <StatCard
                    title="Certifications"
                    value={certifications.length}
                    icon={Award}
                />

                <StatCard
                    title="Courses"
                    value={courses.length}
                    icon={BookOpen}
                />

                <StatCard
                    title="Knowledge Sessions"
                    value={sessions.length}
                    icon={CalendarDays}
                />

                <StatCard
                    title="Mentorship Matches"
                    value={mentorshipMatches.length}
                    icon={Handshake}
                />

                <StatCard
                    title="Assessment Pass Rate"
                    value={`${passRate.toFixed(1)}%`}
                    icon={CheckCircle2}
                />

            </div>


            {/* =========================================================
                CHARTS
            ========================================================== */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">


                {/* EMPLOYEES BY DEPARTMENT */}

                <ChartCard title="Employees by Department">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={departmentData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="employees"
                                fill="#4f46e5"
                                radius={[
                                    6,
                                    6,
                                    0,
                                    0,
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </ChartCard>


                {/* SKILL GAP SEVERITY */}

                <ChartCard title="Skill Gap Severity">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        {gapSeverityData.length > 0 ? (

                            <PieChart>

                                <Pie
                                    data={gapSeverityData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={105}
                                    label
                                >

                                    {gapSeverityData.map(
                                        (entry, index) => (

                                            <Cell
                                                key={entry.name}
                                                fill={
                                                    COLORS[
                                                        index %
                                                        COLORS.length
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        ) : (

                            <div className="flex h-full items-center justify-center text-sm text-gray-500">

                                No skill-gap data available.

                            </div>

                        )}

                    </ResponsiveContainer>

                </ChartCard>


                {/* ASSESSMENT OVERVIEW */}

                <ChartCard title="Assessment Overview">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={assessmentData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                fill="#10b981"
                                radius={[
                                    6,
                                    6,
                                    0,
                                    0,
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </ChartCard>


                {/* KNOWLEDGE SESSIONS */}

                <ChartCard title="Knowledge Session Status">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={sessionData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                fill="#8b5cf6"
                                radius={[
                                    6,
                                    6,
                                    0,
                                    0,
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </ChartCard>


                {/* MENTORSHIP */}

                <ChartCard title="Mentorship Match Status">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={mentorshipData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                fill="#f59e0b"
                                radius={[
                                    6,
                                    6,
                                    0,
                                    0,
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </ChartCard>


                {/* CERTIFICATIONS */}

                <ChartCard title="Certifications by Skill">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        {certificationData.length > 0 ? (

                            <BarChart
                                data={certificationData}
                                layout="vertical"
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    type="number"
                                    allowDecimals={false}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={120}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="count"
                                    fill="#06b6d4"
                                    radius={[
                                        0,
                                        6,
                                        6,
                                        0,
                                    ]}
                                />

                            </BarChart>

                        ) : (

                            <div className="flex h-full items-center justify-center text-sm text-gray-500">

                                No certification data available.

                            </div>

                        )}

                    </ResponsiveContainer>

                </ChartCard>

            </div>


            {/* =========================================================
                ADDITIONAL METRICS
            ========================================================== */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">


                <div className="rounded-2xl bg-indigo-50 p-6">

                    <p className="text-sm text-gray-600">
                        Average Assessment Score
                    </p>

                    <p className="mt-2 text-3xl font-bold text-indigo-700">

                        {Number(
                            stats.averageScore || 0
                        ).toFixed(1)}

                    </p>

                </div>


                <div className="rounded-2xl bg-orange-50 p-6">

                    <p className="text-sm text-gray-600">
                        High/Critical Skill Gaps
                    </p>

                    <p className="mt-2 text-3xl font-bold text-orange-700">

                        {highCriticalGaps}

                    </p>

                </div>


                <div className="rounded-2xl bg-emerald-50 p-6">

                    <p className="text-sm text-gray-600">
                        Active Mentorships
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-700">

                        {activeMentorships}

                    </p>

                </div>

            </div>

        </div>
    );
}