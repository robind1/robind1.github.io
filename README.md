# Bioinformatics Portfolio

Personal portfolio of Robin Dosan — pathogen genomics, reproducible Nextflow
workflows, and interoperable HL7 FHIR Genomics reporting.

Built with [Astro](https://astro.build/) and Tailwind CSS, deployed to GitHub
Pages at <https://robind1.github.io/>.

## Tech stack

- **Astro 5** — static site generator
- **Tailwind CSS 4** — styling (via `@tailwindcss/vite`)
- **Content collections** — project pages authored as Markdown in
  `src/content/projects/`

## Local development

Requires Node.js 18.20+, 20.3+, or 22+.

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:4321/
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Project structure

```text
public/images/            Static images (project figures, teasers)
src/
  content/projects/        One Markdown file per project
  content.config.ts        Projects collection schema
  components/              Header, Footer, Hero, ProjectList
  layouts/                 BaseLayout, ProjectLayout
  pages/                   index.astro, about.astro, projects/[...slug].astro
  styles/global.css        Tailwind import + base typography
astro.config.mjs           site URL, integrations
.github/workflows/deploy.yml   GitHub Actions deploy to Pages
```

## Adding a project

1. Create a Markdown file in `src/content/projects/`, e.g.
   `2026-06-01-my-project.md`. The filename (without `.md`) becomes the URL
   slug under `/projects/`.
2. Add front matter:

   ```yaml
   ---
   title: "My Project"
   excerpt: "One-sentence summary shown in listings."
   teaser: "/images/my-project.png"
   date: 2026-06-01
   tags:
     - Nextflow
     - Genomics
   ---
   ```

3. Put figures in `public/images/` and reference them in the body with a
   root-absolute path, e.g. `![Alt text](/images/my-project.png)`.

## Deployment

This repository is a GitHub Pages **user site** — it must be named
`robind1.github.io` and the site is served from the domain root.

Pushes to `main` are built and published automatically by the GitHub Actions
workflow in `.github/workflows/deploy.yml`.

**One-time setup:** in the GitHub repository, go to **Settings → Pages** and set
**Build and deployment → Source** to **GitHub Actions**.
