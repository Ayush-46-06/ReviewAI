import React, { useState } from "react";

// const NAMES = ["Alex M.", "Jordan K.", "Sam R.", "Taylor B.", "Casey L."];
const AVATAR = [
  { bg: "#E6F1FB", color: "#185FA5" },
  { bg: "#EAF3DE", color: "#3B6D11" },
  { bg: "#FAEEDA", color: "#854F0B" },
  { bg: "#FCEBEB", color: "#A32D2D" },
  { bg: "#EEEDFE", color: "#534AB7" },
];

function Skeleton() {
  return Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 mb-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-2/5 mb-3" />
      <div className="h-3 bg-gray-200 rounded w-full mb-1.5" />
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-1.5" />
      <div className="h-3 bg-gray-200 rounded w-3/5" />
    </div>
  ));
}

function ReviewCard({ review, index, stars, googleLink }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const av = AVATAR[index % AVATAR.length];
//   const name = NAMES[index % NAMES.length];
  const initials = name.split(" ").map((w) => w[0]).join("");

  const handleCopy = () => {
    navigator.clipboard.writeText(review).then(() => {
      setCopied(true);
      setTimeout(() => window.open(googleLink, "_blank"), 300);
      setTimeout(() => setCopied(false), 2500);
      alert("Review copied! Press Ctrl + V to paste on Google.");
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 mb-4 animate-fadeUp" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-center gap-3 mb-3">
        {/* <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm" style={{ background: av.bg, color: av.color }}>{initials}</div> */}
        <div>
          {/* <p className="font-medium text-gray-900 text-sm">{name}</p> */}
          <div className="flex gap-0.5 mt-0.5">
            {Array.from({ length: Math.max(1, stars || 5) }).map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 overflow-hidden" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: expanded ? "unset" : 3 }}>{review}</p>
      <div className="flex items-center gap-3">
        <button className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${copied ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-900 text-white hover:bg-gray-800"}`} onClick={handleCopy}>
          {copied ? "✓ Copied" : "Copy & post"}
        </button>
        {review.length > 150 && (
          <button className="text-gray-500 hover:text-gray-800 text-sm font-medium px-2 transition-colors" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReviewList({ reviews, loading, stars, googleLink }) {
  if (loading) return <><div className="my-8 border-t border-gray-100" /><Skeleton /></>;

  return (
    <>
      <div className="my-8 border-t border-gray-100" />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-serif font-normal text-gray-900 italic">Pick your review</h2>
        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{reviews.length} options</span>
      </div>
      {reviews.map((r, i) => (
        <ReviewCard key={i} review={r} index={i} stars={stars} googleLink={googleLink} />
      ))}
      <p className="text-[11px] text-center text-gray-400 mt-6 uppercase tracking-wider">Copying opens Google Maps so you can paste directly.</p>
    </>
  );
}