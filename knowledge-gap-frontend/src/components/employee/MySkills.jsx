import React, { useMemo, useState } from "react";
import {
    Award,
    Search,
    Filter,
    CheckCircle2,
    AlertTriangle,
    XCircle
} from "lucide-react";

export default function MySkills({ skills }) {

    const [search, setSearch] = useState("");

    const filteredSkills = useMemo(() => {

        return skills.filter((skill) =>
            skill.skill.toLowerCase().includes(search.toLowerCase())
        );

    }, [skills, search]);

    const getStatus = (gap) => {

        if (gap === "Completed") {

            return {
                icon: CheckCircle2,
                text: "Ready",
                badge: "bg-green-100 text-green-700"
            };

        }

        if (gap === "Missing") {

            return {
                icon: XCircle,
                text: "Missing",
                badge: "bg-red-100 text-red-700"
            };

        }

        return {
            icon: AlertTriangle,
            text: "Needs Improvement",
            badge: "bg-yellow-100 text-yellow-700"
        };

    };

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8 overflow-hidden">

            {/* ===============================
                    Header
            =============================== */}

            <div className="px-8 py-6 border-b bg-gray-50 flex flex-col lg:flex-row justify-between lg:items-center gap-5">

                <div>

                    <div className="flex items-center gap-3">

                        <Award
                            size={28}
                            className="text-indigo-600"
                        />

                        <h2 className="text-2xl font-bold text-gray-800">

                            My Skills

                        </h2>

                    </div>

                    <p className="text-gray-500 mt-2">

                        Compare your current proficiency with your assigned competency framework.

                    </p>

                </div>

                {/* Search */}

                <div className="flex gap-3">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-3.5 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search skill..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-64"
                        />

                    </div>

                    <button className="border rounded-xl px-4 hover:bg-gray-50 transition">

                        <Filter size={20} />

                    </button>

                </div>

            </div>

            {/* ===============================
                    Table
            =============================== */}

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left px-6 py-4">

                                Skill

                            </th>

                            <th className="text-left px-6 py-4">

                                Current Level

                            </th>

                            <th className="text-left px-6 py-4">

                                Required Level

                            </th>

                            <th className="text-left px-6 py-4">

                                Progress

                            </th>

                            <th className="text-left px-6 py-4">

                                Status

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredSkills.map((skill, index) => {

                                const status = getStatus(skill.gap);

                                const StatusIcon = status.icon;

                                return (

                                    <tr
                                        key={index}
                                        className="border-b last:border-none hover:bg-indigo-50 transition"
                                    >

                                        {/* Skill */}

                                        <td className="px-6 py-5">

                                            <div className="font-semibold text-gray-800">

                                                {skill.skill}

                                            </div>

                                        </td>

                                        {/* Current */}

                                        <td className="px-6 py-5">

                                            {skill.current}

                                        </td>

                                        {/* Required */}

                                        <td className="px-6 py-5">

                                            {skill.required}

                                        </td>

                                        {/* Progress */}

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-4">

                                                <div className="w-44 h-3 bg-gray-200 rounded-full overflow-hidden">

                                                    <div
                                                        className="bg-indigo-600 h-full rounded-full"
                                                        style={{
                                                            width: `${skill.progress}%`
                                                        }}
                                                    />

                                                </div>

                                                <span className="font-semibold text-gray-700">

                                                    {skill.progress}%

                                                </span>

                                            </div>

                                        </td>

                                        {/* Status */}

                                        <td className="px-6 py-5">

                                            <span
                                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold ${status.badge}`}
                                            >

                                                <StatusIcon size={16} />

                                                {status.text}

                                            </span>

                                        </td>

                                    </tr>

                                );

                            })

                        }

                    </tbody>

                </table>

            </div>

            {/* ===============================
                    Footer
            =============================== */}

            <div className="px-8 py-4 bg-gray-50 text-sm text-gray-500 flex justify-between">

                <span>

                    Total Skills : {filteredSkills.length}

                </span>

                <span>

                    Last Updated : Today

                </span>

            </div>

        </div>

    );

}