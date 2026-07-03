import React, { useState } from 'react';
import { Award, CheckCircle, Info, Star, Save } from 'lucide-react';

export default function SkillAssessment() {
    // Milestone 1 capability criteria according to organization standards
    const [assessments, setAssessments] = useState([
        { id: 1, skill: "React.js / Frontend Architecture", category: "Technical", rating: 0, description: "Component state isolation, hooks ecosystem, and virtual DOM mapping mechanics." },
        { id: 2, skill: "Spring Boot Microservices", category: "Technical", rating: 0, description: "REST controller patterns, data persistence mapping, and transactional safety." },
        { id: 3, skill: "PostgreSQL Database Design", category: "Database", rating: 0, description: "Schema setups, structural aggregations, and normalization indices rules." },
        { id: 4, skill: "Tailwind CSS & Core UI", category: "UI/UX", rating: 0, description: "Responsive breakpoints layout wrappers, layout metrics, and component themes." }
    ]);

    const [isSaved, setIsSaved] = useState(false);

    // Proficiency level metric breakdown
    const proficiencyLevels = [
        { score: 1, label: "Unaware" },
        { score: 2, label: "Beginner" },
        { score: 3, label: "Intermediate" },
        { score: 4, label: "Advanced" },
        { score: 5, label: "Expert" }
    ];

    const handleRateSkill = (id, ratingScore) => {
        setAssessments(prev => prev.map(item => item.id === id ? { ...item, rating: ratingScore } : item));
        setIsSaved(false);
    };

    const handleSaveAssessment = (e) => {
        e.preventDefault();
        setIsSaved(true);
    };

    return (
        <div className="space-y-6 font-sans max-w-4xl mx-auto p-2 sm:p-4">
            {/* Context Notice Board */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-xl">
                <div className="flex gap-3 items-start">
                    <Award className="text-indigo-400 shrink-0 mt-1" size={24} />
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black tracking-tight">Skill Onboarding Self-Assessment</h1>
                        <p className="text-indigo-200 text-xs sm:text-sm mt-1">
                            Evaluate your core competence baselines. Your proficiency matrix maps directly into organization-wide gap metrics profiles.
                        </p>
                    </div>
                </div>
            </div>

            {/* Success Banner Feedback Popup */}
            {isSaved && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2.5 text-sm font-semibold">
                    <CheckCircle size={18} className="text-emerald-600" />
                    Baseline self-assessment successfully logged. Gap index aggregates recalculated!
                </div>
            )}

            {/* Main Evaluation Core Interactive Grid */}
            <form onSubmit={handleSaveAssessment} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {assessments.map((item) => (
                        <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 hover:border-indigo-100 transition duration-300">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 inline-block">
                                        {item.category}
                                    </span>
                                    <h3 className="font-bold text-gray-800 text-base mt-1.5">{item.skill}</h3>
                                </div>

                                {/* Dynamic Status Badging */}
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${item.rating === 0 ? 'bg-amber-50/50 text-amber-600 border-amber-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                    }`}>
                                    {item.rating === 0 ? "Pending Evaluation" : proficiencyLevels.find(l => l.score === item.rating)?.label}
                                </span>
                            </div>

                            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 flex gap-2">
                                <Info size={14} className="text-gray-400 shrink-0 mt-0.5" />
                                {item.description}
                            </p>

                            {/* Scoring Metric Interactive Block */}
                            <div className="pt-2 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Assign Proficiency Rating:</span>
                                <div className="flex flex-wrap items-center gap-2">
                                    {proficiencyLevels.map((lvl) => (
                                        <button
                                            key={lvl.score}
                                            type="button"
                                            onClick={() => handleRateSkill(item.id, lvl.score)}
                                            className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${item.rating === lvl.score
                                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-100 scale-105'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                                }`}
                                        >
                                            <Star size={12} fill={item.rating === lvl.score ? "currentColor" : "none"} />
                                            {lvl.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submission Pipeline Trigger */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-indigo-100 mt-4"
                >
                    <Save size={16} /> Save Competency Inventory Profile
                </button>
            </form>
        </div>
    );
}