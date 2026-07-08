
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Building,
    Briefcase,
    Image,
    Save,
    ArrowLeft
} from "lucide-react";

import api from "../services/api";

export default function EditProfile() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        phoneNumber: "",

        profileImageUrl: "",

        departmentName: "",

        jobRoleName: ""

    });

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const response = await api.get(`/api/users/${userId}`);

            setFormData({

                fullName: response.data.fullName || "",

                email: response.data.email || "",

                phoneNumber: response.data.phoneNumber || "",

                profileImageUrl: response.data.profileImageUrl || "",

                departmentName: response.data.departmentName || "",

                jobRoleName: response.data.jobRoleName || ""

            });

        } catch (error) {

            console.error(error);

            alert("Unable to load profile.");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const userId = localStorage.getItem("userId");

            await api.put(`/api/users/${userId}`, {

                fullName: formData.fullName,

                phoneNumber: formData.phoneNumber,

                profileImageUrl: formData.profileImageUrl

            });

            alert("Profile Updated Successfully.");

            navigate("/profile");

        }

        catch (error) {

            console.error(error);

            alert("Unable to update profile.");

        }

        finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <div className="text-lg font-semibold text-gray-600">

                    Loading Profile...

                </div>

            </div>

        );

    }
    return (

<div className="min-h-screen bg-gray-50 py-8 px-4">

    <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

            <div className="bg-indigo-600 px-8 py-6 text-white">

                <div className="flex items-center gap-4">

                    <div className="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow-lg">

                        {formData.fullName
                            ? formData.fullName.charAt(0).toUpperCase()
                            : "U"}

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold">
                            Edit Profile
                        </h1>

                        <p className="text-indigo-100 mt-1">
                            Update your personal information
                        </p>

                    </div>

                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="p-8 space-y-8"
            >

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Full Name

                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Email

                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type="email"
                                value={formData.email}
                                disabled
                                className="w-full border border-gray-200 bg-gray-100 rounded-xl pl-10 pr-4 py-3 cursor-not-allowed"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Phone Number

                        </label>

                        <div className="relative">

                            <Phone
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Department

                        </label>

                        <div className="relative">

                            <Building
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type="text"
                                value={formData.departmentName}
                                disabled
                                className="w-full border border-gray-200 bg-gray-100 rounded-xl pl-10 pr-4 py-3 cursor-not-allowed"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Job Role

                        </label>

                        <div className="relative">

                            <Briefcase
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type="text"
                                value={formData.jobRoleName}
                                disabled
                                className="w-full border border-gray-200 bg-gray-100 rounded-xl pl-10 pr-4 py-3 cursor-not-allowed"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">

                            Profile Image URL

                        </label>

                        <div className="relative">

                            <Image
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type="text"
                                name="profileImageUrl"
                                value={formData.profileImageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/profile.jpg"
                                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                    </div>

                </div>
                                <div className="border-t border-gray-200 pt-6">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        <div className="flex items-center gap-4">

                            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden">

                                {formData.profileImageUrl ? (

                                    <img
                                        src={formData.profileImageUrl}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />

                                ) : (

                                    <span className="text-white text-3xl font-bold">

                                        {formData.fullName
                                            ? formData.fullName.charAt(0).toUpperCase()
                                            : "U"}

                                    </span>

                                )}

                            </div>

                            <div>

                                <p className="font-semibold text-gray-800">
                                    Preview
                                </p>

                                <p className="text-sm text-gray-500">
                                    This is how your profile picture will appear.
                                </p>

                            </div>

                        </div>

                        <div className="flex gap-3">

                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                            >
                                <ArrowLeft size={18} />

                                Cancel

                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition disabled:opacity-60"
                            >

                                <Save size={18} />

                                {saving ? "Saving..." : "Save Changes"}

                            </button>

                        </div>

                    </div>

                </div>

            </form>

        </div>

    </div>

</div>

);

}