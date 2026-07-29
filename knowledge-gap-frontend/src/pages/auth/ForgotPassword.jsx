import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';

import { sendPasswordResetOTP } from '../../services/authService';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your registered email address.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await sendPasswordResetOTP(email);

            // Carry the email forward to the reset page via router state
            navigate('/reset-password', { state: { email } });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to send reset code. Please check the email and try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Forgot Password
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Enter your corporate email and we'll send you a code to reset your password.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                            Corporate Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md shadow-indigo-200 disabled:opacity-60"
                    >
                        {loading ? 'Sending Code...' : 'Send Reset Code'} <ArrowRight size={16} />
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6 flex items-center justify-center gap-1.5">
                    <ArrowLeft size={14} />
                    <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
                        Back to Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
