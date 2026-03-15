import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background glow effects (same as dashboard/FAQ) */}
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
            Terms and Conditions
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
              Welcome to Revica AI ("Company," "we," "our," "us"). These Terms and Conditions ("Terms") govern your use of our website, platform, and services (collectively, the "Service"). By accessing or using Revica AI, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
            </p>
          </section>

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least 18 years old to use the Service. By agreeing to these Terms, you represent and warrant that you have the legal capacity to enter into a binding agreement. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization.
            </p>
          </section>

          {/* 3. Accounts */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Accounts</h2>
            <p className="leading-relaxed">
              To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You agree to notify us immediately of any unauthorized use. We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          {/* 4. Use of Service */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Use of Service</h2>
            <p className="leading-relaxed">
              Revica AI provides AI‑powered tools to help businesses manage and generate Google reviews. You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
              <li>Use the Service to harass, abuse, or harm others.</li>
              <li>Post fake, misleading, or spam reviews.</li>
              <li>Attempt to reverse engineer or copy the AI algorithms.</li>
              <li>Use the Service in any way that violates applicable laws or regulations.</li>
            </ul>
          </section>

          {/* 5. AI‑Generated Content */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. AI‑Generated Content</h2>
            <p className="leading-relaxed">
              Our AI generates replies and suggestions based on user inputs. While we strive for accuracy, we do not guarantee that AI‑generated content is error‑free or suitable for your specific situation. You are solely responsible for reviewing and approving any content generated by the AI before publishing it.
            </p>
          </section>

          {/* 6. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p className="leading-relaxed">
              The Service, including its code, design, logos, and AI models, is owned by Revica AI and protected by intellectual property laws. You are granted a limited, non‑exclusive, non‑transferable license to use the Service for your internal business purposes. You may not copy, modify, or distribute any part of the Service without our written consent.
            </p>
          </section>

          {/* 7. User Content */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. User Content</h2>
            <p className="leading-relaxed">
              You retain ownership of any data, text, or information you submit to the Service ("User Content"). By submitting User Content, you grant us a worldwide, royalty‑free license to use, store, and process it solely to provide and improve the Service. You represent that you have all necessary rights to the User Content.
            </p>
          </section>

          {/* 8. Third‑Party Links */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Third‑Party Links</h2>
            <p className="leading-relaxed">
              The Service may contain links to third‑party websites (e.g., Google). We are not responsible for the content or practices of those sites. Your use of third‑party services is at your own risk.
            </p>
          </section>

          {/* 9. Fees and Payments */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Fees and Payments</h2>
            <p className="leading-relaxed">
              Certain features may require payment of fees. All fees are non‑refundable except as required by law. We may change our pricing with reasonable notice. If you are on a paid plan, you authorize us to charge your payment method on a recurring basis until cancellation.
            </p>
          </section>

          {/* 10. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Termination</h2>
            <p className="leading-relaxed">
              You may stop using the Service at any time. We may suspend or terminate your access for any reason, including violation of these Terms, with or without notice. Upon termination, your right to use the Service ceases immediately.
            </p>
          </section>

          {/* 11. Disclaimer of Warranties */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON‑INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR‑FREE.
            </p>
          </section>

          {/* 12. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Limitation of Liability</h2>
            <p className="leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, REVICA AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS.
            </p>
          </section>

          {/* 13. Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">13. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold Revica AI harmless from any claims, damages, or expenses arising out of your use of the Service, your violation of these Terms, or your infringement of any third‑party rights.
            </p>
          </section>

          {/* 14. Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">14. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by the laws of [Your Country/State], without regard to its conflict of laws principles. Any disputes shall be resolved exclusively in the courts located in [Your City].
            </p>
          </section>

          {/* 15. Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">15. Changes to Terms</h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance.
            </p>
          </section>

          {/* 16. Contact Us */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">16. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at:
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