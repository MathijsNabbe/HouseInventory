# Spullekes & Meubels

A simple, lightweight one-page website for tracking household items and furniture. Built with Vue 3 and Vite.

## Features

- Table of items and furniture, loaded from `public/items.json`
- Search by name (case-insensitive, fuzzy)
- Filter by category
- **NEW** badge for items from the past month
- Responsive layout for desktop and mobile

## Managing items

Edit only `public/items.json` to add, change, or remove items:

```json
[
  {
    "name": "Bank",
    "category": "Woonkamer",
    "date": "10-06-2026"
  }
]
```

- **name**: name of the item
- **category**: category (e.g. Woonkamer, Eetkamer)
- **date**: date in `DD-MM-YYYY` format (not shown in the table, but determines sorting and the NEW badge)

Items are sorted from newest to oldest; when dates match, alphabetically by name.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
```

The production build is in `dist/`.

Preview locally:

```bash
npm run preview
```

## Deploying to GitHub Pages

### Automatic (recommended)

1. Push the code to the `main` branch on GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. On every push to `main`, the workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

The site is available at:

`https://huisje.mathijsnabbe.nl/`

### Base path

The build uses `VITE_BASE_PATH=/` because a custom domain serves the site from the root. Asset paths like `/HouseInventory/assets/...` return 404 (HTML) on a custom domain, which causes MIME-type errors and a blank page.

If you are **not** using a custom domain but are using `username.github.io/HouseInventory/`, set this in `.github/workflows/deploy.yml`:

```yaml
VITE_BASE_PATH: /HouseInventory/
```

### Manual

```bash
VITE_BASE_PATH=/ npm run build
```

## Project structure

```
├── public/
│   ├── items.json          # Item data (edit here)
│   └── CNAME               # Custom domain for GitHub Pages
├── src/
│   ├── App.vue             # Main component
│   ├── main.js
│   └── style.css
├── .github/workflows/
│   └── deploy.yml          # GitHub Pages deployment
├── index.html
├── vite.config.js
└── package.json
```

## Tech stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- No router, minimal dependencies
