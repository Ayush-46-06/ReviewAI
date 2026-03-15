import React, { useState } from "react";
import axios from "axios"; // will be used for Razorpay integration
import { Link } from "react-router-dom";

export default function PricingPage() {
    const [loading, setLoading] = useState(null); // track which plan is being processed

    // Simulate API call to create Razorpay order
    const handleSubscribe = async (plan) => {
        setLoading(plan);
        try {
            //   Example API call – replace with your actual endpoint
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/auth/create-order",
                { plan },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const { orderId, amount, currency } = response.data;
            initiateRazorpay(orderId, amount, currency);
            console.log(`Subscribing to ${plan} plan`);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(`Redirecting to payment for ${plan} plan...`);
        } catch (error) {
            console.error("Payment initiation failed", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    // Placeholder Razorpay initiation – you'll implement actual Razorpay checkout here
    const initiateRazorpay = (orderId, amount, currency) => {

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from Razorpay dashboard
            amount: amount,
            currency: currency,
            name: "Revica AI",
            description: "Pro Plan Subscription",
            order_id: orderId,

            handler: function (response) {

                alert("Payment Successful!");

                window.location.href = "/dashboard";
                axios.post(
                    "/api/auth/verify-payment",
                    response,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
            },

            theme: {
                color: "#14b8a6"
            }
        };

        const rzp = new window.Razorpay(options);

        rzp.open();
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
            {/* Background glow effects – same as ReviewPage */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            {/* Header */}
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
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
                {/* Heading */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Choose your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                            plan
                        </span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                        Simple, transparent pricing. Start for free, upgrade as you grow.
                    </p>
                </div>

                {/* Pricing cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <div className="group bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-teal-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">Free</h2>
                                <p className="text-sm text-slate-400 mt-1">For individuals testing the waters</p>
                            </div>
                            <span className="px-3 py-1 text-xs font-medium bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30">
                                Starter
                            </span>
                        </div>
                        <div className="mt-6 flex items-baseline gap-1">
                            <span className="text-5xl font-bold text-white">$0</span>
                            <span className="text-slate-500">/month</span>
                        </div>
                        <ul className="mt-8 space-y-4">
                            <li className="flex items-center gap-3 text-slate-300">
                                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">1</strong> business</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong className="text-white">10</strong> generations per month</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span className="line-through">Daily generations</span>
                            </li>
                        </ul>

                        <Link to="/dashboard">
                            <button
                                className="mt-8 w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-white/20 to-white/10 text-slate-400 cursor-pointer hover:from-white/30 hover:to-white/20 active:scale-[0.98] shadow-md shadow-teal-500/10"
                            >
                                Get started
                            </button>
                        </Link>

                    </div>

                    {/* Pro Plan */}
                    <div className="group bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-xl border-2 border-teal-500/30 rounded-3xl p-8 hover:border-teal-400 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-semibold text-white">Pro</h2>
                                    <p className="text-sm text-slate-400 mt-1">For growing businesses</p>
                                </div>
                                <span className="px-3 py-1 text-xs font-medium bg-teal-500 text-black rounded-full">
                                    Popular
                                </span>
                            </div>
                            <div className="mt-6 flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-white">$99</span>
                                <span className="text-slate-400">/month</span>
                            </div>
                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center gap-3 text-slate-200">
                                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span><strong className="text-white">5</strong> businesses</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-200">
                                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span><strong className="text-white">100</strong> generations per day, per business</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-200">
                                    <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Priority support</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => handleSubscribe("pro")}
                                disabled={loading === "pro"}
                                className="mt-8 w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 active:scale-[0.98] shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading === "pro" ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Subscribe now"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional info / Razorpay note */}
                <div className="mt-16 text-center text-sm text-slate-500 border-t border-white/5 pt-8">
                    <p>Secure payments powered by Razorpay • Cancel anytime</p>
                    <p className="mt-2 text-xs text-slate-600">
                        API integration via Axios ready – just connect your backend.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 backdrop-blur-sm py-6 text-center text-xs text-slate-600">
                Powered by <span className="text-teal-400 font-semibold">ATHENURA</span> • AI‑generated reviews
            </footer>
        </div>
    );
}