import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await registerUser(form);
    alert("Account created");
    window.location = "/";
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 font-sans">
      <div className="relative w-full max-w-md bg-[#13181f] border border-white/5 rounded-2xl p-10 shadow-2xl overflow-hidden">

        {/* Teal glow accent */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-teal-500 rounded-full blur-3xl opacity-10 pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
          Athenura
        </div>

        <h2 className="text-2xl font-bold text-slate-100 leading-snug mb-1">
          Create your <br /> company account
        </h2>
        <p className="text-slate-500 text-sm mb-8">Start managing your team in minutes</p>

        {/* Name + Company row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide">Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              className="w-full bg-[#0d1117] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide">Company Name</label>
            <input
              name="companyName"
              placeholder="Acme Inc."
              onChange={handleChange}
              className="w-full bg-[#0d1117] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide">Work Email</label>
          <input
            name="email"
            placeholder="john@acme.com"
            onChange={handleChange}
            className="w-full bg-[#0d1117] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Min. 8 characters"
            onChange={handleChange}
            className="w-full bg-[#0d1117] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 transition"
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:opacity-90 active:scale-[0.99] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150 tracking-wide"
        >
          Create Account →
        </button>

        <hr className="border-slate-800 my-6" />
        <p className="text-center text-slate-500 text-sm">
          Already have an account?{" "}
          <a href="/" className="text-teal-400 font-medium hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}