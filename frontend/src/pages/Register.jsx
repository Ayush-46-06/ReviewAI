import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !companyName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await registerUser({ name, companyName, email, password });
      // Optionally redirect to login page after success
      window.location = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = "http://localhost:5000/api/auth/google";    // Or call a function from authApi, e.g. loginWithGoogle()
    // Implement your Google OAuth flow here
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left side - Branding (identical to Login) */}
      <div className="md:w-1/2 bg-black flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-600 rounded-full mix-blend-screen filter blur-[120px] animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 text-center md:text-left max-w-md">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter italic">
            Revica AI
          </h1>
          <p className="text-xl text-slate-400 font-light flex items-center justify-center md:justify-start gap-2">
            <span>Powered by</span>
            <span className="font-semibold text-teal-400">ATHENURA</span>
          </p>
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full mx-auto md:mx-0"></div>
          <p className="mt-8 text-slate-400 text-sm leading-relaxed tracking-wide">
            Intelligent workspace analytics • Real‑time insights • Secure by design
          </p>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="md:w-1/2 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-500/5 rounded-full blur-[120px]" />

        <div className="w-full max-w-md z-10">
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl p-10 flex flex-col gap-8 transition-all duration-500 hover:border-white/20">

            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-black drop-shadow-sm">
                Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">account</span>
              </h2>
              <p className="text-slate-300 font-medium">
                Start managing your team in minutes
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border-l-4 border-red-500 rounded-r-lg px-4 py-3 text-sm text-red-400 animate-in fade-in slide-in-from-top-2">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="group relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-black rounded-2xl pl-12 pr-4 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                />
              </div>

              {/* Company Name */}
              <div className="group relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-white border border-black rounded-2xl pl-12 pr-4 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="group relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-black rounded-2xl pl-12 pr-4 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                />
              </div>

              {/* Password with visibility toggle */}
              <div className="group relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min. 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-black rounded-2xl pl-12 pr-12 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-400 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 active:scale-[0.98] text-white font-bold text-sm py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_20px_rgba(20,184,166,0.2)] disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            {/* Divider with "or" */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-black"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-500">or continue with</span>
              <div className="flex-grow border-t border-black"></div>
            </div>

            {/* Google Sign-Up Button */}
            <button
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-2xl px-4 py-4 text-sm font-medium text-gray-700 transition-all duration-300 active:scale-[0.98] shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>

            <p className="text-center text-slate-500 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-teal-400 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}