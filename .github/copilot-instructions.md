# Fruits Lelo E-commerce Application

Fruits Lelo is a React-based e-commerce website for selling fruits, built with Vite, TailwindCSS, and React Router. The application features a product catalog, shopping cart functionality, search/filtering capabilities, and a responsive design.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Initial Setup

Always run these commands in sequence when working with a fresh clone:

```bash
npm install  # Takes ~19 seconds
```

### Build and Development

- **Development server**: `npm run dev` - Starts on http://localhost:5173/ (ready in ~200ms)
- **Production build**: `npm run build` - Takes ~6 seconds, NEVER CANCEL. Set timeout to 30+ seconds.
- **Preview production build**: `npm run preview` - Starts on http://localhost:4173/ to test the built application

### Code Quality

- **Linting**: `npm run lint` - Takes <1 second but currently has 28 linting issues (prop validation warnings)
- **Formatting**: `npx prettier --write .` - Takes <1 second, formats all files according to Prettier config
- **Security audit**: `npm audit` - Shows 8 vulnerabilities (2 low, 5 moderate, 1 high) - use `npm audit fix` to resolve

### Required Node.js Environment

- **Node.js**: v20.19.4 or compatible
- **npm**: v10.8.2 or compatible

## Validation Requirements

### ALWAYS Test Complete User Scenarios

After making any changes, you MUST manually validate the application through these complete scenarios:

1. **Homepage Navigation**:

   - Navigate to http://localhost:5173/
   - Verify fruit carousel displays and is interactive
   - Test navigation links (Home, Store)
   - Check cart item count displays correctly

2. **Product Browsing**:

   - Navigate to Store page (/store)
   - Test search functionality (e.g., search "apple")
   - Test filtering by Color, Family, and Vitamins
   - Click on product cards to view details

3. **Shopping Cart Workflow**:

   - Add products to cart from product detail pages
   - Verify cart counter updates
   - Navigate to cart page (/cart)
   - Test quantity adjustments (+/- buttons)
   - Test checkout process (should show success alert and empty cart)

4. **Product Detail Functionality**:
   - Click on individual products
   - Test "Add To Cart" / "Remove From Cart" button states
   - Test "Buy Now" button (redirects to cart)
   - Verify product information displays correctly

### Expected Application Behavior

- **Cart Persistence**: Items persist in localStorage between sessions
- **Initial Cart**: New users start with 2 items (Melon x2, Banana x3)
- **Favorite Items**: Initial favorites include items with IDs [0, 2, 4, 7]
- **Checkout**: Shows success alert "Yay! You have bought the fruits! It will be delivered to you."
- **Empty Cart Checkout**: Shows warning "You cannot checkout with an empty cart, put some fruits in the cart first."

## Repository Structure

### Key Directories and Files

```
/
├── src/
│   ├── components/          # React components
│   │   ├── App.jsx         # Main app with routing and context
│   │   ├── Header.jsx      # Navigation and search
│   │   ├── Home.jsx        # Homepage with carousel
│   │   ├── Store.jsx       # Product catalog with filters
│   │   ├── Product.jsx     # Individual product details
│   │   ├── Cart.jsx        # Shopping cart page
│   │   └── cartCard.jsx    # Cart summary component
│   ├── utils/
│   │   └── constants.js    # Product data and filter options
│   ├── main.jsx           # React app entry point
│   └── index.css          # Global styles
├── public/                 # Static assets (fruit images)
├── dist/                   # Built application (after npm run build)
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
├── eslint.config.js       # ESLint configuration
└── postcss.config.js      # PostCSS configuration
```

### Important Files to Check When Making Changes

- **Always check `src/utils/constants.js`** after modifying product data or filter options
- **Always check `src/components/App.jsx`** after making changes to routing or global state
- **Always run linting and formatting** before committing: `npm run lint && npx prettier --write .`
- **Also check `src/components/Store.jsx`, `src/components/NotFound.jsx`, and `src/utils/fruitUtils.js`** when changing UI, no-results behavior, or cart helpers (recent changes moved the store no-results into the grid Flipper and extracted some helpers).
- Note: the Store no-results state now lives inside the Flipper grid (`src/components/Store.jsx`).

## Common Development Tasks

### Adding New Products

1. Add fruit images to `/public/` directory (PNG format)
2. Update the `FRUITS` array in `src/utils/constants.js`
3. Ensure proper slug, family, colors, and vitamins are set
4. Test the new product appears in store and is searchable

### Modifying Styling

- Use TailwindCSS utility classes
- Custom colors are defined in `tailwind.config.js`: bg, secondary, accent, dash, gray, red
- Custom scrollbar styles are included for webkit browsers

