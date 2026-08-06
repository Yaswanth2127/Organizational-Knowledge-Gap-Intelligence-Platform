import React from "react";
import {
    CalendarDays,
    Trophy,
    ArrowRight,
    RotateCcw,
    Eye,
    CheckCircle2,
    Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const AssessmentCard = ({ assessment }) => {
    const navigate = useNavigate();

    const handleAction = () => {
        switch (assessment.status) {
            case "PENDING":
                navigate(`/assessment/take/${assessment.id}`);
                break;

            case "FAILED":
                // Employee can create another assessment
                navigate("/assessment/history");
                break;


            case "PASSED":
            case "APPROVED":
            case "REJECTED":
                navigate(`/assessment/history`);
                break;

            default:
                break;
        }
    };

    const getButton = () => {
        switch (assessment.status) {
            case "PENDING":
                return {
                    label: "Take Assessment",
                    icon: ArrowRight,
                    className:
                        "bg-indigo-600 hover:bg-indigo-700 text-white",
                };

            case "FAILED":
                return {
                    label: "View History",
                    icon: Eye,
                    className:
                        "bg-gray-100 hover:bg-gray-200 text-gray-700",
                };

            default:
                return {
                    label: "View",
                    icon: Eye,
                    className:
                        "bg-gray-100 hover:bg-gray-200 text-gray-700",
                };
        }
    };

    const button = getButton();
    const ButtonIcon = button.icon;

    const getResult = () => {
        switch (assessment.status) {
            case "PENDING":
                return {
                    text: "Not Attempted",
                    color: "text-yellow-600",
                };
            case "PASSED":
            case "APPROVED":
                return {
                    text: "Passed",
                    color: "text-green-600",
                };
            case "FAILED":
            case "REJECTED":
                return {
                    text: "Failed",
                    color: "text-red-600",
                };
            default:
                return {
                    text: "--",
                    color: "text-gray-600",
                };
        }
    };

    const result = getResult();

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">

            <div className="p-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div>

                        <div className="flex items-center gap-3">

                            <h2 className="text-xl font-bold text-gray-900">
                                {assessment.skillName}
                            </h2>

                            <StatusBadge status={assessment.status} />

                        </div>

                        <p className="text-gray-500 mt-2">
                            {assessment.title}
                        </p>

                    </div>

                    <button
                        onClick={handleAction}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl transition ${button.className}`}
                    >
                        <ButtonIcon size={18} />
                        {button.label}
                    </button>

                </div>

                <div className="grid md:grid-cols-4 gap-5 mt-8">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <Trophy
                                size={20}
                                className="text-indigo-600"
                            />
                        </div>

                        <div>

                            <p className="text-xs uppercase text-gray-400">
                                Score
                            </p>

                            <p className="font-semibold text-gray-900">
                                {assessment.score
                                    ? `${assessment.score}%`
                                    : "--"}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                            <CheckCircle2
                                size={20}
                                className="text-green-600"
                            />
                        </div>

                        <div>

                            <p className="text-xs uppercase text-gray-400">
                                Result
                            </p>

                            <p className={`font-semibold ${result.color}`}>
                                {result.text}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">
                            <Clock3
                                size={20}
                                className="text-yellow-600"
                            />
                        </div>

                        <div>

                            <p className="text-xs uppercase text-gray-400">
                                Approved By
                            </p>

                            <p className="font-semibold text-gray-900">
                                {assessment.approvedByName ??
                                    "Pending"}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                            <CalendarDays
                                size={20}
                                className="text-blue-600"
                            />
                        </div>

                        <div>

                            <p className="text-xs uppercase text-gray-400">
                                Assessed On
                            </p>

                            <p className="font-semibold text-gray-900">
                                {assessment.assessedAt
                                    ? new Date(
                                        assessment.assessedAt
                                    ).toLocaleDateString()
                                    : "--"}
                            </p>

                        </div>

                    </div>

                </div>

                {assessment.remarks && (
                    <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">

                        <p className="text-sm font-semibold text-gray-700">
                            Manager Remarks
                        </p>

                        <p className="text-gray-600 mt-2">
                            {assessment.remarks}
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
};

export default AssessmentCard;