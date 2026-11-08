import React from 'react';
import { BUSINESS_CONFIG } from '../config/business.js';
import { X } from 'lucide-react';

export default function CustomDetailInput({ value, onChange }) {
  const maxLength = BUSINESS_CONFIG.maxCustomDetailLength || 160;

  return (
    <div className="w-full mt-2 mb-1">
      <div className="relative rounded-2xl border border-taupe/30 bg-espresso/40 focus-within:border-cream/60 transition-colors duration-160 p-3">
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          placeholder="Anything else you'd like to mention? (Optional)"
          className="w-full bg-transparent text-cream placeholder-warm-grey/50 text-[13px] resize-none focus:outline-none leading-relaxed"
          maxLength={maxLength}
          aria-label="Optional custom experience details"
        />

        <div className="flex items-center justify-between pt-1 border-t border-taupe/15 text-[11px] text-warm-grey/60">
          {value.length > 0 ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1 text-warm-grey/80 hover:text-cream cursor-pointer transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          ) : (
            <span className="text-[11px] text-warm-grey/40">Optional detail</span>
          )}

          <span className={value.length >= maxLength ? 'text-amber-300' : ''}>
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
}
