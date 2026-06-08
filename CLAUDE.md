# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # dev server at http://localhost:4200 (hot-reload)
npm run build          # production build → dist/
npx ng build --configuration development   # dev build (no minification, faster)
npm test               # unit tests via Karma
npm run format         # Prettier across all src/**/*.{ts,html,scss,css}
npm run check-format   # Prettier dry-run (CI check)
npx ng generate component components/my-component --standalone  # scaffold a component
```

## Architecture

**Angular 20 — fully standalone components, no NgModules.**

Every component uses the `imports: [...]` array directly. There is no `AppModule`. The app bootstraps via `src/main.ts` → `appConfig` in `app.config.ts`.

### Routing (`app.routes.ts`)

All routes are lazy-loaded with `loadComponent`. Pattern to follow when adding a new project:

```ts
{
  path: 'projects/my-project',
  loadComponent: () =>
    import('./pages/projects/my-project-page/my-project-page').then(m => m.MyProjectPage),
},
```

The wildcard `**` redirects to `home`. The `landing-page` directory is a leftover scaffold — it is unused and can be deleted.

### Page structure

Each page is self-contained: it imports `Navbar` and `Footer` directly and owns its full layout. There is no shell component wrapping pages — `<router-outlet>` is the only thing in `app.html`.

```
src/app/
  components/
    navbar/          Fixed frosted-glass nav; uses signal() for mobile menu open state
    footer/          Simple copyright bar
    project-card/    Unused generic card — home-page renders its own cards inline
  pages/
    home-page/       Hero + project grid
    projects/
      otakutracker-page/   Full app showcase (hero, screenshots, features, download, changelog)
    landing-page/    Unused scaffold — safe to delete
```

### Styling strategy

**Tailwind v3** handles layout, spacing, and typography. **Component SCSS files** handle anything Tailwind can't express cleanly: CSS animations (`@keyframes`), multi-stop `radial-gradient` glows, `backdrop-filter`, `background-clip: text` gradients, and pseudo-element tricks.

PostCSS is configured via `postcss.config.js` (CommonJS — not `.mjs`). Tailwind scans `./src/**/*.{html,ts}`.

Custom Tailwind tokens (defined in `tailwind.config.js`):

| Token | Value | Usage |
|---|---|---|
| `tenjin-bg` | `#080d1a` | Site-wide page background |
| `tenjin-surface` | `#0f1629` | Cards, navbar dropdown |
| `tenjin-blue` | `#2563eb` | Primary CTAs, accents |
| `tenjin-blue-light` | `#60a5fa` | Hover states, eyebrow text |
| `ot-bg` | `#0a0010` | OtakuTracker page background |
| `ot-purple` | `#9b5de5` | OtakuTracker accents |
| `ot-purple-light` | `#c96bff` | OtakuTracker pill/text highlights |
| `font-outfit` | Outfit | Body text everywhere |
| `font-cinzel` | Cinzel | OtakuTracker app name only |

Fonts are loaded via Google Fonts in `src/index.html` — Outfit (300–900) and Cinzel (700, 900).

### Assets (`public/`)

Served at the root path (`/filename`). Key files:

- `tenjinlab_icon.png` — Flask icon only (navbar, favicon contexts)
- `tenjinlab_wordmark.png` — Flask icon + "TenjinLab" text (hero section)
- `tenjinlab_splash.png` — Original combined image (source, not used directly in app)
- `ot_logo.jpeg` — OtakuTracker app icon

### Design mockups

Standalone HTML files in the project root (`tenjinlab_home_design.html`, `otakutracker_feature_graphic.html`) are reference designs. Open them directly in a browser — no server needed. Implement Angular components to match these; don't modify the mockup files unless redesigning.

### Adding a new project

1. Add an entry to the `projects` array in `home-page.ts` (name, eyebrow, tagline, description, icon, slug, pills)
2. Create `src/app/pages/projects/<name>-page/` with `.ts`, `.html`, `.scss`
3. Add a lazy route in `app.routes.ts`
4. Add a nav link in `navbar.html` (both desktop list and mobile dropdown)
