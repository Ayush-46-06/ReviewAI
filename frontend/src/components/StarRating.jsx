import React, { useState } from "react";

const LABELS = ["", "Terrible", "Poor", "Average", "Good", "Excellent"];

export default function StarRating({ stars, setStars }) {
  const [hovered, setHovered] = useState(0);

  const active = hovered || stars;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => setStars(s)}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            className="p-1 rounded-md transition-transform hover:scale-125 active:scale-95"
            aria-label={`${s} stars`}
          >
            <svg
              className={`w-9 h-9 transition-all duration-150 ${
                s <= active
                  ? "fill-amber-400 drop-shadow-sm"
                  : "fill-gray-100 stroke-gray-200 stroke-[1.5]"
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 min-h-[20px]">
        {active ? (
          <>
            <span className="font-medium text-gray-800">{active} star{active > 1 ? "s" : ""}:</span>{" "}
            {LABELS[active]}
          </>
        ) : (
          "Tap a star to rate"
        )}
      </p>
    </div>
  );
}