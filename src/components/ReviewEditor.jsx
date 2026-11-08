import React, { useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { countWords } from '../engine/compositionEngine.js';

export default function ReviewEditor({
  value,
  onChange,
  isRegenerating = false
}) {
  const textareaRef = useRef(null);

  // Auto-grow height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(130, textareaRef.current.scrollHeight)}px`;
    }
  }, [value]);

  const words = countWords(value);

  return (
    <div className="w-full my-3">
      <div
        className={`
          relative rounded-2xl border border-taupe/35 bg-espresso/50
          p-4 sm:p-5 transition-all duration-200
          focus-within:border-cream/60 focus-within:bg-espresso/70
        `}
      >
        {/* Subtle Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-taupe/15">
          <span className="text-[11px] font-medium tracking-wider uppercase text-warm-grey/70">
            Editable Review Draft
          </span>
          <div className="flex items-center gap-1.5 text-taupe/70 text-[11px]">
            <Pencil className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Tap to edit</span>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          aria-label="Editable generated review"
          className={`
            w-full bg-transparent text-cream placeholder-warm-grey/40 
            text-[14px] sm:text-[15px] font-normal leading-relaxed resize-none 
            focus:outline-none transition-opacity duration-160
            ${isRegenerating ? 'text-regenerating' : 'text-ready'}
          `}
          placeholder="Your review draft will appear here..."
        />

        {/* Word count target indicator: 27 / 30 words */}
        <div className="flex items-center justify-end pt-2 border-t border-taupe/15 text-[11px] text-warm-grey/60 font-mono">
          <span className={words > 30 ? 'text-amber-300' : ''}>
            {words} / 30 words
          </span>
        </div>
      </div>
    </div>
  );
}
