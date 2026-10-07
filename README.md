# Lewi Lucky Siagian — Portfolio

Personal portfolio of Lewi Lucky Siagian — Computer Technology graduate focused on full-stack and backend development.
Built as a **React + Vite + Tailwind CSS v4** single-page application with a dark
theme and cyan + violet accents.

---

## Tech Stack

| Layer      | Choice                          |
| ---------- | ------------------------------- |
| Framework  | React 18                        |
| Build tool | Vite 6                          |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Fonts      | Space Grotesk, IBM Plex Sans, IBM Plex Mono |

---

## Getting Started

> **Note for Windows users:** if a partial `node_modules` folder already exists
> in this project, delete it first so you get a clean install:
> ```cmd
> rmdir /s /q node_modules
> ```

Install dependencies and start the dev server:

```bash
npm install      # install dependencies
npm run dev      # start local dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

---

## Project Structure

```
Portofolio/
├── index.html                  # HTML entry, fonts, SEO + Open Graph meta
├── vite.config.js              # Vite + React + Tailwind; detects the CV file
├── public/
│   ├── favicon.svg
│   ├── images/                 # optimized WebP photos + og-image.jpg
│   └── cv-lewi-lucky-siagian.pdf   # ← add your CV here (see below)
├── media-originals/            # full-size source photos (not deployed, git-ignored)
└── src/
    ├── App.jsx                 # page composition (section order)
    ├── index.css               # Tailwind import + theme tokens + animations
    ├── data/
    │   ├── portfolio.json      # ALL content: profile, skills, projects, experience
    │   └── portfolio.js        # named exports of the JSON
    ├── context/PortfolioContext.jsx
    ├── hooks/                  # theme, scroll spy, scroll reveal, tilt, clipboard
    └── components/
        ├── Navbar.jsx  Hero.jsx  About.jsx  Skills.jsx
        ├── Projects.jsx        # main/featured projects with tabs + "Other projects"
        ├── Experience.jsx      # internship, education, organizations
        ├── Contact.jsx  Footer.jsx
        └── ui/                 # SectionHeading, Tag, Icons, ArchitectureDiagram, ...
```

---

## Customizing Content

All copy, links, projects, skills and experience live in
**`src/data/portfolio.json`**. Projects use `tier`:

- `"main"` — the highlighted project (shown first, with a "Main project" badge)
- `"featured"` — detailed card with Overview / Architecture / Features / My contribution tabs
- `"other"` — compact card under "Other projects"

Architecture diagrams are generated from each project's `architecture.flows`
data — no image needed.

### Project screenshots

Drop a screenshot into `public/` with the project's name — `spmt.png` or
`lucky mart.png` — then run `npm run dev`, `npm run build` or `npm run images`.
It is resized to max 1600px, saved as WebP in `public/images/projects/`
(e.g. `lucky-mart.webp`), and the original PNG is moved to
`media-originals/screenshots/` so the large file is never deployed. The
"Screenshots" tab appears on the project card automatically. Commit the generated
`.webp` file.

### CV download

Put the PDF at **`public/cv-lewi-lucky-siagian.pdf`** and rebuild. The
"Download CV" buttons appear automatically; while the file is missing they are
hidden so the site never shows a broken link.

### Before deploying

Set `og:image` / `twitter:image` in `index.html` to absolute URLs on your
domain (e.g. `https://your-domain/images/og-image.jpg`) so link previews work.

---

## Theming

Colors, fonts, and animations are defined as CSS variables in
**`src/index.css`** under `@theme`. Change `--color-cyan` / `--color-violet`
(and the surface/text tokens) to re-skin the entire site.

---

## Design Notes

- **Responsive** — mobile-first; the navbar collapses to a toggle menu below the
  `md` breakpoint, and grids reflow at `sm` / `lg`.
- **Accessible** — semantic landmarks, skip link, keyboard-friendly tabs,
  visible focus rings, alt text, and `prefers-reduced-motion` support.
- **Performant** — no heavy 3D; lightweight CSS animations and a small bundle.
- **Maintainable** — content/data separated from presentation; small,
  single-responsibility components.
