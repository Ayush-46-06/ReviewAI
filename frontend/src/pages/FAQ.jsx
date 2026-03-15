import { useState } from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Revica AI?",
      answer:
        "Revica AI is a smart Google Review generator that helps businesses collect authentic reviews from customers via QR codes and personalized links. Our platform automates the review request process and provides analytics to grow your online reputation.",
    },
    {
      question: "How does the QR code review system work?",
      answer:
        "Each business receives a unique QR code that customers can scan with their smartphone. The code directs them straight to your Google Review page, making it effortless to leave a 5‑star review. You can download and print the QR poster or share the link digitally.",
    },
    {
      question: "Can I customize the review link?",
      answer:
        "Yes! You can set a custom review link (e.g., review.yourbusiness.com) that redirects to your Google Review page. This makes it easy to share on receipts, emails, or social media.",
    },
    {
      question: "Is there a limit to how many businesses I can manage?",
      answer:
        "It depends on your plan. The Free plan allows one business, while Pro and Enterprise plans offer unlimited businesses and additional features like team collaboration and advanced analytics.",
    },
    {
      question: "How do I download the QR poster?",
      answer:
        "On your dashboard, each business card has a 'Download QR' button. Clicking it generates a high‑quality poster (480x850 px) with your business name, category, and QR code, ready for printing.",
    },
    {
      question: "Can I change the design of the QR poster?",
      answer:
        "Currently, we offer a premium modern design, but custom branding and multiple templates are available on the Enterprise plan. Contact us for more details.",
    },
    {
      question: "What happens if a customer leaves a negative review?",
      answer:
        "We encourage you to respond professionally and resolve the issue. Revica AI helps you monitor all reviews in one place, so you never miss a notification. Our platform also offers sentiment analysis to keep you informed.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use industry‑standard encryption and never share your data. All information is stored securely and is only accessible to you and your authorised team members.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
      {/* Background glow effects (same as dashboard) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Simple header with logo and back link */}
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

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about Revica AI and how it helps your business grow.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-teal-500/50 transition group"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-teal-400 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">Still have questions?</h2>
          <p className="text-slate-400 mb-6">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-teal-500/20 transition"
          >
            Contact Us
          </Link>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-sm text-slate-500">
        <div className="max-w-6xl mx-auto px-4">
          © {new Date().getFullYear()} Revica AI by Athenura. All rights reserved.
        </div>
      </footer>
    </div>
  );
}