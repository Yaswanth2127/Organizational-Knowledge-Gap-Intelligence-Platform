import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Award, X } from "lucide-react";
import {
    getAllCertifications,
    createCertification,
    updateCertification,
    deleteCertification,
} from "../services/certificationService";
import { getAllUsers } from "../services/userService";
import { getAllSkills } from "../services/skillService";

const emptyForm = {
    userId: "",
    skillId: "",
    name: "",
    issuer: "",
    credentialUrl: "",
    issueDate: "",
    expiryDate: "",
};

export default function CertificationManagement() {
    const [certifications, setCertifications] = useState([]);
    const [users, setUsers] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [file, setFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchAll = () => {
        setLoading(true);
        setError("");
        Promise.all([getAllCertifications(), getAllUsers(), getAllSkills()])
            .then(([certs, userList, skillList]) => {
                setCertifications(certs);
                setUsers(userList);
                setSkills(skillList);
            })
            .catch((err) =>
                setError(err.response?.data?.message || "Failed to load certifications.")
            )
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const userName = (id) =>
        users.find((u) => u.id === id)?.fullName || "-";

    const skillName = (id) =>
        skills.find((s) => s.id === id)?.name || "-";

    const openAddModal = () => {
        setEditingId(null);
        setForm(emptyForm);
        setFile(null);
        setShowModal(true);
    };

    const openEditModal = (cert) => {
        setEditingId(cert.id);
        setForm({
            userId: cert.userId || "",
            skillId: cert.skillId || "",
            name: cert.name || "",
            issuer: cert.issuer || "",
            credentialUrl: cert.credentialUrl || "",
            issueDate: cert.issueDate || "",
            expiryDate: cert.expiryDate || "",
        });
        setFile(null);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0] || null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.userId || !form.skillId || !form.name.trim()) return;
        setSaving(true);
        try {
            const payload = {
                userId: Number(form.userId),
                skillId: Number(form.skillId),
                name: form.name,
                issuer: form.issuer,
                credentialUrl: form.credentialUrl,
                issueDate: form.issueDate || null,
                expiryDate: form.expiryDate || null,
            };
            if (editingId) {
                await updateCertification(editingId, payload, file);
            } else {
                await createCertification(payload, file);
            }
            setShowModal(false);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || "Save failed.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this certification?")) return;
        try {
            await deleteCertification(id);
            fetchAll();
        } catch (err) {
            setError(err.response?.data?.message || "Delete failed.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage employee certifications and credentials
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition shadow-sm"
                >
                    <Plus size={16} /> Add Certification
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
            ) : certifications.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
                    No certifications yet. Add one to get started.
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Employee</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Skill</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Issuer</th>
                                <th className="text-left px-5 py-3 font-semibold text-gray-600">Expiry</th>
                                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certifications.map((cert) => (
                                <tr key={cert.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 bg-indigo-50 rounded-lg">
                                                <Award className="text-indigo-600" size={15} />
                                            </div>
                                            <span className="font-semibold text-gray-800">{cert.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">{userName(cert.userId)}</td>
                                    <td className="px-5 py-3 text-gray-600">{skillName(cert.skillId)}</td>
                                    <td className="px-5 py-3 text-gray-600">{cert.issuer || "-"}</td>
                                    <td className="px-5 py-3 text-gray-600">{cert.expiryDate || "-"}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openEditModal(cert)}
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cert.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                {editingId ? "Edit Certification" : "Add Certification"}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Employee
                                </label>
                                <select
                                    name="userId"
                                    value={form.userId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                >
                                    <option value="">Select employee</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>{u.fullName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Skill
                                </label>
                                <select
                                    name="skillId"
                                    value={form.skillId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                >
                                    <option value="">Select skill</option>
                                    {skills.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Certification Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. AWS Certified Developer"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Issuer
                                </label>
                                <input
                                    type="text"
                                    name="issuer"
                                    value={form.issuer}
                                    onChange={handleChange}
                                    placeholder="e.g. Amazon Web Services"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Credential URL
                                </label>
                                <input
                                    type="text"
                                    name="credentialUrl"
                                    value={form.credentialUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                        Issue Date
                                    </label>
                                    <input
                                        type="date"
                                        name="issueDate"
                                        value={form.issueDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="date"
                                        name="expiryDate"
                                        value={form.expiryDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                    Certificate File (optional)
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-600 file:text-sm file:font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition text-sm disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
