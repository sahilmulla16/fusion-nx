/**
 * Fusion NX - Local Review Composition Engine
 * Strictly targets 25-30 words with a hard maximum of 30 words.
 * Pure local JavaScript generation with zero external APIs.
 */

import { OPENINGS, CLOSINGS, CONNECTORS } from './vocabulary.js';
import { SENTENCE_LIBRARY } from './sentenceLibrary.js';
import { sanitizeReview, validateReviewQuality } from './qualityChecker.js';
import { BUSINESS_CONFIG } from '../config/business.js';

// In-memory session history of recently generated drafts to prevent immediate repeats
const sessionGeneratedHistory = [];

/**
 * Word counting utility
 */
export function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Determine sentiment tier from rating
 */
function getSentimentTier(rating) {
  if (rating === 5) return 'high';
  if (rating === 4) return 'standard';
  if (rating === 3) return 'neutral';
  if (rating === 1 || rating === 2) return 'constructive';
  return 'standard'; // Default when unrated
}

/**
 * Utility to pick a random item from an array
 */
function pickRandom(arr) {
  if (!arr || arr.length === 0) return null;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * Utility to shuffle an array without mutating
 */
function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Retrieves a natural sentence for a given tag based on sentiment tier
 */
function getSentenceForTag(tagId, tier) {
  if (!tagId) return null;
  const tagPool = SENTENCE_LIBRARY[tagId];
  if (!tagPool) return null;

  const pool = tagPool[tier] || tagPool['standard'] || tagPool['neutral'] || tagPool['high'] || [];
  return pickRandom(pool);
}

/**
 * Weaves custom detail smoothly into review text
 */
function formatCustomDetail(customDetail) {
  if (!customDetail || typeof customDetail !== 'string') return '';
  let text = customDetail.trim();
  if (!text) return '';

  text = text.replace(/^[,\-–—\s]+/, '');
  text = text.charAt(0).toUpperCase() + text.slice(1);
  if (!/[.!?]$/.test(text)) {
    text += '.';
  }
  return text;
}

/**
 * Builds candidate sentences for a review
 */
function buildCandidateSentences(tier, selectedTags, customDetail, structure) {
  const formattedCustom = formatCustomDetail(customDetail);
  const customWords = countWords(formattedCustom);
  const sentences = [];

  // When custom detail is present, prioritize it and fit around it
  if (formattedCustom) {
    if (customWords >= 15) {
      // Long custom note: include note and at most 1 short tag sentence if budget allows
      sentences.push(formattedCustom);
      const tagSentence = getSentenceForTag(selectedTags[0], tier);
      if (tagSentence && customWords + countWords(tagSentence) <= 30) {
        sentences.push(tagSentence);
      }
      return sentences;
    } else {
      // Short custom note: include short opening, custom note, and tag sentence
      const openingsPool = OPENINGS[tier] || OPENINGS.standard;
      const opening = pickRandom(openingsPool);
      if (opening && customWords + countWords(opening) <= 20) {
        sentences.push(opening);
      }
      sentences.push(formattedCustom);

      const tagSentence = getSentenceForTag(selectedTags[0], tier);
      if (tagSentence && countWords(sentences.join(" ")) + countWords(tagSentence) <= 30) {
        sentences.push(tagSentence);
      }

      // If still under 23 words, try adding closing if it fits <= 30 words
      if (countWords(sentences.join(" ")) < 23) {
        const closing = pickRandom(CLOSINGS[tier] || CLOSINGS.standard);
        if (closing && countWords(sentences.join(" ")) + countWords(closing) <= 30) {
          sentences.push(closing);
        }
      }
      return sentences;
    }
  }

  // No custom detail: Standard composition from tags
  const shuffledTags = shuffle(selectedTags);
  const openingsPool = OPENINGS[tier] || OPENINGS.standard;
  const closingsPool = CLOSINGS[tier] || CLOSINGS.standard;

  // Patterns designed to land strictly in 25-30 words:
  // Pattern 1: Opening (8-9w) + Tag 1 (8-9w) + Closing (6-7w) = ~23-25w
  // Pattern 2: Tag 1 (8-9w) + Tag 2 (8-9w) + Closing (6-7w) = ~23-25w
  // Pattern 3: Opening (8-9w) + Tag 1 (8-9w) + Tag 2 (8-9w) = ~25-27w
  const pattern = structure === 'B' ? 'tags_plus_closing' : (shuffledTags.length >= 2 ? 'opening_two_tags' : 'opening_tag_closing');

  if (pattern === 'tags_plus_closing') {
    const s1 = getSentenceForTag(shuffledTags[0], tier);
    const s2 = getSentenceForTag(shuffledTags[1], tier);
    if (s1) sentences.push(s1);
    if (s2) sentences.push(s2);
    const closing = pickRandom(closingsPool);
    if (closing) sentences.push(closing);
  } else if (pattern === 'opening_two_tags') {
    const opening = pickRandom(openingsPool);
    if (opening) sentences.push(opening);
    const s1 = getSentenceForTag(shuffledTags[0], tier);
    const s2 = getSentenceForTag(shuffledTags[1], tier);
    if (s1) sentences.push(s1);
    if (s2) sentences.push(s2);
  } else {
    // opening_tag_closing
    const opening = pickRandom(openingsPool);
    if (opening) sentences.push(opening);
    const s1 = getSentenceForTag(shuffledTags[0], tier);
    if (s1) sentences.push(s1);
    const closing = pickRandom(closingsPool);
    if (closing) sentences.push(closing);
  }

  return sentences;
}

/**
 * Enforces the strict 25-30 word constraint (Hard Maximum: 30 words)
 */
function fitToWordBudget(sentences) {
  let active = [...sentences];
  let text = sanitizeReview(active.join(" "));
  let words = countWords(text);

  // If over 30 words, iteratively trim from end
  while (words > 30 && active.length > 1) {
    active.pop();
    text = sanitizeReview(active.join(" "));
    words = countWords(text);
  }

  return text;
}

/**
 * Main review generation function.
 * Guaranteed to return a fresh variation adhering to the hard max of 30 words.
 */
export function generateReviewDraft({
  rating = null,
  selectedTags = [],
  customDetail = "",
  exclude = [],
  attempt = 0
}) {
  const tier = getSentimentTier(rating);
  const maxAttempts = 15;

  // Fallback if no tags and no custom details
  if ((!selectedTags || selectedTags.length === 0) && !customDetail) {
    let baseline = "";
    if (rating === 5) {
      const options = [
        "Had a wonderful experience at Fusion NX Unisex Salon. The stylists were warm and attentive throughout. Will definitely return for my next visit!",
        "My recent visit to Fusion NX was truly fantastic. The service was flawless and very comfortable. Looking forward to coming back here again!",
        "Really happy with my visit to Fusion NX. Everything was handled with great care and polish. Highly recommend Fusion NX for quality salon care."
      ];
      baseline = pickRandom(options);
    } else if (rating === 4) {
      const options = [
        "Had a very pleasant visit to Fusion NX. The team took good care of my appointment. Overall, a very satisfying and comfortable visit.",
        "My appointment at Fusion NX went really smoothly. The service was neat and well handled. Reliable salon with great consistent standards."
      ];
      baseline = pickRandom(options);
    } else if (rating === 3) {
      baseline = "Visited Fusion NX Unisex Salon this past week. The appointment was standard and handled with care. Overall, a decent and acceptable salon visit.";
    } else if (rating === 1 || rating === 2) {
      baseline = "Visited Fusion NX recently and wanted to share feedback. There were minor delays during the visit. Hoping for a smoother experience next time.";
    } else {
      baseline = "Had a wonderful experience at Fusion NX Unisex Salon. The appointment was clean and comfortable. Will definitely return for my next visit!";
    }

    if (exclude.includes(baseline) && attempt < 3) {
      return generateReviewDraft({ rating, selectedTags, customDetail, exclude, attempt: attempt + 1 });
    }
    return baseline;
  }

  const structures = ['A', 'B', 'C', 'D'];
  const structure = pickRandom(structures);

  const candidateSentences = buildCandidateSentences(tier, selectedTags, customDetail, structure);
  let reviewText = fitToWordBudget(candidateSentences);

  const words = countWords(reviewText);

  // Quality check
  const quality = validateReviewQuality(reviewText, BUSINESS_CONFIG.name);
  const isExcluded = exclude.includes(reviewText) || sessionGeneratedHistory.includes(reviewText);

  // If invalid, over 30 words, or already seen recently, try another variation
  if ((!quality.valid || words > 30 || isExcluded) && attempt < maxAttempts) {
    return generateReviewDraft({
      rating,
      selectedTags,
      customDetail,
      exclude,
      attempt: attempt + 1
    });
  }

  // Update session history
  sessionGeneratedHistory.push(reviewText);
  if (sessionGeneratedHistory.length > (BUSINESS_CONFIG.maxGeneratedHistory || 30)) {
    sessionGeneratedHistory.shift();
  }

  return reviewText;
}
