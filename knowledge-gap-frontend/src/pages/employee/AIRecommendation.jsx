import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { getAIRecommendation } from '../../services/aiRecommendationService';

export default function AIRecommendation() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userId = localStorage.getItem('userId');

    const fetchRecommendation = () => {
        setLoading(true);
        setError('');
        getAIRecommendation()
            .then(setData)
            .catch((err) =>
                setError(err.response?.data?.message || 'Failed to generate recommendations.')
            )
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (userId) fetchRecommendation();
        else {
            setError('No logged-in user found.');
            setLoading(false);
        }
    }, [userId]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">AI Course Recommendations</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Personalized learning path generated from your current skill gaps
                    </p>
                </div>
                <button
                    onClick={fetchRecommendation}
                    disabled={loading}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-sm disabled:opacity-60"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Regenerate
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Generating recommendations...</p>
            ) : data ? (
                <div className="space-y-6">
                    {data.summary && (
                        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-xl">
                            <div className="flex gap-3 items-start">
                                <Sparkles className="text-indigo-400 shrink-0 mt-1" size={22} />
                                <p className="text-sm leading-relaxed">{data.summary}</p>
                            </div>
                        </div>
                    )}

                    {(!data.recommendations || data.recommendations.length === 0) ? (
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                            No recommendations available right now.
                        </div>
                    ) : (
                        data.recommendations.map((rec, idx) => (
                            <div key={idx} className="space-y-3">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                                    {rec.skillName}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {rec.courses.map((rc, cIdx) => (
                                        <div
                                            key={cIdx}
                                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:border-indigo-100 transition"
                                        >
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                                                    {rc.course?.title}
                                                </h3>
                                                <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                    #{rc.sequenceOrder}
                                                </span>
                                            </div>
                                            {rc.course?.description && (
                                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                                                    {rc.course.description}
                                                </p>
                                            )}
                                            <div className="flex flex-wrap gap-1.5 text-[11px]">
                                                {rc.course?.difficulty && (
                                                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium">
                                                        {rc.course.difficulty}
                                                    </span>
                                                )}
                                                {rc.course?.durationHours && (
                                                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium">
                                                        {rc.course.durationHours}h
                                                    </span>
                                                )}
                                                {rc.relevanceScore != null && (
                                                    <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-700 font-medium">
                                                        {Math.round(rc.relevanceScore * 100)}% match
                                                    </span>
                                                )}
                                            </div>
                                            {rc.reason && (
                                                <p className="text-xs text-gray-400 italic leading-relaxed border-t border-gray-50 pt-2">
                                                    {rc.reason}
                                                </p>
                                            )}
                                            {rc.course?.externalUrl && (
                                                <a
                                                    href={rc.course.externalUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-auto flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 border border-indigo-100 hover:bg-indigo-50 rounded-lg py-2 transition"
                                                >
                                                    View Course <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : null}
        </div>
    );
}
