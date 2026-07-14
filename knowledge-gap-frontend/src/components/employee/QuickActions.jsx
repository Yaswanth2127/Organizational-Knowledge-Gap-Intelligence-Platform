import React from "react";
import {
    User,
    Award,
    GraduationCap,
    ClipboardCheck,
    BookOpen,
    FileText,
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "My Profile",
            description: "View and update your profile.",
            icon: User,
            color: "bg-indigo-100 text-indigo-600",
            route: "/profile"
        },

        {
            title: "My Skills",
            description: "View your current skills.",
            icon: Award,
            color: "bg-green-100 text-green-600",
            route: "/employee/skills"
        },

        {
            title: "Certifications",
            description: "View earned certifications.",
            icon: GraduationCap,
            color: "bg-purple-100 text-purple-600",
            route: "/employee/certifications"
        },

        {
            title: "Assessments",
            description: "Take pending assessments.",
            icon: ClipboardCheck,
            color: "bg-orange-100 text-orange-600",
            route: "/employee/assessments"
        },

        {
            title: "Learning Path",
            description: "Continue your learning journey.",
            icon: BookOpen,
            color: "bg-blue-100 text-blue-600",
            route: "/employee/learning"
        },

        {
            title: "Training Requests",
            description: "Request new training programs.",
            icon: FileText,
            color: "bg-pink-100 text-pink-600",
            route: "/employee/training-request"
        }

    ];

    return (

        <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8">

            {/* ============================
                    Header
            ============================ */}

            <div className="flex justify-between items-center p-8 border-b">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                        Productivity Hub

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Quickly access your most frequently used features.

                    </p>

                </div>

            </div>

            {/* ============================
                    Cards
            ============================ */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 p-8">

                {

                    actions.map((action,index)=>{

                        const Icon = action.icon;

                        return(

                            <button

                                key={index}

                                onClick={()=>navigate(action.route)}

                                className="text-left border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition duration-300 group"

                            >

                                <div className="flex justify-between items-start">

                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${action.color}`}>

                                        <Icon size={30}/>

                                    </div>

                                    <ArrowRight

                                        size={20}

                                        className="text-gray-400 group-hover:text-indigo-600 transition"

                                    />

                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mt-6">

                                    {action.title}

                                </h3>

                                <p className="text-gray-500 mt-3 leading-relaxed">

                                    {action.description}

                                </p>

                            </button>

                        )

                    })

                }

            </div>

            {/* ============================
                    Footer
            ============================ */}

            <div className="bg-indigo-50 rounded-b-3xl border-t px-8 py-6">

                <p className="text-gray-700">

                    <strong>Tip:</strong> Use these shortcuts to quickly navigate to your profile, skills, learning activities, assessments, and training resources.

                </p>

            </div>

        </div>

    );

}