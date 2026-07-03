
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Building, User, Mail, Lock, ShieldAlert } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '', email: '', password: '', role: 'Employee', department: 'Engineering'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Verification log pipelines
        navigate('/login');
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Onboarding Portal</h2>
                    <p className="text-sm text-gray-500 mt-2">Initialize your organizational profiling metrics</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Corporate Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={handleChange}
                                    placeholder="name@organization.com"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Secure Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                name="password"
                                required
                                onChange={handleChange}
                                placeholder="Minimum 8 characters"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Primary Business Unit</label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm appearance-none"
                                >
                                    <option>Engineering</option>
                                    <option>Data Science</option>
                                    <option>Product Management</option>
                                    <option>Human Resources</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Functional System Role</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm appearance-none"
                                >
                                    <option>Employee</option>
                                    <option>Team Lead / Manager</option>
                                    <option>HR Specialist</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 mt-2">
                        <ShieldAlert className="text-indigo-600 shrink-0 mt-0.5" size={16} />
                        <p className="text-xs text-indigo-700 leading-relaxed">
                            Upon registering, access levels will automatically map with default permissions. Verification will trigger with your admin workspace group.
                        </p>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition mt-4 text-sm shadow-md">
                        Complete Registration
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already mapped? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Sign in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;