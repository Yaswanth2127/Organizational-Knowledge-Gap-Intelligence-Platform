import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { getSkillGapForUser } from "../../services/skillGapService";
import { getAllUsers } from '../../services/userService';

const SEVERITY_STYLES = {
    CRITICAL: 'bg-red-50 text-red-700',
    HIGH: 'bg-orange-50 text-orange-700',
    MEDIUM: 'bg-yellow-50 text-yellow-700',
    LOW: 'bg-green-50 text-green-700',
};

export default function SkillGapManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [results, setResults] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState('');
    const [hasAnalyzed, setHasAnalyzed] = useState(false);

  useEffect(() => {
    getAllUsers()
        .then((users) => {
            console.log(users);
            setUsers(users);
        })
        .catch((err) =>
            setError(err.response?.data?.message || "Failed to load users.")
        )
        .finally(() => setLoadingUsers(false));
}, []);

    const handleAnalyze = async () => {
        if (!selectedUserId) return;
        setAnalyzing(true);
        setError('');
        try {
            const data = await getSkillGapForUser(selectedUserId);
                setResults(data);
                setHasAnalyzed(data.length > 0);
        } catch (err) {
            setError(err.response?.data?.message || 'Analysis failed.');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Select an employee and run an analysis to identify skill gaps against their competency framework
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                <div className="flex-1">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                        Employee
                    </label>
                    <select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        disabled={loadingUsers}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    >
                        <option value="">
                            {loadingUsers ? 'Loading users...' : 'Select employee'}
                        </option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>{u.fullName} ({u.email})</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleAnalyze}
                    disabled={!selectedUserId || analyzing}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <Search size={16} /> {analyzing ? 'Analyzing...' : 'Analyze'}
                </button>
            </div>

            {hasAnalyzed && (
                results.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                        No skill gaps found for this employee.
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Skill</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Required Level</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Current Level</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Gap Score</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Severity</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r) => (
                                    <tr key={r.skillGapId} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <div className="p-2 bg-indigo-50 rounded-lg">
                                                    <AlertTriangle className="text-indigo-600" size={15} />
                                                </div>
                                                <span className="font-semibold text-gray-800">{r.skillName}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-gray-600">{r.requiredLevel}</td>
                                        <td className="px-5 py-3 text-gray-600">{r.currentLevel}</td>
                                        <td className="px-5 py-3 text-gray-600">{r.gapScore}</td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${SEVERITY_STYLES[r.severity] || 'bg-gray-100 text-gray-500'}`}>
                                                {r.severity}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-600">{r.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </div>
    );
}