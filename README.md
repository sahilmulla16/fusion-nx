# FUSION NX — AI-Free Google Review Assistant

A lightweight, mobile-first single-page web application designed for **Fusion NX Unisex Salon**. It helps salon customers express their genuine experiences into natural, conversational Google review drafts with zero AI/LLM dependencies.

Customers select their star rating, tap dynamic experience tags tailored to their rating, preview an editable draft strictly calibrated to **25–30 words (hard max: 30 words)**, and click **Continue to Google →** which automatically copies the review to their clipboard and opens the salon's official Google review destination.

---

## ✨ What's New & Revised

- **Exact Background Asset**: Powered directly by `assets/Elegant Espresso Wave Gradient.png` as a full-viewport, fixed background across both screens.
- **Dynamic Star-Based Keywords**:
  - **1–2 Stars** (Constructive): Exactly **3 options** (*Service result*, *Staff interaction*, *Waiting time*) with heading *"What could be improved?"*.
  - **3 Stars** (Balanced): Exactly **4 options** (*Service quality*, *Staff interaction*, *Salon cleanliness*, *Value for money*) with heading *"How was your experience?"*.
  - **4 Stars** (Positive): Exactly **6 options** (*Haircut*, *Hair Styling*, *Professional Staff*, *Clean Salon*, *Great Atmosphere*, *Value for Money*) with heading *"What stood out?"*.
  - **5 Stars** (Delighted): Exactly **6 options** (*Haircut*, *Hair Styling*, *Professional Staff*, *Clean Salon*, *Great Atmosphere*, *Value for Money*) with heading *"What did you enjoy?"*.
  - When switching star ratings, incompatible keywords are immediately cleared.
- **Strict Review Length: 25–30 Words (Hard Maximum: 30 Words)**:
  - Automated word counting utility (`countWords(text)`).
  - Review engine composition algorithm guarantees all generated drafts never exceed 30 words.
  - Subtle word counter in the editor: e.g., `27 / 30 words`.
- **Automatic Clipboard Copy on Google Continuation**:
  - Removed obsolete standalone "Copy Review" button.
  - Clicking **Continue to Google →** immediately writes the current editable review to the clipboard and opens the official Google Review destination in one smooth gesture.
- **Uncluttered, Minimal Luxury Layout**:
  - Removed excessive cards, borders, and heavy backgrounds.
  - Centered mobile-first canvas (max-width 430px, 24px horizontal padding).
  - Quiet, premium 160ms ease transitions (no bouncy confetti or rotating chips).

---

## 🎨 Color Palette & Typography

| Color | Hex | Purpose |
|---|---|---|
| **Espresso** | `#291C0E` | Main background tone |
| **Walnut** | `#6E473B` | Selected tags & subtle surfaces |
| **Taupe** | `#A78D78` | Borders & unselected icons |
| **Warm Grey** | `#BEB5A9` | Subheadings & supporting text |
| **Cream** | `#E1D4C2` | Primary headings, selected icons, and primary buttons |

- **Font**: Inter (`300`, `400`, `500`, `600`, `700`) with italic styling for *"matters."* and *"ready!"*.

---

## 📁 Project Structure

```text
fusion-nx/
├── assets/
│   ├── Elegant Espresso Wave Gradient.png    # Source background asset
│   ├── Luxury Salon Review Screen.png        # Source UI reference
│   └── Fusion NX Review Ready UI.png         # Screen 2 UI reference
├── public/assets/
│   └── Elegant Espresso Wave Gradient.png    # Static web asset
├── src/
│   ├── assets/
│   │   └── Elegant Espresso Wave Gradient.png # Bundled Vite asset
│   ├── components/
│   │   ├── ActionButtons.jsx                 # Outlined 'Generate Again' & 'Continue to Google'
│   │   ├── Branding.jsx                      # Centered & horizontal brand headers
│   │   ├── CustomDetailInput.jsx             # Optional customer detail field
│   │   ├── ExperienceTags.jsx                # Rating-aware dynamic keyword grid
│   │   ├── LuxuryBackground.jsx              # Full-screen asset background
│   │   ├── ReviewEditor.jsx                  # Textarea with subtle '27 / 30 words' counter
│   │   ├── StarRating.jsx                    # Interactive 5-star selector
│   │   └── Toast.jsx                         # Accessible feedback notification
│   ├── config/
│   │   └── business.js                       # Business metadata & Google review URL
│   ├── engine/
│   │   ├── compositionEngine.js              # Word-budgeted local composition engine
│   │   ├── qualityChecker.js                 # Grammar, sanitization & deduplication
│   │   ├── sentenceLibrary.js                # Concise sentence pools for all tiers
│   │   ├── tagLibrary.js                     # Dynamic rating mapping (3, 4, or 6 options)
│   │   └── vocabulary.js                     # Natural openings, connectors & closings
│   ├── App.jsx                               # Master two-screen controller
│   ├── index.css                             # Minimal 160ms transitions & Tailwind base
│   └── main.jsx
├── test/
│   └── engine.test.js                        # Test suite for rating mapping & 30-word limit
├── .env.example
├── package.json
└── vite.config.js
```

---

## 🧪 Testing

Run the automated test suite:
```bash
npm test
```

Verifies:
- 1–2 stars: exactly 3 constructive options.
- 3 stars: exactly 4 balanced options.
- 4–5 stars: exactly 6 positive options.
- 50 iterations verifying reviews are strictly ≤ 30 words.
- Variation engine producing distinct outputs on "Generate Again".
- Seamless custom note incorporation.

---

## 🚀 Development & Build

```bash
# Run local dev server
npm run dev

# Build for production (Vercel)
npm run build

# Preview production build
npm run preview
```
