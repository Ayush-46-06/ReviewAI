import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import StarRating from "../components/StarRating";
import ReviewList from "../components/ReviewList";
import { generateReviews } from "../api/api";

export default function ReviewPage() {

  const { id } = useParams();

  const [business, setBusiness] = useState(null);
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await axios.get(`http://localhost:5000/api/business/${id}`);
      setBusiness(res.data);
    };
    fetchBusiness();
  }, [id]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateReviews(stars, business._id);
      setReviews(data);
    } catch (error) {
      console.error("Error generating reviews", error);
      alert("Failed to generate reviews. Check console.");
    }
    setLoading(false);
  };

  if (!business) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400 tracking-wide">Loading business…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-xl mx-auto px-6 py-10 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-4">
            Review Portal
          </span>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Leave a review for{" "}
            <span className="text-teal-600">{business.businessName}</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Share your experience and help others make better decisions
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-6 py-10 space-y-6">

        {/* Step 1: Star Rating */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Rate your experience
            </h3>
          </div>
          <StarRating stars={stars} setStars={setStars} />
        </div>

        {/* Step 2: Generate */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Generate your review
            </h3>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!stars || loading}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2
              ${!stars || loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-teal-600 hover:shadow-lg active:scale-[0.98]"
              }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating…
              </>
            ) : (
              <>
                ✦ Generate Review
              </>
            )}
          </button>

          {!stars && (
            <p className="text-xs text-gray-400 text-center mt-3">
              Please select a star rating first
            </p>
          )}
        </div>

        {/* Review List */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Choose your review
              </h3>
            </div>
            <ReviewList
              reviews={reviews}
              stars={stars}
              googleLink={business.googleReviewUrl}
            />
          </div>
        )}

      </div>
    </div>
  );
}