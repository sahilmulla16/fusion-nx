import React from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';

export function GoogleGIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
      />
    </svg>
  );
}

export default function ActionButtons({
  onRegenerate,
  onContinueToGoogle,
  isRegenerating,
  googleReviewUrlConfigured
}) {
  return (
    <div className="w-full flex flex-col gap-3 my-2 select-none">
      {/* Generate Again Outlined Button */}
      <div className="flex justify-center w-full">
        <button
          type="button"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className={`
            flex items-center justify-center gap-2 py-2.5 px-6 rounded-full 
            border border-taupe/40 bg-espresso/40 hover:bg-walnut/30 
            text-cream text-xs sm:text-[13px] font-medium tracking-wide 
            cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cream/60
            btn-transition
            ${isRegenerating ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#DFBA88] ${isRegenerating ? 'animate-spin' : ''}`} />
          <span>Generate Again</span>
        </button>
      </div>

      {/* Primary Continue to Google Action in Light Bold Golden */}
      <div className="flex flex-col items-center w-full mt-1">
        <button
          type="button"
          onClick={onContinueToGoogle}
          className={`
            w-full h-[58px] flex items-center justify-center gap-3 px-6 
            rounded-full font-semibold text-[#291C0E] text-[15px] sm:text-[16px]
            bg-gradient-to-r from-[#ECC89B] via-[#DFBA88] to-[#CF9E6B]
            hover:brightness-105 active:scale-[0.98] cursor-pointer
            shadow-[0_6px_22px_rgba(223,186,136,0.25)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBA88]
            btn-transition
          `}
        >
          <GoogleGIcon className="w-5 h-5 shrink-0" />
          <div className="h-4 w-[1px] bg-[#291C0E]/30 shrink-0" />
          <span className="tracking-wide">Continue to Google</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5] ml-0.5" />
        </button>

        {/* Helpful Supporting Note */}
        <p className="text-[11.5px] text-warm-grey/70 text-center mt-2.5 max-w-[320px] leading-relaxed">
          Your review will be copied automatically so you can paste it on Google.
        </p>

        {!googleReviewUrlConfigured && (
          <p className="text-[10.5px] text-amber-200/60 mt-1 italic text-center">
            (Demo mode: Google review link not set in .env, will open Google Search)
          </p>
        )}
      </div>
    </div>
  );
}
