import React, { useState, useEffect } from 'react';
import LuxuryBackground from './components/LuxuryBackground';
import Branding from './components/Branding';
import StarRating from './components/StarRating';
import ExperienceTags from './components/ExperienceTags';
import CustomDetailInput from './components/CustomDetailInput';
import ReviewEditor from './components/ReviewEditor';
import ActionButtons from './components/ActionButtons';
import Toast from './components/Toast';
import { generateReviewDraft, countWords } from './engine/compositionEngine.js';
import { getKeywordConfigForRating } from './engine/tagLibrary.js';
import { BUSINESS_CONFIG } from './config/business.js';
import { ArrowRight, Check } from 'lucide-react';

export default function App() {
  // Screen state: 'experience' | 'review'
  const [currentStep, setCurrentStep] = useState('experience');

  // Rating and keyword choices
  const [rating, setRating] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customDetail, setCustomDetail] = useState('');

  // Generated review state
  const [generatedReview, setGeneratedReview] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Scroll to top when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Handle rating change: updates rating and immediately clears incompatible tags
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    const config = getKeywordConfigForRating(newRating);
    const validTagIds = config.keywords.map(k => k.id);

    // Clear selections that no longer belong to newly selected option set
    setSelectedTags((prev) => prev.filter((id) => validTagIds.includes(id)));
  };

  // Toggle keyword tag
  const handleToggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  // Continue to Review generation screen
  const handleContinueToReview = () => {
    // Generate initial draft (strictly targeted to 25-30 words, max 30 words)
    const draft = generateReviewDraft({
      rating,
      selectedTags,
      customDetail
    });

    setGeneratedReview(draft);
    setCurrentStep('review');
  };

  // Generate Again: generates a new variation different from the current draft
  const handleRegenerate = () => {
    setIsRegenerating(true);

    setTimeout(() => {
      const freshDraft = generateReviewDraft({
        rating,
        selectedTags,
        customDetail,
        exclude: [generatedReview]
      });

      setGeneratedReview(freshDraft);
      setIsRegenerating(false);
    }, 160);
  };

  // Continue to Google: automatic clipboard copy + opening Google Review URL directly from gesture
  const handleContinueToGoogle = async () => {
    const review = generatedReview.trim();
    const url = BUSINESS_CONFIG.googleReviewUrl || BUSINESS_CONFIG.fallbackGoogleSearchUrl;

    if (!review) {
      setToast({
        message: "Please write or generate a review first.",
        type: "error"
      });
      return;
    }

    // 1. Initiate clipboard copy directly within user gesture
    let copyPromise;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        copyPromise = navigator.clipboard.writeText(review);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = review;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const ok = document.execCommand('copy');
        textArea.remove();
        copyPromise = ok ? Promise.resolve() : Promise.reject(new Error("Copy command failed"));
      }
    } catch (err) {
      copyPromise = Promise.reject(err);
    }

    // 2. Open Google Review destination directly from the same user click gesture
    window.open(url, '_blank', 'noopener,noreferrer');

    // 3. Confirm clipboard result
    try {
      await copyPromise;
      setToast({
        message: "Review copied! Paste it on Google.",
        type: "success"
      });
    } catch (err) {
      setToast({
        message: "Automatic copy failed. Please select and copy review manually.",
        type: "error"
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-cream flex justify-center selection:bg-taupe/40 selection:text-cream">
      {/* Full-screen exact asset background */}
      <LuxuryBackground />

      {/* Main Content Container (max-w-[430px], horizontal padding 24px) */}
      <main className="relative z-10 w-full max-w-[430px] min-h-screen px-6 py-6 sm:py-7 flex flex-col justify-between">
        
        {/* ================================================================= */}
        {/* SCREEN 1: EXPERIENCE SELECTION                                   */}
        {/* ================================================================= */}
        {currentStep === 'experience' && (
          <div className="flex-1 flex flex-col justify-between screen-fade">
            <div>
              {/* Header / Branding */}
              <Branding variant="centered" />

              {/* Hero Section with Prominent "Your experience matters." */}
              <div className="text-center my-4 sm:my-5">
                <h2 className="text-[32px] sm:text-[38px] font-light text-cream tracking-tight font-sans leading-[1.12]">
                  Your experience <br />
                  <span className="italic font-semibold text-[#DFBA88]">
                    matters.
                  </span>
                </h2>
                <p className="text-[13px] sm:text-[14px] text-warm-grey mt-2 font-normal">
                  Tell us what you loved about your visit.
                </p>
              </div>

              {/* Star Rating Selector */}
              <StarRating
                rating={rating}
                onRatingChange={handleRatingChange}
              />

              {/* Dynamic Experience Tags based on Star Rating */}
              <ExperienceTags
                rating={rating}
                selectedTags={selectedTags}
                onToggleTag={handleToggleTag}
              />

              {/* Optional Custom Detail Input */}
              <CustomDetailInput
                value={customDetail}
                onChange={setCustomDetail}
              />
            </div>

            {/* Bottom Continue Action in Light Bold Golden */}
            <div className="pt-4 pb-2">
              <button
                type="button"
                onClick={handleContinueToReview}
                className={`
                  w-full h-[58px] flex items-center justify-center gap-2 px-6 
                  rounded-full font-semibold text-[#291C0E] text-[15px] sm:text-[16px]
                  bg-gradient-to-r from-[#ECC89B] via-[#DFBA88] to-[#CF9E6B]
                  hover:brightness-105 active:scale-[0.98] cursor-pointer
                  shadow-[0_6px_22px_rgba(223,186,136,0.25)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBA88]
                  btn-transition
                `}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Understated Footer */}
              <footer className="mt-5 flex items-center justify-center gap-3 select-none">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-taupe/35" />
                <span className="text-[10px] font-normal tracking-[0.25em] text-warm-grey uppercase">
                  Thank you for your support ♡
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-taupe/35" />
              </footer>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* SCREEN 2: REVIEW GENERATION                                      */}
        {/* ================================================================= */}
        {currentStep === 'review' && (
          <div className="flex-1 flex flex-col justify-between screen-fade">
            <div>
              {/* Header with Edit back-button preserving state */}
              <Branding
                variant="horizontal"
                onBack={() => setCurrentStep('experience')}
              />

              {/* Confirmation Section */}
              <div className="text-center my-4 sm:my-5">
                <div className="flex items-center justify-center gap-3 w-full mb-3 select-none">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-taupe/40" />
                  <div className="w-10 h-10 rounded-full border border-taupe/50 bg-espresso/60 flex items-center justify-center text-[#DFBA88]">
                    <Check className="w-5 h-5 stroke-[2.2] text-[#DFBA88]" />
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-taupe/40" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-light text-cream tracking-tight font-sans leading-tight">
                  Your review is{' '}
                  <span className="italic font-semibold text-[#DFBA88]">
                    ready!
                  </span>
                </h2>
                <p className="text-[13px] sm:text-[14px] text-warm-grey mt-1.5 font-normal">
                  Feel free to edit it before copying.
                </p>
              </div>

              {/* Editable Review Textarea with 25-30 Word Counter */}
              <ReviewEditor
                value={generatedReview}
                onChange={setGeneratedReview}
                isRegenerating={isRegenerating}
              />

              {/* Action Buttons: Generate Again & Continue to Google with Auto-Copy */}
              <ActionButtons
                onRegenerate={handleRegenerate}
                onContinueToGoogle={handleContinueToGoogle}
                isRegenerating={isRegenerating}
                googleReviewUrlConfigured={Boolean(BUSINESS_CONFIG.googleReviewUrl)}
              />
            </div>

            {/* Bottom Footer for Screen 2 */}
            <div className="pt-2 pb-2">
              <footer className="mt-4 flex items-center justify-center gap-3 select-none">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-taupe/35" />
                <span className="text-[10px] font-normal tracking-[0.25em] text-warm-grey uppercase">
                  Thank you for your support ♡
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-taupe/35" />
              </footer>
            </div>
          </div>
        )}
      </main>

      {/* Accessible Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
