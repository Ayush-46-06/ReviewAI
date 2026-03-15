import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/[0.02] backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
          <div className="text-2xl font-bold tracking-tighter italic bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Revica AI
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Reach out to us anytime — we're here to help.
          </p>
        </div>

        {/* Animated Email Card */}
        <div className="flex justify-center">
          <div className="group relative">
            {/* Glow ring animation */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            {/* Email card */}
            <a
              href="mailto:support@revica.ai"
              className="relative flex items-center gap-4 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-6 hover:bg-white/[0.08] transition-all duration-300"
            >
              {/* Email icon */}
              <svg
                className="w-8 h-8 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>

              {/* Email address */}
              <span className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                support@revica.ai
              </span>

              {/* Copy hint (optional) */}
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition">
                click to send an email
              </span>
            </a>
          </div>
        </div>

        {/* Optional small note */}
        <p className="mt-16 text-center text-sm text-slate-500">
          We typically respond within 24 hours.
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-sm text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          © {new Date().getFullYear()} Revica AI by Athenura. All rights reserved.
        </div>
      </footer>
    </div>
  );
}