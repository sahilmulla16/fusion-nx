import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px] animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div 
        className={`
          flex items-center justify-between gap-3 px-4 py-3 rounded-2xl 
          border backdrop-blur-md shadow-[0_12px_36px_rgba(41,28,14,0.6)]
          ${isSuccess 
            ? 'bg-walnut/95 border-cream/40 text-cream' 
            : 'bg-espresso/95 border-amber-400/50 text-amber-200'
          }
        `}
      >
        <div className="flex items-center gap-2.5">
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-cream shrink-0 stroke-[2.2]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 stroke-[2.2]" />
          )}
          <span className="text-xs sm:text-[13px] font-medium leading-snug">
            {message}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-warm-grey/80 hover:text-cream p-1 -mr-1 rounded-full transition-colors"
          aria-label="Dismiss message"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
