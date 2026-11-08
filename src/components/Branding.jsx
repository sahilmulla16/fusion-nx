import React from 'react';
import { BUSINESS_CONFIG } from '../config/business.js';
import FusionLogo from './FusionLogo.jsx';

export { FusionLogo as ScissorsLogo };

/**
 * Reusable Branding Component.
 * Supports:
 * - 'centered' (Screen 1 matching Luxury Salon Review Screen.png)
 * - 'horizontal' (Screen 2 compact header)
 */
export default function Branding({ variant = "centered", onBack }) {
  if (variant === "horizontal") {
    return (
      <header className="w-full flex items-center justify-between pt-3 pb-2 select-none">
        <div 
          onClick={onBack}
          className={`flex items-center gap-3 text-cream ${onBack ? 'cursor-pointer group' : ''}`}
          role={onBack ? "button" : undefined}
          title={onBack ? "Return to selections" : undefined}
        >
          <div className="text-[#DFBA88]">
            <FusionLogo className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <div className="h-7 w-[1px] bg-taupe/40" />
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-medium tracking-[0.22em] text-cream uppercase leading-tight font-sans">
              {BUSINESS_CONFIG.name}
            </span>
            <span className="text-[9px] sm:text-[10px] font-normal tracking-[0.25em] text-warm-grey uppercase leading-tight mt-0.5">
              {BUSINESS_CONFIG.tagline}
            </span>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="text-xs font-medium text-cream/90 hover:text-cream bg-walnut/30 hover:bg-walnut/60 transition-colors duration-160 px-3 py-1.5 rounded-full border border-taupe/40 cursor-pointer"
            aria-label="Edit your selected options"
          >
            ← Edit
          </button>
        )}
      </header>
    );
  }

  // Centered variant (Default / Screen 1)
  return (
    <header className="w-full flex flex-col items-center justify-center pt-2 pb-1 text-center select-none">
      <div className="text-[#DFBA88] mb-2.5">
        <FusionLogo className="w-12 h-12 sm:w-14 sm:h-14" />
      </div>
      
      <h1 className="text-base sm:text-lg font-medium tracking-[0.3em] text-cream uppercase font-sans mb-1.5">
        {BUSINESS_CONFIG.name}
      </h1>
      
      <div className="flex items-center justify-center gap-3 w-full max-w-[260px]">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-taupe/50" />
        <span className="text-[10px] sm:text-[11px] font-normal tracking-[0.25em] text-warm-grey uppercase shrink-0">
          {BUSINESS_CONFIG.tagline}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-taupe/50" />
      </div>
    </header>
  );
}