### State Management

- Cart state managed via React Context (`CartContext`) in `App.jsx`
- Favorites managed via React Context (`FavContext`) in `App.jsx`
- Both persist to localStorage automatically

### Routing

- Uses React Router v6
- Routes: `/` (Home), `/store` (Store), `/store/:slug` (Product), `/cart` (Cart)
- Navigation handled in `Header.jsx`

## Build and Deployment

### Production Build Process

```bash
npm run build  # NEVER CANCEL - Takes ~6 seconds, set timeout to 30+ seconds
```

### Build Output

- Creates optimized bundle in `/dist/` directory
- Main bundle: ~532KB (169KB gzipped)
- Includes CSS bundle: ~28KB (7KB gzipped)
- Build warns about large chunks (>500KB) - this is expected

### Deployment

- Configured for Vercel deployment (vercel.json included)
- Uses SPA routing configuration for client-side routing

## Known Issues and Limitations

### Linting Issues

The codebase currently has 28 linting errors/warnings:

- React prop validation warnings (missing PropTypes)
- Unused variable warnings
- React hooks dependency warnings
- Fast refresh warnings for context exports

**These are existing issues** - do not attempt to fix them unless specifically required for your task.

### Security Vulnerabilities

- 8 npm audit vulnerabilities exist in dependencies
- Most are in build tools (Babel, ESLint, Vite) not runtime dependencies
- Run `npm audit fix` to attempt automatic fixes if needed

### Browser Compatibility

- Designed for modern browsers with ES6+ support
- Uses CSS Grid and Flexbox extensively
- Requires JavaScript enabled

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (requires v20+)
2. **Dev server won't start**: Port 5173 might be in use, Vite will suggest alternative
3. **Images not loading**: Ensure fruit images are in `/public/` directory
4. **Cart state not persisting**: Check localStorage permissions in browser
5. **Styling broken**: Ensure TailwindCSS build process completed successfully

### Performance Notes

- Initial bundle is large (~532KB) due to all product images and data being loaded upfront
- Consider implementing lazy loading for images in production
- Cart operations use localStorage which is synchronous

Remember: **ALWAYS** test the complete user journey after making any changes to ensure the e-commerce functionality remains intact.

## MCP & Playwright integration

When building or maintaining this project, it's helpful to take advantage of the available MCP (Model/Context/Code Platform) tools and Playwright for automated browser testing. The guidance below is intended for both human developers and automated agents (Copilot-style coding agents) that may operate on this repository.

When to use these tools

- Use Playwright MCP (or a local Playwright setup) for end-to-end browser tests that exercise the full user journey (homepage -> store -> product -> cart -> checkout).
- Use Context7 MCP to fetch authoritative library/docs (for example, React Router, Playwright or other framework docs) before implementing larger or unfamiliar changes.
- Use GitHub MCP for automation tasks that interact with issues, pull requests, and repository metadata (creating issues for phased work, opening PRs, requesting reviews).

Recommended quick commands (developer machine)

```bash
# install project deps once
npm install

# optional: install Playwright browsers (if using Playwright locally)
npx playwright install --with-deps

# run dev server
npm run dev

# run Playwright tests (if Playwright tests are added)
npx playwright test
```

CI / Workflow suggestions

- Add a workflow step to run lint and unit tests as a gate: `npm run lint` and your test runner.
- Add an optional Playwright job that runs only on pull requests or on merges to `main` to validate critical user flows. Configure Playwright to run headlessly and with a short retry policy for flakiness.
- Consider a documentation step that uses Context7 MCP to pull the latest docs for a dependency before a large refactor (this is optional but useful when upgrading libraries).

How agents should use Context7 MCP and GitHub MCP

- Resolve the Context7-compatible library ID before fetching docs (for example, to fetch Playwright docs or Next.js docs). Use the docs to confirm recommended APIs or migration steps.
- Use GitHub MCP to create small, focused issues for each phase of a larger change (for example: responsive Phase 1: header and nav; Phase 2: store grid; Phase 3: product pages). Link the Context7 docs or Playwright test plan in the issue body.
- When adding Playwright tests, create a dedicated `tests/e2e` folder and a minimal `playwright.config.ts` or `playwright.config.js` and include a sample smoke test that covers the happy path.

Notes and constraints

- These instructions do not automatically install new packages or change CI; human review is required before adding Playwright or MCP API credentials to workflows.
- If Playwright tests are large or slow, gate them behind an "e2e" workflow that runs on a schedule or only for release branches to avoid slowing down everyday PR checks.
