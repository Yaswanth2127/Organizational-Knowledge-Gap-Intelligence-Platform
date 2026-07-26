import React from "react";
import {
    Target,
    AlertTriangle,
    XCircle,
    ArrowUpCircle,
    BookOpen,
    Clock,
    TrendingUp,
    ArrowRight
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";


export default function SkillGapAnalysis() {
    const [skills, setSkills] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const loadSkillGaps = async () => {
                try {
                    const token = localStorage.getItem("token");

                    const res = await api.post(
                        "/api/skill-gaps/employee/analyze"
                    );

                    setSkills(res.data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            loadSkillGaps();
        }, []);

    /* ==========================================
            Show only skills with gaps
    ========================================== */

        const gapSkills = skills
    .filter(skill => skill.status !== "RESOLVED")
    .sort((a, b) => Number(b.gapScore) - Number(a.gapScore));

    /* ==========================================
            Status
    ========================================== */

    const getStatus = (status) => {
            if (status === "OPEN") {
                return {
                    text: "Open",
                    badge: "bg-red-100 text-red-700",
                    icon: XCircle,
                };
            }

            return {
                text: "Resolved",
                badge: "bg-green-100 text-green-700",
                icon: Target,
            };
        };

    /* ==========================================
            Priority
    ========================================== */

    const getPriority = (severity) => {

            switch (severity) {

                case "HIGH":
                    return {
                        text: "High",
                        badge: "bg-red-600 text-white",
                    };

                case "MEDIUM":
                    return {
                        text: "Medium",
                        badge: "bg-orange-500 text-white",
                    };

                default:
                    return {
                        text: "Low",
                        badge: "bg-green-600 text-white",
                    };
            }
        };

    /* ==========================================
            Recommendation
    ========================================== */

    const getRecommendation = (skill) => ({
            course: `${skill.skillName} Fundamentals`,
            duration:
                skill.severity === "HIGH"
                    ? "8 Hours"
                    : "4 Hours",
            gain:
                skill.severity === "HIGH"
                    ? "+8%"
                    : "+4%",
        });

    const highPriority =
    gapSkills.filter(s => s.severity === "HIGH").length;

    const mediumPriority =
    gapSkills.filter(
        s => s.severity === "MEDIUM"
    ).length;

    const lowPriority =
    gapSkills.filter(
        s => s.severity === "LOW"
    ).length;

    if (loading) {
    return (
        <div className="p-10 text-center">
            Loading Skill Gap Analysis...
        </div>
    );
}
    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8">

            {/* ==========================================
                        Header
            ========================================== */}

            <div className="p-8 border-b">

                <div className="flex justify-between items-center">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                            Skill Gap Analysis

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Skills requiring attention based on your assigned competency framework.

                        </p>

                    </div>

                    <Target

                        size={36}

                        className="text-purple-600"

                    />

                </div>

            </div>

            {/* ==========================================
                    Summary Cards
            ========================================== */}

            <div className="grid md:grid-cols-4 gap-6 p-8 border-b bg-gray-50">

                <div className="bg-white rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">

                        Skills to Improve

                    </p>

                    <h2 className="text-4xl font-bold mt-3">

                        {gapSkills.length}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">

                        High Priority

                    </p>

                    <h2 className="text-4xl font-bold text-red-600 mt-3">

                        {highPriority}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">

                        Medium Priority

                    </p>

                    <h2 className="text-4xl font-bold text-orange-500 mt-3">

                        {mediumPriority}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl p-5 border">

                    <p className="text-gray-500 text-sm">

                        Expected Gain

                    </p>

                    <h2 className="text-4xl font-bold text-green-600 mt-3">

                        +12%

                    </h2>

                </div>

            </div>

            {/* ==========================================
                    Gap Cards
            ========================================== */}

            <div className="p-8 space-y-6">

                {

                    gapSkills.map((skill, index) => {

                        const status = getStatus(skill.status);

                        const priority = getPriority(skill.severity);

                        const recommendation =
                            getRecommendation(skill);

                        const StatusIcon = status.icon;
                        const progress = Math.max(
                            0,
                            Math.min(
                                100,
                                100 - Number(skill.gapScore) * 20
                            )
                        );

                        return (

                            <div

                                key={index}

                                className="border rounded-3xl p-7 hover:shadow-xl transition"

                            >

                                {/* Part 2 continues here */}
                                                                <div className="flex flex-col xl:flex-row justify-between gap-8">

                                    {/* ============================
                                            Left Side
                                    ============================ */}

                                    <div className="flex-1">

                                        <div className="flex items-center gap-3 flex-wrap">

                                            <h3 className="text-2xl font-bold text-gray-800">

                                                {skill.skillName}

                                            </h3>

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${priority.badge}`}
                                            >

                                                {priority.text} Priority

                                            </span>

                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6 mt-6">

                                            <div>

                                                <p className="text-sm text-gray-500">

                                                    Current Level

                                                </p>

                                                <h4 className="font-semibold text-lg mt-2">

                                                    {skill.currentLevel}

                                                </h4>

                                            </div>

                                            <div>

                                                <p className="text-sm text-gray-500">

                                                    Required Level

                                                </p>

                                                <h4 className="font-semibold text-lg mt-2">

                                                    {skill.requiredLevel}

                                                </h4>

                                            </div>

                                            <div>

                                                <p className="text-sm text-gray-500">

                                                    Status

                                                </p>

                                                <span
                                                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full mt-2 font-semibold ${status.badge}`}
                                                >

                                                    <StatusIcon size={18} />

                                                    {status.text}

                                                </span>

                                            </div>

                                        </div>

                                        {/* Progress */}

                                        <div className="mt-8">

                                            <div className="flex justify-between mb-2">

                                                <span className="text-gray-500">

                                                    Competency Progress

                                                </span>

                                                <span className="font-semibold">

                                                    {progress}%

                                                </span>

                                            </div>

                                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                                                <div

                                                    className={`h-full rounded-full
                                                    ${
                                                        progress >= 80
                                                            ? "bg-green-500"
                                                            : progress >= 50
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                    }`}

                                                    style={{
                                                        width: `${progress}%`
                                                    }}

                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* ============================
                                            Recommendation Card
                                    ============================ */}

                                    <div className="xl:w-96 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">

                                        <div className="flex items-center gap-3">

                                            <ArrowUpCircle
                                                size={24}
                                                className="text-indigo-600"
                                            />

                                            <h4 className="text-lg font-bold">

                                                Recommendation

                                            </h4>

                                        </div>

                                        <div className="mt-6 space-y-5">

                                            <div className="flex gap-3">

                                                <BookOpen
                                                    size={20}
                                                    className="text-indigo-600 mt-1"
                                                />

                                                <div>

                                                    <p className="text-sm text-gray-500">

                                                        Recommended Course

                                                    </p>

                                                    <p className="font-semibold mt-1">

                                                        {recommendation.course}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex gap-3">

                                                <Clock
                                                    size={20}
                                                    className="text-orange-500 mt-1"
                                                />

                                                <div>

                                                    <p className="text-sm text-gray-500">

                                                        Estimated Learning Time

                                                    </p>

                                                    <p className="font-semibold mt-1">

                                                        {recommendation.duration}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex gap-3">

                                                <TrendingUp
                                                    size={20}
                                                    className="text-green-600 mt-1"
                                                />

                                                <div>

                                                    <p className="text-sm text-gray-500">

                                                        Expected Competency Gain

                                                    </p>

                                                    <p className="font-semibold text-green-600 mt-1">

                                                        {recommendation.gain}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        <button
                                            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                                        >

                                            Start Learning

                                            <ArrowRight size={18} />

                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

            {/* ==========================================
                    Footer
            ========================================== */}

            <div className="bg-purple-50 border-t rounded-b-3xl px-8 py-6">

                <div className="flex items-start gap-4">

                    <Target
                        size={26}
                        className="text-purple-600 mt-1"
                    />

                    <div>

                        <h3 className="font-bold text-lg text-gray-800">

                            Knowledge Gap Insight

                        </h3>

                        <p className="text-gray-600 mt-2 leading-relaxed">

                            Prioritize <strong>High Priority</strong> skills first,
                            then complete <strong>Medium Priority</strong> skills.
                            Completing the recommended learning paths will increase
                            your competency score and prepare you for future role
                            progression.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}