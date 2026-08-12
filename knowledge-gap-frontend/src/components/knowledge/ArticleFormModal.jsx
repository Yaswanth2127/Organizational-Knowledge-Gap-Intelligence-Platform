import React, { useEffect, useState } from "react";
import { X, FileText } from "lucide-react";
import SkillSearchSelect from "./SkillSearchSelect";

const ArticleFormModal = ({
    open,
    article = null,
    skills = [],
    loading = false,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        skillId: "",
        title: "",
        content: "",
        resourceUrl: "",
    });

    const isEditMode = Boolean(article);

    useEffect(() => {
        if (!open) return;

        if (article) {
            setFormData({
                skillId: article.skillId || "",
                title: article.title || "",
                content: article.content || "",
                resourceUrl: article.resourceUrl || "",
            });
        } else {
            setFormData({
                skillId: "",
                title: "",
                content: "",
                resourceUrl: "",
            });
        }
    }, [open, article]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.skillId) {
            alert("Please select a skill.");
            return;
        }

        if (!formData.title.trim()) {
            alert("Please enter an article title.");
            return;
        }

        if (!formData.content.trim()) {
            alert("Please enter article content.");
            return;
        }

        onSubmit({
            skillId: Number(formData.skillId),
            title: formData.title.trim(),
            content: formData.content.trim(),
            resourceUrl: formData.resourceUrl.trim(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <FileText
                                size={22}
                                className="text-indigo-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {isEditMode
                                    ? "Edit Knowledge Article"
                                    : "Create Knowledge Article"}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {isEditMode
                                    ? "Update your knowledge article."
                                    : "Share your knowledge with other employees."}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <div className="p-6 space-y-6">

                        {/* Skill */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Skill *
                            </label>

                            <SkillSearchSelect
                                skills={skills}
                                value={formData.skillId}
                                onChange={(skillId) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        skillId,
                                    }))
                                }
                                disabled={loading}
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Article Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                disabled={loading}
                                required
                                maxLength={200}
                                placeholder="Enter article title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                                           disabled:bg-gray-100"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Content *
                            </label>

                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                disabled={loading}
                                required
                                rows={10}
                                placeholder="Write your knowledge article..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                           resize-none focus:outline-none focus:ring-2
                                           focus:ring-indigo-500 disabled:bg-gray-100"
                            />
                        </div>

                        {/* Resource URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Resource URL
                                <span className="font-normal text-gray-400 ml-1">
                                    (Optional)
                                </span>
                            </label>

                            <input
                                type="url"
                                name="resourceUrl"
                                value={formData.resourceUrl}
                                onChange={handleChange}
                                disabled={loading}
                                placeholder="https://example.com/resource"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                                           disabled:bg-gray-100"
                            />
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t px-6 py-4">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-5 py-2.5 rounded-xl border border-gray-300
                                       text-gray-700 hover:bg-gray-100
                                       disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600
                                       text-white font-semibold hover:bg-indigo-700
                                       disabled:opacity-60"
                        >
                            {loading
                                ? isEditMode
                                    ? "Updating..."
                                    : "Publishing..."
                                : isEditMode
                                    ? "Update Article"
                                    : "Publish Article"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArticleFormModal;