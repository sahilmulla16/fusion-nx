import React from 'react';
import {
  ClipboardCheck,
  Users,
  Clock,
  BadgeCheck,
  Sparkles,
  IndianRupee,
  Scissors,
  Wind,
  UserRound,
  Flower2
} from 'lucide-react';
import { getKeywordConfigForRating } from '../engine/tagLibrary.js';

const ICON_MAP = {
  ClipboardCheck,
  Users,
  Clock,
  BadgeCheck,
  Sparkles,
  IndianRupee,
  Scissors,
  Wind,
  UserRound,
  Flower2
};

export default function ExperienceTags({ rating, selectedTags, onToggleTag }) {
  const config = getKeywordConfigForRating(rating);
  const keywords = config.keywords;

  // Grid columns based on option count: 4 options -> 2 cols; 3 or 6 options -> 3 cols
  const gridColsClass = keywords.length === 4 
    ? 'grid-cols-2' 
    : 'grid-cols-3';

  return (
    <div className="w-full my-2.5">
      {/* Section Divider with Dynamic Headline */}
      <div className="flex items-center justify-center gap-3 w-full mb-2.5 select-none">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-taupe/40" />
        <h2 className="text-[11px] sm:text-xs font-normal tracking-[0.22em] text-cream/90 uppercase text-center font-sans">
          {config.heading}
        </h2>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-taupe/40" />
      </div>

      {/* Responsive Compact Grid */}
      <div
        className={`grid ${gridColsClass} gap-2 sm:gap-2.5`}
        role="group"
        aria-label="Keyword options"
      >
        {keywords.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          const IconComponent = ICON_MAP[tag.icon] || Sparkles;

          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => onToggleTag(tag.id)}
              aria-pressed={isSelected}
              className={`
                relative flex flex-col items-center justify-center text-center
                py-2 sm:py-2.5 px-2 rounded-xl border select-none cursor-pointer
                focus:outline-none focus-visible:ring-1 focus-visible:ring-taupe
                tag-transition
                ${isSelected
                  ? 'bg-walnut/60 text-[#A78D78] border-[#A78D78] shadow-[0_2px_10px_rgba(167,141,120,0.15)]'
                  : 'bg-espresso/50 hover:bg-walnut/20 text-warm-grey border-taupe/30 hover:border-taupe/60'
                }
              `}
            >
              {/* Icon Strictly Positioned ABOVE Label */}
              <div
                className={`mb-1 transition-colors duration-160 ${
                  isSelected ? 'text-[#A78D78]' : 'text-taupe/80'
                }`}
              >
                <IconComponent className="w-4 h-4 stroke-[1.8]" />
              </div>

              {/* Tag Label with #A78D78 for selected state */}
              <span
                className={`text-[11px] sm:text-[11.5px] leading-tight transition-colors duration-160 ${
                  isSelected ? 'text-[#A78D78] font-semibold' : 'text-warm-grey font-normal'
                }`}
              >
                {tag.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
