import { useState } from "react";
import { loginUser } from "../api/authApi";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await loginUser({
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    window.location = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-10 flex flex-col gap-6">

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Company Login
          </h2>
          <p className="text-sm text-slate-400">Sign in to your workspace</p>
        </div>

        <div className="flex flex-col gap-4">

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all duration-200"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all duration-200"
          />

        </div>
        <p className="text-center text-slate-500 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-teal-400 font-medium hover:underline">Sign up</a>
        </p>
        <button
          onClick={handleLogin}
          className="w-full bg-teal-500 hover:bg-teal-400 active:scale-[0.98] text-white font-medium text-sm py-3 rounded-xl transition-all duration-200 shadow-lg shadow-teal-500/20"
        >
          Login
        </button>

      </div>

    </div>
  );
}