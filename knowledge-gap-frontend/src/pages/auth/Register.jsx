
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Briefcase,
    Building,
    User,
    Mail,
    Lock,
    ShieldAlert
} from 'lucide-react';

import {
    sendOTP,
    verifyOTP,
    resendOTP
} from '../../services/authService';

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'Employee',
        department: 'Engineering'
    });

    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError('');
        setSuccess('');
        setLoading(true);

        try {

            // STEP 1 : SEND OTP

            if (!otpSent) {

                await sendOTP(
                    formData.fullName,
                    formData.email,
                    formData.password
                );

                setOtpSent(true);
                setSuccess("OTP sent successfully. Please check your email.");

            }

            // STEP 2 : VERIFY OTP

            else {

                await verifyOTP(formData.email, otp);

                alert("Registration successful. Please login.");

                navigate("/login");

            }

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Something went wrong."
            );

        } finally {
            setLoading(false);
        }

    };

    const handleResendOtp = async () => {

        try {

            await resendOTP(formData.email);

            setSuccess("OTP resent successfully.");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to resend OTP."
            );

        }

    };

    return (

        <div className="min-h-[85vh] flex items-center justify-center p-4 bg-gray-50">

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">

                <div className="text-center mb-6">

                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Onboarding Portal
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Initialize your organizational profiling metrics
                    </p>

                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                Full Name
                            </label>

                            <div className="relative">

                                <User
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />

                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    disabled={otpSent}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-xl"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                Corporate Email
                            </label>

                            <div className="relative">

                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    required
                                    disabled={otpSent}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-xl"
                                />

                            </div>

                        </div>

                    </div>

                    <div>

                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                            Password
                        </label>

                        <div className="relative">

                            <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />

                            <input
                                type="password"
                                name="password"
                                required
                                disabled={otpSent}
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 border rounded-xl"
                            />

                        </div>

                    </div>

                    {/* Keep your existing Department & Role UI */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                Primary Business Unit
                            </label>

                            <div className="relative">

                                <Building
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />

                                <select
                                    disabled
                                    className="w-full pl-10 pr-4 py-2 border rounded-xl bg-gray-100"
                                >
                                    <option>Engineering</option>
                
                                     <option>Data Science</option>
                                     <option>Product Management</option>
                                    <option>Human Resources</option>
                                </select>

                            </div>

                        </div>

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                Functional System Role
                            </label>

                            <div className="relative">

                                <Briefcase
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />

                                <select
                                    disabled
                                    className="w-full pl-10 pr-4 py-2 border rounded-xl bg-gray-100"
                                >
                                    <option>Employee</option>
                                </select>

                            </div>

                        </div>

                    </div>

                    {otpSent && (

                        <div>

                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                                Enter OTP
                            </label>

                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                required
                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                            />

                            <button
                                type="button"
                                onClick={handleResendOtp}
                                className="mt-2 text-indigo-600 text-sm hover:underline"
                            >
                                Resend OTP
                            </button>

                        </div>

                    )}

                    <div className="flex items-start gap-2 bg-indigo-50 p-3 rounded-xl border border-indigo-100">

                        <ShieldAlert
                            className="text-indigo-600 shrink-0 mt-0.5"
                            size={16}
                        />

                        <p className="text-xs text-indigo-700">

                            {otpSent
                                ? "Enter the OTP sent to your email to complete registration."
                                : "Click Send OTP to verify your email before creating your account."}

                        </p>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition disabled:opacity-60"
                    >

                        {loading
                            ? "Please wait..."
                            : otpSent
                                ? "Verify OTP"
                                : "Send OTP"}

                    </button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Sign in
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;