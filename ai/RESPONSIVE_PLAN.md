# Responsive Design Roadmap — Fruits Lelo

Date: 2025-08-24

Purpose

---

This document assesses the current codebase and provides a concrete, phased plan to make Fruits Lelo responsive across mobile and tablet screen sizes. It's written to be handed to an automated coding agent (or developer) and includes explicit tasks, file touchpoints, acceptance criteria, QA steps and time estimates.

Assumptions

---

- The project uses Tailwind CSS for styling and utility classes (already present).
- Responsive work should prioritize a mobile-first approach and preserve existing desktop layout.
- No major UI redesign is required — this is an adaptation of the existing components to responsive patterns.
- Node / npm environment is already configured (see repo README).

Goals

---

1.  Make key pages usable on phones (<= 480px) and tablets (~768px) while preserving desktop styles.
2.  Ensure navigation, product grid, product details, and cart flows are fully functional on small screens.
3.  Improve accessibility and touch friendliness for mobile interactions.

High-level Strategy

---

- Work mobile-first: style base classes for small screens and add `sm:`, `md:`, `lg:` variants to restore desktop behavior.
- Use Tailwind responsive utilities (grid, flex, spacing, text sizes) and avoid large CSS rewrites.
- Make minimal structural DOM edits where necessary (e.g., add a hamburger menu, collapse filters into a modal/drawer on small screens).
- Add smoke tests and a short QA checklist for the Copilot agent to validate UI on multiple viewports.

Phases

---

Phase 0 — Prep (1–2 hours)

- Create feature branch: `feature/responsive-mobile-first` from `ai`.
- Add short PR template checklist for responsive changes.
- Add a tiny viewport helper in `README.md` or `ai/` to document required viewports for QA.

Phase 1 — Core Layouts & Navigation (4–8 hours)

- Files: `src/components/Header.jsx`, `src/index.css`, `tailwind.config.js` (if needed), `src/components/App.jsx`
- Tasks:
  - Convert header navigation into mobile layout: show logo + hamburger on small screens; hide full nav behind a slide-over or popover.
  - Ensure cart popover becomes a full-screen or bottom-drawer on mobile (or a route `/cart` fallback).
  - Add easily tappable hit targets (min 44px) for buttons/icons.
- Acceptance:
  - Header collapses to hamburger at `sm` breakpoint; menu opens and links navigate.
  - Cart icon still shows badge; tapping opens cart route or mobile drawer.

Phase 2 — Store Grid & Filters (6–10 hours)

