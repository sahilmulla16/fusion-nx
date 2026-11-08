import React, { useState } from 'react';

const RATING_DESCRIPTIONS = {
  1: "1 Star — Needs Improvement",
  2: "2 Stars — Fair Experience",
  3: "3 Stars — Good Visit",
  4: "4 Stars — Very Good Visit",
  5: "5 Stars — Exceptional Visit"
};

// Light bold Golden color matching the reference image and CTA
const GOLDEN_COLOR = "#DFBA88";
const TAUPE_COLOR = "#A78D78";

export default function StarRating({ rating, onRatingChange }) {
  const [hoverRating, setHoverRating] = useState(null);
  const [tappedStar, setTappedStar] = useState(null);

  const activeRating = hoverRating ?? rating ?? 0;

  const handleStarClick = (starValue) => {
    setTappedStar(starValue);
    onRatingChange(starValue);

    // Clear pop animation state after completion
    setTimeout(() => {
      setTappedStar(null);
    }, 350);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min((rating || 0) + 1, 5);
      handleStarClick(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const prev = Math.max((rating || 1) - 1, 1);
      handleStarClick(prev);
    } else if (e.key >= '1' && e.key <= '5') {
      const val = parseInt(e.key, 10);
      handleStarClick(val);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center my-3 sm:my-4 select-none"
      role="region"
      aria-label="Star rating selector"
    >
      {/* 5 Stars Row */}
      <div
        className="flex items-center justify-center gap-3 sm:gap-4 py-1"
        role="radiogroup"
        aria-label="Rate your experience from 1 to 5 stars"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isHighlighted = activeRating >= starValue;
          const isTapped = tappedStar === starValue;

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={rating === starValue}
              aria-label={`${starValue} of 5 stars`}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(null)}
              className="p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DFBA88] rounded-full cursor-pointer group"
            >
              <svg
                viewBox="0 0 24 24"
                className={`w-9 h-9 sm:w-10 sm:h-10 star-transition ${
                  isTapped ? 'animate-star-pop' : isHighlighted ? 'scale-105' : 'scale-100 group-hover:scale-110'
                }`}
                style={{
                  filter: isHighlighted
                    ? 'drop-shadow(0 0 8px rgba(223, 186, 136, 0.45))'
                    : 'none',
                }}
                aria-hidden="true"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill={isHighlighted ? GOLDEN_COLOR : 'none'}
                  stroke={isHighlighted ? GOLDEN_COLOR : TAUPE_COLOR}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-200 ease-out"
                />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Subtle rating indicator text */}
      <p
        className="text-[12px] text-warm-grey/80 tracking-wide mt-2 h-4 text-center font-normal"
        aria-live="polite"
      >
        {rating ? RATING_DESCRIPTIONS[rating] : "Tap a star to rate your visit"}
      </p>
    </div>
  );
}
