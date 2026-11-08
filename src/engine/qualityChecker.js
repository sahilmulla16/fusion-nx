/**
 * Fusion NX - Review Quality Checker
 * Inspects generated text before returning it to the user.
 */

export function sanitizeReview(text) {
  if (!text || typeof text !== 'string') return '';

  let cleaned = text
    // Replace duplicate punctuation
    .replace(/\.{2,}/g, '.')
    .replace(/,{2,}/g, ',')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+\./g, '.')
    .replace(/\s+,/g, ',')
    .replace(/\s+!/g, '!')
    .trim();

  // Capitalize first letter of every sentence
  cleaned = cleaned.replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, prefix, char) => prefix + char.toUpperCase());

  // Ensure ends with punctuation
  if (cleaned.length > 0 && !/[.!?]$/.test(cleaned)) {
    cleaned += '.';
  }

  return cleaned;
}

export function validateReviewQuality(text, businessName = "Fusion NX") {
  if (!text || text.trim().length === 0) {
    return { valid: false, reason: "Review is empty" };
  }

  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) {
    return { valid: false, reason: "No complete sentences found" };
  }

  // Check for duplicate sentences
  const seenSentences = new Set();
  for (const s of sentences) {
    const normalized = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (seenSentences.has(normalized)) {
      return { valid: false, reason: "Duplicate sentence detected" };
    }
    seenSentences.add(normalized);
  }

  // Check business name frequency (should not exceed twice)
  const regex = new RegExp(businessName, 'gi');
  const matches = text.match(regex);
  if (matches && matches.length > 2) {
    return { valid: false, reason: "Excessive brand name repetition" };
  }

  // Word count check (minimum 8 words)
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < 8) {
    return { valid: false, reason: "Review is too brief" };
  }

  return { valid: true, wordCount, sentenceCount: sentences.length };
}
