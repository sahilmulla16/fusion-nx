/**
 * Fusion NX - Tag Library
 * Rating-aware dynamic keyword configuration strictly adhering to prompt specifications.
 */

export const ALL_TAGS = {
  // 1-2 star constructive keywords
  "service-result": {
    id: "service-result",
    label: "Service result",
    icon: "ClipboardCheck",
    category: "constructive"
  },
  "staff-interaction": {
    id: "staff-interaction",
    label: "Staff interaction",
    icon: "Users",
    category: "constructive"
  },
  "waiting-time": {
    id: "waiting-time",
    label: "Waiting time",
    icon: "Clock",
    category: "time"
  },

  // 3 star balanced keywords
  "service-quality": {
    id: "service-quality",
    label: "Service quality",
    icon: "BadgeCheck",
    category: "service"
  },
  "salon-cleanliness": {
    id: "salon-cleanliness",
    label: "Salon cleanliness",
    icon: "Sparkles",
    category: "cleanliness"
  },
  "value-for-money": {
    id: "value-for-money",
    label: "Value for money",
    icon: "IndianRupee",
    category: "pricing"
  },

  // 4-5 star positive keywords
  "haircut": {
    id: "haircut",
    label: "Haircut",
    icon: "Scissors",
    category: "service"
  },
  "hair-styling": {
    id: "hair-styling",
    label: "Hair Styling",
    icon: "Wind",
    category: "service"
  },
  "professional-staff": {
    id: "professional-staff",
    label: "Professional Staff",
    icon: "UserRound",
    category: "staff"
  },
  "clean-salon": {
    id: "clean-salon",
    label: "Clean Salon",
    icon: "Sparkles",
    category: "cleanliness"
  },
  "great-atmosphere": {
    id: "great-atmosphere",
    label: "Great Atmosphere",
    icon: "Flower2",
    category: "ambience"
  }
};

/**
 * Returns the exact dynamic keyword configuration and heading for a given rating.
 */
export function getKeywordConfigForRating(rating) {
  // 1-2 Stars: Constructive feedback (Exactly 3 options)
  if (rating === 1 || rating === 2) {
    return {
      heading: "What could be improved?",
      keywords: [
        ALL_TAGS["service-result"],
        ALL_TAGS["staff-interaction"],
        ALL_TAGS["waiting-time"]
      ]
    };
  }

  // 3 Stars: Balanced experience (Exactly 4 options)
  if (rating === 3) {
    return {
      heading: "How was your experience?",
      keywords: [
        ALL_TAGS["service-quality"],
        ALL_TAGS["staff-interaction"],
        ALL_TAGS["salon-cleanliness"],
        ALL_TAGS["value-for-money"]
      ]
    };
  }

  // 4 Stars: Positive experience (Exactly 6 options)
  if (rating === 4) {
    return {
      heading: "What stood out?",
      keywords: [
        ALL_TAGS["haircut"],
        ALL_TAGS["hair-styling"],
        ALL_TAGS["professional-staff"],
        ALL_TAGS["clean-salon"],
        ALL_TAGS["great-atmosphere"],
        ALL_TAGS["value-for-money"]
      ]
    };
  }

  // 5 Stars: Positive experience (Exactly 6 options)
  if (rating === 5) {
    return {
      heading: "What did you enjoy?",
      keywords: [
        ALL_TAGS["haircut"],
        ALL_TAGS["hair-styling"],
        ALL_TAGS["professional-staff"],
        ALL_TAGS["clean-salon"],
        ALL_TAGS["great-atmosphere"],
        ALL_TAGS["value-for-money"]
      ]
    };
  }

  // Default / Unrated: Positive experience (Exactly 6 options)
  return {
    heading: "What stood out?",
    keywords: [
      ALL_TAGS["haircut"],
      ALL_TAGS["hair-styling"],
      ALL_TAGS["professional-staff"],
      ALL_TAGS["clean-salon"],
      ALL_TAGS["great-atmosphere"],
      ALL_TAGS["value-for-money"]
    ]
  };
}

export const getTagById = (id) => ALL_TAGS[id] || null;
