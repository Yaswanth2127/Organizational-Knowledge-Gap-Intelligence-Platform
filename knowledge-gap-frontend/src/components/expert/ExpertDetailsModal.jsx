import React from "react";
import { Mail, Star, User, X, Award } from "lucide-react";

const ExpertDetailsModal = ({
    expert,
    open,
    onClose,
}) => {
    if (!open || !expert) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50
                       bg-black/50
                       flex items-center
                       justify-center
                       p-4"
            onClick={onClose}
        >
            <div
                className="bg-white
                           w-full max-w-lg
                           rounded-2xl
                           shadow-xl
                           overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center
                                justify-between
                                px-6 py-5
                                border-b"
                >
                    <div className="flex items-center gap-3">

                        <div className="p-3
                                        bg-indigo-100
                                        rounded-xl">
                            <User
                                size={24}
                                className="text-indigo-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl
                                           font-bold
                                           text-gray-900">
                                Expert Details
                            </h2>

                            <p className="text-sm
                                          text-gray-500">
                                Expertise information
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2
                                   rounded-lg
                                   text-gray-500
                                   hover:bg-gray-100"
                    >
                        <X size={21} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                    {/* Employee */}
                    <div>
                        <p className="text-sm
                                      text-gray-500">
                            Employee
                        </p>

                        <p className="text-lg
                                      font-semibold
                                      text-gray-900
                                      mt-1">
                            {expert.employeeName}
                        </p>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">

                        <Mail
                            size={19}
                            className="text-gray-400"
                        />

                        <div>
                            <p className="text-xs
                                          text-gray-500">
                                Email
                            </p>

                            <p className="text-gray-800">
                                {expert.employeeEmail}
                            </p>
                        </div>

                    </div>

                    {/* Skill */}
                    <div className="flex items-center gap-3">

                        <Award
                            size={20}
                            className="text-indigo-500"
                        />

                        <div>
                            <p className="text-xs
                                          text-gray-500">
                                Skill
                            </p>

                            <p className="font-medium
                                          text-gray-800">
                                {expert.skillName}
                            </p>
                        </div>

                    </div>

                    {/* Expertise Level */}
                    <div className="flex items-center gap-3">

                        <Star
                            size={20}
                            className="text-yellow-500"
                        />

                        <div>
                            <p className="text-xs
                                          text-gray-500">
                                Expertise Level
                            </p>

                            <span className="inline-block
                                             mt-1
                                             px-3 py-1
                                             rounded-full
                                             bg-indigo-100
                                             text-indigo-700
                                             text-sm
                                             font-semibold">
                                {expert.expertiseLevel}
                            </span>
                        </div>

                    </div>

                    {/* Endorsements */}
                    <div className="flex items-center
                                    justify-between
                                    bg-gray-50
                                    rounded-xl
                                    p-4">

                        <div className="flex items-center gap-3">

                            <Star
                                size={20}
                                className="text-yellow-500"
                            />

                            <div>
                                <p className="text-sm
                                              text-gray-500">
                                    Endorsements
                                </p>

                                <p className="text-lg
                                              font-bold
                                              text-gray-900">
                                    {expert.endorsementCount ?? 0}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Created Date */}
                    {expert.createdAt && (
                        <div>
                            <p className="text-xs
                                          text-gray-500">
                                Listed Since
                            </p>

                            <p className="text-sm
                                          text-gray-700
                                          mt-1">
                                {new Date(
                                    expert.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="px-6 py-4
                                border-t
                                flex justify-end">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5
                                   rounded-lg
                                   bg-gray-100
                                   text-gray-700
                                   hover:bg-gray-200"
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ExpertDetailsModal;