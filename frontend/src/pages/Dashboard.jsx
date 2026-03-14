import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBusinesses } from "../api/businessApi";
import html2canvas from "html2canvas";
import QRPoster from "../components/QRPoster";

export default function Dashboard() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const qrRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await getUserBusinesses(token);
        setBusinesses(res.data);
      } catch (err) {
        console.error("Failed to fetch businesses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDownloadQR = async (business) => {
    try {
      setDownloadingId(business._id);
      const element = qrRefs.current[business._id];
      if (!element) return;

      // Small delay to ensure everything is rendered, though it usually is
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, { 
        backgroundColor: null,
        scale: 2, // for higher resolution
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your businesses
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href="/add-business">
              <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-150">
                <span className="text-lg leading-none">+</span>
                Add Business
              </button>
            </a>
            
            <button 
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 active:scale-95 text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8" />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-extrabold text-teal-600">
              {businesses.length}
            </h2>
            <p className="text-sm text-gray-500 font-medium mt-2">Companies Created</p>
          </div>
        </div>

        {/* Businesses List */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Companies</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : businesses.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No businesses yet</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">Get started by adding your first business to manage reviews and generate QR codes.</p>
              <a href="/add-business">
                <button className="bg-white text-teal-600 border border-teal-200 hover:bg-teal-50 px-5 py-2.5 rounded-xl font-medium transition-colors">
                  Add Your First Business
                </button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <div key={business._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col h-full relative">
                  
                  {/* Visually Hidden QR Poster to Render for Download */}
                  <div className="absolute top-[-9999px] left-[-9999px] opacity-0 pointer-events-none">
                    <QRPoster ref={(el) => (qrRefs.current[business._id] = el)} business={business} />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{business.businessName}</h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {business.city}
                      </p>
                    </div>
                    {business.category && (
                      <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-lg shrink-0">
                        {business.category}
                      </span>
                    )}
                  </div>
                  
                  {business.services && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Services</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{business.services}</p>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex gap-3">
                    {business.reviewLink ? (
                      <a 
                        href={business.reviewLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-50 hover:bg-teal-50 text-gray-600 hover:text-teal-700 text-sm font-medium py-2 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Review Link
                      </a>
                    ) : null}
                    {business.qrCode ? (
                      <button 
                        onClick={() => handleDownloadQR(business)}
                        disabled={downloadingId === business._id}
                        className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-lg text-center transition-colors ${
                          downloadingId === business._id 
                            ? "bg-teal-100 text-teal-800 cursor-wait" 
                            : "bg-teal-600 hover:bg-teal-700 text-white"
                        }`}
                      >
                        {downloadingId === business._id ? (
                          <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                        {downloadingId === business._id ? "Processing..." : "Download QR"}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}