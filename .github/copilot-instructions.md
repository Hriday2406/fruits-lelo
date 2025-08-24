# Fruits Lelo E-commerce Application

Fruits Lelo is a React-based e-commerce website for selling fruits, built with Vite, TailwindCSS, and React Router. The application features a product catalog, shopping cart functionality, search/filtering capabilities, and a responsive design.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Initial Setup

Always run these commands in sequence when working with a fresh clone:

```instructions
# Fruits Lelo — Agent Quick Guide

This file collects the repository-specific knowledge an automated coding agent needs to be productive immediately.

Essentials
- Install: `npm install`
- Dev server: `npm run dev` (http://localhost:5173)
- Build: `npm run build` (do not cancel; ~6s)
- Format & lint: `npx prettier --write . && npm run lint`

Key files & patterns
- `src/components/App.jsx` — provides `CartContext` and `FavContext`; use these for cart/favorites state and localStorage persistence.
- `src/utils/constants.js` — FRUITS array and filter options; update here when adding products.
- `src/components/Store.jsx` — product grid uses react-flip-toolkit (Flipper). The store no-results state lives inside the Flipper grid.
- `src/components/Header.jsx` — search, mobile menu overlay (keeps overlay mounted for CSS animations), and cart popover integration.
- `src/components/Cart.jsx` & `src/components/cartCard.jsx` — cart UI, checkout flow, and popup integration.
- `src/components/Popup.jsx` — notification popup used for checkout/empty-cart alerts (auto-dismiss with hover-pause).

Project-specific conventions
- Styling: Tailwind utility classes everywhere; custom tokens live in `tailwind.config.js` (bg, secondary, accent, dash, gray, red).
- Persistence: cart and favs stored in localStorage keys `cart` and `favs`; initial defaults are set in `App.jsx`.
- Images: fruit images live in `/public` and are referenced directly from `FRUITS[].src`.
- UX: mobile overlays and filter asides are intentionally mounted (not conditionally rendered) to preserve transform/opacity animations.

Agent workflow tips
- When modifying product/filter data, update `src/utils/constants.js` and then verify the Store search + filters show the item.
- When touching routing or contexts, check `App.jsx` for effects that persist to localStorage and for fav/cart initial values.
- Merge conflicts: if merge markers break parsing, prefer a small, explicit full-file reconcile rather than piecemeal edits; run `npx prettier --write` and `npm run lint` after edits.

Quick QA checklist (after code change)
1. Start dev server: `npm run dev`
2. Verify homepage carousel and nav
3. Go to `/store`, test search + filters (Color, Family, Vitamins)
4. Open a product, test qty +/-, Add/Remove, Buy Now (redirects to /cart)
5. Open `/cart`, adjust quantities, Checkout (popup success), verify localStorage cleared

Testing & automation
- Playwright is recommended for e2e; place tests under `tests/e2e` and create a small `playwright.config.*` for CI.
- Optional: `npx playwright install --with-deps` to run locally.

What NOT to change
- Don't change global styling tokens in `tailwind.config.js` without visual QA.
- Avoid modifying existing context persistence behavior (localStorage keys) unless migrating with a clear data migration path.

When you need more context
- Inspect `ai/PROJECT_ANALYSIS.md` and `ai/RESPONSIVE_PLAN.md` for ongoing agent decisions and viewport test targets.

If something is missing or unclear, leave a concise TODO in the code and create a short issue summarizing the unknowns—agents should prefer creating issues over guessing behavior for non-trivial changes.

```

- Click on individual products
