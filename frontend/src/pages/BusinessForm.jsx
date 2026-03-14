import { useState } from "react";
import { createBusiness } from "../api/businessApi";

export default function BusinessForm() {
  const [form, setForm] = useState({});
  const [createdBusiness, setCreatedBusiness] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await createBusiness(form, token);
      alert("Business created");
      setCreatedBusiness(res.data);
    } catch (err) {
      console.error("Failed to create business:", err);
      alert("Failed to create business. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-teal-100/50 border border-slate-100 overflow-hidden">

        {/* Header bar */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Add Business</h2>
          <p className="text-teal-100 text-sm mt-1">Fill in the details to register your business</p>
        </div>

        <div className="px-8 py-8">
          {createdBusiness ? (
            <div className="flex flex-col items-center text-center gap-5">
              {/* Success icon */}
              <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center">
                <svg className="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800">Business Created!</h3>
                <p className="text-slate-500 text-sm mt-1">Share this QR code or link to collect reviews</p>
              </div>

              {/* QR Code */}
              <div className="p-3 border-2 border-dashed border-teal-200 rounded-xl bg-teal-50/50">
                <img
                  src={createdBusiness.qrCode}
                  alt="Review QR Code"
                  className="w-44 h-44 rounded-lg"
                />
              </div>

              {/* Review Link */}
              <a
                href={createdBusiness.reviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-sm text-teal-600 font-medium bg-teal-50 hover:bg-teal-100 transition-colors px-4 py-3 rounded-xl border border-teal-200 truncate block"
              >
                {createdBusiness.reviewLink}
              </a>

              <button
                onClick={() => setCreatedBusiness(null)}
                className="w-full mt-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-[0.98] transition-all text-white font-semibold text-sm shadow-md shadow-teal-200"
              >
                + Add Another Business
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {[
                { name: "businessName", placeholder: "Business Name" },
                { name: "category", placeholder: "Category" },
                { name: "city", placeholder: "City" },
                { name: "googleReviewUrl", placeholder: "Google Review URL" },
                { name: "services", placeholder: "Services (comma separated)" },
              ].map(({ name, placeholder }) => (
                <input
                  key={name}
                  name={name}
                  placeholder={placeholder}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:bg-white transition-all"
                />
              ))}

              <button
                onClick={submit}
                className="w-full mt-2 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-[0.98] transition-all text-white font-semibold text-sm shadow-md shadow-teal-200"
              >
                Create Business
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}