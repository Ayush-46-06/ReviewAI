import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background glow effects (same as other pages) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/[0.02] backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
          <div className="text-2xl font-bold tracking-tighter italic bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Revica AI
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-lg">
            Last updated: March 15, 2026
          </p>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-8 text-slate-300">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p className="leading-relaxed">
              Revica AI ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, platform, and services (collectively, the "Service"). Please read this policy carefully. If you do not agree with the terms, do not access the Service.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="leading-relaxed">We may collect the following types of information:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li><span className="text-white">Personal Data:</span> Name, email address, company name, and payment information when you register or subscribe.</li>
              <li><span className="text-white">Business Data:</span> Business name, category, city, Google Review URL, services offered, and other information you provide about your business.</li>
              <li><span className="text-white">Usage Data:</span> IP address, browser type, pages visited, time spent, and other diagnostic data.</li>
              <li><span className="text-white">Cookies and Tracking:</span> We use cookies and similar technologies to enhance your experience and analyze usage.</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p className="leading-relaxed">We use the collected information to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>Provide, operate, and maintain the Service.</li>
              <li>Generate AI‑powered review replies and analytics.</li>
              <li>Process transactions and send related information.</li>
              <li>Improve, personalize, and expand the Service.</li>
              <li>Communicate with you about updates, security alerts, and support.</li>
              <li>Monitor usage and detect, prevent, or address technical issues.</li>
            </ul>
          </section>

          {/* 4. Sharing Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Sharing Your Information</h2>
            <p className="leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>With service providers who assist in operating the Service (e.g., payment processors, hosting).</li>
              <li>To comply with legal obligations or respond to lawful requests.</li>
              <li>To protect our rights, property, or safety, and that of our users.</li>
              <li>In connection with a merger, acquisition, or sale of assets – with notice to you.</li>
            </ul>
          </section>

          {/* 5. Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Security</h2>
            <p className="leading-relaxed">
              We implement industry‑standard security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          {/* 6. Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your information for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymize your data within 30 days, unless we are required to retain it for legal reasons.
            </p>
          </section>

          {/* 7. Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p className="leading-relaxed">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>Access, correct, or delete your personal data.</li>
              <li>Object to or restrict processing.</li>
              <li>Data portability.</li>
              <li>Withdraw consent at any time (where processing is based on consent).</li>
            </ul>
            <p className="mt-2">To exercise these rights, contact us at <span className="text-teal-400">support@revica.ai</span>.</p>
          </section>

          {/* 8. Cookies and Tracking */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies and Tracking</h2>
            <p className="leading-relaxed">
              We use cookies to enhance your experience. You can set your browser to refuse cookies, but some parts of the Service may not function properly. For more information, see our <span className="text-teal-400 hover:underline">Cookie Policy</span>.
            </p>
          </section>

          {/* 9. Third‑Party Links */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Third‑Party Links</h2>
            <p className="leading-relaxed">
              The Service may contain links to third‑party websites (e.g., Google). We are not responsible for their privacy practices. We encourage you to review their privacy policies.
            </p>
          </section>

          {/* 10. Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Children's Privacy</h2>
            <p className="leading-relaxed">
              The Service is not intended for individuals under 18. We do not knowingly collect information from children. If we become aware that a child has provided us with data, we will delete it.
            </p>
          </section>

          {/* 11. International Data Transfers */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. International Data Transfers</h2>
            <p className="leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We take appropriate safeguards to ensure your data is protected in accordance with this policy.
            </p>
          </section>

          {/* 12. Changes to This Policy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance.
            </p>
          </section>

          {/* 13. Contact Us */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">13. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="mt-2 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-teal-400">support@revica.ai</p>
              <p className="text-slate-400 text-sm mt-1">Revica AI by Athenura</p>
            </div>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-teal-400 hover:underline text-sm">
            ← Return to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 backdrop-blur-sm py-6">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Revica AI by Athenura. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-2 text-xs">
            <Link to="/terms" className="text-slate-400 hover:text-teal-400">Terms</Link>
            <Link to="/privacy" className="text-slate-400 hover:text-teal-400">Privacy</Link>
            <Link to="/contact" className="text-slate-400 hover:text-teal-400">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}