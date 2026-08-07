import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {

    const navigate = useNavigate();

    const handleBackToDashboard = () => {

        const role = localStorage.getItem("role");

        switch (role) {

            case "SYS_ADMIN":
                navigate("/admin/dashboard");
                break;

            case "HR_SPECIALIST":
                navigate("/hr/dashboard");
                break;

            case "EMPLOYEE":
                navigate("/employee/dashboard");
                break;

            default:
                navigate("/login");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">

            <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 flex flex-col items-center">

                {/* Icon */}

                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 mb-6 animate-bounce">

                    <Compass
                        size={48}
                        strokeWidth={1.5}
                    />

                </div>

                {/* Error */}

                <h1 className="text-6xl font-black text-slate-900 tracking-tight mb-2">

                    404

                </h1>

                <h2 className="text-xl font-bold text-gray-800 mb-3">

                    Page Not Found

                </h2>

                <p className="text-sm text-gray-500 mb-8 max-w-sm leading-relaxed">

                    Oops! The page you are looking for doesn't exist or may have been moved.

                </p>

                {/* Back Button */}

                <button

                    onClick={handleBackToDashboard}

                    className="
                        w-full
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        font-medium
                        py-2.5
                        px-4
                        rounded-xl
                        transition
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-sm
                        shadow-md
                        shadow-indigo-200
                    "

                >

                    <ArrowLeft size={16} />

                    Back to Dashboard

                </button>

            </div>

        </div>

    );

}