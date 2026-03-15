import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Completing authentication...</p>
      </div>
    </div>
  );
}