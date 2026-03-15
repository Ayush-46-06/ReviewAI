import React, { useState } from "react";

const AVATAR = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#FCEBEB", color: "#A32D2D" },
  { bg: "#EEEDFE", color: "#534AB7" },
];

function Skeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-5 animate-pulse"
        >
          <div className="h-4 bg-white/10 rounded w-2/5 mb-3" />
          <div className="h-3 bg-white/10 rounded w-full mb-1.5" />
          <div className="h-3 bg-white/10 rounded w-5/6 mb-1.5" />
          <div className="h-3 bg-white/10 rounded w-3/5" />
        </div>
      ))}
    </div>
  );
}

function ReviewCard({ review, index, stars, googleLink }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(review).then(() => {
      setCopied(true);
      // After a short delay, open the Google review link
      setTimeout(() => {
        window.open(googleLink, "_blank");
      }, 300);
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-teal-500/50 transition-all duration-200 mb-4 animate-fadeUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div>
          <p className="font-medium text-white text-sm">{name}</p>
          <div className="flex gap-0.5 mt-0.5">
            {Array.from({ length: Math.max(1, stars || 5) }).map((_, i) => (
              <svg
                key={i}
                className="w-3.5 h-3.5 fill-amber-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p
        className="text-sm text-slate-300 leading-relaxed mb-4 overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "unset" : 3,
        }}
      >
        {review}
      </p>
      <div className="flex items-center gap-3">
        <button
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
            copied
              ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
              : "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/20"
          }`}
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy & post
            </>
          )}
        </button>
        {review.length > 150 && (
          <button
            className="text-sm text-slate-400 hover:text-teal-400 transition-colors px-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReviewList({ reviews, loading, stars, googleLink }) {
  if (loading) {
    return (
      <>
        <div className="my-8 border-t border-white/5" />
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <div className="my-8 border-t border-white/5" />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-serif font-normal text-white italic">Pick your review</h2>
        <span className="text-xs font-medium bg-white/5 text-slate-300 px-2 py-0.5 rounded-full border border-white/10">
          {reviews.length} options
        </span>
      </div>
      {reviews.map((r, i) => (
        <ReviewCard
          key={i}
          review={r}
          index={i}
          stars={stars}
          googleLink={googleLink}
        />
      ))}
      <p className="text-[11px] text-center text-slate-500 mt-6 uppercase tracking-wider">
        Copying opens Google so you can paste directly.
      </p>
    </>
  );
}