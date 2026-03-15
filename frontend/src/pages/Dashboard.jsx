import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserBusinesses } from "../api/businessApi";
import { getUserprofile } from "../api/businessApi"; // Import profile API
import html2canvas from "html2canvas";
import QRPoster from "../components/QRPoster";

export default function Dashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [user, setUser] = useState(null);               // New state for user
  const [loading, setLoading] = useState(true);         // Combined loading state
  const [downloadingId, setDownloadingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const qrRefs = useRef({});
  const navigate = useNavigate();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user and businesses on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch both in parallel
        const [profileRes, businessesRes] = await Promise.all([
          getUserprofile(token),
          getUserBusinesses(token)
        ]);
        setUser(profileRes.data.data);
        setBusinesses(businessesRes.data);
        
      } catch (err) {
        console.error("Failed to fetch data:", err);
        // If token is invalid, clear it and redirect
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDownloadQR = async (business) => {
    try {
      setDownloadingId(business._id);
      const element = qrRefs.current[business._id];
      if (!element) return;

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, { 
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false
      });

      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `${business.businessName.replace(/\s+/g, '-')} - QR Poster.png`;
      link.click();
    } catch (error) {
      console.error("Failed to generate QR poster", error);
      alert("Failed to download QR poster. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  // Helper to get user initials
const getUserInitials = () => {
  if (!user.name) return "U";
  return user.name.trim().charAt(0).toUpperCase();
};

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans flex relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/[0.02] backdrop-blur-xl border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <span className="text-2xl font-bold tracking-tighter italic bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Revica AI
            </span>
            <span className="block text-xs text-slate-500 font-medium mt-1">ATHENURA</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            <NavLink to="/dashboard" icon="dashboard" active>Dashboard</NavLink>
            <NavLink to="/add-business" icon="add">Add Business</NavLink>
            <NavLink to="/pricing" icon="pricing">Pricing</NavLink>
            <NavLink to="/settings" icon="settings">Settings</NavLink>
          </nav>

          {/* Bottom links */}
          <div className="pt-6 mt-auto border-t border-white/5 space-y-1">
            <NavLink to="/faq" icon="faq">FAQ</NavLink>
            <NavLink to="/contact" icon="contact">Contact Us</NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Top Navbar */}
        <header className="bg-white/[0.02] backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 z-20">
          <div className="flex items-center justify-between">
            {/* Left side: hamburger + page title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-white tracking-tight">Dashboard</h1>
            </div>

            {/* Right side: profile icon with user data */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 p-1 pr-2 rounded-full hover:bg-white/10 transition"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                  {getUserInitials()}
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {user.name || "User"}
                </span>
                <svg className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 z-50 z-[999]">
                  <div className="px-4 py-2 border-b border-white/10 mb-1">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/10" onClick={() => setProfileDropdownOpen(false)}>
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-teal-500/50 transition group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Companies Created</p>
                  <p className="text-3xl font-bold text-white">{businesses.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-teal-500/50 transition group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Current Plan</p>
                  <p className="text-3xl font-bold text-white">Free Plan</p>
                </div>
              </div>
              <Link to="/pricing" className="mt-4 inline-block text-sm text-teal-400 hover:underline">
                Upgrade →
              </Link>
            </div>
          </div>

          {/* Businesses List */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Your Companies</h2>

            {businesses.length === 0 ? (
              <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No businesses yet</h3>
                <p className="text-slate-400 mb-6 max-w-sm mx-auto">Get started by adding your first business to manage reviews and generate QR codes.</p>
                <Link to="/add-business">
                  <button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-teal-500/20 transition">
                    Add Your First Business
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <div key={business._id} className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-teal-500/50 transition group relative">
                    {/* Hidden QR Poster for Download */}
                    <div className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none">
                      <QRPoster ref={(el) => (qrRefs.current[business._id] = el)} business={business} />
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white line-clamp-1">{business.businessName}</h3>
                        <p className="text-sm text-slate-400 flex items-center mt-1">
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {business.city}
                        </p>
                      </div>
                      {business.category && (
                        <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 text-xs font-semibold rounded-lg border border-teal-500/20">
                          {business.category}
                        </span>
                      )}
                    </div>

                    {business.services && (
                      <div className="mb-4">
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Services</p>
                        <p className="text-sm text-slate-300 line-clamp-2">{business.services}</p>
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-white/5 flex gap-3">
                      {business.reviewLink && (
                        <a
                          href={business.reviewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium py-2 rounded-lg text-center transition flex items-center justify-center gap-1.5"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Review Link
                        </a>
                      )}
                      {business.qrCode && (
                        <button
                          onClick={() => handleDownloadQR(business)}
                          disabled={downloadingId === business._id}
                          className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-lg transition ${
                            downloadingId === business._id
                              ? "bg-teal-500/20 text-teal-400 cursor-wait"
                              : "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white"
                          }`}
                        >
                          {downloadingId === business._id ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                          {downloadingId === business._id ? "Processing..." : "Download QR"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper component for navigation links
function NavLink({ to, icon, children, active = false }) {
  const icons = {
    dashboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    add: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    pricing: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    profile: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
    faq: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    contact: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  };

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
        active
          ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-white border border-teal-500/30"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
      {children}
    </Link>
  );
}