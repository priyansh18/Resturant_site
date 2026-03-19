# PryFry - Restaurant Website

A modern restaurant website with a dark elegant theme, gold accents, and full-stack architecture.

**Live:** [pryfry-priyanshsinghal.vercel.app](https://pryfry-priyanshsinghal.vercel.app)

## Preview

| Home | Menu | Book Table |
|------|------|------------|
| Hero with full-width food photography | Dish cards with dotted price lines | Calendar appointment booking + reservation form |

## Features

- **Home** - Hero section, feature highlights, about us with stats, popular dishes, chef preview, CTA banner
- **Menu** - Category filter tabs, dish cards with price, prep time, and servings
- **Chefs** - Chef profiles with bio and role
- **Book Table** - Quick reservation form + weekly appointment calendar with time slots
- **Blog** - Posts with tags, full article view, comments system

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, React Router |
| **Backend API** | Java 17, Spring Boot 3.4, RestTemplate |
| **Database Service** | Python 3, Django 5, Django REST Framework, SQLite |
| **Deployment** | Vercel (frontend) |
| **Styling** | Custom CSS, Playfair Display + Inter fonts |

## Architecture

```
React (Vercel)  -->  Spring Boot (8080)  -->  Django DRF (8001)  -->  SQLite
   frontend              backend               db_service            database
```

## Project Structure

```
PryFry/
├── frontend/          # React app (Vite)
│   ├── src/
│   │   ├── pages/     # Home, Menu, Chefs, BookTable, Blog
│   │   ├── components/# Navbar, Footer
│   │   └── utils/     # API client
│   └── public/images/ # Local food/chef/blog images
├── backend/           # Spring Boot (proxies to Django)
│   └── src/main/java/com/priyansh/employee/
│       ├── controller/# REST controllers
│       └── service/   # RestTemplate services
├── db_service/        # Django + SQLite
│   └── api/           # Models, serializers, views, admin
└── docker-compose.yml # Run all services in Docker
```

## Run Locally

### Frontend only
```bash
cd frontend && npm install && npm run dev
```

### Full stack (Django + Spring Boot in Docker)
```bash
# Start Django DB service
cd db_service && pip3 install -r requirements.txt
python3 manage.py migrate && python3 manage.py runserver 8001

# Start Spring Boot (Docker)
docker run -d --name pryfry-backend -p 8080:8080 \
  -v $(pwd)/backend:/app -w /app maven:3.9-eclipse-temurin-17 \
  bash -c "mvn spring-boot:run"

# Start React
cd frontend && npm run dev
```

## Design

- Dark theme (`#1a1a1a` background)
- Gold accents (`#c8a97e`)
- Playfair Display serif headings
- Inter sans-serif body text
- Moody food photography
- Fully responsive (mobile, tablet, desktop)
