import React from "react";
import {
    Users,
    CheckCircle2,
} from "lucide-react";

const EmptyRatings = () => {

    return (

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm">

            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">

                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">

                    <Users
                        size={50}
                        className="text-indigo-600"
                    />

                </div>

                <h2 className="mt-8 text-2xl font-bold text-gray-800">

                    No Peer Reviews Available

                </h2>

                <p className="mt-4 max-w-xl text-gray-500 leading-relaxed">

                    You currently don't have any teammates assigned for peer
                    review. Once eligible reviews are assigned, they will
                    appear here.

                </p>

                <div className="mt-8 flex items-center gap-2 rounded-xl bg-green-50 px-5 py-3 border border-green-200">

                    <CheckCircle2
                        size={20}
                        className="text-green-600"
                    />

                    <span className="text-green-700 font-medium">

                        You're all caught up!

                    </span>

                </div>

            </div>

        </div>

    );

};

export default EmptyRatings;