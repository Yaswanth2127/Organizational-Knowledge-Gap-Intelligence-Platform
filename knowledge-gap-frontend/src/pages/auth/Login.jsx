import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    ArrowRight,
    BarChart3,
    BookOpen,
    Users,
    Target,
    GraduationCap,
    Network,
    TrendingUp,
} from "lucide-react";

import { loginUser } from "../../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please fill in all mandatory fields.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await loginUser(
                formData.email,
                formData.password
            );

            console.log("Login response:", res.data);

            localStorage.setItem("activeDashboard", "EMPLOYEE");

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "userId",
                res.data.userId
            );

            localStorage.setItem(
                "fullName",
                res.data.fullName
            );

            localStorage.setItem(
                "roles",
                JSON.stringify(res.data.roles || [])
            );

            // Centralized role-based navigation
            navigate("/dashboard");

        } catch (err) {
            console.error("Login failed:", err);

            setError(
                err.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#071b5c] via-[#253eae] to-[#8b6bea]">

            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            {/* Large gradient glow */}

            <div className="absolute -top-72 left-[28%] w-[750px] h-[650px] rounded-full bg-violet-400/30 blur-3xl" />

            <div className="absolute -bottom-80 right-[-100px] w-[700px] h-[700px] rounded-full bg-blue-400/20 blur-3xl" />

            <div className="absolute top-[-100px] right-[-100px] w-[320px] h-[320px] rounded-full bg-purple-300/20 blur-3xl" />

            {/* Subtle grid */}

            <div
                className="absolute inset-0 opacity-[0.045]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                }}
            />

            {/* =====================================================
                DECORATIVE DOTS - LEFT
            ====================================================== */}

            <div className="absolute left-8 top-36 hidden lg:grid grid-cols-5 gap-4 opacity-30">

                {Array.from({ length: 25 }).map((_, index) => (
                    <div
                        key={index}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-200"
                    />
                ))}

            </div>

            {/* =====================================================
                DECORATIVE NETWORK - RIGHT
            ====================================================== */}

            <div className="absolute right-0 bottom-0 hidden lg:block w-[520px] h-[500px] opacity-40">

                {/* Lines */}

                <div className="absolute w-[250px] h-px bg-blue-200/40 rotate-[18deg] top-[180px] left-[100px]" />

                <div className="absolute w-[220px] h-px bg-blue-200/40 -rotate-[24deg] top-[240px] left-[190px]" />

                <div className="absolute w-[190px] h-px bg-blue-200/40 rotate-[45deg] top-[300px] left-[80px]" />

                <div className="absolute w-[250px] h-px bg-blue-200/40 -rotate-[42deg] top-[340px] left-[150px]" />

                {/* Nodes */}

                <div className="absolute top-[130px] left-[250px] w-20 h-20 rounded-full border-2 border-blue-200/60 bg-indigo-500/20 backdrop-blur-sm flex items-center justify-center">
                    <GraduationCap
                        size={32}
                        className="text-blue-100"
                    />
                </div>

                <div className="absolute top-[220px] left-[80px] w-16 h-16 rounded-full border-2 border-blue-200/50 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                    <Users
                        size={26}
                        className="text-blue-100"
                    />
                </div>

                <div className="absolute top-[270px] left-[380px] w-14 h-14 rounded-full border-2 border-blue-200/50 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center">
                    <Target
                        size={23}
                        className="text-blue-100"
                    />
                </div>

                <div className="absolute top-[390px] left-[290px] w-20 h-20 rounded-full border-2 border-blue-200/60 bg-indigo-500/20 backdrop-blur-sm flex items-center justify-center">
                    <BarChart3
                        size={31}
                        className="text-blue-100"
                    />
                </div>

            </div>

            {/* =====================================================
                MAIN CONTENT
            ====================================================== */}

            <div className="relative z-10 min-h-screen px-6 py-8 lg:px-12">

                {/* =================================================
                    HEADER
                ================================================== */}

                <div className="flex items-center gap-3">

                    <div className="relative w-12 h-12">

                        <div className="absolute inset-0 rounded-full border-[5px] border-blue-400/80" />

                        <div className="absolute left-[10px] bottom-[7px] w-2 h-5 bg-blue-300 rounded-t" />

                        <div className="absolute left-[17px] bottom-[7px] w-2 h-8 bg-indigo-300 rounded-t" />

                        <div className="absolute left-[24px] bottom-[7px] w-2 h-6 bg-violet-300 rounded-t" />

                        <TrendingUp
                            size={16}
                            className="absolute -top-1 right-0 text-blue-300"
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            OKGIP
                        </h1>

                        <p className="text-sm text-blue-100">
                            Gap Intelligence Platform
                        </p>

                    </div>

                </div>


                {/* =================================================
                    MAIN GRID
                ================================================== */}

                <div className="max-w-7xl mx-auto min-h-[calc(100vh-110px)] grid lg:grid-cols-[1fr_540px_1fr] gap-10 items-center">

                    {/* =================================================
                        LEFT CONTENT
                    ================================================== */}

                    <div className="hidden lg:block text-white max-w-md">

                        <h2 className="text-5xl font-extrabold leading-[1.18] tracking-tight">

                            Smarter Skills.

                            <br />

                            Smaller Gaps.

                            <br />

                            Stronger Workforce.

                        </h2>

                        <p className="mt-7 text-base leading-7 text-blue-100/90 max-w-[430px]">

                            OKGIP helps organizations identify
                            knowledge gaps, build targeted learning
                            paths, and empower employees to grow
                            their skills and drive performance.

                        </p>


                        {/* Features */}

                        <div className="mt-9 space-y-6">

                            {/* Feature 1 */}

                            <div className="flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-indigo-400/20 border border-indigo-200/20 flex items-center justify-center">

                                    <BarChart3
                                        size={25}
                                        className="text-indigo-200"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-semibold text-lg">
                                        Skill Gap Analytics
                                    </h3>

                                    <p className="text-sm text-blue-100/80 mt-1">
                                        Identify critical skill gaps
                                        across your organization.
                                    </p>

                                </div>

                            </div>


                            {/* Feature 2 */}

                            <div className="flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-indigo-400/20 border border-indigo-200/20 flex items-center justify-center">

                                    <BookOpen
                                        size={25}
                                        className="text-indigo-200"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-semibold text-lg">
                                        Learning Recommendations
                                    </h3>

                                    <p className="text-sm text-blue-100/80 mt-1">
                                        Personalized learning paths
                                        to close knowledge gaps.
                                    </p>

                                </div>

                            </div>


                            {/* Feature 3 */}

                            <div className="flex items-center gap-4">

                                <div className="w-14 h-14 rounded-full bg-indigo-400/20 border border-indigo-200/20 flex items-center justify-center">

                                    <Users
                                        size={25}
                                        className="text-indigo-200"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-semibold text-lg">
                                        Workforce Intelligence
                                    </h3>

                                    <p className="text-sm text-blue-100/80 mt-1">
                                        Data-driven insights for a
                                        more skilled workforce.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        LOGIN CARD
                    ================================================== */}

                    <div className="w-full">

                        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">

                            {/* Header */}

                            <div className="text-center mb-7">

                                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                    Welcome Back
                                </h2>

                                <p className="text-base text-slate-500 mt-3">
                                    Access your OKGIP account to continue
                                </p>

                            </div>


                            {/* Error */}

                            {error && (
                                <div className="mb-5 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-sm">
                                    {error}
                                </div>
                            )}


                            {/* =================================================
                                LOGIN FORM
                            ================================================== */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Email */}

                                <div>

                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                        Corporate Email
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@company.com"
                                            className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        />

                                    </div>

                                </div>


                                {/* Password */}

                                <div>

                                    <div className="flex justify-between items-center mb-2">

                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Password
                                        </label>

                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-indigo-600 hover:text-indigo-700"
                                        >
                                            Forgot password?
                                        </Link>

                                    </div>

                                    <div className="relative">

                                        <Lock
                                            size={20}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            className="w-full pl-12 pr-12 py-3.5 border border-slate-300 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>

                                    </div>

                                </div>


                                {/* Sign In */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-3.5 rounded-lg transition flex items-center justify-center gap-3 text-base shadow-lg shadow-indigo-300/30 disabled:opacity-60 disabled:cursor-not-allowed"
                                >

                                    {loading
                                        ? "Signing in..."
                                        : "Sign In"}

                                    {!loading && (
                                        <ArrowRight size={20} />
                                    )}

                                </button>

                            </form>


                            {/* =================================================
                                DIVIDER
                            ================================================== */}

                            <div className="relative my-7">

                                <div className="absolute inset-0 flex items-center">

                                    <div className="w-full border-t border-slate-200" />

                                </div>

                                <div className="relative flex justify-center">

                                    <span className="bg-white px-4 text-sm text-slate-400">
                                        Or continue with
                                    </span>

                                </div>

                            </div>


                            {/* =================================================
                                GOOGLE LOGIN
                            ================================================== */}

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3.5 rounded-lg transition flex items-center justify-center gap-3 text-sm"
                            >

                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                >

                                    <path
                                        fill="#4285F4"
                                        d="M21.35 12.27c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42z"
                                    />

                                    <path
                                        fill="#34A853"
                                        d="M12 21.99c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.99z"
                                    />

                                    <path
                                        fill="#FBBC05"
                                        d="M6.54 14.08a5.86 5.86 0 0 1 0-3.73V7.82H3.3a9.75 9.75 0 0 0 0 8.79l3.24-2.53z"
                                    />

                                    <path
                                        fill="#EA4335"
                                        d="M12 6.32c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.42 14.62 2.55 12 2.55a9.75 9.75 0 0 0-8.7 5.27l3.24 2.53C7.31 8.04 9.46 6.32 12 6.32z"
                                    />

                                </svg>

                                Sign in with Google

                            </button>


                            {/* Register */}

                            <p className="text-center text-sm text-slate-500 mt-7">

                                New to the platform?

                                <Link
                                    to="/register"
                                    className="text-indigo-600 font-semibold hover:text-indigo-700 ml-1"
                                >
                                    Create an account
                                </Link>

                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        RIGHT ANALYTICS
                    ================================================== */}

                    <div className="hidden lg:flex flex-col gap-8 justify-center">

                        {/* Skill Gap Card */}

                        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-5 w-full max-w-[300px] ml-auto shadow-xl">

                            <div className="flex items-center justify-between">

                                <h3 className="text-white font-semibold">
                                    Top Skill Gaps
                                </h3>

                                <Network
                                    size={18}
                                    className="text-indigo-200"
                                />

                            </div>


                            <div className="flex items-center gap-5 mt-5">

                                {/* Donut */}

                                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-300 via-violet-400 to-blue-400">

                                    <div className="absolute inset-5 rounded-full bg-indigo-500/80 backdrop-blur" />

                                </div>


                                {/* Labels */}

                                <div className="space-y-2 text-xs text-blue-50">

                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-violet-300" />
                                        Leadership
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" />
                                        Data Analysis
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-purple-200" />
                                        Communication
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-300" />
                                        Project Mgmt
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-200" />
                                        Others
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Workforce Skills */}

                        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-5 w-full max-w-[300px] ml-auto shadow-xl">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h3 className="text-white font-semibold">
                                        Workforce Skills
                                    </h3>

                                    <p className="text-[11px] text-blue-100 mt-1">
                                        Skill development trend
                                    </p>

                                </div>

                                <TrendingUp
                                    size={19}
                                    className="text-blue-200"
                                />

                            </div>


                            {/* Graph */}

                            <div className="relative h-24 mt-4">

                                <div className="absolute bottom-4 left-0 right-0 h-px bg-white/10" />

                                <div className="absolute bottom-10 left-0 right-0 h-px bg-white/5" />

                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    viewBox="0 0 280 100"
                                    preserveAspectRatio="none"
                                >

                                    <polyline
                                        points="0,75 40,65 75,70 110,55 145,60 180,45 220,48 255,25 280,10"
                                        fill="none"
                                        stroke="rgba(190,200,255,0.9)"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                </svg>

                                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-blue-100/70">

                                    <span>Jan</span>
                                    <span>Feb</span>
                                    <span>Mar</span>
                                    <span>Apr</span>
                                    <span>May</span>
                                    <span>Jun</span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;