- Files: `src/components/Store.jsx`, `src/utils/constants.js`, `src/components/NotFound.jsx`
- Tasks:
  - Change product grid to responsive classes: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` and use `gap-4` responsive sizing.
  - Move filters (Color, Family, Vitamins, Search) to a collapsible panel or modal on small screens. Provide a floating filter button.
  - Ensure the in-grid No-Results card adapts to full-width on mobile.
- Acceptance:
  - Grid shows 1 column on small, 2 on small/medium, 3 on large.
  - Filters are accessible via a single button and persist selections.

Phase 3 — Product Detail Page (3–5 hours)

- Files: `src/components/Product.jsx`
- Tasks:
  - Stack product image above product metadata on small screens instead of side-by-side.
  - Ensure Add to Cart / Buy Now / Favorite buttons are full-width or large enough to tap.
  - Make nutrition/family tags wrap and be horizontally scrollable if necessary.
- Acceptance:
  - Product page is readable without horizontal scrolling; CTA buttons visible without scrolling past fold.

Phase 4 — Cart & Checkout (2–4 hours)

- Files: `src/components/Cart.jsx`, `src/components/cartCard.jsx`
- Tasks:
  - Make cart list vertical with clear increment/decrement controls sized for touch.
  - Ensure the checkout success/warning alerts are visible and unobtrusive on mobile (prefer AntD message/notification over alert()).
- Acceptance:
  - Adjusting quantities and checkout works on mobile; checkout success clears cart.

Phase 5 — Polish, Accessibility, and Performance (3–6 hours)

- Tasks:
  - Add `loading="lazy"` to product images.
  - Ensure `aria-label`s on icon-only buttons; use `<button>` elements for interactive icons.
  - Add focus-visible styles and increase color contrast where needed.
  - Run a quick Lighthouse mobile audit and fix top 3 issues (performance or accessibility).
- Acceptance:
  - Lighthouse accessibility score improves; no critical contrast/focus issues.

Phase 6 — Tests, QA & Merge (2–4 hours)

- Tasks:
  - Add a small set of visual regression or component tests (Vitest + RTL); or add manual QA checklist if tests are out of scope.
  - Create PR with screenshots for mobile/tablet/desktop states, list of files changed and manual QA steps.
- Acceptance:
  - PR description includes viewports, screenshots, and passes CI (lint/build).

File Touchpoints (short list)

---

- `src/components/Header.jsx` — add hamburger, mobile menu/drawer, larger tap targets.
- `src/components/Store.jsx` — responsive grid, filter modal/collapse, No-Results card responsive rules.
- `src/components/Product.jsx` — stacked mobile layout, full-width CTAs.
- `src/components/Cart.jsx` & `cartCard.jsx` — mobile-friendly controls and possible drawer behavior.
- `src/index.css` — small utilities for scrollbar, focus-visible, and helper classes if needed.
- `tailwind.config.js` — confirm breakpoints (`sm`, `md`, `lg`, `xl`) match design expectations.

Engineering Notes & Patterns

---

- Prefer Tailwind responsive utilities over custom CSS where possible: e.g. `p-4 sm:p-6 lg:p-8`.
- Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for product grid.
- Collapse complex filters into a `FilterDrawer` component (accessible) that the Copilot agent can create.
- Keep the desktop layout unchanged; use responsive classes to layer mobile behavior on top.

Edge Cases & Risks

---

- Existing inline widths (e.g. `w-[810px]`) will need refactoring — search/replace and manual checks required.
- Some components may rely on fixed sizes for animations (react-flip-toolkit) — test transitions across breakpoints.
- Images may be large; adding `loading="lazy"` and optional `srcSet` helps mobile performance.

Deliverables for Copilot Agent

---

1.  Create branch `feature/responsive-mobile-first` from `ai`.
2.  Implement Phase 1 → 3 changes and push incremental commits with one logical change per commit.
3.  Include screenshots for mobile (375x812), tablet (768x1024), and desktop (1366x768) in the PR description.
4.  Add QA checklist in the PR and mark it done when manual steps pass.

Time & Effort Estimate

---

- Total estimated effort: 16–35 hours depending on unforeseen complexity and assets.
- Recommended split: 2–3 day work window for a single engineer/agent working part-time; or 1–2 days full-time.

Acceptance Criteria (final)

---

- Header, Store grid, Product, and Cart pages render and function on small screens without horizontal scrolling.
- Core flows (search, filter, add to cart, adjust qty, checkout) work on mobile.
- Accessibility basics added: `aria-label`s, focus-visible, tappable targets.
- PR contains screenshots and passes build/lint checks.

Quick QA Checklist for PR

---

- [ ] Open site at 375x812 (iPhone) — homepage, store, product detail, cart.
- [ ] Verify hamburger menu opens and navigates.
- [ ] Verify product grid uses 1 column and cards are readable.
- [ ] Verify filters open via drawer and persist selections.
- [ ] Add item to cart, adjust qty, and checkout.
- [ ] Run Lighthouse on mobile — check top 3 issues.

Notes for the Agent

---

- Avoid changing visual details beyond layout (colors, fonts) unless needed for accessibility.
- Keep commits small and focused (header, store grid, product page, cart, polish).
- If a component requires significant rework, open a draft PR and request review.

Contact / Follow-up

---

- If you want, I can split this plan into individual Copilot-agent tasks (one file per task) and create issues for each.
