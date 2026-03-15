import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import StarRating from "../components/StarRating";
import ReviewList from "../components/ReviewList";
import { generateReviews } from "../api/api";

export default function ReviewPage() {
  const { id } = useParams();

  const [business, setBusiness] = useState(null);
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const isGenerateDisabled = !stars || loading || reviews.length > 0;
  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await axios.get(`/api/business/${id}`);
      setBusiness(res.data);
    };
    fetchBusiness();
  }, [id]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateReviews(stars, business._id);
      setReviews(data);
    } catch (error) {
      console.error("Error generating reviews", error);
      alert("Failed to generate reviews. Check console.");
    }
    setLoading(false);
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400 tracking-wide">Loading business…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header with branding */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter italic bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Revica AI
            </span>
            <span className="text-xs text-slate-500 font-medium px-2 py-1 border border-white/10 rounded-full">
              ATHENURA
            </span>
          </div>
          <a
            href="/"
            className="text-sm text-slate-300 hover:text-teal-400 transition"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Two‑column layout on desktop */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left column – Business info + Rating */}
          <div className="space-y-6">
            {/* Business intro card */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Leave a review for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                  {business.businessName}
                </span>
              </h1>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {business.category}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {business.city}
                </span>
              </div>
              {business.services?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {business.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-slate-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Step 1: Rating */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Rate your experience
                </h3>
              </div>
              <StarRating stars={stars} setStars={setStars} />
            </div>
            {/* Step 2: Generate your review */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Generate your review
                </h3>
              </div>

              {/* Determine if button should be disabled */}
              {(() => {
                const isGenerateDisabled = !stars || loading || reviews.length > 0;
                return (
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerateDisabled}
                    className={`w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2
          ${isGenerateDisabled
                        ? "bg-white/5 text-slate-500 cursor-not-allowed border border-white/10"
                        : "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 active:scale-[0.98] shadow-lg shadow-teal-500/20"
                      }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating…
                      </>
                    ) : (
                      <>
                        <span>✦ Generate Review</span>
                      </>
                    )}
                  </button>
                );
              })()}

              {!stars && (
                <p className="text-xs text-slate-500 text-center mt-3">
                  Please select a star rating first
                </p>
              )}
            </div>
          </div>

          {/* Right column – Generate + Results */}
          <div className="space-y-6">

            {/* Step 3: Choose review */}
            {reviews.length > 0 && (
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Choose your review
                  </h3>
                </div>
                <ReviewList
                  reviews={reviews}
                  stars={stars}
                  googleLink={business.googleReviewUrl}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer note */}
      <footer className="relative z-10 border-t border-white/5 backdrop-blur-sm py-6 text-center text-xs text-slate-600">
        Powered by <span className="text-teal-400 font-semibold">ATHENURA</span> • AI‑generated reviews
      </footer>
    </div>
  );
}