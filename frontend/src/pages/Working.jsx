import { useEffect, useState } from "react";

export default function RevicaAIOverview() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const screenshots = [
    {
      id: 1,
      title: "Create Account",
      description: "Sign up with your details",
      image: "/Work1 (1).png",
      alt: "Sign up form",
    },
    {
      id: 2,
      title: "Sign In",
      description: "Access your workspace",
      image: "/Work1 (2).png",
      alt: "Login form",
    },
    {
      id: 3,
      title: "Dashboard (Empty)",
      description: "No businesses yet",
      image: "/Work1 (3).png",
      alt: "Dashboard with empty state",
    },
    {
      id: 4,
      title: "Add Business",
      description: "Empty form",
      image: "/Work1 (4).png",
      alt: "Add business form",
    },
    {
      id: 5,
      title: "Add Business (Filled)",
      description: "Example: Amazon",
      image: "/Work1 (5).png",
      alt: "Filled add business form",
    },
    {
      id: 6,
      title: "Review Link Generated",
      description: "QR code and shareable link",
      image: "/Work1 (6).png",
      alt: "Success screen with review link",
    },
    {
      id: 7,
      title: "Dashboard with Business",
      description: "Amazon card with QR download",
      image: "/Work1 (7).png",
      alt: "Dashboard showing a business",
    },
  ];

  const totalSteps = screenshots.length;

  const goToNext = () => {
    setCurrentStep((prev) => (prev + 1) % totalSteps);
  };

  const goToPrev = () => {
    setCurrentStep((prev) => (prev - 1 + totalSteps) % totalSteps);
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      {/* Background glow effects (same as dashboard) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/[0.02] backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold tracking-tighter italic bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Revica AI
            </span>
            <span className="text-xs text-slate-500 font-medium px-2 py-1 border border-white/10 rounded-full">
              ATHENURA
            </span>
          </div>
          <div className="text-sm text-slate-400 hidden md:block">
            Intelligent workspace analytics • Real‑time insights • Secure by design
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Revica AI Platform Overview
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Step through the journey of our intelligent review management system.
          </p>
        </div>

        {/* Horizontal stepper (graphic line with steps) */}
        <div className="relative mb-12 max-w-3xl mx-auto">
          {/* The dashed line behind circles */}
          <div className="absolute top-5 left-0 w-full h-0.5">
            <div className="w-full h-full border-t-2 border-dashed border-teal-400/40"
                 style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            </div>
          </div>
          {/* Step circles - clickable */}
          <div className="relative flex justify-between">
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToStep(idx)}
                className="flex flex-col items-center group focus:outline-none"
                aria-label={`Go to step ${idx + 1}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm transition-all duration-300 ${
                    idx === currentStep
                      ? "bg-gradient-to-br from-teal-400 to-emerald-400 scale-110 shadow-[0_0_20px_rgba(20,184,166,0.8)]"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`text-xs mt-2 transition-colors duration-300 ${
                    idx === currentStep ? "text-teal-400" : "text-slate-500"
                  }`}
                >
                  Step {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Current screenshot card (larger, for desktop images) */}
        <div className="relative max-w-4xl mx-auto">
          {/* Card with current screenshot */}
          <div
            key={screenshots[currentStep].id}
            className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]"
          >
            {/* Inner glow overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Screenshot image – larger container */}
            <div className="relative h-96 bg-white/5 flex items-center justify-center border-b border-white/5">
              <img
                src={screenshots[currentStep].image}
                alt={screenshots[currentStep].alt}
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x400/0a0f1a/2dd4bf?text=${encodeURIComponent(
                    screenshots[currentStep].title
                  )}`;
                }}
              />
              {/* Step number badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded text-sm font-bold text-teal-400 border border-teal-500/30">
                Step {currentStep + 1} of {totalSteps}
              </div>
            </div>

            {/* Card footer */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{screenshots[currentStep].title}</h3>
              <p className="text-sm text-slate-400">{screenshots[currentStep].description}</p>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-500/0 group-hover:border-teal-500/40 rounded-tl-2xl transition-all duration-300" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-500/0 group-hover:border-teal-500/40 rounded-tr-2xl transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-500/0 group-hover:border-teal-500/40 rounded-bl-2xl transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-500/0 group-hover:border-teal-500/40 rounded-br-2xl transition-all duration-300" />
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-teal-500/20 hover:border-teal-500/50 transition-all duration-300 focus:outline-none"
            aria-label="Previous step"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-teal-500/20 hover:border-teal-500/50 transition-all duration-300 focus:outline-none"
            aria-label="Next step"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Optional: dot indicators for mobile (but we already have stepper) */}
        <div className="flex justify-center mt-8 md:hidden">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToStep(idx)}
              className={`w-2 h-2 mx-1 rounded-full transition-all ${
                idx === currentStep ? "w-6 bg-teal-400" : "bg-white/20"
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
            <span className="text-teal-400">✨</span>
            <span className="text-sm text-slate-300">
              All screens match the provided designs – ready for your images.
            </span>
            <span className="text-teal-400">✨</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>© 2026 Revica AI by Athenura. All rights reserved.</p>
          <p className="text-xs mt-2 text-slate-600">Intelligent workspace analytics • Real‑time insights • Secure by design</p>
        </div>
      </footer>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .group:hover {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}