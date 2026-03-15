import { useEffect, useState } from "react";
import {
  StarIcon,
  ChatBubbleLeftRightIcon,
  QrCodeIcon,
  ChartBarIcon,
  FunnelIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";

export default function RevicaAILandingPage() {
  // Simple fade-up trigger on scroll (optional – adds a bit of life)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Background gradients (global) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header / Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-16 lg:px-24 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter italic bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Revica AI
          </span>
          <span className="text-xs text-slate-500 font-medium px-2 py-1 border border-white/10 rounded-full">
            ATHENURA
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-slate-300 hover:text-teal-400 transition">Features</a>
          <a href="#pricing" className="text-slate-300 hover:text-teal-400 transition">Pricing</a>
          <a href="#testimonials" className="text-slate-300 hover:text-teal-400 transition">Testimonials</a>
          <a href="/overview" className="text-slate-300 hover:text-teal-400 transition">Overview</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="px-5 py-2 text-sm font-medium text-white border border-white/10 rounded-xl hover:bg-white/5 transition">Login</a>
          <a href="/register" className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl hover:opacity-90 transition shadow-lg shadow-teal-500/20">Get Started</a>
        </div>
      </nav>

      {/* Hero Section (unchanged) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 md:pt-28 md:pb-40 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Turn Customer Reviews into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                Business Growth
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl">
              AI‑powered Google Review management that generates smart replies,
              boosts your rating, and turns feedback into revenue.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl font-semibold hover:opacity-90 transition shadow-2xl shadow-teal-500/30"
              >
                Get Started Free
              </a>
              <a
                href="/login"
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold hover:bg-white/10 transition"
              >
                Login
              </a>
            </div>
          </div>

          {/* Dashboard Preview (mock) - unchanged */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="h-20 bg-teal-500/10 rounded-xl border border-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-medium">⭐ 4.8 Avg</div>
                <div className="h-20 bg-teal-500/10 rounded-xl border border-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-medium">📈 +32% Reviews</div>
                <div className="h-20 bg-teal-500/10 rounded-xl border border-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-medium">⚡ 142 Replies</div>
              </div>
              <div className="space-y-3">
                <div className="h-12 bg-white/5 rounded-lg flex items-center px-4 gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <div className="flex-1 h-2 bg-white/10 rounded"></div>
                  <div className="text-teal-400 text-xs">AI Reply →</div>
                </div>
                <div className="h-12 bg-white/5 rounded-lg flex items-center px-4 gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div className="flex-1 h-2 bg-white/10 rounded"></div>
                  <div className="text-teal-400 text-xs">AI Reply →</div>
                </div>
                <div className="h-12 bg-white/5 rounded-lg flex items-center px-4 gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <div className="flex-1 h-2 bg-white/10 rounded"></div>
                  <div className="text-teal-400 text-xs">AI Reply →</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Businesses (unchanged) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-y border-white/5">
        <p className="text-center text-slate-400 text-sm uppercase tracking-wider mb-8">Trusted by 5,000+ growing businesses</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-70">
          {["Restaurants", "Salons", "Clinics", "Retail", "Hotels", "Gyms"].map((business) => (
            <span key={business} className="text-slate-500 text-lg font-medium">{business}</span>
          ))}
        </div>
      </section>

      {/* Features (unchanged) */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-14">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Everything you need to manage reviews</h2>
          <p className="mt-4 text-slate-400">AI‑powered tools to grow your Google rating effortlessly</p>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative">
                <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (unchanged) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-14">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Three steps to a 5 star reputation</h2>
          <p className="mt-4 text-slate-400">From review collection to AI powered responses</p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                  {idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Dashboard Preview (unchanged) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-14">
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500" />
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Analytics */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-teal-400" />
                Analytics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Average rating</span>
                  <span className="text-teal-400 font-medium">4.8 ★</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Reviews this month</span>
                  <span className="text-teal-400 font-medium">+142</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-teal-400" />
                Recent Reviews
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs">⭐</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Customer {i}</span>
                        <span className="text-xs text-teal-400">★★★★★</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Amazing service, will come back!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Reply Suggestions */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ArrowPathIcon className="w-6 h-6 text-teal-400" />
                AI Suggested Replies
              </h3>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <p className="text-xs text-slate-300">"Thank you for your kind words..."</p>
                    <button className="mt-2 text-xs text-teal-400">Use reply →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING – Updated to two plans: Free and Pro ($99) */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-14">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing</h2>
          <p className="mt-4 text-slate-400">Start free, upgrade as you grow.</p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-teal-500/50 transition group"
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
              <div className="mb-6">
                {plan.price === 0 ? (
                  <span className="text-3xl font-bold">Free</span>
                ) : (
                  <>
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-slate-400">/month</span>
                  </>
                )}
              </div>
              <ul className="space-y-3 text-sm mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <span className="text-teal-400">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/register"
                className={`block text-center w-full py-3 rounded-xl font-semibold transition ${plan.popular
                    ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20"
                    : "border border-white/10 hover:bg-white/5"
                  }`}
              >
                {plan.price === 0 ? "Start Free" : "Start Pro Trial"}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS – with animations (fade-up + hover effects) */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Loved by business owners</h2>
          <p className="mt-4 text-slate-400">See how Revica AI transformed their online reputation</p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="fade-up group bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10"
            >
              <div className="flex text-teal-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (unchanged) */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-28">
        <div className="relative bg-gradient-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent)]" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Start Growing Your Reviews Today</h2>
          <p className="text-slate-300 text-lg mb-8">Join thousands of businesses using AI to dominate local search.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/register" className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl font-semibold hover:opacity-90 transition shadow-2xl shadow-teal-500/30">
              Create Account
            </a>
            <a href="/login" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold hover:bg-white/10 transition">
              Login
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER – now includes email and clear branding */}
      <footer className="relative z-10 border-t border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold italic bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Revica AI
              </span>
            </div>
            <p className="text-slate-500 text-sm">Powered by <span className="text-teal-400 font-semibold">ATHENURA</span></p>
            <p className="text-slate-600 text-xs mt-4">© 2026 Revica AI. All rights reserved.</p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-teal-400 transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-teal-400 transition">Pricing</a></li>
              <li><a href="/login" className="hover:text-teal-400 transition">Login</a></li>
              <li><a href="/register" className="hover:text-teal-400 transition">Sign up</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/privacy" className="hover:text-teal-400 transition">Privacy</a></li>
              <li><a href="/terms" className="hover:text-teal-400 transition">Terms</a></li>
            </ul>
          </div>

          {/* Contact / Email */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <a
              href="mailto:support@revica.ai"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition group"
            >
              <EnvelopeIcon className="w-4 h-4 text-teal-400/70 group-hover:text-teal-400" />
              support@revica.ai
            </a>
            <p className="text-xs text-slate-600 mt-4">We reply within 24h</p>
          </div>
        </div>
      </footer>

      {/* Inline CSS for fade-up animation */}
      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-up-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

// Data arrays

const features = [
  {
    icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
    title: "AI Review Reply Generator",
    description: "Generate personalized, human‑like replies to every review in seconds."
  },
  {
    icon: <FunnelIcon className="w-6 h-6" />,
    title: "Smart Review Funnel",
    description: "Automatically guide happy customers to leave 5‑star reviews."
  },
  {
    icon: <QrCodeIcon className="w-6 h-6" />,
    title: "QR Code Review Booster",
    description: "Print QR codes that link directly to your Google review page."
  },
  {
    icon: <ChartBarIcon className="w-6 h-6" />,
    title: "Google Review Analytics",
    description: "Track rating trends, sentiment, and competitor benchmarks."
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    title: "Customer Feedback Filtering",
    description: "Detect and flag fake or inappropriate reviews automatically."
  },
  {
    icon: <UserGroupIcon className="w-6 h-6" />,
    title: "Reputation Monitoring",
    description: "Get alerts for new reviews and mentions across the web."
  }
];

const steps = [
  {
    title: "Collect Reviews",
    description: "Use QR codes, email, or SMS to invite customers to leave a review."
  },
  {
    title: "AI Generates Smart Replies",
    description: "Our AI crafts context‑aware responses that sound like you."
  },
  {
    title: "Grow Your Google Rating",
    description: "Watch your average rating climb as more happy customers engage."
  }
];

// Updated pricing – two plans
const plans = [
  {
    name: "Free",
    description: "Perfect for getting started with AI Google reviews.",
    price: 0,
    features: [
      "10 AI review generations per month",
      "AI reply generation",
      "Basic analytics",
      "1 business location",
      "QR review poster"
    ]
  },
  {
    name: "Pro",
    description: "Best for businesses managing multiple locations.",
    price: 99,
    popular: true,
    features: [
      "100 AI review generations per day",
      "Up to 5 businesses",
      "Store up to 100 reviews",
      "Advanced analytics",
      "Priority support",
      "Multiple QR posters (Comming Soon)"
    ]
  }
];

const testimonials = [
  {
    text: "Revica AI saved us hours every week. Our Google rating went from 4.2 to 4.8 in three months!",
    name: "Sarah Chen",
    role: "Owner, The Daily Grind Cafe",
    initials: "SC"
  },
  {
    text: "The AI replies are so good our customers think we hired a full‑time community manager.",
    name: "Marcus Rivera",
    role: "Director, Rivera Dental",
    initials: "MR"
  },
  {
    text: "Finally a tool that actually helps us get more reviews without begging customers.",
    name: "Jessica Wu",
    role: "Marketing Lead, Urban Spa",
    initials: "JW"
  }
];