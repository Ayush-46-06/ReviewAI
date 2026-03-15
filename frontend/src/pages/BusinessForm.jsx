import { useState } from "react";
import { createBusiness } from "../api/businessApi";

export default function AddBusiness() {
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    city: "",
    googleReviewUrl: "",
    services: ""
  });
  const [createdBusiness, setCreatedBusiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {
    // Basic validation
    if (!form.businessName || !form.googleReviewUrl) {
      setError("Business Name and Google Review URL are required");
      return;
    }
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    try {
      const res = await createBusiness(form, token);
      setCreatedBusiness(res.data);
    } catch (err) {
      console.error("Failed to create business:", err);
      setError(err.response?.data?.message || "Failed to create business. Please try again.");
    } finally {
      setLoading(false);
    }
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

      {/* Right side - Add Business Form */}
      <div className="md:w-1/2 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-500/5 rounded-full blur-[120px]" />

        <div className="w-full max-w-md z-10">
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl p-10 flex flex-col gap-8 transition-all duration-500 hover:border-white/20">

            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-black drop-shadow-sm">
                Add <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Business</span>
              </h2>
              <p className="text-slate-300 font-medium">
                Register your business to start collecting reviews
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border-l-4 border-red-500 rounded-r-lg px-4 py-3 text-sm text-red-400 animate-in fade-in slide-in-from-top-2">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            {createdBusiness ? (
              // Success state
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Business Created!</h3>
                  <p className="text-slate-400 text-sm">Share this QR code or link to collect reviews</p>
                </div>

                {/* QR Code */}
                <div className="bg-white/5 border border-white/10 rounded-xl">
                  <img
                    src={createdBusiness.qrCode}
                    alt="Review QR Code"
                    className="w-44 h-44 rounded-lg"
                  />
                </div>

                {/* Review Link */}
                <div className="w-full">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 text-left">Review Link</p>
                  <a
                    href={createdBusiness.reviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-sm text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 transition-colors px-4 py-3 rounded-xl border border-teal-500/20 truncate"
                  >
                    {createdBusiness.reviewLink}
                  </a>
                </div>

                <button
                  onClick={() => setCreatedBusiness(null)}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-teal-500/20 transition"
                >
                  + Add Another Business
                </button>
              </div>
            ) : (
              // Form
              <div className="flex flex-col ">
                {/* Business Name */}
                <div className="group relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Business Name"
                    value={form.businessName}
                    onChange={handleChange}
                    className="w-full bg-white border border-black rounded-2xl pl-12 pr-4 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                  />
                </div>

                {/* Category */}
                <div className="group relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category (e.g., Restaurant, Salon)"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full bg-white border border-black rounded-2xl pl-12 pr-4 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                  />
                </div>

                {/* City */}
                <div className="group relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full bg-white border border-black rounded-2xl pl-12 pr-4 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                  />
                </div>

                {/* Google Review URL */}
                <div className="group relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </span>
                  <input
                    type="url"
                    name="googleReviewUrl"
                    placeholder="Google Review URL"
                    value={form.googleReviewUrl}
                    onChange={handleChange}
                    className="w-full bg-white border border-black rounded-2xl pl-12 pr-4 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                  />
                </div>

                {/* Services */}
                <div className="group relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-400 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="services"
                    placeholder="Services (comma separated)"
                    value={form.services}
                    onChange={handleChange}
                    className="w-full bg-white border border-black rounded-2xl pl-12 pr-4 py-4 text-sm text-black placeholder-gray-500 outline-none focus:border-teal-500 transition-all duration-300"
                  />
                </div>

                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 active:scale-[0.98] text-white font-bold text-sm py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_20px_rgba(20,184,166,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Business"
                  )}
                </button>
              </div>
            )}

            {/* Link back to dashboard (optional) */}
            <p className="text-center text-slate-500 text-sm">
              <a href="/dashboard" className="text-teal-400 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
                ← Back to Dashboard
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}