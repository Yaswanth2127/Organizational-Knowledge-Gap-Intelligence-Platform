import React from "react";

const NotificationSkeleton = () => {

    return (

        <div className="space-y-8 animate-pulse">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <div className="h-8 w-56 bg-gray-200 rounded-lg" />

                    <div className="h-4 w-96 bg-gray-200 rounded mt-4" />

                </div>

                <div className="h-11 w-44 bg-gray-200 rounded-xl" />

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {

                    Array.from({ length: 3 }).map((_, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                        >

                            <div className="flex justify-between">

                                <div className="space-y-4">

                                    <div className="h-4 w-32 bg-gray-200 rounded" />

                                    <div className="h-10 w-20 bg-gray-200 rounded" />

                                    <div className="h-4 w-28 bg-gray-200 rounded" />

                                </div>

                                <div className="w-16 h-16 rounded-2xl bg-gray-200" />

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Filters */}

            <div className="bg-white rounded-2xl border border-gray-100 p-5">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="h-12 bg-gray-200 rounded-xl" />

                    <div className="h-12 bg-gray-200 rounded-xl" />

                    <div className="h-12 bg-gray-200 rounded-xl" />

                </div>

            </div>

            {/* Notification Cards */}

            {

                Array.from({ length: 5 }).map((_, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                    >

                        <div className="flex justify-between">

                            <div className="flex gap-4 flex-1">

                                <div className="w-14 h-14 rounded-2xl bg-gray-200" />

                                <div className="flex-1 space-y-4">

                                    <div className="h-5 w-60 bg-gray-200 rounded" />

                                    <div className="h-4 w-full bg-gray-200 rounded" />

                                    <div className="h-4 w-3/4 bg-gray-200 rounded" />

                                    <div className="h-4 w-32 bg-gray-200 rounded" />

                                </div>

                            </div>

                            <div className="h-10 w-32 bg-gray-200 rounded-xl" />

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

export default NotificationSkeleton;