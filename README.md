# Spullekes & Meubels

Een eenvoudige, lichte one-page website om spullen en meubels in huis bij te houden. Gebouwd met Vue 3 en Vite.

## Functies

- Tabel met spullen en meubels, geladen uit `public/items.json`
- Zoeken op naam (hoofdletterongevoelig, fuzzy)
- Filteren op categorie
- **NEW**-badge voor items van de afgelopen maand
- Responsive layout voor desktop en mobiel

## Items beheren

Bewerk alleen `public/items.json` om items toe te voegen, te wijzigen of te verwijderen:

```json
[
  {
    "name": "Bank",
    "category": "Woonkamer",
    "date": "10-06-2026"
  }
]
```

- **name**: naam van het item
- **category**: categorie (bijv. Woonkamer, Eetkamer)
- **date**: datum in `DD-MM-YYYY`-formaat (wordt niet getoond in de tabel, maar bepaalt sortering en NEW-badge)

Items worden gesorteerd van nieuw naar oud; bij dezelfde datum alfabetisch op naam.

## Lokaal ontwikkelen

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in je browser.

## Build

```bash
npm run build
```

De productie-build staat in `dist/`.

Lokaal previewen:

```bash
npm run preview
```

## Deployen naar GitHub Pages

### Automatisch (aanbevolen)

1. Push de code naar de `main`-branch op GitHub.
2. Ga in de repository naar **Settings → Pages**.
3. Onder **Build and deployment**, kies **GitHub Actions** als source.
4. Bij elke push naar `main` bouwt en deployt de workflow in `.github/workflows/deploy.yml` automatisch.

De site is bereikbaar op:

`https://huisje.mathijsnabbe.nl/`

### Base path

De build gebruikt `VITE_BASE_PATH=/` omdat een custom domain de site vanaf de root serveert. Asset-paden zoals `/HouseInventory/assets/...` geven op een custom domain 404 (HTML), wat leidt tot MIME-type fouten en een lege pagina.

Gebruik je **geen** custom domain maar wel `username.github.io/HouseInventory/`, zet dan in `.github/workflows/deploy.yml`:

```yaml
VITE_BASE_PATH: /HouseInventory/
```

### Handmatig

```bash
VITE_BASE_PATH=/ npm run build
```

## Projectstructuur

```
├── public/
│   ├── items.json          # Itemdata (hier bewerken)
│   └── CNAME               # Custom domain voor GitHub Pages
├── src/
│   ├── App.vue             # Hoofdcomponent
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
- Geen router, minimale dependencies
