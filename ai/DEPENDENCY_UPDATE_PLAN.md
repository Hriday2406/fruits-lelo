# Dependency Update Plan — fruits-lelo (refined)

Date: 2025-08-23

Goal

- Update dependencies listed in `package.json` and fix any runtime/build regressions introduced by those updates.
- Prepare a stable baseline for a follow-up migration to TypeScript and swapping Ant Design for shadcn.

Scope (exact task)

- Primary: bump packages (patch/minor first, then majors as needed), then fix code so the app builds and core flows work.
- Deliverable: branch with updated `package.json` + `package-lock.json` and fixes, plus a short PR checklist.

High-level checklist

- [ ] Create a working branch
- [ ] Inventory current direct deps (one-liner)
- [ ] Run `npm update` for safe bumps
- [ ] Run app and fix runtime/build errors
- [ ] Apply major upgrades one-by-one (if required) and fix breakages
- [ ] Commit and open PR with notes and manual test results

Concrete step-by-step (cmd / Windows)

1. Start a branch

```cmd
git checkout -b chore/deps/update-YYYYMMDD
```

2. Save current lockfile (quick backup)

```cmd
copy package-lock.json package-lock.json.bak
```

3. Inventory direct deps

```cmd
npm ls --depth=0
```

4. Run audit (optional)

```cmd
npm audit --audit-level=moderate
```

5. Apply safe updates (patch/minor)

```cmd
npm update
```

6. Install to refresh lockfile

```cmd
npm install
```

7. Start dev server and smoke test flows (follow `.github/copilot-instructions.md`)

```cmd
npm run dev
# open http://localhost:5173 and test Home, Store, Product, Cart
```

8. Fix immediate runtime/build errors

- Read console / terminal stack traces, edit code, re-run dev server.
- Typical fixes: API changes, renamed exports, changed props, CSS class changes, breaking major tailwind or antd updates.

9. Major bumps (if needed)

- Upgrade one major package at a time, run steps 6–8 after each change.

```cmd
npm install react@latest react-dom@latest
npm install vite@latest
# or npm install antd@latest
```

10. Build and lint before commit

```cmd
npm run build
npm run lint
npx prettier --write .
```

11. Commit & push

```cmd
git add package.json package-lock.json
git commit -m "chore(deps): update dependencies and fix regressions"
git push origin HEAD
```

12. Open PR with manual verification notes

- List the packages upgraded (major bumps highlighted)
- Document any code changes and rationale
- Add testing checklist and links to failing items (if any)

Quality gates (must pass before merging)

- Dev server starts, no uncaught runtime TypeErrors on core pages
- `npm run build` completes successfully
- Store / Product / Cart manual flows verified

Sanity helpers (quick fixes)

- If `localStorage` contains malformed data causing runtime errors, add sanitization in `App.jsx` during boot:

```js
let stored = null;
try {
  stored = JSON.parse(localStorage.getItem("cart"));
} catch {
  stored = null;
}
if (!Array.isArray(stored)) localStorage.setItem("cart", JSON.stringify([]));
```

Rollbacks

- If things break irreparably, restore previous lockfile backup and reset branch:

```cmd
copy /Y package-lock.json.bak package-lock.json
npm ci
git reset --hard origin/ai
```

Notes specifically for follow-ups

- After dependencies are stable, proceed to:
  1. Add a small test suite (Vitest + React Testing Library) for critical utils (`isInCart`, filter logic).
  2. Create a separate branch for TypeScript migration and another for UI library migration (AntD -> shadcn).

If you want, I can now:

- run `npm audit` and produce the inventory of vulnerable packages, or
- start with `npm update` (patch/minor) and push a branch with the results.

Which should I do next?
