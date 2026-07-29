import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccess() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const token = searchParams.get("token");
        const role = searchParams.get("role");
        const userId = searchParams.get("userId");
        const fullName = searchParams.get("fullName");

        if (!token) {
            navigate("/login");
            return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        localStorage.setItem("fullName", fullName);

        navigate("/dashboard");

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h2 className="text-xl font-semibold">
                Signing you in...
            </h2>
        </div>
    );
}