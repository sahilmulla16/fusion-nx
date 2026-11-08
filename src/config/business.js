export const BUSINESS_CONFIG = {
  name: "Fusion NX",
  fullName: "Fusion NX Unisex Salon",
  tagline: "UNISEX SALON",

  // Official Google review URL configured via .env
  googleReviewUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_REVIEW_URL) || "",

  branding: {
    background: "#291C0E", // Espresso: Main page background
    secondary: "#6E473B",  // Walnut: Secondary surfaces & selected state
    accent: "#A78D78",     // Taupe: Accent and borders
    muted: "#BEB5A9",      // Warm Grey: Secondary text
    cream: "#E1D4C2",      // Cream: Primary text and buttons
  },

  languages: ["en"],

  enableRating: true,
  enableCustomDetail: true,
  maxCustomDetailLength: 160,
  maxGeneratedHistory: 30,

  // Fallback demo Google Review Search link if none configured in .env
  fallbackGoogleSearchUrl: "https://www.google.com/search?q=Fusion+NX+Unisex+Salon"
};
