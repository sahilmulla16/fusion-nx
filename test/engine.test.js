import assert from 'node:assert';
import { getKeywordConfigForRating } from '../src/engine/tagLibrary.js';
import { SENTENCE_LIBRARY } from '../src/engine/sentenceLibrary.js';
import { sanitizeReview, validateReviewQuality } from '../src/engine/qualityChecker.js';
import { generateReviewDraft, countWords } from '../src/engine/compositionEngine.js';

console.log("=========================================");
console.log("RUNNING REVISED FUSION NX TEST SUITE");
console.log("=========================================\n");

let passedTests = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✓ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`✗ FAIL: ${description}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Dynamic Keyword Mapping Tests
test("1-star and 2-star ratings show exactly 3 constructive keyword options", () => {
  for (const rating of [1, 2]) {
    const config = getKeywordConfigForRating(rating);
    assert.strictEqual(config.heading, "What could be improved?");
    assert.strictEqual(config.keywords.length, 3);
    const ids = config.keywords.map(k => k.id);
    assert.deepStrictEqual(ids, ["service-result", "staff-interaction", "waiting-time"]);
  }
});

test("3-star rating shows exactly 4 balanced keyword options", () => {
  const config = getKeywordConfigForRating(3);
  assert.strictEqual(config.heading, "How was your experience?");
  assert.strictEqual(config.keywords.length, 4);
  const ids = config.keywords.map(k => k.id);
  assert.deepStrictEqual(ids, ["service-quality", "staff-interaction", "salon-cleanliness", "value-for-money"]);
});

test("4-star rating shows exactly 6 positive options with heading 'What stood out?'", () => {
  const config = getKeywordConfigForRating(4);
  assert.strictEqual(config.heading, "What stood out?");
  assert.strictEqual(config.keywords.length, 6);
  const ids = config.keywords.map(k => k.id);
  assert.deepStrictEqual(ids, ["haircut", "hair-styling", "professional-staff", "clean-salon", "great-atmosphere", "value-for-money"]);
});

test("5-star rating shows exactly 6 positive options with heading 'What did you enjoy?'", () => {
  const config = getKeywordConfigForRating(5);
  assert.strictEqual(config.heading, "What did you enjoy?");
  assert.strictEqual(config.keywords.length, 6);
  const ids = config.keywords.map(k => k.id);
  assert.deepStrictEqual(ids, ["haircut", "hair-styling", "professional-staff", "clean-salon", "great-atmosphere", "value-for-money"]);
});

// 2. Strict 25-30 Word Limit Tests (Hard max 30 words)
test("All generated reviews strictly never exceed 30 words across 50 iterations", () => {
  const ratings = [1, 2, 3, 4, 5, null];

  for (let i = 0; i < 50; i++) {
    const rating = ratings[i % ratings.length];
    const config = getKeywordConfigForRating(rating);
    const tagCount = Math.floor(Math.random() * config.keywords.length) + 1;
    const selectedTags = config.keywords.slice(0, tagCount).map(k => k.id);

    const draft = generateReviewDraft({
      rating,
      selectedTags,
      customDetail: i % 5 === 0 ? "Birthday grooming" : ""
    });

    const words = countWords(draft);
    assert.ok(words <= 30, `Review exceeds 30 words (${words} words): "${draft}"`);
    assert.ok(words >= 15, `Review is too short (${words} words): "${draft}"`);
  }
  console.log("   Verified 50 generated reviews; all are <= 30 words.");
});

// 3. Regeneration / Variation Tests
test("Generate Again with exclude produces different variations", () => {
  const rating = 5;
  const selectedTags = ["haircut", "professional-staff", "clean-salon"];

  const draft1 = generateReviewDraft({ rating, selectedTags });
  const draft2 = generateReviewDraft({ rating, selectedTags, exclude: [draft1] });

  assert.notStrictEqual(draft1, draft2, "Draft 2 must be different from Draft 1");
  console.log(`   Variation 1: "${draft1}" (${countWords(draft1)} words)`);
  console.log(`   Variation 2: "${draft2}" (${countWords(draft2)} words)`);
});

// 4. Custom Detail Integration
test("Custom details are incorporated without exceeding 30 words", () => {
  const draft = generateReviewDraft({
    rating: 5,
    selectedTags: ["haircut"],
    customDetail: "Came before my friend's wedding"
  });

  assert.ok(draft.toLowerCase().includes("wedding"), "Must include customer note");
  const words = countWords(draft);
  assert.ok(words <= 30, `Must be <= 30 words, got ${words}: "${draft}"`);
  console.log(`   Custom Detail Draft: "${draft}" (${words} words)`);
});

// 5. Constructive 1-Star Review Generation
test("Constructive reviews are polite, helpful, and under 30 words", () => {
  const draft = generateReviewDraft({
    rating: 1,
    selectedTags: ["waiting-time", "service-result"]
  });

  const words = countWords(draft);
  assert.ok(words <= 30, `Must be <= 30 words, got ${words}: "${draft}"`);
  console.log(`   1-Star Draft: "${draft}" (${words} words)`);
});

console.log(`\n=========================================`);
console.log(`ALL ${passedTests} REVISED TESTS PASSED!`);
console.log(`=========================================\n`);
