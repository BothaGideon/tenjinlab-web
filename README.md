![TenjinLab](public/tenjinlab_splash.png)

* * *

A portfolio and project showcase site built with Angular 20, highlighting apps developed under the TenjinLab brand.

* * *

## Pages

### Home

*   Hero section with site branding and a brief intro
*   Project grid — each card shows the app icon, tagline, description, and tech pills
*   Cards link through to individual project showcase pages

### OtakuTracker

*   Full showcase for the OtakuTracker Flutter app
*   Hero with app icon, feature highlights, and direct download link
*   Screenshots, feature breakdown, and version changelog
*   Links to the GitHub repository and Play Store listing

* * *

## Tech Stack

| Technology | Purpose |
|---|---|
| Angular 20 | Framework (fully standalone components, no NgModules) |
| Tailwind CSS v3 | Layout, spacing, and typography |
| TypeScript | Language |
| SCSS | Animations, gradients, and pseudo-element effects |
| Google Fonts — Outfit, Cinzel | Body text and OtakuTracker display headings |

* * *

## Prerequisites

*   [Node.js](https://nodejs.org/) 18+
*   npm (bundled with Node.js)

* * *

## Setup

1.  **Clone and install dependencies:**

    ```bash
    git clone https://github.com/BothaGideon/tenjinlab-app.git
    cd tenjinlab-app
    npm install
    ```

2.  **Start the development server:**

    ```bash
    npm start
    ```

    Open `http://localhost:4200/` — the app hot-reloads on file changes.

3.  **Build for production:**

    ```bash
    npm run build
    ```

    Output lands in `dist/`.

* * *

## Project Structure

```
src/app/
├── components/
│   ├── navbar/              # Fixed frosted-glass navigation with mobile menu
│   ├── footer/              # Copyright bar
│   └── project-card/        # Reusable project card (unused — home renders inline)
├── pages/
│   ├── home-page/           # Hero + project grid
│   └── projects/
│       └── otakutracker-page/   # OtakuTracker full showcase
public/                      # Static assets served at root path
```

* * *

## Adding a New Project

1.  Add an entry to the `projects` array in `home-page.ts`
2.  Create `src/app/pages/projects/<name>-page/` with `.ts`, `.html`, and `.scss`
3.  Register a lazy route in `app.routes.ts`
4.  Add a nav link in `navbar.html` (desktop list and mobile dropdown)

* * *

## License

This project is private and not intended for public distribution.
