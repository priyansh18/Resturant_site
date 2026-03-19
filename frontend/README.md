# PryFry Frontend

React frontend for the PryFry restaurant website.

**Live:** [pryfry-priyanshsinghal.vercel.app](https://pryfry-priyanshsinghal.vercel.app)

## Tech

- React 19 + Vite
- React Router DOM
- Custom CSS (dark theme, gold accents)
- Playfair Display + Inter fonts

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, features, about, dishes, chefs, CTA |
| Menu | `/menu` | Filterable dish catalog with prices |
| Chefs | `/chefs` | Chef cards with bios |
| Book Table | `/book` | Reservation form + appointment calendar |
| Blog | `/blog` | Posts, tags, comments |

## Run

```bash
npm install
npm run dev
```

Opens at [localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Output in `dist/` — deploy to Vercel, Netlify, or any static host.

## API

Points to `VITE_API_URL` (defaults to `http://localhost:8080`). Endpoints used:

- `GET/POST /api/meals` — Meal catalog
- `GET/POST /api/chefs` — Chef profiles
- `GET/POST/DELETE /api/appointments` — Appointment booking
- `GET/POST /api/reservations` — Table reservations
- `GET/POST /api/posts` — Blog posts
- `GET/POST /api/posts/:id/comments` — Comments
